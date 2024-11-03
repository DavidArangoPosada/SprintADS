import React, { useState, useEffect } from 'react';
import type { Requirement } from '../App';

interface RequirementFormProps {
  onSubmit: (requirement: Omit<Requirement, 'id'>) => void;
  type: 'backend' | 'frontend';
  onClose: () => void;
  initialData?: Requirement | null;
}

export default function RequirementForm({ 
  onSubmit, 
  type, 
  onClose, 
  initialData 
}: RequirementFormProps) {
  const [content, setContent] = useState(initialData?.content || '');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>(
    initialData?.priority || 'medium'
  );

  useEffect(() => {
    if (initialData) {
      setContent(initialData.content);
      setPriority(initialData.priority || 'medium');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ content, priority, type });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Requirement Description
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          rows={4}
          required
        />
      </div>
      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
          Priority
        </label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
          className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {initialData ? 'Update' : 'Add'} Requirement
        </button>
      </div>
    </form>
  );
}