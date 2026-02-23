import { useState } from 'react';
import { ArrowLeft, ChevronRight, Check } from 'lucide-react';
import { Step, SubmissionData } from '../types/submission';
import DetailsStep from './submission/DetailsStep';
import UploadStep from './submission/UploadStep';
import ContributorsStep from './submission/ContributorsStep';
import EditorsStep from './submission/EditorsStep';
import ReviewStep from './submission/ReviewStep';
import { supabase } from '../lib/supabase';

const ARTICLE_TYPE_TO_DB: Record<string, string> = {
  'original-research': 'original_research_article',
  'clinical-trial': 'clinical_trial_or_case_study',
  'review-article': 'review_article',
  'systematic-review': 'systematic_review',
  'meta-analysis': 'meta_analysis',
  'theoretical-methodological': 'theoretical_and_methodological_article',
  'short-communication': 'short_communication',
  'case-report': 'case_report',
};

interface SubmitResearchProps {
  onNavigateBack: () => void;
  onNavigateToGuidelines?: () => void;
  onSubmissionSuccess?: () => void;
}

export default function SubmitResearch({ onNavigateBack, onNavigateToGuidelines, onSubmissionSuccess }: SubmitResearchProps) {
  const [currentStep, setCurrentStep] = useState<Step>('details');
  const [validationTrigger, setValidationTrigger] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<SubmissionData>({
    title: '',
    articleType: '',
    keywords: '',
    abstract: '',
    privacyConsent: false,
    files: [],
    contributors: [],
    editorComments: '',
    finalConfirmation: false,
  });

  const steps: { id: Step; label: string; number: number }[] = [
    { id: 'details', label: 'Details', number: 1 },
    { id: 'upload', label: 'Upload Files', number: 2 },
    { id: 'contributors', label: 'Contributors', number: 3 },
    { id: 'editors', label: 'For the Editors', number: 4 },
    { id: 'review', label: 'Review', number: 5 },
  ];

  const getCurrentStepIndex = () => steps.findIndex(s => s.id === currentStep);
  const isStepCompleted = (stepId: Step) => {
    const stepIndex = steps.findIndex(s => s.id === stepId);
    return stepIndex < getCurrentStepIndex();
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      // Scroll to first invalid field
      setTimeout(() => {
        const firstError = document.querySelector('.border-red-500');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          (firstError as HTMLElement).focus();
        }
      }, 100);
      return;
    }
    
    const currentIndex = getCurrentStepIndex();
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const handleBack = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 'details':
        if (!formData.title.trim() || !formData.articleType || !formData.abstract.trim() || !formData.privacyConsent) {
          // Trigger validation in DetailsStep
          setValidationTrigger(prev => prev + 1);
          // Scroll to first invalid field
          setTimeout(() => {
            const firstError = document.querySelector('.border-red-500');
            if (firstError) {
              firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
              (firstError as HTMLElement).focus();
            }
          }, 200);
          return false;
        }
        return true;
      case 'upload':
        // Upload is optional, so always valid
        return true;
      case 'contributors':
        if (formData.contributors.length === 0) {
          return false;
        }
        return true;
      case 'editors':
        // Comments are optional, so always valid
        return true;
      case 'review':
        return true;
      default:
        return true;
    }
  };

  const handleStepClick = (stepId: Step) => {
    const stepIndex = steps.findIndex(s => s.id === stepId);
    const currentIndex = getCurrentStepIndex();
    
    // If navigating forward, validate current step first
    if (stepIndex > currentIndex) {
      if (!validateCurrentStep()) {
        // Scroll to first invalid field
        setTimeout(() => {
          const firstError = document.querySelector('.border-red-500');
          if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            (firstError as HTMLElement).focus();
          }
        }, 100);
        return;
      }
    }
    
    // Allow navigation to any step
    setCurrentStep(stepId);
  };

  const handleSubmitClick = () => {
    if (!formData.finalConfirmation) return;
    setSubmitError(null);
    setShowConfirmModal(true);
  };

  const performSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser?.id) {
        setSubmitError('You must be signed in to submit.');
        setSubmitting(false);
        return;
      }
      const dbArticleType = ARTICLE_TYPE_TO_DB[formData.articleType] || 'original_research_article';

      const { data: submission, error: subErr } = await supabase
        .from('submissions')
        .insert({
          user_id: authUser.id,
          title: formData.title.trim(),
          article_type: dbArticleType,
          keywords: formData.keywords?.trim() || null,
          abstract: formData.abstract.trim(),
          editor_comments: formData.editorComments?.trim() || null,
          status: 'submission',
          submitted_at: new Date().toISOString(),
          word_count: 0,
          page_count: 0,
          privacy_consent: formData.privacyConsent,
          privacy_consent_date: formData.privacyConsent ? new Date().toISOString() : null,
        })
        .select('id')
        .single();

      if (subErr || !submission?.id) {
        setSubmitError(subErr?.message || 'Failed to create submission.');
        setSubmitting(false);
        return;
      }

      const submissionId = submission.id;

      for (let i = 0; i < formData.contributors.length; i++) {
        const c = formData.contributors[i];
        await supabase.from('submission_contributors').insert({
          submission_id: submissionId,
          name: c.name.trim(),
          email: c.email.trim(),
          affiliation: c.affiliation.trim(),
          role: c.role || 'Author',
          order_index: i,
        });
      }

      for (let i = 0; i < formData.files.length; i++) {
        const file = formData.files[i];
        const ext = file.name.split('.').pop() || '';
        const safeName = `${Date.now()}_${i}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const storagePath = `${authUser.id}/${submissionId}/${safeName}`;
        const { error: uploadErr } = await supabase.storage
          .from('submission-files')
          .upload(storagePath, file, { contentType: file.type || 'application/octet-stream' });

        if (uploadErr) {
          setSubmitError(`File upload failed: ${uploadErr.message}`);
          setSubmitting(false);
          return;
        }

        await supabase.from('submission_files').insert({
          submission_id: submissionId,
          file_name: safeName,
          original_name: file.name,
          file_path: storagePath,
          file_size: file.size,
          mime_type: file.type || 'application/octet-stream',
          file_extension: ext || null,
          file_type: 'manuscript',
          is_primary: i === 0,
          stage: 'submission',
          uploaded_by: authUser.id,
        });
      }

      setShowConfirmModal(false);
      (onSubmissionSuccess || onNavigateBack)();
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : 'Submission failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const updateFormData = (updates: Partial<SubmissionData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'details':
        return <DetailsStep formData={formData} updateFormData={updateFormData} onNavigateToGuidelines={onNavigateToGuidelines} validationTrigger={validationTrigger} />;
      case 'upload':
        return <UploadStep formData={formData} updateFormData={updateFormData} />;
      case 'contributors':
        return <ContributorsStep formData={formData} updateFormData={updateFormData} />;
      case 'editors':
        return <EditorsStep formData={formData} updateFormData={updateFormData} />;
      case 'review':
        return <ReviewStep formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={onNavigateBack}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#4195A3] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Submissions</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 bg-white border-r border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Submit Your Research</h2>
            <nav className="space-y-2">
              {steps.map((step) => {
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => handleStepClick(step.id)}
                    className={`w-full text-left flex items-center gap-2 p-3 rounded transition-colors ${
                      currentStep === step.id
                        ? 'bg-[#4195A3] text-white'
                        : isStepCompleted(step.id)
                        ? 'text-gray-600 hover:bg-gray-100'
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium">{step.number}</span>
                    <span>{step.label}</span>
                    {currentStep === step.id && <ChevronRight size={16} className="ml-auto" />}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-white">
            <div className="mx-auto px-12 py-8" style={{ maxWidth: '1400px' }}>
              {/* Progress Bar */}
              <div className="flex items-center justify-between mb-8 max-w-3xl">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                          isStepCompleted(step.id)
                            ? 'bg-[#4195A3] text-white'
                            : currentStep === step.id
                            ? 'bg-[#4195A3] text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {isStepCompleted(step.id) ? <Check size={20} /> : step.number}
                      </div>
                      <span className="text-xs mt-2 text-gray-600">{step.label}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`h-1 flex-1 mx-2 -mt-5 ${
                          isStepCompleted(step.id) ? 'bg-[#4195A3]' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Step Content */}
              <div className="max-w-4xl">
                {renderStepContent()}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={getCurrentStepIndex() > 0 ? handleBack : onNavigateBack}
                    className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Back
                  </button>
                  {currentStep !== 'review' ? (
                    <button
                      onClick={handleNext}
                      className="px-6 py-2 bg-[#4195A3] text-white rounded hover:bg-[#327d89] transition-colors"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitClick}
                      disabled={!formData.finalConfirmation}
                      className="px-6 py-2 bg-[#4195A3] text-white rounded hover:bg-[#327d89] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Manuscript
                    </button>
                  )}
                </div>
              </div>
            </div>
          </main>
      </div>

      {/* Submit confirmation modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Confirm submission</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to submit? You cannot undo this.</p>
            {submitError && (
              <p className="text-red-600 text-sm mb-4">{submitError}</p>
            )}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => !submitting && setShowConfirmModal(false)}
                disabled={submitting}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={performSubmit}
                disabled={submitting}
                className="px-4 py-2 bg-[#4195A3] text-white rounded hover:bg-[#327d89] disabled:opacity-50"
              >
                {submitting ? 'Submitting…' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
