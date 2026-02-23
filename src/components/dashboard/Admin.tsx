import { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface AdminProps {
  onNavigateBack: () => void;
  onViewSubmission: (submissionId: string) => void;
  onNewSubmission: () => void;
}

interface SubmissionRow {
  id: string;
  submission_number: string | null;
  submitter_name: string | null;
  title: string;
}

export default function Admin({ onNavigateBack, onViewSubmission, onNewSubmission }: AdminProps) {
  const [submissions, setSubmissions] = useState<SubmissionRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('submission_details')
        .select('id, submission_number, submitter_name, title')
        .order('created_at', { ascending: false });
      if (error) {
        setSubmissions([]);
      } else {
        setSubmissions((data || []).map((r) => ({
          id: r.id,
          submission_number: r.submission_number ?? null,
          submitter_name: r.submitter_name ?? null,
          title: r.title,
        })));
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
        <button onClick={onNavigateBack} className="flex items-center gap-1 hover:text-[#4195A3] transition-colors">
          <span className="text-[#4195A3]">← Back</span>
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h2 className="text-4xl font-bold text-gray-800">All Submissions</h2>
        <button
          type="button"
          onClick={onNewSubmission}
          className="px-6 py-2 bg-[#4195A3] text-white rounded hover:bg-[#327d89] transition-colors font-medium"
        >
          New Submission
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {loading ? (
          <p className="text-gray-500">Loading…</p>
        ) : submissions.length === 0 ? (
          <p className="text-gray-500">No submissions.</p>
        ) : (
          <div className="divide-y divide-gray-200">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-500 mb-1">
                    {sub.submission_number || '—'} / {sub.submitter_name || '—'}
                  </p>
                  <h4 className="text-lg font-semibold text-gray-700">{sub.title}</h4>
                </div>
                <button
                  type="button"
                  onClick={() => onViewSubmission(sub.id)}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 text-white rounded text-xs font-medium hover:bg-gray-900 transition-colors"
                >
                  <Eye size={14} />
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
