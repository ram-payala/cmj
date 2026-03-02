interface SidebarProps {
  onNavigateSubmit?: () => void;
  onNavigateInfoReaders?: () => void;
  onNavigateInfoAuthors?: () => void;
  onNavigateInfoLibrarians?: () => void;
}

export default function Sidebar({ onNavigateSubmit, onNavigateInfoReaders, onNavigateInfoAuthors, onNavigateInfoLibrarians }: SidebarProps) {
  return (
    <aside className="w-80 space-y-8">
      <div>
        <button
          type="button"
          onClick={onNavigateSubmit}
          disabled={!onNavigateSubmit}
          className="w-full bg-[#4195A3] hover:bg-[#327d89] text-white font-semibold py-3 px-6 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          MAKE A SUBMISSION
        </button>
      </div>

      <div>
        <h3 className="text-gray-600 font-bold text-sm mb-4 pb-2 border-b-2 border-yellow-400">
          JOURNAL METRICS
        </h3>
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-semibold text-gray-800">PERFORMANCE METRICS</p>
          </div>
          <div>
            <p className="text-gray-600">Submission to first editorial decision:</p>
            <p className="font-semibold text-gray-800">2-5 days</p>
          </div>
          <div>
            <p className="text-gray-600">Peer Review Time:</p>
            <p className="font-semibold text-gray-800">21-30 days</p>
          </div>
          <div>
            <p className="text-gray-600">Submission to Acceptance:</p>
            <p className="font-semibold text-gray-800">30-45 days</p>
          </div>
          <div>
            <p className="text-gray-600">Acceptance to online publication:</p>
            <p className="font-semibold text-gray-800">within 7 days</p>
          </div>

          <div className="pt-2">
            <p className="font-semibold text-gray-800">IMPACT METRICS</p>
          </div>
          <div>
            <p className="text-gray-600">Impact Factor:</p>
            <p className="font-semibold text-gray-800">2.34</p>
          </div>
          <div>
            <p className="text-gray-600">Cite Score:</p>
            <p className="font-semibold text-gray-800">2.4</p>
          </div>
          <div>
            <p className="text-gray-600">Average Peer Review Time:</p>
            <p className="font-semibold text-gray-800">2-3 weeks</p>
          </div>
          <div>
            <p className="text-gray-600">Acceptance Rate:</p>
            <p className="font-semibold text-gray-800">~53.5%</p>
          </div>
          <div>
            <p className="text-gray-600">Online First Publication:</p>
            <p className="font-semibold text-gray-800">Within 7 days of acceptance</p>
          </div>

          <div className="pt-2">
            <p className="font-semibold text-gray-800">INDEXING</p>
          </div>
          <p className="text-gray-600 mb-2">Croatian Medical Journal is indexed/included in:</p>
          <div className="space-y-1">
            <p>MEDLINE</p>
            <p >PubMed Central</p>
            <p >Europe PMC</p>
            <p >Directory of Open Access Journals (DOAJ)</p>
            <p >Clarivate Science Citation Index Expanded (SCIE)/Journal Citation Reports</p>
            <p >SCOPUS</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-gray-600 font-bold text-sm mb-4 pb-2 border-b-2 border-yellow-400">
          INFORMATION
        </h3>
        <div className="space-y-2">
          <button
            type="button"
            onClick={onNavigateInfoReaders}
            className="block w-full text-left text-sm text-[#4195A3] hover:underline font-medium"
          >
            For Readers
          </button>
          <button
            type="button"
            onClick={onNavigateInfoAuthors}
            className="block w-full text-left text-sm text-[#4195A3] hover:underline font-medium"
          >
            For Authors
          </button>
          <button
            type="button"
            onClick={onNavigateInfoLibrarians}
            className="block w-full text-left text-sm text-[#4195A3] hover:underline font-medium"
          >
            For Librarians
          </button>
        </div>
      </div>
    </aside>
  );
}
