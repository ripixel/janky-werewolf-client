import * as React from 'react';

import DesktopLayout from './Desktop';
import MobileLayout from './Mobile';
import ViewController from '../Views/Controller';

export interface ILayoutProps {
  children: React.ReactNode;
}

export const Layout = (): JSX.Element => {
  const isMobile = Boolean(
    navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)
  );

  const Layout = isMobile ? MobileLayout : DesktopLayout;

  return (
    <Layout>
      <ViewController isMobile={isMobile} />
    </Layout>
  );
};

export default Layout;
