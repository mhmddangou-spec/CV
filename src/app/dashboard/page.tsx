"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileText, Plus, LogOut, Trash2, Edit3, Download, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ResumeData, initialResumeData } from "@/types/resume";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [resumes, setResumes] = useState<{ id: string; title: string; updatedAt: string; data: ResumeData }[]>([]);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function checkAuth() {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        router.push("/login?redirect=/dashboard");
        return;
      }
      setUser(user);

      // Load saved resumes from localStorage or Supabase
      try {
        const stored = localStorage.getItem("saved_resumes");
        if (stored) {
          setResumes(JSON.parse(stored));
        } else {
          const defaultResume = {
            id: "1",
            title: "CV Principal — Product Manager",
            updatedAt: new Date().toLocaleDateString(),
            data: initialResumeData
          };
          setResumes([defaultResume]);
          localStorage.setItem("saved_resumes", JSON.stringify([defaultResume]));
        }
      } catch (e) {
        console.error(e);
      }
    }
    checkAuth();
  }, [router, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleDelete = (id: string) => {
    const updated = resumes.filter(r => r.id !== id);
    setResumes(updated);
    localStorage.setItem("saved_resumes", JSON.stringify(updated));
  };

  const handleCreateNew = () => {
    const newId = Date.now().toString();
    const newResume = {
      id: newId,
      title: "Nouveau CV",
      updatedAt: new Date().toLocaleDateString(),
      data: initialResumeData
    };
    const updated = [newResume, ...resumes];
    setResumes(updated);
    localStorage.setItem("saved_resumes", JSON.stringify(updated));
    router.push(`/builder?id=${newId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-black text-lg text-slate-900">Tableau de bord</h1>
            <p className="text-xs text-slate-500">{user?.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-red-600 transition-colors px-3 py-2 rounded-xl hover:bg-slate-100"
          >
            <LogOut className="w-4 h-4" /> Déconnexion
          </button>
        </div>
      </header>

      <main className="flex-grow max-w-6xl w-full mx-auto p-6 md:p-10 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">Mes CV enregistrés</h2>
            <p className="text-slate-600 text-sm">Gérez, modifiez et téléchargez vos CV à tout moment.</p>
          </div>
          <button
            onClick={handleCreateNew}
            className="bg-blue-600 text-white px-6 py-3.5 rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> Créer un nouveau CV
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div key={resume.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    📄
                  </div>
                  <span className="text-xs font-semibold text-slate-400">Modifié le {resume.updatedAt}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{resume.title}</h3>
                <p className="text-slate-500 text-xs mb-6">{resume.data.personalInfo.jobTitle || "Poste non défini"}</p>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                <Link
                  href={`/builder?id=${resume.id}`}
                  className="flex-1 bg-slate-100 text-slate-800 text-center py-2.5 rounded-xl font-bold text-xs hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Éditer
                </Link>
                <button
                  onClick={() => handleDelete(resume.id)}
                  className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
