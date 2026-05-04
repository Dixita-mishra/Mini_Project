import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

<<<<<<< HEAD
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
=======
import { GoogleOAuthProvider } from '@react-oauth/google';

// You should replace this with your actual Google Client ID from Google Cloud Console
const GOOGLE_CLIENT_ID = "1065623027344-lsispp8uogvbnrvqesgqiinr8p9e93k7.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
>>>>>>> 75ae30bfff395c6740f8c31abd13bb919a3e4cb6
  </React.StrictMode>,
)
