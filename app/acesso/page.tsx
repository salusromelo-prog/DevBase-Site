'use client'

import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import {
  Terminal, Lock, LayoutDashboard, CreditCard, Mail, Database,
  FileText, MapPin, Phone, Building2, QrCode, Tag, List, Download, Package,
} from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Produto = 'boilerplate' | 'components' | 'combo'
interface Bloco { titulo: string; codigo: string }
interface StepData {
  blocos: Bloco[]
  instrucoes?: string
  nota?: string
  downloadHref?: string
  downloadLabel?: string
}
interface Modulo {
  id: string
  titulo: string
  descricao: string
  grupo: 'boilerplate' | 'components'
  steps: string[]
  checklist: string[]
  stepData: StepData[]
  dicas?: string[]
  dependencia?: string
}

// ── Code content ─────────────────────────────────────────────────────────────

const C = {
  envVars: `# Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_projeto
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key

# Supabase Server (nunca exponha no cliente)
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key

# Resend (email transacional)
RESEND_API_KEY=re_sua_api_key
RESEND_FROM_EMAIL=noreply@seudominio.com.br

# App
NEXT_PUBLIC_APP_NAME=MeuSaaS
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Pagar.me
PAGARME_API_KEY=sk_test_sua_chave

# GitHub (para webhooks Kiwify)
GITHUB_TOKEN=ghp_seu_token`,

  authTree: `src/app/auth/
├── login/page.tsx         → formulário de login
├── cadastro/page.tsx      → formulário de cadastro
├── cadastro/CadastroForm.tsx
├── callback/route.ts      → troca code por sessão (não editar)
├── reset-senha/page.tsx   → esqueci a senha
└── nova-senha/page.tsx    → redefinir senha`,

  authClient: `import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}`,

  authServer: `import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Cliente para uso no servidor (Server Components, Server Actions, Route Handlers)
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignorado em Server Components
          }
        },
      },
    }
  );
}`,

  dashboardTree: `src/app/dashboard/
├── layout.tsx             → verifica auth, monta sidebar + header
├── page.tsx               → página principal com métricas
├── admin/page.tsx         → painel admin
├── planos/page.tsx        → upgrade de plano
├── equipe/page.tsx        → gestão de equipe
└── configuracoes/page.tsx → configurações do usuário`,

  dashboardLayout: `import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg)" }}>
      <DashboardSidebar user={user} profile={profile} />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader user={user} profile={profile} />
        <main className="flex-1 p-6 md:p-8 overflow-auto" style={{ background: "var(--bg)" }}>
          {children}
        </main>
      </div>
    </div>
  );
}`,

  dashboardPage: `import { createClient } from "@/lib/supabase/server";
import { ArrowRight, Terminal, Code2, CreditCard, Users, Zap } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles").select("*").eq("id", user!.id).single();

  const nome = profile?.full_name || user?.email?.split("@")[0] || "dev";
  const plano = profile?.plan || "free";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <p className="text-xs mb-1" style={{ color: "var(--text-3)", fontFamily: "monospace" }}>
          // bem-vindo de volta
        </p>
        <h1 className="font-bold mb-1" style={{ fontSize: "1.75rem", letterSpacing: "-0.03em" }}>
          olá, <span style={{ color: "var(--accent-2)" }}>{nome}</span>
        </h1>
        <p className="text-sm" style={{ color: "var(--text-2)" }}>
          seu ambiente está pronto. o que vamos construir hoje?
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { icon: Zap, label: "projetos", value: "1" },
          { icon: Users, label: "membros", value: "1" },
          { icon: CreditCard, label: "plano", value: plano },
          { icon: Code2, label: "setup", value: "100%" },
        ].map((m, i) => (
          <div key={i} className="p-4 rounded-xl"
            style={{ background: "var(--bg-2)", border: "1px solid var(--border)" }}>
            <m.icon className="w-4 h-4 mb-3" style={{ color: "var(--text-3)" }} />
            <p className="font-bold text-lg" style={{ fontFamily: "monospace" }}>{m.value}</p>
            <p className="text-xs" style={{ color: "var(--text-3)", fontFamily: "monospace" }}>{m.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
        <div className="px-5 py-3 flex items-center gap-2"
          style={{ background: "var(--bg-2)", borderBottom: "1px solid var(--border)" }}>
          <Terminal className="w-3.5 h-3.5" style={{ color: "var(--accent-2)" }} />
          <span className="text-xs font-medium"
            style={{ fontFamily: "monospace", color: "var(--text-2)" }}>
            próximos passos
          </span>
        </div>
        <div style={{ background: "var(--bg-3)" }}>
          {PROXIMOS_PASSOS.map((passo, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-3 group"
              style={{ borderBottom: i < PROXIMOS_PASSOS.length - 1 ? "1px solid var(--border)" : "none" }}>
              <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                style={{
                  background: passo.feito ? "var(--green-bg)" : "var(--bg-4)",
                  color: passo.feito ? "var(--green)" : "var(--text-3)",
                  border: \`1px solid \${passo.feito ? "rgba(34,197,94,0.3)" : "var(--border)"}\`,
                  fontFamily: "monospace", fontSize: "12px", fontWeight: "700",
                }}>
                {passo.feito ? "✓" : i + 1}
              </div>
              <div className="flex-1">
                <p className="text-sm" style={{ fontFamily: "monospace",
                  color: passo.feito ? "var(--text-3)" : "var(--text)",
                  textDecoration: passo.feito ? "line-through" : "none" }}>
                  {passo.titulo}
                </p>
                <p className="text-xs" style={{ color: "var(--text-3)" }}>{passo.desc}</p>
              </div>
              {!passo.feito && passo.href && (
                <Link href={passo.href}
                  className="text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "var(--accent-2)", fontFamily: "monospace" }}>
                  fazer →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const PROXIMOS_PASSOS = [
  { titulo: "criar conta no supabase", desc: "banco de dados e auth", feito: true, href: null },
  { titulo: "configurar variáveis de ambiente", desc: "preencher o .env.local", feito: true, href: null },
  { titulo: "conectar o pagar.me", desc: "adicionar api key", feito: false, href: "/dashboard/configuracoes" },
  { titulo: "configurar domínio", desc: "apontar para a vercel", feito: false, href: "/dashboard/configuracoes" },
  { titulo: "personalizar o produto", desc: "trocar nome, cores e textos", feito: false, href: "/dashboard/configuracoes" },
  { titulo: "fazer o primeiro deploy", desc: "subir para produção", feito: false, href: "https://vercel.com" },
];`,

  middleware: `import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/dashboard"];
  const authRoutes = ["/auth/login", "/auth/cadastro", "/auth/reset-senha"];

  const isProtected = protectedRoutes.some((r) => pathname.startsWith(r));
  const isAuthRoute = authRoutes.some((r) => pathname.startsWith(r));

  if (isProtected && !user) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};`,

  kiwify: [
    'import { NextResponse } from "next/server";',
    '',
    'const GITHUB_REPO = "seu-usuario/saas-kit-br";',
    '',
    'async function addGitHubCollaborator(email: string) {',
    '  const token = process.env.GITHUB_TOKEN;',
    '  if (!token) return { status: "error", error: "GITHUB_TOKEN not configured" };',
    '',
    '  const headers = {',
    '    Authorization: `Bearer ${token}`,',
    '    Accept: "application/vnd.github+json",',
    '    "X-GitHub-Api-Version": "2022-11-28",',
    '    "Content-Type": "application/json",',
    '  };',
    '',
    '  const searchRes = await fetch(',
    '    `https://api.github.com/search/users?q=${encodeURIComponent(email)}+in:email`,',
    '    { headers }',
    '  );',
    '',
    '  const searchData = await searchRes.json();',
    '  if (!searchData.items?.length) return { status: "user_not_found" };',
    '',
    '  const username = searchData.items[0].login as string;',
    '',
    '  const inviteRes = await fetch(',
    '    `https://api.github.com/repos/${GITHUB_REPO}/collaborators/${username}`,',
    '    { method: "PUT", headers, body: JSON.stringify({ permission: "pull" }) }',
    '  );',
    '',
    '  if (inviteRes.status === 201) return { status: "invited", username };',
    '  if (inviteRes.status === 204) return { status: "already_collaborator", username };',
    '  return { status: "error" };',
    '}',
    '',
    'export async function POST(request: Request) {',
    '  const body = await request.json();',
    '',
    '  if (body.order_status !== "paid") {',
    '    return NextResponse.json({ received: true, skipped: true });',
    '  }',
    '',
    '  const email: string | undefined = body.customer?.email;',
    '  if (!email) {',
    '    return NextResponse.json({ error: "Missing customer email" }, { status: 400 });',
    '  }',
    '',
    '  const result = await addGitHubCollaborator(email);',
    '  return NextResponse.json({ received: true, ...result });',
    '}',
  ].join('\n'),

  pagarme: `import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  const body = await request.json();
  const { type, data } = body;

  switch (type) {
    case "order.paid": {
      const { customer, items, id: orderId } = data;
      const userEmail = customer?.email;
      const planId = items?.[0]?.code;

      if (userEmail && planId) {
        const { data: profile } = await supabaseAdmin
          .from("profiles")
          .select("id")
          .eq("email", userEmail)
          .single();

        if (profile) {
          await supabaseAdmin.from("profiles").update({
            plan: planId,
            subscription_status: "active",
            subscription_id: orderId,
          }).eq("id", profile.id);

          await supabaseAdmin.from("payments").insert({
            user_id: profile.id,
            pagarme_order_id: orderId,
            plan: planId,
            amount: data.amount,
            status: "paid",
            payment_method: data.charges?.[0]?.payment_method || "unknown",
          });
        }
      }
      break;
    }
    case "order.canceled":
    case "charge.refunded": {
      const userEmail = data?.customer?.email;
      if (userEmail) {
        await supabaseAdmin.from("profiles")
          .update({ plan: "free", subscription_status: "canceled" })
          .eq("email", userEmail);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}`,

  resend: `export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "noreply@seudominio.com.br";

export const APP_NAME =
  process.env.NEXT_PUBLIC_APP_NAME || "DevBase";

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";`,

  welcome: [
    "import { APP_NAME, APP_URL } from '@/lib/resend';",
    "",
    "interface WelcomeEmailProps {",
    "  nome: string;",
    "  dashboardUrl?: string;",
    "}",
    "",
    "export function emailBoasVindas({ nome, dashboardUrl }: WelcomeEmailProps): string {",
    "  const dashboard = dashboardUrl ?? `${APP_URL}/dashboard`;",
    "  const primeiroNome = nome.split(' ')[0];",
    "",
    "  return `",
    "<!DOCTYPE html>",
    "<html lang='pt-BR'>",
    "<head>",
    "  <meta charset='utf-8' />",
    "  <title>Bem-vindo ao ${APP_NAME}</title>",
    "</head>",
    "<body style='margin:0;padding:0;background:#f4f4f5;font-family:monospace;'>",
    "  <table width='100%' cellpadding='0' cellspacing='0' style='padding:40px 16px;'>",
    "    <tr><td align='center'>",
    "      <table width='600' cellpadding='0' cellspacing='0'>",
    "        <!-- Header -->",
    "        <tr>",
    "          <td style='background:#0a0a0a;border-radius:12px 12px 0 0;padding:28px 32px;text-align:center;'>",
    "            <span style='color:#fff;font-size:20px;font-weight:700;'>",
    "              ${APP_NAME}<span style='color:#6366f1;'>.</span>",
    "            </span>",
    "          </td>",
    "        </tr>",
    "        <!-- Body -->",
    "        <tr>",
    "          <td style='background:#fff;padding:40px 32px;'>",
    "            <h1 style='margin:0 0 24px;font-size:26px;font-weight:700;color:#0a0a0a;'>",
    "              olá, <span style='color:#6366f1;'>${primeiroNome}</span> 👋",
    "            </h1>",
    "            <p style='font-size:14px;color:#374151;line-height:1.7;'>",
    "              Sua conta no ${APP_NAME} foi criada. Acesse o dashboard abaixo.",
    "            </p>",
    "            <a href='${dashboard}'",
    "               style='display:inline-block;padding:13px 28px;background:#6366f1;color:#fff;",
    "                      font-size:14px;font-weight:600;border-radius:8px;text-decoration:none;'>",
    "              acessar o dashboard →",
    "            </a>",
    "          </td>",
    "        </tr>",
    "      </table>",
    "    </td></tr>",
    "  </table>",
    "</body>",
    "</html>`;",
    "}",
  ].join('\n'),

  welcomeRoute: `export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { FROM_EMAIL, APP_NAME, APP_URL } from "@/lib/resend";
import { emailBoasVindas } from "@/emails/welcome";

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { nome, email } = await request.json();

  if (!nome || !email) {
    return NextResponse.json({ error: "nome e email são obrigatórios" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: \`Bem-vindo ao \${APP_NAME} 🚀\`,
    html: emailBoasVindas({ nome, dashboardUrl: \`\${APP_URL}/dashboard\` }),
  });

  if (error) return NextResponse.json({ error: "falha ao enviar email" }, { status: 500 });
  return NextResponse.json({ success: true });
}`,

  schema: `-- Habilitar extensão UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- TABELA: profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'basico', 'pro', 'agencia')),
  subscription_status TEXT DEFAULT 'inactive',
  subscription_id TEXT,
  customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver próprio perfil"
  ON public.profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar próprio perfil"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- FUNÇÃO: criar perfil ao cadastrar
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (NEW.id, NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- TABELA: payments
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  pagarme_order_id TEXT,
  plan TEXT,
  amount INTEGER,
  status TEXT DEFAULT 'pending',
  payment_method TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários veem próprios pagamentos"
  ON public.payments FOR SELECT USING (auth.uid() = user_id);`,

  cpfcnpj: `/*
 * CPFCNPJInput — Input com máscara automática para CPF e CNPJ
 *
 * Detecta automaticamente CPF (≤11 dígitos) ou CNPJ (>11 dígitos) e aplica
 * a máscara correspondente. Valida os dígitos verificadores ao completar.
 *
 * Uso:
 *   <CPFCNPJInput
 *     value={doc}
 *     onChange={(value, isValid, type) => {
 *       setDoc(value)
 *       console.log(type) // 'cpf' | 'cnpj' | null
 *     }}
 *   />
 *
 * Dependências: apenas React + Tailwind CSS
 */

'use client'

import React, { useState } from 'react'

export interface CPFCNPJInputProps {
  value: string
  onChange: (value: string, isValid: boolean, type: 'cpf' | 'cnpj' | null) => void
  label?: string
  placeholder?: string
  className?: string
  inputClassName?: string
  disabled?: boolean
  required?: boolean
  name?: string
  id?: string
}

function applyMaskCPF(digits: string): string {
  return digits
    .replace(/(\\d{3})(\\d)/, '$1.$2')
    .replace(/(\\d{3})(\\d)/, '$1.$2')
    .replace(/(\\d{3})(\\d{1,2})$/, '$1-$2')
}

function applyMaskCNPJ(digits: string): string {
  return digits
    .replace(/(\\d{2})(\\d)/, '$1.$2')
    .replace(/(\\d{3})(\\d)/, '$1.$2')
    .replace(/(\\d{3})(\\d)/, '$1/$2')
    .replace(/(\\d{4})(\\d{1,2})$/, '$1-$2')
}

function validateCPF(digits: string): boolean {
  if (digits.length !== 11 || /^(\\d)\\1{10}$/.test(digits)) return false

  const calcDigit = (slice: string, factor: number): number => {
    const sum = slice.split('').reduce((acc, d, i) => acc + parseInt(d) * (factor - i), 0)
    const rem = (sum * 10) % 11
    return rem >= 10 ? 0 : rem
  }

  return (
    calcDigit(digits.slice(0, 9), 10) === parseInt(digits[9]) &&
    calcDigit(digits.slice(0, 10), 11) === parseInt(digits[10])
  )
}

function validateCNPJ(digits: string): boolean {
  if (digits.length !== 14 || /^(\\d)\\1{13}$/.test(digits)) return false

  const calcDigit = (str: string, weights: number[]): number => {
    const sum = str.split('').reduce((acc, d, i) => acc + parseInt(d) * weights[i], 0)
    const rem = sum % 11
    return rem < 2 ? 0 : 11 - rem
  }

  const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

  return (
    calcDigit(digits.slice(0, 12), w1) === parseInt(digits[12]) &&
    calcDigit(digits.slice(0, 13), w2) === parseInt(digits[13])
  )
}

export function CPFCNPJInput({
  value,
  onChange,
  label = 'CPF / CNPJ',
  placeholder = '000.000.000-00',
  className = '',
  inputClassName = '',
  disabled = false,
  required = false,
  name,
  id,
}: CPFCNPJInputProps) {
  const [error, setError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\\D/g, '').slice(0, 14)

    let formatted = digits
    let type: 'cpf' | 'cnpj' | null = null
    let isValid = false

    if (digits.length <= 11) {
      formatted = applyMaskCPF(digits)
      if (digits.length === 11) {
        type = 'cpf'
        isValid = validateCPF(digits)
        setError(isValid ? '' : 'CPF inválido')
      } else {
        setError('')
      }
    } else {
      formatted = applyMaskCNPJ(digits)
      if (digits.length === 14) {
        type = 'cnpj'
        isValid = validateCNPJ(digits)
        setError(isValid ? '' : 'CNPJ inválido')
      } else {
        setError('')
      }
    }

    onChange(formatted, isValid, type)
  }

  const hasError = Boolean(error)

  return (
    <div className={\`flex flex-col gap-1 \${className}\`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        aria-invalid={hasError}
        className={[
          'w-full rounded-md border px-3 py-2 text-sm transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400',
          hasError ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white',
          inputClassName,
        ].join(' ')}
      />
      {error && (
        <span className="text-xs text-red-500" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}
`,

  cep: `/*
 * CEPInput — Input de CEP com autocomplete via API ViaCEP
 *
 * Ao digitar os 8 dígitos, busca automaticamente e dispara onAddressFound
 * com os dados de endereço retornados pela ViaCEP (gratuita, sem autenticação).
 *
 * Uso:
 *   <CEPInput
 *     value={cep}
 *     onChange={setCep}
 *     onAddressFound={(addr) => {
 *       setRua(addr.logradouro)
 *       setBairro(addr.bairro)
 *       setCidade(addr.localidade)
 *       setEstado(addr.uf)
 *     }}
 *     onError={(msg) => toast.error(msg)}
 *   />
 *
 * Dependências: apenas React + Tailwind CSS (fetch nativo)
 */

'use client'

import React, { useCallback, useRef } from 'react'

export interface ViaCEPAddress {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ddd: string
  ibge: string
}

export interface CEPInputProps {
  value: string
  onChange: (value: string) => void
  onAddressFound?: (address: ViaCEPAddress) => void
  onError?: (message: string) => void
  label?: string
  placeholder?: string
  className?: string
  inputClassName?: string
  disabled?: boolean
  required?: boolean
  name?: string
  id?: string
}

function applyMaskCEP(digits: string): string {
  return digits.length > 5 ? \`\${digits.slice(0, 5)}-\${digits.slice(5)}\` : digits
}

export function CEPInput({
  value,
  onChange,
  onAddressFound,
  onError,
  label = 'CEP',
  placeholder = '00000-000',
  className = '',
  inputClassName = '',
  disabled = false,
  required = false,
  name,
  id,
}: CEPInputProps) {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const abortRef = useRef<AbortController | null>(null)

  const fetchAddress = useCallback(
    async (digits: string) => {
      abortRef.current?.abort()
      abortRef.current = new AbortController()

      setLoading(true)
      setError('')

      try {
        const res = await fetch(\`https://viacep.com.br/ws/\${digits}/json/\`, {
          signal: abortRef.current.signal,
        })

        if (!res.ok) throw new Error('Serviço indisponível')

        const data = await res.json()

        if (data.erro) {
          const msg = 'CEP não encontrado'
          setError(msg)
          onError?.(msg)
          return
        }

        onAddressFound?.(data as ViaCEPAddress)
      } catch (err) {
        if ((err as Error).name === 'AbortError') return
        const msg = 'Erro ao buscar CEP'
        setError(msg)
        onError?.(msg)
      } finally {
        setLoading(false)
      }
    },
    [onAddressFound, onError],
  )

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\\D/g, '').slice(0, 8)
    const masked = applyMaskCEP(digits)

    setError('')
    onChange(masked)

    if (digits.length === 8) {
      fetchAddress(digits)
    }
  }

  const hasError = Boolean(error)

  return (
    <div className={\`flex flex-col gap-1 \${className}\`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          name={name}
          type="text"
          inputMode="numeric"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          required={required}
          aria-invalid={hasError}
          className={[
            'w-full rounded-md border px-3 py-2 text-sm transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400',
            hasError ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white',
            loading ? 'pr-9' : '',
            inputClassName,
          ].join(' ')}
        />
        {loading && (
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              className="h-4 w-4 animate-spin text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          </div>
        )}
      </div>
      {error && (
        <span className="text-xs text-red-500" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}
`,

  telefone: `/*
 * TelefoneInput — Input com máscara de telefone brasileiro
 *
 * Detecta automaticamente celular (11 dígitos) e fixo (10 dígitos):
 *   Celular: (11) 99999-9999
 *   Fixo:    (11) 9999-9999
 *
 * Uso:
 *   <TelefoneInput
 *     value={telefone}
 *     onChange={(value, type) => {
 *       setTelefone(value)
 *       console.log(type) // 'celular' | 'fixo' | null
 *     }}
 *   />
 *
 * Dependências: apenas React + Tailwind CSS
 */

'use client'

import React from 'react'

export type TipoTelefone = 'celular' | 'fixo' | null

export interface TelefoneInputProps {
  value: string
  onChange: (value: string, type: TipoTelefone) => void
  label?: string
  placeholder?: string
  className?: string
  inputClassName?: string
  disabled?: boolean
  required?: boolean
  name?: string
  id?: string
  showTypeBadge?: boolean
}

function applyMaskTelefone(digits: string): { masked: string; type: TipoTelefone } {
  if (digits.length === 0) return { masked: '', type: null }

  // (XX) — DDD
  if (digits.length <= 2) {
    return { masked: \`(\${digits}\`, type: null }
  }

  const ddd = digits.slice(0, 2)
  const rest = digits.slice(2)

  // Celular tem 9 dígitos no número (começa com 9)
  if (digits.length <= 10) {
    // ainda indefinido ou fixo
    const part1 = rest.slice(0, 4)
    const part2 = rest.slice(4)
    const masked =
      part2.length > 0
        ? \`(\${ddd}) \${part1}-\${part2}\`
        : part1.length > 0
          ? \`(\${ddd}) \${part1}\`
          : \`(\${ddd}) \`
    const type: TipoTelefone = digits.length === 10 ? 'fixo' : null
    return { masked, type }
  }

  // 11 dígitos → celular
  const part1 = rest.slice(0, 5)
  const part2 = rest.slice(5)
  const masked =
    part2.length > 0
      ? \`(\${ddd}) \${part1}-\${part2}\`
      : \`(\${ddd}) \${part1}\`
  return { masked, type: 'celular' }
}

const TYPE_LABELS: Record<string, string> = {
  celular: 'Celular',
  fixo: 'Fixo',
}

export function TelefoneInput({
  value,
  onChange,
  label = 'Telefone',
  placeholder = '(11) 99999-9999',
  className = '',
  inputClassName = '',
  disabled = false,
  required = false,
  name,
  id,
  showTypeBadge = true,
}: TelefoneInputProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\\D/g, '').slice(0, 11)
    const { masked, type } = applyMaskTelefone(digits)
    onChange(masked, type)
  }

  const digits = value.replace(/\\D/g, '')
  const currentType: TipoTelefone =
    digits.length === 11 ? 'celular' : digits.length === 10 ? 'fixo' : null

  return (
    <div className={\`flex flex-col gap-1 \${className}\`}>
      {label && (
        <div className="flex items-center gap-2">
          <label htmlFor={id} className="text-sm font-medium text-gray-700">
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
          {showTypeBadge && currentType && (
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
              {TYPE_LABELS[currentType]}
            </span>
          )}
        </div>
      )}
      <input
        id={id}
        name={name}
        type="tel"
        inputMode="numeric"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={[
          'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400',
          inputClassName,
        ].join(' ')}
      />
    </div>
  )
}
`,

  seletorBanco: `/*
 * SeletorBanco — Select com os 20 principais bancos brasileiros
 *
 * Exibe código ISPB/COMPE + nome do banco. Compatível com formulários
 * controlados. Pode ser usado com react-hook-form via Controller.
 *
 * Uso:
 *   <SeletorBanco
 *     value={banco}
 *     onChange={(banco) => setBanco(banco)}
 *   />
 *
 *   // Com react-hook-form:
 *   <Controller
 *     name="banco"
 *     control={control}
 *     render={({ field }) => <SeletorBanco {...field} />}
 *   />
 *
 * Dependências: apenas React + Tailwind CSS
 */

'use client'

import React from 'react'

export interface Banco {
  codigo: string
  nome: string
  nomeAbreviado: string
}

export const BANCOS_BR: Banco[] = [
  { codigo: '001', nome: 'Banco do Brasil S.A.', nomeAbreviado: 'Banco do Brasil' },
  { codigo: '033', nome: 'Banco Santander (Brasil) S.A.', nomeAbreviado: 'Santander' },
  { codigo: '041', nome: 'Banco do Estado do Rio Grande do Sul S.A.', nomeAbreviado: 'Banrisul' },
  { codigo: '077', nome: 'Banco Inter S.A.', nomeAbreviado: 'Inter' },
  { codigo: '084', nome: 'UniCred Norte do Paraná', nomeAbreviado: 'UniCred' },
  { codigo: '104', nome: 'Caixa Econômica Federal', nomeAbreviado: 'Caixa' },
  { codigo: '208', nome: 'BTG Pactual S.A.', nomeAbreviado: 'BTG Pactual' },
  { codigo: '212', nome: 'Banco Original S.A.', nomeAbreviado: 'Original' },
  { codigo: '237', nome: 'Banco Bradesco S.A.', nomeAbreviado: 'Bradesco' },
  { codigo: '260', nome: 'Nu Pagamentos S.A. (Nubank)', nomeAbreviado: 'Nubank' },
  { codigo: '290', nome: 'PagSeguro Internet S.A. (PagBank)', nomeAbreviado: 'PagBank' },
  { codigo: '323', nome: 'Mercado Pago', nomeAbreviado: 'Mercado Pago' },
  { codigo: '336', nome: 'C6 Bank — Banco C6 S.A.', nomeAbreviado: 'C6 Bank' },
  { codigo: '341', nome: 'Itaú Unibanco S.A.', nomeAbreviado: 'Itaú' },
  { codigo: '380', nome: 'PicPay Serviços S.A.', nomeAbreviado: 'PicPay' },
  { codigo: '422', nome: 'Banco Safra S.A.', nomeAbreviado: 'Safra' },
  { codigo: '633', nome: 'Banco Rendimento S.A.', nomeAbreviado: 'Rendimento' },
  { codigo: '655', nome: 'BV — Banco Votorantim S.A.', nomeAbreviado: 'BV' },
  { codigo: '748', nome: 'Sicredi — Bancoob', nomeAbreviado: 'Sicredi' },
  { codigo: '756', nome: 'Sicoob — Bancoob', nomeAbreviado: 'Sicoob' },
]

export interface SeletorBancoProps {
  value: string
  onChange: (banco: Banco | null) => void
  label?: string
  placeholder?: string
  className?: string
  selectClassName?: string
  disabled?: boolean
  required?: boolean
  name?: string
  id?: string
  mostrarCodigo?: boolean
}

export function SeletorBanco({
  value,
  onChange,
  label = 'Banco',
  placeholder = 'Selecione o banco',
  className = '',
  selectClassName = '',
  disabled = false,
  required = false,
  name,
  id,
  mostrarCodigo = true,
}: SeletorBancoProps) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const codigo = e.target.value
    const banco = BANCOS_BR.find((b) => b.codigo === codigo) ?? null
    onChange(banco)
  }

  return (
    <div className={\`flex flex-col gap-1 \${className}\`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        className={[
          'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400',
          !value ? 'text-gray-400' : 'text-gray-900',
          selectClassName,
        ].join(' ')}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {BANCOS_BR.map((banco) => (
          <option key={banco.codigo} value={banco.codigo}>
            {mostrarCodigo ? \`\${banco.codigo} — \` : ''}
            {banco.nomeAbreviado}
          </option>
        ))}
      </select>
    </div>
  )
}
`,

  pixButton: `/*
 * PixButton — Componente de pagamento PIX com QR Code e copia-e-cola
 *
 * Gera o payload EMV/PIX localmente (sem API externa), exibe QR Code e
 * botão de copiar o código. O QR Code é renderizado via qrcode.react.
 *
 * Uso:
 *   <PixButton
 *     pixKey="11999999999"         // celular, CPF, CNPJ, email ou chave aleatória
 *     amount={149.90}
 *     merchantName="Minha Loja"
 *     merchantCity="São Paulo"
 *     description="Pedido #1234"
 *   />
 *
 * Dependências: qrcode.react  →  npm install qrcode.react
 *   Em Next.js App Router, este componente já tem 'use client'.
 */

'use client'

import React, { useCallback, useMemo, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'

// ─── PIX EMV payload ─────────────────────────────────────────────────────────

function tlv(tag: string, value: string): string {
  return \`\${tag}\${String(value.length).padStart(2, '0')}\${value}\`
}

function crc16CCITT(str: string): string {
  let crc = 0xffff
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0')
}

function buildPixPayload(
  pixKey: string,
  amount: number,
  merchantName: string,
  merchantCity: string,
  txid?: string,
): string {
  const name = merchantName.normalize('NFD').replace(/[̀-ͯ]/g, '').slice(0, 25)
  const city = merchantCity.normalize('NFD').replace(/[̀-ͯ]/g, '').slice(0, 15)
  const ref = (txid ?? '***').replace(/[^a-zA-Z0-9]/g, '').slice(0, 25) || '***'

  const merchantInfo = tlv('00', 'BR.GOV.BCB.PIX') + tlv('01', pixKey)
  const additionalData = tlv('05', ref)

  const payloadBase =
    tlv('00', '01') +
    tlv('26', merchantInfo) +
    tlv('52', '0000') +
    tlv('53', '986') +
    (amount > 0 ? tlv('54', amount.toFixed(2)) : '') +
    tlv('58', 'BR') +
    tlv('59', name) +
    tlv('60', city) +
    tlv('62', additionalData) +
    '6304'

  return payloadBase + crc16CCITT(payloadBase)
}

// ─── Formatador de moeda ──────────────────────────────────────────────────────

function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

// ─── Componente ───────────────────────────────────────────────────────────────

export interface PixButtonProps {
  pixKey: string
  amount: number
  merchantName: string
  merchantCity?: string
  description?: string
  txid?: string
  qrSize?: number
  className?: string
  onCopy?: () => void
}

export function PixButton({
  pixKey,
  amount,
  merchantName,
  merchantCity = 'Brasil',
  description,
  txid,
  qrSize = 200,
  className = '',
  onCopy,
}: PixButtonProps) {
  const [copied, setCopied] = useState(false)

  const payload = useMemo(
    () => buildPixPayload(pixKey, amount, merchantName, merchantCity, txid),
    [pixKey, amount, merchantName, merchantCity, txid],
  )

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(payload)
      setCopied(true)
      onCopy?.()
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // fallback para ambientes sem Clipboard API
      const ta = document.createElement('textarea')
      ta.value = payload
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.focus()
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }, [payload, onCopy])

  return (
    <div
      className={[
        'flex flex-col items-center gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm',
        className,
      ].join(' ')}
    >
      {/* Logo PIX + valor */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 512 512" className="h-6 w-6" fill="none">
            <path
              d="M126.5 384.5L254.5 256l-128-128.5L254.5 0 510 255.5 254.5 512 126.5 384.5z"
              fill="#32BCAD"
            />
            <path d="M382.5 128L254.5 256l128 128.5L254.5 512 -1 256.5 254.5 0 382.5 128z" fill="#32BCAD" />
          </svg>
          <span className="text-base font-semibold text-gray-800">Pagar com PIX</span>
        </div>
        <span className="text-2xl font-bold text-green-600">{formatBRL(amount)}</span>
        {description && <span className="text-xs text-gray-500">{description}</span>}
      </div>

      {/* QR Code */}
      <div className="rounded-lg border-2 border-gray-100 p-3">
        <QRCodeSVG
          value={payload}
          size={qrSize}
          level="M"
          includeMargin={false}
        />
      </div>

      {/* Instruções */}
      <p className="max-w-xs text-center text-xs text-gray-500">
        Abra o app do seu banco, acesse <strong>PIX</strong> → <strong>Ler QR Code</strong>
      </p>

      {/* Botão copiar */}
      <button
        type="button"
        onClick={handleCopy}
        className={[
          'flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all',
          copied
            ? 'bg-green-500 text-white'
            : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100',
        ].join(' ')}
      >
        {copied ? (
          <>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Código copiado!
          </>
        ) : (
          <>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Copiar código PIX
          </>
        )}
      </button>

      <p className="text-center text-[10px] text-gray-400">
        Chave PIX: <span className="font-mono">{pixKey}</span>
      </p>
    </div>
  )
}
`,

  badge: `/*
 * BadgeParcelamento — Exibe "em até Nx de R$ XX,XX sem juros"
 *
 * Calcula automaticamente o número máximo de parcelas respeitando o valor
 * mínimo por parcela. Retorna null se o valor for muito baixo.
 *
 * Uso:
 *   // Badge padrão (mínimo R$ 10/parcela)
 *   <BadgeParcelamento totalAmount={299.90} maxInstallments={12} />
 *
 *   // Com mínimo customizado
 *   <BadgeParcelamento totalAmount={49.90} maxInstallments={6} minInstallmentValue={15} />
 *
 *   // Variante compacta (inline)
 *   <BadgeParcelamento totalAmount={299.90} maxInstallments={12} variant="inline" />
 *
 * Dependências: apenas React + Tailwind CSS
 */

import React from 'react'

export interface BadgeParcelamentoProps {
  totalAmount: number
  maxInstallments: number
  minInstallmentValue?: number
  variant?: 'badge' | 'inline' | 'card'
  className?: string
  showTotal?: boolean
}

function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  })
}

function calcBestInstallment(
  total: number,
  maxInstallments: number,
  minInstallmentValue: number,
): number | null {
  if (total <= 0) return null

  // Encontra o máximo de parcelas onde cada parcela ≥ mínimo
  for (let n = maxInstallments; n >= 2; n--) {
    if (total / n >= minInstallmentValue) return n
  }

  // Se nem 2x cabe no mínimo, exibe à vista
  return 1
}

export function BadgeParcelamento({
  totalAmount,
  maxInstallments,
  minInstallmentValue = 10,
  variant = 'badge',
  className = '',
  showTotal = false,
}: BadgeParcelamentoProps) {
  const bestN = calcBestInstallment(totalAmount, maxInstallments, minInstallmentValue)

  if (!bestN) return null

  const installmentValue = totalAmount / bestN
  const isSinglePayment = bestN === 1

  if (variant === 'inline') {
    return (
      <span className={\`text-sm text-gray-600 \${className}\`}>
        {isSinglePayment ? (
          <>{formatBRL(totalAmount)} à vista</>
        ) : (
          <>
            em até{' '}
            <strong className="text-gray-900">
              {bestN}x de {formatBRL(installmentValue)}
            </strong>{' '}
            sem juros
          </>
        )}
      </span>
    )
  }

  if (variant === 'card') {
    return (
      <div
        className={[
          'rounded-lg border border-green-200 bg-green-50 p-3',
          className,
        ].join(' ')}
      >
        {isSinglePayment ? (
          <p className="text-sm font-semibold text-green-700">
            {formatBRL(totalAmount)}{' '}
            <span className="font-normal text-green-600">à vista</span>
          </p>
        ) : (
          <>
            <p className="text-xs text-green-600">Pagamento parcelado</p>
            <p className="text-lg font-bold text-green-700">
              {bestN}x{' '}
              <span className="text-base">{formatBRL(installmentValue)}</span>
            </p>
            <p className="text-xs text-green-600">sem juros</p>
          </>
        )}
        {showTotal && !isSinglePayment && (
          <p className="mt-1 text-xs text-gray-500">
            Total: {formatBRL(totalAmount)}
          </p>
        )}
      </div>
    )
  }

  // variant === 'badge' (padrão)
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        isSinglePayment
          ? 'bg-blue-100 text-blue-800'
          : 'bg-green-100 text-green-800',
        className,
      ].join(' ')}
    >
      {isSinglePayment ? (
        \`\${formatBRL(totalAmount)} à vista\`
      ) : (
        \`em até \${bestN}x de \${formatBRL(installmentValue)} sem juros\`
      )}
    </span>
  )
}
`,

  parcelamento: `/*
 * ParcelamentoSelect — Select de parcelamento para checkout
 *
 * Gera automaticamente as opções de 1x até maxParcelas.
 * Com jurosMensais = 0, exibe "(sem juros)". Com juros, usa a fórmula
 * Price (SAC) e exibe o total final na opção.
 *
 * A opção 1x (à vista) nunca tem juros, independente de jurosMensais.
 *
 * Uso (sem juros):
 *   <ParcelamentoSelect
 *     valorTotal={299.90}
 *     maxParcelas={12}
 *     value={parcelas}
 *     onChange={(n, opcao) => setParcelas(n)}
 *   />
 *
 * Uso (com juros a partir da 2ª parcela):
 *   <ParcelamentoSelect
 *     valorTotal={299.90}
 *     maxParcelas={12}
 *     jurosMensais={1.99}   // 1,99% ao mês
 *     minValorParcela={15}  // oculta parcelas abaixo de R$ 15 (padrão: 5)
 *     value={parcelas}
 *     onChange={(n, opcao) => {
 *       setParcelas(n)
 *       setTotalFinal(opcao.valorTotalComJuros)
 *     }}
 *   />
 *
 * Dependências: shadcn/ui (Select) + Tailwind CSS
 *   npx shadcn@latest add select
 */

'use client'

import React, { useMemo } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface ParcelamentoOption {
  parcelas: number
  valorParcela: number
  valorTotalComJuros: number
  temJuros: boolean
}

export interface ParcelamentoSelectProps {
  valorTotal: number
  maxParcelas?: number
  jurosMensais?: number
  minValorParcela?: number
  value?: string
  onChange?: (parcelas: number, opcao: ParcelamentoOption) => void
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  className?: string
  name?: string
  id?: string
}

// ─── Cálculo (fórmula Price) ──────────────────────────────────────────────────

function calcParcela(
  valorTotal: number,
  n: number,
  jurosMensais: number,
): ParcelamentoOption {
  // 1x à vista: nunca tem juros
  if (n === 1 || jurosMensais === 0) {
    const valorParcela = valorTotal / n
    return {
      parcelas: n,
      valorParcela,
      valorTotalComJuros: valorTotal,
      temJuros: false,
    }
  }

  // n > 1 com juros: fórmula Price
  const i = jurosMensais / 100
  const fator = Math.pow(1 + i, n)
  const pmt = valorTotal * (i * fator) / (fator - 1)
  const totalComJuros = pmt * n

  return {
    parcelas: n,
    valorParcela: pmt,
    valorTotalComJuros: totalComJuros,
    temJuros: true,
  }
}

// ─── Formatador ───────────────────────────────────────────────────────────────

function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  })
}

function formatLabel(opcao: ParcelamentoOption): string {
  const parcela = formatBRL(opcao.valorParcela)

  if (opcao.parcelas === 1) {
    return \`1x de \${parcela} (à vista)\`
  }

  if (!opcao.temJuros) {
    return \`\${opcao.parcelas}x de \${parcela} (sem juros)\`
  }

  const total = formatBRL(opcao.valorTotalComJuros)
  return \`\${opcao.parcelas}x de \${parcela} (total \${total})\`
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function ParcelamentoSelect({
  valorTotal,
  maxParcelas = 12,
  jurosMensais = 0,
  minValorParcela = 5,
  value,
  onChange,
  label = 'Parcelas',
  placeholder = 'Selecione o número de parcelas',
  disabled = false,
  required = false,
  className = '',
  name,
  id,
}: ParcelamentoSelectProps) {
  const opcoes = useMemo<ParcelamentoOption[]>(() => {
    const resultado: ParcelamentoOption[] = []

    for (let n = 1; n <= maxParcelas; n++) {
      const opcao = calcParcela(valorTotal, n, jurosMensais)
      if (opcao.valorParcela < minValorParcela && n > 1) break
      resultado.push(opcao)
    }

    return resultado
  }, [valorTotal, maxParcelas, jurosMensais, minValorParcela])

  function handleChange(strValue: string) {
    const n = parseInt(strValue, 10)
    const opcao = opcoes.find((o) => o.parcelas === n)
    if (opcao) onChange?.(n, opcao)
  }

  return (
    <div className={\`flex flex-col gap-1 \${className}\`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <Select
        value={value}
        onValueChange={handleChange}
        disabled={disabled}
        name={name}
        required={required}
      >
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {opcoes.map((opcao) => (
            <SelectItem
              key={opcao.parcelas}
              value={String(opcao.parcelas)}
            >
              <span className="flex items-baseline gap-1.5">
                <span className="font-medium">{formatLabel(opcao)}</span>
                {opcao.temJuros && (
                  <span className="text-xs text-amber-600">
                    +{jurosMensais}% a.m.
                  </span>
                )}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
`,

  cartao: `/*
 * CartaoInput — Formulário completo de cartão de crédito
 *
 * Detecta a bandeira pelo BIN (Visa, Mastercard, Elo, Amex, Hipercard),
 * aplica máscara de número, valida com Luhn, formata validade e CVV.
 * Exporta também os sub-componentes individuais para uso avulso.
 *
 * Uso (formulário completo):
 *   <CartaoForm
 *     value={cartao}
 *     onChange={setCartao}
 *     onValidChange={(isValid) => setCanSubmit(isValid)}
 *   />
 *
 * Uso (inputs individuais):
 *   <CartaoNumeroInput value={numero} onChange={setNumero} />
 *   <CartaoValidadeInput value={validade} onChange={setValidade} />
 *   <CartaoCVVInput value={cvv} onChange={setCvv} bandeira={bandeira} />
 *
 * Dependências: apenas React + Tailwind CSS
 */

'use client'

import React, { useState } from 'react'

// ─── Bandeiras ────────────────────────────────────────────────────────────────

export type Bandeira = 'visa' | 'mastercard' | 'elo' | 'amex' | 'hipercard' | 'desconhecida'

const BANDEIRA_PATTERNS: Array<{ bandeira: Bandeira; regex: RegExp }> = [
  { bandeira: 'amex', regex: /^3[47]/ },
  { bandeira: 'hipercard', regex: /^(606282|637095|637568|637599|637609|637612)/ },
  {
    bandeira: 'elo',
    regex:
      /^(4011|4312|4389|4514|4573|4576|5041|5066|5067|5090|6277|6362|6363|6516|6550|636368|438935|504175|451416|509048|509067|509049|509069|509550|509551|509552|509553|509554|509555)/,
  },
  { bandeira: 'mastercard', regex: /^(5[1-5]|2[2-7])/ },
  { bandeira: 'visa', regex: /^4/ },
]

export function detectBandeira(digits: string): Bandeira {
  for (const { bandeira, regex } of BANDEIRA_PATTERNS) {
    if (regex.test(digits)) return bandeira
  }
  return 'desconhecida'
}

const BANDEIRA_LABELS: Record<Bandeira, string> = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  elo: 'Elo',
  amex: 'American Express',
  hipercard: 'Hipercard',
  desconhecida: '',
}

const BANDEIRA_COLORS: Record<Bandeira, string> = {
  visa: 'bg-blue-100 text-blue-800',
  mastercard: 'bg-red-100 text-red-800',
  elo: 'bg-yellow-100 text-yellow-800',
  amex: 'bg-indigo-100 text-indigo-800',
  hipercard: 'bg-rose-100 text-rose-800',
  desconhecida: 'bg-gray-100 text-gray-600',
}

// ─── Máscara e validação ──────────────────────────────────────────────────────

function applyMaskCartao(digits: string, bandeira: Bandeira): string {
  if (bandeira === 'amex') {
    // 4-6-5
    return digits
      .replace(/(\\d{4})(\\d{1,6})/, '$1 $2')
      .replace(/(\\d{4} \\d{6})(\\d{1,5})/, '$1 $2')
  }
  // 4-4-4-4
  return digits.replace(/(\\d{4})(?=\\d)/g, '$1 ').trim()
}

function luhn(digits: string): boolean {
  if (digits.length < 13) return false
  let sum = 0
  let isOdd = false
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits[i])
    if (isOdd) {
      d *= 2
      if (d > 9) d -= 9
    }
    sum += d
    isOdd = !isOdd
  }
  return sum % 10 === 0
}

function applyMaskValidade(raw: string): string {
  const digits = raw.replace(/\\D/g, '').slice(0, 4)
  if (digits.length <= 2) return digits
  return \`\${digits.slice(0, 2)}/\${digits.slice(2)}\`
}

function validateValidade(masked: string): boolean {
  const [m, y] = masked.split('/')
  if (!m || !y || y.length < 2) return false
  const month = parseInt(m)
  if (month < 1 || month > 12) return false
  const now = new Date()
  const expYear = 2000 + parseInt(y)
  const expMonth = month
  return expYear > now.getFullYear() || (expYear === now.getFullYear() && expMonth >= now.getMonth() + 1)
}

// ─── Sub-componentes ──────────────────────────────────────────────────────────

export interface CartaoNumeroInputProps {
  value: string
  onChange: (value: string, bandeira: Bandeira, isValid: boolean) => void
  className?: string
  label?: string
  id?: string
  name?: string
}

export function CartaoNumeroInput({
  value,
  onChange,
  className = '',
  label = 'Número do cartão',
  id,
  name,
}: CartaoNumeroInputProps) {
  const digits = value.replace(/\\D/g, '')
  const bandeira = detectBandeira(digits)
  const maxLen = bandeira === 'amex' ? 15 : 16

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const d = e.target.value.replace(/\\D/g, '').slice(0, maxLen)
    const b = detectBandeira(d)
    const max = b === 'amex' ? 15 : 16
    const masked = applyMaskCartao(d.slice(0, max), b)
    const valid = d.length === max && luhn(d)
    onChange(masked, b, valid)
  }

  const label_bandeira = BANDEIRA_LABELS[bandeira]

  return (
    <div className={\`flex flex-col gap-1 \${className}\`}>
      {label && (
        <div className="flex items-center justify-between">
          <label htmlFor={id} className="text-sm font-medium text-gray-700">
            {label}
          </label>
          {label_bandeira && (
            <span
              className={\`rounded-full px-2 py-0.5 text-xs font-semibold \${BANDEIRA_COLORS[bandeira]}\`}
            >
              {label_bandeira}
            </span>
          )}
        </div>
      )}
      <input
        id={id}
        name={name}
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleChange}
        placeholder="0000 0000 0000 0000"
        maxLength={bandeira === 'amex' ? 17 : 19}
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 font-mono text-sm tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  )
}

export interface CartaoValidadeInputProps {
  value: string
  onChange: (value: string, isValid: boolean) => void
  className?: string
  label?: string
  id?: string
  name?: string
}

export function CartaoValidadeInput({
  value,
  onChange,
  className = '',
  label = 'Validade',
  id,
  name,
}: CartaoValidadeInputProps) {
  const [error, setError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const masked = applyMaskValidade(e.target.value)
    const valid = masked.length === 5 && validateValidade(masked)

    if (masked.length === 5) {
      setError(valid ? '' : 'Data inválida ou expirada')
    } else {
      setError('')
    }

    onChange(masked, valid)
  }

  return (
    <div className={\`flex flex-col gap-1 \${className}\`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleChange}
        placeholder="MM/AA"
        maxLength={5}
        className={[
          'w-full rounded-md border px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white',
        ].join(' ')}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}

export interface CartaoCVVInputProps {
  value: string
  onChange: (value: string, isValid: boolean) => void
  bandeira?: Bandeira
  className?: string
  label?: string
  id?: string
  name?: string
}

export function CartaoCVVInput({
  value,
  onChange,
  bandeira = 'desconhecida',
  className = '',
  label = 'CVV',
  id,
  name,
}: CartaoCVVInputProps) {
  const maxLen = bandeira === 'amex' ? 4 : 3

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\\D/g, '').slice(0, maxLen)
    onChange(digits, digits.length === maxLen)
  }

  return (
    <div className={\`flex flex-col gap-1 \${className}\`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
          <span className="ml-1 text-xs font-normal text-gray-400">
            ({maxLen} dígitos)
          </span>
        </label>
      )}
      <input
        id={id}
        name={name}
        type="password"
        inputMode="numeric"
        value={value}
        onChange={handleChange}
        placeholder={'•'.repeat(maxLen)}
        maxLength={maxLen}
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  )
}

// ─── Formulário completo ──────────────────────────────────────────────────────

export interface CartaoData {
  numero: string
  nomeTitular: string
  validade: string
  cvv: string
  bandeira: Bandeira
}

export interface CartaoFormProps {
  value: CartaoData
  onChange: (data: CartaoData) => void
  onValidChange?: (isValid: boolean) => void
  className?: string
}

export function CartaoForm({ value, onChange, onValidChange, className = '' }: CartaoFormProps) {
  const [validity, setValidity] = useState({
    numero: false,
    nomeTitular: false,
    validade: false,
    cvv: false,
  })

  function checkValidity(next: typeof validity) {
    const all = Object.values(next).every(Boolean)
    onValidChange?.(all)
  }

  function setField<K extends keyof CartaoData>(key: K, val: CartaoData[K]) {
    onChange({ ...value, [key]: val })
  }

  return (
    <div className={\`flex flex-col gap-4 \${className}\`}>
      <CartaoNumeroInput
        value={value.numero}
        label="Número do cartão"
        onChange={(numero, bandeira, isValid) => {
          const next = { ...validity, numero: isValid }
          setValidity(next)
          checkValidity(next)
          onChange({ ...value, numero, bandeira })
        }}
      />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Nome no cartão</label>
        <input
          type="text"
          value={value.nomeTitular}
          onChange={(e) => {
            const nome = e.target.value.toUpperCase()
            const next = { ...validity, nomeTitular: nome.trim().length >= 3 }
            setValidity(next)
            checkValidity(next)
            setField('nomeTitular', nome)
          }}
          placeholder="NOME COMO NO CARTÃO"
          autoComplete="cc-name"
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <CartaoValidadeInput
          value={value.validade}
          onChange={(validade, isValid) => {
            const next = { ...validity, validade: isValid }
            setValidity(next)
            checkValidity(next)
            setField('validade', validade)
          }}
        />
        <CartaoCVVInput
          value={value.cvv}
          bandeira={value.bandeira}
          onChange={(cvv, isValid) => {
            const next = { ...validity, cvv: isValid }
            setValidity(next)
            checkValidity(next)
            setField('cvv', cvv)
          }}
        />
      </div>
    </div>
  )
}
`,
}

