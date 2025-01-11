import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface GradePredictionProps {
  data: any;
  onComplete: () => void;
}

export function GradePrediction({ data, onComplete }: GradePredictionProps) {
  // This is a simple mock prediction - in a real app, you'd use a proper ML model
  const predictGrade = () => {
    const baseScore = 70;
    const modifiers = {
      testPrep: data.testPrep === "completed" ? 5 : 0,
      parentalInvolvement: (data.parentalInvolvement - 50) * 0.1,
      studyHours: (data.studyHours - 50) * 0.1,
      previousGrade: (data.previousGrade - 70) * 0.2,
    };

    return Math.min(100, Math.max(0, 
      baseScore + 
      modifiers.testPrep + 
      modifiers.parentalInvolvement + 
      modifiers.studyHours +
      modifiers.previousGrade
    ));
  };

  const predictedGrade = predictGrade();

  const chartData = {
    labels: ['Predicted Grade'],
    datasets: [
      {
        label: 'Grade',
        data: [predictedGrade],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Predicted Grade',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grade Prediction Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-[300px]">
          <Bar data={chartData} options={options} />
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold mb-4">
            Predicted Grade: {predictedGrade.toFixed(1)}%
          </p>
          <Button onClick={onComplete}>Get Study Recommendations</Button>
        </div>
      </CardContent>
    </Card>
  );
}