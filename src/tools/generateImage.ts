import { z } from 'zod'
import type { ToolFn } from '../../types'
import { openai } from '../ai'

export const generateImageToolDefinition = {
  name: 'generate_image',
  parameters: z.object({
    prompt: z
      .string()
      .describe(
        "prompt for the image. Be sure to consider the user's original message when making the prompt. If in doubt, ask user for more details"
      ),
  }),
  description: 'generate an image',
}

type ARgs = z.infer<typeof generateImageToolDefinition.parameters>

export const generateImage: ToolFn<ARgs, string> = async ({ toolArgs }) => {
  // you could also pass it userMessage, and then call another llm that generates img gen prompts
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: toolArgs.prompt,
    n: 1,
    size: '1024x1024',
  })
  return response.data[0].url ?? 'No image'
}
