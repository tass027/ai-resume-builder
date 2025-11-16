import React, { useState, useEffect } from 'react';
import { translations } from '../data/translations';
import { themes } from '../data/themes';

const SmartSuggestions = ({ isDark, formData, experiences, skills, language }) => {
  const [suggestions, setSuggestions] = useState([]);
  const t = translations[language];

  useEffect(() => {
    const newSuggestions = [];
    
    if (formData.summary && formData.summary.length < 100) {
      newSuggestions.push('Votre résumé semble court. Pensez à ajouter plus de détails sur vos compétences.');
    }
    
    if (experiences.length === 0) {
      newSuggestions.push('Ajoutez au moins une expérience professionnelle pour renforcer votre CV.');
    }
    
    if (skills.length < 5) {
      newSuggestions.push('Listez au moins 5 compétences principales pour votre domaine.');
    }

    if (!formData.fullName || !formData.email || !formData.jobTitle) {
      newSuggestions.push('Complétez vos informations personnelles pour un CV plus professionnel.');
    }
    
    setSuggestions(newSuggestions);
  }, [formData, experiences, skills]);

  if (suggestions.length === 0) return null;

  return (
    <div style={{
      background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
      padding: '16px',
      borderRadius: '12px',
      marginBottom: '20px',
      border: `2px solid ${themes.ocean.ai[0]}40`,
    }}>
      <h4 style={{
        fontSize: '16px',
        fontWeight: '600',
        marginBottom: '12px',
        color: isDark ? '#e0e0e0' : '#2d3748',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        💡 {t.smartSuggestions}
      </h4>
      <ul style={{ paddingLeft: '20px', margin: 0 }}>
        {suggestions.map((suggestion, index) => (
          <li key={index} style={{ marginBottom: '8px', color: isDark ? '#e0e0e0' : '#2d3748' }}>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SmartSuggestions;