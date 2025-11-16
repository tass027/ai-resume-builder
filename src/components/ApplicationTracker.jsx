import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { translations } from '../data/translations';
import { themes } from '../data/themes';

const ApplicationTracker = ({ isDark, currentTheme, language }) => {
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('jobApplications');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [newApplication, setNewApplication] = useState({
    company: '',
    position: '',
    date: new Date().toISOString().split('T')[0],
    status: 'applied',
    followUpDate: '',
    notes: '',
    contact: '',
    salary: '',
    jobDescription: ''
  });

  const t = translations[language];

  const addApplication = () => {
    if (!newApplication.company || !newApplication.position) {
      alert('Veuillez remplir au moins le nom de l\'entreprise et le poste');
      return;
    }

    const application = {
      id: Date.now(),
      ...newApplication,
      followUpDate: newApplication.followUpDate || calculateFollowUpDate(newApplication.date)
    };

    setApplications(prev => [application, ...prev]);
    setNewApplication({
      company: '',
      position: '',
      date: new Date().toISOString().split('T')[0],
      status: 'applied',
      followUpDate: '',
      notes: '',
      contact: '',
      salary: '',
      jobDescription: ''
    });

    localStorage.setItem('jobApplications', JSON.stringify([application, ...applications]));
  };

  const calculateFollowUpDate = (applicationDate) => {
    const date = new Date(applicationDate);
    date.setDate(date.getDate() + 7);
    return date.toISOString().split('T')[0];
  };

  const updateApplicationStatus = (id, status) => {
    const updated = applications.map(app => 
      app.id === id ? { ...app, status } : app
    );
    setApplications(updated);
    localStorage.setItem('jobApplications', JSON.stringify(updated));
  };

  const deleteApplication = (id) => {
    const updated = applications.filter(app => app.id !== id);
    setApplications(updated);
    localStorage.setItem('jobApplications', JSON.stringify(updated));
  };

  const getApplicationStats = () => {
    const total = applications.length;
    const byStatus = {
      applied: applications.filter(app => app.status === 'applied').length,
      interviewed: applications.filter(app => app.status === 'interviewed').length,
      rejected: applications.filter(app => app.status === 'rejected').length,
      offer: applications.filter(app => app.status === 'offer').length
    };

    const responseRate = total > 0 ? 
      ((byStatus.interviewed + byStatus.offer + byStatus.rejected) / total * 100).toFixed(1) : 0;

    return { total, byStatus, responseRate };
  };

  const getStatusColor = (status) => {
    const colors = {
      applied: '#3b82f6',
      interviewed: '#f59e0b',
      rejected: '#ef4444',
      offer: '#10b981'
    };
    return colors[status] || '#6b7280';
  };

  const stats = getApplicationStats();

  return (
    <div style={{
      background: isDark ? 'rgba(30, 30, 46, 0.95)' : 'rgba(255, 255, 255, 0.95)',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '24px'
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
        📊 {t.jobApplications}
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '12px',
        marginBottom: '24px'
      }}>
        <div style={{
          background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
          padding: '16px',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#3b82f6' }}>
            {stats.total}
          </div>
          <div style={{ fontSize: '12px', color: isDark ? '#aaa' : '#666' }}>
            Total
          </div>
        </div>

        <div style={{
          background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
          padding: '16px',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#10b981' }}>
            {stats.byStatus.interviewed}
          </div>
          <div style={{ fontSize: '12px', color: isDark ? '#aaa' : '#666' }}>
            {t.interviewed}
          </div>
        </div>

        <div style={{
          background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
          padding: '16px',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#f59e0b' }}>
            {stats.responseRate}%
          </div>
          <div style={{ fontSize: '12px', color: isDark ? '#aaa' : '#666' }}>
            Taux de réponse
          </div>
        </div>

        <div style={{
          background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
          padding: '16px',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#8b5cf6' }}>
            {stats.byStatus.offer}
          </div>
          <div style={{ fontSize: '12px', color: isDark ? '#aaa' : '#666' }}>
            {t.offer}
          </div>
        </div>
      </div>

      <div style={{
        background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '20px'
      }}>
        <h4 style={{
          fontSize: '16px',
          fontWeight: '600',
          marginBottom: '16px',
          color: isDark ? '#e0e0e0' : '#2d3748'
        }}>
          ➕ {t.addApplication}
        </h4>

        <div style={{ display: 'grid', gap: '12px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <input
              type="text"
              placeholder={`${t.companyName} *`}
              value={newApplication.company}
              onChange={(e) => setNewApplication(prev => ({ ...prev, company: e.target.value }))}
              style={{
                padding: '10px 12px',
                border: isDark ? '2px solid #4a4a4a' : '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: isDark ? '#2d2d2d' : 'white',
                color: isDark ? '#e0e0e0' : '#2d3748'
              }}
            />
            <input
              type="text"
              placeholder={`${t.position} *`}
              value={newApplication.position}
              onChange={(e) => setNewApplication(prev => ({ ...prev, position: e.target.value }))}
              style={{
                padding: '10px 12px',
                border: isDark ? '2px solid #4a4a4a' : '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: isDark ? '#2d2d2d' : 'white',
                color: isDark ? '#e0e0e0' : '#2d3748'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <input
              type="date"
              value={newApplication.date}
              onChange={(e) => setNewApplication(prev => ({ ...prev, date: e.target.value }))}
              style={{
                padding: '10px 12px',
                border: isDark ? '2px solid #4a4a4a' : '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: isDark ? '#2d2d2d' : 'white',
                color: isDark ? '#e0e0e0' : '#2d3748'
              }}
            />
            <select
              value={newApplication.status}
              onChange={(e) => setNewApplication(prev => ({ ...prev, status: e.target.value }))}
              style={{
                padding: '10px 12px',
                border: isDark ? '2px solid #4a4a4a' : '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: isDark ? '#2d2d2d' : 'white',
                color: isDark ? '#e0e0e0' : '#2d3748'
              }}
            >
              <option value="applied">{t.applied}</option>
              <option value="interviewed">{t.interviewed}</option>
              <option value="rejected">{t.rejected}</option>
              <option value="offer">{t.offer}</option>
            </select>
            <button
              onClick={addApplication}
              style={{
                padding: '10px 12px',
                background: `linear-gradient(135deg, ${themes[currentTheme].success[0]} 0%, ${themes[currentTheme].success[1]} 100%)`,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {t.addApplication}
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {applications.map(application => (
          <div
            key={application.id}
            style={{
              background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
              padding: '16px',
              borderRadius: '12px',
              marginBottom: '12px',
              borderLeft: `4px solid ${getStatusColor(application.status)}`
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontSize: '16px', 
                  fontWeight: '700',
                  color: isDark ? '#e0e0e0' : '#2d3748',
                  marginBottom: '4px'
                }}>
                  {application.position}
                </div>
                <div style={{ 
                  fontSize: '14px',
                  color: isDark ? '#aaa' : '#666',
                  marginBottom: '8px'
                }}>
                  {application.company} • {new Date(application.date).toLocaleDateString('fr-FR')}
                </div>
                {application.notes && (
                  <div style={{ 
                    fontSize: '13px',
                    color: isDark ? '#ccc' : '#555',
                    fontStyle: 'italic'
                  }}>
                    {application.notes}
                  </div>
                )}
              </div>
              
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <select
                  value={application.status}
                  onChange={(e) => updateApplicationStatus(application.id, e.target.value)}
                  style={{
                    padding: '6px 8px',
                    border: isDark ? '1px solid #4a4a4a' : '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '12px',
                    backgroundColor: isDark ? '#2d2d2d' : 'white',
                    color: isDark ? '#e0e0e0' : '#2d3748'
                  }}
                >
                  <option value="applied">{t.applied}</option>
                  <option value="interviewed">{t.interviewed}</option>
                  <option value="rejected">{t.rejected}</option>
                  <option value="offer">{t.offer}</option>
                </select>
                
                <button
                  onClick={() => deleteApplication(application.id)}
                  style={{
                    padding: '6px',
                    background: 'none',
                    border: 'none',
                    color: '#ef4444',
                    cursor: 'pointer',
                    borderRadius: '4px'
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {applications.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px',
            color: isDark ? '#aaa' : '#666',
            fontStyle: 'italic'
          }}>
            Aucune candidature enregistrée
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationTracker;