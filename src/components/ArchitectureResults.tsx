'use client'

import { FiBox, FiGitBranch, FiDatabase, FiTool } from 'react-icons/fi'

interface Agent {
  name: string
  description: string
  features: string[]
}

interface ArchitectureResultsProps {
  architecture: {
    agents: Agent[]
    components: string[]
  }
}

const COMPONENT_ICONS: { [key: string]: JSX.Element } = {
  'Knowledge Base': <FiDatabase className="w-4 h-4" />,
  'Tools': <FiTool className="w-4 h-4" />,
  'Memory': <FiGitBranch className="w-4 h-4" />,
  'KB': <FiDatabase className="w-4 h-4" />,
  'RAI': <FiBox className="w-4 h-4" />,
}

export default function ArchitectureResults({
  architecture,
}: ArchitectureResultsProps) {
  const agentCount = architecture.agents.length

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-[#1a1f36]">
          Architecture Overview
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {agentCount} agent{agentCount !== 1 ? 's' : ''} recommended
        </p>
      </div>

      <div className="p-6">
        {/* Agent Visualization */}
        <div className="space-y-4 mb-8">
          {architecture.agents.map((agent, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg p-4 hover:border-[#4f7df3] hover:bg-blue-50 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-[#1a1f36]">{agent.name}</h3>
                  <p className="text-sm text-gray-600">{agent.description}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#4f7df3] flex items-center justify-center flex-shrink-0">
                  <FiBox className="text-white" />
                </div>
              </div>

              {/* Feature Badges */}
              {agent.features && agent.features.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {agent.features.map((feature, fIdx) => (
                    <span
                      key={fIdx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20"
                    >
                      {COMPONENT_ICONS[feature] || <FiBox className="w-3 h-3" />}
                      {feature}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Component Summary */}
        <div>
          <h3 className="text-sm font-semibold text-[#1a1f36] mb-3">
            Components
          </h3>
          <div className="flex flex-wrap gap-2">
            {architecture.components.map((component, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200"
              >
                {COMPONENT_ICONS[component] && (
                  <span className="text-gray-600">
                    {COMPONENT_ICONS[component]}
                  </span>
                )}
                <span className="text-sm font-medium text-gray-700">
                  {component}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
