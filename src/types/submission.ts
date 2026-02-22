export interface Contributor {
  id: string;
  name: string;
  affiliation: string;
  email: string;
  role: string;
}

export interface SubmissionData {
  title: string;
  articleType: string;
  keywords: string;
  abstract: string;
  privacyConsent: boolean;
  files: File[];
  contributors: Contributor[];
  editorComments: string;
  finalConfirmation: boolean;
}

export type Step = 'details' | 'upload' | 'contributors' | 'editors' | 'review';

export interface StepComponentProps {
  formData: SubmissionData;
  updateFormData: (updates: Partial<SubmissionData>) => void;
}
