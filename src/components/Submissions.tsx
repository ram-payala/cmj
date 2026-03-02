import { Home } from 'lucide-react';

interface SubmissionsProps {
  onNavigateHome: () => void;
  onNavigateLogin?: () => void;
  onNavigateRegister?: () => void;
  onMakeSubmission?: () => void;
  isLoggedIn?: boolean;
}

export default function Submissions({ onNavigateHome, onNavigateLogin, onNavigateRegister, onMakeSubmission, isLoggedIn }: SubmissionsProps) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
        <button onClick={onNavigateHome} className="flex items-center gap-1 hover:text-[#4195A3] transition-colors">
          <Home size={16} className="text-[#4195A3]" />
          <span className="text-[#4195A3]">HOME</span>
        </button>
        <span>/</span>
        <span>Submissions</span>
      </div>

      <h2 className="text-4xl font-bold text-gray-800 mb-8">
        Submissions
      </h2>

      <div className="bg-blue-50 border-l-4 border-[#4195A3] p-6 mb-8 flex items-center justify-between">
        <p className="text-gray-700">
          {!isLoggedIn && (
            <>
              <button type="button" onClick={onNavigateLogin} className="text-[#4195A3] hover:underline font-medium">
                Login
              </button>
              {' or '}
              <button type="button" onClick={onNavigateRegister} className="text-[#4195A3] hover:underline font-medium">
                Register
              </button>
              {' to make a submission.'}
            </>
          )}
          {isLoggedIn && <span>Submit a new manuscript or view your submissions.</span>}
        </p>
        {onMakeSubmission && (
          <button
            onClick={onMakeSubmission}
            className="px-6 py-2 bg-[#4195A3] text-white rounded hover:bg-[#327d89] transition-colors font-medium"
          >
            My Submissions
          </button>
        )}
      </div>

      <div className="space-y-8">
        <section>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Submission Preparation Checklist
          </h3>
          <p className="text-gray-700 mb-4">All submissions must meet the following requirements.</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>This submission meets the requirements outlined in the Author Guidelines.</li>
            <li>This submission has not been previously published, nor is it before another journal for consideration.</li>
            <li>All references have been checked for accuracy and completeness.</li>
            <li>All tables and figures have been numbered and labeled.</li>
            <li>Permission has been obtained to publish all photos, datasets and other material provided with this submission.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Author Guidelines
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            We welcome high-quality submissions that align with the aims and scope of the journal. All manuscripts
            undergo an initial editorial evaluation to assess their suitability, originality, and adherence to journal
            standards. Submissions deemed appropriate will proceed to a rigorous peer-review process. Final decisions
            regarding acceptance or rejection are made based on reviewers&apos; recommendations and editorial judgment.
          </p>

          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            Submission Requirements
          </h4>
          <p className="text-gray-700 leading-relaxed mb-2">
            Prior to submission, authors must ensure the following:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>
              <span className="font-semibold">Scope and Relevance:</span> The manuscript clearly aligns with the
              journal&apos;s thematic focus and academic standards.
            </li>
            <li>
              <span className="font-semibold">Originality:</span> The work is original, has not been published elsewhere,
              and is not under consideration by another journal.
            </li>
            <li>
              <span className="font-semibold">Authorship Consent:</span> All listed authors have made significant
              contributions to the work and have approved the final version of the manuscript.
            </li>
            <li>
              <span className="font-semibold">Permissions:</span> Written permission has been obtained for the use of any
              copyrighted materials, including photographs, figures, tables, documents, or datasets.
            </li>
            <li>
              <span className="font-semibold">Ethical Approval:</span> Where applicable, research involving human
              participants, animals, or sensitive data has received approval from an appropriate ethics committee in
              accordance with national and institutional regulations.
            </li>
          </ul>

          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            Editorial Screening
          </h4>
          <p className="text-gray-700 leading-relaxed mb-2">
            All submissions are subject to preliminary editorial screening. Manuscripts that fail to meet minimum
            quality standards, lack scientific rigor, fall outside the journal&apos;s scope, or do not comply with
            formatting requirements may be desk rejected without external peer review.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            To improve the likelihood of progressing to peer review, authors are advised to ensure:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>The study design is methodologically sound and clearly described.</li>
            <li>The research objectives and arguments are logically structured and well-articulated.</li>
            <li>The title is concise, precise, and informative.</li>
            <li>The abstract is comprehensive and capable of standing independently.</li>
            <li>The manuscript is written in clear, professional academic language.</li>
          </ul>

          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            Preparing Your Submission
          </h4>
          <p className="text-gray-700 leading-relaxed">
            Once you are confident that your manuscript meets the above standards, please carefully follow the
            journal&apos;s submission checklist and formatting instructions prior to uploading your manuscript through
            the online submission system. Adherence to these guidelines will facilitate a smooth review process and
            enhance the overall quality and impact of your submission.
          </p>
        </section>
      </div>
    </div>
  );
}
