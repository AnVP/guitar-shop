import {GUITAR_COUNT} from '../../const';
import {useAppSelector} from '../../hooks';
import ProductCard from '../product-card/product-card';
import ReactPaginate from 'react-paginate';
import {Link} from 'react-router-dom';
import {useState} from 'react';

function Catalog(): JSX.Element {
  const {guitars} = useAppSelector(({DATA}) => DATA);
  const pageGuitarCount = Math.ceil(guitars.length / GUITAR_COUNT);

  const [currentPage, setCurrentPage] = useState(1);
  const lastGuitarIndex = currentPage * GUITAR_COUNT;
  const firstGuitarIndex = lastGuitarIndex - GUITAR_COUNT;
  const currentGuitars = guitars.slice(firstGuitarIndex, lastGuitarIndex);

  const handlePageClick = (numberPage: number) => setCurrentPage(numberPage);

  return (
    <>
      <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
      <ul className="breadcrumbs page-content__breadcrumbs">
        <li className="breadcrumbs__item">
          <Link className="link" to="/">Главная</Link>
        </li>
        <li className="breadcrumbs__item">
          <span className="link">Каталог</span>
        </li>
      </ul>
      <div className="catalog">
        <form className="catalog-filter">
          <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
          <fieldset className="catalog-filter__block">
            <legend className="catalog-filter__block-title">Цена, ₽</legend>
            <div className="catalog-filter__price-range">
              <div className="form-input">
                <label className="visually-hidden">Минимальная цена</label>
                <input type="number" placeholder="1 000" id="priceMin" name="от"/>
              </div>
              <div className="form-input">
                <label className="visually-hidden">Максимальная цена</label>
                <input type="number" placeholder="30 000" id="priceMax" name="до"/>
              </div>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="catalog-filter__block-title">Тип гитар</legend>
            <div className="form-checkbox catalog-filter__block-item">
              <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic"/>
              <label htmlFor="acoustic">Акустические гитары</label>
            </div>
            <div className="form-checkbox catalog-filter__block-item">
              <input className="visually-hidden" type="checkbox" id="electric" name="electric" defaultChecked/>
              <label htmlFor="electric">Электрогитары</label>
            </div>
            <div className="form-checkbox catalog-filter__block-item">
              <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" defaultChecked/>
              <label htmlFor="ukulele">Укулеле</label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="catalog-filter__block-title">Количество струн</legend>
            <div className="form-checkbox catalog-filter__block-item">
              <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" defaultChecked/>
              <label htmlFor="4-strings">4</label>
            </div>
            <div className="form-checkbox catalog-filter__block-item">
              <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings" defaultChecked/>
              <label htmlFor="6-strings">6</label>
            </div>
            <div className="form-checkbox catalog-filter__block-item">
              <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings"/>
              <label htmlFor="7-strings">7</label>
            </div>
            <div className="form-checkbox catalog-filter__block-item">
              <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" disabled/>
              <label htmlFor="12-strings">12</label>
            </div>
          </fieldset>
          <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>
        </form>
        <div className="catalog-sort">
          <h2 className="catalog-sort__title">Сортировать:</h2>
          <div className="catalog-sort__type">
            <button className="catalog-sort__type-button" aria-label="по цене">по цене</button>
            <button className="catalog-sort__type-button" aria-label="по популярности">по популярности</button>
          </div>
          <div className="catalog-sort__order">
            <button className="catalog-sort__order-button catalog-sort__order-button--up" aria-label="По возрастанию"></button>
            <button className="catalog-sort__order-button catalog-sort__order-button--down" aria-label="По убыванию"></button>
          </div>
        </div>
        <div className="cards catalog__cards">
          {
            currentGuitars.map((guitar) => (
              <ProductCard
                key={guitar.id}
                guitar={guitar}
              />
            ))
          }
        </div>
        <div className="pagination page-content__pagination">
          {
            <ReactPaginate
              previousLabel={'Назад'}
              nextLabel={'Далее'}
              nextClassName={'pagination__page pagination__page--next'}
              nextLinkClassName={'link pagination__page-link'}
              previousClassName={'pagination__page pagination__page--prev'}
              previousLinkClassName={'link pagination__page-link'}
              pageCount={pageGuitarCount}
              containerClassName={'pagination__list'}
              pageClassName={'pagination__page'}
              pageLinkClassName={'link pagination__page-link'}
              activeClassName={'pagination__page--active'}
              disabledClassName={'pagination__page--hidden'}
              onPageChange={(e) => handlePageClick(e.selected + 1)}
            />
          }
        </div>
      </div>
    </>
  );
}

export default Catalog;
