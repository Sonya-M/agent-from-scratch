import type { AIMessage } from '../types'
import { addMessages, getMessages, saveToolResponse } from './memory'
import { runLLM } from './llm'
import { showLoader, logMessage } from './ui'
import { runTool } from './toolRunner'

/*
NB: openai expects messages in strict order, so if you are changing the code, makes sure
to reset message history in db.json to {"messages": []}
(or you might get errors like this:
```
 error: {
    message: "An assistant message with 'tool_calls' must be followed by tool messages responding to each 'tool_call_id'. The following tool_call_ids did not have response messages: call_TIJUdOJiF3dfZErq3ZQZMwyz",
    type: 'invalid_request_error',
    param: 'messages.[6].role',
    code: null
  }
```
)
*/
export async function runAgent({
  userMessage,
  tools,
}: {
  userMessage: string
  tools: any[]
}) {
  await addMessages([{ role: 'user', content: userMessage }])
  const loader = showLoader('Processing...')

  while (true) {
    const history = await getMessages()
    const response = await runLLM({ messages: history, tools })
    // console.log({ history })
    await addMessages([response]) // this might be the tool call

    if (response.content) {
      loader.stop()
      logMessage(response)
      return getMessages()
    }

    // with openai, it's response has either tool_calls or content field, never both;
    // response.content means you got to the final answer, the loop is done
    // you may also want to check the stop reason property
    if (response.tool_calls) {
      // console.log(response.tool_calls)
      // for parallel calls, you have to loop over tool_calls, here it's enough to take the first element
      const funcCall = response.tool_calls?.at(0)
      if (!funcCall) return
      loader.update(`executing ${funcCall.function.name}`)
      const result = await runTool(funcCall, userMessage)
      await saveToolResponse(funcCall.id, result)
      loader.update(`done ${funcCall.function.name}`)
    }
  }
}
