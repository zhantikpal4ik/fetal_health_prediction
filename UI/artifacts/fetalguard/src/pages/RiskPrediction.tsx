import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BrainCircuit, AlertTriangle, Save, Download, UserPlus, Info, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const featureImportance = [
  { name: "Abnormal Short-term Variability", influence: 85, direction: "up" },
  { name: "Prolonged Decelerations", influence: 78, direction: "up" },
  { name: "Baseline FHR", influence: 65, direction: "up" },
  { name: "Mean Long-term Variability", influence: 55, direction: "down" },
  { name: "Histogram Variance", influence: 40, direction: "up" },
];

export default function RiskPrediction() {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setIsAnalyzing(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = () => toast({ title: "Saved", description: "Prediction saved to patient chart.", variant: "default" });
  const handleExport = () => toast({ title: "Exported", description: "PDF summary downloaded." });
  const handleReview = () => toast({ 
    title: "Review Requested", 
    description: "Alert sent to Dr. James Wright, MFM Specialist.",
    className: "bg-amber-50 border-amber-200 text-amber-900" 
  });

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto min-h-[calc(100vh-80px)] flex flex-col">
      <AnimatePresence mode="wait">
        {isAnalyzing ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col items-center justify-center space-y-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
              <div className="bg-white p-6 rounded-full border border-slate-100 shadow-xl relative z-10">
                <BrainCircuit className="w-16 h-16 text-primary animate-bounce" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">Running ML Model...</h2>
              <p className="text-slate-500 font-medium">Analyzing 21 cardiotocography features</p>
            </div>
            
            <div className="w-64 h-2 bg-slate-100 rounded-full overflow-hidden mt-4">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            
            {/* Top Action Bar */}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Prediction Results</h1>
                <p className="text-slate-500 text-sm">Generated: March 21, 2024 at 09:17 AM</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleSave} className="bg-white shadow-sm hover:bg-slate-50">
                  <Save className="w-4 h-4 mr-2 text-slate-500" /> Save to Chart
                </Button>
                <Button variant="outline" onClick={handleExport} className="bg-white shadow-sm hover:bg-slate-50">
                  <Download className="w-4 h-4 mr-2 text-slate-500" /> Export
                </Button>
                <Button onClick={handleReview} className="bg-amber-500 hover:bg-amber-600 text-white shadow-md">
                  <UserPlus className="w-4 h-4 mr-2" /> Request Review
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Main Prediction Card */}
              <Card className="border-red-200 shadow-lg shadow-red-900/5 bg-gradient-to-b from-red-50 to-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-red-500" />
                <CardContent className="p-8 flex flex-col items-center justify-center text-center h-full space-y-6">
                  <div className="bg-red-100 p-4 rounded-full mb-2">
                    <AlertTriangle className="w-12 h-12 text-red-600" />
                  </div>
                  
                  <div>
                    <h2 className="text-sm font-bold text-red-600 tracking-widest uppercase mb-2">Model Classification</h2>
                    <div className="text-5xl font-black text-slate-900 tracking-tight">PATHOLOGICAL</div>
                  </div>

                  <div className="w-full bg-red-100 rounded-lg p-4 mt-4 border border-red-200 text-left flex gap-3">
                    <Info className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-red-900 text-sm">Clinical Recommendation</h4>
                      <p className="text-red-800 text-sm mt-1">Urgent senior obstetric review recommended. Do not delay assessment. High probability of fetal hypoxia or acidosis.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                {/* Probability Distribution */}
                <Card className="shadow-sm border-slate-200">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-slate-900 mb-5">Class Probabilities</h3>
                    <div className="space-y-4">
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-slate-700">Pathological</span>
                          <span className="font-bold text-slate-900">85%</span>
                        </div>
                        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-slate-700">Suspect</span>
                          <span className="font-bold text-slate-900">12%</span>
                        </div>
                        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: '12%' }}></div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-slate-700">Normal</span>
                          <span className="font-bold text-slate-900">3%</span>
                        </div>
                        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: '3%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Feature Importance */}
                <Card className="shadow-sm border-slate-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-end mb-5">
                      <h3 className="font-bold text-slate-900">Top Contributing Features</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {featureImportance.map((feat, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-1/2 text-sm text-slate-700 font-medium truncate flex justify-between">
                            {feat.name}
                            <span className={feat.direction === "up" ? "text-red-500 font-bold" : "text-emerald-500 font-bold"}>
                              {feat.direction === "up" ? "↑" : "↓"}
                            </span>
                          </div>
                          <div className="w-1/2 flex items-center gap-2">
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden flex justify-start">
                              <div 
                                className={`h-full rounded-full ${i < 2 ? 'bg-primary' : 'bg-primary/50'}`} 
                                style={{ width: `${feat.influence}%` }} 
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-5 pt-4 border-t border-slate-100">
                      <p className="text-xs text-slate-500 italic flex items-center gap-1">
                        <Info className="w-3 h-3" />
                        Feature importance reflects model influence, not causation.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Bottom Disclaimer */}
            <div className="bg-slate-800 text-slate-300 p-4 rounded-xl text-center text-sm font-medium border border-slate-700 mt-8 shadow-inner flex items-center justify-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              This prediction is intended to support, not replace, clinical judgment.
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
