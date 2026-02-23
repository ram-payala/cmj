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

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Licensing of Published Content</h3>
          <p className="mb-4">
            All articles published in the Journal are made available under an open access license to ensure free and unrestricted access to research worldwide. Unless otherwise indicated on the article itself, Croatian Medical Journal applies the Creative Commons Attribution-NonCommercial (CC BY-NC) License.
          </p>
          <p>
            Under the CC BY-NC license, users are permitted to read, download, copy, distribute, print, and adapt published works for non-commercial purposes, provided that proper credit is given to the original authors and source. Any commercial use of published material requires prior written permission from the Journal.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Third-Party Material</h3>
          <p>
            Authors are responsible for obtaining permission to use any copyrighted material (such as figures, tables, or images) that is not their own original work. Documentation of such permissions must be provided to the Journal at the time of submission. Failure to secure appropriate permissions may result in delays or withdrawal of the manuscript.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Preprints and Prior Versions</h3>
          <p>
            Croatian Medical Journal permits authors to post preprints of their manuscripts (prior to peer review) in recognized preprint servers or institutional repositories. However, once accepted and published in the Journal, the official published version should be cited in preference to preprints. Authors are encouraged to update preprint records with a DOI link to the final version in the Journal.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Reuse of Journal Content</h3>
          <p>
            Readers and institutions may use Journal content for educational, research, and non-commercial purposes in accordance with the terms of the applicable Creative Commons license. Reuse for commercial distribution, systematic reproduction, or the creation of derivative commercial products is not permitted without express written authorization from the Journal.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Archiving and Preservation</h3>
          <p>
            Croatian Medical Journal is committed to the long-term preservation of its scholarly content. All published articles are archived in institutional repositories, indexing services, and permanent digital archives to ensure ongoing accessibility, even in the event that the Journal ceases publication.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Disclaimer</h3>
          <p>
            While the Journal endeavors to ensure that copyright and licensing information is accurate at the time of publication, responsibility for compliance with copyright law rests with the authors and users of published content. The Journal accepts no liability for copyright infringement arising from submitted or published works.
          </p>
        </section>
      </div>
    </div>
  );
}
