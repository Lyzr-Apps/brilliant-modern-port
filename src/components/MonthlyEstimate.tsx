'use client'

import { useState } from 'react'
import { FiInfo } from 'react-icons/fi'

interface MonthlyEstimateProps {
  estimate: number
}

export default function MonthlyEstimate({ estimate }: MonthlyEstimateProps) {
  const [showBreakdown, setShowBreakdown] = useState(false)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value)
  }

  const yearlyEstimate = estimate * 12

  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-[#10b981]/5 to-transparent border border-[#10b981]/30 rounded-lg p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">
              Monthly Estimate
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-[#10b981]">
                {formatCurrency(estimate)}
              </span>
              <span className="text-sm text-gray-600">/month</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {formatCurrency(yearlyEstimate)} annually
            </p>
          </div>

          <button
            onMouseEnter={() => setShowBreakdown(true)}
            onMouseLeave={() => setShowBreakdown(false)}
            className="relative p-2 hover:bg-[#10b981]/10 rounded-lg transition-colors flex-shrink-0"
            title="Cost breakdown"
          >
            <FiInfo className="text-[#10b981] w-5 h-5" />

            {showBreakdown && (
              <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64 z-10">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Agent Setup</span>
                    <span className="font-medium text-[#1a1f36]">One-time</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Infrastructure</span>
                    <span className="font-medium text-[#1a1f36]">
                      Variable
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">API Calls</span>
                    <span className="font-medium text-[#1a1f36]">
                      Per usage
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(estimate)}</span>
                  </div>
                </div>
              </div>
            )}
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Estimate based on your configuration. Actual costs may vary based on
        usage.
      </p>
    </div>
  )
}
