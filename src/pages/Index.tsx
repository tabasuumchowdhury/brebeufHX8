import { useState } from "react";
import { DrawingQuestion } from "@/components/DrawingQuestion";
import { CategoryQuestion } from "@/components/CategoryQuestion";
import { SliderQuestion } from "@/components/SliderQuestion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Question = {
  id: string;
  type: "drawing" | "category" | "slider";
  text: string;
  options?: Array<{ id: string; label: string; icon?: string }>;
};

const questions: Question[] = [
  {
    id: "mood",
    type: "category",
    text: "How are you feeling today?",
    options: [
      { id: "happy", label: "Happy", icon: "/placeholder.svg" },
      { id: "neutral", label: "Neutral", icon: "/placeholder.svg" },
      { id: "sad", label: "Sad", icon: "/placeholder.svg" },
    ],
  },
  {
    id: "drawing",
    type: "drawing",
    text: "Draw something that represents your day",
  },
  {
    id: "satisfaction",
    type: "slider",
    text: "How satisfied are you with your progress? (0-100)",
  },
];

const Index = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const handleAnswer = (answer: any) => {
    const question = questions[currentQuestion];
    setAnswers((prev) => ({ ...prev, [question.id]: answer }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      toast.success("Survey completed! Thank you for your responses.");
      console.log("Final answers:", { ...answers, [question.id]: answer });
    }
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    
    switch (question.type) {
      case "drawing":
        return (
          <DrawingQuestion
            question={question.text}
            onAnswer={handleAnswer}
          />
        );
      case "category":
        return (
          <CategoryQuestion
            question={question.text}
            options={question.options!}
            onAnswer={handleAnswer}
            selected={answers[question.id]}
          />
        );
      case "slider":
        return (
          <SliderQuestion
            question={question.text}
            onAnswer={handleAnswer}
            initialValue={answers[question.id]}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="h-2 bg-slate-200 rounded-full">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
          <div className="mt-2 text-sm text-slate-500 text-center">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {renderQuestion()}
        </div>
      </div>
    </div>
  );
};

export default Index;