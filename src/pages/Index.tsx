import { useState } from "react";
import { CategoryQuestion } from "@/components/CategoryQuestion";
import { SliderQuestion } from "@/components/SliderQuestion";
import { StudyPath } from "@/components/StudyPath";

type QuestionStep = 
  | "gender"
  | "ethnic-group"
  | "parent-education"
  | "lunch-type"
  | "test-prep"
  | "marital-status"
  | "sports"
  | "siblings"
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
        setCurrentStep("ethnic-group");
        break;
      case "ethnic-group":
        setCurrentStep("parent-education");
        break;
      case "parent-education":
        setCurrentStep("lunch-type");
        break;
      case "lunch-type":
        setCurrentStep("test-prep");
        break;
      case "test-prep":
        setCurrentStep("marital-status");
        break;
      case "marital-status":
        setCurrentStep("sports");
        break;
      case "sports":
        setCurrentStep("siblings");
        break;
      case "siblings":
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

      case "ethnic-group":
        return (
          <CategoryQuestion
            question="What is your ethnic group?"
            options={[
              { id: "african", label: "African" },
              { id: "asian", label: "Asian" },
              { id: "north_american", label: "North American" },
              { id: "european", label: "European" },
              { id: "south_american", label: "South American" }
            ]}
            onAnswer={handleAnswer}
            selected={answers["ethnic-group"]}
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

      case "marital-status":
        return (
          <CategoryQuestion
            question="What is your parents' marital status?"
            options={[
              { id: "married", label: "Married" },
              { id: "divorced", label: "Divorced" },
              { id: "separated", label: "Separated" },
              { id: "single", label: "Single" }
            ]}
            onAnswer={handleAnswer}
            selected={answers["marital-status"]}
          />
        );

      case "sports":
        return (
          <CategoryQuestion
            question="Do you practice any sports?"
            options={[
              { id: "yes", label: "Yes" },
              { id: "no", label: "No" }
            ]}
            onAnswer={handleAnswer}
            selected={answers.sports}
          />
        );

      case "siblings":
        return (
          <SliderQuestion
            question="How many siblings do you have?"
            onAnswer={handleAnswer}
            initialValue={answers.siblings || 0}
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