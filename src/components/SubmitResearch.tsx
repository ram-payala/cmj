import { useState } from 'react';
import { ArrowLeft, ChevronRight, ChevronDown, Check } from 'lucide-react';
import { Step, SubmissionData } from '../types/submission';
import DetailsStep from './submission/DetailsStep';
import UploadStep from './submission/UploadStep';
import ContributorsStep from './submission/ContributorsStep';
import EditorsStep from './submission/EditorsStep';
import ReviewStep from './submission/ReviewStep';

interface SubmitResearchProps {
  onNavigateBack: () => void;
  onNavigateToGuidelines?: () => void;
  userName?: string;
  userInitials?: string;
}

export default function SubmitResearch({ onNavigateBack, onNavigateToGuidelines, userName = 'Admin JoC', userInitials = 'AJ' }: SubmitResearchProps) {
  const [currentStep, setCurrentStep] = useState<Step>('details');
  const [validationTrigger, setValidationTrigger] = useState(0);
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

  const handleSubmit = () => {
    if (formData.finalConfirmation) {
      alert('Submission successful! (Frontend only - no backend integration yet)');
      onNavigateBack();
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="min-h-screen bg-white border-l border-r border-gray-200 mx-auto w-full" style={{ maxWidth: '1500px', width: '100%' }}>
        {/* Header */}
        <header className="bg-[#4195A3] text-white">
          <div className="mx-auto px-12 py-5 flex justify-between items-center" style={{ maxWidth: '1500px' }}>
            <button
              onClick={onNavigateBack}
              className="flex items-center gap-2 hover:text-gray-200 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Submissions</span>
            </button>
            <h1 className="text-2xl font-bold tracking-wide">CROATIAN MEDICAL JOURNAL</h1>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white text-[#4195A3] flex items-center justify-center font-bold">
                {userInitials}
              </div>
              <span>{userName}</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-73px)]">
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
                      onClick={handleSubmit}
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
      </div>
    </div>
  );
}
