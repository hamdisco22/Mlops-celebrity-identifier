import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import HeroSection from '../components/HeroSection';
import ImageUploader from '../components/ImageUploader';
import PredictionResult from '../components/PredictionResult';
import LoadingSpinner from '../components/LoadingSpinner';
import QuestionForm from '../components/QuestionForm';
import AnswerDisplay from '../components/AnswerDisplay';
import MetricsDashboard from '../components/MetricsDashboard';
import ConfusionMatrixChart from '../components/ConfusionMatrixChart';
import TrainingTimeline from '../components/TrainingTimeline';
import DatasetSummaryTable from '../components/DatasetSummaryTable';
import ModelVersionCard from '../components/ModelVersionCard';
import LogsViewer from '../components/LogsViewer';
import ModelPerformanceChart from '../components/ModelPerformanceChart';
import TopPredictionsList from '../components/TopPredictionsList';
import UserHistory from '../components/UserHistory';
import SettingsPanel from '../components/SettingsPanel';
import FeedbackForm from '../components/FeedbackForm';
import NotificationsList from '../components/NotificationsList';
import DeploymentStatusCard from '../components/DeploymentStatusCard';
import FeatureImportanceChart from '../components/FeatureImportanceChart';
import PipelineStatusStepper from '../components/PipelineStatusStepper';
import ComparisonModal from '../components/ComparisonModal';

export default function Page() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [result, setResult] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const handleImageUpload = async (file: File) => {
    setSelectedImage(file);
    setLoading(true);

    // Prepare form data for backend
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:5000/', {
        method: 'POST',
        body: formData,
      });
      const html = await response.text();
      // naive extraction: parse result text; for demonstration we just set placeholder
      setResult('Result received from backend');
    } catch (e) {
      console.error(e);
      setResult('Error communicating with backend');
    } finally {
      setLoading(false);
    }
  };

  const handleAskQuestion = async (question: string) => {
    if (!result) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('question', question);
    // include dummy fields for demonstration
    formData.append('player_name', 'Celebrity');
    formData.append('player_info', result);
    formData.append('result_img_data', '');
    try {
      const response = await fetch('http://localhost:5000/', {
        method: 'POST',
        body: formData,
      });
      const html = await response.text();
      setAnswer('Answer from backend');
    } catch (e) {
      console.error(e);
      setAnswer('Error communicating with backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <HeroSection />
      <Box my={4}>
        <ImageUploader onUpload={handleImageUpload} />
      </Box>
      {loading && <LoadingSpinner />}
      {!loading && result && (
        <>
          <PredictionResult result={result} image={selectedImage} />
          <QuestionForm onSubmit={handleAskQuestion} />
          <AnswerDisplay answer={answer} />
        </>
      )}
      {/* MLOps and model details */}
      <MetricsDashboard />
      <ModelPerformanceChart />
      <ConfusionMatrixChart />
      <FeatureImportanceChart />
      <TrainingTimeline />
      <PipelineStatusStepper />
      <DatasetSummaryTable />
      <ModelVersionCard />
      <DeploymentStatusCard />
      <TopPredictionsList />
      <UserHistory />
      <LogsViewer />
      <NotificationsList />
      <SettingsPanel />
      <FeedbackForm />
      <ComparisonModal
        open={showComparison}
        onClose={() => setShowComparison(false)}
      />
    </Container>
  );
}