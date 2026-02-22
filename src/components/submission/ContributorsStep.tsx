import { useState, useEffect } from 'react';
import { User, Edit2, Trash2 } from 'lucide-react';
import { StepComponentProps, Contributor } from '../../types/submission';

export default function ContributorsStep({ formData, updateFormData }: StepComponentProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [contributorForm, setContributorForm] = useState<Omit<Contributor, 'id'>>({
    name: '',
    affiliation: '',
    email: '',
    role: 'Author',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize with current user if no contributors
  useEffect(() => {
    if (formData.contributors.length === 0) {
      updateFormData({
        contributors: [
          {
            id: '1',
            name: 'Admin JoC',
            affiliation: 'International Institute of Information Technology',
            email: 'editorial@cancerjournalresearch.org',
            role: 'Author',
          },
        ],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!contributorForm.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!contributorForm.email.trim()) {
      newErrors.email = 'Email is required';
    }
    if (!contributorForm.affiliation.trim()) {
      newErrors.affiliation = 'Affiliation is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddContributor = () => {
    if (validateForm()) {
      const newContributor: Contributor = {
        id: Date.now().toString(),
        ...contributorForm,
      };
      updateFormData({
        contributors: [...formData.contributors, newContributor],
      });
      setContributorForm({ name: '', affiliation: '', email: '', role: 'Author' });
      setShowAddForm(false);
      setErrors({});
    }
  };

  const handleEditContributor = (id: string) => {
    const contributor = formData.contributors.find((c) => c.id === id);
    if (contributor) {
      setContributorForm({
        name: contributor.name,
        affiliation: contributor.affiliation,
        email: contributor.email,
        role: contributor.role,
      });
      setEditingId(id);
      setShowAddForm(true);
      setErrors({});
    }
  };

  const handleUpdateContributor = () => {
    if (validateForm() && editingId) {
      updateFormData({
        contributors: formData.contributors.map((c) =>
          c.id === editingId ? { id: c.id, ...contributorForm } : c
        ),
      });
      setContributorForm({ name: '', affiliation: '', email: '', role: 'Author' });
      setEditingId(null);
      setShowAddForm(false);
      setErrors({});
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setContributorForm({ name: '', affiliation: '', email: '', role: 'Author' });
    setErrors({});
  };

  const isMainAuthor = (id: string) => id === '1';

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Contributors</h2>
      <div className="space-y-4 mb-6 text-gray-700 leading-relaxed">
        <p>
          Add all contributors to this submission. Contributors will receive an email confirmation when you submit. They
          will also receive email notifications about editorial decisions and publication.
        </p>
        <p>
          If a contributor can not be contacted by email, because they must remain anonymous or do not have an email
          account, please do not enter a fake email address. You can add information about this contributor in a message
          to the editor at a later step in the submission process.
        </p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Contributors</h3>
        <button
          type="button"
          onClick={() => {
            setShowAddForm(true);
            setEditingId(null);
            setContributorForm({ name: '', affiliation: '', email: '', role: 'Author' });
            setErrors({});
          }}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <span>+</span> Add Contributor
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-4 shadow-sm">
          <h4 className="font-semibold text-gray-800 mb-4">
            {editingId ? 'Edit Contributor' : 'New Contributor'}
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={contributorForm.name}
                onChange={(e) => {
                  setContributorForm({ ...contributorForm, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                placeholder="Enter contributor name"
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#4195A3] focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={contributorForm.email}
                  onChange={(e) => {
                    setContributorForm({ ...contributorForm, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  placeholder="Enter email address"
                  className={`flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#4195A3] focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <select
                  value={contributorForm.role}
                  onChange={(e) => setContributorForm({ ...contributorForm, role: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4195A3] focus:border-transparent"
                >
                  <option value="Author">Author</option>
                  <option value="Co-Author">Co-Author</option>
                  <option value="Reviewer">Reviewer</option>
                </select>
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Affiliation <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={contributorForm.affiliation}
                onChange={(e) => {
                  setContributorForm({ ...contributorForm, affiliation: e.target.value });
                  if (errors.affiliation) setErrors({ ...errors, affiliation: '' });
                }}
                placeholder="Enter institution or organization"
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#4195A3] focus:border-transparent ${
                  errors.affiliation ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.affiliation && <p className="text-red-500 text-sm mt-1">{errors.affiliation}</p>}
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={editingId ? handleUpdateContributor : handleAddContributor}
                className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition-colors font-medium"
              >
                OK
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {formData.contributors.map((contributor) => (
          <div key={contributor.id} className="bg-white border border-gray-200 rounded p-4 flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-800">{contributor.name}</span>
                <span className="text-sm text-gray-600">{contributor.role}</span>
              </div>
              <p className="text-sm text-gray-600">{contributor.affiliation}</p>
              <p className="text-sm text-gray-500">{contributor.email}</p>
            </div>
            {!isMainAuthor(contributor.id) && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleEditContributor(contributor.id)}
                  className="p-2 text-[#4195A3] hover:bg-blue-50 rounded transition-colors"
                  aria-label="Edit contributor"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateFormData({
                      contributors: formData.contributors.filter((c) => c.id !== contributor.id),
                    });
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                  aria-label="Delete contributor"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
