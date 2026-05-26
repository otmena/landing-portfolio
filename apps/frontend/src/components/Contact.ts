import type { Profile } from '../types/profile';

export const Contact = (profile: Profile) => `
  <section class="section contact" id="contact" aria-labelledby="contact-title">
    <div class="contact__info">
      <p class="section-kicker">Контакты</p>
      <h2 id="contact-title">Напишите мне</h2>
      <p>Форма отправляет письмо владельцу сайта и копию пользователю. Ошибки показываются около полей и в общем статусе формы.</p>
      <div class="contact-links">
        <a href="mailto:${profile.email}">${profile.email}</a>
        <a href="tel:${profile.phone.replace(/[^\d+]/g, '')}">${profile.phone}</a>
      </div>
    </div>

    <form class="contact-form" id="contact-form" novalidate>
      <label>
        <span>Имя</span>
        <input name="name" type="text" autocomplete="name" minlength="2" required />
        <small data-error-for="name"></small>
      </label>
      <label>
        <span>Телефон</span>
        <input name="phone" type="tel" autocomplete="tel" inputmode="tel" required />
        <small data-error-for="phone"></small>
      </label>
      <label>
        <span>Email</span>
        <input name="email" type="email" autocomplete="email" required />
        <small data-error-for="email"></small>
      </label>
      <label>
        <span>Комментарий</span>
        <textarea name="comment" rows="5" minlength="10" required></textarea>
        <small data-error-for="comment"></small>
      </label>
      <button class="button button--dark contact-form__submit" type="submit">Отправить</button>
      <p class="form-status" id="form-status" aria-live="polite"></p>
    </form>
  </section>
`;
