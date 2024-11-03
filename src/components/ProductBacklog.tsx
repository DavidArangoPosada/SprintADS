import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import RequirementsList from './RequirementsList';
import { Plus } from 'lucide-react';
import type { Requirement } from '../App';

interface ProductBacklogProps {
  backlogItems: Requirement[];
  onReorder: (items: Requirement[]) => void;
  onAddRequirement: (type: 'backend' | 'frontend') => void;
}

export default function ProductBacklog({ 
  backlogItems, 
  onReorder,
  onAddRequirement 
}: ProductBacklogProps) {
  const backendRequirements = backlogItems.filter(item => item.type === 'backend');
  const frontendRequirements = backlogItems.filter(item => item.type === 'frontend');

  return (
    <div className="flex-1 p-4">
      <h3 className="text-lg font-medium mb-4">Product Backlog</h3>
      <div className="grid grid-cols-2 gap-4 h-[calc(100%-2rem)]">
        <BacklogSection
          title="Backend"
          requirements={backendRequirements}
          onReorder={onReorder}
          type="backend"
          onAddClick={() => onAddRequirement('backend')}
        />
        <BacklogSection
          title="Frontend"
          requirements={frontendRequirements}
          onReorder={onReorder}
          type="frontend"
          onAddClick={() => onAddRequirement('frontend')}
        />
      </div>
    </div>
  );
}

interface BacklogSectionProps {
  title: string;
  requirements: Requirement[];
  onReorder: (items: Requirement[]) => void;
  type: 'backend' | 'frontend';
  onAddClick: () => void;
}

function BacklogSection({ 
  title, 
  requirements, 
  onReorder, 
  type,
  onAddClick 
}: BacklogSectionProps) {
  const { setNodeRef } = useDroppable({
    id: `backlog-${type}`,
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-50 rounded-lg p-4 flex flex-col h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium">{title}</h4>
        <span className="text-sm text-gray-500">{requirements.length} items</span>
      </div>
      <RequirementsList
        requirements={requirements}
        onReorder={onReorder}
        className="flex-1 overflow-y-auto"
        droppableId={`backlog-${type}`}
      />
      <button 
        onClick={onAddClick}
        className="mt-3 w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 flex items-center justify-center gap-2 hover:border-gray-400 hover:text-gray-600 transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span>Add Requirement</span>
      </button>
    </div>
  );
}