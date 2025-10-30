import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

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
}

const stories: Story[] = [
  {
    id: 1,
    title: 'Гостиная',
    subtitle: 'Уют и стиль',
    image: 'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/4208e114-ffdc-4558-8eba-59234eeb47ed.jpg'
  },
  {
    id: 2,
    title: 'Спальня',
    subtitle: 'Комфорт и гармония',
    image: 'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/5887df7f-45d9-43f3-b744-9f6ae0a483a0.jpg'
  },
  {
    id: 3,
    title: 'Кухня',
    subtitle: 'Функциональность',
    image: 'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/6adb0841-9b97-4834-91ae-99aa6cc2dd1d.jpg'
  },
  {
    id: 4,
    title: 'Кабинет',
    subtitle: 'Продуктивность',
    image: 'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/6feb2e9b-2fc7-436e-aeb1-978d960caf5f.jpg'
  }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');

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
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">МЕБЕЛЬ+</div>
            
            <nav className="hidden md:flex gap-8">
              {['Главная', 'Каталог', 'О нас', 'Доставка', 'Контакты'].map((item, idx) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(['home', 'catalog', 'about', 'delivery', 'contacts'][idx])}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {item}
                </button>
              ))}
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map(item => (
                        <div key={item.id} className="flex gap-4 pb-4 border-b">
                          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.price.toLocaleString('ru-RU')} ₽</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-6 w-6"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <Icon name="Minus" size={12} />
                              </Button>
                              <span className="text-sm w-8 text-center">{item.quantity}</span>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-6 w-6"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <Icon name="Plus" size={12} />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-6 w-6 ml-auto"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Icon name="Trash2" size={12} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold">Итого:</span>
                          <span className="text-2xl font-bold text-primary">
                            {totalPrice.toLocaleString('ru-RU')} ₽
                          </span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section id="home" className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Мебель вашей мечты
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Современный дизайн, качественные материалы и доступные цены
            </p>
            <Button size="lg" className="text-lg px-8" onClick={() => scrollToSection('catalog')}>
              Смотреть каталог
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Популярные товары</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <Card
                key={product.id}
                className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 right-4">{product.category}</Badge>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      {product.price.toLocaleString('ru-RU')} ₽
                    </span>
                    <Button onClick={() => addToCart(product)}>
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      В корзину
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 overflow-hidden">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Наши проекты</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {stories.map((story, idx) => (
              <div
                key={story.id}
                className="relative flex-shrink-0 w-[280px] h-[480px] rounded-3xl overflow-hidden cursor-pointer group snap-start animate-fade-in"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">{story.title}</h3>
                  <p className="text-sm opacity-90">{story.subtitle}</p>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icon name="ArrowRight" size={20} className="text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">О нас</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Award" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Качество</h3>
              <p className="text-muted-foreground">Только проверенные производители и материалы</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Truck" size={32} className="text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Доставка</h3>
              <p className="text-muted-foreground">Бесплатная доставка по городу от 10 000 ₽</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Гарантия</h3>
              <p className="text-muted-foreground">2 года гарантии на всю мебель</p>
            </Card>
          </div>
        </div>
      </section>

      <section id="delivery" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Доставка и оплата</h2>
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="MapPin" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Зоны доставки</h3>
                  <p className="text-muted-foreground">
                    Доставляем по Москве и Московской области. Бесплатная доставка при заказе от 10 000 ₽.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="Clock" size={24} className="text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Сроки доставки</h3>
                  <p className="text-muted-foreground">
                    Стандартная доставка: 3-5 рабочих дней. Срочная доставка: 1-2 дня (за дополнительную плату).
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="CreditCard" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Способы оплаты</h3>
                  <p className="text-muted-foreground">
                    Оплата картой онлайн, наличными при получении, банковский перевод.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Контакты</h2>
          <Card className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Icon name="Phone" size={20} className="text-primary" />
                  <span>+7 (495) 123-45-67</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Mail" size={20} className="text-primary" />
                  <span>info@mebel-plus.ru</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="MapPin" size={20} className="text-primary" />
                  <span>г. Москва, ул. Примерная, д. 1</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Clock" size={20} className="text-primary" />
                  <span>Пн-Вс: 10:00 - 21:00</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Напишите нам</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <textarea
                    placeholder="Сообщение"
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button className="w-full">Отправить</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <footer className="bg-foreground text-background py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">© 2024 МЕБЕЛЬ+. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;