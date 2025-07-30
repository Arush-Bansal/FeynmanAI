"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";

const DebugSubtopicsPage = () => {
  const [testResult, setTestResult] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);

  const runTest = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-subtopics');
      const data = await response.json();
      setTestResult(data);
      console.log('Test result:', data);
    } catch (error) {
      console.error('Test failed:', error);
      setTestResult({ error: 'Test failed', details: error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Debug Subtopics</h1>
        
        <Button 
          onClick={runTest} 
          disabled={loading}
          className="mb-8 bg-green-600 hover:bg-green-700"
        >
          {loading ? 'Running Test...' : 'Run Subtopics Test'}
        </Button>

        {testResult && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Test Results</h2>
            <pre className="text-sm text-gray-300 overflow-auto">
              {JSON.stringify(testResult, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default DebugSubtopicsPage; 