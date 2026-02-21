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

      <div className="space-y-8">
        <section>
          <p className="text-gray-700 leading-relaxed">
            <em>Acta Clinica Croatica</em> is committed to ensuring that its website and published content are
            accessible to all users, including individuals with disabilities. We strive to provide an inclusive
            online environment that supports equal access to scholarly knowledge.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-gray-700 mb-4">
            Our Commitment
          </h3>
          <p className="text-gray-700 leading-relaxed">
            We are actively working to improve the accessibility and usability of our website in line with
            recognized accessibility standards, including the Web Content Accessibility Guidelines (WCAG) 2.1,
            Level AA. Our goal is to make all published materials, resources, and services available to the
            widest possible audience, regardless of technology, ability, or circumstance.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-gray-700 mb-4">
            Website Features
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Journal's website has been designed with the following accessibility features:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
            <li>Responsive design to ensure compatibility with a wide range of devices, including mobile phones and tablets.</li>
            <li>Structured headings and semantic HTML to support screen readers and assistive technologies.</li>
            <li>Alternative text descriptions for images and figures where possible.</li>
            <li>Keyboard navigation support for users who cannot use a mouse.</li>
            <li>Clear, readable fonts and sufficient color contrast for improved readability.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
