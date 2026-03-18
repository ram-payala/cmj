import { useState, useEffect, useCallback } from 'react';
import { Download, User, FileText, ArrowLeft, Check, ChevronDown, Calendar } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { User as AppUser } from '../../types/user';

interface SubmissionDetailProps {
  submissionId: string;
  onNavigateBack: () => void;
  onNavigateToGuidelines?: () => void;
  user?: AppUser | null;
}

const STAGES = [
  { id: 'submission', label: 'Submission', number: 1 },
  { id: 'review', label: 'Review', number: 2 },
  { id: 'copyediting', label: 'Copyediting', number: 3 },
  { id: 'production', label: 'Production', number: 4 },
] as const;

const ARTICLE_TYPE_LABELS: Record<string, string> = {
  original_research_article: 'Original Research Article',
  clinical_trial_or_case_study: 'Clinical Trial or Case Study',
  review_article: 'Review Article',
  systematic_review: 'Systematic Review',
  meta_analysis: 'Meta-Analysis',
  theoretical_and_methodological_article: 'Theoretical and Methodological Article',
  short_communication: 'Short Communication',
  case_report: 'Case Report',
};

interface SubmissionFile {
  id: string;
  file_name: string;
  original_name: string;
  file_path: string;
  file_size: number;
  file_type: string;
  stage: string;
}

interface SubmissionRecord {
  id: string;
  submission_number: string | null;
  submitter_name: string | null;
  title: string;
  status: string;
  submitted_at: string | null;
  article_type: string;
  files: SubmissionFile[] | unknown;
}

