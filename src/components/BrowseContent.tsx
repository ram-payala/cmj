import { FileText, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface Article {
  id: string;
  title: string;
  authors: string;
  authorsList?: { name: string; affiliation: string }[];
  pages: string;
  pdfUrl?: string;
  abstract?: string;
  keywords?: string;
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
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // 📄 DEEP-DIVE SINGLE ARTICLE VIEW
  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <button
          onClick={() => setSelectedArticle(null)}
          className="flex items-center gap-2 text-[#4195A3] hover:underline mb-6 font-medium text-sm transition-colors border-0 bg-transparent cursor-pointer p-0"
        >
          <ArrowLeft size={16} /> BACK TO ARTICLES
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6 leading-tight">
          {selectedArticle.title}
        </h2>

        {/* AUTHOR NAMES AND AFFILIATIONS STACKED DIRECTLY BELOW TITLE */}
        <div className="space-y-4 mb-8">
          {selectedArticle.authorsList ? (
            selectedArticle.authorsList.map((auth, idx) => (
              <div key={idx}>
                <h4 className="text-gray-900 font-bold text-base">{auth.name}</h4>
                <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{auth.affiliation}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-700 font-medium text-base">{selectedArticle.authors}</p>
          )}
        </div>

        {selectedArticle.pdfUrl && (
          <a
            href={selectedArticle.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#4195A3] hover:bg-[#327d89] text-white px-5 py-2.5 rounded text-sm font-semibold transition-colors mb-8 shadow-sm no-underline"
          >
            <FileText size={18} /> Download PDF
          </a>
        )}

        {/* ABSTRACT & KEYWORDS DETAILS CONTAINER */}
        <div className="space-y-6 border-t border-gray-200 pt-6">
          {selectedArticle.abstract && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Abstract</h3>
              <div className="text-gray-600 text-sm leading-relaxed text-justify space-y-4 pl-7">
                {selectedArticle.abstract.split('\n\n').map((paragraph, idx) => {
                  const colonIndex = paragraph.indexOf(':');
                  
                  if (colonIndex !== -1) {
                    const heading = paragraph.substring(0, colonIndex + 1);
                    const bodyText = paragraph.substring(colonIndex + 1);
                    
                    return (
                      <p key={idx}>
                        <strong className="text-gray-900 font-bold block sm:inline mb-1 sm:mb-0 mr-1">{heading}</strong>
                        {bodyText}
                      </p>
                    );
                  }
                  
                  return <p key={idx}>{paragraph}</p>;
                })}
              </div>
            </div>
          )}

          {selectedArticle.keywords && (
            <div className="pt-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Keywords</h3>
              <p className="text-gray-600 text-sm leading-relaxed text-justify">
                {selectedArticle.keywords}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 📚 CLEAN FULL-WIDTH ISSUE OVERVIEW VIEW
  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider">
          <button
            onClick={onNavigateHome}
            className="hover:text-[#4195A3] transition-colors border-0 bg-transparent cursor-pointer p-0 font-medium"
          >
            HOME
          </button>
          <span>/</span>
          <span className="text-gray-800 font-medium">CURRENT ISSUES</span>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-1">
        Vol. {volume} Issue {issue}
      </h2>
      <p className="text-sm text-gray-500 mb-2">
        Vol. {volume} No. {issue} ({year}): Volume {volume}, Issue {issue}
      </p>
      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-6">
        <strong>Published:</strong> {publishedDate}
      </p>

      <div className="space-y-6 border-t border-gray-200 pt-6">
        {articles.map((article) => (
          <div key={article.id} className="pb-6 border-b border-gray-100 last:border-b-0">
            <h4 className="text-[17px] font-semibold mb-1 leading-snug">
              <button
                type="button"
                onClick={() => setSelectedArticle(article)}
                className="text-[#4195A3] hover:underline text-left font-semibold transition-colors border-0 bg-transparent cursor-pointer block w-full p-0"
              >
                {article.title}
              </button>
            </h4>
            
            {/* Authors line with right-aligned page ranges matching your reference */}
            <div className="flex items-center justify-between text-sm text-gray-600 mt-1 mb-3">
              <span>{article.authors}</span>
              <span className="text-gray-500 font-normal">{article.pages}</span>
            </div>

            <div>
              {article.pdfUrl ? (
                <a
                  href={article.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#026b54] text-white px-3 py-1 rounded hover:bg-[#015240] no-underline transition-colors"
                >
                  <FileText size={14} />
                  PDF
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => setSelectedArticle(article)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#026b54] text-white px-3 py-1 rounded hover:bg-[#015240] border-0 cursor-pointer transition-colors"
                >
                  <FileText size={14} />
                  PDF
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}