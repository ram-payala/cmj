import { FileText } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  authors: string;
  pages: string;
}

interface CurrentIssueProps {
  volume: number;
  issue: number;
  year: number;
  publishedDate: string;
  articles: Article[];
}

export default function CurrentIssue({ volume, issue, year, publishedDate, articles }: CurrentIssueProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-3 pb-3 border-b-4 border-yellow-400 inline-block">
          CURRENT ISSUE
        </h2>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Vol. {volume} No. {issue} ({year}): Volume {volume}, Issue {issue}
        </h3>
        <p className="text-gray-700">
          <strong>PUBLISHED:</strong> {publishedDate}
        </p>
      </div>

      <div className="mb-8">
        <h4 className="text-xl font-semibold text-gray-600 mb-6">Articles</h4>
        <div className="space-y-8">
          {articles.map((article) => (
            <div key={article.id} className="border-b border-gray-200 pb-6">
              <h5 className="text-lg font-semibold text-[#4195A3] hover:text-[#327d89] mb-3 cursor-pointer uppercase">
                {article.title}
              </h5>
              <p className="text-gray-700 mb-3">{article.authors}</p>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{article.pages}</span>
                <button className="flex items-center gap-2 bg-[#4195A3] hover:bg-[#327d89] text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                  <FileText size={16} />
                  PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
