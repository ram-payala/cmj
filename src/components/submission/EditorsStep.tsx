import { StepComponentProps } from '../../types/submission';

export default function EditorsStep({ formData, updateFormData }: StepComponentProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">For the Editors</h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        Please provide the following details in order to help our editorial team manage your submission. When entering
        metadata, provide entries that you think would be most helpful to the person managing your submission. This
        information can be changed before publication.
      </p>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Comments for the Editor</h3>
        <p className="text-gray-700 mb-4">
          Add any information that you think our editorial staff should know when evaluating your submission.
        </p>
        <textarea
          value={formData.editorComments}
          onChange={(e) => updateFormData({ editorComments: e.target.value })}
          placeholder="Enter any comments for the editorial team..."
          rows={8}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4195A3] focus:border-transparent"
        />
      </div>
    </div>
  );
}
