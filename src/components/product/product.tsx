import {Guitar} from '../../types/guitar';
import {Review} from '../../types/comment';
import {Link} from 'react-router-dom';
import {addRatingStarArray, setRating} from '../../utils';
import FullStar from '../full-star/full-star';
import Star from '../star/star';
import {typeGuitarList, typesTabs} from '../../const';
import {useState} from 'react';

type ProductProps = {
  guitar: Guitar;
  comments: Review[];
}

function Product({guitar, comments}: ProductProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<{id: string, title: string}>(typesTabs[0]);
  const ratingFullStarArray = addRatingStarArray(guitar.rating).ratingFullStarArray;
  const ratingNotStarArray = addRatingStarArray(guitar.rating).ratingNotStarArray;

  return (
    <>
      <h1 className="page-content__title title title--bigger">{guitar.name}</h1>
      <ul className="breadcrumbs page-content__breadcrumbs">
        <li className="breadcrumbs__item"><Link className="link" to="/">Главная</Link>
        </li>
        <li className="breadcrumbs__item"><Link className="link" to="/">Каталог</Link>
        </li>
        <li className="breadcrumbs__item"><span className="link">{guitar.name}</span>
        </li>
      </ul>
      <div className="product-container">
        <img className="product-container__img"
          src={guitar.previewImg}
          width="90"
          height="235"
          alt=""
        />
        <div className="product-container__info-wrapper">
          <h2 className="product-container__title title title--big title--uppercase">{guitar.name}</h2>
          <div className="rate product-container__rating">
            {
              ratingFullStarArray.map((itemStar) => (<FullStar key={itemStar}/>))
            }
            {
              ratingNotStarArray.map((itemStar, index) => (<Star key={itemStar}/>))
            }
            <p className="visually-hidden">Оценка: {setRating(guitar.rating)}</p>
            <p className="rate__count">
              <span className="visually-hidden">Всего оценок:</span>
              {comments ? comments.length : ''}
            </p>
          </div>
          <div className="tabs">
            {
              typesTabs.map((tab) => (
                <Link
                  key={tab.title}
                  className={`button button--medium tabs__button ${tab.title !== activeTab.title ? 'button--black-border' : ''}`}
                  to={`/guitars/${guitar.id}/#${activeTab.id}`}
                  onClick={() =>  setActiveTab(tab)}
                >
                  {tab.title}
                </Link>
              ))
            }
            <div className="tabs__content">
              {
                activeTab.id === typesTabs[0].id &&
                <table id="characteristics" className="tabs__table">
                  <tbody>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Артикул:</td>
                      <td className="tabs__value">{guitar.vendorCode}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Тип:</td>
                      <td className="tabs__value">
                        {
                          typeGuitarList.map((type) => type.type === guitar.type ? type.title : '')
                        }
                      </td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Количество струн:</td>
                      <td className="tabs__value">{guitar.stringCount} струнная</td>
                    </tr>
                  </tbody>
                </table>
              }
              {
                activeTab.id === typesTabs[1].id &&
                <p id="description" className="tabs__product-description">{guitar.description}</p>
              }

            </div>
          </div>
        </div>
        <div className="product-container__price-wrapper">
          <p className="product-container__price-info product-container__price-info--title">Цена:</p>
          <p className="product-container__price-info product-container__price-info--value">52 000 ₽</p>
          <Link className="button button--red button--big product-container__button" to="#">Добавить в корзину</Link>
        </div>
      </div>
    </>
  );
}

export default Product;
