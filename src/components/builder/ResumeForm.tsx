import React, { useState } from 'react';
import { ResumeData, Experience, Education, Skill, LanguageItem } from '@/types/resume';
import { ChevronRight, ChevronLeft, Sparkles, Plus, Trash2, CheckCircle2 } from 'lucide-react';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export default function ResumeForm({ data, onChange }: ResumeFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const handlePersonalInfoChange = (field: keyof ResumeData['personalInfo'], value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value
      }
    });
  };

  const handleAddExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      jobTitle: "",
      company: "",
      city: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    };
    onChange({ ...data, experiences: [...data.experiences, newExp] });
  };

  const handleUpdateExperience = (id: string, field: keyof Experience, value: any) => {
    const updated = data.experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp);
    onChange({ ...data, experiences: updated });
  };

  const handleDeleteExperience = (id: string) => {
    const updated = data.experiences.filter(exp => exp.id !== id);
    onChange({ ...data, experiences: updated });
  };

  const stepTitles = [
    "1. Infos personnelles",
    "2. Expériences",
    "3. Formations",
    "4. Compétences & Langues",
    "5. Modèle & Design"
  ];

  return (
    <div className="w-full md:w-[480px] lg:w-[520px] flex flex-col bg-white border-r border-slate-200 shrink-0 overflow-y-auto z-10 shadow-xl">
      <div className="p-6 border-b border-slate-100 bg-slate-50">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Assistant de création • Étape {currentStep} sur {totalSteps}
          </span>
          <span className="text-xs font-semibold text-slate-500">
            {Math.round((currentStep / totalSteps) * 100)}% complété
          </span>
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
        <h2 className="text-xl font-black text-slate-900 mt-4">{stepTitles[currentStep - 1]}</h2>
      </div>

      <div className="p-6 flex-grow overflow-y-auto space-y-6">
        {currentStep === 1 && (
          <div className="space-y-4 animate-fade">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Prénom</label>
                <input
                  type="text"
                  value={data.personalInfo.firstName}
                  onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 text-sm"
                  placeholder="Aminata"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Nom</label>
                <input
                  type="text"
                  value={data.personalInfo.lastName}
                  onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 text-sm"
                  placeholder="Diallo"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Titre professionnel</label>
              <input
                type="text"
                value={data.personalInfo.jobTitle}
                onChange={(e) => handlePersonalInfoChange('jobTitle', e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 text-sm"
                placeholder="Product Manager"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  value={data.personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm"
                  placeholder="email@domain.com"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Téléphone</label>
                <input
                  type="tel"
                  value={data.personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm"
                  placeholder="+225..."
                />
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-sm font-medium text-slate-700">Résumé professionnel</label>
              <textarea
                rows={4}
                value={data.personalInfo.summary}
                onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm resize-none"
                placeholder="Présentez votre parcours..."
              ></textarea>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6 animate-fade">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">Ajoutez vos expériences professionnelles.</p>
              <button
                onClick={handleAddExperience}
                className="bg-blue-600 text-white px-3 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center gap-1 shadow-sm"
              >
                <Plus className="w-4 h-4" /> Ajouter
              </button>
            </div>

            {data.experiences.map((exp, index) => (
              <div key={exp.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">Expérience #{index + 1}</span>
                  <button onClick={() => handleDeleteExperience(exp.id)} className="text-red-500 hover:text-red-700 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={exp.jobTitle}
                  onChange={(e) => handleUpdateExperience(exp.id, 'jobTitle', e.target.value)}
                  placeholder="Intitulé du poste"
                  className="w-full px-3 py-2 border rounded-xl text-sm"
                />
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleUpdateExperience(exp.id, 'company', e.target.value)}
                  placeholder="Entreprise"
                  className="w-full px-3 py-2 border rounded-xl text-sm"
                />
                <textarea
                  rows={3}
                  value={exp.description}
                  onChange={(e) => handleUpdateExperience(exp.id, 'description', e.target.value)}
                  placeholder="Missions et réalisations..."
                  className="w-full px-3 py-2 border rounded-xl text-sm resize-none"
                ></textarea>
              </div>
            ))}
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-6 animate-fade">
            <h3 className="text-sm font-bold text-slate-800 mb-2">Choisir le modèle de CV</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'modern', name: 'Modèle Moderne' },
                { id: 'classic', name: 'Modèle Classique' },
                { id: 'minimalist', name: 'Minimaliste' },
                { id: 'creative', name: 'Créatif' },
                { id: 'ats', name: 'Modèle ATS' },
                { id: 'premium', name: 'Modèle Premium' },
              ].map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => onChange({ ...data, template: tpl.id as any })}
                  className={`p-4 rounded-xl border-2 text-left font-bold text-sm transition-all ${data.template === tpl.id ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-sm' : 'border-slate-200 text-slate-700 hover:border-slate-300'}`}
                >
                  {tpl.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-slate-200 bg-white flex items-center justify-between">
        <button
          onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
          disabled={currentStep === 1}
          className="px-5 py-2.5 rounded-xl border border-slate-300 font-bold text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-40 flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" /> Précédent
        </button>

        {currentStep < totalSteps ? (
          <button
            onClick={() => setCurrentStep(prev => Math.min(totalSteps, prev + 1))}
            className="px-6 py-2.5 rounded-xl bg-blue-600 font-bold text-sm text-white hover:bg-blue-700 shadow-md flex items-center gap-1"
          >
            Continuer <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 px-4 py-2 rounded-xl">
            <CheckCircle2 className="w-4 h-4" /> Prêt pour export PDF
          </div>
        )}
      </div>
    </div>
  );
}
