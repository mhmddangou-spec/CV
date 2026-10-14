import React from 'react';
import { ResumeData } from '@/types/resume';

interface ResumePreviewProps {
  data: ResumeData;
  previewRef?: any;
  language?: 'fr' | 'en' | 'ar';
}

const sectionTitles = {
  fr: { profile: "Profil Professionnel", experience: "Expériences Professionnelles", education: "Formations & Diplômes", skills: "Compétences", languages: "Langues" },
  en: { profile: "Professional Profile", experience: "Work Experience", education: "Education & Degrees", skills: "Skills", languages: "Languages" },
  ar: { profile: "الملف المهني", experience: "الخبرة المهنية", education: "التعليم والشهادات", skills: "المهارات", languages: "اللغات" }
};

export default function ResumePreview({ data, previewRef, language = 'fr' }: ResumePreviewProps) {
  const { personalInfo, experiences, educations, skills, languages, template = 'modern' } = data;
  const primaryColor = data.theme?.color || '#2563eb';
  const t = sectionTitles[language] || sectionTitles.fr;
  const isRtl = language === 'ar';

  const renderA4Wrapper = (children: React.ReactNode) => (
    <div className="hidden md:flex flex-1 bg-slate-200 p-8 overflow-y-auto justify-center items-start">
      <div
        ref={previewRef}
        dir={isRtl ? 'rtl' : 'ltr'}
        style={{ width: '210mm', minHeight: '297mm', backgroundColor: '#ffffff', color: '#0f172a', fontFamily: 'Inter, sans-serif', direction: isRtl ? 'rtl' : 'ltr' }}
        className="shadow-2xl flex flex-col scale-[0.85] origin-top transform-gpu transition-transform lg:scale-100 print:scale-100 print:shadow-none"
      >
        {children}
      </div>
    </div>
  );

  // --- 1. MODÈLE MODERNE ---
  if (template === 'modern') {
    return renderA4Wrapper(
      <>
        <div style={{ backgroundColor: primaryColor, color: '#ffffff', padding: '48px', textAlign: isRtl ? 'right' : 'left' }}>
          <h1 style={{ fontSize: '38px', fontWeight: 800, marginBottom: '6px' }}>
            {personalInfo.firstName || 'Prénom'} {personalInfo.lastName || 'Nom'}
          </h1>
          <h2 style={{ fontSize: '20px', fontWeight: 400, opacity: 0.95, marginBottom: '16px' }}>
            {personalInfo.jobTitle || 'Titre professionnel'}
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '13px', opacity: 0.9 }}>
            {personalInfo.email && <span>✉ {personalInfo.email}</span>}
            {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
            {personalInfo.city && <span>📍 {personalInfo.city}{personalInfo.country ? `, ${personalInfo.country}` : ''}</span>}
          </div>
        </div>
        <div style={{ padding: '48px', flex: 1, display: 'flex', flexDirection: 'column', textAlign: isRtl ? 'right' : 'left' }}>
          {personalInfo.summary && (
            <div style={{ marginBottom: '28px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '8px', color: primaryColor, borderBottom: `2px solid ${primaryColor}`, paddingBottom: '4px' }}>{t.profile}</h3>
              <p style={{ color: '#334155', fontSize: '14px', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{personalInfo.summary}</p>
            </div>
          )}
          {experiences.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '16px', color: primaryColor, borderBottom: `2px solid ${primaryColor}`, paddingBottom: '4px' }}>{t.experience}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {experiences.map((exp) => (
                  <div key={exp.id} style={{ borderLeft: isRtl ? 'none' : `3px solid ${primaryColor}`, borderRight: isRtl ? `3px solid ${primaryColor}` : 'none', paddingLeft: isRtl ? '0' : '16px', paddingRight: isRtl ? '16px' : '0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                      <h4 style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '16px' }}>{exp.jobTitle}</h4>
                      <span style={{ fontSize: '12px', fontWeight: 600, padding: '2px 8px', borderRadius: '4px', backgroundColor: '#f1f5f9', color: primaryColor }}>{exp.startDate} - {exp.current ? 'Présent' : exp.endDate}</span>
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: '#475569', marginBottom: '8px' }}>{exp.company} {exp.city && `• ${exp.city}`}</div>
                    <p style={{ fontSize: '14px', color: '#334155', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  // --- 2. MODÈLE CLASSIQUE ---
  if (template === 'classic') {
    return renderA4Wrapper(
      <div style={{ padding: '56px', flex: 1, display: 'flex', flexDirection: 'column', textAlign: isRtl ? 'right' : 'left' }}>
        <div style={{ textAlign: 'center', borderBottom: '3px double #0f172a', paddingBottom: '24px', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '38px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', color: '#0f172a' }}>
            {personalInfo.firstName || 'Prénom'} {personalInfo.lastName || 'Nom'}
          </h1>
          <h2 style={{ fontSize: '18px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px', color: '#334155' }}>
            {personalInfo.jobTitle || 'Titre professionnel'}
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '13px', color: '#64748b' }}>
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.city && <span>{personalInfo.city}</span>}
          </div>
        </div>
        {personalInfo.summary && (
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #0f172a', paddingBottom: '4px', marginBottom: '12px', color: '#0f172a' }}>{t.profile}</h3>
            <p style={{ color: '#334155', fontSize: '14px', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{personalInfo.summary}</p>
          </div>
        )}
      </div>
    );
  }

  // --- 3. MODÈLE MINIMALISTE ---
  if (template === 'minimalist') {
    return renderA4Wrapper(
      <div style={{ padding: '60px', flex: 1, display: 'flex', flexDirection: 'column', textAlign: isRtl ? 'right' : 'left' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '40px', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px', color: '#0f172a' }}>
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <h2 style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#64748b', marginBottom: '16px' }}>
            {personalInfo.jobTitle}
          </h2>
        </div>
      </div>
    );
  }

  // --- 4. CRÉATIF, ATS, PREMIUM ---
  return renderA4Wrapper(
    <div style={{ padding: '56px', flex: 1, display: 'flex', flexDirection: 'column', textAlign: isRtl ? 'right' : 'left' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: primaryColor, marginBottom: '8px' }}>
        {personalInfo.firstName} {personalInfo.lastName}
      </h1>
      <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#334155', marginBottom: '20px' }}>{personalInfo.jobTitle}</h2>
      <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>{personalInfo.summary}</p>
    </div>
  );
}
