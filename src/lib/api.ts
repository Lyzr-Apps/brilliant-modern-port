const CREDIT_CALCULATOR_MANAGER_ID = '695e3f8e571aa23089e7ac02'

export async function callAgentAPI(message: string): Promise<any> {
  const response = await fetch('/api/agent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      agent_id: CREDIT_CALCULATOR_MANAGER_ID,
      message,
    }),
  })

  if (!response.ok) {
    throw new Error(`Agent API error: ${response.statusText}`)
  }

  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Agent API request failed')
  }

  // Return the parsed response from the agent
  return data.response
}
