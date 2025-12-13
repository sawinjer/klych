import Link from "next/link";
import {
  Heart,
  Target,
  Users,
  Sparkles,
  Quote,
  ArrowRight,
  MessageCircle,
  Lightbulb,
  Shield,
} from "lucide-react";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="text-[#F7F4E3] text-5xl md:text-6xl font-black mb-6 max-w-4xl leading-tight">
          Про Клич
        </h1>
        <p className="text-[#C4C1B1] text-xl md:text-2xl max-w-3xl">
          Ми віримо, що разом можна більше. Клич — це платформа, яка допомагає
          українцям знаходити однодумців та об&apos;єднуватися навколо спільних
          цілей.
        </p>
      </section>

      {/* Mission Section */}
      <section className="px-6 py-16 bg-[#2A2A2A]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-[#F7F4E3] text-3xl md:text-4xl font-black mb-6">
                Наша місія
              </h2>
              <p className="text-[#C4C1B1] text-lg mb-4">
                Ми створюємо простір, де кожен може знайти людей зі схожими
                інтересами, організувати зустріч чи подію, та стати частиною
                активної спільноти.
              </p>
              <p className="text-[#C4C1B1] text-lg">
                Клич — це більше, ніж платформа. Це рух людей, які хочуть жити
                активно, допомагати іншим та робити Україну кращою.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <MissionCard
                icon={<Target size={32} />}
                title="Об&apos;єднувати"
                description="Людей навколо спільних інтересів"
              />
              <MissionCard
                icon={<Heart size={32} />}
                title="Надихати"
                description="На добрі справи та волонтерство"
              />
              <MissionCard
                icon={<Users size={32} />}
                title="Підтримувати"
                description="Громадські ініціативи"
              />
              <MissionCard
                icon={<Sparkles size={32} />}
                title="Розвивати"
                description="Активне громадянство"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[#F7F4E3] text-3xl md:text-4xl font-black text-center mb-12">
            Засновниця
          </h2>
          <div className="border border-[#F7F4E3] rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-40 h-40 rounded-full bg-[#4E0700] flex items-center justify-center flex-shrink-0">
                <span className="text-[#F7F4E3] text-5xl font-black">АЗ</span>
              </div>
              <div>
                <h3 className="text-[#F7F4E3] text-2xl md:text-3xl font-black mb-2">
                  Анна Завірюха
                </h3>
                <p className="text-[#C4C1B1] text-lg mb-4">
                  Засновниця та ідейна натхненниця Клич
                </p>
                <div className="flex items-start gap-3 mb-4">
                  <Quote size={24} className="text-[#F7F4E3] flex-shrink-0 mt-1" />
                  <p className="text-[#F7F4E3] text-lg italic">
                    Я завжди вірила, що найбільші зміни починаються з маленьких
                    кроків і правильних людей поруч. Клич народився з бажання
                    допомогти кожному знайти свою спільноту та реалізувати ідеї,
                    які здаються неможливими наодинці.
                  </p>
                </div>
                <p className="text-[#C4C1B1]">
                  Анна має багаторічний досвід у сфері громадських ініціатив та
                  волонтерства. Її мрія — створити платформу, де кожен українець
                  зможе знайти підтримку для своїх ідей та однодумців для їх
                  реалізації.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="px-6 py-16 bg-[#4E0700]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[#F7F4E3] text-3xl md:text-4xl font-black mb-8">
            Наша історія
          </h2>
          <div className="space-y-6 text-left">
            <StoryBlock
              year="2024"
              title="Початок ідеї"
              description="Все почалося з простого питання: чому так складно знайти людей для спільних активностей? Анна Завірюха вирішила це змінити."
            />
            <StoryBlock
              year="2024"
              title="Перший прототип"
              description="Команда ентузіастів створила першу версію платформи. Перші користувачі почали кидати свої кличі."
            />
            <StoryBlock
              year="2025"
              title="Зростання спільноти"
              description="Тисячі українців приєдналися до Клич. Сотні успішних зустрічей, нові друзі та реалізовані ідеї."
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[#F7F4E3] text-3xl md:text-4xl font-black text-center mb-12">
            Наші цінності
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ValueCard
              icon={<MessageCircle size={32} />}
              title="Відкритість"
              description="Ми створюємо простір, де кожен може висловитися та бути почутим. Прозорість у всьому, що ми робимо."
            />
            <ValueCard
              icon={<Lightbulb size={32} />}
              title="Ініціативність"
              description="Ми підтримуємо тих, хто діє. Кожна ідея варта уваги, кожна ініціатива може змінити світ."
            />
            <ValueCard
              icon={<Shield size={32} />}
              title="Довіра"
              description="Ми будуємо спільноту на довірі. Безпека та комфорт наших користувачів — наш пріоритет."
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-6 py-16 bg-[#2A2A2A]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-[#F7F4E3] text-3xl md:text-4xl font-black mb-4">
            Команда
          </h2>
          <p className="text-[#C4C1B1] text-lg mb-12 max-w-2xl mx-auto">
            За Клич стоїть невелика, але віддана команда людей, які вірять у силу
            спільноти
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <TeamMember name="Анна З." role="Засновниця" initials="АЗ" />
            <TeamMember name="Команда" role="Розробка" initials="КР" />
            <TeamMember name="Команда" role="Дизайн" initials="КД" />
            <TeamMember name="Команда" role="Маркетинг" initials="КМ" />
          </div>
          <p className="text-[#C4C1B1] mt-8">
            Хочеш приєднатися до команди?{" "}
            <Link href="/partners" className="text-[#F7F4E3] hover:underline">
              Напиши нам
            </Link>
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-[#F7F4E3] text-3xl md:text-4xl font-black mb-6">
            Стань частиною історії
          </h2>
          <p className="text-[#C4C1B1] text-lg mb-8">
            Приєднуйся до спільноти Клич та допоможи нам будувати майбутнє, де
            кожен може знайти своїх
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up"
              className="rounded-xl bg-[#F7F4E3] text-[#202020] py-4 px-8 font-black text-lg hover:bg-[#C4C1B1] transition-colors flex items-center justify-center gap-2"
            >
              Приєднатися
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/partners"
              className="rounded-xl border border-[#F7F4E3] text-[#F7F4E3] py-4 px-8 font-black text-lg hover:bg-[#F7F4E3] hover:text-[#202020] transition-colors"
            >
              Стати партнером
            </Link>
          </div>
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
              href="/"
              className="text-[#C4C1B1] hover:text-[#F7F4E3] transition-colors"
            >
              Головна
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

function MissionCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="border border-[#F7F4E3] rounded-xl p-5 text-center">
      <div className="text-[#F7F4E3] mb-3 flex justify-center">{icon}</div>
      <h3 className="text-[#F7F4E3] font-black mb-1">{title}</h3>
      <p className="text-[#C4C1B1] text-sm">{description}</p>
    </div>
  );
}

function StoryBlock({
  year,
  title,
  description,
}: {
  year: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 items-start">
      <span className="text-[#F7F4E3] font-black text-xl opacity-50 w-16 flex-shrink-0">
        {year}
      </span>
      <div>
        <h3 className="text-[#F7F4E3] font-black text-lg mb-1">{title}</h3>
        <p className="text-[#F7F4E3] opacity-80">{description}</p>
      </div>
    </div>
  );
}

function ValueCard({
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
      <div className="text-[#F7F4E3] mb-4">{icon}</div>
      <h3 className="text-[#F7F4E3] text-xl font-black mb-3">{title}</h3>
      <p className="text-[#C4C1B1]">{description}</p>
    </div>
  );
}

function TeamMember({
  name,
  role,
  initials,
}: {
  name: string;
  role: string;
  initials: string;
}) {
  return (
    <div className="text-center">
      <div className="w-20 h-20 rounded-full bg-[#4E0700] flex items-center justify-center mx-auto mb-3">
        <span className="text-[#F7F4E3] text-xl font-black">{initials}</span>
      </div>
      <h3 className="text-[#F7F4E3] font-black">{name}</h3>
      <p className="text-[#C4C1B1] text-sm">{role}</p>
    </div>
  );
}
