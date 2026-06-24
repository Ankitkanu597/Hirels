'use client';

import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen bg-[#fcfdfe] flex flex-col items-center pt-12 px-6">
      {/* Logo Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-black italic text-primary tracking-tighter leading-none mb-1">
          HIRELS
        </h1>
        <p className="text-[10px] font-medium tracking-[0.3em] text-[#94a3b8] uppercase">
          Local Intelligence Network
        </p>
      </div>

      {/* Auth Toggle */}
      <div className="w-full max-w-sm bg-white rounded-full p-1 shadow-sm border border-slate-100 flex items-center mb-10">
        <button
          onClick={() => setActiveTab('login')}
          className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'login'
              ? 'bg-primary text-white shadow-md'
              : 'text-[#94a3b8] hover:text-slate-600'
          }`}
        >
          LOGIN
        </button>
        <button
          onClick={() => setActiveTab('signup')}
          className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'signup'
              ? 'bg-primary text-white shadow-md'
              : 'text-[#94a3b8] hover:text-slate-600'
          }`}
        >
          SIGN UP
        </button>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-sm border-none shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem] bg-white overflow-hidden">
        <CardContent className="pt-10 pb-12 px-8 flex flex-col items-center">
          <h2 className="text-2xl font-headline font-black italic text-[#1e293b] mb-1 tracking-tight">
            WELCOME BACK
          </h2>
          <p className="text-[9px] font-bold tracking-[0.2em] text-[#cbd5e1] uppercase mb-12">
            Identify Node
          </p>

          <div className="w-full space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#94a3b8] mb-1">
                <Mail size={14} strokeWidth={2.5} />
                <Label className="text-[10px] font-bold uppercase tracking-wider opacity-70">
                  Email
                </Label>
              </div>
              <Input
                type="email"
                placeholder="name@example.com"
                className="bg-[#f8fafc] border-none h-14 rounded-2xl px-5 text-slate-600 placeholder:text-slate-300 focus-visible:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#94a3b8] mb-1">
                <Lock size={14} strokeWidth={2.5} />
                <Label className="text-[10px] font-bold uppercase tracking-wider opacity-70">
                  Password
                </Label>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                className="bg-[#f8fafc] border-none h-14 rounded-2xl px-5 text-slate-600 placeholder:text-slate-300 focus-visible:ring-primary/20"
              />
            </div>

            <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-widest mt-4 shadow-lg shadow-primary/20">
              Authenticate
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
