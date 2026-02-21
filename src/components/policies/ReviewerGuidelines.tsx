import { Home } from 'lucide-react';

interface ReviewerGuidelinesProps {
  onNavigateHome: () => void;
}

export default function ReviewerGuidelines({ onNavigateHome }: ReviewerGuidelinesProps) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
        <button onClick={onNavigateHome} className="flex items-center gap-1 hover:text-[#4195A3] transition-colors">
          <Home size={16} className="text-[#4195A3]" />
          <span className="text-[#4195A3]">HOME</span>
        </button>
        <span>/</span>
        <span>Reviewer Guidelines</span>
      </div>

      <h2 className="text-4xl font-bold text-gray-800 mb-8">
        Reviewer Guidelines
      </h2>

      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            Review Guidelines for ACTA CLINICA CROATICA
          </h3>
        </section>

        <section>
          <p className="text-gray-700 leading-relaxed">
            <em>ACTA CLINICA CROATICA</em> is a peer-reviewed scientific journal that employs a{' '}
            <strong>double-blind review process</strong>, ensuring that the identities of both authors and
            reviewers remain confidential throughout the evaluation.
          </p>
        </section>

        <section>
          <p className="text-gray-700 leading-relaxed">
            As a reviewer, we kindly ask you to consider the following when conducting your assessment:
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Key Points to Evaluate:
          </h3>
          <ul className="space-y-4 ml-6">
            <li className="text-gray-700 leading-relaxed">
              <strong>Compliance with Submission Criteria:</strong> Ensure the manuscript adheres to the
              journal's guidelines regarding length, scope, formatting, and presentation.
            </li>
            <li className="text-gray-700 leading-relaxed">
              <strong>Completion of Review Form:</strong> Provide clear responses to each question on the review
              form to reflect your evaluation of the manuscript's overall quality.
            </li>
            <li className="text-gray-700 leading-relaxed">
              <strong>Balanced Critique:</strong> If you disagree with the authors' views, you may allow them to
              stand provided they are evidence-based. Constructive criticism is highly valued and welcomed by
              both the editorial team and the authors.
            </li>
            <li className="text-gray-700 leading-relaxed">
              <strong>Rejection Justification:</strong> If you recommend that the manuscript be declined, please
              provide detailed and thoughtful reasoning. Thorough feedback—whether positive or negative—is
              appreciated.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
