"use client";

import { IFeynmanAnalysis } from "@/features/db/models/FeynmanAnalysis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HistoryClient({ analyses }: { analyses: IFeynmanAnalysis[] }) {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Analysis History</h1>
      <div className="grid gap-6">
        {analyses.map((analysis) => (
          <Card key={analysis._id}>
            <CardHeader>
              <CardTitle>{analysis.topic}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                {new Date(analysis.createdAt).toLocaleString()}
              </p>
              <div className="mt-4">
                <h3 className="font-semibold">Analysis</h3>
                <pre className="mt-2 p-4 bg-gray-100 rounded-md overflow-auto">
                  {JSON.stringify(analysis.analysis, null, 2)}
                </pre>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
