import Navigation from '@/components/organisms/navigation';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <Component {...pageProps} />
    </>
  );
};
export default App;
