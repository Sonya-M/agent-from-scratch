Example session from db.json:
```json
{
  "messages": [
    {
      "role": "user",
      "content": "how is the weather",
      "id": "e403773a-25ac-4fcb-ba85-54036a5fd3a6",
      "createdAt": "2025-04-06T21:11:48.751Z"
    },
    {
      "role": "assistant",
      "content": "Could you please specify the location for which you would like to know the weather?",
      "refusal": null,
      "annotations": [],
      "id": "4f39c428-1b57-4762-bbc9-065e509a8f47",
      "createdAt": "2025-04-06T21:11:50.106Z"
    },
    {
      "role": "user",
      "content": "Novi Sad",
      "id": "9d57939a-1e3e-43c1-babc-f662114f449a",
      "createdAt": "2025-04-06T21:12:04.255Z"
    },
    {
      "role": "assistant",
      "content": null,
      "tool_calls": [
        {
          "id": "call_ydnV91XqLGzfiQjqPOtxBRHK",
          "type": "function",
          "function": {
            "name": "get_weather",
            "arguments": "{\"reasoning\":\"To provide the current weather information for Novi Sad.\"}"
          }
        }
      ],
      "refusal": null,
      "annotations": [],
      "id": "ee676f51-1ab8-4c98-ab46-db37cd3534fa",
      "createdAt": "2025-04-06T21:12:05.227Z"
    },
    {
      "role": "tool",
      "content": "hot, 90deg",
      "tool_call_id": "call_ydnV91XqLGzfiQjqPOtxBRHK",
      "id": "98dca2c1-367a-4ecf-bdfb-eac14bb3505e",
      "createdAt": "2025-04-06T21:12:05.229Z"
    }
  ]
}
```