const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Apple Gift Cards</h3>
            <p className="text-gray-400 text-sm">
              Официальный реселлер подарочных карт Apple в России. 
              Мгновенная доставка кодов на email.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <a href="#cards" className="text-gray-400 text-sm hover:text-white transition-colors">
                  Карты
                </a>
              </li>
              <li>
                <a href="#how-to-use" className="text-gray-400 text-sm hover:text-white transition-colors">
                  Как использовать
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 text-sm hover:text-white transition-colors">
                  Вопросы и ответы
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Контакты</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">
                Email: support@applegiftcards.ru
              </li>
              <li className="text-gray-400 text-sm">
                Телефон: +7 (495) 123-45-67
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© {currentYear} Apple Gift Cards Russia. Все права защищены.</p>
          <p className="mt-2">
            Apple, логотип Apple, Apple Gift Cards являются товарными знаками Apple Inc., 
            зарегистрированными в США и других странах.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;