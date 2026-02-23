import { Home, Mail } from 'lucide-react';

interface ContactProps {
  onNavigateHome: () => void;
}

export default function Contact({ onNavigateHome }: ContactProps) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
        <button onClick={onNavigateHome} className="flex items-center gap-1 hover:text-[#4195A3] transition-colors">
          <Home size={16} className="text-[#4195A3]" />
          <span className="text-[#4195A3]">HOME</span>
        </button>
        <span>/</span>
        <span>Contact</span>
      </div>

      <h2 className="text-4xl font-bold text-gray-700 mb-8">Contact</h2>

      <div className="grid md:grid-cols-2 gap-12">
        <section>
          <h3 className="text-2xl font-bold text-gray-700 mb-6">Principal Contact</h3>

          <div className="space-y-3">
            <a
              href="mailto:manuscripts@croatianmedicaljournal.com"
              className="flex items-center gap-2 text-[#4195A3] hover:underline"
            >
              <Mail size={18} />
              manuscripts@croatianmedicaljournal.com
            </a>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-gray-700 mb-6">Support Contact</h3>

          <div className="space-y-3">
            <a
              href="mailto:manuscripts@croatianmedicaljournal.com"
              className="flex items-center gap-2 text-[#4195A3] hover:underline"
            >
              <Mail size={18} />
              manuscripts@croatianmedicaljournal.com
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
