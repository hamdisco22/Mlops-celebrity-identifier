import os
import base64
import json
import re
import requests
from typing import Any, Dict, List, Tuple


class CelebrityDetector:
    def __init__(self):
        self.api_key = os.getenv("GROQ_API_KEY")
        self.api_url = "https://api.groq.com/openai/v1/chat/completions"
        self.model = os.getenv("GROQ_MODEL", "meta-llama/llama-4-maverick-17b-128e-instruct")
        self.timeout = 45

    # --- MAIN: return info + best name + REAL top_predictions from the LLM ---
    def identify_topk(self, image_bytes: bytes, k: int = 3) -> Tuple[str, str, List[Dict[str, Any]]]:
        if not self.api_key:
            return "Unknown", "Unknown", [{"name": "Unknown", "confidence": 1.0}]

        encoded_image = base64.b64encode(image_bytes).decode()

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

        # Force STRICT JSON (no markdown). This is critical.
        system_text = (
            "You are a strict JSON generator. "
            "Output ONLY valid JSON. No markdown. No extra text."
        )

        user_text = f"""
Analyze the photo and return EXACTLY {k} candidate identities with probabilities.

Return ONLY this JSON shape:
{{
  "top_predictions": [
    {{"name": "Full Name", "confidence": 0.0}},
    {{"name": "Full Name", "confidence": 0.0}},
    {{"name": "Full Name", "confidence": 0.0}}
  ],
  "best_match_profile": {{
    "full_name": "Full Name",
    "profession": "string",
    "nationality": "string",
    "famous_for": "string",
    "top_achievements": ["string", "string", "string"]
  }}
}}

Rules:
- "confidence" must be a number between 0 and 1
- Provide EXACTLY {k} items
- Sort by confidence DESC
- Names must be real person names (no placeholders like 'candidate')
- If unknown, return:
  top_predictions = [{{"name":"Unknown","confidence":1.0}}, ...] (still {k} items)
  and best_match_profile.full_name="Unknown"
"""

        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": system_text},
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": user_text},
                        {
                            "type": "image_url",
                            "image_url": {"url": f"data:image/jpeg;base64,{encoded_image}"},
                        },
                    ],
                },
            ],
            "temperature": 0.2,
            "max_tokens": 900,
        }

        try:
            r = requests.post(self.api_url, headers=headers, json=payload, timeout=self.timeout)
        except Exception:
            return "Unknown", "Unknown", [{"name": "Unknown", "confidence": 1.0}]

        if r.status_code != 200:
            return "Unknown", "Unknown", [{"name": "Unknown", "confidence": 1.0}]

        raw = r.json()["choices"][0]["message"]["content"]

        data = self._safe_parse_json(raw)
        if not data:
            # Fallback if JSON fails
            return "Unknown", "Unknown", [{"name": "Unknown", "confidence": 1.0}]

        top_preds = self._sanitize_top_predictions(data.get("top_predictions"), k)
        profile = data.get("best_match_profile") if isinstance(data.get("best_match_profile"), dict) else {}

        best_name = profile.get("full_name")
        if not isinstance(best_name, str) or not best_name.strip():
            best_name = top_preds[0]["name"] if top_preds else "Unknown"
        best_name = best_name.strip()

        # IMPORTANT: profile markdown should NOT contain "Top Predictions"
        player_info = self._profile_to_markdown(profile)

        return player_info, best_name, top_preds

    # Keep compatibility with old code
    def identify(self, image_bytes: bytes) -> Tuple[str, str]:
        info, name, _ = self.identify_topk(image_bytes, k=3)
        return info, name

    # -------------------- Helpers --------------------

    def _profile_to_markdown(self, profile: Dict[str, Any]) -> str:
        full_name = profile.get("full_name", "Unknown")
        profession = profile.get("profession", "Unknown")
        nationality = profile.get("nationality", "Unknown")
        famous_for = profile.get("famous_for", "Unknown")
        achievements = profile.get("top_achievements", [])

        md = []
        md.append(f"- **Full Name**: {full_name}")
        md.append(f"- **Profession**: {profession}")
        md.append(f"- **Nationality**: {nationality}")
        md.append(f"- **Famous For**: {famous_for}")
        md.append("- **Top Achievements**:")

        if isinstance(achievements, list) and achievements:
            for a in achievements[:6]:
                if isinstance(a, str) and a.strip():
                    md.append(f"  - {a.strip()}")
        else:
            md.append("  - Unknown")

        return "\n".join(md)

    def _safe_parse_json(self, text: str) -> Dict[str, Any]:
        if not text:
            return {}
        text = text.strip()

        # direct parse
        if text.startswith("{") and text.endswith("}"):
            try:
                return json.loads(text)
            except Exception:
                pass

        # extract {...}
        m = re.search(r"\{.*\}", text, flags=re.DOTALL)
        if m:
            try:
                return json.loads(m.group(0))
            except Exception:
                return {}
        return {}

    def _sanitize_top_predictions(self, preds: Any, k: int) -> List[Dict[str, Any]]:
        # Guarantee list
        if not isinstance(preds, list):
            return [{"name": "Unknown", "confidence": 1.0}] + [{"name": "Unknown", "confidence": 0.0}] * (k - 1)

        cleaned: List[Dict[str, Any]] = []
        for p in preds:
            if not isinstance(p, dict):
                continue
            name = p.get("name")
            conf = p.get("confidence")
            if not isinstance(name, str) or not name.strip():
                continue
            try:
                conf = float(conf)
            except Exception:
                conf = 0.0
            conf = max(0.0, min(1.0, conf))
            cleaned.append({"name": name.strip(), "confidence": conf})

        if not cleaned:
            return [{"name": "Unknown", "confidence": 1.0}] + [{"name": "Unknown", "confidence": 0.0}] * (k - 1)

        # sort desc
        cleaned.sort(key=lambda x: x["confidence"], reverse=True)

        # ensure exactly k
        cleaned = cleaned[:k]
        while len(cleaned) < k:
            cleaned.append({"name": "Unknown", "confidence": 0.0})

        # normalize to sum=1.0 for better UI percentages
        s = sum(x["confidence"] for x in cleaned)
        if s > 0:
            for x in cleaned:
                x["confidence"] = float(x["confidence"] / s)

        cleaned.sort(key=lambda x: x["confidence"], reverse=True)
        return cleaned
