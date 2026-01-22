'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface ApplicationFormProps {
  jobId: string;
  jobTitle: string;
  jobAddress?: string;
  reqId?: string;
}

type Step = 'information' | 'experience' | 'questions' | 'disclosures' | 'review';

const STEPS: { id: Step; label: string }[] = [
  { id: 'information', label: 'My Information' },
  { id: 'experience', label: 'My Experience' },
  { id: 'questions', label: 'Application Questions' },
  { id: 'disclosures', label: 'Voluntary Disclosures' },
  { id: 'review', label: 'Review' },
];

interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  
  // Experience
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
  
  // Application Questions
  whyInterested: string;
  availability: string;
  salaryExpectation: string;
  
  // Voluntary Disclosures
  gender: string;
  race: string;
  veteranStatus: string;
  disability: string;
  consent: boolean;
  
  // Resume
  resume: File | null;
  resumeFileName: string;
}

export default function ApplicationForm({ jobId, jobTitle, jobAddress, reqId }: ApplicationFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>('information');
  const [loading, setLoading] = useState(false);
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


  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addWorkExperience = () => {
    setFormData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
      }],
    }));
  };

  const updateWorkExperience = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      ),
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
      education: [...prev.education, {
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        current: false,
      }],
    }));
  };

  const updateEducation = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      ),
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
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        toast.error('Please upload a PDF or Word document');
        return;
      }
      updateFormData('resume', file);
      updateFormData('resumeFileName', file.name);
    }
  };

  const validateStep = (step: Step): boolean => {
    switch (step) {
      case 'information':
        return !!(formData.firstName && formData.lastName && formData.phone && formData.address && formData.city && formData.province && formData.postalCode);
      case 'experience':
        return formData.workExperience.length > 0 || formData.education.length > 0;
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
      toast.error('Please fill in all required fields');
      return;
    }

    const currentIndex = STEPS.findIndex(s => s.id === currentStep);
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1].id);
    }
  };

  const handleBack = () => {
    const currentIndex = STEPS.findIndex(s => s.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1].id);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep('review')) {
      toast.error('Please complete all required sections');
      return;
    }

    setLoading(true);
    try {
      // Upload resume first if present
      let resumeUrl = '';
      if (formData.resume) {
        const resumeFormData = new FormData();
        resumeFormData.append('file', formData.resume);
        const uploadRes = await fetch('/api/upload/resume', {
          method: 'POST',
          body: resumeFormData,
        });
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          resumeUrl = uploadData.url;
        } else {
          toast.error('Failed to upload resume');
          setLoading(false);
          return;
        }
      }

      // Submit application
      const applicationData = {
        jobTitle,
        jobAddress,
        reqId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        province: formData.province,
        postalCode: formData.postalCode,
        country: formData.country,
        workExperience: formData.workExperience,
        education: formData.education,
        skills: formData.skills,
        applicationQuestions: {
          whyInterested: formData.whyInterested,
          availability: formData.availability,
          salaryExpectation: formData.salaryExpectation,
        },
        voluntaryDisclosures: {
          gender: formData.gender,
          race: formData.race,
          veteranStatus: formData.veteranStatus,
          disability: formData.disability,
          consent: formData.consent,
        },
        resumeUrl,
        resumeFileName: formData.resumeFileName,
      };

      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      toast.success('Application submitted successfully!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  const renderProgressBar = () => {
    const currentIndex = STEPS.findIndex(s => s.id === currentStep);
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    index <= currentIndex
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                <div className="mt-2 text-xs text-center text-gray-600 max-w-[100px]">
                  {step.label}
                </div>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 ${
                    index < currentIndex ? 'bg-orange-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'information':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-black mb-6">My Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  First Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  className="w-full border border-gray-400 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Last Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  className="w-full border border-gray-400 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Phone <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="w-full border border-gray-400 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => updateFormData('address', e.target.value)}
                  className="w-full border border-gray-400 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  City <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => updateFormData('city', e.target.value)}
                  className="w-full border border-gray-400 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Province <span className="text-red-600">*</span>
                </label>
                <select
                  value={formData.province}
                  onChange={(e) => updateFormData('province', e.target.value)}
                  className="w-full border border-gray-400 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="">Select Province</option>
                  <option value="AB">Alberta</option>
                  <option value="BC">British Columbia</option>
                  <option value="MB">Manitoba</option>
                  <option value="NB">New Brunswick</option>
                  <option value="NL">Newfoundland and Labrador</option>
                  <option value="NS">Nova Scotia</option>
                  <option value="ON">Ontario</option>
                  <option value="PE">Prince Edward Island</option>
                  <option value="QC">Quebec</option>
                  <option value="SK">Saskatchewan</option>
                  <option value="NT">Northwest Territories</option>
                  <option value="NU">Nunavut</option>
                  <option value="YT">Yukon</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Postal Code <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => updateFormData('postalCode', e.target.value.toUpperCase())}
                  className="w-full border border-gray-400 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Country <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => updateFormData('country', e.target.value)}
                  className="w-full border border-gray-400 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-black mb-6">My Experience</h2>
            
            {/* Work Experience */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-black">Work Experience</h3>
                <button
                  type="button"
                  onClick={addWorkExperience}
                  className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 font-semibold"
                >
                  Add Experience
                </button>
              </div>
              {formData.workExperience.map((exp, index) => (
                <div key={index} className="border border-gray-300 rounded p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
                        className="w-full border border-gray-400 rounded px-4 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Position</label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => updateWorkExperience(index, 'position', e.target.value)}
                        className="w-full border border-gray-400 rounded px-4 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Start Date</label>
                      <input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateWorkExperience(index, 'startDate', e.target.value)}
                        className="w-full border border-gray-400 rounded px-4 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">End Date</label>
                      <input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => updateWorkExperience(index, 'endDate', e.target.value)}
                        disabled={exp.current}
                        className="w-full border border-gray-400 rounded px-4 py-2 disabled:bg-gray-100"
                      />
                      <label className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) => updateWorkExperience(index, 'current', e.target.checked)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">Current Position</span>
                      </label>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Description</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => updateWorkExperience(index, 'description', e.target.value)}
                        className="w-full border border-gray-400 rounded px-4 py-2"
                        rows={3}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeWorkExperience(index)}
                    className="mt-2 text-red-600 hover:text-red-700 text-sm font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-black">Education</h3>
                <button
                  type="button"
                  onClick={addEducation}
                  className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 font-semibold"
                >
                  Add Education
                </button>
              </div>
              {formData.education.map((edu, index) => (
                <div key={index} className="border border-gray-300 rounded p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                        className="w-full border border-gray-400 rounded px-4 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                        className="w-full border border-gray-400 rounded px-4 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Field of Study</label>
                      <input
                        type="text"
                        value={edu.fieldOfStudy}
                        onChange={(e) => updateEducation(index, 'fieldOfStudy', e.target.value)}
                        className="w-full border border-gray-400 rounded px-4 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Start Date</label>
                      <input
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                        className="w-full border border-gray-400 rounded px-4 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">End Date</label>
                      <input
                        type="month"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                        disabled={edu.current}
                        className="w-full border border-gray-400 rounded px-4 py-2 disabled:bg-gray-100"
                      />
                      <label className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          checked={edu.current}
                          onChange={(e) => updateEducation(index, 'current', e.target.checked)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">Currently Enrolled</span>
                      </label>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="mt-2 text-red-600 hover:text-red-700 text-sm font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-4">Skills</h3>
              <input
                type="text"
                placeholder="Enter skills separated by commas"
                value={formData.skills.join(', ')}
                onChange={(e) => updateFormData('skills', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                className="w-full border border-gray-400 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p className="text-sm text-gray-600 mt-2">Separate multiple skills with commas</p>
            </div>

            {/* Resume Upload */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-4">Resume/CV</h3>
              <div className="border-2 border-dashed border-gray-300 rounded p-6 text-center">
                <input
                  type="file"
                  id="resume-upload"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="hidden"
                />
                <label
                  htmlFor="resume-upload"
                  className="cursor-pointer inline-block px-6 py-3 bg-orange-600 text-white rounded hover:bg-orange-700 font-semibold"
                >
                  Upload Resume
                </label>
                {formData.resumeFileName && (
                  <p className="mt-4 text-sm text-gray-700">
                    Selected: {formData.resumeFileName}
                  </p>
                )}
                <p className="mt-2 text-xs text-gray-500">PDF or Word document (max 5MB)</p>
              </div>
            </div>
          </div>
        );

      case 'questions':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-black mb-6">Application Questions</h2>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Why are you interested in this position? <span className="text-red-600">*</span>
              </label>
              <textarea
                value={formData.whyInterested}
                onChange={(e) => updateFormData('whyInterested', e.target.value)}
                className="w-full border border-gray-400 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows={5}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                What is your availability? <span className="text-red-600">*</span>
              </label>
              <textarea
                value={formData.availability}
                onChange={(e) => updateFormData('availability', e.target.value)}
                className="w-full border border-gray-400 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Salary Expectation (Optional)
              </label>
              <input
                type="text"
                value={formData.salaryExpectation}
                onChange={(e) => updateFormData('salaryExpectation', e.target.value)}
                className="w-full border border-gray-400 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="e.g., $50,000 - $60,000"
              />
            </div>
          </div>
        );

      case 'disclosures':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-black mb-6">Voluntary Disclosures</h2>
            <p className="text-gray-600 mb-6">
              The following information is collected for equal opportunity purposes and is voluntary.
            </p>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => updateFormData('gender', e.target.value)}
                className="w-full border border-gray-400 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Prefer not to answer</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Race/Ethnicity</label>
              <select
                value={formData.race}
                onChange={(e) => updateFormData('race', e.target.value)}
                className="w-full border border-gray-400 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Prefer not to answer</option>
                <option value="asian">Asian</option>
                <option value="black">Black or African American</option>
                <option value="hispanic">Hispanic or Latino</option>
                <option value="native">Native American or Alaska Native</option>
                <option value="pacific">Native Hawaiian or Pacific Islander</option>
                <option value="white">White</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Veteran Status</label>
              <select
                value={formData.veteranStatus}
                onChange={(e) => updateFormData('veteranStatus', e.target.value)}
                className="w-full border border-gray-400 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Prefer not to answer</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Disability Status</label>
              <select
                value={formData.disability}
                onChange={(e) => updateFormData('disability', e.target.value)}
                className="w-full border border-gray-400 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Prefer not to answer</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => updateFormData('consent', e.target.checked)}
                  className="mr-2"
                  required
                />
                <span className="text-sm text-gray-800">
                  I consent to the collection and use of my information for employment purposes <span className="text-red-600">*</span>
                </span>
              </label>
            </div>
          </div>
        );

      case 'review':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-black mb-6">Review Your Application</h2>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-black mb-4">Job Information</h3>
              <p className="text-gray-700"><strong>Position:</strong> {jobTitle}</p>
              {jobAddress && <p className="text-gray-700"><strong>Location:</strong> {jobAddress}</p>}
              {reqId && <p className="text-gray-700"><strong>Req ID:</strong> {reqId}</p>}
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-black mb-4">Personal Information</h3>
              <p className="text-gray-700"><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
              <p className="text-gray-700"><strong>Phone:</strong> {formData.phone}</p>
              <p className="text-gray-700"><strong>Address:</strong> {formData.address}, {formData.city}, {formData.province} {formData.postalCode}</p>
            </div>

            {formData.workExperience.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-black mb-4">Work Experience</h3>
                {formData.workExperience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <p className="text-gray-700"><strong>{exp.position}</strong> at {exp.company}</p>
                    <p className="text-gray-600 text-sm">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                  </div>
                ))}
              </div>
            )}

            {formData.education.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-black mb-4">Education</h3>
                {formData.education.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <p className="text-gray-700"><strong>{edu.degree}</strong> - {edu.institution}</p>
                    {edu.fieldOfStudy && <p className="text-gray-600 text-sm">Field: {edu.fieldOfStudy}</p>}
                  </div>
                ))}
              </div>
            )}

            {formData.resumeFileName && (
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-black mb-4">Resume</h3>
                <p className="text-gray-700">{formData.resumeFileName}</p>
              </div>
            )}

            <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
              <p className="text-sm text-yellow-800">
                Please review all information carefully. Once submitted, you will not be able to make changes.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 md:p-10">
      {renderProgressBar()}
      
      <div className="mb-8">
        {renderStepContent()}
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={handleBack}
          disabled={currentStep === 'information'}
          className="px-6 py-3 bg-gray-200 text-black rounded hover:bg-gray-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        {currentStep === 'review' ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-3 bg-orange-600 text-white rounded hover:bg-orange-700 font-semibold disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-3 bg-orange-600 text-white rounded hover:bg-orange-700 font-semibold"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
