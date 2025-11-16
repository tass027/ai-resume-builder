import React, { useState, useEffect } from 'react';
import { 
  FileText, Sparkles, Download, ChevronRight, ChevronLeft, Loader2, 
  Briefcase, GraduationCap, Award, Moon, Sun, Save, List, 
  Copy, Globe, Eye, EyeOff, Plus, Trash2, Languages 
} from 'lucide-react';

// Import existing components
import ATSAnalysisPanel from './components/ATSAnalysisPanel';
import CoverLetterGenerator from './components/CoverLetterGenerator';
import ExportOptions from './components/ExportOptions';
import ApplicationTracker from './components/ApplicationTracker';
import PhotoSettings from './components/PhotoSettings';
import SmartSuggestions from './components/SmartSuggestions';
import EnhancedPhotoUpload from './components/EnhancedPhotoUpload';
import ResumePreview from './components/ResumePreview';

// Import new advanced components
import RealAIAssistant from './components/ai/RealAIAssistant';
import JobDescriptionAnalyzer from './components/ai/JobDescriptionAnalyzer';
import LiveFeedback from './components/ai/LiveFeedback';
import CollaborativeEditor from './components/collaboration/CollaborativeEditor';
import PluginSystem from './components/plugins/PluginSystem';
import AnalyticsDashboard from './components/analytics/AnalyticsDashboard';
import PresentationMode from './components/presentation/PresentationMode';
import AchievementSystem from './components/gamification/AchievementSystem';
import VoiceRecognition from './components/accessibility/VoiceRecognition';
import AccessibilitySettings from './components/accessibility/AccessibilitySettings';
import IndustryTemplates from './components/templates/IndustryTemplates';

// Import data
import { translations } from './data/translations';
import { cvTemplates } from './data/templates';
import { themes } from './data/themes';

// Import utils
import { getStyles } from './utils/styles';

