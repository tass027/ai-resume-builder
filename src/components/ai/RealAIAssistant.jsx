import React, { useState } from 'react';
import { Sparkles, MessageCircle, Zap, Brain } from 'lucide-react';

const RealAIAssistant = ({ formData, experiences, skills, onAISuggestion }) => {
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState([]);

  const analyzeWithOpenAI = async (prompt) => {
    setIsLoading(true);
    try {
      // Intégration avec OpenAI API
      const response = await fetch('/api/openai/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          resumeData: { formData, experiences, skills },
          model: 'gpt-4'
        })
      });

      const data = await response.json();
      setAiResponse(data.analysis);
      setConversation(prev => [...prev, { role: 'assistant', content: data.analysis }]);
      
      // Appliquer les suggestions automatiquement si demandé
      if (data.suggestions && data.applySuggestions) {
        onAISuggestion(data.suggestions);
      }
    } catch (error) {
      console.error('Erreur AI:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const aiFeatures = [
    {
      icon: <Zap size={20} />,
      title: "Optimisation ATS",
      description: "Améliorez votre score ATS automatiquement",
      action: () => analyzeWithOpenAI("Optimise ce CV pour les systèmes ATS en identifiant les mots-clés manquants et en améliorant la structure.")
    },
    {
      icon: <Brain size={20} />,
      title: "Génération Intelligente",
      description: "Générez du contenu basé sur votre profil",
      action: () => analyzeWithOpenAI("Génère un résumé professionnel percutant basé sur mes expériences et compétences.")
    },
    {
      icon: <MessageCircle size={20} />,
      title: "Analyse de Ton",
      description: "Analysez le ton et le style de votre CV",
      action: () => analyzeWithOpenAI("Analyse le ton et le style de ce CV et suggère des améliorations pour mieux cibler le poste visé.")
    }
  ];

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '24px',
      color: 'white'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <Sparkles size={24} />
        <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>
          Assistant IA Avancé
        </h3>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px',
        marginBottom: '20px'
      }}>
        {aiFeatures.map((feature, index) => (
          <button
            key={index}
            onClick={feature.action}
            disabled={isLoading}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '12px',
              padding: '16px',
              color: 'white',
              cursor: 'pointer',
              textAlign: 'left',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.2)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.1)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              {feature.icon}
              <span style={{ fontWeight: '600' }}>{feature.title}</span>
            </div>
            <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
              {feature.description}
            </p>
          </button>
        ))}
      </div>

      {isLoading && (
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '16px',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ animation: 'pulse 2s infinite' }}>
            🤖 L'IA analyse votre CV...
          </div>
        </div>
      )}

      {aiResponse && (
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '16px',
          borderRadius: '8px',
          marginTop: '16px'
        }}>
          <h4 style={{ margin: '0 0 8px 0' }}>📊 Analyse IA</h4>
          <p style={{ margin: 0, lineHeight: '1.5' }}>{aiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default RealAIAssistant;