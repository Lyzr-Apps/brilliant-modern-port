'use client'

import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

interface UsageParametersPanelProps {
  monthlyCalls: number
  onMonthlyCallsChange: (value: number) => void
  inputTokens: number
  onInputTokensChange: (value: number) => void
  outputTokens: number
  onOutputTokensChange: (value: number) => void
  model: string
  onModelChange: (value: string) => void
}

const MODELS = ['GPT-5', 'GPT-5 Mini', 'GPT-5 Nano']

function UsageParametersPanel({
  monthlyCalls,
  onMonthlyCallsChange,
  inputTokens,
  onInputTokensChange,
  outputTokens,
  onOutputTokensChange,
  model,
  onModelChange,
}: UsageParametersPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onMonthlyCallsChange(parseInt(e.target.value))
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100"
      >
        <div>
          <h2 className="text-lg font-semibold text-[#1a1f36]">
            Usage Parameters
          </h2>
          <p className="text-xs text-gray-600 mt-1">
            Configure your application usage
          </p>
        </div>
        <FiChevronDown
          className={`text-gray-400 transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isExpanded && (
        <div className="p-6 space-y-6">
          {/* Monthly API Calls */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-[#1a1f36]">
                Monthly API Calls
              </label>
              <span className="text-lg font-semibold text-[#4f7df3]">
                {formatNumber(monthlyCalls)}
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="100000"
              value={monthlyCalls}
              onChange={handleSliderChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#4f7df3]"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>100</span>
              <span>100,000</span>
            </div>
          </div>

          {/* Input Tokens */}
          <div>
            <label className="block text-sm font-medium text-[#1a1f36] mb-2">
              Average Input Tokens
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={inputTokens}
                onChange={(e) => onInputTokensChange(Math.max(1, parseInt(e.target.value) || 0))}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-[#1a1f36] focus:outline-none focus:ring-2 focus:ring-[#4f7df3] focus:border-transparent transition-all"
              />
              <span className="text-sm text-gray-600 whitespace-nowrap">tokens</span>
            </div>
          </div>

          {/* Output Tokens */}
          <div>
            <label className="block text-sm font-medium text-[#1a1f36] mb-2">
              Average Output Tokens
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={outputTokens}
                onChange={(e) => onOutputTokensChange(Math.max(1, parseInt(e.target.value) || 0))}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-[#1a1f36] focus:outline-none focus:ring-2 focus:ring-[#4f7df3] focus:border-transparent transition-all"
              />
              <span className="text-sm text-gray-600 whitespace-nowrap">tokens</span>
            </div>
          </div>

          {/* Model Selection */}
          <div>
            <label className="block text-sm font-medium text-[#1a1f36] mb-2">
              LLM Model
            </label>
            <select
              value={model}
              onChange={(e) => onModelChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#1a1f36] focus:outline-none focus:ring-2 focus:ring-[#4f7df3] focus:border-transparent transition-all bg-white"
            >
              {MODELS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  )
}

export default UsageParametersPanel