// ── Icons ─────────────────────────────────────────────────────────────────────

const ICONS: Record<string, ReactNode> = {
  setup: <Terminal size={16} />,
  auth: <Lock size={16} />,
  dashboard: <LayoutDashboard size={16} />,
  pagamentos: <CreditCard size={16} />,
  email: <Mail size={16} />,
  banco: <Database size={16} />,
  'primeiros-passos': <Package size={16} />,
  cpfcnpj: <FileText size={16} />,
  cep: <MapPin size={16} />,
  telefone: <Phone size={16} />,
  'banco-select': <Building2 size={16} />,
  pix: <QrCode size={16} />,
  'parcelamento-badge': <Tag size={16} />,
  'parcelamento-select': <List size={16} />,
  cartao: <CreditCard size={16} />,
}

// ── Module data ───────────────────────────────────────────────────────────────

const MODULOS_BOILERPLATE: Modulo[] = [
  {
    id: 'setup', titulo: 'Setup & Instalação',
    descricao: 'Clone o repositório, configure variáveis de ambiente e inicialize o banco de dados.',
    grupo: 'boilerplate',
    steps: ['Instalar', 'Variáveis', 'Banco de Dados', 'Rodar'],
    checklist: [
      'ZIP baixado e extraído',
      '.env.local configurado',
      'npm install rodou sem erros',
      'npm run dev abrindo em localhost:3000',
    ],
    stepData: [
      {
        downloadHref: '/downloads/devbase-boilerplate.zip',
        downloadLabel: 'Baixar DevBase Boilerplate (.zip)',
        blocos: [
          { titulo: 'Instalar dependências', codigo: 'cd devbase-boilerplate\nnpm install' },
        ],
        nota: '💡 Requer Node 18+ e npm 9+. Verifique com node -v e npm -v.',
      },
      {
        blocos: [
          { titulo: 'Variáveis de ambiente (.env.local)', codigo: C.envVars },
        ],
        nota: '⚠ Nunca commite o .env.local. Ele já está no .gitignore — confira antes de dar git add .',
      },
      {
        instrucoes: 'Execute o schema SQL no Supabase para criar as tabelas:\n\n1. Acesse app.supabase.com → seu projeto\n2. Sidebar esquerda → SQL Editor\n3. Clique em New query\n4. Cole o conteúdo abaixo e clique em Run (Ctrl+Enter)',
        blocos: [
          { titulo: 'Schema SQL (supabase/schema.sql)', codigo: C.schema },
        ],
        nota: '💡 Execute apenas uma vez. Cria profiles e payments, configura RLS e os triggers automáticos.',
      },
      {
        blocos: [
          { titulo: 'Iniciar o servidor de desenvolvimento', codigo: 'npm run dev' },
        ],
        nota: '💡 Abre em http://localhost:3000. Hot reload ativado — qualquer mudança atualiza o browser automaticamente.',
      },
    ],
  },
  {
    id: 'auth', titulo: 'Autenticação',
    descricao: 'Auth completo com Supabase SSR. Login, cadastro, reset de senha e callback já configurados.',
    grupo: 'boilerplate',
    steps: ['Como funciona', 'Configurar Supabase', 'Proteger rotas', 'Personalizar'],
    checklist: [
      'Email de confirmação chegando',
      'Login funcionando',
      'Redirect para /dashboard após login',
      'Reset de senha funcionando',
    ],
    stepData: [
      {
        instrucoes: 'O auth usa Supabase Auth + SSR. Cada pasta em src/app/auth/ é uma rota independente.\n\nFluxo completo:\n1. Usuário acessa /auth/login → preenche email e senha\n2. Supabase autentica → dispara redirect para /auth/callback\n3. Callback troca o code por sessão e cookies\n4. Middleware verifica cookies em cada request para rotas protegidas',
        blocos: [
          { titulo: 'Estrutura de arquivos (src/app/auth/)', codigo: C.authTree },
        ],
      },
      {
        instrucoes: '1. app.supabase.com → Authentication → URL Configuration\n2. Site URL: http://localhost:3000 (dev) / https://seudominio.com.br (prod)\n3. Redirect URLs: adicione http://localhost:3000/auth/callback\n\nOs dois arquivos abaixo são os clientes Supabase — um para browser, outro para servidor:',
        blocos: [
          { titulo: 'Cliente browser (src/lib/supabase/client.ts)', codigo: C.authClient },
          { titulo: 'Cliente servidor (src/lib/supabase/server.ts)', codigo: C.authServer },
        ],
      },
      {
        instrucoes: 'O middleware roda antes de todo request. Verifica a sessão e redireciona conforme as regras:',
        blocos: [
          { titulo: 'Middleware (src/middleware.ts)', codigo: C.middleware },
        ],
        nota: "💡 Edite protectedRoutes para adicionar novas rotas. Ex: '/admin', '/api/dados-sensiveis'.",
      },
      {
        instrucoes: 'Todas as páginas já existem e funcionam. Edite o visual conforme sua marca:\n\nsrc/app/auth/login/page.tsx        → tela de login\nsrc/app/auth/cadastro/page.tsx     → tela de cadastro\nsrc/app/auth/reset-senha/page.tsx  → esqueci a senha\nsrc/app/auth/nova-senha/page.tsx   → redefinir senha\n\nNão precisa mexer em:\nsrc/app/auth/callback/route.ts     → troca code por sessão (não editar)',
        blocos: [],
      },
    ],
  },
  {
    id: 'dashboard', titulo: 'Dashboard',
    descricao: 'Dashboard protegido com layout, sidebar e header prontos para customização.',
    grupo: 'boilerplate',
    steps: ['Estrutura', 'Layout', 'Página principal'],
    checklist: [
      'Layout do dashboard ok',
      'Rota protegida funcionando',
      'Sidebar e header ok',
    ],
    stepData: [
      {
        instrucoes: 'O dashboard é um grupo de rotas. O layout.tsx envolve tudo com sidebar e header. Para novas páginas, basta criar arquivos dentro de dashboard/:',
        blocos: [
          { titulo: 'Estrutura de arquivos (src/app/dashboard/)', codigo: C.dashboardTree },
        ],
      },
      {
        blocos: [
          { titulo: 'Layout protegido (src/app/dashboard/layout.tsx)', codigo: C.dashboardLayout },
        ],
        nota: '💡 Para nova página: crie src/app/dashboard/nova-rota/page.tsx. O layout.tsx já envolve automaticamente.',
      },
      {
        instrucoes: 'A página principal mostra métricas e próximos passos do onboarding. Customize as seções conforme seu produto:',
        blocos: [
          { titulo: 'Página principal (src/app/dashboard/page.tsx)', codigo: C.dashboardPage },
        ],
      },
    ],
  },
  {
    id: 'pagamentos', titulo: 'Pagamentos',
    descricao: 'Webhooks prontos para Kiwify e Pagar.me. Configura em minutos.',
    grupo: 'boilerplate',
    steps: ['Kiwify', 'Pagar.me'],
    checklist: [
      'Webhook Kiwify configurado no painel',
      'Webhook Pagar.me configurado no painel',
      'Testou recebimento do webhook',
    ],
    stepData: [
      {
        instrucoes: 'Configure o webhook no painel da Kiwify:\n\n1. Kiwify → Configurações → Integrações → Webhooks\n2. URL: https://seudominio.com.br/api/webhooks/kiwify\n3. Eventos: selecione "Compra aprovada"\n\nO webhook adiciona o comprador como colaborador no repositório GitHub automaticamente:',
        blocos: [
          { titulo: 'Webhook Kiwify (src/app/api/webhooks/kiwify/route.ts)', codigo: C.kiwify },
        ],
      },
      {
        instrucoes: 'Configure o webhook no painel do Pagar.me:\n\n1. Pagar.me → Configurações → Webhooks\n2. URL: https://seudominio.com.br/api/webhooks/pagarme\n3. Eventos: order.paid, order.canceled, charge.refunded\n\nO webhook atualiza o plano e status do usuário no banco automaticamente:',
        blocos: [
          { titulo: 'Webhook Pagar.me (src/app/api/webhooks/pagarme/route.ts)', codigo: C.pagarme },
        ],
      },
    ],
  },
  {
    id: 'email', titulo: 'Email com Resend',
    descricao: 'Email transacional configurado com Resend. Template de boas-vindas pronto.',
    grupo: 'boilerplate',
    steps: ['Configurar Resend', 'Template', 'Rota de envio'],
    checklist: [
      'Domínio verificado no Resend',
      'Email de boas-vindas disparando',
      'Template customizado',
    ],
    stepData: [
      {
        instrucoes: '1. Crie uma conta em resend.com (gratuito até 3.000 emails/mês)\n2. Adicione e verifique seu domínio em Domains\n3. Gere uma API Key em API Keys\n4. Adicione no .env.local: RESEND_API_KEY=re_...\n\nAs constantes abaixo centralizam as configs de email:',
        blocos: [
          { titulo: 'Configurações Resend (src/lib/resend.ts)', codigo: C.resend },
        ],
      },
      {
        instrucoes: 'Template do email de boas-vindas em HTML. Edite textos, cores e links conforme sua marca:',
        blocos: [
          { titulo: 'Template de boas-vindas (src/emails/welcome.ts)', codigo: C.welcome },
        ],
      },
      {
        instrucoes: 'Rota que dispara o email. Chame após o cadastro do usuário, passando nome e email no body:',
        blocos: [
          { titulo: 'Rota de envio (src/app/api/emails/welcome/route.ts)', codigo: C.welcomeRoute },
        ],
        nota: '💡 Troque o campo from para seu domínio verificado no Resend. Ex: noreply@seudominio.com.br',
      },
    ],
  },
  {
    id: 'banco', titulo: 'Banco de Dados',
    descricao: 'Schema Supabase com tabelas prontas para SaaS: profiles, payments, RLS e triggers.',
    grupo: 'boilerplate',
    steps: ['Schema', 'Entender o schema'],
    checklist: [
      'Schema rodado no Supabase',
      'RLS configurado',
      'Tabelas criadas',
    ],
    stepData: [
      {
        instrucoes: 'Execute no SQL Editor do Supabase (sidebar → SQL Editor → New query):',
        blocos: [
          { titulo: 'Schema SQL (supabase/schema.sql)', codigo: C.schema },
        ],
        nota: '⚠ RLS habilitado em todas as tabelas. Cada usuário só acessa seus próprios dados.',
      },
      {
        instrucoes: 'Estrutura das tabelas e o que cada campo faz:\n\nTABELA: profiles\n  id                  → UUID do usuário (vem do auth.users)\n  email               → email do usuário\n  full_name           → nome completo\n  plan                → plano atual (free/basico/pro/agencia)\n  subscription_status → active / inactive / canceled\n  subscription_id     → ID da assinatura no gateway\n\nTABELA: payments\n  user_id             → referência ao profile\n  pagarme_order_id    → ID do pedido no Pagar.me\n  plan                → plano adquirido\n  amount              → valor em centavos\n  status              → paid / pending / refunded\n  payment_method      → cartão / pix / boleto\n\nTRIGGER: handle_new_user\n  Roda automaticamente quando um usuário se cadastra.\n  Cria o perfil na tabela profiles com os dados básicos.',
        blocos: [],
        nota: '💡 Para novos campos, use migrations em vez de editar o schema direto.',
      },
    ],
  },
]

const MODULOS_COMPONENTS: Modulo[] = [
  {
    id: 'primeiros-passos',
    titulo: 'Primeiros Passos',
    descricao: 'Como instalar e usar os componentes do Kit no seu projeto Next.js com Tailwind CSS.',
    grupo: 'components',
    steps: ['Configurar', 'Requisitos'],
    checklist: ['ZIP baixado e extraído', 'Componentes copiados para src/components/', 'Tailwind configurado'],
    stepData: [
      {
        downloadHref: '/downloads/devbase-components.zip',
        downloadLabel: 'Baixar DevBase Components (.zip)',
        instrucoes: 'O Kit Components é uma coleção de componentes React prontos para o mercado brasileiro. Cada componente é um arquivo .tsx independente — copie só os que precisar para o seu projeto.\n\n1. Baixe o ZIP acima e extraia\n2. Copie os arquivos .tsx que quiser para src/components/ do seu projeto\n3. Cada componente tem suas próprias dependências — veja na seção "Instalação" de cada um\n4. Todos os componentes funcionam com Next.js 14+, React 18+ e Tailwind CSS',
        blocos: [],
      },
      {
        blocos: [{ titulo: 'Requisitos', codigo: '# dependências base (já no seu projeto)\nnext >= 14\nreact >= 18\ntailwindcss >= 3\n\n# instalar se não tiver\nnpm install clsx' }],
      },
    ],
  },
  {
    id: 'cpfcnpj', titulo: 'CPFCNPJInput',
    descricao: 'Input com máscara automática para CPF e CNPJ. Detecta o tipo pelo número de dígitos e valida os dígitos verificadores.',
    grupo: 'components',
    steps: ['O que é', 'Instalação', 'Código', 'Exemplo de uso'],
    dicas: ['Input que detecta CPF ou CNPJ pelo número de dígitos, aplica máscara e valida os dígitos verificadores em tempo real.'],
    checklist: ['Arquivo copiado pro projeto', 'Dependências instaladas', 'Componente funcionando'],
    stepData: [
      {
        instrucoes: 'Componente de input que aceita CPF (pessoa física) e CNPJ (pessoa jurídica). Detecta automaticamente qual tipo está sendo digitado pelo número de caracteres. Aplica máscara em tempo real: 000.000.000-00 para CPF e 00.000.000/0000-00 para CNPJ.\n\nQuando usar: em qualquer formulário de cadastro que precise identificar o usuário como pessoa física ou jurídica — checkout, onboarding, emissão de nota fiscal.',
        blocos: [],
      },
      {
        instrucoes: 'Este componente não tem dependências externas além do React e Tailwind.',
        blocos: [{ titulo: 'Instalação', codigo: '# nenhuma dependência extra necessária\n# copie CPFCNPJInput.tsx para src/components/' }],
      },
      {
        blocos: [{ titulo: 'CPFCNPJInput.tsx', codigo: C.cpfcnpj }],
      },
      {
        instrucoes: 'Importe e use no seu formulário. O componente retorna o valor formatado com máscara, um boolean isValid e o tipo detectado ("cpf" | "cnpj" | null).',
        blocos: [{ titulo: 'Exemplo de uso', codigo: `import { CPFCNPJInput } from '@/components/CPFCNPJInput'

export function FormularioCadastro() {
  const [documento, setDocumento] = useState('')

  return (
    <CPFCNPJInput
      value={documento}
      onChange={(value, isValid, type) => setDocumento(value)}
      placeholder="CPF ou CNPJ"
    />
  )
}` }],
        nota: "💡 O valor retornado no onChange é com máscara. Para salvar no banco, limpe com value.replace(/\\D/g, ''). O isValid só é true quando o CPF/CNPJ passar na validação dos dígitos verificadores.",
      },
    ],
  },
  {
    id: 'cep', titulo: 'CEPInput',
    descricao: 'Input de CEP com autocomplete via API ViaCEP. Ao digitar 8 dígitos, busca e preenche os dados de endereço automaticamente.',
    grupo: 'components',
    steps: ['O que é', 'Instalação', 'Código', 'Exemplo de uso'],
    dicas: ['Busca o endereço automaticamente ao digitar 8 dígitos via ViaCEP — gratuita e sem chave de API.'],
    checklist: ['Arquivo copiado pro projeto', 'Dependências instaladas', 'Componente funcionando'],
    stepData: [
      {
        instrucoes: 'Input de CEP com busca automática de endereço via API ViaCEP. Quando o usuário digita os 8 dígitos, o componente busca o endereço e dispara onAddressFound com os dados de rua, bairro, cidade e estado.\n\nQuando usar: formulários de endereço — checkout, cadastro de cliente, configurações de perfil. Elimina o trabalho de digitar o endereço completo.',
        blocos: [],
      },
      {
        instrucoes: 'Usa a API pública do ViaCEP — gratuita, sem necessidade de conta ou chave de API.',
        blocos: [{ titulo: 'Instalação', codigo: '# nenhuma dependência extra\n# busca usa fetch nativo para viacep.com.br' }],
      },
      {
        blocos: [{ titulo: 'CEPInput.tsx', codigo: C.cep }],
      },
      {
        instrucoes: 'Passe onChange para controlar o valor e onAddressFound para receber os dados de endereço quando o CEP for encontrado.',
        blocos: [{ titulo: 'Exemplo de uso', codigo: `import { CEPInput } from '@/components/CEPInput'

export function FormularioEndereco() {
  const [cep, setCep] = useState('')
  const [endereco, setEndereco] = useState(null)

  return (
    <CEPInput
      value={cep}
      onChange={setCep}
      onAddressFound={(dados) => setEndereco(dados)}
      onError={(msg) => console.error(msg)}
    />
  )
}` }],
        nota: '💡 onAddressFound retorna { logradouro, bairro, localidade, uf }. Use para preencher os outros campos do formulário automaticamente.',
      },
    ],
  },
  {
    id: 'telefone', titulo: 'TelefoneInput',
    descricao: 'Input com máscara de telefone brasileiro. Detecta automaticamente celular (9 dígitos) e fixo (8 dígitos).',
    grupo: 'components',
    steps: ['O que é', 'Instalação', 'Código', 'Exemplo de uso'],
    dicas: ['Detecta celular (9 dígitos) ou fixo (8 dígitos) e aplica a máscara correta automaticamente.'],
    checklist: ['Arquivo copiado pro projeto', 'Dependências instaladas', 'Componente funcionando'],
    stepData: [
      {
        instrucoes: 'Input de telefone brasileiro com máscara automática. Detecta se é celular (9 dígitos) ou fixo (8 dígitos) e aplica a máscara correta: (00) 00000-0000 para celular e (00) 0000-0000 para fixo.\n\nQuando usar: em qualquer formulário que precise de contato telefônico — cadastro, checkout, suporte.',
        blocos: [],
      },
      {
        blocos: [{ titulo: 'Instalação', codigo: '# nenhuma dependência extra necessária' }],
      },
      {
        blocos: [{ titulo: 'TelefoneInput.tsx', codigo: C.telefone }],
      },
      {
        instrucoes: 'O onChange recebe dois argumentos: value (com máscara) e type ("celular" | "fixo" | null). O type é null até o número estar completo.',
        blocos: [{ titulo: 'Exemplo de uso', codigo: `import { TelefoneInput } from '@/components/TelefoneInput'

<TelefoneInput
  value={telefone}
  onChange={(value, type) => {
    setTelefone(value)
    console.log(type) // 'celular' | 'fixo' | null
  }}
  placeholder="(00) 00000-0000"
/>` }],
        nota: "💡 O valor retornado é com máscara (ex: '(11) 99999-9999'). Para salvar no banco, limpe com value.replace(/\\D/g, '').",
      },
    ],
  },
  {
    id: 'banco-select', titulo: 'SeletorBanco',
    descricao: 'Select com os 20 principais bancos brasileiros (código + nome). Compatível com react-hook-form via Controller.',
    grupo: 'components',
    steps: ['O que é', 'Instalação', 'Código', 'Exemplo de uso'],
    dicas: ['Select com os 20 principais bancos brasileiros, incluindo código e nome abreviado.'],
    checklist: ['Arquivo copiado pro projeto', 'Dependências instaladas', 'Componente funcionando'],
    stepData: [
      {
        instrucoes: 'Select com os 20 principais bancos brasileiros com código, nome completo e nome abreviado. Útil em formulários de dados bancários e configuração de recebimento.\n\nQuando usar: cadastro de conta bancária, configuração de pagamento, transferências entre contas.',
        blocos: [],
      },
      {
        blocos: [{ titulo: 'Instalação', codigo: '# nenhuma dependência extra necessária' }],
      },
      {
        blocos: [{ titulo: 'SeletorBanco.tsx', codigo: C.seletorBanco }],
      },
      {
        instrucoes: 'O onChange retorna o objeto Banco completo ({ codigo, nome, nomeAbreviado }) ou null se nada for selecionado. Armazene o campo codigo para enviar para APIs de pagamento.',
        blocos: [{ titulo: 'Exemplo de uso', codigo: `import { SeletorBanco, Banco } from '@/components/SeletorBanco'

<SeletorBanco
  value={banco}
  onChange={(b: Banco | null) => setBanco(b?.codigo ?? '')}
  placeholder="Selecione o banco"
/>` }],
        nota: "💡 O valor retornado é o código do banco (ex: '001' para Banco do Brasil). Use para validação e envio para APIs de pagamento.",
      },
    ],
  },
  {
    id: 'pix', titulo: 'PixButton',
    descricao: 'Componente de pagamento PIX com QR Code gerado localmente (sem API externa). Gera o payload EMV/PIX e exibe QR Code via qrcode.react.',
    grupo: 'components',
    steps: ['O que é', 'Instalação', 'Código', 'Exemplo de uso'],
    dicas: ['Gera o QR Code PIX e o payload copiável direto no browser, sem API externa.'],
    dependencia: 'npm install qrcode.react',
    checklist: ['Arquivo copiado pro projeto', 'Dependências instaladas', 'Componente funcionando'],
    stepData: [
      {
        instrucoes: 'Botão de pagamento PIX que gera QR Code e payload para copia e cola. Gera o payload EMV/PIX localmente, sem API externa. Ideal para cobranças rápidas sem gateway de pagamento.\n\nQuando usar: cobranças avulsas, doações, pagamentos informais. Se precisar de PIX com confirmação automática, use o webhook do Pagar.me.',
        blocos: [],
      },
      {
        instrucoes: 'Este componente precisa da biblioteca qrcode.react para gerar o QR Code.',
        blocos: [{ titulo: 'Instalação', codigo: 'npm install qrcode.react' }],
      },
      {
        blocos: [{ titulo: 'PixButton.tsx', codigo: C.pixButton }],
      },
      {
        instrucoes: 'Passe a chave PIX (pixKey), o valor (amount), o nome do recebedor (merchantName) e a cidade (merchantCity). O componente gera o payload EMV/PIX, o QR Code e o botão de copiar automaticamente.',
        blocos: [{ titulo: 'Exemplo de uso', codigo: `import { PixButton } from '@/components/PixButton'

<PixButton
  pixKey="seu@email.com"
  amount={97.50}
  merchantName="Minha Loja"
  merchantCity="São Paulo"
  description="DevBase Boilerplate"
/>` }],
        nota: '⚠ Este componente apenas exibe o QR Code. Ele não confirma automaticamente se o pagamento foi feito. Para confirmação automática, use o webhook do Pagar.me.',
      },
    ],
  },
  {
    id: 'parcelamento-badge', titulo: 'BadgeParcelamento',
    descricao: 'Badge visual que exibe o parcelamento calculado. Mostra "em até 12x de R$ 24,75 sem juros".',
    grupo: 'components',
    steps: ['O que é', 'Instalação', 'Código', 'Exemplo de uso'],
    dicas: ['Calcula e exibe a melhor opção de parcelamento sem juros, respeitando o valor mínimo por parcela.'],
    checklist: ['Arquivo copiado pro projeto', 'Dependências instaladas', 'Componente funcionando'],
    stepData: [
      {
        instrucoes: 'Badge visual que exibe opções de parcelamento com o valor calculado por parcela. Calcula automaticamente o número máximo de parcelas respeitando o valor mínimo configurado.\n\nQuando usar: páginas de produto, checkout, cards de preço. Aumenta conversão ao deixar o parcelamento visível desde o início.',
        blocos: [],
      },
      {
        blocos: [{ titulo: 'Instalação', codigo: '# nenhuma dependência extra necessária' }],
      },
      {
        blocos: [{ titulo: 'BadgeParcelamento.tsx', codigo: C.badge }],
      },
      {
        instrucoes: 'Passe totalAmount e maxInstallments. O componente calcula o melhor parcelamento (respeitando o mínimo de R$ 10/parcela por padrão) e exibe automaticamente. Três variantes disponíveis: badge (padrão), inline e card.',
        blocos: [{ titulo: 'Exemplo de uso', codigo: `import { BadgeParcelamento } from '@/components/BadgeParcelamento'

// Badge padrão
<BadgeParcelamento totalAmount={297} maxInstallments={12} />

// Variante inline (para usar dentro de um parágrafo)
<BadgeParcelamento totalAmount={297} maxInstallments={12} variant="inline" />

// Variante card com total
<BadgeParcelamento totalAmount={297} maxInstallments={12} variant="card" showTotal />` }],
        nota: '💡 Combine com o ParcelamentoSelect para deixar o usuário escolher o número de parcelas e atualizar o badge em tempo real.',
      },
    ],
  },
  {
    id: 'parcelamento-select', titulo: 'ParcelamentoSelect',
    descricao: 'Select de parcelamento com cálculo Price. Suporta parcelas sem juros e com juros. Dependência: shadcn/ui Select.',
    grupo: 'components',
    steps: ['O que é', 'Instalação', 'Código', 'Exemplo de uso'],
    dicas: ['Select com cálculo Price correto, suportando parcelas sem juros e com juros configuráveis.'],
    dependencia: 'npx shadcn@latest add select',
    checklist: ['Arquivo copiado pro projeto', 'Dependências instaladas', 'Componente funcionando'],
    stepData: [
      {
        instrucoes: 'Select de parcelamento com cálculo automático do valor por parcela. Usa a fórmula Price para parcelas com juros, ou divisão simples para sem juros. A opção 1x (à vista) nunca tem juros.\n\nQuando usar: checkout com cartão de crédito. O usuário escolhe quantas parcelas quer e vê o valor calculado automaticamente.',
        blocos: [],
      },
      {
        instrucoes: 'Depende do componente Select do shadcn/ui.',
        blocos: [{ titulo: 'Instalação', codigo: 'npx shadcn@latest add select' }],
      },
      {
        blocos: [{ titulo: 'ParcelamentoSelect.tsx', codigo: C.parcelamento }],
      },
      {
        instrucoes: 'Passe valorTotal e jurosMensais (0 = sem juros). O onChange recebe dois argumentos: o número de parcelas selecionado e o objeto ParcelamentoOption com valorParcela, valorTotalComJuros e temJuros.',
        blocos: [{ titulo: 'Exemplo de uso', codigo: `import { ParcelamentoSelect } from '@/components/ParcelamentoSelect'

// Sem juros
<ParcelamentoSelect
  valorTotal={297}
  maxParcelas={12}
  value={parcelas}
  onChange={(n, opcao) => setParcelas(String(n))}
/>

// Com juros de 1,99% ao mês
<ParcelamentoSelect
  valorTotal={297}
  maxParcelas={12}
  jurosMensais={1.99}
  value={parcelas}
  onChange={(n, opcao) => {
    setParcelas(String(n))
    setTotalFinal(opcao.valorTotalComJuros)
  }}
/>` }],
        nota: '💡 jurosMensais é mensal: 1.99 = 1,99% ao mês. Para sem juros, passe jurosMensais={0} ou omita o prop.',
      },
    ],
  },
  {
    id: 'cartao', titulo: 'CartaoForm',
    descricao: 'Formulário completo de cartão de crédito. Detecta bandeira pelo BIN, aplica máscara e valida com algoritmo de Luhn.',
    grupo: 'components',
    steps: ['O que é', 'Instalação', 'Código', 'Exemplo de uso'],
    dicas: ['Detecção de bandeira por BIN, máscara automática e validação Luhn em tempo real.'],
    checklist: ['Arquivo copiado pro projeto', 'Dependências instaladas', 'Componente funcionando'],
    stepData: [
      {
        instrucoes: 'Formulário completo de cartão de crédito com validação via algoritmo de Luhn. Valida número, data de validade e CVV em tempo real. Detecta a bandeira automaticamente (Visa, Mastercard, Elo, Amex, Hipercard) pelo BIN (primeiros dígitos).\n\nQuando usar: checkout com cartão de crédito integrado ao Pagar.me ou outro gateway. Não processa o pagamento — só coleta e valida os dados.',
        blocos: [],
      },
      {
        instrucoes: 'Este componente não tem dependências externas — validação Luhn implementada internamente.',
        blocos: [{ titulo: 'Instalação', codigo: '# nenhuma dependência extra\n# validação Luhn implementada internamente' }],
      },
      {
        blocos: [{ titulo: 'CartaoInput.tsx', codigo: C.cartao }],
      },
      {
        instrucoes: 'Use CartaoForm para o formulário completo. O onValidChange dispara quando todos os campos estão válidos — use para habilitar/desabilitar o botão de comprar. O onChange recebe o objeto CartaoData com numero, nomeTitular, validade, cvv e bandeira detectada.',
        blocos: [{ titulo: 'Exemplo de uso', codigo: `import { CartaoForm, CartaoData } from '@/components/CartaoInput'

const [cartao, setCartao] = useState<CartaoData>({
  numero: '', nomeTitular: '', validade: '', cvv: '', bandeira: 'desconhecida'
})
const [canSubmit, setCanSubmit] = useState(false)

<CartaoForm
  value={cartao}
  onChange={setCartao}
  onValidChange={(isValid) => setCanSubmit(isValid)}
/>` }],
        nota: '⚠ Nunca envie dados de cartão diretamente para seu servidor sem tokenização. Use o SDK do Pagar.me no frontend para tokenizar o cartão antes de enviar.',
      },
    ],
  },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function DownloadButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      download
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: '#6366f1',
        color: '#fff',
        borderRadius: '8px',
        padding: '12px 20px',
        fontSize: '14px',
        fontWeight: '600',
        fontFamily: 'var(--mono)',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'background .15s ease',
        width: 'fit-content',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#5558e8' }}
      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#6366f1' }}
    >
      <Download size={15} />
      {label}
    </a>
  )
}

function SidebarLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <svg width="28" height="28" viewBox="0 0 64 64" fill="none" style={{ flexShrink: 0 }}>
        <rect width="64" height="64" rx="12" fill="#6366f1" />
        <path d="M32 12 L50 22 L32 32 L14 22 Z" fill="#fff" />
        <path d="M14 22 L32 32 L32 50 L14 40 Z" fill="#fff" opacity=".85" />
        <path d="M50 22 L32 32 L32 50 L50 40 Z" fill="#fff" opacity=".55" />
        <line x1="12" y1="55" x2="52" y2="55" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".6" />
      </svg>
      <span style={{ fontFamily: 'var(--mono)', fontSize: '15px', fontWeight: '600', color: '#ffffff', letterSpacing: '-0.2px' }}>
        dev<span style={{ color: '#6366f1' }}>/</span>base
      </span>
    </div>
  )
}

function CopyBlock({ titulo, codigo }: Bloco) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(codigo)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = codigo
      ta.style.cssText = 'position:fixed;opacity:0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ background: '#0f0f0f', border: '1px solid #1e1e1e', borderRadius: '10px', overflow: 'hidden' }}>
      <div style={{
        background: '#111',
        borderBottom: '1px solid #1e1e1e',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
      }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: '#6b7280', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {titulo}
        </span>
        <button
          onClick={handleCopy}
          style={{
            background: copied ? 'rgba(34,197,94,0.1)' : '#1a1a1a',
            border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : '#2a2a2a'}`,
            borderRadius: '6px',
            color: copied ? '#22c55e' : '#6b7280',
            fontFamily: 'var(--mono)',
            fontSize: '11px',
            padding: '4px 10px',
            cursor: 'pointer',
            transition: 'all .15s ease',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {copied ? 'Copiado ✓' : 'Copiar'}
        </button>
      </div>
      <div style={{ padding: '20px', overflowX: 'auto' }}>
        <pre style={{ margin: 0, fontFamily: 'var(--mono)', fontSize: '14px', color: '#e5e7eb', lineHeight: '1.7', whiteSpace: 'pre' }}>
          {codigo}
        </pre>
      </div>
    </div>
  )
}

function InstrucaoBlock({ text }: { text: string }) {
  type Group = { type: 'ol'; items: string[] } | { type: 'p'; content: string }

  const groups: Group[] = []
  for (const raw of text.split('\n')) {
    const line = raw.trimEnd()
    const m = line.match(/^(\d+)\.\s+(.+)/)
    if (m) {
      const last = groups[groups.length - 1]
      if (last && last.type === 'ol') {
        last.items.push(m[2])
      } else {
        groups.push({ type: 'ol', items: [m[2]] })
      }
    } else if (line.trim()) {
      groups.push({ type: 'p', content: line.trim() })
    }
  }

  const proseStyle: React.CSSProperties = {
    margin: '0 0 8px 0',
    fontSize: '14px',
    color: '#9ca3af',
    lineHeight: '1.7',
    fontFamily: 'Inter, sans-serif',
  }

  return (
    <div style={{ marginBottom: '16px' }}>
      {groups.map((g, i) =>
        g.type === 'ol' ? (
          <ol key={i} style={{ margin: '0 0 8px 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {g.items.map((item, j) => (
              <li key={j} style={{ display: 'flex', gap: '8px', ...proseStyle, margin: 0 }}>
                <span style={{ color: '#6366f1', flexShrink: 0, fontWeight: 600 }}>{j + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p key={i} style={proseStyle}>{g.content}</p>
        )
      )}
    </div>
  )
}

function NotaBlock({ text }: { text: string }) {
  const isWarning = text.startsWith('⚠')
  return (
    <div style={{
      marginTop: '12px', padding: '10px 14px', borderRadius: '8px',
      background: isWarning ? 'rgba(234,179,8,0.06)' : 'rgba(99,102,241,0.06)',
      border: `1px solid ${isWarning ? 'rgba(234,179,8,0.2)' : 'rgba(99,102,241,0.2)'}`,
    }}>
      <p style={{
        margin: 0, fontFamily: 'var(--mono)', fontSize: '13px',
        color: isWarning ? '#fbbf24' : '#a5b4fc', lineHeight: '1.7',
      }}>{text}</p>
    </div>
  )
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

function Sidebar({
  modulos, ativoId, onSelect, produto, checks, progress, email,
}: {
  modulos: Modulo[]
  ativoId: string
  onSelect: (id: string) => void
  produto: Produto
  checks: Record<string, boolean[]>
  progress: number
  email: string
}) {
  const boilerplateModulos = modulos.filter(m => m.grupo === 'boilerplate')
  const componentsModulos = modulos.filter(m => m.grupo === 'components')

  function isComplete(m: Modulo): boolean {
    if (m.checklist.length === 0) return false
    const mc = checks[m.id]
    if (!mc) return false
    return mc.slice(0, m.checklist.length).every(Boolean)
  }

  function GroupLabel({ label }: { label: string }) {
    return (
      <p style={{
        fontFamily: 'var(--mono)',
        fontSize: '11px',
        color: '#6366f1',
        letterSpacing: '0.6px',
        padding: '16px 24px 6px',
        margin: 0,
        textTransform: 'lowercase',
      }}>
        {label}
      </p>
    )
  }

  function Item({ m }: { m: Modulo }) {
    const ativo = m.id === ativoId
    const complete = isComplete(m)

    return (
      <button
        onClick={() => onSelect(m.id)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          width: '100%',
          textAlign: 'left',
          padding: '11px 24px',
          background: ativo ? '#12122a' : 'transparent',
          border: 'none',
          borderLeft: `2px solid ${ativo ? '#6366f1' : 'transparent'}`,
          cursor: 'pointer',
          transition: 'background .15s ease',
        }}
        onMouseEnter={e => { if (!ativo) (e.currentTarget as HTMLButtonElement).style.background = '#111' }}
        onMouseLeave={e => { if (!ativo) (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
      >
        <span style={{ color: ativo ? '#6366f1' : '#4b5563', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          {ICONS[m.id]}
        </span>
        <span style={{ flex: 1, fontSize: '14px', color: ativo ? '#e5e7eb' : '#6b7280' }}>
          {m.titulo}
        </span>
        {complete && (
          <span style={{ color: '#22c55e', fontSize: '12px', flexShrink: 0 }}>✓</span>
        )}
      </button>
    )
  }

  return (
    <aside style={{
      width: '320px',
      flexShrink: 0,
      background: '#0d0d0d',
      borderRight: '1px solid #1e1e1e',
      display: 'flex',
      flexDirection: 'column',
      position: 'sticky',
      top: '64px',
      height: 'calc(100vh - 64px)',
      overflowY: 'auto',
    }}>
      {/* Header */}
      <div style={{ padding: '20px', borderBottom: '1px solid #1e1e1e', flexShrink: 0 }}>
        <SidebarLogo />
        <div style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: '#4b5563' }}>progresso</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: '#6366f1' }}>{progress}%</span>
          </div>
          <div style={{ height: '3px', background: '#1e1e1e', borderRadius: '2px' }}>
            <div style={{
              height: '100%',
              background: '#6366f1',
              borderRadius: '2px',
              width: `${progress}%`,
              transition: 'width 0.3s ease',
            }} />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, paddingTop: '4px' }}>
        {produto === 'combo' ? (
          <>
            <GroupLabel label="// boilerplate" />
            {boilerplateModulos.map(m => <Item key={m.id} m={m} />)}
            <div style={{ height: '1px', background: '#1e1e1e', margin: '8px 24px' }} />
            <GroupLabel label="// components" />
            {componentsModulos.map(m => <Item key={m.id} m={m} />)}
          </>
        ) : (
          <>
            <GroupLabel label={`// ${produto}`} />
            {modulos.map(m => <Item key={m.id} m={m} />)}
          </>
        )}
      </nav>

      {/* Footer */}
      <div style={{ padding: '12px 24px', borderTop: '1px solid #1e1e1e', flexShrink: 0 }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: '#3f3f46', margin: 0, wordBreak: 'break-all' }}>
          {email}
        </p>
      </div>
    </aside>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

