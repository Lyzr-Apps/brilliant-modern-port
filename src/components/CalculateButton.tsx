'use client'

interface CalculateButtonProps {
  onClick: () => void
  loading: boolean
  disabled: boolean
}

export default function CalculateButton({
  onClick,
  loading,
  disabled,
}: CalculateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
        disabled || loading
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-[#4f7df3] text-white hover:bg-[#3d63c8] active:scale-95'
      }`}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Analyzing architecture...</span>
        </div>
      ) : (
        'Calculate Credits'
      )}
    </button>
  )
}
