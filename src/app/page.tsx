import Link from "next/link";
import { Users, Megaphone, MapPin, Calendar, Heart, Star } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="text-[#F7F4E3] text-5xl md:text-7xl font-black mb-6 max-w-4xl leading-tight">
          Клич мене і я прийду
        </h1>
        <p className="text-[#C4C1B1] text-xl md:text-2xl max-w-2xl mb-10">
          Клич — це платформа для організації зустрічей, подій та спільних
          активностей. Знаходь однодумців поруч!
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/make-klych"
            className="rounded-xl bg-[#F7F4E3] text-[#202020] py-4 px-8 font-black text-lg hover:bg-[#C4C1B1] transition-colors"
          >
            Кинути клич
          </Link>
          <Link
            href="/klychi"
            className="rounded-xl border border-[#F7F4E3] text-[#F7F4E3] py-4 px-8 font-black text-lg hover:bg-[#F7F4E3] hover:text-[#202020] transition-colors"
          >
            Переглянути кличі
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 bg-[#2A2A2A]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[#F7F4E3] text-3xl md:text-4xl font-black text-center mb-12">
            Як це працює?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Megaphone size={40} />}
              title="Кинь клич"
              description="Створи подію чи зустріч і запроси інших долучитися до твоєї ідеї"
            />
            <FeatureCard
              icon={<Users size={40} />}
              title="Знайди своїх"
              description="Переглядай кличі інших та відгукуйся на ті, що тебе цікавлять"
            />
            <FeatureCard
              icon={<Heart size={40} />}
              title="Об'єднуйся"
              description="Знайомся з однодумцями, організовуй зустрічі та створюй спогади"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-16 bg-[#4E0700]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <StatCard number="1000+" label="Активних кличів" />
            <StatCard number="5000+" label="Учасників" />
            <StatCard number="500+" label="Успішних зустрічей" />
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[#F7F4E3] text-3xl md:text-4xl font-black text-center mb-12">
            Чому Клич?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AdvantageCard
              icon={<MapPin size={24} />}
              title="Локальні події"
              description="Знаходь кличі поруч із тобою та відкривай нові місця у своєму місті"
            />
            <AdvantageCard
              icon={<Calendar size={24} />}
              title="Гнучкий розклад"
              description="Обирай зручний час та формат — онлайн чи офлайн"
            />
            <AdvantageCard
              icon={<Star size={24} />}
              title="Рейтинг учасників"
              description="Система рейтингу допомагає знаходити надійних організаторів"
            />
            <AdvantageCard
              icon={<Users size={24} />}
              title="Спільнота"
              description="Долучайся до спільноти активних людей з усієї України"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto border border-[#F7F4E3] rounded-2xl p-10 md:p-16">
          <h2 className="text-[#F7F4E3] text-3xl md:text-4xl font-black mb-6">
            Готовий почати?
          </h2>
          <p className="text-[#C4C1B1] text-lg mb-8">
            Приєднуйся до спільноти та знаходь однодумців вже сьогодні
          </p>
          <Link
            href="/sign-up"
            className="inline-block rounded-xl bg-[#F7F4E3] text-[#202020] py-4 px-10 font-black text-lg hover:bg-[#C4C1B1] transition-colors"
          >
            Стати своїм
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-[#2A2A2A]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#C4C1B1] text-sm">
            2025 Клич. Всі права захищені.
          </p>
          <div className="flex gap-6">
            <Link
              href="/about-us"
              className="text-[#C4C1B1] hover:text-[#F7F4E3] transition-colors"
            >
              Про нас
            </Link>
            <Link
              href="/partners"
              className="text-[#C4C1B1] hover:text-[#F7F4E3] transition-colors"
            >
              Партнерам
            </Link>
            <Link
              href="/support"
              className="text-[#C4C1B1] hover:text-[#F7F4E3] transition-colors"
            >
              Підтримати
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="text-[#F7F4E3] mb-4">{icon}</div>
      <h3 className="text-[#F7F4E3] text-xl font-black mb-3">{title}</h3>
      <p className="text-[#C4C1B1]">{description}</p>
    </div>
  );
}

function CategoryCard({ title, emoji }: { title: string; emoji: string }) {
  return (
    <Link
      href={`/klychi?category=${title.toLowerCase()}`}
      className="border border-[#F7F4E3] rounded-xl p-4 text-center hover:bg-[#2A2A2A] transition-colors group"
    >
      <span className="text-3xl block mb-2">{emoji}</span>
      <span className="text-[#F7F4E3] font-bold group-hover:text-[#F7F4E3]">
        {title}
      </span>
    </Link>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <p className="text-[#F7F4E3] text-4xl md:text-5xl font-black mb-2">
        {number}
      </p>
      <p className="text-[#F7F4E3] text-lg opacity-80">{label}</p>
    </div>
  );
}

function AdvantageCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="border border-[#2A2A2A] rounded-xl p-6 hover:border-[#F7F4E3] transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-[#F7F4E3]">{icon}</div>
        <h3 className="text-[#F7F4E3] text-lg font-black">{title}</h3>
      </div>
      <p className="text-[#C4C1B1]">{description}</p>
    </div>
  );
}
