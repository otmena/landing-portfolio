export const AiSection = () => `
  <section class="section ai-section" aria-labelledby="ai-title">
    <div>
      <p class="section-kicker">Пример с ИИ</p>
      <h2 id="ai-title">Короткое описание через сервер</h2>
    </div>
    <div class="ai-panel">
      <p>Кнопка обращается к серверу. Если настроен ключ OpenAI, текст придет от модели. Если ключа нет, сайт покажет заранее подготовленный вариант.</p>
      <button class="button button--dark" id="ai-generate" type="button">Получить описание</button>
      <p class="ai-panel__result" id="ai-result" aria-live="polite">Нажмите кнопку, чтобы получить короткое описание профиля.</p>
    </div>
  </section>
`;
