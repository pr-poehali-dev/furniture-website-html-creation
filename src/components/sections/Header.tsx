import { Button } from '@/components/ui/button';
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

interface HeaderProps {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
  scrollToSection: (sectionId: string) => void;
  updateQuantity: (productId: number, delta: number) => void;
  removeFromCart: (productId: number) => void;
}

export const Header = ({ 
  cart, 
  totalItems, 
  totalPrice, 
  scrollToSection, 
  updateQuantity, 
  removeFromCart 
}: HeaderProps) => {
  return (
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
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
                ) : (
                  <>
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
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
                            <span className="text-sm font-medium">{item.quantity}</span>
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
                              <Icon name="X" size={12} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="pt-4 space-y-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Итого:</span>
                        <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
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
  );
};
