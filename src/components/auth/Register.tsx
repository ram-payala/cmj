import { Home } from 'lucide-react';
import { useState } from 'react';

interface RegisterProps {
  onNavigateHome: () => void;
  onNavigateLogin: () => void;
  onRegister: () => void;
}

export default function Register({ onNavigateHome, onNavigateLogin, onRegister }: RegisterProps) {
  const [formData, setFormData] = useState({
    givenName: '',
    familyName: '',
    affiliation: '',
    country: '',
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
    agreePrivacy: false,
    notifyPublications: false,
    contactForReview: false,
  });

  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.repeatPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.agreePrivacy) {
      setError('You must agree to the privacy statement');
      return;
    }

    onRegister();
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
        <button onClick={onNavigateHome} className="flex items-center gap-1 hover:text-[#4195A3] transition-colors">
          <Home size={16} className="text-[#4195A3]" />
          <span className="text-[#4195A3]">HOME</span>
        </button>
        <span>/</span>
        <span>Register</span>
      </div>

      <h2 className="text-4xl font-bold text-gray-800 mb-6">Register</h2>

      <p className="text-sm text-gray-600 mb-6">
        Required fields are marked with an asterisk: <span className="text-red-600">*</span>
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Given Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.givenName}
                onChange={(e) => setFormData({ ...formData, givenName: e.target.value })}
                className="w-full max-w-md px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4195A3]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Family Name
              </label>
              <input
                type="text"
                value={formData.familyName}
                onChange={(e) => setFormData({ ...formData, familyName: e.target.value })}
                className="w-full max-w-md px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4195A3]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Affiliation <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.affiliation}
                onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                className="w-full max-w-md px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4195A3]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country <span className="text-red-600">*</span>
              </label>
              <select
                required
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full max-w-md px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4195A3]"
              >
                <option value="">Select a country</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="HR">Croatia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
              </select>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Login</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full max-w-md px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4195A3]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full max-w-md px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4195A3]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full max-w-md px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4195A3]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Repeat password <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                required
                value={formData.repeatPassword}
                onChange={(e) => setFormData({ ...formData, repeatPassword: e.target.value })}
                className="w-full max-w-md px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4195A3]"
              />
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={formData.agreePrivacy}
              onChange={(e) => setFormData({ ...formData, agreePrivacy: e.target.checked })}
              className="mt-1"
            />
            <span className="text-sm text-gray-700">
              Yes, I agree to have my data collected and stored according to the{' '}
              <a href="#" className="text-[#4195A3] hover:underline">privacy statement</a>.
            </span>
          </label>

          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={formData.notifyPublications}
              onChange={(e) => setFormData({ ...formData, notifyPublications: e.target.checked })}
              className="mt-1"
            />
            <span className="text-sm text-gray-700">
              Yes, I would like to be notified of new publications and announcements.
            </span>
          </label>

          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={formData.contactForReview}
              onChange={(e) => setFormData({ ...formData, contactForReview: e.target.checked })}
              className="mt-1"
            />
            <span className="text-sm text-gray-700">
              Yes, I would like to be contacted with requests to review submissions to this journal.
            </span>
          </label>
        </section>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-gray-300 text-gray-700 font-medium rounded hover:bg-gray-400 transition-colors"
          >
            Register
          </button>
          <button
            type="button"
            onClick={onNavigateLogin}
            className="text-[#4195A3] hover:underline"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
