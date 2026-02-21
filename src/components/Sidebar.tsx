export default function Sidebar() {
  return (
    <aside className="w-80 space-y-8">
      <div>
        <button className="w-full bg-[#4195A3] hover:bg-[#327d89] text-white font-semibold py-3 px-6 rounded transition-colors">
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
        </div>
      </div>

      <div>
        <h3 className="text-gray-600 font-bold text-sm mb-4 pb-2 border-b-2 border-yellow-400">
          INDEXING IN MEDLINE
        </h3>
        <div className="space-y-2 text-sm">
          <p className="text-[#4195A3] hover:underline cursor-pointer">PubMed Central</p>
          <p className="text-[#4195A3] hover:underline cursor-pointer">Europe PMC</p>
          <p className="text-[#4195A3] hover:underline cursor-pointer">Directory of Open Access Journals (DOAJ)</p>
          <p className="text-[#4195A3] hover:underline cursor-pointer">Clarivate Science Citation Index Expanded (SCIE)/Journal Citation Reports</p>
          <p className="text-[#4195A3] hover:underline cursor-pointer">SCOPUS</p>
        </div>
      </div>

      <div>
        <h3 className="text-gray-600 font-bold text-sm mb-4 pb-2 border-b-2 border-yellow-400">
          INFORMATION
        </h3>
        <div className="space-y-2 text-sm">
          <p className="text-[#4195A3] hover:underline cursor-pointer">For Readers</p>
          <p className="text-[#4195A3] hover:underline cursor-pointer">For Authors</p>
          <p className="text-[#4195A3] hover:underline cursor-pointer">For Librarians</p>
        </div>
      </div>
    </aside>
  );
}
