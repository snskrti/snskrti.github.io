import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
var rootElement = document.getElementById('root');
if (rootElement) {
    rootElement.style.backgroundColor = 'background-color';
    createRoot(rootElement).render(_jsx(App, {}));
}
