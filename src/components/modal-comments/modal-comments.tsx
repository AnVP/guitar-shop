import React, {useState, ChangeEvent, FormEvent} from 'react';
import Modal from '../modal/modal';
import Success from '../success/success';
import {ratingList} from '../../const';
import {useAppDispatch} from '../../hooks';
import {ReviewPost} from '../../types/comment';
import {fetchActiveProductAction, fetchAddCommentAction, fetchCommentsAction} from '../../store/api-actions';
import classNames from 'classnames';

type ModalCommentsProps = {
  closeModal: () => void;
  title: string;
  id: number;
}

function ModalComments({closeModal, title, id}: ModalCommentsProps): JSX.Element {
  // const {guitar} = useAppSelector(({DATA}) => DATA);
  const [rating, setRating] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const [advantage, setAdvantage] = useState<string>('');
  const [disadvantage, setDisadvantage] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [isRatingValid, setIsRatingValid] = useState<boolean>(true);
  const [isUserNameValid, setIsUserNameValid] = useState<boolean>(true);
  const [isAdvantageValid, setIsAdvantageValid] = useState<boolean>(true);
  const [isDisadvantageValid, setIsDisadvantageValid] = useState<boolean>(true);
  const [isCommentValid, setIsCommentValid] = useState<boolean>(true);
  const [isSuccess, setSuccess] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const modalClassName = classNames({
    'modal--review': !isSuccess,
    'modal--success': isSuccess,
  });

  const commentPostItem: ReviewPost = {
    guitarId: id,
    userName,
    advantage,
    disadvantage,
    comment,
    rating,
  };

  const handleRatingChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const value = target.value;
    setRating(Number(value));
  };

  const handleUserNameChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setUserName(target.value);
  };

  const handleAdvantageChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setAdvantage(target.value);
  };

  const handleDisadvantageChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setDisadvantage(target.value);
  };

  const handleCommentChange = ({target}: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(target.value);
  };

  const checkFormValidation = () => {
    if (!userName) {
      setIsUserNameValid(false);
    }
    if (!advantage) {
      setIsAdvantageValid(false);
    }
    if (!disadvantage) {
      setIsDisadvantageValid(false);
    }
    if (!comment) {
      setIsCommentValid(false);
    }
    if (!rating) {
      setIsRatingValid(false);
    }

    return userName && advantage && disadvantage && rating && comment;
  };

  const handleCommentFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const isFormValid = checkFormValidation();

    if (isFormValid) {
      dispatch(fetchAddCommentAction(commentPostItem));
      dispatch(fetchActiveProductAction(Number(id)));
      dispatch(fetchCommentsAction(Number(id)));

      setUserName('');
      setAdvantage('');
      setDisadvantage('');
      setComment('');
      setRating(0);
      setSuccess(true);
    }
  };

  return (
    <Modal closeModal={closeModal} selector={modalClassName}>
      {
        isSuccess ? <Success closeModal={closeModal}/> : (
          <>
            <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
            <h3 className="modal__product-name title title--medium-20 title--uppercase">{title}</h3>
            <form
              className="form-review"
              onSubmit={handleCommentFormSubmit}
            >
              <div className="form-review__wrapper">
                <div className="form-review__name-wrapper">
                  <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                  <input
                    className="form-review__input form-review__input--name"
                    id="user-name"
                    type="text"
                    autoComplete="off"
                    value={userName}
                    onChange={handleUserNameChange}
                    onInput={() => setIsUserNameValid(true)}
                  />
                  <p className="form-review__warning">{!isUserNameValid ? 'Заполните поле' : ''}</p>
                </div>
                <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                  <div className="rate rate--reverse">
                    {
                      ratingList.map((ratingItem, index) => (
                        <React.Fragment key={ratingItem.id}>
                          <input
                            onChange={handleRatingChange}
                            checked={(ratingList.length - index) === Number(rating)}
                            className="visually-hidden"
                            name="rating"
                            value={ratingList.length - index}
                            id={ratingItem.id}
                            type="radio"
                            onInput={() => setIsRatingValid(true)}
                          />
                          <label htmlFor={ratingItem.id}
                            className="rate__label"
                            title={ratingItem.title}
                          >
                          </label>
                        </React.Fragment>
                      ))
                    }
                    <p className="rate__message">{!isRatingValid ? 'Поставьте оценку' : ''}</p>
                  </div>
                </div>
              </div>
              <label className="form-review__label form-review__label--required" htmlFor="adv">Достоинства</label>
              <input
                className="form-review__input"
                id="adv"
                type="text"
                autoComplete="off"
                value={advantage}
                onChange={handleAdvantageChange}
                onInput={() => setIsAdvantageValid(true)}
              />
              <p className="form-review__warning">{!isAdvantageValid ? 'Заполните поле' : ''}</p>
              <label className="form-review__label form-review__label--required" htmlFor="disadv">Недостатки</label>
              <input
                className="form-review__input"
                id="disadv"
                type="text"
                autoComplete="off"
                value={disadvantage}
                onChange={handleDisadvantageChange}
                onInput={() => setIsDisadvantageValid(true)}
              />
              <p className="form-review__warning">{!isDisadvantageValid ? 'Заполните поле' : ''}</p>
              <label className="form-review__label form-review__label--required" htmlFor="comment">Комментарий</label>
              <textarea
                className="form-review__input form-review__input--textarea"
                id="comment" rows={10}
                autoComplete="off"
                value={comment}
                onChange={handleCommentChange}
                onInput={() => setIsCommentValid(true)}
              >
              </textarea>
              <p className="form-review__warning">{!isCommentValid ? 'Заполните поле' : ''}</p>
              <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
            </form>
          </>
        )
      }
    </Modal>
  );
}

export default ModalComments;
