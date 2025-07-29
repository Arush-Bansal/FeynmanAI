"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SubtopicData {
  _id: string;
  name: string;
  code: string;
  description: string;
  parentSubtopic?: string;
}

interface TestResult {
  success: boolean;
  kinematics?: {
    _id: string;
    name: string;
    code: string;
    description: string;
  };
  childSubtopics?: SubtopicData[];
  linearMotion?: {
    _id: string;
    name: string;
    code: string;
    description: string;
    parentSubtopic?: string;
  };
  linearMotionChildren?: SubtopicData[];
  treeStructure?: Record<string, unknown>;
  message?: string;
  error?: string;
}

const DebugNestedSubtopicsPage = () => {
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(false);

  const runTest = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-nested-subtopics');
      const data = await response.json();
      setTestResult(data);
      console.log('Nested subtopics test result:', data);
    } catch (error) {
      console.error('Test failed:', error);
      setTestResult({ success: false, error: 'Test failed' });
    } finally {
      setLoading(false);
    }
  };

  const renderSubtopicTree = (subtopics: SubtopicData[], level: number = 0) => {
    return (
      <div className="ml-4">
        {subtopics.map((subtopic) => (
          <div key={subtopic._id} className="mb-2">
            <div className="flex items-center" style={{ paddingLeft: `${level * 20}px` }}>
              <span className="text-gray-300">📖</span>
              <span className="text-gray-200 ml-2">{subtopic.name}</span>
              <span className="text-gray-500 text-xs ml-2">({subtopic.code})</span>
            </div>
            {subtopic.description && (
              <div className="text-gray-400 text-xs ml-6" style={{ paddingLeft: `${level * 20}px` }}>
                {subtopic.description}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Debug Nested Subtopics</h1>
        
        <Button 
          onClick={runTest} 
          disabled={loading}
          className="mb-8 bg-green-600 hover:bg-green-700"
        >
          {loading ? 'Running Test...' : 'Test Nested Subtopics'}
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

            {/* Kinematics Info */}
            {testResult.kinematics && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Kinematics Subtopic</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>Name:</strong> {testResult.kinematics.name}</p>
                    <p><strong>Code:</strong> {testResult.kinematics.code}</p>
                    <p><strong>Description:</strong> {testResult.kinematics.description}</p>
                    <p><strong>ID:</strong> {testResult.kinematics._id}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Child Subtopics */}
            {testResult.childSubtopics && testResult.childSubtopics.length > 0 && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    Child Subtopics of Kinematics ({testResult.childSubtopics.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderSubtopicTree(testResult.childSubtopics)}
                </CardContent>
              </Card>
            )}

            {/* Linear Motion Info */}
            {testResult.linearMotion && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Linear Motion (Nested Subtopic)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>Name:</strong> {testResult.linearMotion.name}</p>
                    <p><strong>Code:</strong> {testResult.linearMotion.code}</p>
                    <p><strong>Description:</strong> {testResult.linearMotion.description}</p>
                    <p><strong>Parent Subtopic:</strong> {testResult.linearMotion.parentSubtopic || 'None'}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Linear Motion Children */}
            {testResult.linearMotionChildren && testResult.linearMotionChildren.length > 0 && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    Child Subtopics of Linear Motion ({testResult.linearMotionChildren.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderSubtopicTree(testResult.linearMotionChildren, 1)}
                </CardContent>
              </Card>
            )}

            {/* Tree Structure */}
            {testResult.treeStructure && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Full Tree Structure</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs text-gray-300 overflow-auto max-h-96">
                    {JSON.stringify(testResult.treeStructure, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DebugNestedSubtopicsPage; 