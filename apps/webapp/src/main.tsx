import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
    rootElement.style.backgroundColor = 'background-color';
    createRoot(rootElement).render(
        <App />
    );
}
