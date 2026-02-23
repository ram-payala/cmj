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

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            Acta Clinica Croatica
          </h3>
          <p className="mb-4">
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
          <p>
            Authors must ensure that their work is entirely original. Any content or data derived from other
            sources must be properly cited or quoted. Plagiarism in any form—including self-plagiarism,
            uncredited use of others&apos; work, or data fabrication—is strictly prohibited and will result in
            immediate rejection or retraction of the article.
          </p>

          <h4 className="text-base font-semibold text-gray-800 mb-2 mt-4">
            1.2 Authorship Criteria
          </h4>
          <p>
            Authorship should be limited to those who have made significant contributions to the conception,
            design, execution, or interpretation of the study. All authors must approve the final version of the
            manuscript and agree to its submission. Contributors who do not meet authorship criteria should be
            acknowledged appropriately.
          </p>

          <h4 className="text-base font-semibold text-gray-800 mb-2 mt-4">
            1.3 Multiple or Redundant Publication
          </h4>
          <p>
            Authors must not submit the same manuscript simultaneously to more than one journal. Articles that
            substantially overlap with previously published work (including in another language) must clearly
            reference and justify the overlap.
          </p>

          <h4 className="text-base font-semibold text-gray-800 mb-2 mt-4">
            1.4 Data Access and Retention
          </h4>
          <p>
            Authors should be prepared to provide access to raw data or supporting materials upon request by the
            editorial office, especially in cases of suspected misconduct. Authors should also ensure that data is
            stored securely and ethically for a reasonable period after publication.
          </p>

          <h4 className="text-base font-semibold text-gray-800 mb-2 mt-4">
            1.5 Ethical Approval and Informed Consent
          </h4>
          <p>
            For studies involving human participants, authors must confirm that the research was approved by an
            appropriate ethics committee or institutional review board (IRB), and that informed consent was
            obtained from all participants. For animal research, ethical treatment and compliance with relevant
            institutional and national guidelines must be demonstrated.
          </p>

          <h4 className="text-base font-semibold text-gray-800 mb-2 mt-4">
            1.6 Conflict of Interest Disclosure
          </h4>
          <p>
            Authors must disclose any financial or non-financial conflicts of interest that could be perceived as
            influencing the research or its interpretation. Funding sources and any potential conflicts should be
            declared at the end of the manuscript.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            2. Duties and Responsibilities of Editors
          </h3>

          <h4 className="text-base font-semibold text-gray-800 mb-2 mt-4">
            2.1 Editorial Independence
          </h4>
          <p>
            Editors are responsible for making impartial decisions based solely on the scientific merit,
            relevance, originality, and clarity of submitted manuscripts. Decisions are not influenced by authors&apos;
            nationality, institutional affiliation, race, gender, or personal beliefs.
          </p>

          <h4 className="text-base font-semibold text-gray-800 mb-2 mt-4">
            2.2 Confidentiality
          </h4>
          <p>
            Editors and editorial staff must treat all submitted manuscripts as confidential documents. No
            information about a manuscript will be disclosed to anyone other than the corresponding author,
            reviewers, or the publisher as appropriate.
          </p>

          <h4 className="text-base font-semibold text-gray-800 mb-2 mt-4">
            2.3 Fair and Transparent Peer Review
          </h4>
          <p>
            Editors are responsible for ensuring a fair, timely, and objective peer review process. Manuscripts
            are typically evaluated using a double-blind peer review model. Editors must avoid any conflict of
            interest with authors or reviewers.
          </p>

          <h4 className="text-base font-semibold text-gray-800 mb-2 mt-4">
            2.4 Handling Misconduct
          </h4>
          <p>
            If an editor suspects misconduct (e.g., plagiarism, data manipulation, unethical research practices),
            they will initiate a formal investigation in line with COPE guidelines. If misconduct is confirmed,
            the journal may issue corrections, retractions, or notify relevant authorities.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            3. Duties and Responsibilities of Peer Reviewers
          </h3>

          <h4 className="text-base font-semibold text-gray-800 mb-2 mt-4">
            3.1 Confidentiality
          </h4>
          <p>
            Manuscripts received for review must be treated as confidential documents. Reviewers may not share or
            discuss manuscripts with anyone outside the peer review process unless authorized by the editor.
          </p>

          <h4 className="text-base font-semibold text-gray-800 mb-2 mt-4">
            3.2 Objectivity and Constructive Criticism
          </h4>
          <p>
            Reviews should be conducted objectively, with constructive feedback that helps authors improve their
            work. Personal criticism or biased comments are not acceptable.
          </p>

          <h4 className="text-base font-semibold text-gray-800 mb-2 mt-4">
            3.3 Timeliness
          </h4>
          <p>
            Reviewers are expected to submit their evaluations within the agreed timeline. If a reviewer is unable
            to complete the review in time or feels unqualified to review a manuscript, they must inform the editor
            promptly.
          </p>

          <h4 className="text-base font-semibold text-gray-800 mb-2 mt-4">
            3.4 Conflict of Interest
          </h4>
          <p>
            Reviewers must disclose any potential conflicts of interest that could affect their objectivity and
            decline to review a manuscript if necessary.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            4. Handling Ethical Misconduct
          </h3>
          <p className="mb-4">
            Croatian Medical Journal takes allegations of misconduct seriously. The journal will investigate all
            credible complaints of unethical behavior, whether during the review process or after publication.
            Depending on the severity of the misconduct, actions may include:
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>Rejection of the manuscript</li>
            <li>Retraction of a published article</li>
            <li>Notification of the authors&apos; institution</li>
            <li>Banning the author(s) from future submissions</li>
            <li>Public issuance of an expression of concern or correction</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            5. Post-Publication Responsibilities
          </h3>

          <h4 className="text-base font-semibold text-gray-800 mb-2 mt-4">
            5.1 Corrections and Retractions
          </h4>
          <p>
            The journal will issue corrections, retractions, or expressions of concern when significant errors or
            ethical issues are identified after publication. All such notices will be clearly linked to the original
            article and will explain the nature of the correction or retraction.
          </p>

          <h4 className="text-base font-semibold text-gray-800 mb-2 mt-4">
            5.2 Archiving and Preservation
          </h4>
          <p>
            All published articles are permanently archived and accessible through the journal&apos;s website and
            indexing partners to ensure the long-term preservation of scholarly work.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            6. Open Access and Licensing
          </h3>
          <p>
            Croatian Medical Journal is an open-access journal. Articles are published under a Creative Commons
            license (typically CC BY or CC BY-NC), allowing free access and distribution, provided the original work
            is properly cited.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            7. Appeals and Complaints
          </h3>
          <p>
            Authors or reviewers who wish to appeal editorial decisions or lodge complaints about the review process
            or ethical issues should contact the Editor-in-Chief directly. All concerns will be handled
            confidentially and fairly.
          </p>
        </section>
      </div>
    </div>
  );
}
