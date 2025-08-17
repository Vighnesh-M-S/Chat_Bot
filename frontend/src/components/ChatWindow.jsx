import React, { useState } from 'react'
import { gql, useSubscription, useMutation } from '@apollo/client'

const MESSAGES_SUB = gql`
  subscription Messages {
    messages(order_by: { created_at: asc }) {
      id
      content
      role
      created_at
    }
  }
`

const SEND_MESSAGE = gql`
  mutation SendMessage($chatId: uuid!, $content: String!) {
    sendMessage(chat_id: $chatId, content: $content) {
      reply
    }
  }
`

export default function ChatWindow() {
  const { data, loading } = useSubscription(MESSAGES_SUB)
  const [sendMessage] = useMutation(SEND_MESSAGE)

  const [input, setInput] = useState('')
  const chatId = "<set_selected_chat_id_here>" // later wire to ChatList

  if (loading) return <p>Loading messages...</p>

  const handleSend = () => {
    if (!input) return
    sendMessage({ variables: { chatId, content: input } })
    setInput('')
  }

  return (
    <div>
      <h2>Messages</h2>
      <div style={{ height: 200, overflowY: 'scroll', border: '1px solid #ccc' }}>
        {data?.messages.map(m => (
          <div key={m.id}>
            <strong>{m.role}: </strong>{m.content}
          </div>
        ))}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" />
      <button onClick={handleSend}>Send</button>
    </div>
  )
}
