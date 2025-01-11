import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface StudyPathProps {
  data: any;
}

export function StudyPath({ data }: StudyPathProps) {
  // Mock function to generate recommendations based on the student's data
  const getRecommendations = () => {
    const recommendations = [];

    if (data.studyHours < 50) {
      recommendations.push({
        title: "Increase Study Time",
        description: "Try to gradually increase your study hours. Start with 30-minute increments.",
        resources: ["Time management workshop", "Study schedule template", "Pomodoro technique guide"],
      });
    }

    if (data.testPrep === "none") {
      recommendations.push({
        title: "Test Preparation",
        description: "Consider enrolling in a test preparation course to improve your exam strategies.",
        resources: ["Practice tests", "Online test prep courses", "Study guides"],
      });
    }

    if (data.parentalInvolvement < 50) {
      recommendations.push({
        title: "Academic Support",
        description: "Seek additional academic support through tutoring or study groups.",
        resources: ["Tutoring services", "Study group finder", "Academic counseling"],
      });
    }

    // Always include a general recommendation
    recommendations.push({
      title: "Continuous Improvement",
      description: "Focus on understanding concepts rather than memorization.",
      resources: ["Active recall techniques", "Spaced repetition tools", "Mind mapping software"],
    });

    return recommendations;
  };

  const recommendations = getRecommendations();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personalized Study Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recommendations.map((rec, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{rec.title}</h3>
                    <p className="text-muted-foreground">{rec.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-medium">Recommended Resources:</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {rec.resources.map((resource, idx) => (
                          <li key={idx}>{resource}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}