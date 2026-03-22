export type PredictionStatus = "Normal" | "Suspect" | "Pathological";
export type PriorityLevel = "Low" | "Medium" | "HIGH";

export interface Patient {
  id: string;
  name: string;
  age: number;
  gestationalAge: string;
  prediction: PredictionStatus;
  priority: PriorityLevel;
  lastUpdated: string;
}

export const MOCK_PATIENTS: Patient[] = [
  { id: "FG-2024-001", name: "Emma Rodriguez", age: 29, gestationalAge: "38w2d", prediction: "Normal", priority: "Low", lastUpdated: "2 hrs ago" },
  { id: "FG-2024-002", name: "Priya Patel", age: 34, gestationalAge: "40w1d", prediction: "Pathological", priority: "HIGH", lastUpdated: "15 min ago" },
  { id: "FG-2024-003", name: "Sophia Nguyen", age: 26, gestationalAge: "36w5d", prediction: "Suspect", priority: "Medium", lastUpdated: "1 hr ago" },
  { id: "FG-2024-004", name: "Maria Santos", age: 31, gestationalAge: "39w0d", prediction: "Normal", priority: "Low", lastUpdated: "3 hrs ago" },
  { id: "FG-2024-005", name: "Jennifer Kim", age: 28, gestationalAge: "37w3d", prediction: "Suspect", priority: "Medium", lastUpdated: "45 min ago" },
];

export const MOCK_HISTORY = [
  { date: "2024-03-21 09:17", id: "FG-2024-002", name: "Priya Patel", prediction: "Pathological" as PredictionStatus, confidence: "85%", reviewer: "Dr. Wright", outcome: "Pending" },
  { date: "2024-03-21 08:30", id: "FG-2024-005", name: "Jennifer Kim", prediction: "Suspect" as PredictionStatus, confidence: "62%", reviewer: "Dr. Chen", outcome: "Repeat CTG" },
  { date: "2024-03-21 07:15", id: "FG-2024-001", name: "Emma Rodriguez", prediction: "Normal" as PredictionStatus, confidence: "94%", reviewer: "Auto", outcome: "Routine" },
  { date: "2024-03-20 23:45", id: "FG-2024-003", name: "Sophia Nguyen", prediction: "Suspect" as PredictionStatus, confidence: "58%", reviewer: "Dr. Wright", outcome: "Observation" },
  { date: "2024-03-20 18:20", id: "FG-2024-012", name: "Chloe Adams", prediction: "Normal" as PredictionStatus, confidence: "88%", reviewer: "Auto", outcome: "Routine" },
  { date: "2024-03-20 14:10", id: "FG-2024-018", name: "Zoe Martinez", prediction: "Pathological" as PredictionStatus, confidence: "79%", reviewer: "Dr. Smith", outcome: "Admitted" },
  { date: "2024-03-20 11:05", id: "FG-2024-022", name: "Aisha Khan", prediction: "Normal" as PredictionStatus, confidence: "91%", reviewer: "Auto", outcome: "Routine" },
  { date: "2024-03-19 16:30", id: "FG-2024-004", name: "Maria Santos", prediction: "Normal" as PredictionStatus, confidence: "97%", reviewer: "Auto", outcome: "Routine" },
  { date: "2024-03-19 09:45", id: "FG-2024-031", name: "Sarah Jenkins", prediction: "Suspect" as PredictionStatus, confidence: "54%", reviewer: "Dr. Chen", outcome: "Cleared" },
  { date: "2024-03-18 22:15", id: "FG-2024-042", name: "Olivia Brown", prediction: "Normal" as PredictionStatus, confidence: "89%", reviewer: "Auto", outcome: "Discharged" },
];

export const CTG_DATA = {
  baselineFHR: { value: 152, tag: "ELEVATED", tagType: "warning" },
  accelerations: { value: 0.000, tag: "LOW", tagType: "destructive" },
  fetalMovements: { value: 0.000, tag: "REVIEW", tagType: "warning" },
  contractions: { value: 0.007, tag: null, tagType: null },
  lightDecelerations: { value: 0.001, tag: null, tagType: null },
  severeDecelerations: { value: 0.000, tag: null, tagType: null },
  prolongedDecelerations: { value: 0.005, tag: "ELEVATED", tagType: "destructive" },
  abnormalSTV: { value: "73%", tag: "ELEVATED", tagType: "destructive" },
  meanSTV: { value: "0.5 ms", tag: "LOW", tagType: "warning" },
  abnormalLTVTime: { value: "43%", tag: null, tagType: null },
  meanLTV: { value: "2.4 ms", tag: "LOW", tagType: "warning" },
  histogramWidth: { value: 67, tag: null, tagType: null },
  histogramMin: { value: 62, tag: null, tagType: null },
  histogramMax: { value: 129, tag: null, tagType: null },
  histogramPeaks: { value: 2, tag: null, tagType: null },
  histogramZeroes: { value: 1, tag: null, tagType: null },
  histogramMode: { value: 120, tag: null, tagType: null },
  histogramMean: { value: 137, tag: null, tagType: null },
  histogramMedian: { value: 121, tag: null, tagType: null },
  histogramVariance: { value: 73, tag: "ELEVATED", tagType: "destructive" },
  histogramTendency: { value: -1, tag: null, tagType: null },
};
