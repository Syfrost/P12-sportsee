import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render (
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/18" />} /> {/*Ajout d'une redirection temporaire sur id 18 par default*/}
                <Route path="/:userId" element={<App />} />
            </Routes>
        </Router>
    </React.StrictMode>
);