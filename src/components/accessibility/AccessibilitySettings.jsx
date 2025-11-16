import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Type, ZoomIn, ZoomOut, Volume2 } from 'lucide-react';

const AccessibilitySettings = () => {
  const [settings, setSettings] = useState({
    highContrast: false,
    fontSize: 'normal',
    zoom: 100,
    screenReader: false,
    reducedMotion: false,
    dyslexiaFriendly: false
  });

  useEffect(() => {
    // Charger les préférences depuis le localStorage
    const savedSettings = localStorage.getItem('accessibilitySettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
      applySettings(JSON.parse(savedSettings));
    }
  }, []);

  const applySettings = (newSettings) => {
    const root = document.documentElement;
    
    // Contraste élevé
    if (newSettings.highContrast) {
      root.style.setProperty('--primary-color', '#000000');
      root.style.setProperty('--background-color', '#ffffff');
      root.style.setProperty('--text-color', '#000000');
    } else {
      root.style.removeProperty('--primary-color');
      root.style.removeProperty('--background-color');
      root.style.removeProperty('--text-color');
    }

    // Taille de police
    root.style.setProperty('--font-size', 
      newSettings.fontSize === 'large' ? '18px' : 
      newSettings.fontSize === 'xlarge' ? '20px' : '16px'
    );

    // Zoom
    root.style.setProperty('--zoom-level', `${newSettings.zoom}%`);

    // Police dyslexie
    if (newSettings.dyslexiaFriendly) {
      root.style.setProperty('--font-family', 'Comic Sans MS, sans-serif');
    } else {
      root.style.removeProperty('--font-family');
    }

    // Motion réduite
    if (newSettings.reducedMotion) {
      root.style.setProperty('--animation-duration', '0.1s');
    } else {
      root.style.removeProperty('--animation-duration');
    }
  };

  const updateSetting = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    applySettings(newSettings);
    localStorage.setItem('accessibilitySettings', JSON.stringify(newSettings));
  };

  const accessibilityFeatures = [
    {
      id: 'highContrast',
      name: 'Contraste Élevé',
      description: 'Améliore la lisibilité pour les malvoyants',
      icon: <Eye size={18} />,
      type: 'toggle'
    },
    {
      id: 'fontSize',
      name: 'Taille du Texte',
      description: 'Ajuste la taille de la police',
      icon: <Type size={18} />,
      type: 'select',
      options: [
        { value: 'normal', label: 'Normal' },
        { value: 'large', label: 'Grand' },
        { value: 'xlarge', label: 'Très Grand' }
      ]
    },
    {
      id: 'zoom',
      name: 'Niveau de Zoom',
      description: 'Ajuste le niveau de zoom de la page',
      icon: <ZoomIn size={18} />,
      type: 'range',
      min: 100,
      max: 200,
      step: 10
    },
    {
      id: 'dyslexiaFriendly',
      name: 'Mode Dyslexie',
      description: 'Utilise une police adaptée à la dyslexie',
      icon: <Type size={18} />,
      type: 'toggle'
    },
    {
      id: 'reducedMotion',
      name: 'Motions Réduites',
      description: 'Réduit les animations et transitions',
      icon: <EyeOff size={18} />,
      type: 'toggle'
    }
  ];

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
        <Eye size={24} />
        <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>
          Paramètres d'Accessibilité
        </h3>
      </div>

      <div style={{
        display: 'grid',
        gap: '16px'
      }}>
        {accessibilityFeatures.map(feature => (
          <div
            key={feature.id}
            style={{
              background: 'rgba(255,255,255,0.8)',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid rgba(0,0,0,0.1)'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {feature.icon}
                <div>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
                    {feature.name}
                  </h4>
                  <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                    {feature.description}
                  </p>
                </div>
              </div>

              {feature.type === 'toggle' && (
                <button
                  onClick={() => updateSetting(feature.id, !settings[feature.id])}
                  style={{
                    width: '44px',
                    height: '24px',
                    background: settings[feature.id] ? '#10b981' : '#e5e7eb',
                    border: 'none',
                    borderRadius: '12px',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background 0.3s ease'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '2px',
                      left: settings[feature.id] ? '22px' : '2px',
                      width: '20px',
                      height: '20px',
                      background: 'white',
                      borderRadius: '50%',
                      transition: 'left 0.3s ease',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                    }}
                  />
                </button>
              )}

              {feature.type === 'select' && (
                <select
                  value={settings[feature.id]}
                  onChange={(e) => updateSetting(feature.id, e.target.value)}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    background: 'white',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  {feature.options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}

              {feature.type === 'range' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <ZoomOut size={16} />
                  <input
                    type="range"
                    min={feature.min}
                    max={feature.max}
                    step={feature.step}
                    value={settings[feature.id]}
                    onChange={(e) => updateSetting(feature.id, parseInt(e.target.value))}
                    style={{
                      width: '120px',
                      cursor: 'pointer'
                    }}
                  />
                  <ZoomIn size={16} />
                  <span style={{ 
                    fontSize: '14px', 
                    fontWeight: '600',
                    minWidth: '40px'
                  }}>
                    {settings[feature.id]}%
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Raccourcis clavier */}
      <div style={{
        background: 'rgba(255,255,255,0.8)',
        padding: '16px',
        borderRadius: '12px',
        marginTop: '16px',
        border: '1px solid rgba(0,0,0,0.1)'
      }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>
          ⌨️ Raccourcis Clavier
        </h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '8px',
          fontSize: '12px'
        }}>
          <ShortcutKey keys={['Ctrl', '+']} action="Zoom avant" />
          <ShortcutKey keys={['Ctrl', '-']} action="Zoom arrière" />
          <ShortcutKey keys={['Ctrl', '0']} action="Zoom reset" />
          <ShortcutKey keys={['Ctrl', 'Alt', 'C']} action="Contraste" />
          <ShortcutKey keys={['Ctrl', 'Alt', 'F']} action="Taille texte" />
        </div>
      </div>

      {/* Reset settings */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={() => {
            const defaultSettings = {
              highContrast: false,
              fontSize: 'normal',
              zoom: 100,
              screenReader: false,
              reducedMotion: false,
              dyslexiaFriendly: false
            };
            setSettings(defaultSettings);
            applySettings(defaultSettings);
            localStorage.setItem('accessibilitySettings', JSON.stringify(defaultSettings));
          }}
          style={{
            padding: '8px 16px',
            background: 'rgba(255,255,255,0.9)',
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: '6px',
            color: '#666',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          Réinitialiser les paramètres
        </button>
      </div>
    </div>
  );
};

const ShortcutKey = ({ keys, action }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }}>
    <div style={{ display: 'flex', gap: '2px' }}>
      {keys.map((key, index) => (
        <kbd
          key={index}
          style={{
            padding: '2px 6px',
            background: '#f3f4f6',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '10px',
            fontWeight: '600',
            fontFamily: 'monospace'
          }}
        >
          {key}
        </kbd>
      ))}
    </div>
    <span style={{ fontSize: '12px', color: '#666' }}>{action}</span>
  </div>
);

export default AccessibilitySettings;