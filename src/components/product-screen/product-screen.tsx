import {useParams} from 'react-router-dom';
import Layout from '../layout/layout';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {MouseEvent, useEffect, useState} from 'react';
import Product from '../product/product';
import ReviewsList from '../reviews-list/reviews-list';
import {fetchActiveProductAction, fetchCommentsAction} from '../../store/api-actions';
import LoadingScreen from '../loading-screen/loading-screen';
import ModalComments from '../modal-comments/modal-comments';
import NotFoundScreen from '../not-found-screen/not-found-screen';

function ProductScreen(): JSX.Element  {
  const {guitar, comments, isCommentsLoaded} = useAppSelector(({DATA}) => DATA);
  const {id} = useParams<{id?: string}>();
  const [isVisibleModal, setVisibleModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchActiveProductAction(Number(id)));
    dispatch(fetchCommentsAction(Number(id)));
  }, [dispatch, id]);

  if (!guitar) {
    return (<NotFoundScreen/>);
  }

  if (!guitar || !comments) {
    return (<LoadingScreen/>);
  }

  const handleButtonOpenCommentModal = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    setVisibleModal(true);
  };

  const handleButtonCloseCommentModal = () => {
    setVisibleModal(false);
  };

  return (
    <Layout title={guitar.name}>
      <>
        <Product guitar={guitar} comments={comments}/>
        {
          isCommentsLoaded && comments.length ?
            <ReviewsList comments={comments} onClickButtonAddReview={handleButtonOpenCommentModal}/>
            : <p>Нет отзывов</p>
        }
        {
          isVisibleModal &&
          <ModalComments closeModal={handleButtonCloseCommentModal} title={guitar.name} id={guitar.id}/>
        }
      </>
    </Layout>
  );
}

export default ProductScreen;
