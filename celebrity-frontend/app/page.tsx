"use client";

import React, { useMemo, useRef, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
  Chip,
  Button,
} from "@mui/material";

import ModernHero from "../components/ModernHero";
import ImageUploader from "../components/ImageUploader";
import LoadingSpinner from "../components/LoadingSpinner";
import QuestionForm from "../components/QuestionForm";
import AnswerDisplay from "../components/AnswerDisplay";
import MetricsDashboard from "../components/MetricsDashboard";
import ConfusionMatrixChart from "../components/ConfusionMatrixChart";
import TrainingTimeline from "../components/TrainingTimeline";
import DatasetSummaryTable from "../components/DatasetSummaryTable";
import ModelVersionCard from "../components/ModelVersionCard";
import LogsViewer from "../components/LogsViewer";
import ModelPerformanceChart from "../components/ModelPerformanceChart";
import TopPredictionsList, {
  TopPrediction,
} from "../components/TopPredictionsList";
import UserHistory from "../components/UserHistory";
import SettingsPanel from "../components/SettingsPanel";
import FeedbackForm from "../components/FeedbackForm";
import NotificationsList from "../components/NotificationsList";
import DeploymentStatusCard from "../components/DeploymentStatusCard";
import FeatureImportanceChart from "../components/FeatureImportanceChart";
import PipelineStatusStepper from "../components/PipelineStatusStepper";
import ComparisonModal from "../components/ComparisonModal";
import MlopsLivePanel from "../components/MlopsLivePanel";
import ImageViewer from "../components/ImageViewer";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const API_BASE = "http://localhost:5000";

function GlowCard({
  title,
  subtitle,
  right,
  children,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.10)",
        background:
          "linear-gradient(180deg, rgba(11,16,32,0.80), rgba(11,16,32,0.55))",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(700px 280px at 20% 0%, rgba(124,58,237,0.18), transparent 55%)",
          pointerEvents: "none",
        }}
      />
      <CardContent sx={{ position: "relative" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 950 }}>
              {title}
            </Typography>
            {subtitle ? (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.4 }}
              >
                {subtitle}
              </Typography>
            ) : null}
          </Box>
          {right}
        </Stack>

        <Divider sx={{ my: 2, opacity: 0.25 }} />
        {children}
      </CardContent>
    </Card>
  );
}

