#  Celebrity Identifier – MLOps-Driven AI System

An end-to-end **MLOps-powered celebrity identification platform** that detects faces from images, identifies public figures using multimodal AI models, and exposes real-time predictions, confidence scores, and operational metrics through a modern Next.js dashboard.

This project demonstrates how **computer vision, large language models, and MLOps principles** can be combined into a production-ready AI system.


![ ](https://github.com/hamdisco22/Mlops-celebrity-identifier/blob/4bf04e7fa7bfcdd7ff6b9e04ba957a23d47b4b83/templates/Celebrity%20Identifier-1.png)
![ ](https://github.com/hamdisco22/Mlops-celebrity-identifier/blob/4bf04e7fa7bfcdd7ff6b9e04ba957a23d47b4b83/templates/Celebrity%20Identifier-2.png)

---

##  Key Features

###  Celebrity Recognition
- Upload an image and automatically detect the face
- Identify the most likely celebrity
- Generate **Top-3 predictions with confidence percentages**
- Robust handling of unknown or low-quality images

###  Multimodal AI
- Vision + language reasoning using large multimodal models
- Structured JSON outputs for reliable inference
- Separation between **prediction ranking** and **profile explanation**

###  MLOps Dashboard
- Real-time inference results
- Model metadata (version, stage, accuracy, latency)
- Dataset & training summaries
- Deployment and pipeline status (mock-ready for MLflow / Kubeflow / CI-CD)

###  Production-Oriented Backend
- Flask REST API
- Modular architecture (image processing, detection, QA engine)
- Clear API contracts for frontend integration

###  Modern Frontend
- Built with **Next.js (App Router)**
- Material UI (MUI) design system
- Dark/light mode support
- Interactive components and professional dashboard layout

---
