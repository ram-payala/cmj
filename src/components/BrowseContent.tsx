import { Home, FileText } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  authors: string;
  pages: string;
}

interface BrowseContentProps {
  onNavigateHome: () => void;
  volume: number;
  issue: number;
  year: number;
  publishedDate: string;
  articles: Article[];
}

export default function BrowseContent({
  onNavigateHome,
  volume,
  issue,
  year,
  publishedDate,
  articles,
}: BrowseContentProps) {
  return (
    <div>
      <div className="mb-6">
        <div className="bg-gray-100 px-4 py-2 inline-block text-sm font-semibold text-gray-700 mb-4">
          LATEST ISSUE
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1 hover:text-[#4195A3] transition-colors"
          >
            <Home size={16} className="text-[#4195A3]" />
            <span className="text-[#4195A3]">HOME</span>
          </button>
          <span>/</span>
          <span className="text-[#4195A3]">ARCHIVES</span>
          <span>/</span>
          <span>Vol. {volume} No. {issue} ({year}): Volume {volume}, Issue {issue}</span>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        Vol. {volume} No. {issue} ({year}): Volume {volume}, Issue {issue}
      </h2>

      <p className="text-gray-600 mb-8">
        <strong>PUBLISHED:</strong> {publishedDate}
      </p>

      <div className="border-t-4 border-yellow-400 pt-6">
        <h3 className="text-xl font-bold text-gray-700 mb-6">ARTICLES</h3>

        <div className="space-y-6">
          {articles.map((article) => (
            <div key={article.id} className="pb-6 border-b border-gray-200 last:border-b-0">
              <h4 className="text-lg font-medium mb-2">
                <a
                  href="#"
                  className="text-[#4195A3] hover:underline uppercase"
                >
                  {article.title}
                </a>
              </h4>
              <p className="text-gray-700 text-sm mb-2">{article.authors}</p>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 bg-[#4195A3] text-white px-4 py-2 text-sm font-medium hover:bg-[#357a86] transition-colors">
                  <FileText size={16} />
                  PDF
                </button>
                <span className="text-gray-600 text-sm">{article.pages}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
