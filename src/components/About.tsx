import { Home } from 'lucide-react';

interface AboutProps {
  onNavigateHome: () => void;
}

export default function About({ onNavigateHome }: AboutProps) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
        <button onClick={onNavigateHome} className="flex items-center gap-1 hover:text-[#4195A3] transition-colors">
          <Home size={16} className="text-[#4195A3]" />
          <span className="text-[#4195A3]">HOME</span>
        </button>
        <span>/</span>
        <span>About the Journal</span>
      </div>

      <h2 className="text-4xl font-bold text-gray-800 mb-8">
        About the Journal
      </h2>

      <div className="prose prose-lg max-w-none space-y-6 text-gray-700 leading-relaxed">
        <p>
          <strong className="text-gray-900">Croatian Medical Journal</strong> is an international, peer-reviewed medical journal dedicated to advancing knowledge across the full spectrum of biomedical and clinical sciences. The journal provides a multidisciplinary platform for the publication of original research, comprehensive reviews, case studies, and scholarly discussions that contribute to evidence-based medical practice and scientific understanding.
        </p>

        <p>
          The journal encourages submissions from all branches of medicine and health sciences, with an emphasis on research that bridges laboratory investigation and clinical application. Its readership includes clinicians, biomedical researchers, public health professionals, and policy-makers interested in current developments in patient care, diagnostics, and therapeutic innovation.
        </p>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Why Publish with CMJ</h3>

        <ul className="list-disc pl-6 space-y-2">
          <li>Rigorous double-blind peer review</li>
          <li>Transparent editorial process</li>
          <li>Open access publication</li>
          <li>Rapid decision and publication timelines</li>
        </ul>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Aims and Scope</h3>

        <ul className="list-disc pl-6 space-y-2">
          <li>Clinical Medicine</li>
          <li>Surgery and Subspecialties</li>
          <li>Public Health and Epidemiology</li>
          <li>Basic Medical Sciences</li>
          <li>Translational Medicine</li>
          <li>Medical Education</li>
          <li>Healthcare Systems and Policy</li>
          <li>Bioethics</li>
        </ul>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Article Types</h3>

        <ul className="list-disc pl-6 space-y-2">
          <li>Original Research Articles</li>
          <li>Review Articles</li>
          <li>Systematic Reviews & Meta-Analyses</li>
          <li>Case Reports</li>
          <li>Short Communications</li>
          <li>Editorials</li>
          <li>Letters to the Editor</li>
        </ul>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Publication Ethics</h3>

        <p>
          The Croatian Medical Journal is committed to maintaining the highest standards of publication ethics and follows the guidelines established by the International Committee of Medical Journal Editors (ICMJE) and the Committee on Publication Ethics (COPE). All submitted manuscripts undergo rigorous peer review by experts in the relevant field to ensure scientific validity, ethical compliance, and contribution to medical knowledge.
        </p>

        <p>
          The journal is indexed in major international databases including PubMed, Web of Science, and Scopus, ensuring maximum visibility and impact for published research.
        </p>
      </div>
    </div>
  );
}
