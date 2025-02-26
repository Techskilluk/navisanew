export interface DocumentRequirement {
  type: string;
  label: string;
  required: boolean;
  maxSize: number;
  formats: string[];
  description?: string;
  multiple?: boolean;
  maxFiles?: number;
}

export interface VisaDocuments {
  [key: string]: {
    requirements: DocumentRequirement[];
    resources: {
      title: string;
      description: string;
      url: string;
    }[];
  };
}

export const VISA_DOCUMENTS: Record<
  string,
  {
    requirements: DocumentRequirement[];
    resources: {
      title: string;
      description: string;
      url: string;
    }[];
  }
> = {
  // "global-talent": {
  //   requirements: [
  //     {
  //       type: "cv",
  //       label: "Curriculum Vitae",
  //       description: "Detailed CV highlighting achievements and experience",
  //       required: true,
  //       formats: [".pdf, .jpg, .png, .jpeg"],
  //       maxSize: 5000000,
  //       multiple: true,
  //       maxFiles: 3
  //     },
  //     {
  //       type: "recommendation_letter",
  //       label: "Letters of Recommendation",
  //       description: "Up to 3 letters from academic or professional references. Each letter must be signed and on official letterhead.",
  //       required: true,
  //       formats: ["pdf"],
  //       maxSize: 5000000,
  //       multiple: true,
  //       maxFiles: 3
  //     },
  //     {
  //       type: "portfolio",
  //       label: "Portfolio of Work",
  //       description: "Evidence of significant contributions (up to 3 files)",
  //       required: true,
  //       formats: ["pdf"],
  //       maxSize: 10000000,
  //       multiple: true,
  //       maxFiles: 3
  //     }
  //   ],
  //   resources: [
  //     {
  //       title: "Global Talent Visa Guide",
  //       description: "Official guidance on application process",
  //       url: "https://www.gov.uk/global-talent"
  //     }
  //   ]
  // },
  // "high-potential": {
  //   requirements: [
  //     {
  //       type: "degree",
  //       label: "Degree Certificate",
  //       description: "From eligible university",
  //       required: true,
  //       formats: ["pdf"],
  //       maxSize: 5000000
  //     },
  //     {
  //       type: "transcript",
  //       label: "Academic Transcript",
  //       description: "Official transcript with grades",
  //       required: true,
  //       formats: ["pdf"],
  //       maxSize: 5000000
  //     }
  //   ],
  //   resources: [
  //     {
  //       title: "HPI Visa Guide",
  //       description: "Eligibility and application process",
  //       url: "https://www.gov.uk/high-potential-individual-visa"
  //     }
  //   ]
  // },
  // "scale-up": {
  //   requirements: [
  //     {
  //       type: "job_offer",
  //       label: "Job Offer",
  //       description: "From approved Scale-up sponsor",
  //       required: true,
  //       formats: ["pdf"],
  //       maxSize: 5000000
  //     },
  //     {
  //       type: "qualification",
  //       label: "Qualifications",
  //       description: "Relevant certificates and transcripts",
  //       required: true,
  //       formats: ["pdf"],
  //       maxSize: 5000000
  //     }
  //   ],
  //   resources: [
  //     {
  //       title: "Scale-up Visa Guide",
  //       description: "Requirements and process",
  //       url: "https://www.gov.uk/scale-up-visa"
  //     }
  //   ]
  // },
  // "tech-talent": {
  //   requirements: [
  //     {
  //       type: "cv",
  //       label: "Technical CV",
  //       description: "Highlighting technical skills and projects",
  //       required: true,
  //       formats: ["pdf"],
  //       maxSize: 5000000
  //     },
  //     {
  //       type: "certificates",
  //       label: "Technical Certifications",
  //       description: "Relevant technical qualifications",
  //       required: false,
  //       formats: ["pdf"],
  //       maxSize: 5000000
  //     }
  //   ],
  //   resources: [
  //     {
  //       title: "Tech Talent Guide",
  //       description: "Sponsorship process for tech roles",
  //       url: "https://www.gov.uk/skilled-worker-visa"
  //     }
  //   ]
  // },
  'UK Global Talent Visa': {
    requirements: [
      {
        type: 'cv',
        label: 'Curriculum Vitae',
        description: 'Detailed CV highlighting achievements and experience',
        required: true,
        formats: ['.pdf, .jpg, .png, .jpeg'],
        maxSize: 5000000,
        multiple: true,
        maxFiles: 3,
      },
      {
        type: 'recommendation_letter',
        label: 'Letters of Recommendation',
        description:
          'Up to 3 letters from academic or professional references. Each letter must be signed and on official letterhead.',
        required: true,
        formats: ['.pdf, .jpg, .png, .jpeg'],
        maxSize: 5000000,
        multiple: true,
        maxFiles: 3,
      },
      {
        type: 'portfolio',
        label: 'Portfolio of Work',
        description: 'Evidence of significant contributions (up to 3 files)',
        required: true,
        formats: ['.pdf, .jpg, .png, .jpeg'],
        maxSize: 10000000,
        multiple: true,
        maxFiles: 3,
      },
    ],
    resources: [
      {
        title: 'Global Talent Visa Guide',
        description: 'Official guidance on application process',
        url: 'https://www.gov.uk/global-talent',
      },
    ],
  },
  'US EB-1/EB-2 VISA': {
    requirements: [
      {
        type: 'degree',
        label: 'Degree Certificate',
        description: 'From eligible university',
        required: true,
        formats: ['.pdf, .jpg, .png, .jpeg'],
        maxSize: 5000000,
      },
      {
        type: 'transcript',
        label: 'Academic Transcript',
        description: 'Official transcript with grades',
        required: true,
        formats: ['.pdf, .jpg, .png, .jpeg'],
        maxSize: 5000000,
      },
    ],
    resources: [
      {
        title: 'HPI Visa Guide',
        description: 'Eligibility and application process',
        url: 'https://www.gov.uk/high-potential-individual-visa',
      },
    ],
  },
  'CANADA EXPRESS ENTRY': {
    requirements: [
      {
        type: 'job_offer',
        label: 'Job Offer',
        description: 'From approved Scale-up sponsor',
        required: true,
        formats: ['.pdf, .jpg, .png, .jpeg'],
        maxSize: 5000000,
      },
      {
        type: 'qualification',
        label: 'Qualifications',
        description: 'Relevant certificates and transcripts',
        required: true,
        formats: ['.pdf, .jpg, .png, .jpeg'],
        maxSize: 5000000,
      },
    ],
    resources: [
      {
        title: 'Scale-up Visa Guide',
        description: 'Requirements and process',
        url: 'https://www.gov.uk/scale-up-visa',
      },
    ],
  },
  'DUBAI GOLDEN VISA': {
    requirements: [
      {
        type: 'cv',
        label: 'Technical CV',
        description: 'Highlighting technical skills and projects',
        required: true,
        formats: ['.pdf, .jpg, .png, .jpeg'],
        maxSize: 5000000,
      },
      {
        type: 'certificates',
        label: 'Technical Certifications',
        description: 'Relevant technical qualifications',
        required: false,
        formats: ['.pdf, .jpg, .png, .jpeg'],
        maxSize: 5000000,
      },
    ],
    resources: [
      {
        title: 'Tech Talent Guide',
        description: 'Sponsorship process for tech roles',
        url: 'https://www.gov.uk/skilled-worker-visa',
      },
    ],
  },
  healthcare: {
    requirements: [
      {
        type: 'qualification',
        label: 'Medical Qualification',
        description: 'Medical degree or nursing qualification',
        required: true,
        formats: ['.pdf, .jpg, .png, .jpeg'],
        maxSize: 5000000,
      },
      {
        type: 'registration',
        label: 'Professional Registration',
        description: 'GMC/NMC registration certificate',
        required: true,
        formats: ['.pdf, .jpg, .png, .jpeg'],
        maxSize: 5000000,
      },
      {
        type: 'experience',
        label: 'Experience Certificates',
        description: 'Clinical experience documentation',
        required: true,
        formats: ['.pdf, .jpg, .png, .jpeg'],
        maxSize: 5000000,
      },
    ],
    resources: [
      {
        title: 'Healthcare Worker Visa',
        description: 'Guide for medical professionals',
        url: 'https://www.gov.uk/health-care-worker-visa',
      },
    ],
  },
  academic: {
    requirements: [
      {
        type: 'cv',
        label: 'Academic CV',
        description: 'Including publications and research',
        required: true,
        formats: ['.pdf, .jpg, .png, .jpeg'],
        maxSize: 5000000,
        multiple: true,
        maxFiles: 3,
      },
      {
        type: 'publications',
        label: 'Key Publications',
        description: 'Selected research papers',
        required: true,
        formats: ['.pdf, .jpg, .png, .jpeg'],
        maxSize: 10000000,
      },
      {
        type: 'research',
        label: 'Research Proposal',
        description: 'If applicable',
        required: false,
        formats: ['.pdf, .jpg, .png, .jpeg'],
        maxSize: 5000000,
      },
    ],
    resources: [
      {
        title: 'Academic Visa Guide',
        description: 'Information for researchers and academics',
        url: 'https://www.gov.uk/government/publications/uk-points-based-immigration-system-sponsor-guidance',
      },
    ],
  },
};
