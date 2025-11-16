import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Eye, Download, Clock } from 'lucide-react';

const AnalyticsDashboard = ({ resumeData, resumeViews = [] }) => {
  const [metrics, setMetrics] = useState({});
  const [timeRange, setTimeRange] = useState('7days');

  useEffect(() => {
    // Simulation de données analytiques
    const simulatedMetrics = {
      totalViews: 156,
      downloads: 23,
      avgViewTime: '2m 34s',
      completionRate: 87,
      atsScore: 92,
      improvementScore: 76
    };
    setMetrics(simulatedMetrics);
  }, [resumeData]);

  const chartData = {
    views: [65, 59, 80, 81, 56, 55, 40],
    downloads: [28, 48, 40, 19, 86, 27, 90],
    dates: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
  };

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
        justifyContent: 'space-between',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <BarChart3 size={24} />
          <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>
            Analytics Dashboard
          </h3>
        </div>

        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '8px',
            padding: '8px 12px',
            color: 'white',
            fontSize: '14px'
          }}
        >
          <option value="24h">24 Heures</option>
          <option value="7days">7 Jours</option>
          <option value="30days">30 Jours</option>
          <option value="90days">90 Jours</option>
        </select>
      </div>

      {/* Métriques principales */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <MetricCard
          icon={<Eye size={20} />}
          title="Vues Total"
          value={metrics.totalViews}
          change="+12%"
        />
        <MetricCard
          icon={<Download size={20} />}
          title="Téléchargements"
          value={metrics.downloads}
          change="+5%"
        />
        <MetricCard
          icon={<Clock size={20} />}
          title="Temps Moyen"
          value={metrics.avgViewTime}
          change="+2m"
        />
        <MetricCard
          icon={<TrendingUp size={20} />}
          title="Score ATS"
          value={metrics.atsScore}
          change="+8%"
        />
      </div>

      {/* Graphique simple */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '20px',
        backdropFilter: 'blur(10px)'
      }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>
          Performance du CV (7 derniers jours)
        </h4>
        
        <div style={{
          display: 'flex',
          alignItems: 'end',
          gap: '12px',
          height: '120px'
        }}>
          {chartData.views.map((value, index) => (
            <div key={index} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{
                height: `${value}px`,
                background: 'linear-gradient(to top, #4facfe, #00f2fe)',
                borderRadius: '4px 4px 0 0',
                marginBottom: '8px'
              }} />
              <div style={{ fontSize: '12px', opacity: 0.8 }}>
                {chartData.dates[index]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommandations */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '16px',
        borderRadius: '8px'
      }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>
          💡 Recommandations
        </h4>
        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
          <li>Ajoutez 3 compétences techniques manquantes identifiées</li>
          <li>Améliorez votre résumé avec des chiffres concrets</li>
          <li>Optimisez les mots-clés pour le référencement ATS</li>
        </ul>
      </div>
    </div>
  );
};

const MetricCard = ({ icon, title, value, change }) => (
  <div style={{
    background: 'rgba(255,255,255,0.1)',
    padding: '16px',
    borderRadius: '8px',
    textAlign: 'center',
    backdropFilter: 'blur(10px)'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
      {icon}
      <span style={{ fontSize: '14px', fontWeight: '600' }}>{title}</span>
    </div>
    <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>
      {value}
    </div>
    <div style={{
      fontSize: '12px',
      color: change.startsWith('+') ? '#00ff88' : '#ff6b6b'
    }}>
      {change} vs période précédente
    </div>
  </div>
);

export default AnalyticsDashboard;