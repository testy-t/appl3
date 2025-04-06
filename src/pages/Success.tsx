import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Success = () => {
  const navigate = useNavigate();
  const orderCompleted = localStorage.getItem("orderCompleted") === "true";
  
  // Генерация случайного кода карты
  const generateCardCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 16; i++) {
      if (i > 0 && i % 4 === 0) code += "-";
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };
  
  const cardCode = generateCardCode();
  
  useEffect(() => {
    // Если пользователь перешел на страницу напрямую без оформления заказа
    if (!orderCompleted) {
      navigate("/");
    }
    
    // Очистка состояния заказа при размонтировании компонента
    return () => {
      localStorage.removeItem("orderCompleted");
    };
  }, [orderCompleted, navigate]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cardCode);
    alert("Код скопирован в буфер обмена!");
  };

  if (!orderCompleted) {
    return null; // Будет перенаправлено на главную страницу
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-12 px-4">
        <div className="max-w-lg mx-auto">
          <Card className="border-none shadow-md">
            <CardContent className="pt-8 text-center">
              <div className="mb-6 flex justify-center">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              
              <h1 className="text-2xl font-semibold mb-2 text-apple-dark">
                Заказ успешно оплачен!
              </h1>
              
              <p className="text-apple-text mb-8">
                Ваш код Apple Gift Card готов к использованию
              </p>
              
              <div className="bg-secondary p-4 rounded-md mb-6">
                <div className="flex items-center justify-between">
                  <div className="text-xl font-mono tracking-wider">{cardCode}</div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={copyToClipboard}
                    className="h-8 w-8"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="text-left bg-blue-50 p-4 rounded-md mb-8">
                <h3 className="font-medium text-blue-800 mb-2">Инструкция по активации:</h3>
                <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1">
                  <li>Откройте App Store на своем устройстве Apple</li>
                  <li>Нажмите на свою учетную запись в правом верхнем углу</li>
                  <li>Выберите "Пополнить счет"</li>
                  <li>Введите или вставьте код, указанный выше</li>
                  <li>Нажмите "Погасить"</li>
                </ol>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => navigate("/")}
                  className="flex-1 bg-apple-blue hover:bg-opacity-90"
                >
                  Вернуться на главную
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => window.open("https://support.apple.com/ru-ru/HT201209", "_blank")}
                >
                  Поддержка Apple
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Success;