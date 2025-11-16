import React, { useState } from 'react';
import { Building2, Code, Stethoscope, GraduationCap, Palette, BarChart3 } from 'lucide-react';

const IndustryTemplates = ({ onTemplateSelect, currentTemplate }) => {
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  const industryTemplates = [
    {
      id: 'tech',
      name: 'Technologie & Développement',
      description: 'Optimisé pour les postes tech avec mise en avant des compétences techniques',
      icon: <Code size={24} />,
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      features: ['Mise en avant GitHub', 'Stack technique détaillée', 'Projets open source'],
      recommended: true
    },
    {
      id: 'healthcare',
      name: 'Santé & Médical',
      description: 'Template professionnel pour le secteur médical et paramédical',
      icon: <Stethoscope size={24} />,
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      features: ['Certifications médicales', 'Expériences cliniques', 'Publications'],
      recommended: false
    },
    {
      id: 'education',
      name: 'Éducation & Recherche',
      description: 'Idéal pour les enseignants, chercheurs et académiques',
      icon: <GraduationCap size={24} />,
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      features: ['Publications détaillées', 'Conférences', 'Projets de recherche'],
      recommended: false
    },
    {
      id: 'design',
      name: 'Design & Créatif',
      description: 'Template visuel pour les métiers créatifs',
      icon: <Palette size={24} />,
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      features: ['Portfolio intégré', 'Compétences visuelles', 'Projets créatifs'],
      recommended: true
    },
    {
      id: 'business',
      name: 'Business & Management',
      description: 'Professionnel pour le commerce et la gestion',
      icon: <Building2 size={24} />,
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      features: ['Métriques business', 'Gestion de projet', 'Leadership'],
      recommended: false
    },
    {
      id: 'finance',
      name: 'Finance & Consulting',
      description: 'Template élégant pour la finance et le conseil',
      icon: <BarChart3 size={24} />,
      color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      features: ['Analyses financières', 'Stratégie d\'entreprise', 'Gestion de portefeuille'],
      recommended: true
    }
  ];

  const industries = [
    { id: 'all', name: 'Tous les secteurs' },
    { id: 'tech', name: 'Technologie' },
    { id: 'healthcare', name: 'Santé' },
    { id: 'education', name: 'Éducation' },
    { id: 'design', name: 'Design' },
    { id: 'business', name: 'Business' },
    { id: 'finance', name: 'Finance' }
  ];

  const filteredTemplates = selectedIndustry === 'all' 
    ? industryTemplates 
    : industryTemplates.filter(template => template.id === selectedIndustry);

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
        <Building2 size={24} />
        <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>
          Templates par Secteur
        </h3>
      </div>

      {/* Filtres par industrie */}
      <div style={{
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        marginBottom: '24px'
      }}>
        {industries.map(industry => (
          <button
            key={industry.id}
            onClick={() => setSelectedIndustry(industry.id)}
            style={{
              padding: '8px 16px',
              background: selectedIndustry === industry.id 
                ? 'rgba(255,255,255,0.3)' 
                : 'rgba(255,255,255,0.1)',
              border: `1px solid ${selectedIndustry === industry.id ? 'white' : 'rgba(255,255,255,0.2)'}`,
              borderRadius: '20px',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {industry.name}
          </button>
        ))}
      </div>

      {/* Grille des templates */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {filteredTemplates.map(template => (
          <div
            key={template.id}
            style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '20px',
              border: currentTemplate === template.id 
                ? '3px solid #00ff88' 
                : '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
            onClick={() => onTemplateSelect(template.id)}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-4px)';
              e.target.style.background = 'rgba(255,255,255,0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.background = 'rgba(255,255,255,0.1)';
            }}
          >
            {/* Badge recommandé */}
            {template.recommended && (
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: '#00ff88',
                color: 'black',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '10px',
                fontWeight: '700'
              }}>
                RECOMMANDÉ
              </div>
            )}

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px'
            }}>
              <div style={{
                background: template.color,
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {template.icon}
              </div>
              <div>
                <h4 style={{ 
                  margin: 0, 
                  fontSize: '18px', 
                  fontWeight: '700',
                  color: 'white'
                }}>
                  {template.name}
                </h4>
                <p style={{ 
                  margin: 0, 
                  fontSize: '12px', 
                  opacity: 0.8 
                }}>
                  Optimisé ATS • Responsive
                </p>
              </div>
            </div>

            <p style={{ 
              margin: '0 0 16px 0', 
              fontSize: '14px', 
              lineHeight: '1.4',
              opacity: 0.9
            }}>
              {template.description}
            </p>

            {/* Features */}
            <div style={{ marginBottom: '16px' }}>
              <h5 style={{ 
                margin: '0 0 8px 0', 
                fontSize: '14px', 
                fontWeight: '600' 
              }}>
                ✅ Fonctionnalités incluses:
              </h5>
              <ul style={{ 
                margin: 0, 
                paddingLeft: '16px', 
                fontSize: '12px',
                opacity: 0.8
              }}>
                {template.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Bouton de sélection */}
            <button
              style={{
                width: '100%',
                padding: '10px',
                background: currentTemplate === template.id 
                  ? '#00ff88' 
                  : 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '8px',
                color: currentTemplate === template.id ? 'black' : 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {currentTemplate === template.id ? '✓ Template Actif' : 'Sélectionner'}
            </button>
          </div>
        ))}
      </div>

      {/* Statistiques de sélection */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '16px',
        borderRadius: '8px',
        marginTop: '20px',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>
          🎯 <strong>87% des recruteurs</strong> préfèrent les CV adaptés au secteur d'activité
        </p>
      </div>
    </div>
  );
};

export default IndustryTemplates;