import React, { useState } from 'react';
import { Sparkles, Download, Loader2 } from 'lucide-react';
import { translations } from '../data/translations';
import { themes } from '../data/themes';

const CoverLetterGenerator = ({ isDark, currentTheme, formData, experiences, skills, loading, setLoading, language }) => {
  const [coverLetter, setCoverLetter] = useState('');
  const [companyInfo, setCompanyInfo] = useState({
    companyName: '',
    hiringManager: '',
    address: '',
    jobDescription: ''
  });

  const t = translations[language];

  const generateCoverLetter = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const generatedLetter = `
${new Date().toLocaleDateString('fr-FR')}

${companyInfo.hiringManager || 'Madame, Monsieur,'}
${companyInfo.companyName}
${companyInfo.address}

Objet : Candidature au poste de ${formData.jobTitle}

${companyInfo.hiringManager ? 'Cher(e) ' + companyInfo.hiringManager : 'Madame, Monsieur,'}

Je vous adresse ma candidature pour le poste de ${formData.jobTitle} au sein de ${companyInfo.companyName}, tel que publié sur votre site. 

${formData.summary ? `Fort de mon expérience en tant que ${formData.jobTitle}, ${formData.summary.toLowerCase()}` : `Mon profil de ${formData.jobTitle} correspond parfaitement aux exigences du poste.`}

${experiences.length > 0 ? `Au cours de mon expérience chez ${experiences[0]?.company}, j'ai développé des compétences précieuses en ${skills.slice(0, 3).map(s => s.name).join(', ')}.` : ''}

${companyInfo.jobDescription ? `Je suis particulièrement intéressé par ${companyInfo.jobDescription.substring(0, 100)}... et je suis convaincu que mon profil correspond parfaitement à vos attentes.` : 'Je suis convaincu que mes compétences et mon expérience seront un atout pour votre entreprise.'}

Je reste à votre disposition pour un entretien afin de discuter de ma motivation et de comment je pourrais contribuer au succès de ${companyInfo.companyName}.

Dans l'attente de votre réponse, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

${formData.fullName}
${formData.phone} | ${formData.email}
${formData.linkedin ? `LinkedIn: ${formData.linkedin}` : ''}
      `.trim();

      setCoverLetter(generatedLetter);
    } catch (error) {
      console.error('Erreur génération lettre:', error);
      alert('Erreur lors de la génération de la lettre');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: isDark ? 'rgba(30, 30, 46, 0.95)' : 'rgba(255, 255, 255, 0.95)',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '24px',
      border: `2px solid ${themes[currentTheme].ai[0]}40`
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
        📝 {t.generateCoverLetter}
      </h3>

      <div style={{ display: 'grid', gap: '16px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder={t.companyName}
          value={companyInfo.companyName}
          onChange={(e) => setCompanyInfo(prev => ({ ...prev, companyName: e.target.value }))}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: isDark ? '2px solid #4a4a4a' : '2px solid #e2e8f0',
            borderRadius: '12px',
            fontSize: '14px',
            backgroundColor: isDark ? '#2d2d2d' : 'white',
            color: isDark ? '#e0e0e0' : '#2d3748'
          }}
        />
        
        <input
          type="text"
          placeholder={t.hiringManager}
          value={companyInfo.hiringManager}
          onChange={(e) => setCompanyInfo(prev => ({ ...prev, hiringManager: e.target.value }))}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: isDark ? '2px solid #4a4a4a' : '2px solid #e2e8f0',
            borderRadius: '12px',
            fontSize: '14px',
            backgroundColor: isDark ? '#2d2d2d' : 'white',
            color: isDark ? '#e0e0e0' : '#2d3748'
          }}
        />

        <textarea
          placeholder={t.jobDescription}
          value={companyInfo.jobDescription}
          onChange={(e) => setCompanyInfo(prev => ({ ...prev, jobDescription: e.target.value }))}
          rows="4"
          style={{
            width: '100%',
            padding: '12px 16px',
            border: isDark ? '2px solid #4a4a4a' : '2px solid #e2e8f0',
            borderRadius: '12px',
            fontSize: '14px',
            backgroundColor: isDark ? '#2d2d2d' : 'white',
            color: isDark ? '#e0e0e0' : '#2d3748',
            resize: 'vertical'
          }}
        />
      </div>

      <button
        onClick={generateCoverLetter}
        disabled={loading || !companyInfo.companyName}
        style={{
          width: '100%',
          padding: '14px 20px',
          background: `linear-gradient(135deg, ${themes[currentTheme].ai[0]} 0%, ${themes[currentTheme].ai[1]} 100%)`,
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: '700',
          cursor: loading || !companyInfo.companyName ? 'not-allowed' : 'pointer',
          opacity: loading || !companyInfo.companyName ? 0.6 : 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '20px'
        }}
      >
        {loading ? <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} /> : <Sparkles size={20} />}
        {t.generateCoverLetter}
      </button>

      {coverLetter && (
        <div>
          <h4 style={{
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '12px',
            color: isDark ? '#e0e0e0' : '#2d3748'
          }}>
            Aperçu de votre lettre:
          </h4>
          <div style={{
            background: isDark ? '#2d2d2d' : '#f8fafc',
            padding: '20px',
            borderRadius: '12px',
            border: isDark ? '1px solid #4a4a4a' : '1px solid #e2e8f0',
            whiteSpace: 'pre-line',
            lineHeight: '1.6',
            color: isDark ? '#e0e0e0' : '#2d3748',
            maxHeight: '400px',
            overflowY: 'auto',
            fontFamily: 'Arial, sans-serif'
          }}>
            {coverLetter}
          </div>
          
          <button
            onClick={() => {
              const blob = new Blob([coverLetter], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `Lettre_Motivation_${companyInfo.companyName}.txt`;
              a.click();
            }}
            style={{
              width: '100%',
              padding: '12px 20px',
              background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              color: isDark ? '#e0e0e0' : '#2d3748',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Download size={16} />
            Télécharger la Lettre
          </button>
        </div>
      )}
    </div>
  );
};

export default CoverLetterGenerator;