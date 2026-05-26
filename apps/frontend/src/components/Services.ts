import type { Service } from '../types/profile';

export const Services = (services: Service[]) => `
  <section class="section services" id="services" aria-labelledby="services-title">
    <div class="section-heading">
      <p class="section-kicker">Что делаю</p>
      <h2 id="services-title">Направления разработки</h2>
    </div>
    <div class="service-list">
      ${services
        .map(
          (service, index) => `
            <article class="service-row">
              <span>${String(index + 1).padStart(2, '0')}</span>
              <h3>${service.title}</h3>
              <p>${service.text}</p>
            </article>
          `,
        )
        .join('')}
    </div>
  </section>
`;
