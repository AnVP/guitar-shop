import {Link} from 'react-router-dom';
import {Guitar} from '../../types/guitar';
import {setRating, addRatingStarArray} from '../../utils';
import FullStar from '../full-star/full-star';
import Star from '../star/star';
import {fetchCommentsAction} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect} from 'react';

type GuitarProps = {
  guitar: Guitar;
}

function ProductCard(props: GuitarProps): JSX.Element {
  const {guitar} = props;
  const {comments, isCommentsLoaded, isDataLoaded} = useAppSelector(({DATA}) => DATA);
  const ratingFullStarArray = addRatingStarArray(guitar.rating).ratingFullStarArray;
  const ratingNotStarArray = addRatingStarArray(guitar.rating).ratingNotStarArray;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCommentsAction(Number(guitar.id)));
  }, [dispatch, guitar.id]);

  if (!isDataLoaded && !isCommentsLoaded) {
    return (
      <div className="product-card">
        <p>Загрузка...</p>
      </div>);
  }

  return (
    <div id={`${guitar.id}`} className="product-card">
      <img src={guitar.previewImg}
        width="75" height="190"
        alt={guitar.name}
      />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {
            ratingFullStarArray.map((itemStar) => (<FullStar key={itemStar}/>))
          }
          {
            ratingNotStarArray.map((itemStar, index) => (<Star key={itemStar}/>))
          }
          <p className="visually-hidden">Рейтинг: {setRating(guitar.rating)}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{comments ? comments.length : ''}</p>
        </div>
        <p className="product-card__title">{guitar.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{guitar.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={`/guitars/${guitar.id}`}>Подробнее</Link>
        <Link className="button button--red button--mini button--add-to-cart" to="#">Купить</Link>
      </div>
    </div>
  );
}

export default ProductCard;
