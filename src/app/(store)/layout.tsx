import Footer from '@/components/shared/Footer';

const StoreLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main>
      {children}
      <Footer />
    </main>
  );
};

export default StoreLayout;
