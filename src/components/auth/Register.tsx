import { Home } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

interface RegisterProps {
  onNavigateHome: () => void;
  onNavigateLogin: () => void;
  onRegisterSuccess: () => void;
}

interface FormErrors {
  fullName?: string;
  affiliation?: string;
  country?: string;
  email?: string;
  username?: string;
  password?: string;
  repeatPassword?: string;
  agreePrivacy?: string;
}

export default function Register({ onNavigateHome, onNavigateLogin, onRegisterSuccess }: RegisterProps) {
  const [formData, setFormData] = useState({
    fullName: '',
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

  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.affiliation.trim()) {
      newErrors.affiliation = 'Affiliation is required';
    }

    if (!formData.country) {
      newErrors.country = 'Country is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }


    if (!formData.repeatPassword) {
      newErrors.repeatPassword = 'Please confirm your password';
    } else if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = 'Passwords do not match';
    }

    if (!formData.agreePrivacy) {
      newErrors.agreePrivacy = 'You must agree to the privacy statement';
    }

    setErrors(newErrors);
    setApiError('');

    if (Object.keys(newErrors).length > 0) {
      const firstError = document.querySelector('.border-red-500');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      (firstError as HTMLElement)?.focus?.();
      return;
    }

    setLoading(true);
    const { data, error: signUpError } = await supabase.auth.signUp(
      {
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            affiliation: formData.affiliation,
            country: formData.country,
            username: formData.username,
          },
        },
      }
    );
    setLoading(false);

    if (signUpError) {
      setApiError(signUpError.message);
      return;
    }

    if (!data.user) {
      setApiError('Registration failed. Please try again.');
      return;
    }

    const { error: insertError } = await supabase.from('users').insert({
      id: data.user.id,
      email: formData.email,
      username: formData.username.trim(),
      full_name: formData.fullName,
      affiliation: formData.affiliation,
      country: formData.country,
    });

    if (insertError) {
      if (insertError.code === '23505') {
        setApiError('Username already taken. Please choose a different username.');
      } else {
        setApiError(insertError.message);
      }
      return;
    }

    if (data.session) {
      onRegisterSuccess();
      return;
    }

    setSuccessMessage('Please check your email to confirm your account, then sign in.');
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

      {apiError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-sm">
          {apiError}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded mb-6 text-sm">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                  clearError('fullName');
                }}
                className={`w-full max-w-md px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#4195A3] focus:border-transparent ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Affiliation <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.affiliation}
                onChange={(e) => {
                  setFormData({ ...formData, affiliation: e.target.value });
                  clearError('affiliation');
                }}
                className={`w-full max-w-md px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#4195A3] focus:border-transparent ${
                  errors.affiliation ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.affiliation && <p className="text-red-500 text-sm mt-1">{errors.affiliation}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country <span className="text-red-600">*</span>
              </label>
              <select
                value={formData.country}
                onChange={(e) => {
                  setFormData({ ...formData, country: e.target.value });
                  clearError('country');
                }}
                className={`country-select w-full max-w-md px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#4195A3] focus:border-transparent bg-white ${
                  errors.country ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">✓ Select Country</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Italy">Italy</option>
                <option value="Spain">Spain</option>
                <option value="Japan">Japan</option>
                <option value="China">China</option>
                <option value="India">India</option>
                <option value="Brazil">Brazil</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="South Korea">South Korea</option>
                <option value="North Korea">North Korea</option>
                <option value="Taiwan">Taiwan</option>
                <option value="Other">Other</option>
              </select>
              {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
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
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  clearError('email');
                }}
                className={`w-full max-w-md px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#4195A3] focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => {
                  setFormData({ ...formData, username: e.target.value });
                  clearError('username');
                }}
                className={`w-full max-w-md px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#4195A3] focus:border-transparent ${
                  errors.username ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => {
                  const newPassword = e.target.value;
                  setFormData({ ...formData, password: newPassword });
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next.password;
                    if (formData.repeatPassword && newPassword !== formData.repeatPassword) {
                      next.repeatPassword = 'Passwords do not match';
                    } else {
                      delete next.repeatPassword;
                    }
                    return next;
                  });
                }}
                className={`w-full max-w-md px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#4195A3] focus:border-transparent ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Repeat password <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                value={formData.repeatPassword}
                onChange={(e) => {
                  const newRepeat = e.target.value;
                  setFormData({ ...formData, repeatPassword: newRepeat });
                  setErrors((prev) => {
                    const next = { ...prev };
                    if (formData.password && newRepeat !== formData.password) {
                      next.repeatPassword = 'Passwords do not match';
                    } else {
                      delete next.repeatPassword;
                    }
                    return next;
                  });
                }}
                className={`w-full max-w-md px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#4195A3] focus:border-transparent ${
                  errors.repeatPassword ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.repeatPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.repeatPassword}</p>
              )}
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={formData.agreePrivacy}
              onChange={(e) => {
                setFormData({ ...formData, agreePrivacy: e.target.checked });
                clearError('agreePrivacy');
              }}
              className="mt-1"
            />
            <span className="text-sm text-gray-700">
              Yes, I agree to have my data collected and stored according to the{' '}
              <a href="#" className="text-[#4195A3] hover:underline">privacy statement</a>.
              <span className="text-red-600"> *</span>
            </span>
          </label>
          {errors.agreePrivacy && (
            <p className="text-red-500 text-sm">{errors.agreePrivacy}</p>
          )}

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
            disabled={loading}
            className="px-6 py-2 bg-gray-300 text-gray-700 font-medium rounded hover:bg-gray-400 transition-colors disabled:opacity-50"
          >
            {loading ? 'Registering…' : 'Register'}
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
