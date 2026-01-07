'use client'

import { FiDownload, FiFileText } from 'react-icons/fi'

interface ExportOptionsProps {
  architecture: {
    agents: Array<{
      name: string
      description: string
      features: string[]
    }>
    components: string[]
  } | null
  costs: {
    creationCosts: { [key: string]: number }
    operationalCosts: { [key: string]: number }
    modelCosts: { [key: string]: number }
    monthlyEstimate: number
  } | null
  inputs: {
    problemStatement: string
    monthlyCalls: number
    inputTokens: number
    outputTokens: number
    model: string
  }
}

export default function ExportOptions({
  architecture,
  costs,
  inputs,
}: ExportOptionsProps) {
  const handleExportJSON = () => {
    const data = {
      timestamp: new Date().toISOString(),
      inputs,
      architecture,
      costs,
    }

    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `credit-calculator-${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleExportPDF = () => {
    // Create a simple HTML representation for PDF
    const htmlContent = `
      <html>
        <head>
          <title>Lyzr Credit Calculator Report</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto; margin: 40px; }
            h1 { color: #1a1f36; }
            h2 { color: #4f7df3; margin-top: 30px; }
            .section { margin-bottom: 30px; }
            table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #f0f0f0; font-weight: bold; }
            .total { font-weight: bold; color: #10b981; font-size: 20px; }
          </style>
        </head>
        <body>
          <h1>Lyzr Credit Calculator Report</h1>
          <p>Generated: ${new Date().toLocaleString()}</p>

          <div class="section">
            <h2>Problem Statement</h2>
            <p>${inputs.problemStatement}</p>
          </div>

          <div class="section">
            <h2>Configuration</h2>
            <table>
              <tr>
                <td>Monthly API Calls</td>
                <td>${inputs.monthlyCalls.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Average Input Tokens</td>
                <td>${inputs.inputTokens.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Average Output Tokens</td>
                <td>${inputs.outputTokens.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Model</td>
                <td>${inputs.model}</td>
              </tr>
            </table>
          </div>

          ${
            architecture
              ? `
            <div class="section">
              <h2>Recommended Architecture</h2>
              <p><strong>Agents (${architecture.agents.length}):</strong></p>
              <ul>
                ${architecture.agents.map((a) => `<li>${a.name} - ${a.description}</li>`).join('')}
              </ul>
              <p><strong>Components:</strong> ${architecture.components.join(', ')}</p>
            </div>
          `
              : ''
          }

          ${
            costs
              ? `
            <div class="section">
              <h2>Cost Breakdown</h2>

              <h3>Creation Costs</h3>
              <table>
                ${Object.entries(costs.creationCosts)
                  .map(
                    ([label, value]) =>
                      `<tr><td>${label}</td><td>$${value.toFixed(2)}</td></tr>`
                  )
                  .join('')}
              </table>

              <h3>Operational Costs</h3>
              <table>
                ${Object.entries(costs.operationalCosts)
                  .map(
                    ([label, value]) =>
                      `<tr><td>${label}</td><td>$${value.toFixed(2)}</td></tr>`
                  )
                  .join('')}
              </table>

              <h3>Model Costs</h3>
              <table>
                ${Object.entries(costs.modelCosts)
                  .map(
                    ([label, value]) =>
                      `<tr><td>${label}</td><td>$${value.toFixed(2)}</td></tr>`
                  )
                  .join('')}
              </table>

              <p class="total">Monthly Estimate: $${costs.monthlyEstimate.toFixed(2)}</p>
              <p class="total">Annual Estimate: $${(costs.monthlyEstimate * 12).toFixed(2)}</p>
            </div>
          `
              : ''
          }
        </body>
      </html>
    `

    const blob = new Blob([htmlContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `credit-calculator-${Date.now()}.html`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-sm font-semibold text-[#1a1f36] mb-4">
        Export Options
      </h3>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleExportJSON}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-[#4f7df3] text-[#4f7df3] rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm"
        >
          <FiDownload />
          Export JSON
        </button>

        <button
          onClick={handleExportPDF}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-[#10b981] text-[#10b981] rounded-lg hover:bg-green-50 transition-colors font-medium text-sm"
        >
          <FiFileText />
          Export Report
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-3 text-center">
        Save your calculation results for reference
      </p>
    </div>
  )
}
