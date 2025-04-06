import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqItems = [
    {
      question: "Как долго действителен код Apple Gift Card?",
      answer: "Код Apple Gift Card не имеет срока действия и может быть использован в любое время после приобретения."
    },
    {
      question: "Можно ли использовать карту для оплаты в российском App Store?",
      answer: "Да, наши Apple Gift Cards полностью совместимы с российским App Store и могут быть использованы для пополнения баланса вашего Apple ID в России."
    },
    {
      question: "Как быстро я получу код после оплаты?",
      answer: "Код будет отправлен на указанный вами email сразу после подтверждения оплаты, обычно это занимает не более 5 минут."
    },
    {
      question: "Можно ли вернуть или обменять карту?",
      answer: "К сожалению, Apple Gift Cards не подлежат возврату или обмену после приобретения, согласно политике Apple."
    },
    {
      question: "На что можно потратить средства с Apple Gift Card?",
      answer: "Средства можно использовать для покупок в App Store, iTunes Store, подписок Apple Music, Apple TV+, Apple Arcade, iCloud+, покупок в Apple Books и многого другого."
    },
    {
      question: "Безопасно ли покупать Apple Gift Cards на вашем сайте?",
      answer: "Да, мы являемся официальным реселлером и гарантируем подлинность всех продаваемых кодов. Ваши платежные данные защищены надежным шифрованием."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-apple-dark">
          Часто задаваемые вопросы
        </h2>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-apple-dark">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-apple-text">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;