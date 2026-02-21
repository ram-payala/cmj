import { Home } from 'lucide-react';

interface CopyrightLicensingProps {
  onNavigateHome: () => void;
}

export default function CopyrightLicensing({ onNavigateHome }: CopyrightLicensingProps) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
        <button onClick={onNavigateHome} className="flex items-center gap-1 hover:text-[#4195A3] transition-colors">
          <Home size={16} className="text-[#4195A3]" />
          <span className="text-[#4195A3]">HOME</span>
        </button>
        <span>/</span>
        <span>Copyright & Licensing</span>
      </div>

      <h2 className="text-4xl font-bold text-gray-700 mb-8">
        Copyright & Licensing
      </h2>

      <div className="space-y-8">
        <section>
          <p className="text-gray-700 leading-relaxed">
            <em>Acta Clinica Croatica</em> is an international, peer-reviewed, open access journal committed to
            promoting transparency, accessibility, and responsible dissemination of scholarly research. This page
            sets out the copyright and licensing terms that apply to all content published in the Journal.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-gray-700 mb-4">
            Copyright Ownership
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Unless otherwise agreed in writing, copyright in articles published in <em>Acta Clinica Croatica</em>{' '}
            is transferred to the Journal upon acceptance. This transfer enables the Journal to publish,
            reproduce, distribute, archive, and make the work accessible in both print and digital formats
            worldwide. Authors retain moral rights of authorship, including the right to be credited and to
            object to derogatory treatment of their work.
          </p>
          <p className="text-gray-700 leading-relaxed">
            In specific cases, where funding bodies or institutions mandate that authors retain copyright, the
            Journal may publish under an alternative copyright agreement. Such arrangements must be communicated
            and approved at the time of submission.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-gray-700 mb-4">
            Author Rights
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Authors who publish with <em>Acta Clinica Croatica</em> retain certain rights to their work. They
            include the right to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 mt-3 text-gray-700">
            <li>Use the article in their own teaching and presentations</li>
            <li>Share the article on personal or institutional websites</li>
            <li>Include the article in grant applications and CVs</li>
            <li>Post preprints or accepted manuscripts in institutional repositories</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
