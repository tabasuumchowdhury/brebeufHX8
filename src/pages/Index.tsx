import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StudentForm } from "@/components/StudentForm";
import { GradePrediction } from "@/components/GradePrediction";
import { StudyPath } from "@/components/StudyPath";

const Index = () => {
  const [step, setStep] = useState<"form" | "prediction" | "study-path">("form");
  const [studentData, setStudentData] = useState<any>(null);

  const handleDataSubmit = (data: any) => {
    setStudentData(data);
    setStep("prediction");
  };

  const handlePredictionComplete = () => {
    setStep("study-path");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Student Success Analyzer</h1>
      
      {step === "form" && (
        <Card>
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
          </CardHeader>
          <CardContent>
            <StudentForm onSubmit={handleDataSubmit} />
          </CardContent>
        </Card>
      )}

      {step === "prediction" && studentData && (
        <GradePrediction 
          data={studentData} 
          onComplete={handlePredictionComplete}
        />
      )}

      {step === "study-path" && studentData && (
        <StudyPath data={studentData} />
      )}
    </div>
  );
};

export default Index;