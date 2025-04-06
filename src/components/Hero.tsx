import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="bg-apple-gray py-20 md:py-32 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-semibold mb-4 text-apple-dark">
          Apple Gift Card
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-apple-text max-w-3xl mx-auto">
          Один подарок. Множество возможностей. Используйте для покупок в App Store, подписок Apple и многого другого.
        </p>
        <Button
          className="bg-apple-blue hover:bg-opacity-90 rounded-full px-8 py-3 font-medium text-white"
          onClick={() => document.getElementById('cards')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Выбрать карту
        </Button>
      </div>
    </section>
  );
};

export default Hero;