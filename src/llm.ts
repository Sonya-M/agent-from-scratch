import { z, type ZodFunction } from 'zod'
import type { AIMessage } from '../types'
import { openai } from './ai'
import { zodFunction } from 'openai/helpers/zod'
import { systemPrompt } from './systemPrompt'

export async function runLLM({
  messages,
  tools,
}: {
  messages: AIMessage[]
  tools: Parameters<typeof zodFunction>[0][]
}) {
  const formattedTools = tools.map(zodFunction)
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.1,
    messages: [{ role: 'system', content: systemPrompt }, ...messages],
    tools: formattedTools,
    tool_choice: 'auto',
    parallel_tool_calls: false,
    //// for formatted/structured output, use e.g.
    // response_format: {
    //   json_schema: {
    //     description:
    //       'A description of what the response format is for, used by the model to determine how to respond in the format',
    //     name: 'The name of the response format. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64',
    //   },
    //   type: 'json_schema',
    // },
  })
  return response.choices[0].message
}
