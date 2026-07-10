import { Home, Mail, Building } from 'lucide-react';

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

      <h2 className="text-4xl font-bold text-gray-700 mb-8">Contact Us</h2>

      <div className="space-y-6 text-gray-700 leading-relaxed max-w-2xl">
        <p>For any inquiries, please reach out to us at the following email addresses:</p>
        <div className="space-y-3">
          <a
            href="mailto:editor@medicaljournalcroatia.com"
            className="flex items-center gap-2 text-[#4195A3] hover:underline"
          >
            <Mail size={18} />
            <span>Editorial Inquiries: editor@medicaljournalcroatia.com</span>
          </a>
          <a
            href="mailto:publish@croatianmedicaljournal.org"
            className="flex items-center gap-2 text-[#4195A3] hover:underline"
          >
            <Mail size={18} />
            <span>General Inquiries: publish@medicaljournalcroatia.com</span>
          </a>
        </div>

        {/* Publisher Information */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-gray-700">
            <Building size={18} className="text-[#4195A3]" />
            <span><strong>Publisher:</strong> Pinnacle Publications</span>
          </div>
        </div>
      </div>
    </div>
  );
}