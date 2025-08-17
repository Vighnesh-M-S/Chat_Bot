import React from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'

const GET_CHATS = gql`
  query GetChats {
    chats(order_by: { created_at: desc }) {
      id
      created_at
    }
  }
`

const CREATE_CHAT = gql`
  mutation CreateChat {
    insert_chats_one(object: {}) {
      id
    }
  }
`

export default function ChatList() {
  const { data, loading } = useQuery(GET_CHATS)
  const [createChat] = useMutation(CREATE_CHAT)

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h2>Your Chats</h2>
      <button onClick={() => createChat()}>New Chat</button>
      <ul>
        {data?.chats.map(chat => (
          <li key={chat.id}>{chat.id}</li>
        ))}
      </ul>
    </div>
  )
}
