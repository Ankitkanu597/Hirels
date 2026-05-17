"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Loader2, Sparkles, Upload, X } from 'lucide-react';
import Link from 'next/link';
import { generateProfessionalServiceDescription } from '@/ai/flows/professionals-service-description-generator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export default function ProfessionalRegister() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [certificates, setCertificates] = useState<string[]>([]);
  
  // Form State
  const [serviceType, setServiceType] = useState('');
  const [skills, setSkills] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (certificates.length + files.length > 2) {
      toast({
        title: "Limit reached",
        description: "You can upload a maximum of 2 certificates.",
        variant: "destructive"
      });
      return;
    }

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCertificates(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const generateWithAi = async () => {
    if (!serviceType || !skills) {
      toast({
        title: "Missing Information",
        description: "Please enter your service type and skills first.",
        variant: "destructive"
      });
      return;
    }

    setAiLoading(true);
    try {
      const result = await generateProfessionalServiceDescription({
        serviceType,
        skills: skills.split(',').map(s => s.trim()),
        certificateDataUris: certificates
      });
      setDescription(result.serviceDescription);
      setTags(result.tags);
      toast({
        title: "Description Generated!",
        description: "AI has crafted a professional profile for you.",
      });
    } catch (error) {
      toast({
        title: "AI Generation Failed",
        description: "Could not generate description. Please try again.",
        variant: "destructive"
      });
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen py-12 px-6 flex flex-col items-center bg-background">
      <div className="w-full max-w-2xl mb-6">
        <Button asChild variant="ghost" size="sm">
          <Link href="/register">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Link>
        </Button>
      </div>

      <Card className="w-full max-w-2xl shadow-lg border-t-4 border-t-secondary">
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-secondary">Professional Registration</CardTitle>
          <CardDescription>Create your professional profile and reach more clients</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-8">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold border-b pb-2">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Expert Name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="expert@example.com" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp Number</Label>
                  <Input id="whatsapp" type="tel" placeholder="+91 XXXXX XXXXX" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select required>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" min="18" max="100" required />
                </div>
              </div>
            </div>

            {/* Service Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold border-b pb-2">Service Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="workType">Service Type (Work)</Label>
                  <Input 
                    id="workType" 
                    placeholder="e.g. Plumber, Tutor" 
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="charge">Service Charge (per hour/visit)</Label>
                  <Input id="charge" placeholder="₹500" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Skills (Comma separated)</Label>
                <Input 
                  id="skills" 
                  placeholder="e.g. Algebra, Calculus, Hindi" 
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  required 
                />
              </div>

              {/* Certificates */}
              <div className="space-y-2">
                <Label>Upload Certificates (Max 2, Optional)</Label>
                <div className="flex flex-wrap gap-4 mt-2">
                  {certificates.map((cert, idx) => (
                    <div key={idx} className="relative w-24 h-24 border rounded-md overflow-hidden group">
                      <img src={cert} alt={`Cert ${idx+1}`} className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => setCertificates(prev => prev.filter((_, i) => i !== idx))}
                        className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {certificates.length < 2 && (
                    <label className="w-24 h-24 border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-secondary/5 transition-colors">
                      <Upload className="w-6 h-6 text-muted-foreground" />
                      <span className="text-[10px] mt-1 text-muted-foreground">Upload</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                    </label>
                  )}
                </div>
              </div>

              {/* AI Description Tool */}
              <div className="space-y-4 bg-secondary/5 p-4 rounded-xl border border-secondary/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-secondary" />
                    <span className="font-bold">AI Profile Optimizer</span>
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="border-secondary text-secondary hover:bg-secondary hover:text-white"
                    onClick={generateWithAi}
                    disabled={aiLoading}
                  >
                    {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Generate with AI"}
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Professional Description</Label>
                  <Textarea 
                    id="description" 
                    rows={4} 
                    placeholder="AI will generate this for you..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="bg-secondary/20 text-secondary-foreground border-secondary/30">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold border-b pb-2">Location</h3>
              <div className="space-y-2">
                <Label htmlFor="loc">Address</Label>
                <Input id="loc" placeholder="Working address" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pin">PIN Code</Label>
                <Input id="pin" placeholder="XXXXXX" required maxLength={6} pattern="\d{6}" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full h-12 text-lg font-bold bg-secondary hover:bg-secondary/90" disabled={loading}>
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Complete Professional Registration"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}