import { Home } from 'lucide-react';
import { useState } from 'react';

interface LoginProps {
  onNavigateHome: () => void;
  onNavigateRegister: () => void;
  onLogin: () => void;
}

export default function Login({ onNavigateHome, onNavigateRegister, onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
        <button onClick={onNavigateHome} className="flex items-center gap-1 hover:text-[#4195A3] transition-colors">
          <Home size={16} className="text-[#4195A3]" />
          <span className="text-[#4195A3]">HOME</span>
        </button>
        <span>/</span>
        <span>Login</span>
      </div>

      <h2 className="text-4xl font-bold text-gray-800 mb-6">Login</h2>

      <p className="text-sm text-gray-600 mb-6">
        Required fields are marked with an asterisk: <span className="text-red-600">*</span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username or Email <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4195A3]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password <span className="text-red-600">*</span>
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4195A3]"
          />
          <a href="#" className="text-sm text-[#4195A3] hover:underline inline-block mt-1">
            Forgot your password?
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onNavigateRegister}
            className="text-[#4195A3] hover:underline font-medium"
          >
            Register
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-gray-300 text-gray-700 font-medium rounded hover:bg-gray-400 transition-colors"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