export default function Page() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [result, setResult] = useState<string>("");
  const [playerName, setPlayerName] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [tab, setTab] = useState(0);

  const [topPredictions, setTopPredictions] = useState<TopPrediction[]>([]);

  const identifyRef = useRef<HTMLDivElement | null>(null);

  const canAsk = useMemo(
    () => Boolean(playerName && result && !loading),
    [playerName, result, loading]
  );

  const scrollToIdentify = () => {
    identifyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleImageUpload = async (file: File) => {
    setSelectedImage(file);
    setResult("");
    setPlayerName("");
    setAnswer("");
    setTopPredictions([]);
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`${API_BASE}/api/predict`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setResult(`Backend error: ${data?.error || response.status}`);
        setPlayerName("");
        setTopPredictions([]);
      } else if (data.error) {
        setResult(`Prediction error: ${data.error}`);
        setPlayerName("");
        setTopPredictions([]);
      } else {
        setResult(data.player_info || "No result returned");
        setPlayerName(data.player_name || "");
        setTopPredictions(Array.isArray(data.top_predictions) ? data.top_predictions : []);
      }
    } catch (e) {
      console.error(e);
      setResult("Error communicating with backend");
      setPlayerName("");
      setTopPredictions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAskQuestion = async (question: string) => {
    if (!playerName) return;
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ player_name: playerName, question }),
      });

      const data = await response.json();

      if (!response.ok) setAnswer(`Backend error: ${data?.error || response.status}`);
      else if (data.error) setAnswer(`QA error: ${data.error}`);
      else setAnswer(data.answer || "No answer returned");
    } catch (e) {
      console.error(e);
      setAnswer("Error communicating with backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Stack spacing={3}>
        <ModernHero onGetStarted={scrollToIdentify} />

        {/* IDENTIFY */}
        <Box id="identify" ref={identifyRef}>
          <Grid container spacing={2.5}>
            <Grid item xs={12} lg={5}>
              <GlowCard
                title="Identify a celebrity"
                subtitle="Drag & drop an image. Best results with a clear face."
                right={<Chip label="Vision" color="secondary" variant="outlined" />}
              >
                <ImageUploader onUpload={handleImageUpload} />
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Tip: Use a portrait photo. Avoid heavy blur and extreme angles.
                  </Typography>
                </Box>
                {loading ? <LoadingSpinner /> : null}
              </GlowCard>

              {/* Dynamic Top Predictions */}
              <TopPredictionsList predictions={topPredictions} />
            </Grid>

            <Grid item xs={12} lg={7}>
              <GlowCard
                title="Prediction result"
                subtitle={playerName ? `Detected: ${playerName}` : "Structured result + QA"}
                right={
                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => setShowComparison(true)}
                    >
                      Compare Models
                    </Button>
                    <Chip
                      label={playerName ? "Identified" : "Waiting"}
                      color={playerName ? "primary" : "default"}
                      variant={playerName ? "filled" : "outlined"}
                    />
                  </Stack>
                }
              >
                <ImageViewer file={selectedImage} title="Uploaded Image (click to zoom)" />

                {/* Result text */}
                {result ? (
                  <Box
                    sx={{
                      mt: 2,
                      p: 2,
                      borderRadius: 3,
                      border: "1px solid rgba(255,255,255,0.10)",
                      background: "rgba(255,255,255,0.03)",
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 950, mb: 1 }}>
                      Extracted profile
                    </Typography>

                    <Box sx={{ color: "text.primary" }}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {result}
                      </ReactMarkdown>
                    </Box>
                  </Box>
                ) : null}

                {/* QA */}
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 950, mb: 1 }}>
                    Ask a question
                  </Typography>

                  <QuestionForm onSubmit={handleAskQuestion} />
                  <AnswerDisplay answer={answer} />

                  {!canAsk ? (
                    <Typography variant="caption" color="text.secondary">
                      Identify a celebrity first to enable Q&A.
                    </Typography>
                  ) : null}
                </Box>
              </GlowCard>
            </Grid>
          </Grid>
        </Box>

        {/* MLOps live panel outside Tabs */}
        <Box id="monitoring" sx={{ mt: 1 }}>
          <MlopsLivePanel />
        </Box>

        {/* DASHBOARD */}
        <Box id="dashboard">
          <GlowCard
            title="MLOps Dashboard"
            subtitle="Metrics, monitoring signals, pipeline progress"
            right={<Chip label="Observability" variant="outlined" />}
          >
            {/* IMPORTANT: Tabs must contain ONLY <Tab /> children */}
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              variant="scrollable"
              allowScrollButtonsMobile
              sx={{
                "& .MuiTab-root": { fontWeight: 850 },
                mb: 2,
              }}
            >
              <Tab label="Metrics" />
              <Tab label="Monitoring" />
              <Tab label="Pipeline" />
              <Tab label="Data" />
              <Tab label="Logs" />
              <Tab label="Settings" />
            </Tabs>

            {tab === 0 && (
              <Stack spacing={2}>
                <MetricsDashboard />
                <ModelPerformanceChart />
                <ConfusionMatrixChart />
                <FeatureImportanceChart />
              </Stack>
            )}

            {tab === 1 && (
              <Stack spacing={2}>
                <DeploymentStatusCard />
                <NotificationsList />
                <UserHistory />
              </Stack>
            )}

            {tab === 2 && (
              <Stack spacing={2}>
                <PipelineStatusStepper />
                <TrainingTimeline />
                <ModelVersionCard />
              </Stack>
            )}

            {tab === 3 && (
              <Stack spacing={2}>
                <DatasetSummaryTable />
              </Stack>
            )}

            {tab === 4 && (
              <Stack spacing={2}>
                <LogsViewer />
              </Stack>
            )}

            {tab === 5 && (
              <Stack spacing={2} id="settings">
                <SettingsPanel />
                <FeedbackForm />
              </Stack>
            )}
          </GlowCard>
        </Box>

        <ComparisonModal open={showComparison} onClose={() => setShowComparison(false)} />
      </Stack>
    </Container>
  );
}
