import { About } from './About';
import { AiSection } from './AiSection';
import { Cases } from './Cases';
import { Contact } from './Contact';
import { Footer } from './Footer';
import { Header } from './Header';
import { Hero } from './Hero';
import { Services } from './Services';
import { Stack } from './Stack';
import { Stats } from './Stats';
import { Ticker } from './Ticker';
import { Workflow } from './Workflow';
import { cases, profile, services, stackGroups, stats } from '../data/profile';

export const App = () => `
  ${Header(profile)}
  <main id="top">
    ${Hero(profile)}
    ${Ticker(profile)}
    ${Stats(stats)}
    ${About()}
    ${Stack(stackGroups)}
    ${Services(services)}
    ${Workflow()}
    ${Cases(cases)}
    ${AiSection()}
    ${Contact(profile)}
  </main>
  ${Footer(profile)}
`;
