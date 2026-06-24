'use client';

import React, { useState } from 'react';
import { Mail, Lock, Camera, User, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [protocol, setProtocol] = useState<'client' | 'provider'>('client');

  return (
    <div className="min-h-screen bg-[#fcfdfe] flex flex-col items-center pt-8 pb-12 px-6">
      {/* Logo Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-headline font-black italic text-primary tracking-tighter leading-none mb-1">
          HIRELS
        </h1>
        <p className="text-[10px] font-medium tracking-[0.3em] text-[#94a3b8] uppercase">
          Local Intelligence Network
        </p>
      </div>

      {/* Main Auth Toggle */}
      <div className="w-full max-w-sm bg-white rounded-full p-1 shadow-sm border border-slate-100 flex items-center mb-8">
        <button
          onClick={() => setActiveTab('login')}
          className={`flex-1 py-3 rounded-full text-xs font-bold transition-all ${
            activeTab === 'login'
              ? 'bg-primary text-white shadow-md'
              : 'text-[#94a3b8] hover:text-slate-600'
          }`}
        >
          LOGIN
        </button>
        <button
          onClick={() => setActiveTab('signup')}
          className={`flex-1 py-3 rounded-full text-xs font-bold transition-all ${
            activeTab === 'signup'
              ? 'bg-primary text-white shadow-md'
              : 'text-[#94a3b8] hover:text-slate-600'
          }`}
        >
          SIGN UP
        </button>
      </div>

      {activeTab === 'login' ? (
        /* Login Card */
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
                  className="bg-[#f8fafc] border border-slate-200 h-14 rounded-2xl px-5 text-slate-600 placeholder:text-slate-300 focus-visible:ring-primary/20"
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
                  className="bg-[#f8fafc] border border-slate-200 h-14 rounded-2xl px-5 text-slate-600 placeholder:text-slate-300 focus-visible:ring-primary/20"
                />
              </div>

              <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-widest mt-4 shadow-lg shadow-primary/20">
                Authenticate
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Sign Up Card */
        <Card className="w-full max-w-md border-none shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem] bg-white overflow-hidden">
          <CardContent className="pt-8 pb-10 px-8 flex flex-col">
            {/* Protocol Selector */}
            <div className="mb-8">
              <Label className="text-[9px] font-bold text-[#94a3b8] uppercase tracking-[0.15em] mb-3 block ml-1">
                Choose Protocol
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setProtocol('client')}
                  className={`py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest border-2 transition-all ${
                    protocol === 'client'
                      ? 'border-primary text-primary bg-primary/5'
                      : 'border-slate-50 text-[#cbd5e1] bg-slate-50/50'
                  }`}
                >
                  Client
                </button>
                <button
                  onClick={() => setProtocol('provider')}
                  className={`py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest border-2 transition-all ${
                    protocol === 'provider'
                      ? 'border-primary text-primary bg-primary/5'
                      : 'border-slate-50 text-[#cbd5e1] bg-slate-50/50'
                  }`}
                >
                  Provider
                </button>
              </div>
            </div>

            {/* Profile Picture Placeholder */}
            <div className="flex justify-center mb-8 relative">
              <div className="w-24 h-24 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-200">
                <User size={40} strokeWidth={1} />
              </div>
              <button className="absolute bottom-0 right-[35%] w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white border-4 border-white shadow-sm hover:scale-105 transition-transform">
                <Camera size={14} />
              </button>
            </div>

            {/* Registration Form */}
            <div className="space-y-5">
              <div className="space-y-1.5">
                <Label className="text-[9px] font-bold text-[#94a3b8] uppercase tracking-wider ml-1">
                  Full Name
                </Label>
                <Input
                  placeholder="John Doe"
                  className="bg-[#f8fafc] border border-slate-200 h-14 rounded-2xl px-5 text-slate-600 placeholder:text-slate-300 focus-visible:ring-primary/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-[9px] font-bold text-[#94a3b8] uppercase tracking-wider ml-1">
                    Age
                  </Label>
                  <Input
                    type="number"
                    placeholder="25"
                    className="bg-[#f8fafc] border border-slate-200 h-14 rounded-2xl px-5 text-slate-600 placeholder:text-slate-300 focus-visible:ring-primary/20"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[9px] font-bold text-[#94a3b8] uppercase tracking-wider ml-1">
                    Gender
                  </Label>
                  <div className="h-14 bg-[#f8fafc] border border-slate-200 rounded-2xl flex items-center px-4">
                    <RadioGroup defaultValue="m" className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="m" id="m" className="text-primary border-slate-300" />
                        <Label htmlFor="m" className="text-[11px] font-black text-slate-600">M</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="f" id="f" className="text-primary border-slate-300" />
                        <Label htmlFor="f" className="text-[11px] font-black text-slate-600">F</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[9px] font-bold text-[#94a3b8] uppercase tracking-wider ml-1">
                  Email
                </Label>
                <Input
                  type="email"
                  placeholder="email@address.com"
                  className="bg-[#f8fafc] border border-slate-200 h-14 rounded-2xl px-5 text-slate-600 placeholder:text-slate-300 focus-visible:ring-primary/20"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[9px] font-bold text-[#94a3b8] uppercase tracking-wider ml-1">
                  Password
                </Label>
                <Input
                  type="password"
                  placeholder="Min. 6 characters"
                  className="bg-[#f8fafc] border border-slate-200 h-14 rounded-2xl px-5 text-slate-600 placeholder:text-slate-300 focus-visible:ring-primary/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-[9px] font-bold text-[#94a3b8] uppercase tracking-wider ml-1">
                    Phone
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#cbd5e1]" size={14} />
                    <Input
                      placeholder="10 Digits"
                      className="bg-[#f8fafc] border border-slate-200 h-14 rounded-2xl pl-10 pr-5 text-slate-600 placeholder:text-slate-300 focus-visible:ring-primary/20"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[9px] font-bold text-[#94a3b8] uppercase tracking-wider ml-1">
                    Pin Code
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#cbd5e1]" size={14} />
                    <Input
                      placeholder="6 Digits"
                      className="bg-[#f8fafc] border border-slate-200 h-14 rounded-2xl pl-10 pr-5 text-slate-600 placeholder:text-slate-300 focus-visible:ring-primary/20"
                    />
                  </div>
                </div>
              </div>

              <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-widest mt-6 shadow-lg shadow-primary/20">
                Register Node
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
