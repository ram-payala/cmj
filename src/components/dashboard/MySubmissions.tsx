import { useState, useEffect } from 'react';
import { Search, Eye } from 'lucide-react';
import { User } from '../../types/user';
import { supabase } from '../../lib/supabase';

interface MySubmissionsProps {
  onNavigateBack: () => void;
  onViewSubmission: (submissionId: string) => void;
  onNewSubmission: () => void;
  user: User | null;
}

interface Submission {
  id: string;
  submission_number: string | null;
  submitter_name: string | null;
  title: string;
}

export default function MySubmissions({ onNavigateBack, onViewSubmission, onNewSubmission, user }: MySubmissionsProps) {
  const [activeTab, setActiveTab] = useState<'my-queue' | 'archived'>('my-queue');
  const [searchQuery, setSearchQuery] = useState('');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id || activeTab !== 'my-queue') {
      setSubmissions([]);
      setLoading(false);
      return;
    }
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('submission_details')
        .select('id, submission_number, submitter_name, title')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) {
        setSubmissions([]);
        setLoading(false);
        return;
      }
      setSubmissions((data || []).map((row) => ({
        id: row.id,
        submission_number: row.submission_number ?? null,
        submitter_name: row.submitter_name ?? null,
        title: row.title,
      })));
      setLoading(false);
    })();
  }, [user?.id, activeTab]);

  const filteredSubmissions = submissions.filter(
    (sub) =>
      sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sub.submitter_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sub.submission_number || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
        <button onClick={onNavigateBack} className="flex items-center gap-1 hover:text-[#4195A3] transition-colors">
          <span className="text-[#4195A3]">← Back</span>
        </button>
      </div>

      <h2 className="text-4xl font-bold text-gray-800 mb-8">Submissions</h2>

      {/* Tabs */}
      <div className="flex gap-6 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('my-queue')}
          className={`pb-4 px-2 font-medium transition-colors relative ${
            activeTab === 'my-queue'
              ? 'text-[#4195A3] border-b-2 border-[#4195A3]'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          My Queue
          {activeTab === 'my-queue' && submissions.length > 0 && (
            <span className="ml-2 bg-[#4195A3] text-white text-xs px-2 py-0.5 rounded-full">
              {submissions.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('archived')}
          className={`pb-4 px-2 font-medium transition-colors ${
            activeTab === 'archived'
              ? 'text-[#4195A3] border-b-2 border-[#4195A3]'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Archived
        </button>
      </div>

      {/* Content Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {/* Search and New Submission */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1 max-w-md relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4195A3] focus:border-transparent"
            />
          </div>
          <button
            onClick={onNewSubmission}
            className="px-6 py-2 bg-[#4195A3] text-white rounded hover:bg-[#327d89] transition-colors font-medium"
          >
            New Submission
          </button>
        </div>

        {/* My submissions list */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">My Assigned</h3>

          {loading ? (
            <div className="text-center py-12 text-gray-500">
              <p>Loading submissions…</p>
            </div>
          ) : filteredSubmissions.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500 mb-1">
                      {submission.submission_number || '—'} / {submission.submitter_name || '—'}
                    </p>
                    <h4 className="text-lg font-semibold text-gray-700">{submission.title}</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => onViewSubmission(submission.id)}
                    className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 text-white rounded text-xs font-medium hover:bg-gray-900 transition-colors"
                  >
                    <Eye size={14} />
                    View
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No submissions found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
