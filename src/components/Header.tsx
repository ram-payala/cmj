interface HeaderProps {
  onNavigateHome: () => void;
  onNavigateRegister: () => void;
  onNavigateLogin: () => void;
}

export default function Header({ onNavigateHome, onNavigateRegister, onNavigateLogin }: HeaderProps) {
  return (
    <header className="bg-[#4195A3] text-white">
      <div className="mx-auto px-12 py-5 flex justify-between items-center" style={{ maxWidth: '1500px' }}>
        <button onClick={onNavigateHome} className="text-2xl font-bold tracking-wide hover:text-gray-200 transition-colors">
          CROATIAN MEDICAL JOURNAL
        </button>
        <div className="flex gap-6">
          <button onClick={onNavigateRegister} className="hover:text-gray-200 transition-colors font-medium">
            Register
          </button>
          <button onClick={onNavigateLogin} className="hover:text-gray-200 transition-colors font-medium">
            Login
          </button>
        </div>
      </div>
    </header>
  );
}
