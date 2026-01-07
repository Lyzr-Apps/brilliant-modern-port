'use client'

import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

interface CostBreakdownProps {
  costs: {
    creationCosts: { [key: string]: number }
    operationalCosts: { [key: string]: number }
    modelCosts: { [key: string]: number }
    monthlyEstimate: number
  }
}

interface CostSection {
  title: string
  items: { [key: string]: number }
  color: string
}

export default function CostBreakdown({ costs }: CostBreakdownProps) {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({
    creation: true,
    operational: true,
    model: true,
  })

  const sections: CostSection[] = [
    {
      title: 'Creation Costs',
      items: costs.creationCosts,
      color: 'blue',
    },
    {
      title: 'Operational Costs',
      items: costs.operationalCosts,
      color: 'purple',
    },
    {
      title: 'Model Costs',
      items: costs.modelCosts,
      color: 'green',
    },
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 border-blue-200 hover:bg-blue-100'
      case 'purple':
        return 'bg-purple-50 border-purple-200 hover:bg-purple-100'
      case 'green':
        return 'bg-green-50 border-green-200 hover:bg-green-100'
      default:
        return 'bg-gray-50 border-gray-200 hover:bg-gray-100'
    }
  }

  const calculateSubtotal = (items: { [key: string]: number }) => {
    return Object.values(items).reduce((sum, val) => sum + val, 0)
  }

  const toggleExpanded = (key: string) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-[#1a1f36]">
          Cost Breakdown
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Detailed cost estimates
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {sections.map((section, idx) => {
          const subtotal = calculateSubtotal(section.items)
          const key = section.title.toLowerCase().replace(' ', '')

          return (
            <div
              key={idx}
              className={`border-b border-gray-100 ${getColorClasses(
                section.color
              )}`}
            >
              <button
                onClick={() => toggleExpanded(key)}
                className="w-full px-6 py-4 flex items-center justify-between hover:opacity-80 transition-opacity"
              >
                <div className="text-left">
                  <h3 className="font-semibold text-[#1a1f36]">
                    {section.title}
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold text-[#1a1f36]">
                    {formatCurrency(subtotal)}
                  </span>
                  <FiChevronDown
                    className={`text-gray-400 transition-transform ${
                      expanded[key] ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {expanded[key] && (
                <div className="px-6 pb-4 space-y-2 bg-white">
                  {Object.entries(section.items).map(([label, value], idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">{label}</span>
                      <span className="text-sm font-medium text-[#1a1f36]">
                        {formatCurrency(value)}
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between items-center font-semibold">
                    <span className="text-sm text-gray-700">Subtotal</span>
                    <span className="text-[#1a1f36]">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Total */}
      <div className="px-6 py-4 bg-[#1a1f36] text-white">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total Monthly Cost</span>
          <span className="text-2xl font-bold">
            {formatCurrency(costs.monthlyEstimate)}
          </span>
        </div>
      </div>
    </div>
  )
}
