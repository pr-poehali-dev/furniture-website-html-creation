import Icon from '@/components/ui/icon';

interface Story {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  gallery: string[];
}

interface ProjectsSectionProps {
  stories: Story[];
  setSelectedStory: (story: Story | null) => void;
}

export const ProjectsSection = ({ stories, setSelectedStory }: ProjectsSectionProps) => {
  return (
    <section className="py-16 px-4 overflow-hidden">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Наши проекты</h2>
        <div className="flex gap-6 justify-center items-center flex-wrap max-w-6xl mx-auto">
          {stories.map((story, idx) => (
            <div
              key={story.id}
              className="relative w-[280px] h-[480px] rounded-3xl overflow-hidden cursor-pointer group animate-fade-in"
              style={{ animationDelay: `${idx * 0.15}s` }}
              onClick={() => setSelectedStory(story)}
            >
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
          ))}
        </div>
      </div>
    </section>
  );
};
