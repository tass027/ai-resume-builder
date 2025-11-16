import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Square, Play } from 'lucide-react';

const VoiceRecognition = ({ onTextUpdate, disabled = false }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Vérifier la compatibilité du navigateur
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'fr-FR';

    recognitionRef.current.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(finalTranscript + interimTranscript);
      
      // Mettre à jour le texte en temps réel
      if (onTextUpdate) {
        onTextUpdate(finalTranscript + interimTranscript);
      }
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Erreur reconnaissance vocale:', event.error);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTextUpdate]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isSupported) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '16px',
        color: 'white',
        textAlign: 'center'
      }}>
        <MicOff size={20} style={{ marginBottom: '8px' }} />
        <p style={{ margin: 0, fontSize: '14px' }}>
          La reconnaissance vocale n'est pas supportée par votre navigateur
        </p>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      borderRadius: '16px',
      padding: '20px',
      marginBottom: '24px',
      color: 'white'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '16px'
      }}>
        <Mic size={24} />
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>
          Reconnaissance Vocale
        </h3>
      </div>

      {/* Contrôle principal */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '16px'
      }}>
        <button
          onClick={toggleListening}
          disabled={disabled}
          style={{
            padding: '12px 24px',
            background: isListening 
              ? 'rgba(255,255,255,0.3)' 
              : 'rgba(255,255,255,0.2)',
            border: `2px solid ${isListening ? '#ff6b6b' : 'rgba(255,255,255,0.3)'}`,
            borderRadius: '50px',
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            cursor: disabled ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease',
            opacity: disabled ? 0.5 : 1
          }}
        >
          {isListening ? (
            <>
              <Square size={20} />
              Arrêter
            </>
          ) : (
            <>
              <Mic size={20} />
              Parler
            </>
          )}
        </button>

        {/* Indicateur d'état */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: isListening ? '#00ff88' : '#ff6b6b',
              animation: isListening ? 'pulse 1.5s infinite' : 'none'
            }}
          />
          <span style={{ fontSize: '14px' }}>
            {isListening ? 'En écoute...' : 'En attente'}
          </span>
        </div>
      </div>

      {/* Transcription en temps réel */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '8px',
        padding: '16px',
        minHeight: '80px',
        marginBottom: '16px',
        backdropFilter: 'blur(10px)'
      }}>
        {transcript ? (
          <p style={{ 
            margin: 0, 
            fontSize: '14px', 
            lineHeight: '1.5',
            whiteSpace: 'pre-wrap'
          }}>
            {transcript}
          </p>
        ) : (
          <p style={{ 
            margin: 0, 
            fontSize: '14px', 
            opacity: 0.7,
            fontStyle: 'italic'
          }}>
            {isListening 
              ? "Parlez maintenant... Votre discours apparaîtra ici en temps réel." 
              : "Cliquez sur 'Parler' pour commencer la dictée vocale."}
          </p>
        )}
      </div>

      {/* Instructions */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '8px',
        padding: '12px',
        fontSize: '12px'
      }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: '600' }}>
          💡 Instructions
        </h4>
        <ul style={{ margin: 0, paddingLeft: '16px', opacity: 0.8 }}>
          <li>Parlez clairement et à un rythme normal</li>
          <li>Utilisez la ponctuation en disant "point", "virgule", etc.</li>
          <li>Corrigez les erreurs manuellement si nécessaire</li>
        </ul>
      </div>

      {/* Indicateur de niveau audio (visuel) */}
      {isListening && (
        <div style={{
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'center',
          gap: '2px',
          height: '30px',
          marginTop: '12px'
        }}>
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              style={{
                width: '4px',
                height: `${Math.random() * 20 + 5}px`,
                background: 'rgba(255,255,255,0.8)',
                borderRadius: '2px',
                animation: 'pulse 0.5s infinite',
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VoiceRecognition;