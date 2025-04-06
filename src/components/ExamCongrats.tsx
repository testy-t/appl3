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
    
    // Создаем эффект плавающих надписей (реже - каждые 3 секунды)
    const floatingTextInterval = setInterval(() => {
      createFloatingText();
    }, 3000);
    
    return () => {
      clearInterval(confettiInterval);
      clearInterval(floatingTextInterval);
    };
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
  
  const createFloatingText = () => {
    const container = document.getElementById('floating-text-container');
    if (!container) return;
    
    const texts = [
      'Москва уже ждет тебя! 🏙️✨', 
      'Гимназия скоро распахнет свои двери!', 
      'Ты справишься! 💪',
      'Поступление будет легким! 🚀',
      'Все экзамены на отлично! 🎯',
      'Удачи тебе! 🍀',
      'Верим в твой успех! 🌟',
      'Твои знания — твоя сила! 📚',
      'Экзамены — это лишь ступенька к мечте! 🪜',
      'Главное — спокойствие и уверенность! 🧘‍♀️',
      'Мы в тебя верим! ❤️',
      'Москва ждёт новую звезду! ⭐',
      'Собранность и знания победят! 🏆',
      'Гимназия — твоё будущее! 🏫',
      'Каждый экзамен — шаг к цели! 👣'
    ];
    
    const floatingText = document.createElement('div');
    
    // Случайный выбор текста
    const textContent = texts[Math.floor(Math.random() * texts.length)];
    floatingText.textContent = textContent;
    
    // Ограничиваем позицию появления, чтобы не залезать на центральную часть с фотографией
    // Создаем 4 зоны: верхняя, нижняя, левая и правая области экрана
    let startX, startY;
    
    const zone = Math.floor(Math.random() * 4); // 0-3: верх, право, низ, лево
    
    if (zone === 0) { // верхняя зона
      startX = Math.random() * 90;
      startY = Math.random() * 20;
    } else if (zone === 1) { // правая зона
      startX = 70 + Math.random() * 25;
      startY = 20 + Math.random() * 60;
    } else if (zone === 2) { // нижняя зона
      startX = Math.random() * 90;
      startY = 80 + Math.random() * 15;
    } else { // левая зона
      startX = Math.random() * 25;
      startY = 20 + Math.random() * 60;
    }
    
    // Случайное конечное положение (ограниченное в той же зоне)
    let endX, endY;
    
    if (zone === 0) {
      endX = startX + (Math.random() * 30 - 15);
      endY = startY + Math.random() * 10;
    } else if (zone === 1) {
      endX = startX - Math.random() * 10;
      endY = startY + (Math.random() * 30 - 15);
    } else if (zone === 2) {
      endX = startX + (Math.random() * 30 - 15);
      endY = startY - Math.random() * 10;
    } else {
      endX = startX + Math.random() * 10;
      endY = startY + (Math.random() * 30 - 15);
    }
    
    // Случайный фоновый цвет
    const hue = Math.floor(Math.random() * 360);
    const bgColor = `hsla(${hue}, 80%, 60%, 0.4)`;
    
    // Случайный размер шрифта (увеличенный)
    const fontSize = Math.floor(Math.random() * 10) + 22; // 22px - 32px
    
    floatingText.className = 'floating-text';
    floatingText.style.left = `${startX}%`;
    floatingText.style.top = `${startY}%`;
    floatingText.style.setProperty('--tx-start', `${0}px`);
    floatingText.style.setProperty('--ty-start', `${0}px`);
    floatingText.style.setProperty('--tx-end', `${endX - startX}vw`);
    floatingText.style.setProperty('--ty-end', `${endY - startY}vh`);
    floatingText.style.backgroundColor = bgColor;
    floatingText.style.fontSize = `${fontSize}px`;
    
    container.appendChild(floatingText);
    
    // Удаляем надпись после анимации
    setTimeout(() => {
      floatingText.remove();
    }, 7000);
  };
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-4 relative overflow-hidden">
      <div id="confetti-container" className="fixed inset-0 pointer-events-none" />
      
      <div 
        className={`relative max-w-4xl w-full mx-auto bg-black/30 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden transition-all duration-1000 ${
          animate ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        }`}
      >
        {/* Фон с переливающимся эффектом */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/50 via-purple-500/50 to-indigo-500/50 opacity-70 animate-gradient"></div>
        
        <div className="relative z-10 p-6 md:p-8">
          {/* Заголовок */}
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-6 text-white drop-shadow-lg animate-pulse">
            Машуха, удачи на экзаменах!
          </h1>
          
          {/* Изображение (увеличенное и с фильтрами) */}
          <div className="relative mx-auto w-full max-w-2xl h-80 md:h-96 mb-6 rounded-lg overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 animate-shimmer rounded-lg"></div>
            <img 
              src="https://cdn.poehali.dev/files/b7b9a11b-1064-4f1f-87c3-eae2818cf36b.jpg" 
              alt="Машуха в Москве" 
              className="absolute inset-0 w-full h-full object-cover object-center rounded-lg"
              style={{ filter: 'brightness(1.3) contrast(1.1)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
          
          {/* Текст пожелания */}
          <div className="bg-black/40 p-5 rounded-lg shadow-lg border border-white/20">
            <p className="text-xl md:text-2xl text-white font-medium text-center leading-relaxed drop-shadow-md">
              Пусть все экзамены сдаются <span className="font-bold text-yellow-300 animate-bounce inline-block">с кайфом</span> и на высшие баллы!
            </p>
          </div>
        </div>
      </div>
      
      {/* Плавающие тексты поверх всего */}
      <div id="floating-text-container" className="fixed inset-0 pointer-events-none overflow-hidden z-50" />
    </div>
  );
};

export default ExamCongrats;
