import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { NhostClient, NhostReactProvider } from '@nhost/react'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'

const nhost = new NhostClient({
  subdomain: '<your-nhost-subdomain>',
  region: '<your-nhost-region>'
})

// Apollo client setup with Nhost auth
const httpLink = createHttpLink({
  uri: nhost.graphql.getUrl(),
  fetch: async (uri, options) => {
    const token = await nhost.auth.getAccessToken()
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`
    }
    return fetch(uri, options)
  }
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NhostReactProvider nhost={nhost}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </NhostReactProvider>
  </React.StrictMode>
)
