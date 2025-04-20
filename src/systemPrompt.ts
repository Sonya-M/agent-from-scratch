// unlike messages, never save system prompt in a db because you'll be changing it -
// just add it to the beginning of the messages array

export const systemPrompt = `
You are a helpful AI assistant. Follow these instructions:
- don't use celebrity naes in image generation prompts; replace them with a generic character traits

<context>
today's date: ${new Date().toLocaleDateString()}</context>
`
