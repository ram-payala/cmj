import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { StepComponentProps } from '../../types/submission';

interface DetailsStepProps extends StepComponentProps {
  onNavigateToGuidelines?: () => void;
  validationTrigger?: number;
}

export default function DetailsStep({ formData, updateFormData, onNavigateToGuidelines, validationTrigger }: DetailsStepProps) {
  const [isPrivacyExpanded, setIsPrivacyExpanded] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.articleType) {
      newErrors.articleType = 'Article type is required';
    }
    
    if (!formData.abstract.trim()) {
      newErrors.abstract = 'Abstract is required';
    }
    
    if (!formData.privacyConsent) {
      newErrors.privacyConsent = 'Privacy consent is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate when validation trigger changes (from parent)
  useEffect(() => {
    if (validationTrigger !== undefined && validationTrigger > 0) {
      validate();
    }
  }, [validationTrigger]);

  // Auto-validate when formData changes and errors exist (for real-time feedback)
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      validate();
    }
  }, [formData.title, formData.articleType, formData.abstract, formData.privacyConsent]);

  return (
    <div data-step="details">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Details</h2>

      {/* Before you begin */}
      <div className="bg-blue-50 border border-[#4195A3] rounded p-6 mb-8">
        <p className="text-gray-700 leading-relaxed">
          Thank you for submitting to <strong>CROATIAN MEDICAL JOURNAL</strong>. The submission process consists of
          uploading your files, identifying co-authors, and providing a title and abstract. Please read our{' '}
          <button
            type="button"
            onClick={onNavigateToGuidelines}
            className="text-[#4195A3] hover:underline font-medium"
          >
            Submission Guidelines
          </button>{' '}
          before submitting. We encourage you to provide as many details as possible. You can save your submission and
          return to it later, and you can review and correct all information before final submission.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => {
              updateFormData({ title: e.target.value });
              if (errors.title) setErrors({ ...errors, title: '' });
            }}
            placeholder="Enter your manuscript title"
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#4195A3] focus:border-transparent ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Article Type <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.articleType}
            onChange={(e) => {
              updateFormData({ articleType: e.target.value });
              if (errors.articleType) setErrors({ ...errors, articleType: '' });
            }}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#4195A3] focus:border-transparent ${
              errors.articleType ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select an article type</option>
            <option value="original-research">Original Research Article</option>
            <option value="clinical-trial">Clinical Trial or Case Study</option>
            <option value="review-article">Review Article</option>
            <option value="systematic-review">Systematic Review</option>
            <option value="meta-analysis">Meta-Analysis</option>
            <option value="theoretical-methodological">Theoretical and Methodological Article</option>
            <option value="short-communication">Short Communication</option>
            <option value="case-report">Case Report</option>
          </select>
          {errors.articleType && <p className="text-red-500 text-sm mt-1">{errors.articleType}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
          <p className="text-sm text-gray-600 mb-2">
            Keywords are typically one- to three-word phrases that are used to indicate the main topics of a submission.
          </p>
          <input
            type="text"
            value={formData.keywords}
            onChange={(e) => updateFormData({ keywords: e.target.value })}
            placeholder="Enter keywords separated by commas"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4195A3] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Abstract <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.abstract}
            onChange={(e) => {
              updateFormData({ abstract: e.target.value });
              if (errors.abstract) setErrors({ ...errors, abstract: '' });
            }}
            placeholder="Enter your abstract here...."
            rows={8}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#4195A3] focus:border-transparent ${
              errors.abstract ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.abstract && <p className="text-red-500 text-sm mt-1">{errors.abstract}</p>}
        </div>

        {/* Privacy Consent - Expandable */}
        <div className="bg-blue-50 border border-[#4195A3] rounded">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800">
                Privacy Consent <span className="text-red-500">*</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsPrivacyExpanded(!isPrivacyExpanded)}
                className="flex items-center gap-2 text-[#4195A3] hover:text-[#327d89] font-medium text-sm"
              >
                <span>Read the CROATIAN MEDICAL JOURNAL Privacy Statement</span>
                {isPrivacyExpanded ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
            </div>
          
          </div>
          
          {isPrivacyExpanded && (
            <div className="px-6 pb-6 max-h-96 overflow-y-auto border-t border-[#4195A3] mt-4 pt-4">
              <div className="text-sm text-gray-700 space-y-4">
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Privacy Statement</h4>
                  <p className="mb-4">
                    CROATIAN MEDICAL JOURNAL is committed to protecting your privacy. This Privacy Statement explains
                    how we collect, use, store, and protect your personal information when you use our website and
                    submission system.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 mb-2">1. Information We Collect</h4>
                  <p className="mb-2">We collect the following types of information with your explicit consent:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Name, email address, and contact details</li>
                    <li>Affiliation, country, and professional information</li>
                    <li>Manuscript submissions and related files</li>
                    <li>Usage data and preferences</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 mb-2">2. How We Use Your Information</h4>
                  <p className="mb-2">We use your information for the following purposes:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Managing your account and profile</li>
                    <li>Processing manuscript submissions and peer review</li>
                    <li>Communicating important updates and notifications</li>
                    <li>Improving our services and user experience</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 mb-2">3. Consent</h4>
                  <p>
                    By using our website and submitting manuscripts, you provide your information voluntarily. You can
                    withdraw your consent at any time by contacting us. However, withdrawal of consent may affect our
                    ability to process your submissions.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 mb-2">4. Data Security</h4>
                  <p>
                    We implement industry-standard security measures to protect your personal information from
                    unauthorized access, disclosure, alteration, or destruction.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 mb-2">5. Data Access and Control</h4>
                  <p className="mb-2">You have the right to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Access and update your personal information</li>
                    <li>Request deletion of your data</li>
                    <li>Withdraw consent for data processing</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 mb-2">6. Changes to This Statement</h4>
                  <p>
                    We may update this Privacy Statement from time to time. We will notify you of any significant
                    changes by posting the new statement on our website.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="px-6 pb-6">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.privacyConsent}
                onChange={(e) => {
                  updateFormData({ privacyConsent: e.target.checked });
                  if (errors.privacyConsent) setErrors({ ...errors, privacyConsent: '' });
                }}
                className="mt-1"
              />
              <span className="text-sm text-gray-700">
                Yes, I agree to have my data collected and stored according to the privacy statement.
              </span>
            </label>
            {errors.privacyConsent && (
              <p className="text-red-500 text-sm mt-1">{errors.privacyConsent}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
