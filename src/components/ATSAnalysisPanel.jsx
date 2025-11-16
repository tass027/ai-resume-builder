import React from 'react';

const ATSAnalysisPanel = ({ resumeData, isDark, currentTheme }) => {
  const analyzeATS = (resumeData) => {
    const {
      formData,
      experiences,
      skills,
      educations,
      projects
    } = resumeData;

    let score = 100;
    const warnings = [];
    const suggestions = [];
    const missingKeywords = [];

    const resumeContent = `
      ${formData.summary || ''}
      ${experiences.map(exp => `${exp.position} ${exp.company} ${exp.description}`).join(' ')}
      ${skills.map(skill => skill.name).join(' ')}
      ${educations.map(edu => `${edu.degree} ${edu.institution}`).join(' ')}
      ${projects.map(proj => `${proj.name} ${proj.description}`).join(' ')}
    `.toLowerCase();

    if (!formData.summary || formData.summary.length < 50) {
      warnings.push("📝 Le résumé professionnel est trop court (minimum 50 caractères)");
      score -= 10;
    }

    const essentialKeywords = {
      technical: ['javascript', 'python', 'java', 'react', 'node.js', 'sql', 'html', 'css', 'git'],
      soft: ['gestion', 'leadership', 'communication', 'résolution', 'collaboration', 'adaptabilité'],
      action: ['développé', 'créé', 'géré', 'amélioré', 'augmenté', 'réduit', 'optimisé', 'mis en œuvre']
    };

    essentialKeywords.technical.forEach(keyword => {
      if (!resumeContent.includes(keyword) && formData.jobTitle?.toLowerCase().includes('tech')) {
        missingKeywords.push(keyword);
      }
    });

    if (missingKeywords.length > 0) {
      warnings.push(`🔍 Mots-clés techniques manquants: ${missingKeywords.slice(0, 5).join(', ')}`);
      score -= missingKeywords.length * 2;
    }

    const hasActionVerbs = essentialKeywords.action.some(verb => 
      resumeContent.includes(verb)
    );
    if (!hasActionVerbs) {
      warnings.push("⚡ Utilisez plus de verbes d'action pour décrire vos réalisations");
      score -= 8;
    }

    const hasNumbers = /\d+/.test(resumeContent);
    if (!hasNumbers) {
      suggestions.push("📊 Ajoutez des chiffres pour quantifier vos réalisations (ex: 'augmenté de 30%')");
      score -= 7;
    }

    const contentLength = resumeContent.length;
    if (contentLength < 500) {
      warnings.push("📄 Le CV semble trop court, développez vos expériences");
      score -= 5;
    } else if (contentLength > 3000) {
      warnings.push("📄 Le CV est trop long, simplifiez pour les recruteurs");
      score -= 3;
    }

    const hasCompleteContact = formData.fullName && formData.email && formData.phone;
    if (!hasCompleteContact) {
      warnings.push("📞 Informations de contact incomplètes");
      score -= 5;
    }

    if (experiences.length === 0) {
      warnings.push("💼 Ajoutez au moins une expérience professionnelle");
      score -= 15;
    }

    if (skills.length < 3) {
      warnings.push("🛠️ Ajoutez plus de compétences techniques et professionnelles");
      score -= 10;
    }

    if (educations.length === 0) {
      warnings.push("🎓 Ajoutez votre formation académique");
      score -= 8;
    }

    if (score < 80) {
      suggestions.push("🎯 Utilisez des mots-clés spécifiques à votre industrie");
      suggestions.push("📈 Quantifiez vos réussites avec des chiffres concrets");
      suggestions.push("⚡ Commencez chaque point par un verbe d'action");
    }

    if (score > 90) {
      suggestions.push("✅ Votre CV est bien optimisé pour les systèmes ATS !");
    }

    return {
      score: Math.max(score, 0),
      warnings,
      suggestions,
      missingKeywords: missingKeywords.slice(0, 5)
    };
  };

  const analysis = analyzeATS(resumeData);
  
  const getScoreColor = (score) => {
    if (score >= 90) return '#10b981';
    if (score >= 70) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div style={{
      background: isDark ? 'rgba(30, 30, 46, 0.95)' : 'rgba(255, 255, 255, 0.95)',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '24px',
      border: `2px solid ${getScoreColor(analysis.score)}40`
    }}>
      <h3 style={{
        fontSize: '20px',
        fontWeight: '700',
        marginBottom: '20px',
        color: isDark ? '#e0e0e0' : '#2d3748',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        🎯 Analyse ATS - Score: {analysis.score}/100
      </h3>

      <div style={{
        width: '100%',
        height: '12px',
        background: isDark ? '#2d2d2d' : '#e2e8f0',
        borderRadius: '6px',
        marginBottom: '20px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${analysis.score}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${getScoreColor(analysis.score)} 0%, ${getScoreColor(analysis.score)}80 100%)`,
          borderRadius: '6px',
          transition: 'width 0.5s ease'
        }} />
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {analysis.warnings.length > 0 && (
          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#ef4444'
            }}>
              ⚠️ Points à améliorer
            </h4>
            <ul style={{ paddingLeft: '20px' }}>
              {analysis.warnings.map((warning, index) => (
                <li key={index} style={{ marginBottom: '4px', color: isDark ? '#e0e0e0' : '#2d3748' }}>
                  {warning}
                </li>
              ))}
            </ul>
          </div>
        )}

        {analysis.suggestions.length > 0 && (
          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#10b981'
            }}>
              💡 Suggestions
            </h4>
            <ul style={{ paddingLeft: '20px' }}>
              {analysis.suggestions.map((suggestion, index) => (
                <li key={index} style={{ marginBottom: '4px', color: isDark ? '#e0e0e0' : '#2d3748' }}>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}

        {analysis.missingKeywords.length > 0 && (
          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#f59e0b'
            }}>
              🔍 Mots-clés recommandés
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {analysis.missingKeywords.map((keyword, index) => (
                <span
                  key={index}
                  style={{
                    background: '#f59e0b20',
                    color: '#f59e0b',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    border: '1px solid #f59e0b40'
                  }}
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ATSAnalysisPanel;