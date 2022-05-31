// import {Review} from '../../types/offers';
// import {dateFormatted} from '../../utils';
import {Review} from '../../types/comment';
import FullStar from '../full-star/full-star';
import Star from '../star/star';
import {addRatingStarArray, setRating, dateFormatted} from '../../utils';

type CommentsProps = {
  comment: Review;
}

function ReviewsItem({comment}: CommentsProps): JSX.Element {
  const ratingFullStarArray = addRatingStarArray(comment.rating).ratingFullStarArray;
  const ratingNotStarArray = addRatingStarArray(comment.rating).ratingNotStarArray;

  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{comment.userName}</h4>
        <span className="review__date">{dateFormatted(comment.createAt)}</span>
      </div>
      <div className="rate review__rating-panel">
        {
          ratingFullStarArray.map((itemStar) => (<FullStar key={itemStar}/>))
        }
        {
          ratingNotStarArray.map((itemStar, index) => (<Star key={itemStar}/>))
        }
        <p className="visually-hidden">Оценка: {setRating(comment.rating)}</p>
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{comment.advantage}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{comment.disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{comment.comment}</p>
    </div>
  );
}

export default ReviewsItem;
