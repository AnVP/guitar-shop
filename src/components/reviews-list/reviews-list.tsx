import ReviewsItem from '../reviews-item/reviews-item';
import {Review} from '../../types/comment';
import {sortComments} from '../../utils';
import {CommentsLength} from '../../const';
import {useState, MouseEvent} from 'react';
import {Link} from 'react-router-dom';

type ReviewsListProps = {
  comments: Review[];
  onClickButtonAddReview: (evt: MouseEvent<HTMLAnchorElement>) => void;
}

function ReviewsList({comments, onClickButtonAddReview}: ReviewsListProps): JSX.Element {
  const [visibleComments, setVisibleComments] = useState<number>(CommentsLength.Max);
  const sortedComments = sortComments(comments);
  const isVisibleComments = (visibleComments < sortedComments.length);

  const handleButtonShowComments = () => {
    setVisibleComments((prevState) => prevState + CommentsLength.Max);
  };

  const handleButtonScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <Link
        className="button button--red-border button--big reviews__sumbit-button"
        to="#"
        onClick={onClickButtonAddReview}
      >
        Оставить отзыв
      </Link>
      {
        sortedComments.slice(CommentsLength.Min, visibleComments).map((comment) => (<ReviewsItem key={comment.id} comment={comment}/>))
      }
      {
        isVisibleComments &&
        <button
          className="button button--medium reviews__more-button"
          onClick={handleButtonShowComments}
        >
          Показать еще
        </button>
      }
      <a
        className="button button--up button--red-border button--big reviews__up-button"
        onClick={(evt) => {
          evt.preventDefault();
          handleButtonScrollToTop();
        }}
      >
        Наверх
      </a>
    </section>
  );
}

export default ReviewsList;
