import React from 'react';
import { translations } from '../data/translations';

const PhotoSettings = ({ isDark, currentTheme, photoSettings, setPhotoSettings, language }) => {
  const t = translations[language];

  return (
    <div style={{
      background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
      padding: '20px',
      borderRadius: '12px',
      marginBottom: '20px',
    }}>
      <h4 style={{
        fontSize: '16px',
        fontWeight: '600',
        marginBottom: '16px',
        color: isDark ? '#e0e0e0' : '#2d3748',
      }}>
        ⚙️ {t.photoSettings}
      </h4>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
            {t.photoSize}
          </label>
          <select
            value={photoSettings.size}
            onChange={(e) => setPhotoSettings(prev => ({ ...prev, size: e.target.value }))}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: isDark ? '2px solid #4a4a4a' : '2px solid #e2e8f0',
              borderRadius: '8px',
              backgroundColor: isDark ? '#2d2d2d' : 'white',
              color: isDark ? '#e0e0e0' : '#2d3748',
            }}
          >
            <option value="small">{t.small}</option>
            <option value="medium">{t.medium}</option>
            <option value="large">{t.large}</option>
          </select>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
            {t.photoStyle}
          </label>
          <select
            value={photoSettings.style}
            onChange={(e) => setPhotoSettings(prev => ({ ...prev, style: e.target.value }))}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: isDark ? '2px solid #4a4a4a' : '2px solid #e2e8f0',
              borderRadius: '8px',
              backgroundColor: isDark ? '#2d2d2d' : 'white',
              color: isDark ? '#e0e0e0' : '#2d3748',
            }}
          >
            <option value="circle">{t.circle}</option>
            <option value="square">{t.square}</option>
            <option value="rounded">{t.rounded}</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PhotoSettings;