interface AcessoState {
  email: string
  produto: Produto
}

export default function AcessoPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [acesso, setAcesso] = useState<AcessoState | null>(null)
  const [ativoId, setAtivoId] = useState('')
  const [stepAtivo, setStepAtivo] = useState<Record<string, number>>({})
  const [checks, setChecks] = useState<Record<string, boolean[]>>({})

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.replace('/acesso/login'); return }

      const email = session.user.email!
      const { data } = await supabase
        .from('acessos')
        .select('produto')
        .eq('email', email)
        .single()

      if (!data) { router.replace('/acesso/login'); return }

      const produto = (data.produto as Produto) || 'boilerplate'
      setAcesso({ email, produto })

      const firstId =
        produto === 'components'
          ? MODULOS_COMPONENTS[0].id
          : MODULOS_BOILERPLATE[0].id
      setAtivoId(firstId)

      try {
        const saved = localStorage.getItem(`devbase-progress-${email}`)
        if (saved) setChecks(JSON.parse(saved))
      } catch { /* ignore */ }

      await supabase
        .from('acessos')
        .update({ ultimo_acesso: new Date().toISOString() })
        .eq('email', email)

      setLoading(false)
    }
    init()
  }, [router])

  useEffect(() => {
    if (!acesso?.email) return
    try {
      localStorage.setItem(`devbase-progress-${acesso.email}`, JSON.stringify(checks))
    } catch { /* ignore */ }
  }, [checks, acesso?.email])

  if (loading) {
    return (
      <div style={{
        height: 'calc(100vh - 64px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#0a0a0a',
      }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: '#6b7280' }}>
          // carregando plataforma...
        </p>
      </div>
    )
  }

  if (!acesso) return null

  const { produto } = acesso
  const modulos =
    produto === 'boilerplate' ? MODULOS_BOILERPLATE
    : produto === 'components' ? MODULOS_COMPONENTS
    : [...MODULOS_BOILERPLATE, ...MODULOS_COMPONENTS]

  const moduloAtivo = modulos.find(m => m.id === ativoId) ?? modulos[0]

  function getModuleChecks(moduloId: string, length: number): boolean[] {
    const mc = checks[moduloId]
    if (!mc) return new Array(length).fill(false)
    if (mc.length >= length) return mc.slice(0, length)
    return [...mc, ...new Array(length - mc.length).fill(false)]
  }

  const totalChecks = modulos.reduce((sum, m) => sum + m.checklist.length, 0)
  const checkedCount = modulos.reduce((sum, m) => {
    const mc = getModuleChecks(m.id, m.checklist.length)
    return sum + mc.filter(Boolean).length
  }, 0)
  const progress = totalChecks > 0 ? Math.round(checkedCount / totalChecks * 100) : 0

  function handleCheck(moduloId: string, index: number, value: boolean) {
    const m = modulos.find(x => x.id === moduloId)
    if (!m) return
    const mc = getModuleChecks(moduloId, m.checklist.length)
    const next = [...mc]
    next[index] = value
    setChecks(prev => ({ ...prev, [moduloId]: next }))
  }

  const currentStepIndex = Math.min(
    stepAtivo[moduloAtivo.id] ?? 0,
    moduloAtivo.stepData.length - 1
  )
  const currentStepData = moduloAtivo.stepData[currentStepIndex]

  const grupoModulos = modulos.filter(m => m.grupo === moduloAtivo.grupo)
  const grupoIndex = grupoModulos.indexOf(moduloAtivo) + 1
  const tagLabel = `// ${moduloAtivo.grupo} · módulo ${grupoIndex} de ${grupoModulos.length}`

  const currentChecks = getModuleChecks(moduloAtivo.id, moduloAtivo.checklist.length)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', background: '#0a0a0a' }}>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

      <Sidebar
        modulos={modulos}
        ativoId={moduloAtivo.id}
        onSelect={setAtivoId}
        produto={produto}
        checks={checks}
        progress={progress}
        email={acesso.email}
      />

      {/* Main content */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '36px 48px' }}>

        {/* Module header */}
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: '#6366f1', letterSpacing: '0.4px', margin: '0 0 8px' }}>
            {tagLabel}
          </p>
          <h1 style={{ margin: '0 0 8px', fontSize: '30px', fontWeight: '700', letterSpacing: '-0.5px', color: '#fff' }}>
            {moduloAtivo.titulo}
          </h1>
          <p style={{ margin: 0, fontSize: '16px', color: '#6b7280', lineHeight: '1.6' }}>
            {moduloAtivo.descricao}
          </p>
        </div>

        {/* Downloads (combo only) */}
        {produto === 'combo' && (
          <div style={{
            background: '#0f0f0f',
            border: '1px solid #1e1e1e',
            borderRadius: '10px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px',
          }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: '#6366f1', flexShrink: 0 }}>
              // seus downloads
            </span>
            <div style={{ display: 'flex', gap: '12px' }}>
              <DownloadButton href="/downloads/devbase-boilerplate.zip" label="Baixar Boilerplate" />
              <DownloadButton href="/downloads/devbase-components.zip" label="Baixar Components" />
            </div>
          </div>
        )}

        {/* Dica contextual */}
        {moduloAtivo.dicas && (
          <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: '1.7', margin: '0 0 20px', maxWidth: '700px' }}>
            {moduloAtivo.grupo === 'components'
              ? moduloAtivo.dicas[0]
              : moduloAtivo.dicas[currentStepIndex]}
          </p>
        )}

        {/* Step pills */}
        {moduloAtivo.steps.length > 1 && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {moduloAtivo.steps.map((step, i) => {
              const isAtivo = i === currentStepIndex
              return (
                <button
                  key={i}
                  onClick={() => setStepAtivo(prev => ({ ...prev, [moduloAtivo.id]: i }))}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: isAtivo ? '#12122a' : '#0f0f0f',
                    border: `1px solid ${isAtivo ? '#6366f1' : '#1e1e1e'}`,
                    borderRadius: '20px',
                    padding: '5px 12px',
                    cursor: 'pointer',
                    color: isAtivo ? '#a5b4fc' : '#6b7280',
                    fontFamily: 'var(--mono)',
                    fontSize: '13px',
                    transition: 'all .15s ease',
                  }}
                >
                  <span style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: isAtivo ? '#6366f1' : '#1e1e1e',
                    color: isAtivo ? '#fff' : '#6b7280',
                    fontSize: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontFamily: 'var(--mono)',
                  }}>
                    {i + 1}
                  </span>
                  {step}
                </button>
              )
            })}
          </div>
        )}

        {/* Download button */}
        {currentStepData?.downloadHref && (
          <div style={{ marginBottom: '20px' }}>
            <DownloadButton href={currentStepData.downloadHref} label={currentStepData.downloadLabel!} />
          </div>
        )}

        {/* Dependência necessária (componentes com pacote extra) */}
        {moduloAtivo.dependencia && (
          <div style={{ marginBottom: '16px' }}>
            <CopyBlock titulo="dependência necessária" codigo={moduloAtivo.dependencia} />
          </div>
        )}

        {/* Instrucoes */}
        {currentStepData?.instrucoes && <InstrucaoBlock text={currentStepData.instrucoes} />}

        {/* Code blocks */}
        {currentStepData?.blocos.map((bloco, i) => (
          <div key={i} style={{ marginBottom: i < currentStepData.blocos.length - 1 ? '16px' : 0 }}>
            <CopyBlock titulo={bloco.titulo} codigo={bloco.codigo} />
          </div>
        ))}

        {/* Nota */}
        {currentStepData?.nota && <NotaBlock text={currentStepData.nota} />}

        {/* Checklist */}
        {moduloAtivo.checklist.length > 0 && (
          <div style={{ marginTop: '24px', background: '#0f0f0f', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '16px 20px' }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: '#6b7280', margin: '0 0 12px' }}>
              // checklist deste módulo
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {moduloAtivo.checklist.map((item, i) => {
                const checked = currentChecks[i] ?? false
                return (
                  <div
                    key={i}
                    onClick={() => handleCheck(moduloAtivo.id, i, !checked)}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                  >
                    <span style={{
                      width: '16px',
                      height: '16px',
                      border: `1px solid ${checked ? '#6366f1' : '#2a2a2a'}`,
                      borderRadius: '4px',
                      background: checked ? '#6366f1' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all .15s ease',
                    }}>
                      {checked && (
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <polyline points="2 6 5 9 10 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span style={{
                      fontSize: '15px',
                      color: checked ? '#4b5563' : '#e5e7eb',
                      textDecoration: checked ? 'line-through' : 'none',
                      transition: 'color .15s ease',
                      userSelect: 'none',
                    }}>
                      {item}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

      </main>
      </div>
    </div>
  )
}
