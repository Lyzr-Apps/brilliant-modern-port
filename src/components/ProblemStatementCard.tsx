'use client'

import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

interface ProblemStatementCardProps {
  value: string
  onChange: (value: string) => void
}

const EXAMPLE_PROMPTS = [
  {
    title: 'Customer Support Chatbot',
    text: 'Customer support chatbot with knowledge base and ticket creation',
  },
  {
    title: 'Research Assistant',
    text: 'AI research assistant that analyzes documents, generates summaries, and provides citations with real-time web search',
  },
  {
    title: 'Data Analysis Pipeline',
    text: 'Multi-agent data analysis system that ingests raw data, cleans it, performs statistical analysis, and generates visual reports',
  },
  {
    title: 'Content Moderator',
    text: 'Content moderation agent with context understanding, policy checking, and escalation workflows for high-risk content',
  },
  {
    title: 'Sales Assistant',
    text: 'Sales intelligence agent that tracks leads, analyzes competitor data, and recommends personalized outreach strategies',
  },
]

export default function ProblemStatementCard({
  value,
  onChange,
}: ProblemStatementCardProps) {
  const [showExamples, setShowExamples] = useState(false)
  const charLimit = 2000
  const charCount = value.length

  const handleSelectExample = (text: string) => {
    onChange(text)
    setShowExamples(false)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-[#1a1f36] mb-2">
          Problem Statement
        </h2>
        <p className="text-sm text-gray-600">
          Describe the app idea you want to build
        </p>
      </div>

      <div className="p-6 space-y-4">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, charLimit))}
          placeholder="Describe your app idea..."
          rows={6}
          maxLength={charLimit}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[#1a1f36] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4f7df3] focus:border-transparent transition-all resize-none"
        />

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            {charCount} / {charLimit} characters
          </span>
          <div className="w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#4f7df3] transition-all"
              style={{ width: `${(charCount / charLimit) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Example Prompts */}
      <div className="border-t border-gray-100">
        <button
          onClick={() => setShowExamples(!showExamples)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <span className="text-sm font-medium text-gray-700">
            View example prompts
          </span>
          <FiChevronDown
            className={`text-gray-400 transition-transform ${
              showExamples ? 'rotate-180' : ''
            }`}
          />
        </button>

        {showExamples && (
          <div className="px-6 pb-4 space-y-2 bg-gray-50 border-t border-gray-100">
            {EXAMPLE_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectExample(prompt.text)}
                className="w-full text-left p-3 rounded-lg bg-white border border-gray-200 hover:border-[#4f7df3] hover:bg-blue-50 transition-all"
              >
                <div className="font-medium text-sm text-[#1a1f36]">
                  {prompt.title}
                </div>
                <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {prompt.text}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
