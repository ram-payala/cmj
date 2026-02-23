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
            Author Guidelines
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Authors are invited to make a submission to this journal. All submissions will be assessed by an editor
            to determine whether they meet the aims and scope of this journal. Those considered to be a good fit will
            be sent for peer review before determining whether they will be accepted or rejected.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Before making a submission, authors are responsible for obtaining permission to publish any material
            included with the submission, such as photos, documents and datasets. All authors identified on the
            submission must consent to be identified as an author. Where appropriate, research should be approved
            by an appropriate ethics committee in accordance with the legal requirements of the study's country.
          </p>
        </section>

        <section>
          <p className="text-gray-700 leading-relaxed">
            An editor may desk reject a submission if it does not meet minimum standards of quality. Before
            submitting, please ensure that the study design and research argument are structured and articulated
            properly. The title should be concise and the abstract should be able to stand on its own. This will
            increase the likelihood of reviewers agreeing to review the paper. When you're satisfied that your
            submission meets this standard, please follow the checklist below to prepare your submission.
          </p>
        </section>
      </div>
    </div>
  );
}
