import { Home } from 'lucide-react';

interface PublishingEthicsProps {
  onNavigateHome: () => void;
}

export default function PublishingEthics({ onNavigateHome }: PublishingEthicsProps) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
        <button onClick={onNavigateHome} className="flex items-center gap-1 hover:text-[#4195A3] transition-colors">
          <Home size={16} className="text-[#4195A3]" />
          <span className="text-[#4195A3]">HOME</span>
        </button>
        <span>/</span>
        <span>Publishing Ethics</span>
      </div>

      <h2 className="text-4xl font-bold text-gray-800 mb-8">
        Publishing Ethics
      </h2>

      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            Acta Clinica Croatica
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            <em>Acta Clinica Croatica</em> is dedicated to maintaining the highest ethical standards in scholarly
            publishing. As a peer-reviewed open-access journal in the field of clinical medical sciences,
            biomedicine, and healthcare, we expect all parties involved in the publication process—authors,
            reviewers, editors, and the publisher—to adhere to internationally accepted standards of ethical
            conduct. Our editorial policies and ethical guidelines align with the principles of the{' '}
            <strong>Committee on Publication Ethics (COPE)</strong>, the{' '}
            <strong>International Committee of Medical Journal Editors (ICMJE)</strong>, and the{' '}
            <strong>World Association of Medical Editors (WAME)</strong>.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            1. Duties and Responsibilities of Authors
          </h3>

          <h4 className="text-base font-semibold text-gray-800 mb-2 mt-4">
            1.1 Originality and Plagiarism
          </h4>
          <p className="text-gray-700 leading-relaxed">
            Authors must ensure that their work is entirely original. Any content or data derived from other
            sources must be properly cited or quoted. Plagiarism in any form—including self-plagiarism,
            uncredited use of others' work, or data fabrication—is strictly prohibited and will result in
            immediate rejection or retraction of the article.
          </p>

          <h4 className="text-base font-semibold text-gray-800 mb-2 mt-4">
            1.2 Authorship Criteria
          </h4>
          <p className="text-gray-700 leading-relaxed">
            Authorship should be limited to those who have made significant contributions to the conception,
            design, execution, or interpretation of the study. All authors must approve the final version of the
            manuscript and agree to its submission. Contributors who do not meet authorship criteria should be
            acknowledged appropriately.
          </p>
        </section>
      </div>
    </div>
  );
}
