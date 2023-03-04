import { Link } from '@mui/material';
import AppHeader from './../components/AppHeader';

export default function Home() {
  return <AppHeader />;
}

/** @type {import('@mui/material').SxProps} */
const styles = {
  container: {
    display: 'flex',
    bgcolor: 'neutral.light',
    height: 'calc( 100% - 64px )',
  },
  mainSection: {
    p: 1,
    width: '100%',
    height: '100%',
    overflow: 'auto',
  },
};
