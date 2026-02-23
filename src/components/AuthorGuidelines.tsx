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

      <div className="space-y-10 text-gray-700 leading-relaxed">
        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">MANUSCRIPT FORMAT</h3>
          <p className="mb-4">
            The manuscript should be prepared using Microsoft Word, formatted on A4 paper with 25 mm margins. Use double spacing and number pages consecutively starting from the title page.
          </p>
          <p>
            The manuscript must include the following sections, in order: Title Page, Abstract and Keywords, Introduction, Methods, Results, Discussion, Acknowledgments, References, Tables, Figure Legends, and Figures.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">TITLE PAGE</h3>
          <p className="mb-3">Include:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Article title (concise and descriptive)</li>
            <li>Running title</li>
            <li>Full author names with degrees and institutional affiliations</li>
            <li>Corresponding author&apos;s contact details, including email</li>
            <li>All affiliations must use official institution names.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">ABSTRACT &amp; KEYWORDS</h3>
          <p className="mb-4">
            The second page must contain an abstract in both English and Croatian, each not exceeding 200 words. It should summarize objectives, methods, findings, and conclusions, emphasizing the study&apos;s novel aspects.
          </p>
          <p>
            Include up to 6 keywords below the abstract. Use terms from MeSH (Medical Subject Headings) whenever possible.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">INTRODUCTION</h3>
          <p>
            Briefly describe the background and aim of the study. Provide only essential references and exclude study findings or conclusions.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">METHODS</h3>
          <p>
            Clearly explain study design, participant characteristics, data collection methods, and tools used (include manufacturer details in parentheses). Provide references for established methods and describe new techniques thoroughly, including their limitations. Use generic names for drugs and express measurements in SI units.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">ETHICAL CONSIDERATIONS</h3>
          <p>
            Human studies must include a statement confirming compliance with institutional or national ethical standards and the Helsinki Declaration. Avoid including any patient-identifying information. Animal research must state adherence to institutional or national animal welfare guidelines.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">STATISTICAL ANALYSIS</h3>
          <p>
            Explain statistical methods in detail to enable replication. Where applicable, include error margins or confidence intervals. Mention any software used.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">DISCUSSION</h3>
          <p>
            Focus on the study&apos;s key findings and their significance. Avoid repeating earlier content. Discuss limitations, relevance to existing literature, and potential directions for future research. New hypotheses should be clearly identified as such.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">TABLES</h3>
          <p>
            Each table should be on a separate page, typed with double spacing. Use short, descriptive titles and column headings. Number tables in the order of their appearance in the text. Do not submit tables as images.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">FIGURES</h3>
          <p>
            Figures should be of high quality and professionally produced. All text in figures must remain legible after reduction. Each figure should be labeled with the figure number, manuscript title, and orientation. Images of identifiable individuals must have documented permission for publication. Acceptable formats include JPEG and TIFF with a minimum resolution of 300 dpi.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">ABBREVIATIONS</h3>
          <p>
            Use only widely accepted abbreviations. Spell out the full term at first use, followed by the abbreviation in parentheses.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">ACKNOWLEDGMENTS</h3>
          <p>
            Mention individuals who contributed to the study but do not meet authorship criteria (e.g., technical support, editorial help). Acknowledge all financial or material support.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">REFERENCES</h3>
          <p className="mb-4">
            References should appear in the order cited and be indicated in the text with superscript numerals. Include DOI numbers for all entries. Use the reference style outlined by the ICMJE, available at:{' '}
            <a
              href="http://www.nlm.nih.gov/bsd/uniform_requirements.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4195A3] hover:underline"
            >
              http://www.nlm.nih.gov/bsd/uniform_requirements.html
            </a>
          </p>
          <p>
            List all sources including unpublished work, online material, and articles in press (label as &quot;in press&quot;). Authors must confirm and obtain permission to cite any unpublished sources.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">PEER REVIEW PROCESS</h3>
          <p className="mb-4">
            Upon submission, the author receives confirmation. Manuscripts are checked using CrossRef Similarity Check via iThenticate for potential plagiarism.
          </p>
          <p className="mb-4">
            Papers deemed suitable are sent to a minimum of two anonymous peer reviewers. Authors may suggest or exclude specific reviewers with appropriate justification. The editorial team retains full discretion over reviewer selection.
          </p>
          <p className="mb-4">
            The review process will take 30-45 days from date of submission. Authors must address reviewer comments thoroughly and return a revised version with explanations. If major revisions are requested by multiple reviewers, the revised manuscript may be re-reviewed.
          </p>
          <p>
            Final acceptance is based on reviewer feedback and editorial decision. Accepted articles undergo language editing before publication. Authors receive proofs for final error correction prior to print.
          </p>
        </section>
      </div>
    </div>
  );
}
