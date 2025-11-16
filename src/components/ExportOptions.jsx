import React from 'react';
import { FileText, FileDown, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { themes } from '../data/themes';

const ExportOptions = ({ isDark, currentTheme, formData, experiences, skills, educations, projects, certifications, languages, loading, setLoading }) => {
  const createConfetti = () => {
    const colors = ['#f39c12', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#f1c40f'];
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
          position: fixed;
          width: ${Math.random() * 10 + 5}px;
          height: ${Math.random() * 10 + 5}px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          left: ${Math.random() * 100}%;
          top: -20px;
          border-radius: 50%;
          animation: confettiFall ${Math.random() * 2 + 2}s ease-out forwards;
          pointer-events: none;
          z-index: 9999;
        `;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 4000);
      }, i * 30);
    }
  };

  const exportToPDF = async () => {
    setLoading(true);
    try {
      const element = document.getElementById('resume-preview');
      if (!element) {
        alert('Aperçu du CV non trouvé');
        return;
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${formData.fullName || 'CV'}_${new Date().getTime()}.pdf`);
      createConfetti();
    } catch (error) {
      console.error('Erreur export PDF:', error);
      alert('Erreur lors de l\'export PDF');
    } finally {
      setLoading(false);
    }
  };

  const exportToDOCX = () => {
    const resumeContent = `
${formData.fullName}
${formData.email} | ${formData.phone} | ${formData.location}

PROFESSIONAL SUMMARY
${formData.summary}

EXPERIENCE
${experiences.map(exp => `
${exp.position} at ${exp.company}
${exp.startDate} - ${exp.current ? 'Current' : exp.endDate}
${exp.description}
`).join('\n')}

SKILLS
${skills.map(skill => `• ${skill.name}`).join('\n')}

EDUCATION
${educations.map(edu => `
${edu.degree} at ${edu.institution}
${edu.startDate} - ${edu.current ? 'Current' : edu.endDate}
${edu.description}
`).join('\n')}
    `.trim();

    const blob = new Blob([resumeContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.fullName || 'CV'}.doc`;
    a.click();
    URL.revokeObjectURL(url);
    createConfetti();
  };

  const downloadResume = () => {
    const resumeContent = `
${formData.fullName}
${formData.email} | ${formData.phone} | ${formData.location}
${formData.linkedin ? `LinkedIn: ${formData.linkedin}` : ''}
${formData.github ? `GitHub: ${formData.github}` : ''}
${formData.website ? `Website: ${formData.website}` : ''}

PROFESSIONAL SUMMARY
${formData.summary}

EXPERIENCE
${experiences.map(exp => `
${exp.position} at ${exp.company}
${exp.startDate} - ${exp.current ? 'Current' : exp.endDate}
${exp.description}
`).join('\n')}

SKILLS
${skills.map(skill => `• ${skill.name} (${skill.level})`).join('\n')}

EDUCATION
${educations.map(edu => `
${edu.degree} at ${edu.institution}
${edu.startDate} - ${edu.current ? 'Current' : edu.endDate}
${edu.description}
`).join('\n')}

${projects.length > 0 ? `
PROJECTS
${projects.map(proj => `• ${proj.name}: ${proj.description} ${proj.link ? `(${proj.link})` : ''}`).join('\n')}
` : ''}

${certifications.length > 0 ? `
CERTIFICATIONS
${certifications.map(cert => `• ${cert.name} - ${cert.issuingOrg} (${cert.issueDate})`).join('\n')}
` : ''}

${languages.length > 0 ? `
LANGUAGES
${languages.map(lang => `• ${lang.name} (${lang.proficiency})`).join('\n')}
` : ''}

${formData.interests ? `
INTERESTS
${formData.interests}
` : ''}
    `.trim();

    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.fullName.replace(/\s+/g, '_')}_Resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    createConfetti();
  };

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
        📤 Exporter le CV
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
        <button
          onClick={exportToPDF}
          disabled={loading}
          style={{
            padding: '16px 12px',
            background: `linear-gradient(135deg, ${themes[currentTheme].primary[0]} 0%, ${themes[currentTheme].primary[1]} 100%)`,
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease'
          }}
        >
          <FileText size={24} />
          PDF Professionnel
        </button>

        <button
          onClick={exportToDOCX}
          style={{
            padding: '16px 12px',
            background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
            color: isDark ? '#e0e0e0' : '#2d3748',
            border: 'none',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease'
          }}
        >
          <FileDown size={24} />
          Format Word
        </button>

        <button
          onClick={downloadResume}
          style={{
            padding: '16px 12px',
            background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
            color: isDark ? '#e0e0e0' : '#2d3748',
            border: 'none',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease'
          }}
        >
          <FileText size={24} />
          Texte Simple
        </button>
      </div>
    </div>
  );
};

export default ExportOptions;