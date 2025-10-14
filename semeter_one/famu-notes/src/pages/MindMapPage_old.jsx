import { useCallback, useMemo, useState } from 'react';
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
import { ArrowLeft, Maximize2, Plus, Edit2, Trash2 } from 'lucide-react';
import { subjects } from '../data/subjects';

const nodeColors = {
  subject: '#1f2937', // gray-900
  class: '#3b82f6', // blue-500
  topic: '#10b981', // green-500
  detail: '#f59e0b', // amber-500
};

function MindMapPage() {
  const { subjectId } = useParams();
  const subject = subjects.find(s => s.id === subjectId);
  
  // State for node positions (persists during session)
  const [nodePositions, setNodePositions] = useState({});
  
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNode, setEditingNode] = useState(null);
  const [newNodeData, setNewNodeData] = useState({
    label: '',
    type: 'topic',
    parentId: 'subject',
  });

  // Generate nodes and edges from subject data
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
      position: { x: 400, y: 50 },
      style: {
        background: nodeColors.subject,
        color: 'white',
        border: '3px solid #fbbf24',
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
      const angle = index * angleStep - Math.PI / 2; // Start from top
      const x = 400 + radius * Math.cos(angle);
      const y = 250 + radius * Math.sin(angle);
      
      const classNodeId = `class-${classItem.id}`;
      
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
        position: { x, y },
        style: {
          background: nodeColors.class,
          color: 'white',
          border: '2px solid #60a5fa',
          borderRadius: '10px',
          padding: '15px',
          fontSize: '12px',
          minWidth: '180px',
          cursor: 'pointer',
        },
      });

      // Edge from subject to class
      edges.push({
        id: `edge-subject-${classNodeId}`,
        source: 'subject',
        target: classNodeId,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#3b82f6', strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#3b82f6',
        },
      });

      // Add description node if available
      if (classItem.description) {
        const descNodeId = `desc-${classItem.id}`;
        const descAngle = angle + angleStep * 0.3;
        const descX = 400 + (radius + 150) * Math.cos(descAngle);
        const descY = 250 + (radius + 150) * Math.sin(descAngle);
        
        nodes.push({
          id: descNodeId,
          data: { 
            label: (
              <div className="text-xs">
                {classItem.description}
              </div>
            )
          },
          position: { x: descX, y: descY },
          style: {
            background: nodeColors.detail,
            color: 'white',
            border: '2px solid #fbbf24',
            borderRadius: '8px',
            padding: '10px',
            fontSize: '11px',
            maxWidth: '150px',
          },
        });

        edges.push({
          id: `edge-${classNodeId}-${descNodeId}`,
          source: classNodeId,
          target: descNodeId,
          type: 'smoothstep',
          style: { stroke: '#f59e0b', strokeWidth: 1.5 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#f59e0b',
          },
        });
      }
    });

    // Add links as separate nodes
    if (subject.links && subject.links.length > 0) {
      const linksNodeId = 'links';
      nodes.push({
        id: linksNodeId,
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
          background: nodeColors.topic,
          color: 'white',
          border: '2px solid #34d399',
          borderRadius: '10px',
          padding: '12px',
          fontSize: '11px',
          minWidth: '150px',
        },
      });

      edges.push({
        id: 'edge-subject-links',
        source: 'subject',
        target: linksNodeId,
        type: 'smoothstep',
        style: { stroke: '#10b981', strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#10b981',
        },
      });
    }

    return { initialNodes: nodes, initialEdges: edges };
  }, [subject]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback((event, node) => {
    if (node.id.startsWith('class-')) {
      const classId = node.id.replace('class-', '');
      window.location.href = `/FAMU/subject/${subjectId}/class/${classId}`;
    }
  }, [subjectId]);

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
              <div className="text-sm text-gray-600">
                <span className="font-medium">{subject.classes.length}</span> hodin
              </div>
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
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          fitView
          attributionPosition="bottom-left"
        >
          <Controls />
          <MiniMap 
            nodeColor={(node) => {
              if (node.id === 'subject') return nodeColors.subject;
              if (node.id.startsWith('class-')) return nodeColors.class;
              if (node.id.startsWith('desc-')) return nodeColors.detail;
              return nodeColors.topic;
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
              <div className="w-4 h-4 rounded" style={{ background: nodeColors.subject }}></div>
              <span>Předmět</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ background: nodeColors.class }}></div>
              <span>Hodina (kliknutelná)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ background: nodeColors.topic }}></div>
              <span>Odkazy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ background: nodeColors.detail }}></div>
              <span>Detail</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MindMapPage;
