import type { Profile } from '../types/profile';

export const Ticker = (profile: Profile) => {
  const stack = profile.stack.join(' / ');

  return `
    <section class="ticker" aria-label="Ключевые навыки">
      <div>${stack}</div>
      <div>${stack}</div>
    </section>
  `;
};
