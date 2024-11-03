import React from 'react';
import {
  DndContext,
  DragEndEvent,
  closestCenter,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Requirement from './Requirement';
import type { Requirement as RequirementType } from '../App';

interface RequirementsListProps {
  requirements: RequirementType[];
  onReorder: (items: RequirementType[]) => void;
  className?: string;
  droppableId: string;
  showTransfer?: boolean;
  onTransferRequirement?: (requirement: RequirementType) => void;
}

export default function RequirementsList({ 
  requirements, 
  onReorder, 
  className = '',
  droppableId,
  showTransfer = false,
  onTransferRequirement
}: RequirementsListProps) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = requirements.findIndex((req) => req.id === active.id);
      const newIndex = requirements.findIndex((req) => req.id === over.id);
      onReorder(arrayMove(requirements, oldIndex, newIndex));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={requirements} strategy={verticalListSortingStrategy}>
        <div className={className}>
          {requirements.map((requirement) => (
            <Requirement 
              key={requirement.id} 
              {...requirement}
              showTransfer={showTransfer}
              onTransfer={onTransferRequirement ? () => onTransferRequirement(requirement) : undefined}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}