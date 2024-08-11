import GlobalWrapper from '@/app/components/GlobalWrapper/GlobalWrapper';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <GlobalWrapper>{children}</GlobalWrapper>;
};

export default Layout;
