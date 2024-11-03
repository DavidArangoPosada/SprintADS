import React, { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import Header from './components/Header';
import MeetingSelector from './components/MeetingSelector';
import ProductBacklog from './components/ProductBacklog';
import AIAnalysisPanel from './components/AIAnalysisPanel';
import Modal from './components/Modal';
import RequirementForm from './components/RequirementForm';

export interface Requirement {
  id: string;
  content: string;
  priority?: 'high' | 'medium' | 'low';
  type: 'backend' | 'frontend';
}

function App() {
  const [aiRequirements, setAIRequirements] = useState<Requirement[]>([
    {
      id: '1',
      content: 'User authentication system with JWT',
      priority: 'high',
      type: 'backend'
    },
    {
      id: '2',
      content: 'RESTful API endpoints for user management',
      priority: 'medium',
      type: 'backend'
    },
    {
      id: '3',
      content: 'Responsive dashboard layout',
      priority: 'high',
      type: 'frontend'
    },
    {
      id: '4',
      content: 'Real-time data visualization components',
      priority: 'medium',
      type: 'frontend'
    }
  ]);

  const [backlogItems, setBacklogItems] = useState<Requirement[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'backend' | 'frontend'>('backend');
  const [editingRequirement, setEditingRequirement] = useState<Requirement | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const requirement = [...aiRequirements, ...backlogItems].find(req => req.id === active.id);
    if (!requirement) return;

    if (over.id.toString().startsWith('backlog-')) {
      if (active.data.current?.sortable?.containerId.startsWith('ai-')) {
        setAIRequirements(aiRequirements.filter(req => req.id !== active.id));
        setBacklogItems([...backlogItems, requirement]);
      }
    } else if (over.id.toString().startsWith('ai-')) {
      if (active.data.current?.sortable?.containerId.startsWith('backlog-')) {
        setBacklogItems(backlogItems.filter(req => req.id !== active.id));
        setAIRequirements([...aiRequirements, requirement]);
      }
    }
  };

  const handleTransferToBacklog = (requirement: Requirement) => {
    setAIRequirements(aiRequirements.filter(req => req.id !== requirement.id));
    setBacklogItems([...backlogItems, requirement]);
  };

  const handleAddRequirement = (requirementData: Omit<Requirement, 'id'>) => {
    const newRequirement: Requirement = {
      ...requirementData,
      id: editingRequirement?.id || Math.random().toString(36).substr(2, 9),
    };

    if (editingRequirement) {
      setBacklogItems(backlogItems.map(item => 
        item.id === editingRequirement.id ? newRequirement : item
      ));
      setEditingRequirement(null);
    } else {
      setBacklogItems([...backlogItems, newRequirement]);
    }
    setIsModalOpen(false);
  };

  const handleEditRequirement = (requirement: Requirement) => {
    setEditingRequirement(requirement);
    setModalType(requirement.type);
    setIsModalOpen(true);
  };

  const handleDeleteRequirement = (id: string) => {
    setBacklogItems(backlogItems.filter(item => item.id !== id));
  };

  const openModal = (type: 'backend' | 'frontend') => {
    setModalType(type);
    setEditingRequirement(null);
    setIsModalOpen(true);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex">
          <div className="w-1/2 flex flex-col">
            <div className="p-4">
              <MeetingSelector />
            </div>
            <ProductBacklog 
              backlogItems={backlogItems}
              onReorder={setBacklogItems}
              onAddRequirement={openModal}
              onEditRequirement={handleEditRequirement}
              onDeleteRequirement={handleDeleteRequirement}
            />
          </div>
          <AIAnalysisPanel 
            requirements={aiRequirements}
            onReorder={setAIRequirements}
            onTransferRequirement={handleTransferToBacklog}
          />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingRequirement(null);
        }}
        title={`${editingRequirement ? 'Edit' : 'Add'} ${modalType} Requirement`}
      >
        <RequirementForm
          type={modalType}
          onSubmit={handleAddRequirement}
          onClose={() => {
            setIsModalOpen(false);
            setEditingRequirement(null);
          }}
          initialData={editingRequirement}
        />
      </Modal>
    </DndContext>
  );
}

export default App;