export default function App() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showResumes, setShowResumes] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [language, setLanguage] = useState('en');
  const [currentTemplate, setCurrentTemplate] = useState('modern');
  const [analyzeMode, setAnalyzeMode] = useState(false);
  const [resumeScore, setResumeScore] = useState(0);
  const [improvementSuggestions, setImprovementSuggestions] = useState([]);
  const [missingKeywords, setMissingKeywords] = useState([]);
  const [jobDescription, setJobDescription] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [photoSettings, setPhotoSettings] = useState({
    size: 'medium',
    style: 'circle',
  });
  
  // New state for advanced features
  const [showAdvancedTools, setShowAdvancedTools] = useState(false);
  const [userProgress, setUserProgress] = useState({
    views: 0,
    shares: 0,
    completions: 0,
    achievements: []
  });
  
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('theme') || 'ocean';
  });
  
  const [photo, setPhoto] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    jobTitle: '',
    summary: '',
    linkedin: '',
    github: '',
    website: '',
    interests: '',
  });

  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [languages, setLanguages] = useState([]);

  const [savedResumes, setSavedResumes] = useState(() => {
    const saved = localStorage.getItem('savedResumes');
    return saved ? JSON.parse(saved) : [];
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;
  const styles = getStyles(isDark, currentTheme);
  const t = translations[language];

  // Gestion du mode hors ligne
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sauvegarde automatique
  useEffect(() => {
    const timer = setTimeout(() => {
      const resumeData = {
        formData,
        experiences,
        educations,
        skills,
        projects,
        certifications,
        languages,
        photo,
        currentTemplate,
        photoSettings
      };
      localStorage.setItem('currentResume', JSON.stringify(resumeData));
      if (formData.fullName) {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [formData, experiences, educations, skills, projects, certifications, languages, photo, currentTemplate, photoSettings]);

  // Charger le CV actuel au démarrage
  useEffect(() => {
    const saved = localStorage.getItem('currentResume');
    if (saved) {
      const data = JSON.parse(saved);
      setFormData(data.formData || {});
      setExperiences(data.experiences || []);
      setEducations(data.educations || []);
      setSkills(data.skills || []);
      setProjects(data.projects || []);
      setCertifications(data.certifications || []);
      setLanguages(data.languages || []);
      setPhoto(data.photo || null);
      if (data.currentTemplate) setCurrentTemplate(data.currentTemplate);
      if (data.photoSettings) setPhotoSettings(data.photoSettings);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDark));
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  // New function to handle AI suggestions
  const handleAISuggestion = (suggestions) => {
    // Apply AI suggestions to the form data
    if (suggestions.summary) {
      setFormData(prev => ({ ...prev, summary: suggestions.summary }));
    }
    if (suggestions.skills) {
      setSkills(prev => [...prev, ...suggestions.skills]);
    }
    // Add more suggestion handling as needed
  };

  // New function to handle resume updates from collaboration
  const handleResumeUpdate = (updatedData) => {
    setFormData(updatedData.formData || formData);
    setExperiences(updatedData.experiences || experiences);
    setSkills(updatedData.skills || skills);
    // Update other fields as needed
  };

  // New function to handle voice recognition text updates
  const handleVoiceTextUpdate = (text) => {
    // Update the current focused field or summary
    setFormData(prev => ({ ...prev, summary: text }));
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (imageData) => {
    setPhoto(imageData);
  };

  const removePhoto = () => {
    setPhoto(null);
  };

  // Expériences
  const addExperience = () => {
    setExperiences(prev => [...prev, {
      id: Date.now(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }]);
  };

  const updateExperience = (id, field, value) => {
    setExperiences(prev => prev.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id) => {
    setExperiences(prev => prev.filter(exp => exp.id !== id));
  };

  // Éducation
  const addEducation = () => {
    setEducations(prev => [...prev, {
      id: Date.now(),
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }]);
  };

  const updateEducation = (id, field, value) => {
    setEducations(prev => prev.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id) => {
    setEducations(prev => prev.filter(edu => edu.id !== id));
  };

  // Compétences
  const addSkill = () => {
    setSkills(prev => [...prev, {
      id: Date.now(),
      name: '',
      level: 'intermediate'
    }]);
  };

  const updateSkill = (id, field, value) => {
    setSkills(prev => prev.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };

  const removeSkill = (id) => {
    setSkills(prev => prev.filter(skill => skill.id !== id));
  };

  // Projets
  const addProject = () => {
    setProjects(prev => [...prev, {
      id: Date.now(),
      name: '',
      link: '',
      description: ''
    }]);
  };

  const updateProject = (id, field, value) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    ));
  };

  const removeProject = (id) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  // Certifications
  const addCertification = () => {
    setCertifications(prev => [...prev, {
      id: Date.now(),
      name: '',
      issuingOrg: '',
      issueDate: '',
      link: ''
    }]);
  };

  const updateCertification = (id, field, value) => {
    setCertifications(prev => prev.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    ));
  };

  const removeCertification = (id) => {
    setCertifications(prev => prev.filter(cert => cert.id !== id));
  };

  // Langues
  const addLanguage = () => {
    setLanguages(prev => [...prev, {
      id: Date.now(),
      name: '',
      proficiency: 'intermediate'
    }]);
  };

  const updateLanguage = (id, field, value) => {
    setLanguages(prev => prev.map(lang => 
      lang.id === id ? { ...lang, [field]: value } : lang
    ));
  };

  const removeLanguage = (id) => {
    setLanguages(prev => prev.filter(lang => lang.id !== id));
  };

  const saveResume = () => {
    const newResume = {
      id: Date.now(),
      name: formData.fullName || 'Untitled Resume',
      date: new Date().toLocaleDateString(),
      formData,
      experiences,
      educations,
      skills,
      projects,
      certifications,
      languages,
      photo,
      template: currentTemplate,
      photoSettings,
    };
    
    const updated = [newResume, ...savedResumes];
    setSavedResumes(updated);
    localStorage.setItem('savedResumes', JSON.stringify(updated));
    
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const loadResume = (resume) => {
    setFormData(resume.formData);
    setExperiences(resume.experiences || []);
    setEducations(resume.educations || []);
    setSkills(resume.skills || []);
    setProjects(resume.projects || []);
    setCertifications(resume.certifications || []);
    setLanguages(resume.languages || []);
    setPhoto(resume.photo);
    setCurrentTemplate(resume.template);
    if (resume.photoSettings) setPhotoSettings(resume.photoSettings);
    setShowResumes(false);
  };

  const deleteResume = (id) => {
    const updated = savedResumes.filter(r => r.id !== id);
    setSavedResumes(updated);
    localStorage.setItem('savedResumes', JSON.stringify(updated));
  };

  const duplicateResume = (resume) => {
    const newResume = {
      ...resume,
      id: Date.now(),
      name: `${resume.name} (Copy)`,
      date: new Date().toLocaleDateString(),
    };
    
    const updated = [newResume, ...savedResumes];
    setSavedResumes(updated);
    localStorage.setItem('savedResumes', JSON.stringify(updated));
  };

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

  const generateWithAI = async (field) => {
    setLoading(true);
    try {
      let generatedText = '';
      
      if (field === 'summary') {
        const summaries = {
          default: `Results-driven ${formData.jobTitle} with proven expertise in delivering high-impact solutions. Strong analytical and problem-solving skills combined with excellent communication abilities. Passionate about driving innovation and achieving organizational goals through collaborative teamwork.`,
          software: `Innovative Software Engineer with expertise in full-stack development and modern technologies. Proven track record of building scalable applications and optimizing system performance. Strong problem-solver with excellent collaboration skills and passion for clean, maintainable code.`,
          marketing: `Creative Marketing Professional with extensive experience in developing successful campaigns and driving brand growth. Data-driven approach to strategy with proven ability to increase engagement and ROI. Skilled in digital marketing, content creation, and cross-functional collaboration.`,
          sales: `Dynamic Sales Professional with consistent record of exceeding targets and building lasting client relationships. Expert in consultative selling, negotiation, and closing complex deals. Committed to understanding customer needs and delivering exceptional value.`,
          design: `Creative Designer with a keen eye for aesthetics and user-centered design principles. Experienced in creating compelling visual solutions that enhance brand identity and user experience. Proficient in design tools and passionate about staying current with industry trends.`,
          finance: `Detail-oriented Finance Professional with strong analytical skills and expertise in financial planning and analysis. Proven ability to drive strategic decisions through data-driven insights. Experienced in budgeting, forecasting, and financial reporting.`,
          hr: `Strategic Human Resources Professional with expertise in talent acquisition, employee development, and organizational culture. Proven ability to build high-performing teams and implement effective HR strategies. Strong interpersonal skills and commitment to fostering positive work environments.`,
          teacher: `Dedicated Educator with passion for student success and innovative teaching methodologies. Skilled in creating engaging learning environments and adapting instruction to diverse learning styles. Committed to fostering critical thinking and lifelong learning.`,
          nurse: `Compassionate Healthcare Professional with strong clinical skills and patient-centered care approach. Experienced in fast-paced medical environments with ability to remain calm under pressure. Dedicated to providing high-quality care and collaborating with multidisciplinary teams.`,
          engineer: `Accomplished Engineer with expertise in project management and technical problem-solving. Proven ability to design and implement efficient solutions while meeting strict deadlines and budgets. Strong analytical skills and commitment to quality and safety standards.`,
        };
        
        const jobLower = formData.jobTitle.toLowerCase();
        if (jobLower.includes('software') || jobLower.includes('developer') || jobLower.includes('programmer')) {
          generatedText = summaries.software;
        } else if (jobLower.includes('marketing') || jobLower.includes('brand')) {
          generatedText = summaries.marketing;
        } else if (jobLower.includes('sales') || jobLower.includes('account')) {
          generatedText = summaries.sales;
        } else if (jobLower.includes('design') || jobLower.includes('ux') || jobLower.includes('ui')) {
          generatedText = summaries.design;
        } else if (jobLower.includes('finance') || jobLower.includes('accounting') || jobLower.includes('analyst')) {
          generatedText = summaries.finance;
        } else if (jobLower.includes('hr') || jobLower.includes('human resource') || jobLower.includes('recruitment')) {
          generatedText = summaries.hr;
        } else if (jobLower.includes('teacher') || jobLower.includes('educator') || jobLower.includes('professor')) {
          generatedText = summaries.teacher;
        } else if (jobLower.includes('nurse') || jobLower.includes('medical') || jobLower.includes('healthcare')) {
          generatedText = summaries.nurse;
        } else if (jobLower.includes('engineer')) {
          generatedText = summaries.engineer;
        } else {
          generatedText = summaries.default;
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormData(prev => ({ ...prev, [field]: generatedText }));
      
    } catch (error) {
      console.error('Generation error:', error);
      alert('Failed to generate content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const analyzeResume = async () => {
    setLoading(true);
    setAnalyzeMode(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      let score = 0;
      const suggestions = [];
      const keywords = [];
      
      if (formData.fullName) score += 10;
      else suggestions.push(t.fullName);
      
      if (formData.email) score += 10;
      else suggestions.push(t.email);
      
      if (formData.phone) score += 5;
      else suggestions.push(t.phone);
      
      if (formData.location) score += 5;
      else suggestions.push(t.location);
      
      if (formData.jobTitle) score += 10;
      else suggestions.push(t.jobTitle);
      
      if (formData.summary) score += 10;
      else suggestions.push(t.summary);
      
      if (experiences.length > 0) score += 20;
      else suggestions.push(t.experience);
      
      if (skills.length > 0) score += 15;
      else suggestions.push(t.skills);
      
      if (educations.length > 0) score += 10;
      else suggestions.push(t.education);
      
      if (formData.linkedin) score += 5;
      
      const content = `${formData.summary} ${experiences.map(e => e.description).join(' ')}`.toLowerCase();
      const importantKeywords = ['managed', 'led', 'developed', 'created', 'improved', 'increased', 'reduced', 'optimized'];
      
      importantKeywords.forEach(keyword => {
        if (!content.includes(keyword)) {
          keywords.push(keyword);
        }
      });
      
      setResumeScore(score);
      setImprovementSuggestions(suggestions);
      setMissingKeywords(keywords);
      
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Failed to analyze resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateTailoredResume = async () => {
    if (!jobDescription.trim()) {
      alert('Please paste a job description first.');
      return;
    }
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const keywords = jobDescription.toLowerCase().match(/\b\w+\b/g) || [];
      const importantKeywords = [...new Set(keywords)].slice(0, 10);
      
      const tailoredSummary = `${formData.summary} Specialized expertise in ${importantKeywords.slice(0, 3).join(', ')} with proven success in ${importantKeywords.slice(3, 5).join(' and ')}.`;
      
      setFormData(prev => ({ ...prev, summary: tailoredSummary }));
      
      const newSkills = [...importantKeywords.slice(0, 5)].filter(keyword => 
        !skills.some(skill => skill.name.toLowerCase().includes(keyword))
      ).map(keyword => ({
        id: Date.now() + Math.random(),
        name: keyword.charAt(0).toUpperCase() + keyword.slice(1),
        level: 'intermediate'
      }));
      
      setSkills(prev => [...prev, ...newSkills]);
      
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      
    } catch (error) {
      console.error('Tailoring error:', error);
      alert('Failed to tailor resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadResume = () => {
    createConfetti();
    
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
${exp.startDate} - ${exp.current ? t.current : exp.endDate}
${exp.description}
`).join('\n')}

SKILLS
${skills.map(skill => `• ${skill.name} (${skill.level})`).join('\n')}

EDUCATION
${educations.map(edu => `
${edu.degree} at ${edu.institution}
${edu.startDate} - ${edu.current ? t.current : edu.endDate}
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
  };

  const nextStep = () => {
    if (step < totalSteps) {
      if (step === 1 && (!formData.fullName || !formData.jobTitle || !formData.email)) {
        alert(t.completeRequiredFields);
        return;
      }
      
      createConfetti();
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div style={styles.container}>
      {/* Notification */}
      <div style={styles.notification(showNotification)}>
        <Save size={20} style={{ color: themes[currentTheme].success[0] }} />
        <span>{t.autoSaved} ✓</span>
      </div>

      {/* Indicateur hors ligne */}
      {!isOnline && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#f59e0b',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600',
          zIndex: 10000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}>
          ⚠️ Mode hors ligne - Vos modifications seront sauvegardées localement
        </div>
      )}

      <div style={styles.floatingShapes}>
        <div style={{...styles.shape(0, 8), width: '100px', height: '100px', top: '10%', left: '10%'}} />
        <div style={{...styles.shape(2, 10), width: '150px', height: '150px', top: '60%', right: '15%'}} />
        <div style={{...styles.shape(4, 12), width: '80px', height: '80px', bottom: '20%', left: '20%'}} />
        <div style={{...styles.shape(1, 9), width: '120px', height: '120px', top: '30%', right: '25%'}} />
      </div>
      
      <div style={styles.maxWidth}>
        <div style={styles.header}>
          <div style={styles.headerFlex}>
            <div style={styles.iconWrapper}>
              <FileText size={40} color="white" />
            </div>
            <h1 style={styles.title}>{t.title}</h1>
          </div>
          <p style={styles.subtitle}>{t.subtitle} ✨</p>
          
          <div style={styles.controls}>
            <button
              onClick={() => setIsDark(!isDark)}
              style={styles.toggleButton}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={() => setLanguage(language === 'en' ? 'fr' : language === 'fr' ? 'ar' : 'en')}
              style={styles.actionButton}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <Globe size={16} />
              {language.toUpperCase()}
            </button>

            <button
              onClick={saveResume}
              style={styles.actionButton}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <Save size={16} />
              {t.save}
            </button>

            <button
              onClick={() => setShowResumes(!showResumes)}
              style={styles.actionButton}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <List size={16} />
              {t.savedResumes} ({savedResumes.length})
            </button>

            <button
              onClick={() => setShowPreview(!showPreview)}
              style={styles.actionButton}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>

            <button
              onClick={analyzeResume}
              style={styles.actionButton}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <Sparkles size={16} />
              {t.analyzeResume}
            </button>

            {/* New Advanced Tools Toggle */}
            <button
              onClick={() => setShowAdvancedTools(!showAdvancedTools)}
              style={{
                ...styles.actionButton,
                background: showAdvancedTools ? themes[currentTheme].ai[0] : styles.actionButton.background
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <Sparkles size={16} />
              {showAdvancedTools ? 'Outils Basiques' : 'Outils Avancés'}
            </button>
            
            {Object.keys(themes).map((themeKey) => (
              <button
                key={themeKey}
                onClick={() => setCurrentTheme(themeKey)}
                style={styles.themeButton(currentTheme === themeKey)}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = currentTheme === themeKey ? 'scale(1.05)' : 'scale(1)'}
              >
                {themes[themeKey].name}
              </button>
            ))}
          </div>
        </div>

        {/* Liste des CVs sauvegardés */}
        {showResumes && (
          <div style={styles.card}>
            <div style={styles.cardGlow} />
            <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '24px', color: isDark ? '#e0e0e0' : '#2d3748' }}>
              {t.savedResumes}
            </h3>
            <div style={styles.resumesList}>
              {savedResumes.length === 0 ? (
                <p style={{ textAlign: 'center', color: isDark ? '#aaa' : '#666', padding: '40px' }}>
                  {t.noResumes}
                </p>
              ) : (
                savedResumes.map((resume) => (
                  <div key={resume.id} style={styles.resumeItem}>
                    <div>
                      <p style={{ fontWeight: '700', color: isDark ? '#e0e0e0' : '#2d3748' }}>
                        {resume.name}
                      </p>
                      <p style={{ fontSize: '12px', color: isDark ? '#aaa' : '#666' }}>
                        {resume.date} • {cvTemplates[resume.template].name}
                      </p>
                    </div>
                    <div style={styles.resumeItemButtons}>
                      <button
                        onClick={() => loadResume(resume)}
                        style={styles.smallButton}
                        title={t.load}
                      >
                        <Download size={16} />
                      </button>
                      <button
                        onClick={() => duplicateResume(resume)}
                        style={styles.smallButton}
                        title={t.duplicate}
                      >
                        <Copy size={16} />
                      </button>
                      <button
                        onClick={() => deleteResume(resume.id)}
                        style={{...styles.smallButton, color: '#e74c3c'}}
                        title={t.delete}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Mode Analyse */}
        {analyzeMode && (
          <div style={styles.card}>
            <div style={styles.cardGlow} />
            <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '24px', color: isDark ? '#e0e0e0' : '#2d3748' }}>
              {t.resumeScore}
            </h2>
            
            <div style={styles.scoreMeter}>
              <div style={styles.scoreFill(resumeScore)} />
            </div>
            <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px', color: themes[currentTheme].success[0] }}>
              {resumeScore}%
            </p>

            {improvementSuggestions.length > 0 && (
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>{t.improvements}</h3>
                <ul>
                  {improvementSuggestions.map((suggestion, index) => (
                    <li key={index} style={{ marginBottom: '8px', color: isDark ? '#e0e0e0' : '#2d3748' }}>
                      • {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {missingKeywords.length > 0 && (
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>{t.keywords}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {missingKeywords.map((keyword, index) => (
                    <span
                      key={index}
                      style={{
                        background: themes[currentTheme].ai[0],
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                      }}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setAnalyzeMode(false)}
              style={styles.actionButton}
            >
              {t.back}
            </button>
          </div>
        )}

        {!analyzeMode && (
          <>
            {/* Advanced Components Section */}
            {showAdvancedTools && (
              <div style={{ marginBottom: '24px' }}>
                {/* AI Components */}
                <RealAIAssistant 
                  formData={formData}
                  experiences={experiences}
                  skills={skills}
                  onAISuggestion={handleAISuggestion}
                />

                <JobDescriptionAnalyzer 
                  formData={formData}
                  skills={skills}
                  experiences={experiences}
                  onMatchImprovement={handleAISuggestion}
                />

                <LiveFeedback 
                  formData={formData}
                  experiences={experiences}
                  skills={skills}
                  onSuggestionApply={handleAISuggestion}
                />

                {/* Collaboration */}
                <CollaborativeEditor 
                  resumeData={{
                    formData,
                    experiences,
                    skills,
                    educations,
                    projects,
                    certifications,
                    languages
                  }}
                  onResumeUpdate={handleResumeUpdate}
                />

                {/* Analytics */}
                <AnalyticsDashboard 
                  resumeData={{
                    formData,
                    experiences,
                    skills,
                    educations,
                    projects
                  }}
                  resumeViews={userProgress.views}
                />

                {/* Gamification */}
                <AchievementSystem 
                  resumeData={{
                    formData,
                    experiences,
                    skills,
                    educations,
                    projects
                  }}
                  userProgress={userProgress}
                />

                {/* Accessibility */}
                <VoiceRecognition 
                  onTextUpdate={handleVoiceTextUpdate}
                />

                <AccessibilitySettings />

                {/* Templates */}
                <IndustryTemplates 
                  onTemplateSelect={setCurrentTemplate}
                  currentTemplate={currentTemplate}
                />

                {/* Plugins */}
                <PluginSystem 
                  resumeData={{
                    formData,
                    experiences,
                    skills,
                    educations,
                    projects
                  }}
                  onPluginActivate={handleAISuggestion}
                />

                {/* Presentation */}
                <PresentationMode 
                  resumeData={{
                    formData,
                    experiences,
                    skills,
                    educations,
                    projects,
                    certifications,
                    languages
                  }}
                />
              </div>
            )}

            <div style={styles.progressBar}>
              <div style={styles.progressFill(progress)} />
            </div>
            <p style={styles.progressText}>{Math.round(progress)}% Complete</p>

            <div style={styles.card}>
              <div style={styles.cardGlow} />
              
              {/* Template Selector */}
              <div style={{ marginBottom: '32px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: '700', color: isDark ? '#e0e0e0' : '#2d3748', marginRight: '12px' }}>
                  {t.template}:
                </span>
                {Object.keys(cvTemplates).map((templateKey) => (
                  <button
                    key={templateKey}
                    onClick={() => setCurrentTemplate(templateKey)}
                    style={{
                      padding: '8px 16px',
                      border: currentTemplate === templateKey ? `2px solid ${themes[currentTheme].primary[0]}` : '2px solid transparent',
                      borderRadius: '8px',
                      background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                      color: isDark ? '#e0e0e0' : '#2d3748',
                      cursor: 'pointer',
                      fontWeight: currentTemplate === templateKey ? '700' : '500',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {cvTemplates[templateKey].name}
                  </button>
                ))}
              </div>

              {/* Outils IA */}
              {step === 4 && !showAdvancedTools && (
                <>
                  <div style={styles.aiToolsCard}>
                    <h3 style={styles.sectionTitle}>
                      <Sparkles size={20} />
                      AI-Powered Tools
                    </h3>
                    
                    <div style={styles.formGroup}>
                      <label style={styles.label}>{t.jobDescription}</label>
                      <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder={t.pasteJobDescription}
                        rows="4"
                        style={styles.textarea}
                      />
                    </div>
                    
                    <button
                      onClick={generateTailoredResume}
                      disabled={loading}
                      style={{
                        ...styles.actionButton,
                        background: `linear-gradient(135deg, ${themes[currentTheme].ai[0]} 0%, ${themes[currentTheme].ai[1]} 100%)`,
                        opacity: loading ? 0.6 : 1,
                      }}
                    >
                      {loading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Sparkles size={16} />}
                      {t.generateTailoredResume}
                    </button>
                  </div>

                  {/* Composants supplémentaires */}
                  <ATSAnalysisPanel 
                    resumeData={{
                      formData,
                      experiences,
                      skills,
                      educations,
                      projects
                    }} 
                    isDark={isDark} 
                    currentTheme={currentTheme} 
                  />

                  <CoverLetterGenerator 
                    isDark={isDark} 
                    currentTheme={currentTheme}
                    formData={formData}
                    experiences={experiences}
                    skills={skills}
                    loading={loading}
                    setLoading={setLoading}
                    language={language}
                  />

                  <ExportOptions 
                    isDark={isDark} 
                    currentTheme={currentTheme}
                    formData={formData}
                    experiences={experiences}
                    skills={skills}
                    educations={educations}
                    projects={projects}
                    certifications={certifications}
                    languages={languages}
                    loading={loading}
                    setLoading={setLoading}
                  />

                  <ApplicationTracker 
                    isDark={isDark} 
                    currentTheme={currentTheme}
                    language={language}
                  />
                </>
              )}

              {/* Steps */}
              <div style={{ marginBottom: '48px', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  {[1, 2, 3, 4].map((s) => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                        fontSize: '20px',
                        background: s === step 
                          ? `linear-gradient(135deg, ${themes[currentTheme].primary[0]} 0%, ${themes[currentTheme].primary[1]} 100%)`
                          : s < step 
                          ? `linear-gradient(135deg, ${themes[currentTheme].success[0]} 0%, ${themes[currentTheme].success[1]} 100%)`
                          : isDark 
                          ? 'linear-gradient(135deg, #4a4a4a 0%, #2d2d2d 100%)'
                          : 'linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)',
                        color: s === step || s < step ? 'white' : isDark ? '#999' : '#9e9e9e',
                        boxShadow: s === step 
                          ? `0 8px 24px ${themes[currentTheme].primary[0]}80`
                          : s < step 
                          ? `0 8px 24px ${themes[currentTheme].success[0]}60`
                          : '0 4px 12px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.4s ease',
                        transform: s === step ? 'scale(1.1)' : 'scale(1)',
                      }}>
                        {s}
                      </div>
                      {s < 4 && (
                        <div style={{
                          flex: 1,
                          height: '6px',
                          margin: '0 12px',
                          background: s < step 
                            ? `linear-gradient(90deg, ${themes[currentTheme].success[0]} 0%, ${themes[currentTheme].success[1]} 100%)`
                            : isDark
                            ? 'linear-gradient(90deg, #4a4a4a 0%, #2d2d2d 100%)'
                            : 'linear-gradient(90deg, #e0e0e0 0%, #f5f5f5 100%)',
                          borderRadius: '3px',
                          transition: 'all 0.5s ease',
                        }} />
                      )}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', color: isDark ? '#aaa' : '#666', marginTop: '12px' }}>
                  <span>{t.personalInfo}</span>
                  <span>{t.professionalSummary}</span>
                  <span>{t.experienceSkills}</span>
                  <span>{t.educationPreview}</span>
                </div>
              </div>

              {/* Form Content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                {step === 1 && (
                  <>
                    <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '24px', color: isDark ? '#e0e0e0' : '#2d3748' }}>
                      {t.personalInfo}
                    </h2>
                    
                    {/* Photo upload amélioré */}
                    <EnhancedPhotoUpload 
                      isDark={isDark}
                      currentTheme={currentTheme}
                      photo={photo}
                      handlePhotoUpload={handlePhotoUpload}
                      removePhoto={removePhoto}
                      language={language}
                    />
                    
                    {/* Réglages photo (seulement si une photo est uploadée) */}
                    {photo && (
                      <PhotoSettings 
                        isDark={isDark}
                        currentTheme={currentTheme}
                        photoSettings={photoSettings}
                        setPhotoSettings={setPhotoSettings}
                        language={language}
                      />
                    )}
                    
                    {/* Suggestions intelligentes */}
                    <SmartSuggestions 
                      isDark={isDark}
                      formData={formData}
                      experiences={experiences}
                      skills={skills}
                      language={language}
                    />

                    <div style={styles.twoColumns}>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>{t.fullName} *</label>
                        <input
                          type="text"
                          placeholder={t.fullName}
                          value={formData.fullName}
                          onChange={(e) => updateField('fullName', e.target.value)}
                          style={styles.input}
                        />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>{t.jobTitle} *</label>
                        <input
                          type="text"
                          placeholder={t.jobTitle}
                          value={formData.jobTitle}
                          onChange={(e) => updateField('jobTitle', e.target.value)}
                          style={styles.input}
                        />
                      </div>
                    </div>

                    <div style={styles.twoColumns}>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>{t.email} *</label>
                        <input
                          type="email"
                          placeholder={t.email}
                          value={formData.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          style={styles.input}
                        />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>{t.phone}</label>
                        <input
                          type="tel"
                          placeholder={t.phone}
                          value={formData.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          style={styles.input}
                        />
                      </div>
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>{t.location}</label>
                      <input
                        type="text"
                        placeholder={t.location}
                        value={formData.location}
                        onChange={(e) => updateField('location', e.target.value)}
                        style={styles.input}
                      />
                    </div>

                    <div style={styles.twoColumns}>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>{t.linkedin}</label>
                        <input
                          type="url"
                          placeholder={t.linkedin}
                          value={formData.linkedin}
                          onChange={(e) => updateField('linkedin', e.target.value)}
                          style={styles.input}
                        />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>{t.github}</label>
                        <input
                          type="url"
                          placeholder={t.github}
                          value={formData.github}
                          onChange={(e) => updateField('github', e.target.value)}
                          style={styles.input}
                        />
                      </div>
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>{t.website}</label>
                      <input
                        type="url"
                        placeholder={t.website}
                        value={formData.website}
                        onChange={(e) => updateField('website', e.target.value)}
                        style={styles.input}
                      />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '24px', color: isDark ? '#e0e0e0' : '#2d3748' }}>
                      {t.professionalSummary}
                    </h2>
                    <div style={styles.formGroup}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <label style={styles.label}>{t.summary}</label>
                        <button
                          onClick={() => generateWithAI('summary')}
                          disabled={loading || !formData.jobTitle}
                          style={{
                            padding: '10px 20px',
                            background: `linear-gradient(135deg, ${themes[currentTheme].ai[0]} 0%, ${themes[currentTheme].ai[1]} 100%)`,
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            cursor: loading || !formData.jobTitle ? 'not-allowed' : 'pointer',
                            opacity: loading || !formData.jobTitle ? 0.6 : 1,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                          }}
                        >
                          {loading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Sparkles size={16} />}
                          {t.generateAI}
                        </button>
                      </div>
                      <textarea
                        value={formData.summary}
                        onChange={(e) => updateField('summary', e.target.value)}
                        rows="5"
                        style={styles.textarea}
                        placeholder="Describe your professional background, key achievements, and career objectives..."
                      />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>{t.interests}</label>
                      <input
                        type="text"
                        placeholder={t.interests}
                        value={formData.interests}
                        onChange={(e) => updateField('interests', e.target.value)}
                        style={styles.input}
                      />
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '24px', color: isDark ? '#e0e0e0' : '#2d3748' }}>
                      {t.experienceSkills}
                    </h2>

                    {/* Expérience Professionnelle */}
                    <div style={styles.section}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 style={styles.sectionTitle}>
                          <Briefcase size={20} />
                          {t.experience}
                        </h3>
                        <button onClick={addExperience} style={styles.addButton}>
                          <Plus size={16} />
                          {t.addExperience}
                        </button>
                      </div>
                      
                      {experiences.map((exp) => (
                        <div key={exp.id} style={styles.itemCard}>
                          <div style={styles.itemHeader}>
                            <div style={{ flex: 1 }}>
                              <div style={styles.twoColumns}>
                                <input
                                  type="text"
                                  placeholder={t.position}
                                  value={exp.position}
                                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                                  style={styles.input}
                                />
                                <input
                                  type="text"
                                  placeholder={t.company}
                                  value={exp.company}
                                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                  style={styles.input}
                                />
                              </div>
                              <div style={styles.twoColumns}>
                                <input
                                  type="text"
                                  placeholder={t.startDate}
                                  value={exp.startDate}
                                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                  style={styles.input}
                                />
                                <input
                                  type="text"
                                  placeholder={exp.current ? t.current : t.endDate}
                                  value={exp.endDate}
                                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                  style={styles.input}
                                  disabled={exp.current}
                                />
                              </div>
                              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                                <input
                                  type="checkbox"
                                  checked={exp.current}
                                  onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                                />
                                {t.current}
                              </label>
                            </div>
                            <button
                              onClick={() => removeExperience(exp.id)}
                              style={styles.removeButton}
                              title={t.remove}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <textarea
                            placeholder={t.description}
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                            rows="3"
                            style={styles.textarea}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Compétences */}
                    <div style={styles.section}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 style={styles.sectionTitle}>
                          <Award size={20} />
                          {t.skills}
                        </h3>
                        <button onClick={addSkill} style={styles.addButton}>
                          <Plus size={16} />
                          {t.addSkill}
                        </button>
                      </div>
                      
                      {skills.map((skill) => (
                        <div key={skill.id} style={styles.itemCard}>
                          <div style={styles.itemHeader}>
                            <div style={{ flex: 1, display: 'flex', gap: '12px', alignItems: 'center' }}>
                              <input
                                type="text"
                                placeholder={t.skillName}
                                value={skill.name}
                                onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                                style={{ ...styles.input, flex: 1 }}
                              />
                              <select
                                value={skill.level}
                                onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                                style={styles.input}
                              >
                                <option value="beginner">{t.beginner}</option>
                                <option value="intermediate">{t.intermediate}</option>
                                <option value="fluent">{t.fluent}</option>
                                <option value="native">{t.native}</option>
                              </select>
                            </div>
                            <button
                              onClick={() => removeSkill(skill.id)}
                              style={styles.removeButton}
                              title={t.remove}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Projets */}
                    <div style={styles.section}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 style={styles.sectionTitle}>
                          <FileText size={20} />
                          {t.projects}
                        </h3>
                        <button onClick={addProject} style={styles.addButton}>
                          <Plus size={16} />
                          {t.addProject}
                        </button>
                      </div>
                      
                      {projects.map((project) => (
                        <div key={project.id} style={styles.itemCard}>
                          <div style={styles.itemHeader}>
                            <div style={{ flex: 1 }}>
                              <input
                                type="text"
                                placeholder={t.projectName}
                                value={project.name}
                                onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                                style={{ ...styles.input, marginBottom: '8px' }}
                              />
                              <input
                                type="url"
                                placeholder={t.projectLink}
                                value={project.link}
                                onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                                style={styles.input}
                              />
                            </div>
                            <button
                              onClick={() => removeProject(project.id)}
                              style={styles.removeButton}
                              title={t.remove}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <textarea
                            placeholder={t.description}
                            value={project.description}
                            onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                            rows="2"
                            style={styles.textarea}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '24px', color: isDark ? '#e0e0e0' : '#2d3748' }}>
                      {t.educationPreview}
                    </h2>

                    {/* Éducation */}
                    <div style={styles.section}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 style={styles.sectionTitle}>
                          <GraduationCap size={20} />
                          {t.education}
                        </h3>
                        <button onClick={addEducation} style={styles.addButton}>
                          <Plus size={16} />
                          {t.addEducation}
                        </button>
                      </div>
                      
                      {educations.map((edu) => (
                        <div key={edu.id} style={styles.itemCard}>
                          <div style={styles.itemHeader}>
                            <div style={{ flex: 1 }}>
                              <div style={styles.twoColumns}>
                                <input
                                  type="text"
                                  placeholder={t.institution}
                                  value={edu.institution}
                                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                                  style={styles.input}
                                />
                                <input
                                  type="text"
                                  placeholder={t.degree}
                                  value={edu.degree}
                                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                  style={styles.input}
                                />
                              </div>
                              <div style={styles.twoColumns}>
                                <input
                                  type="text"
                                  placeholder={t.startDate}
                                  value={edu.startDate}
                                  onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                                  style={styles.input}
                                />
                                <input
                                  type="text"
                                  placeholder={edu.current ? t.current : t.endDate}
                                  value={edu.endDate}
                                  onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                                  style={styles.input}
                                  disabled={edu.current}
                                />
                              </div>
                              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                                <input
                                  type="checkbox"
                                  checked={edu.current}
                                  onChange={(e) => updateEducation(edu.id, 'current', e.target.checked)}
                                />
                                {t.current}
                              </label>
                            </div>
                            <button
                              onClick={() => removeEducation(edu.id)}
                              style={styles.removeButton}
                              title={t.remove}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <textarea
                            placeholder={t.description}
                            value={edu.description}
                            onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                            rows="2"
                            style={styles.textarea}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Certifications */}
                    <div style={styles.section}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 style={styles.sectionTitle}>
                          <Award size={20} />
                          {t.certifications}
                        </h3>
                        <button onClick={addCertification} style={styles.addButton}>
                          <Plus size={16} />
                          {t.addCertification}
                        </button>
                      </div>
                      
                      {certifications.map((cert) => (
                        <div key={cert.id} style={styles.itemCard}>
                          <div style={styles.itemHeader}>
                            <div style={{ flex: 1 }}>
                              <input
                                type="text"
                                placeholder={t.certificationName}
                                value={cert.name}
                                onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                                style={{ ...styles.input, marginBottom: '8px' }}
                              />
                              <div style={styles.twoColumns}>
                                <input
                                  type="text"
                                  placeholder={t.issuingOrg}
                                  value={cert.issuingOrg}
                                  onChange={(e) => updateCertification(cert.id, 'issuingOrg', e.target.value)}
                                  style={styles.input}
                                />
                                <input
                                  type="text"
                                  placeholder={t.issueDate}
                                  value={cert.issueDate}
                                  onChange={(e) => updateCertification(cert.id, 'issueDate', e.target.value)}
                                  style={styles.input}
                                />
                              </div>
                            </div>
                            <button
                              onClick={() => removeCertification(cert.id)}
                              style={styles.removeButton}
                              title={t.remove}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Langues */}
                    <div style={styles.section}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 style={styles.sectionTitle}>
                          <Languages size={20} />
                          {t.languages}
                        </h3>
                        <button onClick={addLanguage} style={styles.addButton}>
                          <Plus size={16} />
                          {t.addLanguage}
                        </button>
                      </div>
                      
                      {languages.map((lang) => (
                        <div key={lang.id} style={styles.itemCard}>
                          <div style={styles.itemHeader}>
                            <div style={{ flex: 1, display: 'flex', gap: '12px', alignItems: 'center' }}>
                              <input
                                type="text"
                                placeholder={t.languageName}
                                value={lang.name}
                                onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                                style={{ ...styles.input, flex: 1 }}
                              />
                              <select
                                value={lang.proficiency}
                                onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)}
                                style={styles.input}
                              >
                                <option value="beginner">{t.beginner}</option>
                                <option value="intermediate">{t.intermediate}</option>
                                <option value="fluent">{t.fluent}</option>
                                <option value="native">{t.native}</option>
                              </select>
                            </div>
                            <button
                              onClick={() => removeLanguage(lang.id)}
                              style={styles.removeButton}
                              title={t.remove}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Aperçu du CV */}
                    {showPreview && (
                      <div style={{
                        marginTop: '32px',
                        padding: '32px',
                        background: isDark ? '#2d2d2d' : '#f6f8fb',
                        borderRadius: '20px',
                        border: isDark ? '2px solid #4a4a4a' : '2px solid #e2e8f0',
                      }}>
                        <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '24px', color: isDark ? '#e0e0e0' : '#2d3748' }}>
                          {t.preview}
                        </h3>
                        <ResumePreview 
                          formData={formData}
                          experiences={experiences}
                          skills={skills}
                          educations={educations}
                          projects={projects}
                          certifications={certifications}
                          languages={languages}
                          currentTemplate={currentTemplate}
                          photo={photo}
                          photoSettings={photoSettings}
                          language={language}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Navigation Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', gap: '16px' }}>
                <button
                  onClick={prevStep}
                  disabled={step === 1}
                  style={{
                    padding: '14px 32px',
                    border: 'none',
                    borderRadius: '14px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: step === 1 ? 'not-allowed' : 'pointer',
                    background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                    color: isDark ? '#e0e0e0' : '#2d3748',
                    opacity: step === 1 ? 0.5 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <ChevronLeft size={20} />
                  {t.previous}
                </button>

                {step < totalSteps ? (
                  <button
                    onClick={nextStep}
                    style={{
                      padding: '14px 32px',
                      border: 'none',
                      borderRadius: '14px',
                      fontSize: '16px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      background: `linear-gradient(135deg, ${themes[currentTheme].primary[0]} 0%, ${themes[currentTheme].primary[1]} 100%)`,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      boxShadow: `0 8px 24px ${themes[currentTheme].primary[0]}60`,
                    }}
                  >
                    {t.next}
                    <ChevronRight size={20} />
                  </button>
                ) : (
                  <button
                    onClick={downloadResume}
                    style={{
                      padding: '14px 32px',
                      border: 'none',
                      borderRadius: '14px',
                      fontSize: '16px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      background: `linear-gradient(135deg, ${themes[currentTheme].success[0]} 0%, ${themes[currentTheme].success[1]} 100%)`,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      boxShadow: `0 8px 24px ${themes[currentTheme].success[0]}60`,
                    }}
                  >
                    <Download size={20} />
                    {t.download}
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}