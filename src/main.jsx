import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom' 
import './index.css'
import { router } from './router/Routes.jsx'
import { AuthContext } from './context/AuthContext.jsx'
import AuthProvider from './provider/AuthProvider.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
    <LanguageProvider>
       <RouterProvider router={router} />
    </LanguageProvider>
   </AuthProvider>
  </StrictMode>
)
