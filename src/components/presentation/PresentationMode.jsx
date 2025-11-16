import React, { useState, useEffect } from 'react';
import { Play, Square, SkipForward, SkipBack, Maximize } from 'lucide-react';

const PresentationMode = ({ resumeData }) => {
  const [isPresenting, setIsPresenting] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slides = [
    {
      title: "Profil Professionnel",
      content: resumeData.summary || "Votre résumé professionnel apparaîtra ici",
      type: "summary"
    },
    {
      title: "Expériences Professionnelles",
      content: resumeData.experiences || [],
      type: "experiences"
    },
    {
      title: "Compétences Techniques",
      content: resumeData.skills || [],
      type: "skills"
    },
    {
      title: "Formation",
      content: resumeData.education || [],
      type: "education"
    },
    {
      title: "Projets & Réalisations",
      content: resumeData.projects || [],
      type: "projects"
    }
  ];

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isPresenting) return;
      
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          nextSlide();
          break;
        case 'ArrowLeft':
          prevSlide();
          break;
        case 'Escape':
          stopPresentation();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isPresenting, currentSlide]);

  const startPresentation = () => {
    setIsPresenting(true);
    setCurrentSlide(0);
    enterFullscreen();
  };

  const stopPresentation = () => {
    setIsPresenting(false);
    exitFullscreen();
  };

  const nextSlide = () => {
    setCurrentSlide(prev => prev < slides.length - 1 ? prev + 1 : prev);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => prev > 0 ? prev - 1 : prev);
  };

  const enterFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
    setIsFullscreen(true);
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    setIsFullscreen(false);
  };

  if (!isPresenting) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: '700' }}>
          🎯 Mode Présentation
        </h3>
        <p style={{ margin: '0 0 20px 0', opacity: 0.8 }}>
          Présentez votre CV de manière professionnelle avec un mode diaporama
        </p>
        <button
          onClick={startPresentation}
          style={{
            padding: '12px 24px',
            background: 'rgba(255,255,255,0.9)',
            border: 'none',
            borderRadius: '8px',
            color: '#ff6b6b',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Play size={20} />
          Démarrer la Présentation
        </button>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      zIndex: 1000,
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Contenu de la slide */}
      <div style={{
        textAlign: 'center',
        maxWidth: '800px',
        padding: '40px'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: '800',
          margin: '0 0 30px 0',
          background: 'linear-gradient(135deg, #fff, #f0f0f0)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {slides[currentSlide].title}
        </h1>

        {renderSlideContent(slides[currentSlide])}
      </div>

      {/* Contrôles de navigation */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}>
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          style={{
            padding: '12px',
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            cursor: currentSlide === 0 ? 'not-allowed' : 'pointer',
            opacity: currentSlide === 0 ? 0.5 : 1
          }}
        >
          <SkipBack size={24} />
        </button>

        <div style={{
          background: 'rgba(255,255,255,0.2)',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          {currentSlide + 1} / {slides.length}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          style={{
            padding: '12px',
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            cursor: currentSlide === slides.length - 1 ? 'not-allowed' : 'pointer',
            opacity: currentSlide === slides.length - 1 ? 0.5 : 1
          }}
        >
          <SkipForward size={24} />
        </button>
      </div>

      {/* Bouton quitter */}
      <button
        onClick={stopPresentation}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '10px',
          background: 'rgba(255,255,255,0.1)',
          border: 'none',
          borderRadius: '8px',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        <Square size={20} />
      </button>
    </div>
  );
};

const renderSlideContent = (slide) => {
  switch (slide.type) {
    case 'summary':
      return (
        <p style={{
          fontSize: '24px',
          lineHeight: '1.6',
          opacity: 0.9
        }}>
          {slide.content}
        </p>
      );
    
    case 'experiences':
      return (
        <div style={{ textAlign: 'left' }}>
          {slide.content.map((exp, index) => (
            <div key={index} style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '24px', margin: '0 0 8px 0' }}>
                {exp.title}
              </h3>
              <p style={{ fontSize: '18px', opacity: 0.8, margin: '0 0 12px 0' }}>
                {exp.company} • {exp.period}
              </p>
              <p style={{ fontSize: '16px', opacity: 0.7 }}>
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      );
    
    case 'skills':
      return (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center'
        }}>
          {slide.content.map((skill, index) => (
            <span
              key={index}
              style={{
                background: 'rgba(255,255,255,0.2)',
                padding: '12px 24px',
                borderRadius: '25px',
                fontSize: '18px',
                fontWeight: '600'
              }}
            >
              {skill.name}
            </span>
          ))}
        </div>
      );
    
    default:
      return (
        <p style={{ fontSize: '20px', opacity: 0.8 }}>
          Contenu de présentation
        </p>
      );
  }
};

export default PresentationMode;