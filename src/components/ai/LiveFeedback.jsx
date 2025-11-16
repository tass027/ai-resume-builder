import React, { useState, useEffect } from 'react';
import { Sparkles, AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react';

const LiveFeedback = ({ formData, experiences, skills, onSuggestionApply }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    analyzeContent();
    const interval = setInterval(analyzeContent, 30000); // Analyse toutes les 30 secondes
    return () => clearInterval(interval);
  }, [formData, experiences, skills]);

  const analyzeContent = async () => {
    setIsAnalyzing(true);
    
    // Simulation d'analyse en temps réel
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newSuggestions = generateSuggestions();
    setSuggestions(newSuggestions);
    setIsAnalyzing(false);
    setLastUpdate(new Date());
  };

  const generateSuggestions = () => {
    const suggestions = [];

    // Analyse du résumé
    if (!formData.summary || formData.summary.length < 50) {
      suggestions.push({
        id: 'summary-length',
        type: 'warning',
        title: 'Résumé trop court',
        description: 'Votre résumé professionnel devrait faire au moins 50 caractères pour être impactant.',
        section: 'summary',
        priority: 'high',
        fix: 'Ajouter plus de détails sur votre valeur ajoutée'
      });
    }

    // Analyse des expériences
    if (experiences.length === 0) {
      suggestions.push({
        id: 'no-experience',
        type: 'error',
        title: 'Aucune expérience',
        description: 'Ajoutez au moins une expérience professionnelle à votre CV.',
        section: 'experiences',
        priority: 'critical',
        fix: 'Cliquez sur "Ajouter une expérience"'
      });
    } else {
      experiences.forEach((exp, index) => {
        if (!exp.description || exp.description.length < 20) {
          suggestions.push({
            id: `exp-desc-${index}`,
            type: 'warning',
            title: `Description courte: ${exp.title}`,
            description: 'Utilisez des verbes d\'action et des chiffres pour décrire vos réalisations.',
            section: 'experiences',
            priority: 'medium',
            fix: 'Détaillez vos responsabilités et réalisations'
          });
        }
      });
    }

    // Analyse des compétences
    if (skills.length < 3) {
      suggestions.push({
        id: 'few-skills',
        type: 'warning',
        title: 'Peu de compétences',
        description: 'Ajoutez au moins 3 compétences techniques pour renforcer votre profil.',
        section: 'skills',
        priority: 'medium',
        fix: 'Ajouter des compétences techniques et soft skills'
      });
    }

    // Score ATS
    const atsScore = calculateATSScore();
    if (atsScore < 70) {
      suggestions.push({
        id: 'ats-score',
        type: 'warning',
        title: 'Score ATS faible',
        description: `Votre score ATS est de ${atsScore}%. Ciblez 80% pour maximiser vos chances.`,
        section: 'global',
        priority: 'high',
        fix: 'Optimiser les mots-clés et la structure'
      });
    }

    return suggestions;
  };

  const calculateATSScore = () => {
    let score = 100;
    
    // Pénalités
    if (!formData.summary) score -= 20;
    if (experiences.length === 0) score -= 30;
    if (skills.length < 3) score -= 15;
    
    return Math.max(0, score);
  };

  const applySuggestion = (suggestionId) => {
    const suggestion = suggestions.find(s => s.id === suggestionId);
    if (suggestion && onSuggestionApply) {
      onSuggestionApply(suggestion);
    }
    
    // Retirer la suggestion appliquée
    setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return '#ef4444';
      case 'high': return '#f59e0b';
      case 'medium': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'error': return <AlertCircle size={16} />;
      case 'warning': return <AlertCircle size={16} />;
      default: return <CheckCircle size={16} />;
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
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
          <Sparkles size={24} />
          <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>
            Feedback en Temps Réel
          </h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isAnalyzing && (
            <>
              <div style={{
                width: '12px',
                height: '12px',
                background: '#00ff88',
                borderRadius: '50%',
                animation: 'pulse 1.5s infinite'
              }} />
              <span style={{ fontSize: '12px' }}>Analyse...</span>
            </>
          )}
          
          {lastUpdate && !isAnalyzing && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              opacity: 0.8
            }}>
              <Clock size={12} />
              Mis à jour: {lastUpdate.toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>

      {/* Statistiques rapides */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '12px',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '20px', fontWeight: '700' }}>
            {suggestions.length}
          </div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>Suggestions</div>
        </div>
        
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '12px',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '20px', fontWeight: '700' }}>
            {calculateATSScore()}%
          </div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>Score ATS</div>
        </div>
        
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '12px',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '20px', fontWeight: '700' }}>
            {suggestions.filter(s => s.priority === 'critical').length}
          </div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>Critiques</div>
        </div>
      </div>

      {/* Liste des suggestions */}
      <div style={{
        maxHeight: '400px',
        overflowY: 'auto'
      }}>
        {suggestions.length === 0 ? (
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <CheckCircle size={32} style={{ marginBottom: '8px', opacity: 0.8 }} />
            <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>
              Excellent ! Votre CV semble optimisé. Continuez ainsi !
            </p>
          </div>
        ) : (
          suggestions.map(suggestion => (
            <div
              key={suggestion.id}
              style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '12px',
                borderLeft: `4px solid ${getPriorityColor(suggestion.priority)}`,
                backdropFilter: 'blur(10px)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                marginBottom: '8px'
              }}>
                <div style={{
                  color: getPriorityColor(suggestion.priority),
                  flexShrink: 0
                }}>
                  {getIcon(suggestion.type)}
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '4px'
                  }}>
                    <h4 style={{ 
                      margin: 0, 
                      fontSize: '14px', 
                      fontWeight: '600' 
                    }}>
                      {suggestion.title}
                    </h4>
                    
                    <span style={{
                      background: getPriorityColor(suggestion.priority),
                      padding: '2px 6px',
                      borderRadius: '12px',
                      fontSize: '10px',
                      fontWeight: '700',
                      textTransform: 'uppercase'
                    }}>
                      {suggestion.priority}
                    </span>
                  </div>
                  
                  <p style={{ 
                    margin: '0 0 8px 0', 
                    fontSize: '13px', 
                    opacity: 0.9,
                    lineHeight: '1.4'
                  }}>
                    {suggestion.description}
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{
                      fontSize: '12px',
                      opacity: 0.7
                    }}>
                      💡 {suggestion.fix}
                    </span>
                    
                    <button
                      onClick={() => applySuggestion(suggestion.id)}
                      style={{
                        padding: '6px 12px',
                        background: 'rgba(255,255,255,0.2)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        borderRadius: '6px',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Zap size={12} />
                      Appliquer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Actions globales */}
      {suggestions.length > 0 && (
        <div style={{
          display: 'flex',
          gap: '8px',
          marginTop: '16px'
        }}>
          <button
            onClick={() => suggestions.forEach(s => applySuggestion(s.id))}
            style={{
              flex: 1,
              padding: '12px',
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '8px',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Sparkles size={16} />
            Tout Appliquer
          </button>
        </div>
      )}
    </div>
  );
};

export default LiveFeedback;