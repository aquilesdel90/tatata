import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import '../brand/theme.css'   // variables de color/fuente de la marca

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* aplica la fuente configurada en brand/theme.css */}
    <div style={{ fontFamily: 'var(--font-sans)' }}>
      <App />
    </div>
  </React.StrictMode>
)
