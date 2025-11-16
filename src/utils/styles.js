import { themes } from '../data/themes';

export const getStyles = (isDark, currentTheme) => {
  const theme = themes[currentTheme];
  
  return {
    container: {
      minHeight: '100vh',
      background: isDark 
        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
        : theme.gradient,
      backgroundSize: '400% 400%',
      animation: 'gradientShift 15s ease infinite',
      padding: '40px 24px',
      position: 'relative',
      overflow: 'hidden',
      transition: 'background 0.5s ease',
    },
    notification: (show) => ({
      position: 'fixed',
      top: show ? '20px' : '-100px',
      right: '20px',
      background: isDark ? '#2d2d2d' : 'white',
      color: isDark ? '#e0e0e0' : '#2d3748',
      padding: '16px 24px',
      borderRadius: '12px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      zIndex: 10000,
      transition: 'top 0.3s ease',
      border: `2px solid ${theme.success[0]}`,
    }),
    floatingShapes: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      pointerEvents: 'none',
      zIndex: 0,
    },
    shape: (delay, duration) => ({
      position: 'absolute',
      borderRadius: '50%',
      background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      animation: `float ${duration}s ease-in-out infinite ${delay}s`,
    }),
    maxWidth: {
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 1,
    },
    progressBar: {
      width: '100%',
      height: '8px',
      backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)',
      borderRadius: '10px',
      marginBottom: '32px',
      overflow: 'hidden',
      boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.1)',
    },
    progressFill: (progress) => ({
      height: '100%',
      width: `${progress}%`,
      background: `linear-gradient(90deg, ${theme.success[0]} 0%, ${theme.success[1]} 100%)`,
      borderRadius: '10px',
      transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: `0 0 20px ${theme.success[0]}`,
    }),
    progressText: {
      textAlign: 'center',
      color: isDark ? 'rgba(255,255,255,0.9)' : 'white',
      fontSize: '14px',
      fontWeight: '700',
      marginTop: '8px',
      textShadow: '0 2px 8px rgba(0,0,0,0.3)',
    },
    header: {
      textAlign: 'center',
      marginBottom: '48px',
      animation: 'fadeInDown 0.8s ease-out',
      position: 'relative',
    },
    headerFlex: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      marginBottom: '16px',
      flexWrap: 'wrap',
    },
    iconWrapper: {
      background: `linear-gradient(135deg, ${theme.primary[0]} 0%, ${theme.primary[1]} 100%)`,
      borderRadius: '20px',
      padding: '16px',
      boxShadow: `0 10px 40px ${theme.primary[0]}80`,
      animation: 'pulse 2s ease-in-out infinite',
    },
    title: {
      fontSize: '48px',
      fontWeight: '900',
      background: isDark 
        ? 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)'
        : 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      letterSpacing: '-1px',
      textShadow: '0 4px 20px rgba(0,0,0,0.2)',
    },
    subtitle: {
      color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.95)',
      fontSize: '18px',
      fontWeight: '500',
      textShadow: '0 2px 10px rgba(0,0,0,0.2)',
    },
    controls: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'center',
      marginTop: '24px',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    themeButton: (isActive) => ({
      padding: '12px 24px',
      border: 'none',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '700',
      cursor: 'pointer',
      background: isActive 
        ? `linear-gradient(135deg, ${theme.primary[0]} 0%, ${theme.primary[1]} 100%)`
        : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)',
      color: 'white',
      transition: 'all 0.3s ease',
      boxShadow: isActive ? `0 8px 20px ${theme.primary[0]}60` : 'none',
      transform: isActive ? 'scale(1.05)' : 'scale(1)',
    }),
    toggleButton: {
      padding: '12px',
      border: 'none',
      borderRadius: '50%',
      cursor: 'pointer',
      background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    },
    actionButton: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '700',
      cursor: 'pointer',
      background: `linear-gradient(135deg, ${theme.primary[0]} 0%, ${theme.primary[1]} 100%)`,
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.3s ease',
      boxShadow: `0 6px 20px ${theme.primary[0]}40`,
    },
    card: {
      backgroundColor: isDark ? 'rgba(30, 30, 46, 0.95)' : 'rgba(255, 255, 255, 0.95)',
      borderRadius: '24px',
      boxShadow: isDark 
        ? '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)'
        : '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)',
      padding: '48px',
      backdropFilter: 'blur(20px)',
      border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.3)',
      animation: 'fadeInUp 0.8s ease-out',
      position: 'relative',
      overflow: 'hidden',
      marginBottom: '24px',
    },
    cardGlow: {
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      width: '200%',
      height: '200%',
      background: `radial-gradient(circle, ${theme.primary[0]}20 0%, transparent 70%)`,
      animation: 'rotate 20s linear infinite',
      pointerEvents: 'none',
    },
    resumesList: {
      maxHeight: '300px',
      overflowY: 'auto',
      marginTop: '16px',
    },
    resumeItem: {
      padding: '16px',
      background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
      borderRadius: '12px',
      marginBottom: '12px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'all 0.3s ease',
    },
    resumeItemButtons: {
      display: 'flex',
      gap: '8px',
    },
    smallButton: {
      padding: '8px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
      color: isDark ? '#e0e0e0' : '#2d3748',
      display: 'flex',
      alignItems: 'center',
      transition: 'all 0.2s ease',
    },
    section: {
      marginBottom: '32px',
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '700',
      marginBottom: '16px',
      color: isDark ? '#e0e0e0' : '#2d3748',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '600',
      color: isDark ? '#e0e0e0' : '#2d3748',
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      border: isDark ? '2px solid #4a4a4a' : '2px solid #e2e8f0',
      borderRadius: '12px',
      fontSize: '14px',
      backgroundColor: isDark ? '#2d2d2d' : 'white',
      color: isDark ? '#e0e0e0' : '#2d3748',
      transition: 'all 0.3s ease',
    },
    textarea: {
      width: '100%',
      padding: '12px 16px',
      border: isDark ? '2px solid #4a4a4a' : '2px solid #e2e8f0',
      borderRadius: '12px',
      fontSize: '14px',
      backgroundColor: isDark ? '#2d2d2d' : 'white',
      color: isDark ? '#e0e0e0' : '#2d3748',
      fontFamily: 'inherit',
      resize: 'vertical',
      minHeight: '100px',
    },
    photoUpload: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '20px',
    },
    photoPreview: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: `3px solid ${theme.primary[0]}`,
    },
    addButton: {
      padding: '10px 16px',
      background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
      border: 'none',
      borderRadius: '8px',
      color: isDark ? '#e0e0e0' : '#2d3748',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      fontWeight: '600',
    },
    itemCard: {
      background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
      padding: '16px',
      borderRadius: '12px',
      marginBottom: '12px',
      border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
    },
    itemHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '8px',
    },
    removeButton: {
      background: 'none',
      border: 'none',
      color: '#e74c3c',
      cursor: 'pointer',
      padding: '4px',
      borderRadius: '4px',
    },
    twoColumns: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
    },
    aiToolsCard: {
      background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
      padding: '20px',
      borderRadius: '12px',
      marginBottom: '20px',
      border: `2px solid ${theme.ai[0]}40`,
    },
    scoreMeter: {
      width: '100%',
      height: '20px',
      background: isDark ? '#2d2d2d' : '#e2e8f0',
      borderRadius: '10px',
      overflow: 'hidden',
      margin: '10px 0',
    },
    scoreFill: (score) => ({
      height: '100%',
      width: `${score}%`,
      background: `linear-gradient(90deg, ${theme.success[0]} 0%, ${theme.success[1]} 100%)`,
      borderRadius: '10px',
      transition: 'width 0.5s ease',
    }),
  };
};

// CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(10deg); }
  }
  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes confettiFall {
    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);