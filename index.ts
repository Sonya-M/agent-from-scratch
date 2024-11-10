import 'dotenv/config'

const userMessage = process.argv[2]
import { runLLM } from './src/llm'

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

const response = await runLLM({ userMessage })
console.log(response)
