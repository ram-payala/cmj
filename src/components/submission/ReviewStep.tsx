import { StepComponentProps } from '../../types/submission';

export default function ReviewStep({ formData, updateFormData }: StepComponentProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Review Your Submission</h2>
      <p className="text-gray-700 mb-8 leading-relaxed">
        Please review all the information below before submitting your manuscript. You can go back to any section to
        make changes if needed.
      </p>

      <div className="space-y-6">
        {/* Manuscript Details */}
        <div className="bg-white border border-gray-200 rounded p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Manuscript Details</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium text-gray-700">Title:</span>{' '}
              <span className="text-gray-600">{formData.title || 'Not provided'}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Article Type:</span>{' '}
              <span className="text-gray-600">{formData.articleType || 'Not provided'}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Keywords:</span>{' '}
              <span className="text-gray-600">{formData.keywords || 'Not provided'}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Abstract:</span>{' '}
              <span className="text-gray-600">{formData.abstract || 'Not provided'}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Privacy Consent:</span>{' '}
              <span className="text-gray-600">{formData.privacyConsent ? '✓ Agreed' : 'Not agreed'}</span>
            </div>
          </div>
        </div>

        {/* Uploaded Files */}
        <div className="bg-white border border-gray-200 rounded p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Uploaded Files</h3>
          {formData.files.length > 0 ? (
            <ul className="space-y-2">
              {formData.files.map((file, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {file.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600">No files uploaded</p>
          )}
        </div>

        {/* Contributors */}
        <div className="bg-white border border-gray-200 rounded p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Contributors</h3>
          {formData.contributors.length > 0 ? (
            <div className="space-y-3">
              {formData.contributors.map((contributor) => (
                <div key={contributor.id} className="text-sm">
                  <div className="font-medium text-gray-800">
                    {contributor.name} {contributor.role}
                  </div>
                  <div className="text-gray-600">{contributor.affiliation}</div>
                  <div className="text-gray-500">{contributor.email}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600">No contributors added</p>
          )}
        </div>

        {/* Comments for Editors */}
        <div className="bg-white border border-gray-200 rounded p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Comments for Editors</h3>
          <p className="text-sm text-gray-600">{formData.editorComments || 'No comments provided'}</p>
        </div>

        {/* Final Confirmation */}
        <div className="bg-blue-50 border border-[#4195A3] rounded p-6">
          <p className="text-gray-700 mb-4">
            By submitting this manuscript, you confirm that all information is accurate and that you have the right to
            submit this work to <strong>CROATIAN MEDICAL JOURNAL</strong>. You also agree to our publication terms and
            conditions.
          </p>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.finalConfirmation}
              onChange={(e) => updateFormData({ finalConfirmation: e.target.checked })}
              className="mt-1"
            />
            <span className="text-sm text-gray-700">
              I confirm that all information is accurate and I agree to the terms and conditions.{' '}
              <span className="text-red-500">*</span>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
