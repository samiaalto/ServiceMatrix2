import { createRoot } from 'react-dom/client';
import './translations/i18n';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <Router>
    <App />
  </Router>
);
