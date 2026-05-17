"use client";

import { useState, useMemo } from 'react';
import { MOCK_PROFESSIONALS, Professional } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Briefcase, MessageSquare, Star, Verified, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pinFilter, setPinFilter] = useState('');

  const filteredProfessionals = useMemo(() => {
    return MOCK_PROFESSIONALS.filter(p => {
      const matchesSearch = p.workType.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPin = p.pincode.includes(pinFilter);
      return matchesSearch && matchesPin;
    });
  }, [searchTerm, pinFilter]);

  const openWhatsApp = (whatsapp: string, name: string) => {
    const message = encodeURIComponent(`Hi ${name}, I found your profile on HIRELS and I'm interested in your services.`);
    window.open(`https://wa.me/${whatsapp}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-headline font-bold text-primary">HIRELS</Link>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-sm font-medium text-muted-foreground">Welcome, User</span>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Logout</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Search Section */}
        <section className="bg-primary/5 p-6 rounded-3xl border border-primary/10 space-y-4">
          <h2 className="text-2xl font-headline font-bold text-primary">Find a Professional</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="What work do you need? (e.g. Plumber)" 
                className="pl-10 h-12 rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="PIN Code (e.g. 411038)" 
                className="pl-10 h-12 rounded-xl"
                value={pinFilter}
                onChange={(e) => setPinFilter(e.target.value)}
                maxLength={6}
              />
            </div>
            <Button className="h-12 rounded-xl font-bold bg-secondary hover:bg-secondary/90 text-white shadow-lg">
              Search Local Experts
            </Button>
          </div>
        </section>

        {/* Results Directory */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-headline font-bold">Top Professionals Near You</h3>
            <span className="text-sm text-muted-foreground">{filteredProfessionals.length} results found</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessionals.map((prof) => (
              <Card key={prof.id} className="overflow-hidden border-2 transition-all hover:shadow-xl hover:border-primary/20 flex flex-col">
                <div className="relative h-48">
                  <img 
                    src={prof.imageUrl} 
                    alt={prof.name} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <Badge className="bg-white/90 text-primary font-bold shadow-sm backdrop-blur">
                      {prof.charge}
                    </Badge>
                    {prof.certificates > 0 && (
                      <Badge className="bg-secondary text-white font-bold shadow-sm flex items-center gap-1">
                        <Verified className="w-3 h-3" /> Verified
                      </Badge>
                    )}
                  </div>
                </div>
                
                <CardContent className="p-5 flex-1 flex flex-col space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-xl font-bold font-headline">{prof.name}</h4>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-bold text-foreground">{prof.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-semibold mt-1">
                      <Briefcase className="w-4 h-4" />
                      <span className="text-sm">{prof.workType}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground mt-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs">{prof.location} • {prof.pincode}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {prof.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {prof.skills.map((skill, i) => (
                      <Badge key={i} variant="outline" className="text-[10px] font-medium py-0 px-2">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="pt-4 mt-auto">
                    <Button 
                      onClick={() => openWhatsApp(prof.whatsapp, prof.name)}
                      className="w-full h-11 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold flex items-center justify-center gap-2 transition-colors rounded-xl"
                    >
                      <MessageSquare className="w-4 h-4" /> WhatsApp Lead Bridge
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProfessionals.length === 0 && (
            <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
              <h3 className="text-xl font-bold opacity-50">No experts found matching your criteria</h3>
              <p className="text-muted-foreground">Try broadening your search or using a different PIN code</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}