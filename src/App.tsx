import CssBaseline from '@mui/material/CssBaseline';

import { AppTheme } from './theme/AppTheme';
import { Footer } from './components/Footer';
import { AppAppBar } from './components/AppAppBar';

import { Calculator } from './components/calculator/Calculator';
import { StoreProvider } from './components/StoreProvider';

export default function App(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <StoreProvider>
        <CssBaseline enableColorScheme />
        <AppAppBar />
        <Calculator />
        <br />
        <Footer />
      </StoreProvider>
    </AppTheme>
  );
}
