'use client'

import { FiCalculator } from 'react-icons/fi'

function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#4f7df3] flex items-center justify-center">
            <FiCalculator className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1a1f36]">
              Lyzr Credit Calculator
            </h1>
            <p className="text-sm text-gray-500">
              Estimate costs for building agentic applications
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
