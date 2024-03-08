import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Fonction pour extraire l'ID de l'URL
function getUserIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    return userId ? parseInt(userId, 10) : 18; // Utilise 18 comme valeur par défaut
}

ReactDOM.createRoot(document.getElementById('root')).render (
    <React.StrictMode>
        <App initialUserId={getUserIdFromURL()} />
    </React.StrictMode>
);