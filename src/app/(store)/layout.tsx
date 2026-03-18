import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';

const StoreLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
};

export default StoreLayout;