export default function SubmissionDetail({ submissionId, onNavigateBack, onNavigateToGuidelines, user }: SubmissionDetailProps) {
  const [submission, setSubmission] = useState<SubmissionRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStageId, setSelectedStageId] = useState<string>('');
  const [selectedFileIds, setSelectedFileIds] = useState<Set<string>>(new Set());
  const [actionsOpen, setActionsOpen] = useState(false);
  const [moving, setMoving] = useState(false);

  const refetch = useCallback(async () => {
    if (!submissionId) return;
    const { data, error } = await supabase
      .from('submission_details')
      .select('id, submission_number, submitter_name, title, status, submitted_at, article_type, files')
      .eq('id', submissionId)
      .single();
    if (!error && data) setSubmission(data as unknown as SubmissionRecord);
  }, [submissionId]);

  useEffect(() => {
    if (!submissionId) {
      setLoading(false);
      return;
    }
    (async () => {
      const { data, error } = await supabase
        .from('submission_details')
        .select('id, submission_number, submitter_name, title, status, submitted_at, article_type, files')
        .eq('id', submissionId)
        .single();
      if (error || !data) {
        setSubmission(null);
        setLoading(false);
        return;
      }
      const rec = data as unknown as SubmissionRecord;
      setSubmission(rec);
      if (rec?.status) setSelectedStageId(rec.status);
      setLoading(false);
    })();
  }, [submissionId]);

  if (loading) {
    return (
      <div>
        <button
          onClick={onNavigateBack}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#4195A3] transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          <span>Back to Submissions</span>
        </button>
        <p className="text-gray-500">Loading…</p>
      </div>
    );
  }

  if (!submission) {
    return (
      <div>
        <button
          onClick={onNavigateBack}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#4195A3] transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          <span>Back to Submissions</span>
        </button>
        <p className="text-gray-500">Submission not found.</p>
      </div>
    );
  }

  const statusOrder = STAGES.map((s) => s.id);
  const currentStageIndex = Math.max(0, statusOrder.indexOf(submission.status));
  const viewingStage = selectedStageId || submission.status;
  const filesRaw = Array.isArray(submission.files) ? submission.files : [];
  const filesDeduped = filesRaw.filter((f: { id?: string }, i: number, arr: { id?: string }[]) =>
    arr.findIndex((x) => x.id === f.id) === i
  ) as SubmissionFile[];
  const filesInStage = filesDeduped.filter(
    (f) => (f.stage || 'submission') === viewingStage
  );
  const articleTypeLabel = ARTICLE_TYPE_LABELS[submission.article_type] || submission.article_type || '—';
  const submittedDate =
    submission.submitted_at && !Number.isNaN(new Date(submission.submitted_at).getTime())
      ? new Date(submission.submitted_at).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' })
      : '—';

  const handleDownloadFile = async (filePath: string, fileName: string) => {
    const { data, error } = await supabase.storage.from('submission-files').createSignedUrl(filePath, 60);
    if (error) return;
    const a = document.createElement('a');
    a.href = data.signedUrl;
    a.download = fileName;
    a.rel = 'noopener noreferrer';
    a.target = '_blank';
    a.click();
  };

  const isAdmin = user?.role === 'admin';
  const selectedCount = selectedFileIds.size;
  const allInStageSelected = filesInStage.length > 0 && filesInStage.every((f) => selectedFileIds.has(f.id));

  const toggleFile = (fileId: string) => {
    setSelectedFileIds((prev) => {
      const next = new Set(prev);
      if (next.has(fileId)) next.delete(fileId);
      else next.add(fileId);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (allInStageSelected) setSelectedFileIds(new Set());
    else setSelectedFileIds(new Set(filesInStage.map((f) => f.id)));
  };

  const handleMoveToStage = async (targetStage: string) => {
    if (selectedCount === 0) return;
    setMoving(true);
    setActionsOpen(false);
    const ids = Array.from(selectedFileIds);
    const { data, error } = await supabase
      .from('submission_files')
      .update({ stage: targetStage })
      .in('id', ids)
      .select('id');
    setMoving(false);
    if (error) {
      console.error('Move to stage failed:', error);
      alert(`Could not move files: ${error.message}`);
      return;
    }
    const updatedCount = data?.length ?? 0;
    if (updatedCount === 0) {
      alert('No files were updated. You may need the "Admins can update submission files" RLS policy (run supabase/07-admin-update-files.sql).');
      return;
    }
    setSelectedFileIds(new Set());
    await refetch();
  };

  return (
    <div>
      {/* Back */}
      <div className="mb-6">
        <button
          onClick={onNavigateBack}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#4195A3] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Submissions</span>
        </button>
      </div>

      {/* Breadcrumb: #seq / author / title */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">
          {submission.submission_number ?? '—'} / {submission.submitter_name ?? '—'} / {submission.title}
        </h2>
      </div>

      {/* Progress: 4 stages – rectangle buttons, clickable */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {STAGES.map((stage, index) => {
            const completed = index < currentStageIndex;
            const current = index === currentStageIndex;
            const selected = viewingStage === stage.id;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setSelectedStageId(stage.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded border-2 text-sm font-medium transition-colors ${
                  selected
                    ? 'bg-[#4195A3] text-white border-[#4195A3]'
                    : completed
                    ? 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                    : current
                    ? 'bg-gray-700 text-white border-gray-700'
                    : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {completed ? <Check size={18} /> : <span>{stage.number}</span>}
                <span>{stage.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Two columns */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: Submission Files */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Submission Files</h3>
          {filesInStage.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-sm">
              No files in this stage.
            </div>
          ) : (
            <>
              {isAdmin && (
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={allInStageSelected}
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300 text-[#4195A3] focus:ring-[#4195A3]"
                    />
                    Select All ({filesInStage.length})
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setActionsOpen((o) => !o)}
                      disabled={selectedCount === 0 || moving}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Actions ({selectedCount})
                      <ChevronDown size={16} className={actionsOpen ? 'rotate-180' : ''} />
                    </button>
                    {actionsOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          aria-hidden
                          onClick={() => setActionsOpen(false)}
                        />
                        <div className="absolute left-0 top-full mt-1 z-20 min-w-[180px] bg-white border border-gray-200 rounded shadow-lg py-1">
                          {STAGES.map((stage) => (
                            <button
                              key={stage.id}
                              type="button"
                              onClick={() => handleMoveToStage(stage.id)}
                              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              → Move to {stage.label}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
              <ul className="space-y-2">
                {filesInStage.map((f) => (
                  <li key={f.id} className="flex items-center gap-3 text-sm text-gray-700 py-1">
                    {isAdmin && (
                      <input
                        type="checkbox"
                        checked={selectedFileIds.has(f.id)}
                        onChange={() => toggleFile(f.id)}
                        className="rounded border-gray-300 text-[#4195A3] focus:ring-[#4195A3] flex-shrink-0"
                      />
                    )}
                    <span className="truncate min-w-0 flex-1">{f.original_name || f.file_name}</span>
                    <button
                      type="button"
                      onClick={() => handleDownloadFile(f.file_path, f.original_name || f.file_name)}
                      className="flex-shrink-0 flex items-center gap-1 px-2 py-1 text-gray-700 border border-gray-300 rounded hover:bg-gray-50 text-xs font-medium"
                    >
                      <Download size={14} />
                      Download
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Right: Submission Details + Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Submission Details</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User size={18} className="text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  <span className="font-medium">Author:</span> {submission.submitter_name ?? '—'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  <span className="font-medium">Type:</span> {articleTypeLabel}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  <span className="font-medium">Submitted:</span> {submittedDate}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                type="button"
                disabled={filesDeduped.length === 0}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={16} />
                Download All Files
              </button>
              {onNavigateToGuidelines && (
                <button
                  type="button"
                  onClick={onNavigateToGuidelines}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm text-gray-700"
                >
                  View Submission Guidelines
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
