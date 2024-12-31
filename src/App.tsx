import Divider from '@mui/material/Divider';
import CssBaseline from '@mui/material/CssBaseline';

import FAQ from './components/FAQ';
import Hero from './components/Hero';

import Footer from './components/Footer';
import Pricing from './components/Pricing';

import Features from './components/Features';
import AppAppBar from './components/AppAppBar';

// import Highlights from './components/Highlights';
// import Testimonials from './components/Testimonials';
import LogoCollection from './components/LogoCollection';

import AppTheme from './theme/AppTheme';

import { StoreProvider } from './components/StoreProvider';

export default function MarketingPage(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <StoreProvider>
        <CssBaseline enableColorScheme />
        <AppAppBar />
        <Hero />
        <div>
          <LogoCollection />
          <Features />
          {/* <Divider />
        <Testimonials /> */}
          <Divider />
          {/* <Highlights /> */}
          <Divider />
          <Pricing />
          <Divider />
          <FAQ />
          <Divider />
          <Footer />
        </div>
      </StoreProvider>
    </AppTheme>
  );
}
