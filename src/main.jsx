import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ShopContextProvider from './context/ShopContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'


createRoot(document.getElementById('root')).render(

  <BrowserRouter>
  <ShopContextProvider>
  <AuthProvider>
  <App />
  </AuthProvider>
  </ShopContextProvider>
  </BrowserRouter>,
)
