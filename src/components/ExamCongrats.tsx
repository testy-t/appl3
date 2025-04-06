import { useEffect, useState } from 'react';

const ExamCongrats = () => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    // Запускаем анимацию после монтирования компонента
    setAnimate(true);
    
    // Создаем эффект конфетти
    const confettiInterval = setInterval(() => {
      createConfetti();
    }, 300);
    
    return () => clearInterval(confettiInterval);
  }, []);
  
  const createConfetti = () => {
    const confettiContainer = document.getElementById('confetti-container');
    if (!confettiContainer) return;
    
    const confetti = document.createElement('div');
    const colors = ['#FFD700', '#FF6347', '#7B68EE', '#3CB371', '#FF69B4'];
    
    confetti.className = 'absolute w-3 h-3 rounded-full';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '0';
    confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
    
    confettiContainer.appendChild(confetti);
    
    // Удаляем конфетти после анимации
    setTimeout(() => {
      confetti.remove();
    }, 5000);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-4 relative overflow-hidden">
      <div id="confetti-container" className="absolute inset-0 pointer-events-none" />
      
      <div 
        className={`relative max-w-3xl w-full mx-auto bg-white bg-opacity-20 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden transition-all duration-1000 ${
          animate ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        }`}
      >
        {/* Фон с переливающимся эффектом */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 opacity-30 animate-gradient"></div>
        
        <div className="relative z-10 p-6 md:p-8">
          {/* Заголовок */}
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-white drop-shadow-lg animate-pulse">
            Машуха, удачи на экзаменах!
          </h1>
          
          {/* Изображение */}
          <div className="relative mx-auto w-full max-w-md h-64 md:h-80 mb-6 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 animate-shimmer rounded-lg"></div>
            <img 
              src="https://cdn.poehali.dev/files/b7b9a11b-1064-4f1f-87c3-eae2818cf36b.jpg" 
              alt="Машуха в Москве" 
              className="absolute inset-0 w-full h-full object-cover object-center rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
          
          {/* Текст пожелания */}
          <div className="bg-white bg-opacity-25 backdrop-blur-sm p-5 rounded-lg shadow-lg border border-white border-opacity-40">
            <p className="text-xl md:text-2xl text-white font-medium text-center leading-relaxed">
              Пусть все экзамены сдаются <span className="font-bold text-yellow-300 animate-bounce inline-block">с кайфом</span> и на высшие баллы!
            </p>
            <p className="mt-4 text-lg text-white text-center">
              Москва уже ждет тебя! 🏙️✨ Гимназия скоро распахнет свои двери!
            </p>
            <div className="mt-6 flex justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                Ты справишься! 💪
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamCongrats;
