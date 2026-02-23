import { useState } from 'react';
import { Search, Calendar } from 'lucide-react';
import { User } from '../../types/user';

interface MySubmissionsProps {
  onNavigateBack: () => void;
  onViewSubmission: (submissionId: string) => void;
  onNewSubmission: () => void;
  user: User | null;
}

interface Submission {
  id: string;
  submissionId: string;
  author: string;
  title: string;
  submissionDate: string;
  status: 'In Progress' | 'Under Review' | 'Accepted' | 'Rejected' | 'Published';
  userId: string;
}

// Mock submissions - filtered by user
const getMockSubmissions = (userId: string): Submission[] => {
  return [
    {
      id: '1',
      submissionId: '#21',
      author: 'Li Chunling',
      title: 'Research on Overall Risk Early Warning Model of The X Rural Commercial Bank Based on Deep Learning',
      submissionDate: '27/08/2025',
      status: 'In Progress',
      userId: '1', // Matches dummy user
    },
  ].filter((sub) => sub.userId === userId);
};

export default function MySubmissions({ onNavigateBack, onViewSubmission, onNewSubmission, user }: MySubmissionsProps) {
  const [activeTab, setActiveTab] = useState<'my-queue' | 'archived'>('my-queue');
  const [searchQuery, setSearchQuery] = useState('');

  const submissions = activeTab === 'my-queue' && user ? getMockSubmissions(user.id) : [];
  const filteredSubmissions = submissions.filter(
    (sub) =>
      sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.submissionId.toLowerCase().includes(searchQuery.toLowerCase())
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

        {/* My Assigned Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">My Assigned</h3>

          {filteredSubmissions.length > 0 ? (
            <div className="space-y-4">
              {filteredSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {submission.submissionId} {submission.author}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{submission.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={16} />
                        <span>Submitted {submission.submissionDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <span className="px-4 py-1.5 border border-gray-300 rounded-full text-sm text-gray-700 bg-white">
                        {submission.status}
                      </span>
                      <button
                        onClick={() => onViewSubmission(submission.id)}
                        className="px-4 py-1.5 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors text-sm font-medium"
                      >
                        View
                      </button>
                    </div>
                  </div>
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
