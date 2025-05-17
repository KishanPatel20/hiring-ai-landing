import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

// Base API URL - in a production app, this would come from environment variables
const API_BASE_URL = 'https://api.skillsync.dev';

const DemoForm: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      company: '',
      role: '',
      companySize: '',
      challenge: '',
      jobDescription: ''
    }
  });

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      // Example of how a real implementation would upload data
      // In this demo version, we'll simulate success and navigate to the demo page
      
      toast({
        title: "Demo Request Received!",
        description: "Redirecting you to our interactive demo.",
      });
      
      // Wait a moment before redirecting to allow the toast to be seen
      setTimeout(() => {
        navigate('/demo', { state: { fromSubmission: true } });
      }, 1500);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "There was a problem connecting to our servers.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  return (
    <section id="demo-request" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Ready to Transform Your Hiring?</h2>
          <p className="text-xl text-center mb-8 text-skillsync-darkgray/80">
            Request a demo and see how SkillSync's AI-powered hiring revolution can help your company.
          </p>
          
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Smith" required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Work Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@company.com" required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Acme Technologies" required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Role</FormLabel>
                        <FormControl>
                          <Input placeholder="HR Manager, CTO, etc." required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="companySize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Size</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">51-200 employees</SelectItem>
                          <SelectItem value="201-500">201-500 employees</SelectItem>
                          <SelectItem value="500+">500+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="challenge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What's your biggest hiring challenge?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about the challenges you face when hiring IT talent..."
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="jobDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sample Job Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Paste a sample job description to see how SkillSync can help..."
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <Label htmlFor="resume">Upload Sample Resume (Optional)</Label>
                  <Input 
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeChange}
                  />
                  <p className="text-xs text-skillsync-darkgray/60">
                    Upload a sample resume to see how SkillSync processes candidate information.
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-skillsync-purple hover:bg-skillsync-purple/90 text-white py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Request Your Demo'}
                </Button>
                
                <p className="text-sm text-center text-skillsync-darkgray/60">
                  By submitting, you agree to our Privacy Policy and Terms of Service.
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoForm;
