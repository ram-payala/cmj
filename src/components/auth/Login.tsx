import { Home } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

interface LoginProps {
  onNavigateHome: () => void;
  onNavigateRegister: () => void;
  onLoginSuccess: () => void;
}

export default function Login({ onNavigateHome, onNavigateRegister, onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data: emailData, error: rpcError } = await supabase.rpc('get_email_by_username', {
      uname: username.trim(),
    });

    if (rpcError || emailData == null || emailData === '') {
      setLoading(false);
      setError('Invalid username or password.');
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: emailData as string,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError('Invalid username or password.');
      return;
    }

    onLoginSuccess();
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

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
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
            disabled={loading}
            className="px-6 py-2 bg-gray-300 text-gray-700 font-medium rounded hover:bg-gray-400 transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
}
