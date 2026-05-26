import type { CaseStudy } from '../types/profile';

export const Cases = (cases: CaseStudy[]) => `
  <section class="section cases" id="cases" aria-labelledby="cases-title">
    <div class="section-heading">
      <p class="section-kicker">Опыт</p>
      <h2 id="cases-title">Что сделано в этом проекте</h2>
    </div>
    <div class="case-list">
      ${cases
        .map(
          (item) => `
            <article class="case-row">
              <span>${item.number}</span>
              <div>
                <h3>${item.title}</h3>
                <small>${item.scope}</small>
              </div>
              <p>${item.text}</p>
            </article>
          `,
        )
        .join('')}
    </div>
  </section>
`;
