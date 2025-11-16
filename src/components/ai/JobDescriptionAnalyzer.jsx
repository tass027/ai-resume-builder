import React, { useState } from 'react';
import { Search, Target, TrendingUp, BarChart3 } from 'lucide-react';

const JobDescriptionAnalyzer = ({ formData, skills, experiences, onMatchImprovement }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeJobDescription = async () => {
    if (!jobDescription.trim()) return;
    
    setIsAnalyzing(true);
    try {
      // Simulation d'analyse IA avancée
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const keywords = extractKeywords(jobDescription);
      const matchScore = calculateMatchScore(keywords);
      const suggestions = generateSuggestions(keywords, matchScore);
      
      setAnalysis({
        matchScore,
        keywords,
        suggestions,
        missingSkills: findMissingSkills(keywords),
        improvementAreas: identifyImprovementAreas(keywords)
      });
      
    } catch (error) {
      console.error('Erreur analyse:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const extractKeywords = (text) => {
    const commonSkills = ['javascript', 'python', 'react', 'node.js', 'sql', 'html', 'css', 'git'];
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    return [...new Set(words.filter(word => 
      commonSkills.includes(word) || word.length > 5
    ))].slice(0, 10);
  };

  const calculateMatchScore = (keywords) => {
    const resumeText = `${formData.summary} ${skills.map(s => s.name).join(' ')} ${experiences.map(e => e.description).join(' ')}`.toLowerCase();
    const matches = keywords.filter(keyword => resumeText.includes(keyword));
    return Math.round((matches.length / keywords.length) * 100);
  };

  const generateSuggestions = (keywords, score) => {
    const suggestions = [];
    
    if (score < 50) {
      suggestions.push("🔍 Ajoutez plus de mots-clés de l'offre d'emploi dans votre CV");
      suggestions.push("🎯 Mettez en avant les compétences correspondant au poste");
    }
    
    if (score >= 50 && score < 80) {
      suggestions.push("✨ Bon matching ! Pensez à quantifier vos réalisations");
      suggestions.push("📈 Ajoutez des chiffres pour renforcer votre crédibilité");
    }
    
    if (score >= 80) {
      suggestions.push("✅ Excellent matching ! Votre CV est bien adapté à ce poste");
    }
    
    return suggestions;
  };

  const findMissingSkills = (keywords) => {
    const resumeSkills = skills.map(s => s.name.toLowerCase());
    return keywords.filter(keyword => !resumeSkills.some(skill => skill.includes(keyword)));
  };

  const identifyImprovementAreas = (keywords) => {
    const areas = [];
    const resumeText = `${formData.summary} ${experiences.map(e => e.description).join(' ')}`.toLowerCase();
    
    keywords.forEach(keyword => {
      if (!resumeText.includes(keyword)) {
        areas.push(`Ajouter l'expertise en "${keyword}"`);
      }
    });
    
    return areas;
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
        gap: '12px',
        marginBottom: '20px'
      }}>
        <Target size={24} />
        <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>
          Analyseur d'Offre d'Emploi
        </h3>
      </div>

      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Collez ici la description du poste que vous visez..."
        rows="6"
        style={{
          width: '100%',
          padding: '16px',
          border: '2px solid rgba(255,255,255,0.3)',
          borderRadius: '12px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          color: 'white',
          fontSize: '14px',
          resize: 'vertical',
          marginBottom: '16px'
        }}
      />

      <button
        onClick={analyzeJobDescription}
        disabled={isAnalyzing || !jobDescription.trim()}
        style={{
          width: '100%',
          padding: '14px',
          background: 'rgba(255,255,255,0.2)',
          border: '2px solid rgba(255,255,255,0.3)',
          borderRadius: '12px',
          color: 'white',
          fontSize: '16px',
          fontWeight: '600',
          cursor: isAnalyzing ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '20px'
        }}
      >
        <Search size={20} />
        {isAnalyzing ? 'Analyse en cours...' : 'Analyser la Correspondance'}
      </button>

      {analysis && (
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '20px',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)'
        }}>
          {/* Score de Matching */}
          <div style={{
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            <div style={{
              fontSize: '48px',
              fontWeight: '800',
              marginBottom: '8px',
              background: 'linear-gradient(135deg, #fff, #f0f0f0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {analysis.matchScore}%
            </div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>
              Score de Correspondance
            </div>
          </div>

          {/* Métriques détaillées */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '16px',
            marginBottom: '20px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <TrendingUp size={24} style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: '18px', fontWeight: '600' }}>
                {analysis.keywords.length}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>Mots-clés</div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <BarChart3 size={24} style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: '18px', fontWeight: '600' }}>
                {analysis.missingSkills.length}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>Compétences manquantes</div>
            </div>
          </div>

          {/* Suggestions */}
          {analysis.suggestions.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>💡 Suggestions</h4>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {analysis.suggestions.map((suggestion, index) => (
                  <li key={index} style={{ marginBottom: '8px', fontSize: '14px' }}>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Compétences manquantes */}
          {analysis.missingSkills.length > 0 && (
            <div>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>🎯 Compétences à développer</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {analysis.missingSkills.map((skill, index) => (
                  <span
                    key={index}
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobDescriptionAnalyzer;