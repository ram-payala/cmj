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

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Intellectual Property and Copyright</h3>
          <p className="mb-4">
            Unless otherwise indicated, all intellectual property rights in the Website, including its design, layout, logo, editorial structure, and digital architecture, are owned by Croatian Medical Journal or its licensors. The contents of published articles are protected by copyright and may be licensed under Creative Commons or similar open access agreements. Authors retain rights in accordance with the Journal&apos;s copyright and licensing policy, which will be specified on each published article.
          </p>
          <p>
            In some instances, the Journal may require a transfer of copyright from authors. In such cases, the Journal will obtain the right to publish, distribute, and archive the work in all media formats, while authors retain their moral rights of authorship. Responsibility for securing permissions for any third-party material incorporated into a manuscript rest entirely with the author.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Author Responsibilities and Submissions</h3>
          <p className="mb-4">
            By submitting a manuscript, authors confirm that their submission represents original work not previously published and not under consideration elsewhere, unless explicitly acknowledged. All listed co-authors must have made significant contributions, approved the final version, and consented to submission. Submissions must be accurate, free of plagiarism, and prepared in accordance with recognized standards of scientific integrity.
          </p>
          <p className="mb-4">
            Authors must disclose all relevant conflicts of interest, financial or otherwise, that could be perceived to influence their work. Research involving human or animal subjects must comply with ethical standards, including the Declaration of Helsinki, and must have approval from the appropriate ethics committee. Documentation of such approval must be provided upon request.
          </p>
          <p>
            Any fabrication, falsification, plagiarism, or failure to comply with ethical standards may result in rejection, retraction, or notification to relevant institutions or funding bodies. The Journal follows the guidelines of the Committee on Publication Ethics (COPE) in handling ethical breaches.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Editorial and Peer Review Process</h3>
          <p className="mb-4">
            The Journal employs a rigorous editorial and peer review process to ensure the quality, originality, and relevance of published material. Manuscripts deemed suitable are sent to independent reviewers selected for their subject expertise. Peer review is conducted confidentially, and reviewers are expected to provide constructive, unbiased assessments. Authors may be required to revise their manuscripts in response to reviewer feedback.
          </p>
          <p>
            The final decision regarding acceptance or rejection rests with the Editor-in-Chief and the Editorial Board. While the Journal strives for efficiency, the review process may vary depending on the complexity of the submission. The Journal cannot guarantee acceptance, even after revisions, and reserves the right to reject any submission at its sole discretion.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Open Access Policy</h3>
          <p className="mb-4">
            Croatian Medical Journal is committed to the principle of open access publishing. All accepted articles are made freely available to readers worldwide without subscription or access barriers. Articles are distributed under Creative Commons or other open access licenses, which clearly specify permitted uses, including reproduction, adaptation, and redistribution. Users must comply with the terms of the applicable license and provide proper attribution to the original work in all cases.
          </p>
          <p>
            Authors publishing in the Journal accept that their work will be available publicly and agree to the applicable licensing terms. The Journal does not charge subscription fees for access, but publication may be subject to article processing charges (APCs) as specified in the Journal&apos;s policies.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Disclaimer of Medical Liability</h3>
          <p>
            The materials published in the Journal are intended for academic, educational, and research purposes only. They do not constitute professional medical advice, diagnosis, or treatment. Readers should not rely solely on information contained in the Journal for clinical decision-making and must consult qualified healthcare professionals for patient care. The Journal, its editors, and authors accept no responsibility for any harm, loss, or damage arising from reliance on published material.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Limitation of Liability</h3>
          <p>
            To the maximum extent permitted by law, the Journal, its Publisher, editors, and affiliates disclaim liability for any direct, indirect, incidental, consequential, or punitive damages arising from the use of the Website or its contents. The Journal does not guarantee that the Website will operate without interruption, error, or security vulnerabilities. Users assume full responsibility for their use of the Website and any risks associated with downloading or using its content.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Privacy and Data Protection</h3>
          <p>
            The Journal is committed to safeguarding the privacy of authors, reviewers, and readers. Personal information collected through manuscript submissions, peer review, and user registrations will be used solely for editorial and publishing purposes. The Journal complies with applicable data protection laws, including the General Data Protection Regulation (GDPR). Personal data will not be shared with third parties without consent, except where required by law.
          </p>
          <p className="mt-4">
            Users may request access to their personal data, correction of inaccuracies, or deletion of records in accordance with applicable regulations. For details, users are directed to the Journal&apos;s Privacy Policy.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">External Links</h3>
          <p>
            The Website may provide links to external websites operated by third parties. These links are offered for informational and convenience purposes only. The Journal does not endorse, control, or guarantee the accuracy or availability of external resources and disclaims any liability for damages resulting from their use.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Amendments to Terms</h3>
          <p>
            The Journal reserves the right to amend or update these Terms and Conditions at any time. Revised Terms will take effect immediately upon posting on the Website. Users are encouraged to review this page regularly to remain informed of any changes. Continued use of the Website following revisions constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Governing Law and Jurisdiction</h3>
          <p>
            These Terms and Conditions are governed by and construed in accordance with the laws of the Republic of Croatia and applicable European Union regulations. Any disputes arising under or in connection with the use of the Website shall be subject to the exclusive jurisdiction of the competent courts in Zagreb, Croatia.
          </p>
        </section>
      </div>
    </div>
  );
}
