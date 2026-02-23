import { Search, Download, User, Tag, ArrowLeft, Check } from 'lucide-react';

interface SubmissionDetailProps {
  submissionId: string;
  onNavigateBack: () => void;
}

interface SubmissionStage {
  id: string;
  label: string;
  number: number;
  completed: boolean;
  current: boolean;
}

const mockSubmissionData = {
  id: '#557',
  author: 'Cailing Ren',
  title: 'Multi-target Synergistic Regulatory Mechanisms of Aristolochic Acid-Induced Urothelial Carcinoma: Evidence from Network Toxicology and Molecular Dynamics',
  type: 'Original Research Article',
  submissionDate: '2025-08-27',
  stage: 'submission' as const,
};

export default function SubmissionDetail({ submissionId, onNavigateBack }: SubmissionDetailProps) {
  const stages: SubmissionStage[] = [
    { id: 'submission', label: 'Submission', number: 1, completed: true, current: true },
    { id: 'review', label: 'Review', number: 2, completed: false, current: false },
    { id: 'copyediting', label: 'Copyediting', number: 3, completed: false, current: false },
    { id: 'production', label: 'Production', number: 4, completed: false, current: false },
  ];

  const currentStageIndex = stages.findIndex((s) => s.current || s.completed);

  return (
    <div>
      {/* Back Navigation */}
      <div className="mb-6">
        <button
          onClick={onNavigateBack}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#4195A3] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Submissions</span>
        </button>
      </div>

      {/* Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {mockSubmissionData.id} / {mockSubmissionData.author} / {mockSubmissionData.title}
        </h2>
      </div>

      {/* Progress Tracker */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-4xl">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border-2 ${
                    stage.completed
                      ? 'bg-[#4195A3] text-white border-[#4195A3]'
                      : stage.current
                      ? 'bg-[#4195A3] text-white border-[#4195A3]'
                      : 'bg-white text-gray-400 border-gray-300'
                  }`}
                >
                  {stage.completed ? <Check size={20} /> : stage.number}
                </div>
                <span className="text-xs mt-2 text-gray-600 text-center">{stage.label}</span>
              </div>
              {index < stages.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 -mt-5 ${
                    stage.completed ? 'bg-[#4195A3]' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content - Two Columns */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Panel - Submission Files */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Submission Files</h3>
          
          <div className="flex justify-between items-center mb-4">
            <button className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
              Actions (0) <span className="ml-1">▾</span>
            </button>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pl-9 pr-4 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#4195A3] focus:border-transparent"
              />
            </div>
          </div>

          <div className="text-sm text-[#4195A3] font-medium mb-4">Stage completed.</div>

          <div className="text-center py-8 text-gray-500 text-sm">
            No files available
          </div>
        </div>

        {/* Right Panel - Submission Details */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Submission Details</h3>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <User size={18} className="text-gray-400" />
              <span className="text-sm text-gray-700">
                <span className="font-medium">Author:</span> {mockSubmissionData.author}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Tag size={18} className="text-gray-400" />
              <span className="text-sm text-gray-700">
                <span className="font-medium">Type:</span> {mockSubmissionData.type}
              </span>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm text-gray-700">
            <Download size={16} />
            Download all files
          </button>
        </div>
      </div>
    </div>
  );
}
