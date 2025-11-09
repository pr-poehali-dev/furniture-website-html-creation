import { useState, useEffect, useRef } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface SortableGalleryItemProps {
  id: string;
  image: string;
  title: string;
  index: number;
  onDelete: () => void;
  onView: () => void;
}

const SortableGalleryItem = ({ id, image, title, index, onDelete, onView }: SortableGalleryItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="col-span-12 sm:col-span-6 lg:col-span-4 relative group"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-move"
      >
        <img
          src={image}
          alt={`${title} ${index + 1}`}
          className="w-full h-64 object-cover rounded-2xl"
          onClick={(e) => {
            e.stopPropagation();
            onView();
          }}
        />
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
        title="Удалить фото"
      >
        <Icon name="X" size={16} className="text-white" />
      </button>
      <div className="absolute top-2 left-2 w-8 h-8 bg-primary/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Icon name="Move" size={16} className="text-white" />
      </div>
    </div>
  );
};

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
    image: 'https://cdn.poehali.dev/files/b713c9b7-ef81-4ae7-8843-87f7b44b6aaf.png',
    description: 'Эргономичная кухня с продуманным расположением рабочих зон. Современная техника и вместительные системы хранения.',
    gallery: [
      'https://cdn.poehali.dev/files/b713c9b7-ef81-4ae7-8843-87f7b44b6aaf.png',
      'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/38483b66-2a42-45b5-9374-333ec8636aac.jpg',
      'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/fa681b9e-9dff-4ba0-8c40-57ffd390bfaf.jpg'
    ]
  },
  {
    id: 2,
    title: 'Шкафы и гардеробные системы',
    subtitle: 'вместительные',
    image: 'https://cdn.poehali.dev/files/53cf79e4-33a5-4198-990c-43182b267bbb.png',
    description: 'Минималистичный домашний офис для максимальной концентрации. Эргономичная мебель и достаточное освещение.',
    gallery: [
      'https://cdn.poehali.dev/files/53cf79e4-33a5-4198-990c-43182b267bbb.png',
      'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/ad1459a2-41a8-46ae-ab8b-614d2b20fc15.jpg',
      'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/42b2eb59-ad71-4307-80ed-47ccb266128b.jpg'
    ]
  },
  {
    id: 3,
    title: 'Детская комната',
    subtitle: 'уютная',
    image: 'https://cdn.poehali.dev/files/30ed0be3-b1e7-41c5-8d80-7d6920b4c270.png',
    description: 'Современный дизайн гостиной с акцентом на комфорт и функциональность. Натуральные материалы и светлые тона создают уютную атмосферу.',
    gallery: [
      'https://cdn.poehali.dev/files/30ed0be3-b1e7-41c5-8d80-7d6920b4c270.png',
      'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/f359dffc-e9df-4c3b-8b5d-f871c009eba2.jpg',
      'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/e28f76be-d1d6-4e11-847e-6cb48c34ead9.jpg'
    ]
  },
  {
    id: 4,
    title: 'Мягкая мебель',
    subtitle: 'комфортная',
    image: 'https://cdn.poehali.dev/files/5e979b24-4a17-497c-9aaa-7f8456f371e9.png',
    description: 'Спокойная спальня в нейтральных тонах. Мягкое освещение и качественный текстиль для идеального отдыха.',
    gallery: [
      'https://cdn.poehali.dev/files/5e979b24-4a17-497c-9aaa-7f8456f371e9.png',
      'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/4ccf0b9c-2db0-4dbd-8e32-e9d0c382a367.jpg',
      'https://cdn.poehali.dev/projects/1d2e3d0d-e9ac-43c9-866f-3f6d6d5fba60/files/b9ee5a97-d10e-42d5-8f18-2cdb4ed0996d.jpg'
    ]
  }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);
  const [projectStories, setProjectStories] = useState<Story[]>(stories);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id && selectedStory) {
      const oldIndex = selectedStory.gallery.findIndex((_, i) => `gallery-${i}` === active.id);
      const newIndex = selectedStory.gallery.findIndex((_, i) => `gallery-${i}` === over.id);
      
      const newGallery = arrayMove(selectedStory.gallery, oldIndex, newIndex);
      const updatedStory = { ...selectedStory, gallery: newGallery };
      
      setSelectedStory(updatedStory);
      setProjectStories(prev => prev.map(s => s.id === selectedStory.id ? updatedStory : s));
    }
  };

  const promoSlides = [
    {
      id: 1,
      title: 'Создаем атмосферу вашего дома',
      subtitle: 'индивидуально и под заказ',
      description: '',
      image: 'https://cdn.poehali.dev/files/417e765b-e421-4194-b040-cd433d5afb70.png',
      bgColor: 'from-black/40 to-black/40'
    },
    {
      id: 2,
      title: 'Новая коллекция 2025',
      subtitle: 'Эксклюзивные модели',
      description: '',
      image: 'https://cdn.poehali.dev/files/2cc28647-7196-48de-bfb7-e88c509e23ee.png',
      bgColor: 'from-black/40 to-black/40'
    },
    {
      id: 3,
      title: 'Скидка до 30%',
      subtitle: 'На всю мягкую коллекцию',
      description: 'Успейте купить мебель мечты по специальной цене',
      image: 'https://cdn.poehali.dev/files/c0821260-4db1-4dcc-aeaf-76fc5566c461.png',
      bgColor: 'from-black/40 to-black/40'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [promoSlides.length]);



  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-primary/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c3a1b] from-0% via-[#0c3a1b] via-20% to-background to-50%"></div>
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center justify-between">
            <div className="relative flex items-center">
              <img src="https://cdn.poehali.dev/files/f8197fb7-59b5-4272-ab12-b30b3a10386a.png" alt="TRIKC" className="h-24 w-auto relative z-10" />
            </div>
            
            <nav className="hidden md:flex gap-8">
              {['Главная', 'Наши проекты', 'О нас', 'Контакты'].map((item, idx) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(['home', 'projects', 'about', 'contacts'][idx])}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {item}
                </button>
              ))}
            </nav>

            <Button onClick={() => setIsQuoteFormOpen(true)} className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg hover:shadow-xl transition-all duration-300">
              <Icon name="Calculator" size={20} className="mr-2" />
              Отправить на просчет
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-24">
        <section id="home" className="relative h-[600px] overflow-hidden">
          <div className="absolute inset-0 flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {promoSlides.map((slide) => (
              <div key={slide.id} className="min-w-full h-full relative">
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-80`}></div>
                <div className="absolute inset-0 flex items-center justify-center text-white text-center px-4">
                  <div className="max-w-3xl animate-fade-in">
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">{slide.title}</h2>
                    <p className="text-2xl md:text-3xl mb-3 opacity-90">{slide.subtitle}</p>
                    <p className="text-lg md:text-xl opacity-80">{slide.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + promoSlides.length) % promoSlides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-10"
          >
            <Icon name="ChevronLeft" size={24} className="text-white" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % promoSlides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-10"
          >
            <Icon name="ChevronRight" size={24} className="text-white" />
          </button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {promoSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </section>

        <section id="projects" className="py-16 px-4 overflow-hidden">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Наши проекты</h2>
            <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto">
              {projectStories.map((story, idx) => (
                <div
                  key={story.id}
                  className="col-span-12 sm:col-span-6 lg:col-span-3 relative w-full h-[480px] rounded-3xl overflow-hidden group animate-fade-in"
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  <div className="relative w-full h-full cursor-pointer" onClick={() => setSelectedStory(story)}>
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <p className="text-sm opacity-90 mb-1">{story.subtitle}</p>
                      <h3 className="text-2xl font-bold">{story.title}</h3>
                    </div>
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Icon name="ArrowRight" size={20} className="text-white" />
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setProjectStories(prev => prev.filter(s => s.id !== story.id));
                    }}
                    className="absolute top-4 left-4 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    title="Удалить"
                  >
                    <Icon name="X" size={16} className="text-white" />
                  </button>
                </div>
              ))}
              <div className="col-span-12 sm:col-span-6 lg:col-span-3 relative w-full h-[480px] rounded-3xl border-2 border-dashed border-primary/30 hover:border-primary/60 transition-colors flex items-center justify-center cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                    <Icon name="Plus" size={32} className="text-primary" />
                  </div>
                  <p className="text-muted-foreground font-medium">Добавить проект</p>
                </div>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                files.forEach((file, idx) => {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const newStory: Story = {
                      id: Date.now() + idx,
                      title: `Новый проект ${projectStories.length + idx + 1}`,
                      subtitle: 'проект',
                      image: event.target?.result as string,
                      description: '',
                      gallery: [event.target?.result as string]
                    };
                    setProjectStories(prev => [...prev, newStory]);
                  };
                  reader.readAsDataURL(file);
                });
              }}
            />
          </div>
        </section>

        <section id="about" className="py-16 px-4 bg-muted/30">
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
              <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-card border-primary/20">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Award" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Качество</h3>
                <p className="text-muted-foreground">Только проверенные производители и материалы</p>
              </Card>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-card border-primary/20">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Truck" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Доставка</h3>
                <p className="text-muted-foreground">Бесплатная доставка по городу от 10 000 ₽</p>
              </Card>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-card border-primary/20">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Гарантия</h3>
                <p className="text-muted-foreground">2 года гарантии на всю мебель</p>
              </Card>
            </div>
          </div>
        </section>

        <section id="contacts" className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-center mb-12">Контакты</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 bg-card border-primary/20">
                <h3 className="text-2xl font-semibold mb-6">Свяжитесь с нами</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Phone" size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Телефон</h4>
                      <a href="tel:+79253129492" className="text-muted-foreground hover:text-primary transition-colors">8(925) 312-94-92</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Mail" size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <a href="mailto:trixmebel@yandex.ru" className="text-muted-foreground hover:text-primary transition-colors">trixmebel@yandex.ru</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Clock" size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Режим работы</h4>
                      <p className="text-muted-foreground">Пн-Вс: 10:00 - 20:00</p>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
                      <Icon name="MessageCircle" size={20} className="mr-2" />
                      Написать в WhatsApp
                    </Button>
                  </div>
                </div>
              </Card>
              <Card className="p-8 bg-card border-primary/20">
                <h3 className="text-2xl font-semibold mb-6">Оставьте заявку</h3>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Ваше имя</label>
                    <Input id="name" placeholder="Иван Иванов" className="bg-background border-primary/20" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">Телефон</label>
                    <Input id="phone" type="tel" placeholder="+7 (999) 123-45-67" className="bg-background border-primary/20" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email (необязательно)</label>
                    <Input id="email" type="email" placeholder="example@mail.ru" className="bg-background border-primary/20" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Сообщение</label>
                    <Textarea id="message" placeholder="Расскажите о вашем проекте..." rows={4} className="bg-background border-primary/20" />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
                    Отправить заявку
                  </Button>
                </form>
              </Card>
            </div>
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
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={selectedStory.gallery.map((_, i) => `gallery-${i}`)} strategy={rectSortingStrategy}>
                  <div className="grid grid-cols-12 gap-4">
                    {selectedStory.gallery.map((image, idx) => (
                      <SortableGalleryItem
                        key={`gallery-${idx}`}
                        id={`gallery-${idx}`}
                        image={image}
                        title={selectedStory.title}
                        index={idx}
                        onDelete={() => {
                          const updatedStory = {
                            ...selectedStory,
                            gallery: selectedStory.gallery.filter((_, i) => i !== idx)
                          };
                          setSelectedStory(updatedStory);
                          setProjectStories(prev => 
                            prev.map(s => s.id === selectedStory.id ? updatedStory : s)
                          );
                        }}
                        onView={() => setLightboxImage(image)}
                      />
                    ))}
                    <div 
                      className="col-span-12 sm:col-span-6 lg:col-span-4 h-64 rounded-2xl border-2 border-dashed border-primary/30 hover:border-primary/60 transition-colors flex items-center justify-center cursor-pointer group"
                      onClick={() => galleryFileInputRef.current?.click()}
                    >
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/30 transition-colors">
                          <Icon name="Plus" size={24} className="text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground font-medium">Добавить фото</p>
                      </div>
                    </div>
                  </div>
                </SortableContext>
              </DndContext>
              <input
                ref={galleryFileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  files.forEach((file) => {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const newImage = event.target?.result as string;
                      const updatedStory = {
                        ...selectedStory,
                        gallery: [...selectedStory.gallery, newImage]
                      };
                      setSelectedStory(updatedStory);
                      setProjectStories(prev => 
                        prev.map(s => s.id === selectedStory.id ? updatedStory : s)
                      );
                    };
                    reader.readAsDataURL(file);
                  });
                }}
              />
            </div>
          </div>
        </div>
      )}

      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <Icon name="X" size={24} className="text-white" />
          </button>
          <img
            src={lightboxImage}
            alt="Просмотр"
            className="max-w-full max-h-[90vh] object-contain rounded-lg animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <footer className="bg-muted/50 py-8 px-4 mt-16">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2024 TRIKC. Все права защищены.</p>
        </div>
      </footer>

      {isQuoteFormOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsQuoteFormOpen(false)}
        >
          <Card
            className="max-w-md w-full animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Заявка на просчет</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsQuoteFormOpen(false)}
                >
                  <Icon name="X" size={24} />
                </Button>
              </div>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="quote-name" className="block text-sm font-medium mb-2">Ваше имя</label>
                  <Input id="quote-name" placeholder="Иван Иванов" className="bg-background" />
                </div>
                <div>
                  <label htmlFor="quote-phone" className="block text-sm font-medium mb-2">Телефон</label>
                  <Input id="quote-phone" type="tel" placeholder="+7 (999) 123-45-67" className="bg-background" />
                </div>
                <div>
                  <label htmlFor="quote-email" className="block text-sm font-medium mb-2">Email (необязательно)</label>
                  <Input id="quote-email" type="email" placeholder="example@mail.ru" className="bg-background" />
                </div>
                <div>
                  <label htmlFor="quote-project" className="block text-sm font-medium mb-2">Описание проекта</label>
                  <Textarea id="quote-project" placeholder="Опишите, что вы хотите заказать..." rows={4} className="bg-background" />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить заявку
                </Button>
              </form>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;