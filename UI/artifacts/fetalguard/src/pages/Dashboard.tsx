import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, CheckCircle2, AlertTriangle, ShieldAlert, Activity } from "lucide-react";
import { MOCK_PATIENTS } from "@/lib/mock-data";
import { PredictionBadge, PriorityBadge } from "@/components/StatusBadge";
import { useLocation } from "wouter";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const stats = [
  { title: "Total Monitored", value: "12", icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
  { title: "Normal Cases", value: "7", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-100" },
  { title: "Suspect Cases", value: "3", icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-100" },
  { title: "Pathological", value: "2", icon: ShieldAlert, color: "text-red-600", bg: "bg-red-100" },
];

const chartData = [
  { name: 'Normal', count: 7, color: '#10B981' },
  { name: 'Suspect', count: 3, color: '#F59E0B' },
  { name: 'Pathological', count: 2, color: '#EF4444' },
];

export default function Dashboard() {
  const [, setLocation] = useLocation();

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">FetalGuard Clinical Dashboard</h1>
        <p className="text-slate-500 mt-1 flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          ML-assisted fetal health triage and decision support
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-sm border-slate-200 hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Patient Table */}
        <Card className="xl:col-span-2 shadow-sm border-slate-200">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle>Recent Assessments</CardTitle>
            <CardDescription>Currently monitored patients requiring attention.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 font-medium">Patient ID</th>
                    <th className="px-6 py-3 font-medium">Name</th>
                    <th className="px-6 py-3 font-medium">Gest. Age</th>
                    <th className="px-6 py-3 font-medium">Prediction</th>
                    <th className="px-6 py-3 font-medium">Priority</th>
                    <th className="px-6 py-3 font-medium text-right">Last Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_PATIENTS.map((patient) => (
                    <tr 
                      key={patient.id} 
                      onClick={() => setLocation('/patient')}
                      className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
                    >
                      <td className="px-6 py-4 font-medium text-slate-900">{patient.id}</td>
                      <td className="px-6 py-4 text-slate-700">{patient.name}</td>
                      <td className="px-6 py-4 text-slate-500">{patient.gestationalAge}</td>
                      <td className="px-6 py-4">
                        <PredictionBadge status={patient.prediction} />
                      </td>
                      <td className="px-6 py-4">
                        <PriorityBadge level={patient.priority} />
                      </td>
                      <td className="px-6 py-4 text-right text-slate-500 text-xs">
                        {patient.lastUpdated}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-primary mt-1 font-medium">
                          View Chart &rarr;
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Alerts Panel */}
          <Card className="shadow-sm border-red-200 bg-red-50/30">
            <CardHeader className="pb-3 border-b border-red-100">
              <CardTitle className="text-red-800 flex items-center gap-2 text-base">
                <ShieldAlert className="w-5 h-5" />
                High Priority Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {MOCK_PATIENTS.filter(p => p.priority === "HIGH").map(patient => (
                <div 
                  key={patient.id} 
                  className="bg-white p-3 rounded-lg border border-red-200 shadow-sm hover:shadow-md cursor-pointer transition-all"
                  onClick={() => setLocation('/patient')}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-slate-900">{patient.name}</span>
                    <Badge variant="destructive" className="text-[10px] uppercase">Action Required</Badge>
                  </div>
                  <div className="text-sm text-slate-500 flex justify-between items-center">
                    <span>{patient.id} • {patient.gestationalAge}</span>
                    <span className="text-red-600 text-xs font-medium">{patient.lastUpdated}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Distribution Chart */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Prediction Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <Tooltip 
                      cursor={{ fill: '#f1f5f9' }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-center pb-8">
        <p className="text-xs text-slate-400 bg-white/50 inline-block px-4 py-1.5 rounded-full border border-slate-200">
          For clinical decision support only. Not a standalone diagnostic system. Validate predictions with professional judgment.
        </p>
      </div>
    </div>
  );
}
