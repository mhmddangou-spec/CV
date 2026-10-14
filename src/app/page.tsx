"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, FileText, CheckCircle2, Sparkles, Globe, Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { language, setLanguage, t, dir } = useLanguage();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const langNames = {
    fr: "🇫🇷 Français",
    en: "🇬🇧 English",
    ar: "🇸🇦 العربية"
  };

  return (
    <div dir={dir} className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* 2. HEADER */}
      <header className="flex items-center justify-between py-4 px-6 md:px-12 bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center shadow-md shadow-blue-500/25 text-white font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <span className="font-black text-xl tracking-tight text-slate-900">PS CV Studio</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <Link href="#home" className="hover:text-blue-600 transition-colors">{t("nav.home")}</Link>
          <Link href="#templates" className="hover:text-blue-600 transition-colors">{t("nav.templates")}</Link>
          <Link href="#features" className="hover:text-blue-600 transition-colors">{t("nav.features")}</Link>
          <Link href="#pricing" className="hover:text-blue-600 transition-colors">{t("nav.pricing")}</Link>
          <Link href="#about" className="hover:text-blue-600 transition-colors">{t("nav.about")}</Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200"
            >
              <Globe className="w-4 h-4 text-blue-600" />
              <span>{langNames[language]}</span>
              <span className="text-[10px]">▾</span>
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-2xl shadow-xl border border-slate-200 p-1.5 z-50 space-y-1">
                {(["fr", "en", "ar"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { setLanguage(lang); setShowLangMenu(false); }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs md:text-sm font-semibold transition-colors ${language === lang ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-700'}`}
                  >
                    {langNames[lang]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link href="/login" className="hidden lg:inline-flex text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors px-4 py-2">
            {t("nav.login")}
          </Link>
          <Link href="/signup" className="text-sm font-bold bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-500/25">
            {t("nav.createResume")}
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3 shadow-lg sticky top-[73px] z-40 animate-fade">
          <Link href="#home" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-base font-semibold text-slate-700 hover:text-blue-600">{t("nav.home")}</Link>
          <Link href="#templates" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-base font-semibold text-slate-700 hover:text-blue-600">{t("nav.templates")}</Link>
          <Link href="#features" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-base font-semibold text-slate-700 hover:text-blue-600">{t("nav.features")}</Link>
          <Link href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-base font-semibold text-slate-700 hover:text-blue-600">{t("nav.pricing")}</Link>
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full block text-center bg-slate-100 text-slate-800 py-3 rounded-xl font-bold">
              {t("nav.login")}
            </Link>
            <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="w-full block text-center bg-blue-600 text-white py-3 rounded-xl font-bold shadow-md shadow-blue-500/20">
              {t("nav.createResume")}
            </Link>
          </div>
        </div>
      )}

      <main className="flex-grow">
        {/* 3. HERO SECTION */}
        <section id="home" className="relative py-20 md:py-32 overflow-hidden px-6 bg-gradient-to-b from-white via-slate-50 to-blue-50/30 border-b border-slate-200">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

            <div className="text-center md:text-left flex flex-col items-center md:items-start space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-xs md:text-sm font-bold border border-blue-100 shadow-xs animate-bounce">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>{t("hero.badge")}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                {t("hero.title")}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                {t("hero.subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-4">
                <Link href="/signup" className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-base hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-600/25 group">
                  {t("hero.ctaCreate")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="#templates" className="w-full sm:w-auto bg-white text-slate-700 border border-slate-300 px-8 py-4 rounded-2xl font-bold text-base hover:bg-slate-50 transition-all text-center shadow-xs">
                  {t("hero.ctaHowItWorks")}
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8 w-full border-t border-slate-200/80 text-left">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">✓</div>
                  <span className="text-xs font-bold text-slate-700">{t("hero.feature1")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">⚡</div>
                  <span className="text-xs font-bold text-slate-700">{t("hero.feature2")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">✨</div>
                  <span className="text-xs font-bold text-slate-700">{t("hero.feature3")}</span>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center items-center py-10">
              <div className="absolute top-0 left-2 md:-left-6 z-20 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">🎯</div>
                <div>
                  <div className="text-xs font-black text-slate-900">Optimisé ATS</div>
                  <div className="text-[10px] text-emerald-600 font-bold">Score 98%</div>
                </div>
              </div>

              <div className="absolute bottom-4 right-2 md:-right-6 z-20 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">🤖</div>
                <div>
                  <div className="text-xs font-black text-slate-900">IA Assistant</div>
                  <div className="text-[10px] text-blue-600 font-bold">Rédaction auto</div>
                </div>
              </div>

              <div className="relative w-full max-w-md bg-gradient-to-tr from-slate-900 to-blue-950 rounded-3xl shadow-2xl p-6 text-white border border-slate-800">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  </div>
                  <span className="text-xs font-bold text-slate-400">PS CV Studio Preview</span>
                </div>

                <div className="bg-white text-slate-900 rounded-2xl p-5 shadow-xl space-y-4">
                  <div className="flex items-center gap-3 border-b pb-3">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow">AD</div>
                    <div>
                      <div className="font-extrabold text-sm text-slate-900">Aminata Diallo</div>
                      <div className="text-xs text-blue-600 font-bold">Senior Product Manager</div>
                    </div>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="font-bold text-slate-800 block mb-0.5">Expérience clé :</span>
                      <p className="text-slate-600">Lead PM @ FinTech Africa • Pilotage stratégique (+35% conversion).</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      Prêt pour recrutement 🚀
                    </span>
                    <span className="text-xs font-bold text-blue-600">Format A4</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 4. HOW IT WORKS SECTION */}
        <section id="how-it-works" className="py-24 bg-white px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">{t("howItWorks.subtitle")}</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 mb-4">{t("howItWorks.title")}</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">{t("howItWorks.desc")}</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "01", title: t("howItWorks.step1Title"), desc: t("howItWorks.step1Desc") },
                { step: "02", title: t("howItWorks.step2Title"), desc: t("howItWorks.step2Desc") },
                { step: "03", title: t("howItWorks.step3Title"), desc: t("howItWorks.step3Desc") },
                { step: "04", title: t("howItWorks.step4Title"), desc: t("howItWorks.step4Desc") },
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-50 p-8 rounded-3xl border border-slate-200/80 relative hover:shadow-xl transition-all group hover:-translate-y-1">
                  <span className="text-5xl font-black text-blue-600/10 absolute top-6 right-6">{item.step}</span>
                  <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-blue-500/25">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. TEMPLATES GALLERY */}
        <section id="templates" className="py-24 bg-slate-100 px-6 border-y border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">{t("templates.badge")}</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 mb-4">{t("templates.title")}</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">{t("templates.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { key: "modern", name: t("templates.modern"), desc: t("templates.modernDesc"), tag: "Populaire", color: "bg-blue-600" },
                { key: "classic", name: t("templates.classic"), desc: t("templates.classicDesc"), tag: "Formel", color: "bg-slate-900" },
                { key: "minimalist", name: t("templates.minimalist"), desc: t("templates.minimalistDesc"), tag: "Épuré", color: "bg-indigo-600" },
                { key: "creative", name: t("templates.creative"), desc: t("templates.creativeDesc"), tag: "Original", color: "bg-amber-600" },
                { key: "ats", name: t("templates.ats"), desc: t("templates.atsDesc"), tag: "Optimisé", color: "bg-black" },
                { key: "premium", name: t("templates.premium"), desc: t("templates.premiumDesc"), tag: "Luxe", color: "bg-purple-900" },
              ].map((tpl) => (
                <div key={tpl.key} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1">
                  <div className="bg-slate-200 h-64 p-4 relative flex items-center justify-center border-b border-slate-200">
                    <span className="absolute top-4 right-4 z-10 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      {tpl.tag}
                    </span>
                    <div className="w-40 h-52 bg-white shadow-xl rounded-lg border border-slate-300 p-3 transform group-hover:scale-105 transition-transform duration-300 flex flex-col">
                      <div className={`w-full h-8 ${tpl.color} rounded mb-2 p-1 text-white text-[6px] font-bold`}>
                        Aminata Diallo
                      </div>
                      <div className="space-y-1 text-[5px] text-slate-600">
                        <div className="font-bold text-slate-800">PROFIL</div>
                        <div>Manager produit senior...</div>
                        <div className="font-bold text-slate-800 mt-2">EXPÉRIENCE</div>
                        <div>Lead PM @ Fintech Africa</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow justify-between text-left">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{tpl.name}</h3>
                      <p className="text-slate-600 text-sm mb-6">{tpl.desc}</p>
                    </div>
                    <Link href={`/builder?template=${tpl.key}`} className="w-full bg-slate-900 text-white text-center py-3.5 rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-sm text-sm">
                      {t("templates.useTemplate")}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. FEATURES SECTION */}
        <section id="features" className="py-24 bg-white px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">{t("advantages.badge")}</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 mb-4">{t("advantages.title")}</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">{t("advantages.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-left">
              {[
                { title: t("advantages.fast"), desc: t("advantages.fastDesc") },
                { title: t("advantages.ai"), desc: t("advantages.aiDesc") },
                { title: t("advantages.pro"), desc: t("advantages.proDesc") },
                { title: t("advantages.pdf"), desc: t("advantages.pdfDesc") },
                { title: t("advantages.save"), desc: t("advantages.saveDesc") },
              ].map((adv, idx) => (
                <div key={idx} className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-all flex items-start gap-4 shadow-xs">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-bold shrink-0 mt-1">✓</div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{adv.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{adv.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. PRICING SECTION */}
        <section id="pricing" className="py-24 bg-slate-100 px-6 border-t border-slate-200">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">{t("pricing.badge")}</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 mb-4">{t("pricing.title")}</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">{t("pricing.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: t("pricing.free"), price: t("pricing.freePrice"), period: t("pricing.monthly"), features: ["Création de CV", "Modèles standard", "Export PDF"], popular: false },
                { name: t("pricing.pro"), price: t("pricing.proPrice"), period: t("pricing.monthly"), features: ["Tous les modèles", "Optimisation IA", "Export PDF HD", "Support prioritaire"], popular: true },
                { name: t("pricing.premium"), price: t("pricing.premiumPrice"), period: t("pricing.monthly"), features: ["Fonctionnalités Pro", "Assistance VIP", "Stockage illimité"], popular: false },
              ].map((plan, idx) => (
                <div key={idx} className={`bg-white rounded-3xl p-8 border ${plan.popular ? 'border-blue-600 shadow-2xl relative ring-2 ring-blue-600/20' : 'border-slate-200 shadow-sm'} flex flex-col justify-between text-left`}>
                  {plan.popular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md">
                      {t("pricing.popular")}
                    </span>
                  )}
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                      <span className="text-slate-500 text-sm">{plan.period}</span>
                    </div>
                    <ul className="space-y-3 mb-8 text-sm text-slate-700">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link href="/signup" className={`w-full py-3.5 rounded-xl font-bold text-center transition-colors ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}>
                    {t("pricing.getStarted")}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="about" className="bg-slate-900 text-slate-400 py-16 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mb-12 text-left">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="text-white w-6 h-6" />
              <span className="font-bold text-xl text-white">PS CV Studio</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">{t("footer.desc")}</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">{t("footer.navigation")}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#home" className="hover:text-white">{t("nav.home")}</Link></li>
              <li><Link href="#templates" className="hover:text-white">{t("nav.templates")}</Link></li>
              <li><Link href="#features" className="hover:text-white">{t("nav.features")}</Link></li>
              <li><Link href="#pricing" className="hover:text-white">{t("nav.pricing")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">{t("footer.legal")}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">{t("footer.privacy")}</a></li>
              <li><a href="#" className="hover:text-white">{t("footer.terms")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">{t("footer.contact")}</h4>
            <p className="text-sm text-slate-400">support@pscvstudio.com</p>
            <p className="text-sm text-slate-400 mt-2">Dakar, Sénégal & International</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-8 border-t border-slate-800 text-center text-sm">
          © {new Date().getFullYear()} PS CV Studio. {t("footer.rights")}
        </div>
      </footer>
    </div>
  );
}
