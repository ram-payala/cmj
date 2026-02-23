export interface DashboardSubmission {
  id: string;
  submissionId: string;
  author: string;
  title: string;
  submissionDate: string;
  status: 'In Progress' | 'Under Review' | 'Accepted' | 'Rejected' | 'Published';
  stage: 'submission' | 'review' | 'copyediting' | 'production';
}

export type SubmissionTab = 'my-queue' | 'archived';
