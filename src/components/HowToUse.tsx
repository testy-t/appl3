import { Card, CardContent } from "@/components/ui/card";

const HowToUse = () => {
  const steps = [
    {
      id: 1,
      title: "Выберите и купите",
      description: "Выберите номинал карты и оформите заказ. Вы получите код на указанный вами email.",
      emoji: "🛒",
    },
    {
      id: 2,
      title: "Активируйте код",
      description: "Войдите в свой Apple ID и введите полученный код в разделе «Пополнить баланс».",
      emoji: "🔑",
    },
    {
      id: 3,
      title: "Используйте баланс",
      description: "Используйте средства для покупок в App Store, подписок Apple Music, iCloud+ и многого другого.",
      emoji: "🎮",
    },
  ];

  return (
    <section id="how-to-use" className="py-16 md:py-24 bg-apple-gray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4 text-apple-dark">
          Как использовать Apple Gift Card
        </h2>
        <p className="text-xl text-apple-text text-center max-w-3xl mx-auto mb-12">
          Всего три простых шага, чтобы начать пользоваться сервисами Apple
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <Card key={step.id} className="border-none shadow-sm">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">{step.emoji}</div>
                <h3 className="text-xl font-medium mb-3 text-apple-dark">
                  {step.title}
                </h3>
                <p className="text-apple-text">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToUse;