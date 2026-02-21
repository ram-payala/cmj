import { Home } from 'lucide-react';

interface AuthorGuidelinesProps {
  onNavigateHome: () => void;
}

export default function AuthorGuidelines({ onNavigateHome }: AuthorGuidelinesProps) {
  return (
    <div>
      <div className="mb-6">
        <div className="bg-gray-100 px-4 py-2 inline-block text-sm font-semibold text-gray-700 mb-4">
          INSTRUCTIONS FOR AUTHORS
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1 hover:text-[#4195A3] transition-colors"
          >
            <Home size={16} className="text-[#4195A3]" />
            <span className="text-[#4195A3]">HOME</span>
          </button>
          <span>/</span>
          <span>Instructions for Authors</span>
        </div>
      </div>

      <h2 className="text-4xl font-bold text-gray-800 mb-8">
        Instructions for Authors
      </h2>

      <div className="space-y-8">
        <section>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            PURPOSE AND FOCUS
          </h3>
          <p className="text-gray-700 leading-relaxed">
            <strong>Acta Clinica Croatica</strong> is an international, peer-reviewed medical journal dedicated to
            publishing high-quality original research that enhances medical knowledge and clinical practice. The
            journal aims to disseminate important medical insights to a global audience. It is published quarterly
            in English.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            MANUSCRIPT SUBMISSION
          </h3>

          <h4 className="text-lg font-semibold text-gray-800 mb-3">
            Language and Guidelines
          </h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            Submissions must be in English and must comply with the{' '}
            <strong>
              Recommendations for the Conduct, Reporting, Editing, and Publication of Scholarly Work in Medical
              Journals
            </strong>{' '}
            by the <strong>International Committee of Medical Journal Editors (ICMJE)</strong>, accessible at:{' '}
            <a
              href="http://www.icmje.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4195A3] hover:underline"
            >
              http://www.icmje.org
            </a>
          </p>

          <h4 className="text-lg font-semibold text-gray-800 mb-3">
            How to Submit
          </h4>

          <h5 className="text-base font-semibold text-gray-800 mb-2">
            Via Email:
          </h5>
          <p className="text-gray-700 leading-relaxed mb-4">
            Manuscripts can be submitted as a word document (DOC) to all members of the editorial board. The
            acceptable formats are a DOC file or a Word file (MS Office 2007 or above).
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            E-mail address for submissions:{' '}
            <a href="mailto:acc@kbcsm.hr" className="text-[#4195A3] hover:underline">
              acc@kbcsm.hr
            </a>
          </p>

          <h5 className="text-base font-semibold text-gray-800 mb-2">
            Via Website:
          </h5>
          <p className="text-gray-700 leading-relaxed">
            Authors may also use the electronic submission system via the journal website. Create your account or
            log in and follow the instructions to complete your submission. The system accepts the above mentioned
            file formats.
          </p>
        </section>
      </div>
    </div>
  );
}
