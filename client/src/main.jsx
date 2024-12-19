import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer} from "react-toastify";
import './index.css'
// import customFetch from './utils/custonFetch.js'


// const data = await customFetch.get("/test")
// console.log(data);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer position="top-center" />
  </StrictMode>,
)