import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { createHead, UnheadProvider } from '@unhead/react/client'
import './index.css'
import { router } from './routes'
import { LanguageProvider } from './context/LanguageContext'

const head = createHead()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <UnheadProvider head={head}>
        <RouterProvider router={router} />
      </UnheadProvider>
    </LanguageProvider>
  </StrictMode>,
)
