import { Home } from 'lucide-react';

interface TermsConditionsProps {
  onNavigateHome: () => void;
}

export default function TermsConditions({ onNavigateHome }: TermsConditionsProps) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
        <button onClick={onNavigateHome} className="flex items-center gap-1 hover:text-[#4195A3] transition-colors">
          <Home size={16} className="text-[#4195A3]" />
          <span className="text-[#4195A3]">HOME</span>
        </button>
        <span>/</span>
        <span>Terms & Conditions</span>
      </div>

      <h2 className="text-4xl font-bold text-gray-700 mb-8">
        Terms & Conditions
      </h2>

      <div className="space-y-8">
        <section>
          <h3 className="text-2xl font-bold text-gray-700 mb-4">
            Introduction
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            These Terms and Conditions govern the use of the website Acta Clinica Croatica (hereinafter "the
            Journal" or "the Website"), an open access peer-reviewed scientific periodical dedicated to the
            advancement of clinical and biomedical sciences. By accessing, browsing, submitting manuscripts, or
            otherwise using the Website, users acknowledge that they have read, understood, and agreed to be
            bound by these Terms and Conditions. If you do not agree, you must refrain from using the Website
            and its services.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The Website serves as the official online platform of the Journal, offering open access to articles,
            supplementary materials, editorial announcements, and related scholarly resources. Users are advised
            that these Terms apply to all activities conducted on or through the Website, including manuscript
            submission, editorial correspondence, peer review, and article retrieval.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-gray-700 mb-4">
            Use of Website and Content
          </h3>
          <p className="text-gray-700 leading-relaxed">
            The primary purpose of the Website is to facilitate the dissemination of scholarly research in
            medicine and related fields. Users may read, download, and print articles and other published
            materials for personal, academic, and educational use, provided that all copyright notices,
            authorship details, and citations remain intact. Unauthorized reproduction, modification, or
            distribution for commercial purposes is strictly prohibited unless prior written consent is obtained
            from the Journal.
          </p>
        </section>
      </div>
    </div>
  );
}
