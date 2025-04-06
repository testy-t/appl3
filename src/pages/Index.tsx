import Header from "@/components/Header";
import Hero from "@/components/Hero";
import GiftCardList from "@/components/GiftCardList";
import HowToUse from "@/components/HowToUse";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <GiftCardList />
        <HowToUse />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;