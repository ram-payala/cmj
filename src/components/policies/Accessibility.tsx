import { Home } from 'lucide-react';

interface AccessibilityProps {
  onNavigateHome: () => void;
}

export default function Accessibility({ onNavigateHome }: AccessibilityProps) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
        <button onClick={onNavigateHome} className="flex items-center gap-1 hover:text-[#4195A3] transition-colors">
          <Home size={16} className="text-[#4195A3]" />
          <span className="text-[#4195A3]">HOME</span>
        </button>
        <span>/</span>
        <span>Accessibility</span>
      </div>

      <h2 className="text-4xl font-bold text-gray-700 mb-8">
        Accessibility
      </h2>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Published Content</h3>
          <p>
            Articles published in Croatian Medical Journal are available in accessible PDF formats where feasible. We encourage authors to submit manuscripts that comply with accessibility standards, including the use of clear structure, descriptive figure legends, and accessible tables. Efforts are ongoing to enhance the accessibility of both current and archived content.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Third-Party Platforms</h3>
          <p>
            Some content may be hosted on or linked to external platforms (e.g., indexing services, repositories). The Journal is not responsible for the accessibility of third-party sites but encourages partners and service providers to adopt accessibility best practices.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Ongoing Improvements</h3>
          <p>
            Accessibility is an ongoing process. We are continuously reviewing our website and workflows to identify and address potential barriers. Feedback from users plays an important role in helping us improve accessibility.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Compliance Statement</h3>
          <p>
            This Accessibility Statement was last reviewed and updated on [Insert Date]. Croatian Medical Journal is committed to progressively enhancing accessibility and welcomes collaboration with readers, authors, and institutions to ensure an inclusive publishing environment.
          </p>
        </section>
      </div>
    </div>
  );
}
