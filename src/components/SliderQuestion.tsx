import { useState } from "react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

interface SliderQuestionProps {
  question: string;
  onAnswer: (answer: number) => void;
  initialValue?: number;
}

export const SliderQuestion = ({
  question,
  onAnswer,
  initialValue = 5,
}: SliderQuestionProps) => {
  const [value, setValue] = useState([initialValue]);

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-slate-800">{question}</h2>
      
      <div className="w-full space-y-6">
        <Slider
          value={value}
          onValueChange={setValue}
          max={10}
          step={1}
          className="w-full"
        />
        
        <div className="flex justify-between text-sm text-slate-500">
          <span>0</span>
          <span>5</span>
          <span>10</span>
        </div>
        
        <div className="text-center">
          <span className="text-4xl font-bold text-indigo-600">{value[0]}</span>
        </div>
      </div>
      
      <Button onClick={() => onAnswer(value[0])}>Continue</Button>
    </div>
  );
};