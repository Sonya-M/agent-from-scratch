import 'dotenv/config'
import { addMessages, getMessages } from './src/memory'

const userMessage = process.argv[2]
import { runLLM } from './src/llm'

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

await addMessages([{ role: 'user', content: userMessage }])
const messages = await getMessages()

const response = await runLLM({
  messages,
})
await addMessages([{ role: 'assistant', content: response }])
console.log(response)
