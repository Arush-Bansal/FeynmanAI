"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SubtopicData {
  _id: string;
  name: string;
  code: string;
  parentSubtopic?: string;
}

interface TestResult {
  success: boolean;
  totalSubtopics?: number;
  allSubtopics?: SubtopicData[];
  treeStructure?: Array<{
    _id: string;
    name: string;
    code: string;
    children: number;
  }>;
  satelliteMotion?: {
    _id: string;
    name: string;
    code: string;
    children: number;
  };
  satelliteChildren?: SubtopicData[];
  linearMotion?: {
    _id: string;
    name: string;
    code: string;
    children: number;
  };
  linearMotionChildren?: SubtopicData[];
  message?: string;
  error?: string;
}

const DebugSubtopicsDeepPage = () => {
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(false);

  const runTest = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-subtopics-deep');
      const data = await response.json();
      setTestResult(data);
      console.log('Deep subtopics test result:', data);
    } catch (error) {
      console.error('Test failed:', error);
      setTestResult({ success: false, error: 'Test failed' });
    } finally {
      setLoading(false);
    }
  };

  const renderSubtopicList = (subtopics: SubtopicData[], title: string) => {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">{title} ({subtopics.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {subtopics.map((subtopic) => (
              <div key={subtopic._id} className="flex items-center justify-between p-2 bg-gray-700 rounded">
                <div>
                  <span className="text-gray-200">{subtopic.name}</span>
                  <span className="text-gray-500 text-xs ml-2">({subtopic.code})</span>
                </div>
                <span className="text-gray-400 text-xs">
                  Parent: {subtopic.parentSubtopic || 'None'}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Debug Deep Subtopics</h1>
        
        <Button 
          onClick={runTest} 
          disabled={loading}
          className="mb-8 bg-green-600 hover:bg-green-700"
        >
          {loading ? 'Running Test...' : 'Test Deep Subtopics'}
        </Button>

        {testResult && (
          <div className="space-y-6">
            {/* Test Status */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Test Status: {testResult.success ? '✅ Success' : '❌ Failed'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{testResult.message || testResult.error}</p>
              </CardContent>
            </Card>

            {/* Summary */}
            {testResult.totalSubtopics && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>Total Subtopics:</strong> {testResult.totalSubtopics}</p>
                    {testResult.satelliteMotion && (
                      <p><strong>Satellite Motion Children:</strong> {testResult.satelliteMotion.children}</p>
                    )}
                    {testResult.linearMotion && (
                      <p><strong>Linear Motion Children:</strong> {testResult.linearMotion.children}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* All Subtopics */}
            {testResult.allSubtopics && (
              renderSubtopicList(testResult.allSubtopics, 'All Subtopics')
            )}

            {/* Tree Structure */}
            {testResult.treeStructure && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Tree Structure</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {testResult.treeStructure.map((item) => (
                      <div key={item._id} className="flex items-center justify-between p-2 bg-gray-700 rounded">
                        <span className="text-gray-200">{item.name}</span>
                        <span className="text-gray-400 text-xs">
                          Children: {item.children}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Satellite Motion Children */}
            {testResult.satelliteChildren && testResult.satelliteChildren.length > 0 && (
              renderSubtopicList(testResult.satelliteChildren, 'Satellite Motion Children')
            )}

            {/* Linear Motion Children */}
            {testResult.linearMotionChildren && testResult.linearMotionChildren.length > 0 && (
              renderSubtopicList(testResult.linearMotionChildren, 'Linear Motion Children')
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DebugSubtopicsDeepPage; 