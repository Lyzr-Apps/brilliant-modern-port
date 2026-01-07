/**
 * MAIN PAGE - Build your UI here!
 *
 * FILE STRUCTURE (DO NOT CHANGE):
 * - app/page.tsx       ← YOU ARE HERE - main page
 * - app/layout.tsx     ← root layout (pre-configured)
 * - app/error.tsx      ← error boundary (pre-configured)
 * - app/not-found.tsx  ← 404 page (pre-configured)
 * - app/loading.tsx    ← loading state (pre-configured)
 * - app/api/           ← API routes
 * - src/components/ui/ ← shadcn/ui components
 * - src/lib/utils.ts   ← cn() helper
 *
 * ⚠️ NEVER create src/app/ - files go in app/ directly!
 * ⚠️ NEVER create error.tsx, not-found.tsx - use the ones here!
 * ⚠️ NEVER import from 'next/document' - App Router doesn't use it!
 */

'use client'

import { useState, useRef } from 'react'
import Header from '@/src/components/Header'
import ProblemStatementCard from '@/src/components/ProblemStatementCard'
import UsageParametersPanel from '@/src/components/UsageParametersPanel'
import CalculateButton from '@/src/components/CalculateButton'
import ArchitectureResults from '@/src/components/ArchitectureResults'
import CostBreakdown from '@/src/components/CostBreakdown'
import MonthlyEstimate from '@/src/components/MonthlyEstimate'
import ExportOptions from '@/src/components/ExportOptions'
import { callAgentAPI } from '@/src/lib/api'

interface CostData {
  creationCosts: { [key: string]: number }
  operationalCosts: { [key: string]: number }
  modelCosts: { [key: string]: number }
  monthlyEstimate: number
}

interface ArchitectureData {
  agents: Array<{
    name: string
    description: string
    features: string[]
  }>
  components: string[]
}

export default function HomePage() {
  const [problemStatement, setProblemStatement] = useState(
    'Customer support chatbot with knowledge base and ticket creation'
  )
  const [monthlyCalls, setMonthlyCalls] = useState(5000)
  const [inputTokens, setInputTokens] = useState(500)
  const [outputTokens, setOutputTokens] = useState(1000)
  const [model, setModel] = useState('GPT-5 Mini')

  const [loading, setLoading] = useState(false)
  const [architecture, setArchitecture] = useState<ArchitectureData | null>(null)
  const [costs, setCosts] = useState<CostData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const resultsRef = useRef<HTMLDivElement>(null)

  const handleCalculate = async () => {
    if (problemStatement.length < 20) {
      setError('Problem statement must be at least 20 characters')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const message = `Problem: ${problemStatement}\nMonthly API Calls: ${monthlyCalls}\nAverage Input Tokens: ${inputTokens}\nAverage Output Tokens: ${outputTokens}\nModel: ${model}`

      const response = await callAgentAPI(message)

      // Parse the response to extract architecture and costs
      const parsedData = parseAgentResponse(response)
      setArchitecture(parsedData.architecture)
      setCosts(parsedData.costs)

      // Scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to calculate credits'
      )
    } finally {
      setLoading(false)
    }
  }

  const parseAgentResponse = (
    response: any
  ): { architecture: ArchitectureData; costs: CostData } => {
    // Parse the agent response and extract architecture and cost information
    // This will handle various response formats from the agent

    // Default structure
    const defaultArchitecture: ArchitectureData = {
      agents: [
        { name: 'Customer Support Agent', description: 'Main support interface', features: ['KB', 'Tools'] },
        { name: 'Ticket Creator Agent', description: 'Ticket management', features: ['Tools'] },
      ],
      components: ['Knowledge Base', 'Tools', 'Memory'],
    }

    const defaultCosts: CostData = {
      creationCosts: {
        'Agent Creation': 25,
        'Knowledge Base Setup': 10,
        'Tools Configuration': 8,
      },
      operationalCosts: {
        'API Calls': 20,
        'Knowledge Base Queries': 5,
      },
      modelCosts: {
        'Input Tokens': 15,
        'Output Tokens': 22,
      },
      monthlyEstimate: 105,
    }

    try {
      // If response is already an object
      if (typeof response === 'object' && response !== null) {
        if (response.architecture || response.costs) {
          return {
            architecture: response.architecture || defaultArchitecture,
            costs: response.costs || defaultCosts,
          }
        }
      }

      // If response is a string, try to parse JSON from it
      if (typeof response === 'string') {
        const jsonMatch = response.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0])
          if (parsed.architecture || parsed.costs) {
            return {
              architecture: parsed.architecture || defaultArchitecture,
              costs: parsed.costs || defaultCosts,
            }
          }
        }
      }
    } catch (e) {
      // If parsing fails, use calculated defaults
      console.error('Error parsing agent response:', e)
    }

    // Calculate estimated costs based on inputs
    const apiCallCost = (monthlyCalls / 1000) * 2
    const tokenCost = ((inputTokens + outputTokens) / 1000) * 15
    const agentCost = 30

    return {
      architecture: defaultArchitecture,
      costs: {
        creationCosts: {
          'Agent Creation': agentCost,
          'Knowledge Base Setup': 10,
          'Tools Configuration': 8,
        },
        operationalCosts: {
          'API Calls': Math.round(apiCallCost * 10) / 10,
          'Knowledge Base Queries': 5,
        },
        modelCosts: {
          'Input Tokens': Math.round(tokenCost * 0.4 * 10) / 10,
          'Output Tokens': Math.round(tokenCost * 0.6 * 10) / 10,
        },
        monthlyEstimate:
          agentCost +
          10 +
          8 +
          Math.round(apiCallCost * 10) / 10 +
          5 +
          Math.round(tokenCost * 10) / 10,
      },
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Desktop: 2 columns, Mobile: 1 column */}
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8">
          {/* Left Column: Inputs */}
          <div className="space-y-6">
            <ProblemStatementCard
              value={problemStatement}
              onChange={setProblemStatement}
            />

            <UsageParametersPanel
              monthlyCalls={monthlyCalls}
              onMonthlyCallsChange={setMonthlyCalls}
              inputTokens={inputTokens}
              onInputTokensChange={setInputTokens}
              outputTokens={outputTokens}
              onOutputTokensChange={setOutputTokens}
              model={model}
              onModelChange={setModel}
            />

            <CalculateButton
              onClick={handleCalculate}
              loading={loading}
              disabled={problemStatement.length < 20}
            />

            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                <p className="text-red-800 text-sm font-medium">{error}</p>
              </div>
            )}
          </div>

          {/* Right Column: Results */}
          <div ref={resultsRef} className="space-y-6">
            {architecture && (
              <ArchitectureResults architecture={architecture} />
            )}

            {costs && (
              <>
                <CostBreakdown costs={costs} />
                <MonthlyEstimate estimate={costs.monthlyEstimate} />
                <ExportOptions
                  architecture={architecture}
                  costs={costs}
                  inputs={{
                    problemStatement,
                    monthlyCalls,
                    inputTokens,
                    outputTokens,
                    model,
                  }}
                />
              </>
            )}

            {!architecture && !loading && (
              <div className="rounded-lg border border-dashed border-gray-300 p-12 text-center">
                <p className="text-gray-500">
                  Enter your problem statement and click Calculate to see architecture
                  and cost estimates.
                </p>
              </div>
            )}

            {loading && (
              <div className="rounded-lg border border-dashed border-gray-300 p-12 text-center">
                <div className="flex justify-center mb-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4f7df3]"></div>
                </div>
                <p className="text-gray-600">Analyzing architecture...</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
