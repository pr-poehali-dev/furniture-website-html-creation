import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface PromoSliderProps {
  scrollToSection: (sectionId: string) => void;
}

export const PromoSlider = ({ scrollToSection }: PromoSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const promoSlides = [
    {
      id: 1,
      title: 'Скидка до 30%',
      subtitle: 'На всю коллекцию диванов',
      description: 'Успейте купить мебель мечты по специальной цене',
      image: 'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/34df5198-ce17-4460-bbd4-ea10b54fc910.jpg',
      bgColor: 'from-blue-600 to-purple-600'
    },
    {
      id: 2,
      title: 'Бесплатная доставка',
      subtitle: 'При покупке от 50 000 ₽',
      description: 'Привезём и соберём в удобное для вас время',
      image: 'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/54ee6c81-90cd-40c8-83ef-3e08fdce95c4.jpg',
      bgColor: 'from-emerald-600 to-teal-600'
    },
    {
      id: 3,
      title: 'Новая коллекция 2024',
      subtitle: 'Эксклюзивные модели',
      description: 'Современный дизайн от европейских брендов',
      image: 'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/e657cc27-17a3-43cc-9738-044980b45053.jpg',
      bgColor: 'from-orange-600 to-red-600'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [promoSlides.length]);

  return (
    <section id="catalog" className="py-16 px-4 overflow-hidden">
      <div className="container mx-auto">
        <div className="relative h-[500px] rounded-3xl overflow-hidden">
          {promoSlides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                idx === currentSlide 
                  ? 'opacity-100 translate-x-0' 
                  : idx < currentSlide 
                  ? 'opacity-0 -translate-x-full' 
                  : 'opacity-0 translate-x-full'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor}`}>
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover mix-blend-overlay opacity-50"
                />
              </div>
              <div className="relative h-full flex items-center">
                <div className="container mx-auto px-8 md:px-16">
                  <div className="max-w-2xl text-white">
                    <h2 className="text-6xl md:text-7xl font-bold mb-4 animate-fade-in">
                      {slide.title}
                    </h2>
                    <p className="text-2xl md:text-3xl font-semibold mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                      {slide.subtitle}
                    </p>
                    <p className="text-lg md:text-xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                      {slide.description}
                    </p>
                    <Button 
                      size="lg" 
                      className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 animate-fade-in"
                      style={{ animationDelay: '0.6s' }}
                      onClick={() => scrollToSection('contact')}
                    >
                      Узнать подробнее
                      <Icon name="ArrowRight" size={20} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {promoSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide 
                    ? 'w-12 bg-white' 
                    : 'w-2 bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Перейти к слайду ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + promoSlides.length) % promoSlides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-10"
            aria-label="Предыдущий слайд"
          >
            <Icon name="ChevronLeft" size={24} className="text-white" />
          </button>

          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % promoSlides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-10"
            aria-label="Следующий слайд"
          >
            <Icon name="ChevronRight" size={24} className="text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};
