import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, Mail, ChevronLeft, Check } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email("Введите корректный email"),
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  paymentMethod: z.enum(["card", "qiwi", "yoomoney"]),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Checkout = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Получаем данные из localStorage или используем значения по умолчанию
  const selectedCard = JSON.parse(localStorage.getItem("selectedCard") || "null");
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      paymentMethod: "card",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
    },
  });

  const watchPaymentMethod = form.watch("paymentMethod");

  const onSubmit = (data: FormValues) => {
    setIsProcessing(true);
    
    // Имитация обработки заказа
    setTimeout(() => {
      setIsProcessing(false);
      localStorage.setItem("orderCompleted", "true");
      navigate("/success");
    }, 2000);
  };

  if (!selectedCard) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="mb-4">Вы не выбрали карту для покупки</p>
                <Button onClick={() => navigate("/")} className="bg-apple-blue">
                  Вернуться к выбору карт
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6 flex items-center gap-1 text-apple-text"
            onClick={() => navigate("/")}
          >
            <ChevronLeft size={16} /> Вернуться к выбору карт
          </Button>
          
          <h1 className="text-3xl font-semibold mb-8 text-apple-dark">Оформление заказа</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Mail size={18} />
                        Контактная информация
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="example@mail.ru" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Имя</FormLabel>
                            <FormControl>
                              <Input placeholder="Иван Иванов" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <CreditCard size={18} />
                        Способ оплаты
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-secondary">
                                  <RadioGroupItem value="card" id="card" />
                                  <Label htmlFor="card" className="flex-1 cursor-pointer">Банковская карта</Label>
                                </div>
                                <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-secondary">
                                  <RadioGroupItem value="qiwi" id="qiwi" />
                                  <Label htmlFor="qiwi" className="flex-1 cursor-pointer">QIWI Кошелек</Label>
                                </div>
                                <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-secondary">
                                  <RadioGroupItem value="yoomoney" id="yoomoney" />
                                  <Label htmlFor="yoomoney" className="flex-1 cursor-pointer">ЮMoney</Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {watchPaymentMethod === "card" && (
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Номер карты</FormLabel>
                                <FormControl>
                                  <Input placeholder="0000 0000 0000 0000" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="cardExpiry"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Срок действия</FormLabel>
                                  <FormControl>
                                    <Input placeholder="MM/ГГ" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="cardCvc"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>CVC/CVV</FormLabel>
                                  <FormControl>
                                    <Input placeholder="123" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Button 
                    type="submit" 
                    className="w-full py-6 text-lg font-medium bg-apple-blue hover:bg-opacity-90"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Обработка...
                      </span>
                    ) : (
                      'Оплатить заказ'
                    )}
                  </Button>
                </form>
              </Form>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Ваш заказ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-apple-text">Apple Gift Card</span>
                      <span className="font-medium">{selectedCard.value.toLocaleString()} ₽</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-apple-text">Скидка ({selectedCard.discount}%)</span>
                      <span className="font-medium text-red-500">
                        -{Math.round(selectedCard.value * selectedCard.discount / 100).toLocaleString()} ₽
                      </span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Итого</span>
                      <span className="text-xl font-semibold">
                        {Math.round(selectedCard.value * (1 - selectedCard.discount / 100)).toLocaleString()} ₽
                      </span>
                    </div>
                    
                    <div className="bg-green-50 p-3 rounded-md flex items-start gap-2 mt-2">
                      <Check size={18} className="text-green-600 mt-0.5" />
                      <div className="text-sm text-green-800">
                        Код будет отправлен на ваш email сразу после оплаты
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;