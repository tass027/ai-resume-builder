import React, { useState, useEffect } from 'react';
import { Puzzle, Download, Settings, Play } from 'lucide-react';

const PluginSystem = ({ resumeData, onPluginActivate }) => {
  const [plugins, setPlugins] = useState([]);
  const [activePlugins, setActivePlugins] = useState([]);

  const availablePlugins = [
    {
      id: 'linkedin-importer',
      name: 'LinkedIn Importer',
      description: 'Importez votre profil LinkedIn automatiquement',
      icon: '🔗',
      version: '1.0.0',
      author: 'AI Resume Team',
      enabled: true
    },
    {
      id: 'job-scraper',
      name: 'Job Scraper',
      description: 'Extrait les offres d\'emploi des sites partenaires',
      icon: '🎯',
      version: '1.2.0',
      author: 'AI Resume Team',
      enabled: false
    },
    {
      id: 'portfolio-integration',
      name: 'Portfolio Integration',
      description: 'Intègre vos projets GitHub et Behance',
      icon: '💼',
      version: '1.1.0',
      author: 'AI Resume Team',
      enabled: true
    },
    {
      id: 'cover-letter-ai',
      name: 'Cover Letter AI',
      description: 'Génère des lettres de motivation personnalisées',
      icon: '✉️',
      version: '1.3.0',
      author: 'AI Resume Team',
      enabled: false
    }
  ];

  const togglePlugin = (pluginId) => {
    setActivePlugins(prev => {
      const isActive = prev.includes(pluginId);
      if (isActive) {
        return prev.filter(id => id !== pluginId);
      } else {
        return [...prev, pluginId];
      }
    });
  };

  // Fonctions manquantes implémentées
  const importLinkedInProfile = async () => {
    try {
      // Simulation d'import LinkedIn
      alert('Fonctionnalité LinkedIn Import en cours de développement');
      
      // Simulation de données LinkedIn
      const linkedinData = {
        fullName: 'Jean Dupont',
        jobTitle: 'Développeur Full Stack',
        summary: 'Développeur passionné avec 5 ans d\'expérience...',
        experiences: [
          {
            company: 'Tech Company',
            position: 'Développeur Senior',
            startDate: '2020-01',
            endDate: '2023-12',
            description: 'Développement d\'applications web modernes'
          }
        ],
        skills: ['JavaScript', 'React', 'Node.js', 'Python']
      };
      
      // Appliquer les données importées
      if (onPluginActivate) {
        onPluginActivate({
          type: 'linkedin_import',
          data: linkedinData
        });
      }
    } catch (error) {
      console.error('Erreur import LinkedIn:', error);
      alert('Erreur lors de l\'import LinkedIn');
    }
  };

  const scrapeJobListings = async () => {
    try {
      // Simulation de scraping d'offres d'emploi
      const jobListings = [
        {
          title: 'Développeur React',
          company: 'Startup Innovante',
          location: 'Paris',
          description: 'Nous recherchons un développeur React expérimenté...',
          keywords: ['React', 'JavaScript', 'Frontend']
        },
        {
          title: 'Ingénieur DevOps',
          company: 'Grande Entreprise',
          location: 'Lyon',
          description: 'Poste d\'ingénieur DevOps pour notre infrastructure cloud...',
          keywords: ['DevOps', 'AWS', 'Docker', 'Kubernetes']
        }
      ];
      
      alert(`${jobListings.length} offres d'emploi trouvées!`);
      
      if (onPluginActivate) {
        onPluginActivate({
          type: 'job_listings',
          data: jobListings
        });
      }
    } catch (error) {
      console.error('Erreur scraping jobs:', error);
      alert('Erreur lors de la recherche d\'offres d\'emploi');
    }
  };

  const integratePortfolio = async () => {
    try {
      // Simulation d'intégration portfolio
      const portfolioData = {
        githubProjects: [
          {
            name: 'Application E-commerce',
            description: 'Site e-commerce complet avec React et Node.js',
            technologies: ['React', 'Node.js', 'MongoDB'],
            stars: 45
          },
          {
            name: 'Outil d\'Analyze de Données',
            description: 'Outil d\'analyse et visualisation de données',
            technologies: ['Python', 'Pandas', 'Matplotlib'],
            stars: 23
          }
        ],
        behanceProjects: [
          {
            name: 'Redesign Interface Utilisateur',
            description: 'Modernisation de l\'UI/UX d\'une application existante',
            category: 'UI/UX Design'
          }
        ]
      };
      
      alert('Portfolio intégré avec succès!');
      
      if (onPluginActivate) {
        onPluginActivate({
          type: 'portfolio_integration',
          data: portfolioData
        });
      }
    } catch (error) {
      console.error('Erreur intégration portfolio:', error);
      alert('Erreur lors de l\'intégration du portfolio');
    }
  };

  const generateCoverLetter = async () => {
    try {
      // Simulation de génération de lettre de motivation
      const coverLetter = `
        Objet : Candidature pour le poste de ${resumeData?.formData?.jobTitle || 'Développeur'}

        Madame, Monsieur,

        Fort de mon expérience en ${resumeData?.skills?.map(s => s.name).slice(0, 3).join(', ') || 'développement'}, 
        je me permets de vous soumettre ma candidature pour le poste susmentionné.

        Au cours de mes ${resumeData?.experiences?.length || 'plusieurs'} années d'expérience, 
        j'ai développé des compétences solides qui correspondent parfaitement à vos exigences.

        Je reste à votre disposition pour un entretien afin de discuter de ma motivation 
        et de comment je pourrais contribuer au succès de votre entreprise.

        Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

        ${resumeData?.formData?.fullName || 'Votre nom'}
      `;
      
      alert('Lettre de motivation générée!');
      
      if (onPluginActivate) {
        onPluginActivate({
          type: 'cover_letter',
          data: { content: coverLetter }
        });
      }
    } catch (error) {
      console.error('Erreur génération lettre:', error);
      alert('Erreur lors de la génération de la lettre de motivation');
    }
  };

  const executePlugin = async (pluginId) => {
    try {
      // Simulation d'exécution de plugin
      console.log(`Exécution du plugin: ${pluginId}`);
      
      switch (pluginId) {
        case 'linkedin-importer':
          await importLinkedInProfile();
          break;
        case 'job-scraper':
          await scrapeJobListings();
          break;
        case 'portfolio-integration':
          await integratePortfolio();
          break;
        case 'cover-letter-ai':
          await generateCoverLetter();
          break;
        default:
          console.warn(`Plugin inconnu: ${pluginId}`);
      }
    } catch (error) {
      console.error('Erreur plugin:', error);
      alert(`Erreur lors de l'exécution du plugin ${pluginId}`);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '24px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <Puzzle size={24} />
        <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>
          Système de Plugins
        </h3>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        {availablePlugins.map(plugin => (
          <div
            key={plugin.id}
            style={{
              background: 'rgba(255,255,255,0.8)',
              borderRadius: '12px',
              padding: '20px',
              border: `2px solid ${activePlugins.includes(plugin.id) ? '#667eea' : 'transparent'}`,
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '24px' }}>{plugin.icon}</span>
                <div>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
                    {plugin.name}
                  </h4>
                  <p style={{ margin: 0, fontSize: '12px', opacity: 0.7 }}>
                    v{plugin.version} • {plugin.author}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => togglePlugin(plugin.id)}
                style={{
                  padding: '6px 12px',
                  background: activePlugins.includes(plugin.id) ? '#667eea' : '#e2e8f0',
                  color: activePlugins.includes(plugin.id) ? 'white' : '#64748b',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {activePlugins.includes(plugin.id) ? 'Activé' : 'Activer'}
              </button>
            </div>

            <p style={{
              margin: '0 0 16px 0',
              fontSize: '14px',
              color: '#64748b',
              lineHeight: '1.4'
            }}>
              {plugin.description}
            </p>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => executePlugin(plugin.id)}
                disabled={!activePlugins.includes(plugin.id)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  background: activePlugins.includes(plugin.id) ? '#10b981' : '#9ca3af',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: activePlugins.includes(plugin.id) ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  transition: 'all 0.3s ease',
                  opacity: activePlugins.includes(plugin.id) ? 1 : 0.6
                }}
              >
                <Play size={14} />
                Exécuter
              </button>

              <button
                style={{
                  padding: '8px',
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#e5e7eb';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#f3f4f6';
                }}
              >
                <Settings size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bouton d'installation de plugin personnalisé */}
      <div style={{
        marginTop: '20px',
        textAlign: 'center'
      }}>
        <button
          style={{
            padding: '12px 24px',
            background: 'rgba(255,255,255,0.9)',
            border: '2px dashed #667eea',
            borderRadius: '8px',
            color: '#667eea',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#667eea';
            e.target.style.color = 'white';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.9)';
            e.target.style.color = '#667eea';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          <Download size={16} />
          Installer un Plugin Personnalisé
        </button>
      </div>

      {/* Indicateur de statut */}
      <div style={{
        marginTop: '16px',
        textAlign: 'center',
        fontSize: '12px',
        color: '#64748b'
      }}>
        {activePlugins.length > 0 ? (
          <span>🎯 {activePlugins.length} plugin(s) activé(s)</span>
        ) : (
          <span>🔌 Aucun plugin activé</span>
        )}
      </div>
    </div>
  );
};

export default PluginSystem;