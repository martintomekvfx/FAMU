import { useCallback, useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { ArrowLeft, Maximize2, Plus, X, Trash2, Save } from 'lucide-react';
import { subjects } from '../data/subjects';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const nodeColors = {
  subject: { bg: '#1f2937', border: '#fbbf24' },
  class: { bg: '#3b82f6', border: '#60a5fa' },
  topic: { bg: '#10b981', border: '#34d399' },
  detail: { bg: '#f59e0b', border: '#fbbf24' },
  custom: { bg: '#8b5cf6', border: '#a78bfa' },
};

function MindMapPage() {
  const { subjectId } = useParams();
  const subject = subjects.find(s => s.id === subjectId);
  
  // State for custom nodes
  const [customNodes, setCustomNodes] = useState([]);
  const [customEdges, setCustomEdges] = useState([]);
  const [nodePositions, setNodePositions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNodeLabel, setNewNodeLabel] = useState('');
  const [selectedParent, setSelectedParent] = useState('subject');

  // Load saved data from Firebase
  useEffect(() => {
    const loadMindMapData = async () => {
      if (!subjectId) return;
      
      try {
        const docRef = doc(db, 'mindMaps', subjectId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.customNodes) setCustomNodes(data.customNodes);
          if (data.customEdges) setCustomEdges(data.customEdges);
          if (data.nodePositions) setNodePositions(data.nodePositions);
        }
      } catch (error) {
        console.error('Error loading mind map data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMindMapData();
  }, [subjectId]);

  // Save to Firebase
  const saveMindMapData = async () => {
    if (!subjectId) return;
    
    setIsSaving(true);
    try {
      const docRef = doc(db, 'mindMaps', subjectId);
      await setDoc(docRef, {
        customNodes,
        customEdges,
        nodePositions,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error saving mind map data:', error);
      alert('Chyba při ukládání!');
    } finally {
      setIsSaving(false);
    }
  };

  // Auto-save when data changes
  useEffect(() => {
    if (!isLoading && (customNodes.length > 0 || Object.keys(nodePositions).length > 0)) {
      console.log('Auto-save triggered. Positions:', Object.keys(nodePositions).length);
      const timeoutId = setTimeout(() => {
        saveMindMapData();
      }, 1000); // Auto-save after 1 second of inactivity

      return () => clearTimeout(timeoutId);
    }
  }, [customNodes, customEdges, nodePositions, isLoading]);

  // Generate initial nodes and edges
  const { initialNodes, initialEdges } = useMemo(() => {
    if (!subject) return { initialNodes: [], initialEdges: [] };

    const nodes = [];
    const edges = [];
    
    // Central subject node
    nodes.push({
      id: 'subject',
      type: 'input',
      data: { 
        label: (
          <div className="text-center">
            <div className="font-bold text-lg">{subject.shortName}</div>
            <div className="text-xs mt-1 opacity-80">{subject.name}</div>
          </div>
        )
      },
      position: nodePositions['subject'] || { x: 400, y: 50 },
      style: {
        background: nodeColors.subject.bg,
        color: 'white',
        border: `3px solid ${nodeColors.subject.border}`,
        borderRadius: '12px',
        padding: '20px',
        fontSize: '14px',
        fontWeight: 'bold',
        minWidth: '250px',
      },
    });

    // Class nodes arranged in a circle
    const radius = 300;
    const angleStep = (2 * Math.PI) / subject.classes.length;
    
    subject.classes.forEach((classItem, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const x = 400 + radius * Math.cos(angle);
      const y = 250 + radius * Math.sin(angle);
      
      const classNodeId = `class-${classItem.id}`;
      
      // Extract topics from class description
      const topics = extractTopics(classItem);
      
      nodes.push({
        id: classNodeId,
        data: { 
          label: (
            <div className="text-center">
              <div className="font-bold">Hodina {classItem.id}</div>
              <div className="text-xs mt-1">{classItem.title}</div>
              <div className="text-xs opacity-70 mt-1">{classItem.date}</div>
              <div className="text-xs opacity-70">{classItem.lecturer}</div>
            </div>
          )
        },
        position: nodePositions[classNodeId] || { x, y },
        style: {
          background: nodeColors.class.bg,
          color: 'white',
          border: `2px solid ${nodeColors.class.border}`,
          borderRadius: '10px',
          padding: '15px',
          fontSize: '12px',
          minWidth: '180px',
          cursor: 'pointer',
        },
      });

      edges.push({
        id: `edge-subject-${classNodeId}`,
        source: 'subject',
        target: classNodeId,
        type: 'smoothstep',
        animated: true,
        style: { stroke: nodeColors.class.bg, strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: nodeColors.class.bg,
        },
      });

      // Add topic nodes
      topics.forEach((topic, topicIndex) => {
        const topicNodeId = `topic-${classItem.id}-${topicIndex}`;
        const topicAngle = angle + (topicIndex - topics.length / 2) * 0.15;
        const topicX = 400 + (radius + 180) * Math.cos(topicAngle);
        const topicY = 250 + (radius + 180) * Math.sin(topicAngle);
        
        nodes.push({
          id: topicNodeId,
          data: { label: topic },
          position: nodePositions[topicNodeId] || { x: topicX, y: topicY },
          style: {
            background: nodeColors.detail.bg,
            color: 'white',
            border: `2px solid ${nodeColors.detail.border}`,
            borderRadius: '8px',
            padding: '10px',
            fontSize: '11px',
            maxWidth: '150px',
          },
        });

        edges.push({
          id: `edge-${classNodeId}-${topicNodeId}`,
          source: classNodeId,
          target: topicNodeId,
          type: 'smoothstep',
          style: { stroke: nodeColors.detail.bg, strokeWidth: 1.5 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: nodeColors.detail.bg,
          },
        });
      });
    });

    // Add links node
    if (subject.links && subject.links.length > 0) {
      nodes.push({
        id: 'links',
        data: { 
          label: (
            <div>
              <div className="font-bold mb-2">📎 Odkazy</div>
              {subject.links.map((link, idx) => (
                <div key={idx} className="text-xs mb-1">
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {link.name}
                  </a>
                </div>
              ))}
            </div>
          )
        },
        position: { x: 100, y: 250 },
        style: {
          background: nodeColors.topic.bg,
          color: 'white',
          border: `2px solid ${nodeColors.topic.border}`,
          borderRadius: '10px',
          padding: '12px',
          fontSize: '11px',
          minWidth: '150px',
        },
      });

      edges.push({
        id: 'edge-subject-links',
        source: 'subject',
        target: 'links',
        type: 'smoothstep',
        style: { stroke: nodeColors.topic.bg, strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: nodeColors.topic.bg,
        },
      });
    }

    return { initialNodes: nodes, initialEdges: edges };
  }, [subject, nodePositions]);

  // Merge initial nodes with custom nodes
  const allNodes = useMemo(() => {
    return [...initialNodes, ...customNodes];
  }, [initialNodes, customNodes]);

  const allEdges = useMemo(() => {
    return [...initialEdges, ...customEdges];
  }, [initialEdges, customEdges]);

  const [nodes, setNodes, onNodesChange] = useNodesState(allNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(allEdges);

  // Update nodes when allNodes changes
  useMemo(() => {
    setNodes(allNodes);
  }, [allNodes, setNodes]);

  // Update edges when allEdges changes
  useMemo(() => {
    setEdges(allEdges);
  }, [allEdges, setEdges]);

  // Save node positions when they change
  const handleNodesChange = useCallback((changes) => {
    onNodesChange(changes);
    
    // Extract position changes and save them
    changes.forEach((change) => {
      if (change.type === 'position' && change.position) {
        // Only save when dragging stops (dragging is undefined or false)
        if (change.dragging === false || change.dragging === undefined) {
          setNodePositions((prev) => ({
            ...prev,
            [change.id]: change.position,
          }));
        }
      }
    });
  }, [onNodesChange]);

  // Also handle when node drag ends
  const onNodeDragStop = useCallback((event, node) => {
    console.log('Node drag stopped:', node.id, node.position);
    setNodePositions((prev) => {
      const updated = {
        ...prev,
        [node.id]: node.position,
      };
      console.log('Updated positions:', updated);
      return updated;
    });
  }, []);

  // Handle node click
  const onNodeClick = useCallback((event, node) => {
    if (node.id.startsWith('class-')) {
      const classId = node.id.replace('class-', '');
      window.location.href = `/FAMU/subject/${subjectId}/class/${classId}`;
    }
  }, [subjectId]);

  // Handle connection between nodes
  const onConnect = useCallback((params) => {
    const newEdge = {
      ...params,
      id: `custom-edge-${Date.now()}`,
      type: 'smoothstep',
      animated: true,
      style: { stroke: nodeColors.custom.bg, strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: nodeColors.custom.bg,
      },
    };
    setCustomEdges((eds) => [...eds, newEdge]);
  }, []);

  // Add new node
  const handleAddNode = () => {
    if (!newNodeLabel.trim()) return;

    const newNode = {
      id: `custom-${Date.now()}`,
      data: { label: newNodeLabel },
      position: { x: Math.random() * 400 + 200, y: Math.random() * 400 + 200 },
      draggable: true,
      style: {
        background: nodeColors.custom.bg,
        color: 'white',
        border: `2px solid ${nodeColors.custom.border}`,
        borderRadius: '10px',
        padding: '12px',
        fontSize: '12px',
        minWidth: '120px',
        cursor: 'move',
      },
    };

    setCustomNodes((nds) => [...nds, newNode]);

    // Add edge to parent
    if (selectedParent) {
      const newEdge = {
        id: `edge-${selectedParent}-${newNode.id}`,
        source: selectedParent,
        target: newNode.id,
        type: 'smoothstep',
        animated: true,
        style: { stroke: nodeColors.custom.bg, strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: nodeColors.custom.bg,
        },
      };
      setCustomEdges((eds) => [...eds, newEdge]);
    }

    setNewNodeLabel('');
    setIsModalOpen(false);
  };

  // Delete custom node
  const handleDeleteNode = (nodeId) => {
    setCustomNodes((nds) => nds.filter((n) => n.id !== nodeId));
    setCustomEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
  };

  if (!subject) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Předmět nenalezen</h2>
          <Link to="/" className="text-blue-600 hover:underline">
            Zpět na hlavní stránku
          </Link>
        </div>
      </div>
    );
  }

  // Get available parent nodes for new node
  const availableParents = nodes.map((node) => ({
    id: node.id,
    label: typeof node.data.label === 'string' ? node.data.label : node.id,
  }));

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-900 shadow-sm z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to={`/subject/${subjectId}`}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Zpět na předmět</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  🧠 Mind Map: {subject.shortName}
                </h1>
                <p className="text-sm text-gray-600">{subject.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {isSaving && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Save className="w-4 h-4 animate-pulse" />
                  <span>Ukládám...</span>
                </div>
              )}
              {!isSaving && !isLoading && (customNodes.length > 0 || Object.keys(nodePositions).length > 0) && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Save className="w-4 h-4" />
                  <span>Uloženo</span>
                </div>
              )}
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                <Plus className="w-4 h-4" />
                Přidat node
              </button>
              <button
                onClick={() => {
                  const element = document.querySelector('.react-flow');
                  if (element.requestFullscreen) {
                    element.requestFullscreen();
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Maximize2 className="w-4 h-4" />
                Fullscreen
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mind Map */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onNodeDragStop={onNodeDragStop}
          onConnect={onConnect}
          fitView
          attributionPosition="bottom-left"
        >
          <Controls />
          <MiniMap 
            nodeColor={(node) => {
              if (node.id === 'subject') return nodeColors.subject.bg;
              if (node.id.startsWith('class-')) return nodeColors.class.bg;
              if (node.id.startsWith('topic-')) return nodeColors.detail.bg;
              if (node.id.startsWith('custom-')) return nodeColors.custom.bg;
              return nodeColors.topic.bg;
            }}
            maskColor="rgba(0, 0, 0, 0.1)"
          />
          <Background variant="dots" gap={16} size={1} color="#e5e7eb" />
        </ReactFlow>

        {/* Legend */}
        <div className="absolute bottom-20 left-4 bg-white rounded-lg shadow-lg border-2 border-gray-900 p-4 z-10">
          <h3 className="font-bold text-sm mb-3 text-gray-900">Legenda</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ background: nodeColors.subject.bg }}></div>
              <span>Předmět</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ background: nodeColors.class.bg }}></div>
              <span>Hodina (kliknutelná)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ background: nodeColors.detail.bg }}></div>
              <span>Téma</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ background: nodeColors.topic.bg }}></div>
              <span>Odkazy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ background: nodeColors.custom.bg }}></div>
              <span>Vlastní node</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-600">
            <p>💡 Přetáhni nody pro přesunutí</p>
            <p>💡 Klikni na hodinu pro poznámky</p>
            <p>💡 Propoj nody tažením z okraje</p>
          </div>
        </div>

        {/* Custom nodes list */}
        {customNodes.length > 0 && (
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg border-2 border-gray-900 p-4 z-10 max-w-xs">
            <h3 className="font-bold text-sm mb-3 text-gray-900">Vlastní nody</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {customNodes.map((node) => (
                <div key={node.id} className="flex items-center justify-between gap-2 p-2 bg-purple-50 rounded border border-purple-200">
                  <span className="text-xs truncate flex-1">{node.data.label}</span>
                  <button
                    onClick={() => handleDeleteNode(node.id)}
                    className="p-1 hover:bg-purple-200 rounded transition-colors"
                    title="Smazat"
                  >
                    <Trash2 className="w-3 h-3 text-purple-700" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Node Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">➕ Přidat nový node</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Název nodu *
                </label>
                <input
                  type="text"
                  value={newNodeLabel}
                  onChange={(e) => setNewNodeLabel(e.target.value)}
                  placeholder="např. Důležitá poznámka, Téma..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Připojit k nodu
                </label>
                <select
                  value={selectedParent}
                  onChange={(e) => setSelectedParent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Bez připojení</option>
                  {availableParents.map((parent) => (
                    <option key={parent.id} value={parent.id}>
                      {parent.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Zrušit
                </button>
                <button
                  onClick={handleAddNode}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Přidat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to extract topics from class data
function extractTopics(classItem) {
  const topics = [];
  
  // Extract from title
  if (classItem.title) {
    // Split by common separators
    const titleParts = classItem.title.split(/[,;–—-]/);
    titleParts.forEach(part => {
      const cleaned = part.trim();
      if (cleaned.length > 3 && cleaned.length < 50) {
        topics.push(cleaned);
      }
    });
  }
  
  // Extract from description
  if (classItem.description) {
    // Look for capitalized phrases
    const capitalizedPhrases = classItem.description.match(/[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ][a-záčďéěíňóřšťúůýž]+(?:\s+[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ][a-záčďéěíňóřšťúůýž]+)*/g);
    if (capitalizedPhrases) {
      capitalizedPhrases.forEach(phrase => {
        if (phrase.length > 5 && phrase.length < 40 && !topics.includes(phrase)) {
          topics.push(phrase);
        }
      });
    }
    
    // Look for bullet points or numbered lists
    const bulletPoints = classItem.description.match(/[•\-*]\s*([^\n]+)/g);
    if (bulletPoints) {
      bulletPoints.forEach(point => {
        const cleaned = point.replace(/^[•\-*]\s*/, '').trim();
        if (cleaned.length > 5 && cleaned.length < 40 && !topics.includes(cleaned)) {
          topics.push(cleaned);
        }
      });
    }
  }
  
  // Limit to 3 most relevant topics
  return topics.slice(0, 3);
}

export default MindMapPage;
