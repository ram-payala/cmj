interface SidebarProps {
  onNavigateSubmit?: () => void;
}

export default function Sidebar({ onNavigateSubmit }: SidebarProps) {
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
        </div>
      </div>
    </aside>
  );
}
