import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, ArrowRight, Edit, LineChart, ActivitySquare, AlertCircle } from "lucide-react";
import { CTG_DATA, MOCK_PATIENTS } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";

// Helper component for rendering data rows
const DataRow = ({ label, item }: { label: string, item: any }) => (
  <div className="flex justify-between items-center py-2.5 border-b border-slate-100 last:border-0 group hover:bg-slate-50 px-2 rounded-md transition-colors">
    <span className="text-sm font-medium text-slate-600">{label}</span>
    <div className="flex items-center gap-3">
      <span className="font-semibold text-slate-900">{item.value}</span>
      {item.tag && (
        <Badge variant={item.tagType === "destructive" ? "destructive" : item.tagType === "warning" ? "default" : "secondary"} 
          className={
            item.tagType === 'warning' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : ''
          }
        >
          {item.tag}
        </Badge>
      )}
    </div>
  </div>
);

export default function CTGSummary() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const patient = MOCK_PATIENTS[1]; 

  const handleEdit = () => {
    toast({
      title: "Edit Mode",
      description: "Data editing functionality available in full release.",
    });
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">CTG Feature Summary</h1>
          <p className="text-slate-500 text-sm mt-1">Patient: {patient.name} ({patient.id}) • Uploaded: Today, 09:15 AM</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleEdit} className="bg-white hover:bg-slate-50 shadow-sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit Data
          </Button>
          <Button 
            onClick={() => setLocation('/prediction')}
            className="bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
          >
            <Activity className="w-4 h-4 mr-2" />
            Run Prediction
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* FHR & Contractions */}
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

        {/* Decelerations */}
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

        {/* Variability */}
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

        {/* Histogram Summary */}
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

// Simple fallback icon since HeartPulse isn't natively exported as such in older lucide
function HeartPulseIcon(props: any) {
  return <Activity {...props} />;
}
