import React from 'react';
import RequirementsList from './RequirementsList';
import { useDroppable } from '@dnd-kit/core';

interface Requirement {
  id: string;
  content: string;
  priority?: 'high' | 'medium' | 'low';
}

interface TranscriptionPanelProps {
  backlogItems: Requirement[];
  onReorder: (items: Requirement[]) => void;
}

export default function TranscriptionPanel({ backlogItems, onReorder }: TranscriptionPanelProps) {
  const { setNodeRef } = useDroppable({
    id: 'product-backlog',
  });

  return (
    <div className="flex-1 p-4">
      <div ref={setNodeRef} className="h-full bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">Product Backlog</h4>
          <span className="text-sm text-gray-500">{backlogItems.length} requirements</span>
        </div>
        <RequirementsList
          requirements={backlogItems}
          onReorder={onReorder}
          className="h-[calc(100%-2rem)] overflow-y-auto"
          droppableId="product-backlog"
        />
      </div>
    </div>
  );
}