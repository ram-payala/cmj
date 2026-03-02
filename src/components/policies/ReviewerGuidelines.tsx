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

      <h2 className="text-4xl font-bold text-gray-800 mb-8">Reviewer Guidelines</h2>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Review Policy</h3>
          <p className="mb-4">
            Croatian Medical Journal is a peer-reviewed international journal that follows a strict double-blind peer review process. The identities of both authors and reviewers are kept confidential to ensure an impartial, fair, and unbiased evaluation of all submitted manuscripts.
          </p>
          <p className="mb-4">
            Reviewers play a critical role in maintaining the scientific quality, integrity, and credibility of the journal. We sincerely appreciate your expertise and time dedicated to the review process.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Guidance for Reviewers</h3>
          <p className="mb-2">When assessing a manuscript, reviewers are kindly requested to consider the following:</p>
          <ol className="list-decimal pl-6 space-y-2 mb-4">
            <li>
              <span className="font-semibold">Adherence to Journal Requirements:</span> Evaluate whether the manuscript complies with the journal&apos;s submission guidelines, including scope, structure, formatting, length, and overall presentation standards.
            </li>
            <li>
              <span className="font-semibold">Scientific Quality and Rigor:</span> Assess the originality, methodological soundness, clarity of research objectives, validity of results, and relevance to clinical practice or medical science. Determine whether conclusions are supported by sufficient evidence.
            </li>
            <li>
              <span className="font-semibold">Completion of the Review Form:</span> Please respond carefully and comprehensively to all questions in the reviewer evaluation form. Your detailed comments assist both the editorial team in decision-making and the authors in improving their work.
            </li>
            <li>
              <span className="font-semibold">Constructive and Balanced Feedback:</span> Provide objective, respectful, and constructive comments. Differences in interpretation or perspective are acceptable when supported by evidence. Reviewers are encouraged to offer specific suggestions that can strengthen the manuscript.
            </li>
            <li>
              <span className="font-semibold">Justification for Recommendation:</span> If recommending rejection, please provide clear, detailed, and well-reasoned explanations. Thorough and thoughtful feedback—whether recommending acceptance, revision, or rejection—is highly valued and contributes to the integrity of the peer-review process.
            </li>
          </ol>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Review Form Evaluation Criteria</h3>
          <p className="mb-4">Please assess the manuscript based on the following questions:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Is the manuscript relevant to the journal&apos;s readership?</li>
            <li>Does the title accurately reflect the content?</li>
            <li>Is the abstract informative and sufficient when read independently?</li>
            <li>Does the introduction clearly define the subject, research context, and relevance?</li>
            <li>Are the methods and materials appropriately detailed and clearly described?</li>
            <li>Are the results presented clearly and logically?</li>
            <li>Does the discussion connect the findings with existing literature and knowledge?</li>
            <li>Are the interpretations and conclusions supported by the data?</li>
            <li>Is the structure and organization of the manuscript coherent and clear?</li>
            <li>Is the length of the manuscript appropriate for its content?</li>
            <li>Are illustrations and tables adequate, relevant, and informative?</li>
            <li>
              Are the references appropriate, sufficient, and compliant with the journal&apos;s reference style?
              (Refer to: NLM Reference Style)
            </li>
          </ol>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Overall Manuscript Evaluation</h3>
          <p className="mb-2">Please select one of the following options:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>A – Accept without changes</li>
            <li>B – Accept with minor revisions</li>
            <li>C – Major revisions required before reconsideration</li>
            <li>D – Reject</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Suggested Manuscript Category</h3>
          <p className="mb-2">Please classify the manuscript into one of the following categories:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>A – Original Scientific Paper</li>
            <li>B – Preliminary Communication</li>
            <li>C – Review Article</li>
            <li>D – Professional Paper</li>
            <li>E – Conference Paper</li>
            <li>F – Case Report</li>
          </ul>
        </section>

        <section>
          <p>
            We encourage you to include comments and elaborations where appropriate, as well as any additional
            remarks that may assist the authors and editors in their evaluation.
          </p>
        </section>
      </div>
    </div>
  );
}
