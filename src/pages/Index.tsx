import { useState } from "react";
import { CategoryQuestion } from "@/components/CategoryQuestion";
import { SliderQuestion } from "@/components/SliderQuestion";
import { StudentForm } from "@/components/StudentForm";
import { StudyPath } from "@/components/StudyPath";

type QuestionStep = 
  | "gender"
  | "parent-education"
  | "lunch-type"
  | "test-prep"
  | "parental-involvement"
  | "study-hours"
  | "previous-grade"
  | "results";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<QuestionStep>("gender");
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const handleAnswer = (answer: any) => {
    const newAnswers = { ...answers, [currentStep]: answer };
    setAnswers(newAnswers);

    // Move to next question based on current step
    switch (currentStep) {
      case "gender":
        setCurrentStep("parent-education");
        break;
      case "parent-education":
        setCurrentStep("lunch-type");
        break;
      case "lunch-type":
        setCurrentStep("test-prep");
        break;
      case "test-prep":
        setCurrentStep("parental-involvement");
        break;
      case "parental-involvement":
        setCurrentStep("study-hours");
        break;
      case "study-hours":
        setCurrentStep("previous-grade");
        break;
      case "previous-grade":
        setCurrentStep("results");
        break;
    }
  };

  const renderCurrentQuestion = () => {
    switch (currentStep) {
      case "gender":
        return (
          <CategoryQuestion
            question="What is your gender?"
            options={[
              { id: "male", label: "Male" },
              { id: "female", label: "Female" }
            ]}
            onAnswer={handleAnswer}
            selected={answers.gender}
          />
        );

      case "parent-education":
        return (
          <CategoryQuestion
            question="What is your parent's highest education level?"
            options={[
              { id: "some_high_school", label: "Some High School" },
              { id: "high_school", label: "High School" },
              { id: "some_college", label: "Some College" },
              { id: "bachelors", label: "Bachelor's Degree" },
              { id: "masters", label: "Master's Degree" },
              { id: "phd", label: "PhD" }
            ]}
            onAnswer={handleAnswer}
            selected={answers["parent-education"]}
          />
        );

      case "lunch-type":
        return (
          <CategoryQuestion
            question="What type of lunch do you have at school?"
            options={[
              { id: "standard", label: "Standard" },
              { id: "free/reduced", label: "Free/Reduced" }
            ]}
            onAnswer={handleAnswer}
            selected={answers["lunch-type"]}
          />
        );

      case "test-prep":
        return (
          <CategoryQuestion
            question="Have you completed a test preparation course?"
            options={[
              { id: "none", label: "No" },
              { id: "completed", label: "Yes" }
            ]}
            onAnswer={handleAnswer}
            selected={answers["test-prep"]}
          />
        );

      case "parental-involvement":
        return (
          <SliderQuestion
            question="How would you rate your parents' involvement in your education? (0-100)"
            onAnswer={handleAnswer}
            initialValue={answers["parental-involvement"]}
          />
        );

      case "study-hours":
        return (
          <SliderQuestion
            question="How many hours do you study per week? (0-100)"
            onAnswer={handleAnswer}
            initialValue={answers["study-hours"]}
          />
        );

      case "previous-grade":
        return (
          <SliderQuestion
            question="What was your previous grade? (0-100)"
            onAnswer={handleAnswer}
            initialValue={answers["previous-grade"]}
          />
        );

      case "results":
        return <StudyPath data={answers} />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-slate-800">
        Student Success Analyzer
      </h1>
      {renderCurrentQuestion()}
    </div>
  );
};

export default Index;