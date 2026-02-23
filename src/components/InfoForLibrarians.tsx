import { useEffect } from 'react';
import { Home } from 'lucide-react';

interface InfoForLibrariansProps {
  onNavigateHome: () => void;
}

export default function InfoForLibrarians({ onNavigateHome }: InfoForLibrariansProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
        <button onClick={onNavigateHome} className="flex items-center gap-1 hover:text-[#4195A3] transition-colors">
          <Home size={16} className="text-[#4195A3]" />
          <span className="text-[#4195A3]">HOME</span>
        </button>
        <span>/</span>
        <span>Information For Librarians</span>
      </div>

      <h2 className="text-4xl font-bold text-gray-800 mb-8">Information For Librarians</h2>

      <p className="text-gray-700 leading-relaxed max-w-3xl">
        We encourage research librarians to list this journal among their library&apos;s electronic journal holdings. As well, it may be worth noting that this journal&apos;s open source publishing system is suitable for libraries to host for their faculty members to use with journals they are involved in editing (see{' '}
        <a
          href="https://pkp.sfu.ca/ojs/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4195A3] hover:underline font-medium"
        >
          Open Journal Systems
        </a>
        ).
      </p>
    </div>
  );
}
