import type { CaseStudy, Profile, Service, StackGroup } from '../types/profile';

export const profile: Profile = {
  name: 'Руслан Тимергалиев',
  initials: 'RT',
  role: 'Frontend-разработчик',
  city: 'Самара, Россия',
  email: 'rrtimergaliev@gmail.com',
  phone: '+7 917 815-01-10',
  stack: ['TypeScript', 'JavaScript', 'HTML', 'SCSS', 'Vite', 'Node.js', 'Express', 'REST API', 'Git'],
};

export const stats: Array<[string, string]> = [
  ['01', 'готовая страница'],
  ['02', 'сервер для формы'],
  ['03', 'письма на email'],
  ['04', 'пример с ИИ'],
];

export const stackGroups: StackGroup[] = [
  {
    title: 'Frontend',
    items: ['HTML', 'SCSS', 'JavaScript', 'TypeScript', 'Vite'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express', 'Zod', 'Nodemailer', 'REST API'],
  },
  {
    title: 'Инструменты',
    items: ['Git', 'npm', 'OpenAI API', 'адаптивная верстка', 'валидация форм'],
  },
];

export const services: Service[] = [
  {
    title: 'Интерфейсы',
    text: 'Верстаю адаптивные страницы и простые рабочие сценарии: формы, кнопки, сообщения об ошибках и успешной отправке.',
  },
  {
    title: 'Работа с API',
    text: 'Подключаю интерфейс к серверу, проверяю данные на обеих сторонах и показываю понятный результат пользователю.',
  },
  {
    title: 'ИИ в работе',
    text: 'Использую ИИ для черновиков, проверки идей и коротких текстов. Код и итоговое поведение все равно проверяю вручную.',
  },
];

export const cases: CaseStudy[] = [
  {
    number: '01',
    title: 'Этот сайт',
    scope: 'TypeScript, Vite, SCSS',
    text: 'Я собрал страницу о себе, разделил frontend и backend по папкам, вынес блоки в компоненты и подогнал верстку под разные экраны.',
  },
  {
    number: '02',
    title: 'Форма обратной связи',
    scope: 'Express, Zod, Nodemailer',
    text: 'Я сделал серверную обработку формы: проверку полей, отправку письма владельцу сайта и копию письма пользователю.',
  },
  {
    number: '03',
    title: 'Блок с ИИ',
    scope: 'OpenAI API через сервер',
    text: 'Я добавил пример обращения к OpenAI API с backend. Ключ не попадает в браузер, а без ключа сайт показывает заранее подготовленный текст.',
  },
];
