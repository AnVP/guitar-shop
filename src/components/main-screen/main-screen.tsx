import Layout from '../layout/layout';
import Catalog from '../catalog/catalog';
import {NameLinks} from '../../const';

function MainScreen(): JSX.Element  {

  return (
    <Layout title={NameLinks.Catalog}>
      <Catalog/>
    </Layout>
  );
}

export default MainScreen;
