import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';
class ErrorBoundary extends React.Component {
    constructor(props) { super(props); this.state = { error: null }; }
    static getDerivedStateFromError(error) { return { error }; }
    componentDidCatch(error, info) { console.error('Portfolio runtime error:', error, info); }
    render() {
        if (this.state.error)
            return <main className="fatalError"><div><span>AU / Runtime guard</span><h1>The portfolio hit a runtime error.</h1><p>{this.state.error.message}</p><p>Run <code>npm install</code>, then <code>npm run dev</code>. If the issue continues, inspect the browser console.</p><button onClick={() => window.location.reload()}>Reload</button></div></main>;
        return this.props.children;
    }
}
const rootElement = document.getElementById('root');
if (!rootElement)
    throw new Error('Root element was not found.');
createRoot(rootElement).render(<React.StrictMode><ErrorBoundary><App /></ErrorBoundary></React.StrictMode>);
