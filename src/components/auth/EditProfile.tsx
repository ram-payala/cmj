import { Home } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { User } from '../../types/user';

interface EditProfileProps {
  user: User | null;
  onNavigateBack: () => void;
}

interface ProfileRow {
  id: string;
  email: string;
  username: string;
  full_name: string | null;
  affiliation: string | null;
  country: string | null;
}

export default function EditProfile({ user, onNavigateBack }: EditProfileProps) {
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }
    (async () => {
      const { data, error } = await supabase
        .from('users')
        .select('id, email, username, full_name, affiliation, country')
        .eq('id', user.id)
        .single();
      if (error) {
        setMessage({ type: 'error', text: error.message });
        setLoading(false);
        return;
      }
      setProfile(data as ProfileRow);
      setFullName(data?.full_name ?? '');
      setUsername(data?.username ?? '');
      setAffiliation(data?.affiliation ?? '');
      setLoading(false);
    })();
  }, [user?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setPasswordError('');

    if (!username.trim()) {
      setMessage({ type: 'error', text: 'User name is required.' });
      return;
    }
    if (password || confirmPassword) {
      if (password !== confirmPassword) {
        setPasswordError('Passwords do not match.');
        return;
      }
    }

    if (!profile) return;
    setSaving(true);

    const userId = profile.id;
    const { data: updatedRow, error: updateError } = await supabase
      .from('users')
      .update({
        full_name: fullName.trim() || null,
        username: username.trim(),
        affiliation: affiliation.trim() || null,
      })
      .eq('id', userId)
      .select('id')
      .maybeSingle();

    if (updateError) {
      if (updateError.code === '23505') {
        setMessage({ type: 'error', text: 'Username already taken. Choose another.' });
      } else {
        setMessage({ type: 'error', text: updateError.message });
      }
      setSaving(false);
      return;
    }

    if (!updatedRow) {
      setMessage({ type: 'error', text: 'Profile update was not applied. Please try again or re-login.' });
      setSaving(false);
      return;
    }

    // Keep auth user_metadata in sync so header name updates
    await supabase.auth.updateUser({
      data: { full_name: fullName.trim() || undefined },
    });

    if (password) {
      const { error: pwError } = await supabase.auth.updateUser({ password });
      if (pwError) {
        setMessage({ type: 'error', text: pwError.message });
        setSaving(false);
        return;
      }
    }

    setMessage({ type: 'success', text: 'Profile updated.' });
    setPassword('');
    setConfirmPassword('');
    // Refresh profile from DB so form reflects saved data
    const { data: refreshed } = await supabase
      .from('users')
      .select('id, email, username, full_name, affiliation, country')
      .eq('id', userId)
      .single();
    if (refreshed) setProfile(refreshed as ProfileRow);
    setSaving(false);
  };

  const handleCancel = () => {
    onNavigateBack();
  };

  if (!user) {
    return (
      <div>
        <p className="text-gray-600">Please sign in to edit your profile.</p>
        <button onClick={onNavigateBack} className="mt-4 text-[#4195A3] hover:underline">
          Back
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
          <button onClick={onNavigateBack} className="flex items-center gap-1 hover:text-[#4195A3] transition-colors">
            <Home size={16} className="text-[#4195A3]" />
            <span className="text-[#4195A3]">HOME</span>
          </button>
          <span>/</span>
          <span>Edit Profile</span>
        </div>
        <p className="text-gray-600">Loading profile…</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div>
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
          <button onClick={onNavigateBack} className="flex items-center gap-1 hover:text-[#4195A3] transition-colors">
            <Home size={16} className="text-[#4195A3]" />
            <span className="text-[#4195A3]">HOME</span>
          </button>
          <span>/</span>
          <span>Edit Profile</span>
        </div>
        {message?.type === 'error' && (
          <p className="text-red-600 mb-4">{message.text}</p>
        )}
        <button onClick={onNavigateBack} className="text-[#4195A3] hover:underline">Back</button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
        <button onClick={onNavigateBack} className="flex items-center gap-1 hover:text-[#4195A3] transition-colors">
          <Home size={16} className="text-[#4195A3]" />
          <span className="text-[#4195A3]">HOME</span>
        </button>
        <span>/</span>
        <span>Edit Profile</span>
      </div>

      <h2 className="text-4xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'PT Serif, Georgia, serif', color: '#327d89' }}>
        Edit Profile
      </h2>

      <div className="max-w-3xl rounded-2xl border border-gray-200 bg-white/90 shadow-sm backdrop-blur-sm p-8">
        {message && (
          <div
            className={`mb-6 px-4 py-3 rounded text-sm ${
              message.type === 'error' ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-green-50 border border-green-200 text-green-800'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#4195A3] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Affiliation</label>
                <input
                  type="text"
                  value={affiliation}
                  onChange={(e) => setAffiliation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#4195A3] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="text"
                  value={profile.email}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#4195A3] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  value={profile.country ?? ''}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Password and Confirm Password side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New Password"
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#4195A3] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#4195A3] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-[#4195A3] text-white font-medium rounded-lg hover:bg-[#327d89] transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 bg-white border border-gray-300 text-[#4195A3] font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
