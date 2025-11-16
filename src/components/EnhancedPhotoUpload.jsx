import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { translations } from '../data/translations';
import { themes } from '../data/themes';

const EnhancedPhotoUpload = ({ isDark, currentTheme, photo, handlePhotoUpload, removePhoto, language }) => {
  const [photoError, setPhotoError] = useState(null);
  const t = translations[language];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setPhotoError('La taille de l\'image doit être inférieure à 2MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setPhotoError('Veuillez sélectionner une image valide');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      resizeImage(reader.result, 500, 500, (resizedImage) => {
        handlePhotoUpload(resizedImage);
        setPhotoError(null);
      });
    };
    reader.onerror = () => {
      setPhotoError('Erreur lors de la lecture de l\'image');
    };
    reader.readAsDataURL(file);
  };

  const resizeImage = (dataUrl, maxWidth, maxHeight, callback) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      callback(canvas.toDataURL('image/jpeg', 0.8));
    };
  };

  const handlePhotoSelect = (dataUrl) => {
    handlePhotoUpload(dataUrl);
    setPhotoError(null);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      {photo ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{ position: 'relative' }}>
            <img src={photo} alt="Profile" style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: `3px solid ${themes[currentTheme].primary[0]}`,
            }} />
            <button 
              onClick={removePhoto}
              style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              <X size={14} />
            </button>
          </div>
          <div>
            <p style={{ color: '#10b981', fontWeight: '600', margin: 0 }}>
              ✓ Photo ajoutée
            </p>
            <button 
              onClick={() => document.getElementById('photo-upload').click()}
              style={{
                background: 'none',
                border: 'none',
                color: '#3b82f6',
                cursor: 'pointer',
                fontSize: '12px',
                textDecoration: 'underline',
              }}
            >
              Changer la photo
            </button>
          </div>
        </div>
      ) : (
        <label style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          padding: '24px',
          background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
          borderRadius: '12px',
          cursor: 'pointer',
          color: isDark ? '#e0e0e0' : '#2d3748',
          border: `2px dashed ${isDark ? '#4a4a4a' : '#e2e8f0'}`,
          textAlign: 'center',
          transition: 'all 0.3s ease',
        }}>
          <Upload size={32} />
          <div>
            <div style={{ fontWeight: '600', marginBottom: '4px' }}>
              {t.uploadPhoto}
            </div>
            <div style={{ fontSize: '12px', color: isDark ? '#aaa' : '#666' }}>
              PNG, JPG - Max 2MB
            </div>
          </div>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </label>
      )}
      
      {photoError && (
        <div style={{
          color: '#ef4444',
          fontSize: '12px',
          marginTop: '8px',
          textAlign: 'center',
        }}>
          {photoError}
        </div>
      )}
    </div>
  );
};

export default EnhancedPhotoUpload;