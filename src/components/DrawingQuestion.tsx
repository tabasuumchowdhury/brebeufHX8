import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas } from "fabric";
import { Button } from "./ui/button";
import { Eraser, Pencil } from "lucide-react";

interface DrawingQuestionProps {
  question: string;
  onAnswer: (answer: string) => void;
}

export const DrawingQuestion = ({ question, onAnswer }: DrawingQuestionProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<FabricCanvas | null>(null);
  const [isDrawing, setIsDrawing] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Create new canvas instance
    const canvas = new FabricCanvas(canvasRef.current);
    
    // Set initial canvas properties
    canvas.setDimensions({
      width: 600,
      height: 400
    });
    
    canvas.backgroundColor = "#ffffff";
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 2;
    canvas.freeDrawingBrush.color = "#000000";
    
    // Store canvas reference
    fabricCanvasRef.current = canvas;

    // Cleanup function
    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, []);

  const toggleEraser = () => {
    if (!fabricCanvasRef.current) return;
    setIsDrawing(!isDrawing);
    fabricCanvasRef.current.freeDrawingBrush.color = isDrawing ? "#ffffff" : "#000000";
    fabricCanvasRef.current.freeDrawingBrush.width = isDrawing ? 20 : 2;
  };

  const handleSubmit = () => {
    if (!fabricCanvasRef.current) return;
    const dataUrl = fabricCanvasRef.current.toDataURL();
    onAnswer(dataUrl);
  };

  const handleClear = () => {
    if (!fabricCanvasRef.current) return;
    fabricCanvasRef.current.clear();
    fabricCanvasRef.current.backgroundColor = "#ffffff";
    fabricCanvasRef.current.renderAll();
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-slate-800">{question}</h2>
      
      <div className="border border-slate-200 rounded-lg shadow-lg overflow-hidden">
        <canvas ref={canvasRef} />
      </div>
      
      <div className="flex gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleEraser}
          className={isDrawing ? "" : "bg-slate-100"}
        >
          {isDrawing ? <Pencil className="h-4 w-4" /> : <Eraser className="h-4 w-4" />}
        </Button>
        <Button variant="outline" onClick={handleClear}>
          Clear
        </Button>
        <Button onClick={handleSubmit}>Submit Drawing</Button>
      </div>
    </div>
  );
};