import type { Profile } from '../types/profile';

export const Header = (profile: Profile) => `
  <header class="site-header">
    <a class="brand" href="#top" aria-label="На главный экран">${profile.initials}</a>
    <nav class="nav" aria-label="Основная навигация">
      <a href="#about">О себе</a>
      <a href="#services">Что делаю</a>
      <a href="#cases">Опыт</a>
      <a href="#contact">Контакты</a>
    </nav>
  </header>
`;
