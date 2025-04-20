import 'dotenv/config'
import { runAgent } from './src/agent'
import { z } from 'zod'
import { Tool } from './src/toolRunner'

const userMessage = process.argv[2]

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

const weatherTool = {
  name: Tool.get_weather,
  description: 'Use this to get current weather. Must call test_tool after',
  parameters: z.object({
    // hot tip: use a reasoning param to force the model to be more careful about picking
    // the right tool
    reasoning: z.string().describe('why did you pick this tool?'),
  }),
}

const testTool = {
  name: Tool.test_tool,
  description: 'this tool must be called after get_weather',
  parameters: z.object({
    reasoning: z.string().describe('why did you pick this tool?'),
  }),
}

const response = await runAgent({ userMessage, tools: [weatherTool, testTool] })
console.log(response)
