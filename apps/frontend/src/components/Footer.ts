import type { Profile } from '../types/profile';

export const Footer = (profile: Profile) => `
  <footer class="footer">
    <span>${profile.name}</span>
    <span>Frontend-разработчик</span>
  </footer>
`;
