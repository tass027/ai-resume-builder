import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { cvTemplates } from '../data/templates';
import { translations } from '../data/translations';

const ResumePreview = ({ formData, experiences, skills, educations, projects, certifications, languages, currentTemplate, photo, photoSettings, language }) => {
  const template = cvTemplates[currentTemplate] || cvTemplates.modern;
  const t = translations[language];

  const getPhotoStyle = () => {
    const sizes = {
      small: { width: '80px', height: '80px' },
      medium: { width: '120px', height: '120px' },
      large: { width: '150px', height: '150px' }
    };
    
    const styles = {
      circle: { borderRadius: '50%' },
      square: { borderRadius: '0' },
      rounded: { borderRadius: '12px' }
    };
    
    const size = sizes[photoSettings.size] || sizes.medium;
    const style = styles[photoSettings.style] || styles.circle;
    
    return {
      ...size,
      ...style,
      objectFit: 'cover',
      border: `3px solid ${template.primaryColor}`,
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    };
  };

  return (
    <div id="resume-preview" style={{
      fontFamily: template.fontFamily,
      fontSize: template.fontSize,
      color: '#2d3748',
      lineHeight: '1.6',
      padding: '40px',
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      maxWidth: '800px',
      margin: '0 auto',
    }}>
      {/* Header avec photo */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '30px',
        borderBottom: `3px solid ${template.primaryColor}`,
        paddingBottom: '20px',
        marginBottom: '20px',
        flexDirection: template.layout === 'creative' ? 'column' : 'row',
        textAlign: template.layout === 'creative' ? 'center' : 'left',
      }}>
        {/* Photo */}
        {photo && template.photoPosition !== 'none' && (
          <img 
            src={photo} 
            alt="Profile" 
            style={getPhotoStyle()}
          />
        )}
        
        {/* Informations personnelles */}
        <div style={{ flex: 1 }}>
          <h1 style={{
            fontSize: template.layout === 'creative' ? '36px' : '32px',
            fontWeight: 'bold',
            color: template.primaryColor,
            margin: '0 0 10px 0',
          }}>
            {formData.fullName || 'Votre Nom Complet'}
          </h1>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '15px',
            justifyContent: template.layout === 'creative' ? 'center' : 'flex-start',
          }}>
            {formData.email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Mail size={14} />
                <span>{formData.email}</span>
              </div>
            )}
            {formData.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Phone size={14} />
                <span>{formData.phone}</span>
              </div>
            )}
            {formData.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <MapPin size={14} />
                <span>{formData.location}</span>
              </div>
            )}
          </div>
          {formData.jobTitle && (
            <div style={{
              marginTop: '8px',
              fontSize: '18px',
              fontWeight: '600',
              color: template.secondaryColor,
            }}>
              {formData.jobTitle}
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {formData.summary && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{
            color: template.secondaryColor,
            borderBottom: `2px solid ${template.secondaryColor}`,
            paddingBottom: '5px',
            fontSize: '18px',
            fontWeight: 'bold',
          }}>
            PROFESSIONAL SUMMARY
          </h2>
          <p style={{ margin: '10px 0' }}>{formData.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{
            color: template.secondaryColor,
            borderBottom: `2px solid ${template.secondaryColor}`,
            paddingBottom: '5px',
            fontSize: '18px',
            fontWeight: 'bold',
          }}>
            EXPERIENCE
          </h2>
          {experiences.map((exp, index) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '5px',
              }}>
                <h3 style={{
                  fontWeight: 'bold',
                  margin: '0',
                  color: template.primaryColor,
                }}>
                  {exp.position || 'Position'}
                </h3>
                <div style={{
                  fontSize: '0.9em',
                  color: '#666',
                  textAlign: 'right',
                }}>
                  {exp.startDate || 'Start'} - {exp.current ? t.current : (exp.endDate || 'End')}
                </div>
              </div>
              <div style={{
                fontStyle: 'italic',
                marginBottom: '5px',
                color: template.secondaryColor,
              }}>
                {exp.company || 'Company'}
              </div>
              <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{exp.description || 'Description'}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{
            color: template.secondaryColor,
            borderBottom: `2px solid ${template.secondaryColor}`,
            paddingBottom: '5px',
            fontSize: '18px',
            fontWeight: 'bold',
          }}>
            SKILLS
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {skills.map((skill, index) => (
              <span
                key={index}
                style={{
                  background: template.primaryColor,
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '15px',
                  fontSize: '0.9em',
                }}
              >
                {skill.name || 'Skill'}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {educations.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{
            color: template.secondaryColor,
            borderBottom: `2px solid ${template.secondaryColor}`,
            paddingBottom: '5px',
            fontSize: '18px',
            fontWeight: 'bold',
          }}>
            EDUCATION
          </h2>
          {educations.map((edu, index) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '5px',
              }}>
                <h3 style={{
                  fontWeight: 'bold',
                  margin: '0',
                  color: template.primaryColor,
                }}>
                  {edu.degree || 'Degree'}
                </h3>
                <div style={{
                  fontSize: '0.9em',
                  color: '#666',
                  textAlign: 'right',
                }}>
                  {edu.startDate || 'Start'} - {edu.current ? t.current : (edu.endDate || 'End')}
                </div>
              </div>
              <div style={{
                fontStyle: 'italic',
                marginBottom: '5px',
                color: template.secondaryColor,
              }}>
                {edu.institution || 'Institution'}
              </div>
              <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{edu.description || 'Description'}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{
            color: template.secondaryColor,
            borderBottom: `2px solid ${template.secondaryColor}`,
            paddingBottom: '5px',
            fontSize: '18px',
            fontWeight: 'bold',
          }}>
            PROJECTS
          </h2>
          {projects.map((project, index) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              <h3 style={{
                fontWeight: 'bold',
                margin: '0 0 5px 0',
                color: template.primaryColor,
              }}>
                {project.name || 'Project Name'}
              </h3>
              <p style={{ margin: '0 0 5px 0' }}>{project.description || 'Project description'}</p>
              {project.link && (
                <div style={{ fontSize: '0.9em', color: template.secondaryColor }}>
                  Link: {project.link}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{
            color: template.secondaryColor,
            borderBottom: `2px solid ${template.secondaryColor}`,
            paddingBottom: '5px',
            fontSize: '18px',
            fontWeight: 'bold',
          }}>
            CERTIFICATIONS
          </h2>
          {certifications.map((cert, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <div style={{ fontWeight: 'bold' }}>{cert.name || 'Certification Name'}</div>
              <div style={{ fontStyle: 'italic' }}>{cert.issuingOrg || 'Organization'} • {cert.issueDate || 'Date'}</div>
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{
            color: template.secondaryColor,
            borderBottom: `2px solid ${template.secondaryColor}`,
            paddingBottom: '5px',
            fontSize: '18px',
            fontWeight: 'bold',
          }}>
            LANGUAGES
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {languages.map((lang, index) => (
              <span
                key={index}
                style={{
                  background: template.secondaryColor,
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '15px',
                  fontSize: '0.9em',
                }}
              >
                {lang.name || 'Language'} ({lang.proficiency || 'Level'})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Interests */}
      {formData.interests && (
        <div>
          <h2 style={{
            color: template.secondaryColor,
            borderBottom: `2px solid ${template.secondaryColor}`,
            paddingBottom: '5px',
            fontSize: '18px',
            fontWeight: 'bold',
          }}>
            INTERESTS
          </h2>
          <p style={{ margin: '10px 0' }}>{formData.interests}</p>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;