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
