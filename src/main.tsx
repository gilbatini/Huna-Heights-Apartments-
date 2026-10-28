import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import '@fontsource/rubik/300.css';
import '@fontsource/rubik/400.css';
import '@fontsource/rubik/500.css';
import '@fontsource/barlow-condensed/300.css';
import '@fontsource/barlow-condensed/400.css';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
