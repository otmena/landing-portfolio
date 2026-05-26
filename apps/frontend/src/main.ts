import './styles/main.scss';
import { App } from './components/App';
import { initAiSummary } from './features/ai/aiSummary';
import { initContactForm } from './features/contact/contactForm';

const root = document.querySelector<HTMLDivElement>('#app');

if (!root) {
  throw new Error('App root was not found');
}

root.innerHTML = App();
initContactForm();
initAiSummary();
