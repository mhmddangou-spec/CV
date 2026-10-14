"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { FileText, Lock, Mail, User, ArrowRight, AlertCircle, Loader2, CheckCircle2, XCircle } from "lucide-react";

function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const hasLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[@#$%^&*!_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const isPasswordValid = hasLength && hasUppercase && hasLowercase && hasNumber && hasSpecial;

  const isValidEmail = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError("Veuillez saisir votre nom complet.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Veuillez saisir une adresse e-mail valide.");
      return;
    }
    if (!isPasswordValid) {
      setError("Le mot de passe ne respecte pas tous les critères de sécurité.");
      return;
    }

    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { full_name: fullName.trim() }
      }
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const redirect = searchParams.get("redirect") || "/dashboard";
    router.push(redirect);
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/" className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-white shadow-lg">
            <FileText className="w-6 h-6" />
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-black text-slate-900 tracking-tight">
          Créer un compte PS CV Studio
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Déjà un compte ? <Link href="/login" className="font-bold text-blue-600 hover:text-blue-500">Se connecter</Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl rounded-3xl border border-slate-200">
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-700 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Nom complet</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm"
                  placeholder="Aminata Diallo"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Adresse e-mail</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm"
                  placeholder="nom@exemple.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Mot de passe</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
              <div className="font-bold text-slate-800 mb-1">Critères de sécurité :</div>
              <div className={`flex items-center gap-2 ${hasLength ? 'text-emerald-600 font-bold' : 'text-slate-500'}`}>
                {hasLength ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />} Au moins 8 caractères
              </div>
              <div className={`flex items-center gap-2 ${hasUppercase ? 'text-emerald-600 font-bold' : 'text-slate-500'}`}>
                {hasUppercase ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />} Une lettre majuscule (A-Z)
              </div>
              <div className={`flex items-center gap-2 ${hasLowercase ? 'text-emerald-600 font-bold' : 'text-slate-500'}`}>
                {hasLowercase ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />} Une lettre minuscule (a-z)
              </div>
              <div className={`flex items-center gap-2 ${hasNumber ? 'text-emerald-600 font-bold' : 'text-slate-500'}`}>
                {hasNumber ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />} Un chiffre (0-9)
              </div>
              <div className={`flex items-center gap-2 ${hasSpecial ? 'text-emerald-600 font-bold' : 'text-slate-500'}`}>
                {hasSpecial ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />} Un caractère spécial (@, #, !, ...)
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !isPasswordValid}
              className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>S'inscrire gratuitement <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function Signup() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <SignupForm />
    </Suspense>
  );
}
