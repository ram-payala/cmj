import { useEffect } from 'react';
import { Home } from 'lucide-react';

interface InfoForReadersProps {
  onNavigateHome: () => void;
  onNavigateRegister?: () => void;
  onNavigatePrivacy?: () => void;
}

export default function InfoForReaders({ onNavigateHome, onNavigateRegister, onNavigatePrivacy }: InfoForReadersProps) {
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
        <span>Information For Readers</span>
      </div>

      <h2 className="text-4xl font-bold text-gray-800 mb-8">Information For Readers</h2>

      <p className="text-gray-700 leading-relaxed max-w-3xl">
        We encourage readers to sign up for the publishing notification service for this journal. Use the{' '}
        <button
          type="button"
          onClick={onNavigateRegister}
          className="text-[#4195A3] hover:underline font-medium"
        >
          Register
        </button>{' '}
        link at the top of the home page for the journal. This registration will result in the reader receiving the Table of Contents by email for each new issue of the journal. This list also allows the journal to claim a certain level of support or readership. See the journal&apos;s{' '}
        <button
          type="button"
          onClick={onNavigatePrivacy}
          className="text-[#4195A3] hover:underline font-medium"
        >
          Privacy Statement
        </button>
        , which assures readers that their name and email address will not be used for other purposes.
      </p>
    </div>
  );
}
