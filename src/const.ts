export const TIMEOUT_SHOW_ERROR = 2000;
export const GUITAR_COUNT = 9;
export const RATING_STAR_MAX = 5;
export const ESC_KEY_CODE = 'Escape';

export enum HTTPCode {
  BadRequest = 400,
  NotFound = 404,
}

export enum AppRoute {
  Root = '/',
  Product = '/guitars/:id'
}

export enum APIRoute {
  Guitars = '/guitars?_limit=27',
  Comments = '/comments',
  Guitar = '/guitars',
}

export enum NameSpace {
  Data = 'DATA',
}

export enum CommentsLength {
  Min = 0,
  Max = 3,
}

export enum NameLinks {
  Catalog = 'Каталог',
  Buy = 'Где купить',
  About = 'О компании',
}

export const typeGuitarList: {type: string, title: string}[] = [
  {
    type: 'electric',
    title: 'Электрогитара',
  },
  {
    type: 'ukulele',
    title: 'Укулеле',
  },
  {
    type: 'acoustic',
    title: 'Акустическая',
  },
];

export const typesTabs: {id: string, title: string}[] = [
  {
    id: 'characteristics',
    title: 'Характеристики',
  },
  {
    id: 'description',
    title: 'Описание',
  },
];

export const navList = [
  {
    title: NameLinks.Catalog,
    link: AppRoute.Root,
  },
  {
    title: NameLinks.About,
    link: '#',
  },
  {
    title: NameLinks.Buy,
    link: '#',
  },
];

export const ratingList: {id: string, title: string}[] = [
  {
    id: '5-stars',
    title: 'Отлично',
  },
  {
    id: '4-stars',
    title: 'Хорошо',
  },
  {
    id: '3-stars',
    title: 'Нормально',
  },
  {
    id: '2-stars',
    title: 'Плохо',
  },
  {
    id: '1-stars',
    title: 'Ужасно',
  },
];
