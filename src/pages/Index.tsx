import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Header } from '@/components/sections/Header';
import { PromoSlider } from '@/components/sections/PromoSlider';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { AboutSection } from '@/components/sections/AboutSection';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Скандинавский диван',
    price: 45990,
    image: 'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/34df5198-ce17-4460-bbd4-ea10b54fc910.jpg',
    category: 'Диваны'
  },
  {
    id: 2,
    name: 'Обеденный стол',
    price: 32990,
    image: 'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/54ee6c81-90cd-40c8-83ef-3e08fdce95c4.jpg',
    category: 'Столы'
  },
  {
    id: 3,
    name: 'Кресло велюр',
    price: 24990,
    image: 'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/e657cc27-17a3-43cc-9738-044980b45053.jpg',
    category: 'Кресла'
  },
  {
    id: 4,
    name: 'Модульный диван',
    price: 52990,
    image: 'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/34df5198-ce17-4460-bbd4-ea10b54fc910.jpg',
    category: 'Диваны'
  },
  {
    id: 5,
    name: 'Журнальный столик',
    price: 18990,
    image: 'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/54ee6c81-90cd-40c8-83ef-3e08fdce95c4.jpg',
    category: 'Столы'
  },
  {
    id: 6,
    name: 'Дизайнерское кресло',
    price: 29990,
    image: 'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/e657cc27-17a3-43cc-9738-044980b45053.jpg',
    category: 'Кресла'
  }
];

interface Story {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  gallery: string[];
}

const stories: Story[] = [
  {
    id: 1,
    title: 'Кухонный гарнитур',
    subtitle: 'функциональный',
    image: 'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/6adb0841-9b97-4834-91ae-99aa6cc2dd1d.jpg',
    description: 'Эргономичная кухня с продуманным расположением рабочих зон. Современная техника и вместительные системы хранения.',
    gallery: [
      'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/6adb0841-9b97-4834-91ae-99aa6cc2dd1d.jpg',
      'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/38483b66-2a42-45b5-9374-333ec8636aac.jpg',
      'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/fa681b9e-9dff-4ba0-8c40-57ffd390bfaf.jpg'
    ]
  },
  {
    id: 2,
    title: 'Шкафы и гардеробные системы',
    subtitle: 'вместительные',
    image: 'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/6feb2e9b-2fc7-436e-aeb1-978d960caf5f.jpg',
    description: 'Минималистичный домашний офис для максимальной концентрации. Эргономичная мебель и достаточное освещение.',
    gallery: [
      'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/6feb2e9b-2fc7-436e-aeb1-978d960caf5f.jpg',
      'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/ad1459a2-41a8-46ae-ab8b-614d2b20fc15.jpg',
      'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/42b2eb59-ad71-4307-80ed-47ccb266128b.jpg'
    ]
  },
  {
    id: 3,
    title: 'Детская комната',
    subtitle: 'уютная',
    image: 'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/4208e114-ffdc-4558-8eba-59234eeb47ed.jpg',
    description: 'Современный дизайн гостиной с акцентом на комфорт и функциональность. Натуральные материалы и светлые тона создают уютную атмосферу.',
    gallery: [
      'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/4208e114-ffdc-4558-8eba-59234eeb47ed.jpg',
      'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/f359dffc-e9df-4c3b-8b5d-f871c009eba2.jpg',
      'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/e28f76be-d1d6-4e11-847e-6cb48c34ead9.jpg'
    ]
  },
  {
    id: 4,
    title: 'Мягкая мебель',
    subtitle: 'комфортная',
    image: 'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/5887df7f-45d9-43f3-b744-9f6ae0a483a0.jpg',
    description: 'Спокойная спальня в нейтральных тонах. Мягкое освещение и качественный текстиль для идеального отдыха.',
    gallery: [
      'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/5887df7f-45d9-43f3-b744-9f6ae0a483a0.jpg',
      'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/4ccf0b9c-2db0-4dbd-8e32-e9d0c382a367.jpg',
      'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/b9ee5a97-d10e-42d5-8f18-2cdb4ed0996d.jpg'
    ]
  }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        cart={cart}
        totalItems={totalItems}
        totalPrice={totalPrice}
        scrollToSection={scrollToSection}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />

      <main className="pt-20">
        <section id="home" className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-primary/20 to-secondary/20">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Мебель вашей мечты
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Создаём уют в каждом доме с 2015 года
            </p>
            <Button size="lg" onClick={() => scrollToSection('catalog')} className="text-lg px-8">
              Смотреть каталог
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>
        </section>

        <PromoSlider scrollToSection={scrollToSection} />

        <ProjectsSection stories={stories} setSelectedStory={setSelectedStory} />

        <AboutSection />

        <section id="delivery" className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-center mb-12">Доставка и оплата</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Truck" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Доставка</h3>
                    <p className="text-muted-foreground mb-4">
                      Бесплатная доставка по городу при заказе от 10 000 ₽. Доставка в регионы рассчитывается индивидуально.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={16} className="text-primary" />
                        Доставка по городу 1-2 дня
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={16} className="text-primary" />
                        Подъём на этаж включен
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={16} className="text-primary" />
                        Сборка мебели
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
              <Card className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="CreditCard" size={24} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Оплата</h3>
                    <p className="text-muted-foreground mb-4">
                      Принимаем любые формы оплаты: наличные, карты, безналичный расчёт для юридических лиц.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={16} className="text-secondary" />
                        Оплата при получении
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={16} className="text-secondary" />
                        Банковские карты
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={16} className="text-secondary" />
                        Безналичный расчёт
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section id="contacts" className="py-16 px-4">
          <div className="container mx-auto max-w-2xl">
            <h2 className="text-4xl font-bold text-center mb-12">Контакты</h2>
            <Card className="p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Адрес</h3>
                    <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 123</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Телефон</h3>
                    <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Mail" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">info@mebel-plus.ru</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Clock" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Режим работы</h3>
                    <p className="text-muted-foreground">Пн-Вс: 10:00 - 20:00</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Button className="w-full" size="lg">
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  Написать в WhatsApp
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>

      {selectedStory && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedStory(null)}
        >
          <div
            className="bg-background rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-auto animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-background/95 backdrop-blur-md border-b p-4 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold">{selectedStory.title}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedStory(null)}
              >
                <Icon name="X" size={24} />
              </Button>
            </div>
            <div className="p-6 space-y-6">
              <p className="text-lg text-muted-foreground">{selectedStory.description}</p>
              <div className="grid gap-4">
                {selectedStory.gallery.map((image, idx) => (
                  <img
                    key={idx}
                    src={image}
                    alt={`${selectedStory.title} ${idx + 1}`}
                    className="w-full rounded-2xl"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-muted/50 py-8 px-4 mt-16">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2024 МЕБЕЛЬ+. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
