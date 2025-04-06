import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import ErrorDialog from "@/components/ErrorDialog";

interface GiftCard {
  id: number;
  value: number;
  discount: number;
  imageSrc: string;
}

const GiftCardList = () => {
  const navigate = useNavigate();
  const giftCards: GiftCard[] = [
    { id: 1, value: 1000, discount: 5, imageSrc: "/placeholder.svg" },
    { id: 2, value: 2500, discount: 7, imageSrc: "/placeholder.svg" },
    { id: 3, value: 5000, discount: 10, imageSrc: "/placeholder.svg" },
    { id: 4, value: 10000, discount: 15, imageSrc: "/placeholder.svg" },
  ];

  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [error, setError] = useState<{show: boolean; code: string; message: string}>({
    show: false,
    code: "",
    message: ""
  });

  const handlePurchase = () => {
    if (selectedCard !== null) {
      // Сохраняем выбранную карту в localStorage для использования на странице оформления заказа
      localStorage.setItem("selectedCard", JSON.stringify(giftCards[selectedCard]));
      navigate("/checkout");
    }
  };

  const handleSelectCard = (index: number) => {
    try {
      // Вызываем тестовую JavaScript ошибку при нажатии на кнопку
      throw new Error("Тестовая ошибка при выборе карты");
      
      // Этот код никогда не выполнится из-за ошибки выше
      // setSelectedCard(index);
    } catch (err) {
      // Перехватываем ошибку и показываем диалог вместо краша страницы
      const error = err as Error;
      setError({
        show: true,
        code: "SELECT_CARD_ERROR",
        message: error.message
      });
    }
  };

  const handleErrorClose = () => {
    setError({
      show: false,
      code: "",
      message: ""
    });
  };

  return (
    <section id="cards" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-apple-dark">
          Выберите номинал карты
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {giftCards.map((card, index) => (
            <Card 
              key={card.id}
              className={`overflow-hidden transition-all duration-300 ${
                selectedCard === index 
                  ? "ring-2 ring-apple-blue scale-105" 
                  : "hover:shadow-lg"
              }`}
              onClick={() => setSelectedCard(index)}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={card.imageSrc} 
                    alt={`Apple Gift Card ${card.value} ₽`}
                    className="w-full h-48 object-cover"
                  />
                  {selectedCard === index && (
                    <div className="absolute top-2 right-2 bg-apple-blue text-white p-1 rounded-full">
                      <Check size={16} />
                    </div>
                  )}
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-medium mb-2">
                    {card.value.toLocaleString()} ₽
                  </h3>
                  <p className="text-apple-text mb-4">
                    Скидка {card.discount}%
                  </p>
                  <p className="text-xl font-semibold text-apple-dark mb-4">
                    {Math.round(card.value * (1 - card.discount / 100)).toLocaleString()} ₽
                  </p>
                  <Button
                    className={`w-full ${
                      selectedCard === index 
                        ? "bg-apple-blue hover:bg-opacity-90" 
                        : "bg-secondary hover:bg-secondary/80 text-apple-dark"
                    }`}
                    onClick={() => handleSelectCard(index)}
                  >
                    {selectedCard === index ? "Выбрано" : "Выбрать"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {selectedCard !== null && (
          <div className="mt-12 text-center">
            <Button 
              className="bg-apple-blue hover:bg-opacity-90 rounded-full px-10 py-6 font-medium text-lg"
              onClick={handlePurchase}
            >
              Оформить заказ
            </Button>
          </div>
        )}
      </div>

      {/* Диалог с ошибкой */}
      <ErrorDialog 
        open={error.show}
        onClose={handleErrorClose}
        errorCode={error.code}
        errorMessage={error.message}
      />
    </section>
  );
};

export default GiftCardList;