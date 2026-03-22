import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Activity, ArrowRight, Baby, FileText, HeartPulse, History, Stethoscope, Thermometer, User } from "lucide-react";
import { MOCK_PATIENTS } from "@/lib/mock-data";
import { PriorityBadge } from "@/components/StatusBadge";

export default function PatientChart() {
  const [, setLocation] = useLocation();
  const patient = MOCK_PATIENTS[1]; // Defaulting to Priya Patel as requested

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Patient Chart</h1>
        <Button 
          onClick={() => setLocation('/ctg')}
          className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
        >
          View CTG Summary
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>

      {/* Patient Profile Hero Card */}
      <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="bg-white p-3 rounded-full shadow-sm border border-slate-200 text-primary">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                {patient.name}
                <PriorityBadge level={patient.priority} />
              </h2>
              <p className="text-slate-500 font-mono text-sm mt-1">ID: {patient.id} • DOB: 1989-11-14</p>
            </div>
          </div>
          <div className="flex gap-6 text-sm">
            <div className="flex flex-col">
              <span className="text-slate-500 mb-1">Attending</span>
              <span className="font-medium text-slate-900">Dr. S. Chen</span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-500 mb-1">Admission</span>
              <span className="font-medium text-slate-900">Today, 08:30 AM</span>
            </div>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-slate-500 text-sm mb-1">Age</p>
              <p className="text-lg font-semibold text-slate-900">{patient.age} yrs</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm mb-1">Gestational Age</p>
              <p className="text-lg font-semibold text-slate-900">{patient.gestationalAge}</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm mb-1">Gravida / Para</p>
              <p className="text-lg font-semibold text-slate-900">G2 P1</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm mb-1">Reason for Monitoring</p>
              <p className="text-lg font-medium text-red-600 bg-red-50 inline-block px-2 py-0.5 rounded">Decreased Movement</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Maternal Overview */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-lg flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-rose-500" />
              Maternal Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-3">
                <Activity className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-700">Blood Pressure</span>
              </div>
              <span className="font-semibold text-slate-900">128/82 mmHg</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-3">
                <HeartPulse className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-700">Heart Rate</span>
              </div>
              <span className="font-semibold text-slate-900">88 bpm</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-3">
                <Thermometer className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-700">Temperature</span>
              </div>
              <span className="font-semibold text-slate-900">37.1°C</span>
            </div>
            
            <div className="pt-2">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">Risk Factors</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200">Advanced Maternal Age</Badge>
                <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">Gestational Hypertension</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pregnancy Summary */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-lg flex items-center gap-2">
              <Baby className="w-5 h-5 text-indigo-500" />
              Pregnancy Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-5">
            <div>
              <p className="text-sm text-slate-500 mb-1">Current Stage</p>
              <p className="font-semibold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Active Monitoring
              </p>
            </div>
            
            <Separator />
            
            <div>
              <p className="text-sm text-slate-500 mb-2">Fetal Movement Status</p>
              <Badge variant="outline" className="text-red-700 border-red-200 bg-red-50">
                Decreased (Reported x24h)
              </Badge>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-slate-500 mb-2">Known Complications</p>
              <ul className="list-disc pl-4 text-sm text-slate-700 space-y-1">
                <li>Mild preeclampsia suspected</li>
                <li>Previous c-section (2020)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Clinician Notes */}
        <Card className="lg:col-span-2 shadow-sm border-slate-200">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-500" />
              Clinician Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="bg-yellow-50/50 rounded-lg p-4 border border-yellow-100 font-serif text-slate-800 leading-relaxed">
              <p className="mb-2 text-xs text-slate-500 font-sans uppercase tracking-widest font-semibold">Note added today at 08:45 AM by Dr. S. Chen</p>
              <p>
                Patient presented with decreased fetal movement x24h. Vitals stable, BP mildly elevated at 128/82. 
                CTG initiated. Reviewing history of gestational hypertension. Awaiting MFM review for delivery planning given 40w1d gestation.
                Monitoring q4h per protocol. Proceed to predictive risk assessment.
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" className="text-sm shadow-sm" onClick={() => {}}>
                + Add Note
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-lg flex items-center gap-2">
              <History className="w-5 h-5 text-slate-500" />
              Assessment Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="relative border-l-2 border-slate-200 ml-3 space-y-6">
              
              <div className="relative pl-6">
                <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white bg-slate-300"></span>
                <p className="text-xs text-slate-500 mb-0.5">Today, 08:30</p>
                <p className="text-sm font-medium text-slate-900">Patient Admitted</p>
              </div>

              <div className="relative pl-6">
                <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white bg-blue-500"></span>
                <p className="text-xs text-blue-600 font-medium mb-0.5">Today, 09:15</p>
                <p className="text-sm font-medium text-slate-900">CTG Uploaded</p>
              </div>
              
              <div className="relative pl-6">
                <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white bg-primary"></span>
                <p className="text-xs text-primary font-medium mb-0.5">Today, 09:17</p>
                <p className="text-sm font-medium text-slate-900">Model Prediction Generated</p>
              </div>

              <div className="relative pl-6">
                <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white bg-red-500 animate-pulse"></span>
                <p className="text-xs text-red-600 font-medium mb-0.5">Today, 09:20</p>
                <p className="text-sm font-medium text-red-700">Senior Review Requested</p>
              </div>

              <div className="relative pl-6">
                <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white bg-slate-200"></span>
                <p className="text-xs text-slate-500 mb-0.5">Today, 13:00 (Scheduled)</p>
                <p className="text-sm text-slate-600">Repeat Monitoring</p>
              </div>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
