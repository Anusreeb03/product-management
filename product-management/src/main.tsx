import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'
const queryClient = new QueryClient()
// new QueryClient():creates the shared cache and configuration for queries.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
// QueryClient is React Query’s manager for server data. It coordinates 
// queries—such as fetching products—and keeps their results
//  in a cache so components can access and reuse them.
{/* <QueryClientProvider client={queryClient}>
makes that client available to App and its useQuery call. */}