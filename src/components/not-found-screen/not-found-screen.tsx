import {Link} from 'react-router-dom';
import Layout from '../layout/layout';
import {AppRoute} from '../../const';

function NotFoundScreen(): JSX.Element {
  return (
    <Layout>
      <>
        <h1>404</h1>
        <Link to={AppRoute.Root}>На главную страницу</Link>
      </>
    </Layout>
  );
}
export default NotFoundScreen;
