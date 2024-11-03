import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, ArrowRight, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import type { Requirement as RequirementType } from '../App';

interface RequirementProps extends RequirementType {
  onTransfer?: () => void;
  showTransfer?: boolean;
  onEdit?: (requirement: RequirementType) => void;
  onDelete?: (id: string) => void;
}

export default function Requirement({ 
  id, 
  content, 
  priority = 'medium', 
  type,
  onTransfer,
  showTransfer = false,
  onEdit,
  onDelete
}: RequirementProps) {
  const [showActions, setShowActions] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityColors = {
    high: 'border-red-200 bg-red-50',
    medium: 'border-yellow-200 bg-yellow-50',
    low: 'border-green-200 bg-green-50',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-3 mb-2 rounded-lg border ${priorityColors[priority]} flex items-start gap-2 ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div 
        className="cursor-move"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-700 break-words">{content}</p>
        <div className="mt-1 flex items-center gap-2">
          <span className={`text-xs px-1.5 py-0.5 rounded ${
            type === 'backend' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
          }`}>
            {type}
          </span>
          <span className={`text-xs px-1.5 py-0.5 rounded ${
            priority === 'high' ? 'bg-red-100 text-red-700' :
            priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-green-100 text-green-700'
          }`}>
            {priority}
          </span>
        </div>
      </div>
      <div className="relative flex items-center gap-1">
        {showTransfer && onTransfer && (
          <button
            onClick={onTransfer}
            className="p-1 hover:bg-gray-100 rounded-md"
            title="Transfer to Product Backlog"
          >
            <ArrowRight className="w-4 h-4 text-gray-600" />
          </button>
        )}
        <button
          onClick={() => setShowActions(!showActions)}
          className="p-1 hover:bg-gray-100 rounded-md"
        >
          <MoreVertical className="w-4 h-4 text-gray-600" />
        </button>
        
        {showActions && (
          <div className="absolute right-0 top-8 bg-white rounded-md shadow-lg border py-1 z-10 min-w-[120px]">
            {onEdit && (
              <button
                onClick={() => {
                  setShowActions(false);
                  onEdit({ id, content, priority, type });
                }}
                className="w-full px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              >
                <Pencil className="w-4 h-4" />
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => {
                  setShowActions(false);
                  onDelete(id);
                }}
                className="w-full px-3 py-1.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}