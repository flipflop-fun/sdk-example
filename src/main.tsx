import { Buffer } from 'buffer';
import process from 'process';

window.global = window;
window.Buffer = Buffer;
window.process = process;

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
