import type OpenAI from 'openai'
import {
  generateImage,
  generateImageToolDefinition,
} from './tools/generateImage'
import { reddit, redditToolDefinition } from './tools/reddit'
import { dadJoke, dadJokeToolDefinition } from './tools/dadoke'

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
    case generateImageToolDefinition.name:
      return generateImage(input)

    case redditToolDefinition.name:
      return reddit(input)

    case dadJokeToolDefinition.name:
      return dadJoke(input)

    default:
      return `Unknown tool: ${toolCall.function.name}`
  }
}
