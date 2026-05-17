import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserPlus, LogIn, Search, ShieldCheck, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-7xl font-headline font-bold text-primary tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-1000">
            HIRELS
          </h1>
          <p className="text-xl text-muted-foreground font-medium max-w-lg mx-auto leading-relaxed">
            Local service professionals at your fingertips. From teachers to plumbers, find exactly who you need.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <Button asChild size="lg" className="flex-1 h-14 text-lg font-semibold bg-primary hover:bg-primary/90">
            <Link href="/login" className="flex items-center gap-2">
              <LogIn className="w-5 h-5" /> Login
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="flex-1 h-14 text-lg font-semibold border-primary text-primary hover:bg-primary/10">
            <Link href="/register" className="flex items-center gap-2">
              <UserPlus className="w-5 h-5" /> Register
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 text-left animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
          <div className="p-6 rounded-2xl bg-white shadow-sm border space-y-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-headline font-bold text-lg">Location Search</h3>
            <p className="text-sm text-muted-foreground">Find professionals right in your neighborhood using PIN code search.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white shadow-sm border space-y-3">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-headline font-bold text-lg">Verified Skills</h3>
            <p className="text-sm text-muted-foreground">View high-quality certificates and verified credentials of service providers.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white shadow-sm border space-y-3">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-headline font-bold text-lg">Direct Leads</h3>
            <p className="text-sm text-muted-foreground">Connect instantly via WhatsApp bridge for quick communication.</p>
          </div>
        </div>
      </main>
      
      <footer className="p-8 text-center border-t bg-white">
        <p className="text-sm text-muted-foreground font-medium">© 2024 HIRELS. All rights reserved.</p>
      </footer>
    </div>
  );
}