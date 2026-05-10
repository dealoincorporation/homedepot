'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { 
  Check, 
  ChevronDown,
  ChevronLeft, 
  ChevronRight, 
  UploadCloud, 
  Trash2, 
  FileText, 
  User, 
  Briefcase, 
  HelpCircle, 
  ShieldCheck, 
  ArrowRight,
  Loader2
} from 'lucide-react';
import { splitApplicantName } from '@/lib/applicant-display';

interface ApplicationFormProps {
  jobId: string;
  jobTitle: string;
  jobAddress?: string;
  reqId?: string;
  /** From account profile — pre-fills identity when empty */
  applicantName?: string | null;
}

type Step = 'information' | 'experience' | 'questions' | 'disclosures' | 'review';

const STEPS: { id: Step; label: string }[] = [
  { id: 'information', label: 'Identity' },
  { id: 'experience', label: 'History' },
  { id: 'questions', label: 'Context' },
  { id: 'disclosures', label: 'Ethics' },
  { id: 'review', label: 'Review' },
];

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  workExperience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    current: boolean;
  }>;
  skills: string[];
  whyInterested: string;
  availability: string;
  salaryExpectation: string;
  gender: string;
  race: string;
  veteranStatus: string;
  disability: string;
  consent: boolean;
  resume: File | null;
  resumeFileName: string;
}

