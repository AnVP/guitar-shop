import {RATING_STAR_MAX} from './const';
import {Review} from './types/comment';

export const setRating = (rating: number) => {
  let ratingText = '';
  switch (Math.trunc(rating)) {
    case 1: {
      return  ratingText = 'Ужасно';
    }
    case 2: {
      return  ratingText = 'Плохо';
    }
    case 3: {
      return  ratingText = 'Нормально';
    }
    case 4: {
      return  ratingText = 'Хорошо';
    }
    case 5: {
      return  ratingText = 'Отлично';
    }
    default: {
      return ratingText;
    }
  }
};

export const addRatingStarArray = (rating: number) => {
  const ratingFullStar = new Array(Math.trunc(rating));
  const ratingNotStar = new Array((RATING_STAR_MAX - ratingFullStar.length));
  const ratingFullStarArray = Array.from(ratingFullStar, () =>  Math.random());
  const ratingNotStarArray = Array.from(ratingNotStar, () =>  Math.random());
  return {
    ratingFullStarArray,
    ratingNotStarArray,
  };
};

const sortCommentsToDate = (commentA: Review, commentB: Review) => new Date(commentB.createAt).getTime() - new Date(commentA.createAt).getTime();
export const sortComments = (comments: Review[]) => comments.slice().sort(sortCommentsToDate);

export const dateFormatted = (date: string) => new Date(date).toLocaleDateString('ru-RU', {
  day: 'numeric',
  month: 'long',
});
