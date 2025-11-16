import React, { useState, useEffect } from 'react';
import { Trophy, Star, Award, Zap, Target, TrendingUp } from 'lucide-react';

const AchievementSystem = ({ resumeData, userProgress }) => {
  const [achievements, setAchievements] = useState([]);
  const [userLevel, setUserLevel] = useState(1);
  const [experience, setExperience] = useState(0);

  const allAchievements = [
    {
      id: 'first_resume',
      name: 'Premier Pas',
      description: 'Créez votre premier CV',
      icon: '🎯',
      points: 100,
      unlocked: false,
      condition: (data) => data.completionRate >= 20
    },
    {
      id: 'ats_master',
      name: 'Maître ATS',
      description: 'Atteignez un score ATS de 90%',
      icon: '📊',
      points: 250,
      unlocked: false,
      condition: (data) => data.atsScore >= 90
    },
    {
      id: 'skill_expert',
      name: 'Expert en Compétences',
      description: 'Ajoutez 10 compétences techniques',
      icon: '⚡',
      points: 150,
      unlocked: false,
      condition: (data) => data.skillsCount >= 10
    },
    {
      id: 'perfectionist',
      name: 'Perfectionniste',
      description: 'Complétez 100% de votre profil',
      icon: '⭐',
      points: 300,
      unlocked: false,
      condition: (data) => data.completionRate >= 100
    },
    {
      id: 'networker',
      name: 'Réseauteur',
      description: 'Partagez votre CV 5 fois',
      icon: '🔗',
      points: 200,
      unlocked: false,
      condition: (data) => data.shares >= 5
    },
    {
      id: 'analytics_pro',
      name: 'Pro des Analytics',
      description: 'Obtenez 50 vues sur votre CV',
      icon: '📈',
      points: 400,
      unlocked: false,
      condition: (data) => data.views >= 50
    }
  ];

  useEffect(() => {
    checkAchievements();
  }, [resumeData, userProgress]);

  const checkAchievements = () => {
    const userData = {
      completionRate: calculateCompletionRate(),
      atsScore: resumeData.atsScore || 0,
      skillsCount: resumeData.skills?.length || 0,
      shares: userProgress?.shares || 0,
      views: userProgress?.views || 0
    };

    const unlocked = allAchievements.map(achievement => ({
      ...achievement,
      unlocked: achievement.condition(userData)
    }));

    setAchievements(unlocked);
    updateExperience(unlocked);
  };

  const calculateCompletionRate = () => {
    const fields = [
      resumeData.summary,
      resumeData.experiences?.length > 0,
      resumeData.skills?.length > 0,
      resumeData.education?.length > 0
    ];
    const completed = fields.filter(Boolean).length;
    return (completed / fields.length) * 100;
  };

  const updateExperience = (unlockedAchievements) => {
    const totalXP = unlockedAchievements
      .filter(ach => ach.unlocked)
      .reduce((sum, ach) => sum + ach.points, 0);
    
    setExperience(totalXP);
    setUserLevel(Math.floor(totalXP / 1000) + 1);
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);

  return (
    <div style={{
      background: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '24px',
      color: 'white'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Trophy size={24} />
          <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>
            Système de Gamification
          </h3>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.2)',
          padding: '8px 16px',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Star size={16} />
          <span style={{ fontWeight: '600' }}>Niveau {userLevel}</span>
        </div>
      </div>

      {/* Barre de progression */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '10px',
        padding: '16px',
        marginBottom: '20px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px'
        }}>
          <span style={{ fontSize: '14px', fontWeight: '600' }}>
            Progression
          </span>
          <span style={{ fontSize: '14px' }}>
            {experience} XP
          </span>
        </div>
        
        <div style={{
          width: '100%',
          height: '8px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${(experience % 1000) / 10}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #ffd89b, #ff9a00)',
            borderRadius: '4px',
            transition: 'width 0.5s ease'
          }} />
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '8px',
          fontSize: '12px',
          opacity: 0.8
        }}>
          <span>Niveau {userLevel}</span>
          <span>{1000 - (experience % 1000)} XP pour le niveau suivant</span>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <StatCard
          icon={<Trophy size={16} />}
          value={unlockedCount}
          label="Succès"
        />
        <StatCard
          icon={<Star size={16} />}
          value={totalPoints}
          label="Points"
        />
        <StatCard
          icon={<TrendingUp size={16} />}
          value={`${calculateCompletionRate()}%`}
          label="Complétion"
        />
      </div>

      {/* Liste des succès */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px'
      }}>
        {achievements.map(achievement => (
          <div
            key={achievement.id}
            style={{
              background: achievement.unlocked 
                ? 'rgba(255,255,255,0.2)' 
                : 'rgba(255,255,255,0.1)',
              padding: '16px',
              borderRadius: '12px',
              border: achievement.unlocked 
                ? '2px solid #ffd89b' 
                : '1px solid rgba(255,255,255,0.1)',
              opacity: achievement.unlocked ? 1 : 0.6,
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '8px'
            }}>
              <span style={{ fontSize: '24px' }}>{achievement.icon}</span>
              <div>
                <h4 style={{ 
                  margin: 0, 
                  fontSize: '14px', 
                  fontWeight: '600',
                  textDecoration: achievement.unlocked ? 'none' : 'line-through'
                }}>
                  {achievement.name}
                </h4>
                <p style={{ 
                  margin: 0, 
                  fontSize: '12px', 
                  opacity: 0.8 
                }}>
                  {achievement.description}
                </p>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px'
              }}>
                <Zap size={12} />
                {achievement.points} XP
              </div>
              
              {achievement.unlocked && (
                <Award size={16} color="#ffd89b" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Badge de niveau */}
      <div style={{
        marginTop: '20px',
        textAlign: 'center',
        background: 'rgba(255,255,255,0.1)',
        padding: '16px',
        borderRadius: '12px'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          background: 'linear-gradient(135deg, #ffd89b, #ff9a00)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 12px auto',
          fontSize: '24px',
          fontWeight: '800'
        }}>
          {userLevel}
        </div>
        <h4 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>
          Niveau {userLevel} Expert CV
        </h4>
        <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>
          Continuez à améliorer votre CV pour débloquer plus de succès !
        </p>
      </div>
    </div>
  );
};

const StatCard = ({ icon, value, label }) => (
  <div style={{
    background: 'rgba(255,255,255,0.1)',
    padding: '12px',
    borderRadius: '8px',
    textAlign: 'center'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '4px' }}>
      {icon}
      <span style={{ fontSize: '18px', fontWeight: '700' }}>{value}</span>
    </div>
    <div style={{ fontSize: '12px', opacity: 0.8 }}>{label}</div>
  </div>
);

export default AchievementSystem;