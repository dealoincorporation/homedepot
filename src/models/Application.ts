import mongoose, { Schema } from 'mongoose';

export type ApplicationStatus =
  | 'Applied'
  | 'Under Review'
  | 'Interview'
  | 'Offer'
  | 'Rejected'
  | 'Hired';

export type WorkExperience = {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
};

export type Education = {
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
};

export type ApplicationDoc = {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  jobTitle: string;
  jobAddress?: string;
  reqId?: string;
  status: ApplicationStatus;
  statusHistory: { status: ApplicationStatus; at: Date }[];
  
  // Personal Information
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  country?: string;
  
  // Experience
  workExperience?: WorkExperience[];
  education?: Education[];
  skills?: string[];
  
  // Application Questions
  applicationQuestions?: Record<string, string>;
  
  // Voluntary Disclosures
  voluntaryDisclosures?: {
    gender?: string;
    race?: string;
    veteranStatus?: string;
    disability?: string;
    consent?: boolean;
  };
  
  // Resume/CV
  resumeUrl?: string;
  resumeFileName?: string;
  
  createdAt: Date;
  updatedAt: Date;
};

const WorkExperienceSchema = new Schema<WorkExperience>(
  {
    company: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: false },
    current: { type: Boolean, default: false },
    description: { type: String, required: false },
  },
  { _id: false }
);

const EducationSchema = new Schema<Education>(
  {
    institution: { type: String, required: true, trim: true },
    degree: { type: String, required: true, trim: true },
    fieldOfStudy: { type: String, required: false, trim: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: false },
    current: { type: Boolean, default: false },
  },
  { _id: false }
);

const ApplicationSchema = new Schema<ApplicationDoc>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    jobTitle: { type: String, required: true, trim: true },
    jobAddress: { type: String, required: false, trim: true },
    reqId: { type: String, required: false, trim: true },
    status: {
      type: String,
      enum: ['Applied', 'Under Review', 'Interview', 'Offer', 'Rejected', 'Hired'],
      required: true,
      default: 'Applied',
    },
    statusHistory: {
      type: [{ status: String, at: Date }],
      required: true,
      default: () => [{ status: 'Applied', at: new Date() }],
    },
    
    // Personal Information
    firstName: { type: String, required: false, trim: true },
    lastName: { type: String, required: false, trim: true },
    phone: { type: String, required: false, trim: true },
    address: { type: String, required: false, trim: true },
    city: { type: String, required: false, trim: true },
    province: { type: String, required: false, trim: true },
    postalCode: { type: String, required: false, trim: true },
    country: { type: String, required: false, trim: true },
    
    // Experience
    workExperience: { type: [WorkExperienceSchema], required: false, default: [] },
    education: { type: [EducationSchema], required: false, default: [] },
    skills: { type: [String], required: false, default: [] },
    
    // Application Questions
    applicationQuestions: { type: Schema.Types.Mixed, required: false },
    
    // Voluntary Disclosures
    voluntaryDisclosures: { type: Schema.Types.Mixed, required: false },
    
    // Resume/CV
    resumeUrl: { type: String, required: false, trim: true },
    resumeFileName: { type: String, required: false, trim: true },
  },
  { timestamps: true },
);

export const ApplicationModel =
  mongoose.models.Application || mongoose.model<ApplicationDoc>('Application', ApplicationSchema);

