import React from 'react'
import { 
  useAuthenticationStatus, 
  useSignInEmailPassword, 
  useSignUpEmailPassword, 
  useSignOut 
} from '@nhost/react'

import ChatList from './components/ChatList'
import ChatWindow from './components/ChatWindow'

export default function App() {
  const { isAuthenticated } = useAuthenticationStatus()
  const { signInEmailPassword } = useSignInEmailPassword()
  const { signUpEmailPassword } = useSignUpEmailPassword()
  const { signOut } = useSignOut()

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [selectedChat, setSelectedChat] = React.useState(null)

  if (!isAuthenticated) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Sign In / Sign Up</h2>
        <input 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
        />
        <div>
          <button onClick={() => signInEmailPassword(email, password)}>Sign In</button>
          <button onClick={() => signUpEmailPassword(email, password)}>Sign Up</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar with Chat List */}
      <div style={{ width: '30%', borderRight: '1px solid #ccc', padding: 10 }}>
        <button onClick={signOut}>Logout</button>
        <h2>Chats</h2>
        <ChatList onSelectChat={setSelectedChat} />
      </div>

      {/* Main Chat Window */}
      <div style={{ flex: 1, padding: 10 }}>
        {selectedChat ? (
          <ChatWindow chatId={selectedChat} />
        ) : (
          <p>Select a chat to start messaging</p>
        )}
      </div>
    </div>
  )
}