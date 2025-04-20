import type OpenAI from 'openai'

export const Tool = {
  get_weather: 'get_weather',
  test_tool: 'test_tool',
}
export type Tool = (typeof Tool)[keyof typeof Tool]

function getWeather(input) {
  // use input
  return 'hot, 90deg'
}

function testTool(input) {
  return 'I am just a test tool'
}

export async function runTool(
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string
  // userId: string, // can pass in anything a tool might need
) {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments || '{} '),
  }

  switch (toolCall.function.name) {
    case Tool.get_weather:
      return getWeather(input)

    case Tool.test_tool:
      return testTool(input)

    default:
      return `Unknown tool: ${toolCall.function.name}`
  }
}
