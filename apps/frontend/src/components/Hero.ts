import type { Profile } from '../types/profile';

export const Hero = (profile: Profile) => `
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__content">
      <p class="eyebrow">${profile.city}</p>
      <h1 id="hero-title">Frontend-разработчик</h1>
      <p class="lead">Делаю страницы и интерфейсы, которые не просто выглядят нормально, а работают до конца: отправляют данные, показывают ошибки и дают понятный результат.</p>
      <div class="hero__actions">
        <a class="button button--dark" href="#contact">Связаться</a>
      </div>
    </div>

    <figure class="hero__portrait">
      <img src="/profile-photo.png" alt="Портрет Руслана Тимергалиева" />
      <figcaption>
        <span>${profile.name}</span>
        <span>${profile.role}</span>
      </figcaption>
    </figure>
  </section>
`;
