import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Moon, FileText, Info, ShieldAlert, Laptop } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({ title: "Settings Saved", description: "Your preferences have been updated." });
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Settings</h1>
          <p className="text-slate-500 mt-1">Manage your application preferences and configuration.</p>
        </div>
        <Button onClick={handleSave} className="bg-primary text-white hover:bg-primary/90">
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Display */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-lg flex items-center gap-2">
              <Laptop className="w-5 h-5 text-slate-500" />
              Display Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Dark Mode</Label>
                <p className="text-sm text-slate-500">Toggle dark theme interface.</p>
              </div>
              <Switch id="dark-mode" />
            </div>
            
            <div className="space-y-2">
              <Label>Default View</Label>
              <Select defaultValue="dashboard">
                <SelectTrigger>
                  <SelectValue placeholder="Select a view" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dashboard">Dashboard</SelectItem>
                  <SelectItem value="chart">Patient Chart</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="w-5 h-5 text-slate-500" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>High Priority Alerts</Label>
                <p className="text-sm text-slate-500">Notify immediately on Pathological results.</p>
              </div>
              <Switch id="alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Review Requests</Label>
                <p className="text-sm text-slate-500">Notify when an MFM review is assigned.</p>
              </div>
              <Switch id="reviews" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>System Updates</Label>
                <p className="text-sm text-slate-500">Receive model version update alerts.</p>
              </div>
              <Switch id="updates" />
            </div>
          </CardContent>
        </Card>

        {/* Export */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-500" />
              Export Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-4">
            <div className="space-y-2">
              <Label>Default Export Format</Label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document (.pdf)</SelectItem>
                  <SelectItem value="csv">Data Spreadsheet (.csv)</SelectItem>
                  <SelectItem value="json">JSON Payload (.json)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Info */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="w-5 h-5 text-slate-500" />
              System Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Application Version</span>
                <span className="font-mono font-medium">1.0.0-beta</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Build Date</span>
                <span className="font-mono font-medium">2024.03.21</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">ML Model Version</span>
                <span className="font-mono font-medium text-primary">CTG Risk v2.3</span>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Clinical Disclaimer Box */}
      <Card className="bg-slate-50 border-slate-200 shadow-none">
        <CardContent className="p-5 flex gap-4">
          <ShieldAlert className="w-8 h-8 text-slate-400 shrink-0" />
          <div className="space-y-1">
            <h4 className="font-semibold text-slate-900">Clinical Disclaimer</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              FetalGuard is a decision-support prototype tool intended for demonstration purposes. The machine learning predictions output by this system are based on historical datasets and have not been validated for real-world diagnostic use. The outputs should strictly serve as supportive insights and must not replace the professional clinical judgment of attending obstetricians, midwives, or MFM specialists.
            </p>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
