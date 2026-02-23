import { useEffect } from 'react';
import { Home } from 'lucide-react';

interface InfoForAuthorsProps {
  onNavigateHome: () => void;
  onNavigateAbout?: () => void;
  onNavigateAuthorGuidelines?: () => void;
  onNavigateRegister?: () => void;
  onNavigateLogin?: () => void;
}

export default function InfoForAuthors({
  onNavigateHome,
  onNavigateAbout,
  onNavigateAuthorGuidelines,
  onNavigateRegister,
  onNavigateLogin,
}: InfoForAuthorsProps) {
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
        <span>Information For Authors</span>
      </div>

      <h2 className="text-4xl font-bold text-gray-800 mb-8">Information For Authors</h2>

      <p className="text-gray-700 leading-relaxed max-w-3xl">
        Interested in submitting to this journal? We recommend that you review the{' '}
        <button
          type="button"
          onClick={onNavigateAbout}
          className="text-[#4195A3] hover:underline font-medium"
        >
          About the Journal
        </button>{' '}
        page for the journal&apos;s section policies, as well as the{' '}
        <button
          type="button"
          onClick={onNavigateAuthorGuidelines}
          className="text-[#4195A3] hover:underline font-medium"
        >
          Author Guidelines
        </button>
        . Authors need to{' '}
        <button
          type="button"
          onClick={onNavigateRegister}
          className="text-[#4195A3] hover:underline font-medium"
        >
          register
        </button>{' '}
        with the journal prior to submitting or, if already registered, can simply{' '}
        <button
          type="button"
          onClick={onNavigateLogin}
          className="text-[#4195A3] hover:underline font-medium"
        >
          log in
        </button>{' '}
        and begin the five-step process.
      </p>
    </div>
  );
}