export default function ApplicationForm({
  jobId,
  jobTitle,
  jobAddress,
  reqId,
  applicantName,
}: ApplicationFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>('information');
  const [loading, setLoading] = useState(false);
  const [animated, setAnimated] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'Canada',
    workExperience: [],
    education: [],
    skills: [],
    whyInterested: '',
    availability: '',
    salaryExpectation: '',
    gender: '',
    race: '',
    veteranStatus: '',
    disability: '',
    consent: false,
    resume: null,
    resumeFileName: '',
  });

  useEffect(() => {
    setAnimated(true);
  }, [currentStep]);

  useEffect(() => {
    if (!applicantName?.trim()) return;
    setFormData((prev) => {
      if (prev.firstName.trim() || prev.lastName.trim()) return prev;
      const { firstName, lastName } = splitApplicantName(applicantName);
      return { ...prev, firstName, lastName };
    });
  }, [applicantName]);

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addWorkExperience = () => {
    setFormData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, { company: '', position: '', startDate: '', endDate: '', current: false, description: '' }],
    }));
  };

  const updateWorkExperience = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map((exp, i) => i === index ? { ...exp, [field]: value } : exp),
    }));
  };

  const removeWorkExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index),
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', current: false }],
    }));
  };

  const updateEducation = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => i === index ? { ...edu, [field]: value } : edu),
    }));
  };

  const removeEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      updateFormData('resume', file);
      updateFormData('resumeFileName', file.name);
    }
  };

  const validateStep = (step: Step): boolean => {
    switch (step) {
      case 'information':
        return !!(formData.firstName && formData.lastName && formData.phone);
      case 'questions':
        return !!(formData.whyInterested && formData.availability);
      case 'disclosures':
        return formData.consent;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      toast.error('Please complete required fields');
      return;
    }
    const currentIndex = STEPS.findIndex(s => s.id === currentStep);
    if (currentIndex < STEPS.length - 1) {
      setAnimated(false);
      setTimeout(() => setCurrentStep(STEPS[currentIndex + 1].id), 50);
    }
  };

  const handleBack = () => {
    const currentIndex = STEPS.findIndex(s => s.id === currentStep);
    if (currentIndex > 0) {
      setAnimated(false);
      setTimeout(() => setCurrentStep(STEPS[currentIndex - 1].id), 50);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Simulation of submission
      await new Promise(r => setTimeout(r, 2000));
      toast.success('Application submitted successfully!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error('Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  const renderProgressBar = () => {
    const currentIndex = STEPS.findIndex(s => s.id === currentStep);
    return (
      <div className="mb-8 sm:mb-16">
        <div className="flex items-center justify-between relative px-0 sm:px-4">
          {/* Connector Line */}
          <div className="absolute top-4 sm:top-6 left-[10%] right-[10%] h-[1px] bg-border-primary/30 z-0" />
          <div 
            className="absolute top-4 sm:top-6 left-[10%] h-[1px] bg-gradient-to-r from-[#EE7125] to-[#FF8A40] z-0 transition-all duration-700 ease-in-out shadow-[0_0_15px_rgba(238,113,37,0.5)]" 
            style={{ width: `${(currentIndex / (STEPS.length - 1)) * 80}%` }}
          />

          {STEPS.map((step, index) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2 sm:gap-4 flex-1">
              <div
                className={`w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-[10px] sm:text-[11px] font-black tracking-widest transition-all duration-500 ${
                  index <= currentIndex
                    ? 'bg-[#EE7125] text-white shadow-[0_0_30px_rgba(238,113,37,0.4)] scale-105 sm:scale-110'
                    : 'bg-secondary/40 backdrop-blur-md text-text-muted hover:bg-secondary/60'
                }`}
              >
                {index < currentIndex ? (
                   <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
                ) : (
                  String(index + 1).padStart(2, '0')
                )}
              </div>
              <span className={`text-[8px] sm:text-[9px] font-black tracking-wider sm:tracking-[0.3em] uppercase transition-all duration-500 text-center max-w-[50px] sm:max-w-none break-words ${index <= currentIndex ? 'text-[#EE7125]' : 'text-text-muted opacity-60'}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderInput = (label: string, field: keyof FormData, type = 'text', placeholder = '', required = false) => (
    <div className="space-y-3">
      <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
        {label} {required && <span className="text-[#EE7125]">*</span>}
      </label>
      <div className="relative group">
        <input
          type={type}
          value={formData[field] as string}
          onChange={(e) => updateFormData(field, e.target.value)}
          placeholder={placeholder}
          className="w-full bg-secondary/30 backdrop-blur-md rounded-[20px] px-6 py-4 text-text-primary focus:outline-none focus:bg-secondary/50 transition-all duration-300 placeholder-text-muted/50 text-sm font-medium shadow-inner"
        />
        <div className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-[#EE7125]/50 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />
      </div>
    </div>
  );

  const renderStepContent = () => {
    const fadeClass = animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4';
    
    switch (currentStep) {
      case 'information':
        return (
          <div className={`space-y-8 transition-all duration-500 ${fadeClass}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderInput('First Name', 'firstName', 'text', 'First name', true)}
              {renderInput('Last Name', 'lastName', 'text', 'Last name', true)}
              {renderInput('Phone Number', 'phone', 'tel', '+1 (000) 000-0000', true)}
              {renderInput('Email Address', 'country', 'email', 'you@example.com', true)}
            </div>
            <div className="space-y-8 pt-4">
              <h3 className="text-[11px] font-black text-[#EE7125] uppercase tracking-[0.35em] flex items-center gap-4">
                <span className="h-px w-10 bg-gradient-to-r from-[#EE7125] to-transparent" /> Address Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderInput('Street Address', 'address', 'text', '123 Main St')}
                {renderInput('City', 'city', 'text', 'Toronto')}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] ml-1">Province</label>
                  <div className="relative group">
                    <select
                      value={formData.province}
                      onChange={(e) => updateFormData('province', e.target.value)}
                      className="w-full bg-secondary/30 backdrop-blur-md border border-border-primary rounded-[20px] px-6 py-4 text-text-primary focus:outline-none focus:border-[#EE7125]/50 focus:bg-secondary/50 transition-all appearance-none text-sm font-medium"
                    >
                      <option value="" className="bg-secondary">Select Province</option>
                      <option value="ON" className="bg-secondary">Ontario</option>
                      <option value="BC" className="bg-secondary">British Columbia</option>
                      <option value="AB" className="bg-secondary">Alberta</option>
                      <option value="QC" className="bg-secondary">Quebec</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted group-hover:text-[#EE7125] transition-colors">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                {renderInput('Postal Code', 'postalCode', 'text', 'A1B 2C3')}
              </div>
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className={`space-y-10 transition-all duration-500 ${fadeClass}`}>
            {/* Work History */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#EE7125] uppercase tracking-[0.3em] flex items-center gap-3">
                  <span className="h-px w-8 bg-[#EE7125]/30" /> Work History
                </h3>
                <button 
                  onClick={addWorkExperience}
                  className="px-4 py-2 rounded-xl bg-tertiary border border-border-primary text-[10px] font-bold text-text-muted hover:text-text-primary hover:bg-tertiary/80 transition-all uppercase tracking-widest"
                >
                  + Add Experience
                </button>
              </div>
              
              {formData.workExperience.length === 0 ? (
                <div className="p-6 sm:p-10 rounded-[24px] sm:rounded-[32px] bg-secondary/10 border border-border-primary border-dashed text-center backdrop-blur-sm">
                  <p className="text-sm font-bold text-text-muted tracking-wide">No experience added yet.</p>
                </div>
              ) : (
                formData.workExperience.map((exp, i) => (
                  <div key={i} className="p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] bg-secondary/20 backdrop-blur-md space-y-6 relative group overflow-hidden shadow-xl">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#EE7125] opacity-40" />
                    <button 
                      onClick={() => removeWorkExperience(i)}
                      className="absolute top-6 right-6 text-text-muted hover:text-red-500 transition-colors bg-primary/40 p-2 rounded-xl"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                         <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] ml-1">Company</label>
                         <input value={exp.company} onChange={e => updateWorkExperience(i, 'company', e.target.value)} className="w-full bg-secondary/30 border border-border-primary rounded-2xl px-5 py-4 text-text-primary text-sm font-bold focus:outline-none focus:border-[#EE7125]/40" />
                        </div>
                        <div className="space-y-3">
                         <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] ml-1">Position</label>
                         <input value={exp.position} onChange={e => updateWorkExperience(i, 'position', e.target.value)} className="w-full bg-secondary/30 border border-border-primary rounded-2xl px-5 py-4 text-text-primary text-sm font-bold focus:outline-none focus:border-[#EE7125]/40" />
                        </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Resume Upload */}
            <div className="space-y-6">
              <h3 className="text-xs font-bold text-[#EE7125] uppercase tracking-[0.3em] flex items-center gap-3">
                <span className="h-px w-8 bg-[#EE7125]/30" /> Documents
              </h3>
              <div className="relative group">
                <input
                  type="file"
                  id="resume-upload"
                  onChange={handleResumeUpload}
                  className="hidden"
                />
                <label
                  htmlFor="resume-upload"
                  className="cursor-pointer flex flex-col items-center justify-center p-14 rounded-[40px] bg-secondary/20 backdrop-blur-sm border-2 border-dashed border-border-primary group-hover:border-[#EE7125]/40 transition-all duration-700 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#EE7125]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-20 h-20 rounded-3xl bg-secondary/50 border border-border-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(238,113,37,0.15)] transition-all duration-500">
                    <UploadCloud className="w-10 h-10 text-[#EE7125]" />
                  </div>
                  <span className="text-base font-black text-text-primary mb-2 tracking-tight text-center break-words px-4">
                    {formData.resumeFileName || 'Upload your Resume'}
                  </span>
                  <span className="text-[10px] text-text-muted font-black uppercase tracking-[0.1em] sm:tracking-[0.3em] text-center">PDF, DOC, DOCX • MAX 5MB</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 'questions':
        return (
          <div className={`space-y-8 transition-all duration-500 ${fadeClass}`}>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] ml-4">Why are you interested in this position? <span className="text-[#EE7125]">*</span></label>
              <textarea
                value={formData.whyInterested}
                onChange={(e) => updateFormData('whyInterested', e.target.value)}
                rows={6}
                className="w-full bg-background border border-border-primary rounded-[24px] px-6 py-5 text-text-primary focus:outline-none focus:border-[#EE7125]/50 transition-all placeholder-text-muted"
                placeholder="Tell us about your motivation..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] ml-4">What is your availability? <span className="text-[#EE7125]">*</span></label>
              <textarea
                value={formData.availability}
                onChange={(e) => updateFormData('availability', e.target.value)}
                rows={3}
                className="w-full bg-background border border-border-primary rounded-[24px] px-6 py-5 text-text-primary focus:outline-none focus:border-[#EE7125]/50 transition-all placeholder-text-muted"
                placeholder="e.g., Weekdays, Full-time, etc."
              />
            </div>
          </div>
        );

      case 'disclosures':
        return (
          <div className={`space-y-8 transition-all duration-500 ${fadeClass}`}>
            <div className="p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] bg-background border border-border-primary">
              <p className="text-sm text-text-secondary leading-relaxed mb-8">
                The Home Depot Canada is an equal opportunity employer. The information below helps us maintain our commitment to diversity and inclusion.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] ml-4">Gender Identity</label>
                  <select className="w-full bg-background border border-border-primary rounded-2xl px-6 py-4 text-text-primary appearance-none focus:outline-none focus:border-[#EE7125]/50 transition-all">
                    <option className="bg-background">Prefer not to answer</option>
                    <option className="bg-background">Male</option>
                    <option className="bg-background">Female</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] ml-4">Disability Status</label>
                  <select className="w-full bg-background border border-border-primary rounded-2xl px-6 py-4 text-text-primary appearance-none focus:outline-none focus:border-[#EE7125]/50 transition-all">
                    <option className="bg-background">Prefer not to answer</option>
                    <option className="bg-background">Yes</option>
                    <option className="bg-background">No</option>
                  </select>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-border-primary">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => updateFormData('consent', e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-border-primary bg-background checked:bg-[#EE7125] checked:border-[#EE7125] transition-all"
                  />
                  <span className="text-sm text-text-muted leading-relaxed group-hover:text-text-primary transition-colors">
                    I consent to the collection and use of my information for employment purposes. I certify that the information provided is accurate and complete.
                  </span>
                </label>
              </div>
            </div>
          </div>
        );

      case 'review':
        return (
          <div className={`space-y-8 transition-all duration-500 ${fadeClass}`}>
            <div className="space-y-6">
               <div className="p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] bg-secondary/40 border border-border-primary space-y-6">
                 <h4 className="text-[10px] font-black text-[#EE7125] uppercase tracking-[0.3em]">Identity Summary</h4>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                   <div>
                     <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-1">Name</p>
                     <p className="text-text-primary font-bold break-words">{formData.firstName} {formData.lastName}</p>
                   </div>
                   <div>
                     <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-1">Phone</p>
                     <p className="text-text-primary font-bold break-words">{formData.phone}</p>
                   </div>
                 </div>
               </div>
               
               <div className="p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] bg-secondary/40 border border-border-primary flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                 <div>
                   <h4 className="text-[10px] font-black text-[#EE7125] uppercase tracking-[0.3em] mb-1">Documents</h4>
                   <p className="text-text-primary font-bold break-all">{formData.resumeFileName || 'No resume uploaded'}</p>
                 </div>
                 <div className="text-green-500 hidden sm:block">
                    <Check className="w-6 h-6" />
                 </div>
               </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {renderProgressBar()}

      <div className="min-h-[400px]">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/5 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 sm:gap-0">
        <button
          onClick={handleBack}
          disabled={currentStep === 'information' || loading}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-secondary border border-border-primary text-xs font-bold text-text-muted hover:text-text-primary hover:bg-tertiary disabled:opacity-0 transition-all uppercase tracking-widest"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        {currentStep === 'review' ? (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full sm:w-auto group relative bg-[#EE7125] hover:bg-[#FF8A40] text-white font-bold px-8 sm:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 shadow-[0_8px_24px_-8px_rgba(238,113,37,0.5)] flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 text-white animate-spin" />
            ) : (
              <>
                <span className="uppercase tracking-widest text-xs">Submit</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full sm:w-auto group relative bg-text-primary text-primary hover:bg-text-primary/90 font-bold px-8 sm:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span className="uppercase tracking-widest text-xs">Continue</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        )}
      </div>
    </div>
  );
}
