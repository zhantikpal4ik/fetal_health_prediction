import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, ArrowRight, Edit, LineChart, ActivitySquare, AlertCircle } from "lucide-react";
import { CTG_DATA, MOCK_PATIENTS } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";

const DataRow = ({ label, item }: { label: string; item: any }) => (
  <div className="flex justify-between items-center py-2.5 border-b border-slate-100 last:border-0 group hover:bg-slate-50 px-2 rounded-md transition-colors">
    <span className="text-sm font-medium text-slate-600">{label}</span>
    <div className="flex items-center gap-3">
      <span className="font-semibold text-slate-900">{item.value}</span>
      {item.tag && (
        <Badge
          variant={
            item.tagType === "destructive"
              ? "destructive"
              : item.tagType === "warning"
              ? "default"
              : "secondary"
          }
          className={item.tagType === "warning" ? "bg-amber-100 text-amber-800 hover:bg-amber-200" : ""}
        >
          {item.tag}
        </Badge>
      )}
    </div>
  </div>
);

function parseNumericValue(value: string | number) {
  if (typeof value === "number") return value;
  return parseFloat(String(value).replace("%", "").replace("ms", "").trim());
}

function buildModelFeatures() {
  return {
    "baseline value": parseNumericValue(CTG_DATA.baselineFHR.value),
    "accelerations": parseNumericValue(CTG_DATA.accelerations.value),
    "fetal_movement": parseNumericValue(CTG_DATA.fetalMovements.value),
    "uterine_contractions": parseNumericValue(CTG_DATA.contractions.value),
    "light_decelerations": parseNumericValue(CTG_DATA.lightDecelerations.value),
    "severe_decelerations": parseNumericValue(CTG_DATA.severeDecelerations.value),
    "prolongued_decelerations": parseNumericValue(CTG_DATA.prolongedDecelerations.value),
    "abnormal_short_term_variability": parseNumericValue(CTG_DATA.abnormalSTV.value),
    "mean_value_of_short_term_variability": parseNumericValue(CTG_DATA.meanSTV.value),
    "percentage_of_time_with_abnormal_long_term_variability": parseNumericValue(CTG_DATA.abnormalLTVTime.value),
    "mean_value_of_long_term_variability": parseNumericValue(CTG_DATA.meanLTV.value),
    "histogram_width": parseNumericValue(CTG_DATA.histogramWidth.value),
    "histogram_min": parseNumericValue(CTG_DATA.histogramMin.value),
    "histogram_max": parseNumericValue(CTG_DATA.histogramMax.value),
    "histogram_number_of_peaks": parseNumericValue(CTG_DATA.histogramPeaks.value),
    "histogram_number_of_zeroes": parseNumericValue(CTG_DATA.histogramZeroes.value),
    "histogram_mode": parseNumericValue(CTG_DATA.histogramMode.value),
    "histogram_mean": parseNumericValue(CTG_DATA.histogramMean.value),
    "histogram_median": parseNumericValue(CTG_DATA.histogramMedian.value),
    "histogram_variance": parseNumericValue(CTG_DATA.histogramVariance.value),
    "histogram_tendency": parseNumericValue(CTG_DATA.histogramTendency.value),
  };
}

export default function CTGSummary() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const patient = MOCK_PATIENTS[1];
  const [isRunningPrediction, setIsRunningPrediction] = useState(false);

  const handleEdit = () => {
    toast({
      title: "Edit Mode",
      description: "Data editing functionality available in full release.",
    });
  };

  const handleRunPrediction = async () => {
    try {
      setIsRunningPrediction(true);

      const features = buildModelFeatures();

      const response = await fetch("https://noncancelable-satisfactory-lakeisha.ngrok-free.dev/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(features),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Prediction failed");
      }

      sessionStorage.setItem("fetalguardPrediction", JSON.stringify(data));
      sessionStorage.setItem("fetalguardFeatures", JSON.stringify(features));

      setLocation("/prediction");
    } catch (error) {
      toast({
        title: "Prediction failed",
        description: error instanceof Error ? error.message : "Could not run the model.",
        variant: "destructive",
      });
    } finally {
      setIsRunningPrediction(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">CTG Feature Summary</h1>
          <p className="text-slate-500 text-sm mt-1">
            Patient: {patient.name} ({patient.id}) • Uploaded: Today, 09:15 AM
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleEdit} className="bg-white hover:bg-slate-50 shadow-sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit Data
          </Button>
          <Button
            onClick={handleRunPrediction}
            disabled={isRunningPrediction}
            className="bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
          >
            <Activity className="w-4 h-4 mr-2" />
            {isRunningPrediction ? "Running..." : "Run Prediction"}
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-3">
            <CardTitle className="text-base flex items-center gap-2 text-slate-800">
              <HeartPulseIcon className="w-5 h-5 text-rose-500" />
              FHR & Contractions
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <DataRow label="Baseline FHR" item={CTG_DATA.baselineFHR} />
            <DataRow label="Accelerations" item={CTG_DATA.accelerations} />
            <DataRow label="Fetal Movements" item={CTG_DATA.fetalMovements} />
            <DataRow label="Uterine Contractions" item={CTG_DATA.contractions} />
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-3">
            <CardTitle className="text-base flex items-center gap-2 text-slate-800">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              Decelerations
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <DataRow label="Light Decelerations" item={CTG_DATA.lightDecelerations} />
            <DataRow label="Severe Decelerations" item={CTG_DATA.severeDecelerations} />
            <DataRow label="Prolonged Decelerations" item={CTG_DATA.prolongedDecelerations} />
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-3">
            <CardTitle className="text-base flex items-center gap-2 text-slate-800">
              <ActivitySquare className="w-5 h-5 text-blue-500" />
              Variability
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <DataRow label="Abnormal Short-term Variability" item={CTG_DATA.abnormalSTV} />
            <DataRow label="Mean Short-term Variability" item={CTG_DATA.meanSTV} />
            <DataRow label="% Time with Abnormal LTV" item={CTG_DATA.abnormalLTVTime} />
            <DataRow label="Mean Long-term Variability" item={CTG_DATA.meanLTV} />
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-3">
            <CardTitle className="text-base flex items-center gap-2 text-slate-800">
              <LineChart className="w-5 h-5 text-indigo-500" />
              Statistical Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 grid grid-cols-2 gap-x-6 gap-y-0">
            <div className="col-span-2">
              <DataRow label="Histogram Variance" item={CTG_DATA.histogramVariance} />
            </div>
            <DataRow label="Width" item={CTG_DATA.histogramWidth} />
            <DataRow label="Min" item={CTG_DATA.histogramMin} />
            <DataRow label="Max" item={CTG_DATA.histogramMax} />
            <DataRow label="Peaks" item={CTG_DATA.histogramPeaks} />
            <DataRow label="Zeroes" item={CTG_DATA.histogramZeroes} />
            <DataRow label="Mode" item={CTG_DATA.histogramMode} />
            <DataRow label="Mean" item={CTG_DATA.histogramMean} />
            <DataRow label="Median" item={CTG_DATA.histogramMedian} />
            <div className="col-span-2">
              <DataRow label="Tendency" item={CTG_DATA.histogramTendency} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function HeartPulseIcon(props: any) {
  return <Activity {...props} />;
}