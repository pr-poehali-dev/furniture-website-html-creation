import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export const AboutSection = () => {
  return (
    <section id="about" className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-8">О нас</h2>
        
        <div className="text-center mb-12 space-y-4">
          <h3 className="text-2xl font-semibold text-primary">
            Мы создаем комфорт с 2015 года
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            За это время были реализованы самые невероятные дизайнерские задумки и необычные идеи самих клиентов.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Производство заточено под изготовление штучных индивидуальных изделий. Поэтому мы можем произвести вашу мебель, в короткие сроки.
          </p>
        </div>

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
  );
};
