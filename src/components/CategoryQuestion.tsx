import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryOption {
  id: string;
  label: string;
  icon?: string;
}

interface CategoryQuestionProps {
  question: string;
  options: CategoryOption[];
  onAnswer: (answer: string) => void;
  selected?: string;
}

export const CategoryQuestion = ({
  question,
  options,
  onAnswer,
  selected,
}: CategoryQuestionProps) => {
  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-slate-800">{question}</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onAnswer(option.id)}
            className={cn(
              "relative flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all duration-200",
              "hover:border-indigo-500 hover:shadow-md",
              selected === option.id
                ? "border-indigo-500 bg-indigo-50"
                : "border-slate-200"
            )}
          >
            {selected === option.id && (
              <div className="absolute top-2 right-2">
                <Check className="w-5 h-5 text-indigo-500" />
              </div>
            )}
            {option.icon && (
              <img src={option.icon} alt="" className="w-16 h-16 object-contain" />
            )}
            <span className="text-lg font-medium text-slate-700">
              {option.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};