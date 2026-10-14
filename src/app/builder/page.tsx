"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, CheckCircle2, LayoutTemplate, Loader2 } from "lucide-react";

import ResumeForm from "@/components/builder/ResumeForm";
import ResumePreview from "@/components/builder/ResumePreview";
import { initialResumeData, ResumeData } from "@/types/resume";
import { createClient } from "@/lib/supabase/client";

export default function Builder() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function verifyAuth() {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        const currentPath = window.location.pathname + window.location.search;
        router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
        return;
      }
    }
    verifyAuth();

    try {
      const params = new URLSearchParams(window.location.search);
      const templateParam = params.get("template") as 'classic' | 'modern' | 'minimalist' | 'creative' | 'ats' | 'premium' | null;
      if (templateParam) {
        setResumeData(prev => ({ ...prev, template: templateParam }));
      }
    } catch (e) {
      console.error(e);
    }
  }, [router, supabase]);

  const handleExportPdf = async () => {
    if (!previewRef.current) return;
    setIsExporting(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = previewRef.current;
      const opt = {
        margin: 0,
        filename: `${resumeData.personalInfo.firstName || 'CV'}_${resumeData.personalInfo.lastName || 'Resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      await html2pdf().from(element).set(opt).save();
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-100 overflow-hidden">
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shrink-0 shadow-xs z-20">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="font-black text-slate-900 text-base">PS CV Studio — Éditeur de CV</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportPdf}
            disabled={isExporting}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-md shadow-blue-500/25 flex items-center gap-2 disabled:opacity-50"
          >
            {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            Télécharger PDF
          </button>
        </div>
      </header>

      <div className="flex flex-grow overflow-hidden">
        <ResumeForm data={resumeData} onChange={setResumeData} />
        <ResumePreview data={resumeData} previewRef={previewRef} />
      </div>
    </div>
  );
}
