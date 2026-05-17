import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { User, Briefcase, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RegisterSelection() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-8 bg-background">
      <div className="w-full max-w-4xl space-y-4">
        <Button asChild variant="ghost" size="sm" className="mb-4">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
        </Button>
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-headline font-bold text-primary">Join HIRELS</h1>
          <p className="text-muted-foreground">Choose how you want to use the platform</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl animate-in slide-in-from-bottom-4 duration-500">
        <Link href="/register/client" className="group">
          <Card className="h-full border-2 transition-all hover:border-primary hover:shadow-xl group-hover:scale-[1.02]">
            <CardHeader className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <User className="w-10 h-10" />
              </div>
              <CardTitle className="text-2xl font-headline">I am a Client</CardTitle>
              <CardDescription className="text-base">
                I want to find and hire professionals for my needs.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pb-8">
              <ul className="text-sm text-muted-foreground space-y-2 mb-6 text-left max-w-[200px] mx-auto">
                <li className="flex items-center gap-2">• Search by PIN code</li>
                <li className="flex items-center gap-2">• Browse categories</li>
                <li className="flex items-center gap-2">• Direct WhatsApp bridge</li>
              </ul>
              <Button className="w-full bg-primary font-bold">Register as Client</Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/register/professional" className="group">
          <Card className="h-full border-2 transition-all hover:border-secondary hover:shadow-xl group-hover:scale-[1.02]">
            <CardHeader className="text-center space-y-4">
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
                <Briefcase className="w-10 h-10" />
              </div>
              <CardTitle className="text-2xl font-headline text-secondary">I am a Professional</CardTitle>
              <CardDescription className="text-base">
                I want to offer my services and find new clients.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pb-8">
              <ul className="text-sm text-muted-foreground space-y-2 mb-6 text-left max-w-[200px] mx-auto">
                <li className="flex items-center gap-2">• Build your profile</li>
                <li className="flex items-center gap-2">• Upload certificates</li>
                <li className="flex items-center gap-2">• AI-powered descriptions</li>
              </ul>
              <Button className="w-full bg-secondary hover:bg-secondary/90 font-bold">Register as Professional</Button>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}