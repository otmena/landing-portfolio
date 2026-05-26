import type { StackGroup } from '../types/profile';

export const Stack = (groups: StackGroup[]) => `
  <section class="section stack-section" aria-labelledby="stack-title">
    <div class="section-heading">
      <p class="section-kicker">Стек</p>
      <h2 id="stack-title">Что использую в работе</h2>
    </div>
    <div class="stack-grid">
      ${groups
        .map(
          (group) => `
            <article class="stack-card">
              <h3>${group.title}</h3>
              <ul>
                ${group.items.map((item) => `<li>${item}</li>`).join('')}
              </ul>
            </article>
          `,
        )
        .join('')}
    </div>
  </section>
`;
