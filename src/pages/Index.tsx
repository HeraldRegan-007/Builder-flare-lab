import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Scale } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  // Uncomment to automatically redirect to Justice Bot
  // useEffect(() => {
  //   navigate("/justice-bot");
  // }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="text-center max-w-lg px-4">
        <div className="flex justify-center mb-6">
          <div className="bg-primary/10 p-4 rounded-full">
            <Scale className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-4">Justice Bot</h1>
        <p className="text-slate-600 mb-8">
          Your AI-powered legal assistant, providing guidance and information to
          help you navigate legal questions.
        </p>
        <Button
          onClick={() => navigate("/justice-bot")}
          className="gap-2"
          size="lg"
        >
          Get Started
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
