import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Navigation from '@/components/organisms/navigation';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 1,
          py: 1,
          px: 3,
        }}
      >
        <Link href="/">
          <img src="/img/icon.png" alt="" width={40} height={40} />
        </Link>
        <Navigation />
      </Box>
      <Component {...pageProps} />
    </>
  );
};
export default App;
