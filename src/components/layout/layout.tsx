import Header from '../header/header';
import Footer from '../footer/footer';

type LayoutProps = {
  children: JSX.Element;
  title?: string;
}

function Layout({children, title}: LayoutProps): JSX.Element  {

  return (
    <div className="wrapper">
      <Header activeLink={title}/>
      <main className="page-content">
        <div className="container">
          {children}
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default Layout;
