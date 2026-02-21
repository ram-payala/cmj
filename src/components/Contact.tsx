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
            <p className="text-gray-800 font-medium">Mirna Šitum</p>
            <a
              href="mailto:editor@actaclinicacroatica.com"
              className="flex items-center gap-2 text-[#4195A3] hover:underline"
            >
              <Mail size={18} />
              editor@actaclinicacroatica.com
            </a>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-gray-700 mb-6">Support Contact</h3>

          <div className="space-y-3">
            <p className="text-gray-800 font-medium">Ivan Horvat</p>
            <a
              href="mailto:IvanHorvat@actaclinicacroatica.com"
              className="flex items-center gap-2 text-[#4195A3] hover:underline"
            >
              <Mail size={18} />
              IvanHorvat@actaclinicacroatica.com
            </a>
          </div>
        </section>
      </div>

      <section className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Editorial Office</h3>
        <div className="text-gray-700 space-y-2">
          <p>Acta Clinica Croatica</p>
          <p>University Hospital Centre Zagreb</p>
          <p>Kišpatićeva 12, 10000 Zagreb</p>
          <p>Croatia</p>
        </div>
      </section>
    </div>
  );
}
