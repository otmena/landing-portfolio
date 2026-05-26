export const Stats = (items: Array<[string, string]>) => `
  <section class="stats" aria-label="Ключевые показатели проекта">
    ${items
      .map(
        ([value, label]) => `
          <article>
            <strong>${value}</strong>
            <span>${label}</span>
          </article>
        `,
      )
      .join('')}
  </section>
`;
