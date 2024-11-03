import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import RequirementsList from './RequirementsList';
import type { Requirement } from '../App';

interface AIAnalysisPanelProps {
  requirements: Requirement[];
  onReorder: (items: Requirement[]) => void;
  onTransferRequirement: (requirement: Requirement) => void;
}

export default function AIAnalysisPanel({ 
  requirements, 
  onReorder,
  onTransferRequirement 
}: AIAnalysisPanelProps) {
  const backendRequirements = requirements.filter(item => item.type === 'backend');
  const frontendRequirements = requirements.filter(item => item.type === 'frontend');

  return (
    <div className="w-1/2 bg-gray-50 p-6 border-l overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Interview Copilot™</h3>
        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-600 rounded">Ready</span>
      </div>
      
      <div className="flex-1 grid grid-cols-2 gap-4">
        <RequirementsSection
          title="Backend Requirements"
          requirements={backendRequirements}
          onReorder={onReorder}
          type="backend"
          onTransferRequirement={onTransferRequirement}
        />
        <RequirementsSection
          title="Frontend Requirements"
          requirements={frontendRequirements}
          onReorder={onReorder}
          type="frontend"
          onTransferRequirement={onTransferRequirement}
        />
      </div>

      <div className="mt-4">
        <img 
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150"
          alt="AI Assistant"
          className="w-16 h-16 rounded-full border-4 border-white shadow-lg ml-auto"
        />
      </div>
    </div>
  );
}

interface RequirementsSectionProps {
  title: string;
  requirements: Requirement[];
  onReorder: (items: Requirement[]) => void;
  type: 'backend' | 'frontend';
  onTransferRequirement: (requirement: Requirement) => void;
}

function RequirementsSection({ 
  title, 
  requirements, 
  onReorder, 
  type,
  onTransferRequirement 
}: RequirementsSectionProps) {
  const { setNodeRef } = useDroppable({
    id: `ai-${type}`,
  });

  return (
    <div ref={setNodeRef} className="bg-white rounded-lg p-4 flex flex-col h-full">
      <div className="mb-4">
        <h4 className="font-medium mb-2">{title}</h4>
        <p className="text-sm text-gray-600">
          Click arrow or drag requirements to add to Product Backlog
        </p>
      </div>
      
      <RequirementsList
        requirements={requirements}
        onReorder={onReorder}
        className="flex-1 overflow-y-auto"
        droppableId={`ai-${type}`}
        showTransfer
        onTransferRequirement={onTransferRequirement}
      />
    </div>
  );
}