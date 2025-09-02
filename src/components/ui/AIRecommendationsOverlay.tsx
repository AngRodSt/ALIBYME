interface AIRecommendationsOverlayProps {
  onLoginClick?: () => void;
}

export default function AIRecommendationsOverlay({
  onLoginClick,
}: AIRecommendationsOverlayProps) {
  return (
    <div
      className="absolute inset-0 bg-black/90 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center z-40"
      role="dialog"
      aria-modal="true"
    >
      <div className="text-center space-y-4 px-6">
        {/* Padlock Icon */}
        <div className="mx-auto w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-400"
            aria-hidden="true"
          >
            <path
              d="M6 10V8C6 5.79086 7.79086 4 10 4H14C16.2091 4 18 5.79086 18 8V10M6 10H18M6 10C4.89543 10 4 10.8954 4 12V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V12C20 10.8954 19.1046 10 18 10M12 14V16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-white text-xl font-semibold">
          AI Personal Recommendations
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm max-w-md leading-relaxed">
          Login to receive personalized anime recommendations powered by our
          advanced AI algorithm. Get suggestions based on your viewing history,
          preferences, and similar users.
        </p>

        {/* Login Button */}
        <button
          onClick={onLoginClick}
          className="bg-gradient-to-r from-[#DB372D] to-[#BD2D69] text-white font-semibold px-8 py-3 rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-l mt-4 focus:outline-none focus:ring-2 focus:ring-[#DB372D] focus:ring-offset-2 focus:ring-offset-black"
        >
          Login to Get Recommendations
        </button>

        {/* AI Badge */}
        <div className="flex items-center justify-center space-x-2 text-blue-400 text-xs font-medium">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
          </svg>
          <span>Powered by AI</span>
        </div>
      </div>
    </div>
  );
}
