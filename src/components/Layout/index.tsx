import * as React from 'react';

import DesktopLayout from './Desktop';
import MobileLayout from './Mobile';

export interface ILayoutProps {
  children: React.ReactNode;
}

export const Layout = (): JSX.Element => {
  const isMobile = navigator.userAgent.match(
    /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
  );

  const Layout = isMobile ? MobileLayout : DesktopLayout;

  return (
    <Layout>
      <p>Here is where the ViewController will go</p>
    </Layout>
  );
};

export default Layout;
