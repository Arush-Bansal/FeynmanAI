"use client"

import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown, BookOpen, GraduationCap, Loader2, FolderOpen, Folder } from "lucide-react";

interface Subtopic {
  _id: string;
  name: string;
  code: string;
  description: string;
  topic: string;
  parentSubtopic?: string;
  children?: Subtopic[];
}

interface Topic {
  _id: string;
  name: string;
  code: string;
  description: string;
  subject: string;
}

const SubtopicTreePage = () => {
  const [subtopics, setSubtopics] = useState<Subtopic[]>([]);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  const examCategory = searchParams.get('exam');
  const subjectId = searchParams.get('subject');
  const topicId = searchParams.get('topic');

  useEffect(() => {
    if (topicId) {
      fetchSubtopics();
      fetchTopic();
    }
  }, [topicId]);

  const fetchSubtopics = async () => {
    try {
      console.log('Fetching subtopics for topicId:', topicId);
      const response = await fetch(`/api/subtopics?topic=${topicId}`);
      const data = await response.json();
      
      console.log('Subtopics API response:', data);
      console.log('Raw subtopics data:', data.subtopics);
      
      if (data.success) {
        console.log('🔄 Starting tree building with enhanced debugging...');
        // Build tree structure on client side with proper debugging
        const buildTree = (items: Subtopic[], parentId: string | null = null): Subtopic[] => {
          const filtered = items.filter(item => {
            if (parentId === null) {
              return !item.parentSubtopic || item.parentSubtopic === null;
            }
            return item.parentSubtopic === parentId;
          });
          
          console.log(`Building tree for parentId: ${parentId}, found ${filtered.length} items`);
          
          // Debug: Show all items and their parentSubtopic values
          if (parentId === null) {
            console.log('All items with their parentSubtopic values:');
            items.forEach(item => {
              console.log(`- ${item.name} (${item._id}): parentSubtopic = ${item.parentSubtopic || 'null'}`);
            });
          }
          
          return filtered.map(item => {
            const children = buildTree(items, item._id);
            console.log(`Subtopic ${item.name} (${item._id}) has ${children.length} children`);
            return {
              ...item,
              children: children
            };
          });
        };
        
        const treeData = buildTree(data.subtopics);
        console.log('Final tree structure:', treeData);
        setSubtopics(treeData);
      } else {
        console.error('API returned error:', data.error);
        toast.error('Failed to load subtopics');
      }
    } catch (error) {
      console.error('Error fetching subtopics:', error);
      toast.error('Failed to load subtopics');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTopic = async () => {
    try {
      console.log('Fetching topic for topicId:', topicId);
      const response = await fetch(`/api/topics/${topicId}`);
      const data = await response.json();
      
      console.log('Topic API response:', data);
      
      if (data.success) {
        setTopic(data.topic);
      } else {
        console.error('Topic API returned error:', data.error);
      }
    } catch (error) {
      console.error('Error fetching topic:', error);
    }
  };

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const handleSubtopicSelect = (subtopic: Subtopic) => {
    if (!examCategory || !subjectId || !topic) {
      toast.error('Missing required parameters');
      return;
    }

    // Navigate to practice page with subtopic
    router.push(`/practice?exam=${examCategory}&subject=${subjectId}&topic=${topic.name}&subtopic=${subtopic.name}`);
  };

  const handleTopicSelect = () => {
    if (!examCategory || !subjectId || !topic) {
      toast.error('Missing required parameters');
      return;
    }

    // Navigate to practice page with just the topic
    router.push(`/practice?exam=${examCategory}&subject=${subjectId}&topic=${topic.name}`);
  };

  const renderSubtopicNode = (subtopic: Subtopic, level: number = 0, path: string[] = []) => {
    const hasChildren = subtopic.children && subtopic.children.length > 0;
    const isExpanded = expandedNodes.has(subtopic._id);
    const indent = level * 20;
    const currentPath = [...path, subtopic.name];

    // Debug logging
    console.log(`Rendering ${subtopic.name} at level ${level}, hasChildren: ${hasChildren}, children:`, subtopic.children);

    return (
      <div key={subtopic._id} className="w-full">
        <div 
          className="flex items-center py-2 px-3 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
          style={{ paddingLeft: `${indent + 12}px` }}
        >
          {hasChildren && (
            <button
              onClick={() => toggleNode(subtopic._id)}
              className="mr-2 text-gray-400 hover:text-white transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          )}
          {!hasChildren && <div className="w-6 mr-2" />}
          
          <div className="flex items-center flex-1">
            {hasChildren ? (
              isExpanded ? (
                <FolderOpen className="h-4 w-4 text-blue-400 mr-2" />
              ) : (
                <Folder className="h-4 w-4 text-gray-400 mr-2" />
              )
            ) : (
              <BookOpen className="h-4 w-4 text-green-400 mr-2" />
            )}
            <div className="flex flex-col">
              <span className="text-gray-200">{subtopic.name}</span>
              {level > 0 && (
                <span className="text-xs text-gray-500">
                  {currentPath.slice(0, -1).join(' → ')}
                </span>
              )}
            </div>
          </div>
          
          <Button
            onClick={() => handleSubtopicSelect(subtopic)}
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1"
          >
            Study
          </Button>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="ml-4">
            {subtopic.children!.map(child => renderSubtopicNode(child, level + 1, currentPath))}
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-green-400 mx-auto mb-4" />
          <p className="text-gray-300">Loading subtopic tree...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-8 py-8">
      <div className="text-left mb-8">
        <GraduationCap className="h-16 w-16 text-green-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-2">
          {topic?.name || 'Topic'} - Subtopic Tree
        </h2>
        <p className="text-gray-300 text-lg">
          Select a subtopic to study or choose the main topic to study everything
        </p>
      </div>

      {/* Main Topic Card */}
      {topic && (
        <div className="mb-8">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-yellow-400 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{topic.name}</h3>
                  <p className="text-gray-300">{topic.description}</p>
                </div>
              </div>
              <Button
                onClick={handleTopicSelect}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2"
              >
                Study Complete Topic
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Subtopic Tree */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <FolderOpen className="h-5 w-5 text-blue-400" />
          <h3 className="text-xl font-semibold text-white">Subtopic Structure</h3>
        </div>
        
        {subtopics.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No subtopics available for this topic.</p>
            <p className="text-gray-500 text-sm mt-2">This might mean the database hasn&apos;t been seeded with subtopics yet.</p>
            <Button 
              onClick={() => window.open('/debug-subtopics', '_blank')}
              className="mt-4 bg-blue-600 hover:bg-blue-700"
            >
              Debug Subtopics
            </Button>
          </div>
        ) : (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            {subtopics.map(subtopic => renderSubtopicNode(subtopic))}
          </div>
        )}
      </div>

      {/* Back Button */}
      <div className="flex justify-center">
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="text-gray-300 border-gray-600 hover:bg-gray-700"
        >
          Back to Topic Selection
        </Button>
      </div>
    </div>
  );
};

export default SubtopicTreePage; 