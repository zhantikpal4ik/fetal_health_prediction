import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { MOCK_HISTORY, PredictionStatus } from "@/lib/mock-data";
import { PredictionBadge } from "@/components/StatusBadge";
import { cn } from "@/lib/utils";

const TABS = ["All", "Normal", "Suspect", "Pathological"];

export default function History() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHistory = MOCK_HISTORY.filter(item => {
    const matchesTab = activeTab === "All" || item.prediction === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Assessment History</h1>
        <p className="text-slate-500 mt-1">Review previous fetal assessments and model outputs.</p>
      </div>

      <Card className="shadow-sm border-slate-200">
        <CardHeader className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 space-y-0">
          
          {/* Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-lg">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                  activeTab === tab 
                    ? "bg-white text-slate-900 shadow-sm" 
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search ID or name..." 
              className="pl-9 h-9 border-slate-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-medium">Date & Time</th>
                  <th className="px-6 py-3 font-medium">Patient ID</th>
                  <th className="px-6 py-3 font-medium">Patient Name</th>
                  <th className="px-6 py-3 font-medium">Prediction</th>
                  <th className="px-6 py-3 font-medium">Confidence</th>
                  <th className="px-6 py-3 font-medium">Reviewed By</th>
                  <th className="px-6 py-3 font-medium text-right">Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((row, idx) => (
                    <tr 
                      key={idx} 
                      onClick={() => setLocation('/patient')}
                      className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 text-slate-600">{row.date}</td>
                      <td className="px-6 py-4 font-medium text-slate-900">{row.id}</td>
                      <td className="px-6 py-4 text-slate-700">{row.name}</td>
                      <td className="px-6 py-4">
                        <PredictionBadge status={row.prediction} />
                      </td>
                      <td className="px-6 py-4 font-mono text-slate-600">{row.confidence}</td>
                      <td className="px-6 py-4 text-slate-600">{row.reviewer}</td>
                      <td className="px-6 py-4 text-right">
                        <span className={cn(
                          "px-2.5 py-1 rounded-full text-xs font-medium border",
                          row.outcome === "Pending" ? "bg-amber-50 text-amber-700 border-amber-200" :
                          row.outcome === "Admitted" ? "bg-red-50 text-red-700 border-red-200" :
                          "bg-slate-100 text-slate-600 border-slate-200"
                        )}>
                          {row.outcome}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                      <Filter className="w-8 h-8 mx-auto text-slate-300 mb-3" />
                      <p>No records found matching your filters.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
