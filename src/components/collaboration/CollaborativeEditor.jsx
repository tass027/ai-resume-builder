import React, { useState, useEffect } from 'react';
import { Users, Share2, MessageCircle, Eye, Edit } from 'lucide-react';

const CollaborativeEditor = ({ resumeData, onResumeUpdate }) => {
  const [collaborators, setCollaborators] = useState([]);
  const [comments, setComments] = useState([]);
  const [isSharing, setIsSharing] = useState(false);
  const [editMode, setEditMode] = useState('view'); // 'view' or 'edit'

  // Simulation de collaboration en temps réel
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001/collaboration');
    
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch (data.type) {
        case 'collaborator_joined':
          setCollaborators(prev => [...prev, data.user]);
          break;
        case 'resume_updated':
          onResumeUpdate(data.resumeData);
          break;
        case 'comment_added':
          setComments(prev => [...prev, data.comment]);
          break;
      }
    };

    return () => socket.close();
  }, [onResumeUpdate]);

  const shareResume = async () => {
    setIsSharing(true);
    try {
      // Générer un lien de partage unique
      const shareLink = await generateShareLink();
      await navigator.clipboard.writeText(shareLink);
      alert('Lien de partage copié !');
    } catch (error) {
      console.error('Erreur partage:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const addComment = (section, text) => {
    const newComment = {
      id: Date.now(),
      section,
      text,
      author: 'Vous',
      timestamp: new Date().toLocaleTimeString(),
      resolved: false
    };
    setComments(prev => [...prev, newComment]);
  };

  const generateShareLink = async () => {
    // Simulation de génération de lien
    return `https://resume-builder.com/collab/${btoa(JSON.stringify(resumeData))}`;
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '24px',
      color: 'white'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Users size={24} />
          <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>
            Mode Collaboratif
          </h3>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setEditMode(editMode === 'view' ? 'edit' : 'view')}
            style={{
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {editMode === 'view' ? <Edit size={16} /> : <Eye size={16} />}
            {editMode === 'view' ? 'Éditer' : 'Visualiser'}
          </button>

          <button
            onClick={shareResume}
            disabled={isSharing}
            style={{
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Share2 size={16} />
            Partager
          </button>
        </div>
      </div>

      {/* Liste des collaborateurs */}
      {collaborators.length > 0 && (
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>
            👥 Collaborateurs ({collaborators.length})
          </h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {collaborators.map((user, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(255,255,255,0.2)',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '12px'
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    background: '#00ff88',
                    borderRadius: '50%'
                  }}
                />
                {user.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section commentaires */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '16px',
        borderRadius: '8px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '12px'
        }}>
          <MessageCircle size={18} />
          <h4 style={{ margin: 0, fontSize: '16px' }}>Commentaires</h4>
          <span style={{
            background: 'rgba(255,255,255,0.3)',
            padding: '2px 6px',
            borderRadius: '12px',
            fontSize: '12px'
          }}>
            {comments.length}
          </span>
        </div>

        {comments.length === 0 ? (
          <p style={{ margin: 0, opacity: 0.8, fontSize: '14px' }}>
            Aucun commentaire pour le moment
          </p>
        ) : (
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {comments.map(comment => (
              <div
                key={comment.id}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  padding: '12px',
                  borderRadius: '8px',
                  marginBottom: '8px'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '4px'
                }}>
                  <span style={{ fontWeight: '600', fontSize: '14px' }}>
                    {comment.author}
                  </span>
                  <span style={{ fontSize: '12px', opacity: 0.7 }}>
                    {comment.timestamp}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '14px' }}>{comment.text}</p>
                <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>
                  Section: {comment.section}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Ajouter un commentaire */}
        <div style={{ marginTop: '12px' }}>
          <input
            type="text"
            placeholder="Ajouter un commentaire..."
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                addComment('Général', e.target.value);
                e.target.value = '';
              }
            }}
            style={{
              width: '100%',
              padding: '8px 12px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '6px',
              color: 'white',
              fontSize: '14px'
            }}
          />
        </div>
      </div>

      {/* Indicateur de mode */}
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        background: editMode === 'edit' ? '#00ff88' : '#ff6b6b',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: '600'
      }}>
        {editMode === 'edit' ? 'ÉDITION' : 'LECTURE'}
      </div>
    </div>
  );
};

export default CollaborativeEditor;