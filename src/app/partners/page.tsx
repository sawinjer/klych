import Link from "next/link";
import {
  Building2,
  Landmark,
  Heart,
  Handshake,
  Users,
  TrendingUp,
  Award,
  Globe,
  Mail,
  ArrowRight,
} from "lucide-react";

export default function PartnersPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="text-[#F7F4E3] text-5xl md:text-6xl font-black mb-6 max-w-4xl leading-tight">
          Станьте партнером Клич
        </h1>
        <p className="text-[#C4C1B1] text-xl md:text-2xl max-w-3xl mb-10">
          Разом ми можемо підтримати волонтерів та громадські ініціативи по всій
          Україні. Долучайтеся до спільноти партнерів Клич!
        </p>
        <Link
          href="#contact"
          className="rounded-xl bg-[#F7F4E3] text-[#202020] py-4 px-8 font-black text-lg hover:bg-[#C4C1B1] transition-colors flex items-center gap-2"
        >
          Стати партнером
          <ArrowRight size={20} />
        </Link>
      </section>

      {/* Why Partner Section */}
      <section className="px-6 py-16 bg-[#2A2A2A]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[#F7F4E3] text-3xl md:text-4xl font-black text-center mb-4">
            Чому варто стати партнером?
          </h2>
          <p className="text-[#C4C1B1] text-lg text-center mb-12 max-w-2xl mx-auto">
            Клич об&apos;єднує тисячі активних українців, які хочуть змінювати
            світ на краще
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BenefitCard
              icon={<Users size={40} />}
              title="Доступ до аудиторії"
              description="Понад 5000 активних користувачів, які шукають можливості для волонтерства та спільних активностей"
            />
            <BenefitCard
              icon={<TrendingUp size={40} />}
              title="Соціальний вплив"
              description="Підтримуйте реальні ініціативи та бачте результат вашого внеску у розвиток громад"
            />
            <BenefitCard
              icon={<Award size={40} />}
              title="Репутація бренду"
              description="Покажіть свою соціальну відповідальність та станьте частиною позитивних змін"
            />
          </div>
        </div>
      </section>

      {/* Partner Types Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[#F7F4E3] text-3xl md:text-4xl font-black text-center mb-12">
            Кого ми шукаємо?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Local Business */}
            <PartnerTypeCard
              icon={<Building2 size={48} />}
              title="Локальний бізнес"
              description="Кав'ярні, ресторани, коворкінги, магазини та інші локальні підприємства"
              benefits={[
                "Надавайте простір для зустрічей",
                "Пропонуйте знижки волонтерам",
                "Спонсоруйте локальні події",
                "Отримуйте нових клієнтів",
              ]}
            />

            {/* Government */}
            <PartnerTypeCard
              icon={<Landmark size={48} />}
              title="Державні органи"
              description="Міські ради, ОТГ, департаменти та державні установи"
              benefits={[
                "Залучайте громадян до ініціатив",
                "Підтримуйте волонтерський рух",
                "Розвивайте громадянське суспільство",
                "Покращуйте комунікацію з громадою",
              ]}
            />

            {/* NGO & Charity */}
            <PartnerTypeCard
              icon={<Heart size={48} />}
              title="Благодійні організації"
              description="НГО, фонди, волонтерські організації та громадські об'єднання"
              benefits={[
                "Знаходьте волонтерів для проєктів",
                "Поширюйте інформацію про ініціативи",
                "Координуйте спільні зусилля",
                "Масштабуйте свій вплив",
              ]}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-16 bg-[#4E0700]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[#F7F4E3] text-3xl md:text-4xl font-black text-center mb-12">
            Як стати партнером?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StepCard number="01" title="Заявка" description="Заповніть форму партнерства" />
            <StepCard number="02" title="Знайомство" description="Ми зв'яжемося для обговорення" />
            <StepCard number="03" title="Угода" description="Узгодимо умови співпраці" />
            <StepCard number="04" title="Старт" description="Почнемо спільну роботу" />
          </div>
        </div>
      </section>

      {/* Partnership Options */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[#F7F4E3] text-3xl md:text-4xl font-black text-center mb-4">
            Формати співпраці
          </h2>
          <p className="text-[#C4C1B1] text-lg text-center mb-12 max-w-2xl mx-auto">
            Оберіть формат, який найкраще підходить для вашої організації
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PartnershipOption
              icon={<Globe size={28} />}
              title="Інформаційне партнерство"
              description="Поширюйте інформацію про платформу та отримуйте згадки у наших матеріалах"
              features={["Розміщення логотипу", "Згадки у соцмережах", "Спільні публікації"]}
            />
            <PartnershipOption
              icon={<Handshake size={28} />}
              title="Ресурсне партнерство"
              description="Надавайте приміщення, обладнання чи послуги для проведення подій"
              features={["Статус офіційного партнера", "Пріоритет у просуванні", "Спільні заходи"]}
            />
            <PartnershipOption
              icon={<Heart size={28} />}
              title="Фінансова підтримка"
              description="Спонсоруйте конкретні ініціативи або підтримуйте розвиток платформи"
              features={["Звітність про використання", "Вибір напрямку підтримки", "Спецпроєкти"]}
            />
            <PartnershipOption
              icon={<Users size={28} />}
              title="Стратегічне партнерство"
              description="Довгострокова співпраця з глибокою інтеграцією та спільними цілями"
              features={["Індивідуальні умови", "Спільне планування", "Максимальна видимість"]}
            />
          </div>
        </div>
      </section>

      {/* Current Partners Placeholder */}
      <section className="px-6 py-16 bg-[#2A2A2A]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-[#F7F4E3] text-3xl md:text-4xl font-black mb-4">
            Нам довіряють
          </h2>
          <p className="text-[#C4C1B1] text-lg mb-12">
            Приєднуйтесь до організацій, які вже підтримують волонтерський рух в Україні
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <PartnerPlaceholder />
            <PartnerPlaceholder />
            <PartnerPlaceholder />
            <PartnerPlaceholder />
          </div>
          <p className="text-[#C4C1B1] mt-8 text-sm">
            Ваш логотип може бути тут
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="border border-[#F7F4E3] rounded-2xl p-10 md:p-16 text-center">
            <Mail size={48} className="text-[#F7F4E3] mx-auto mb-6" />
            <h2 className="text-[#F7F4E3] text-3xl md:text-4xl font-black mb-6">
              Зв&apos;яжіться з нами
            </h2>
            <p className="text-[#C4C1B1] text-lg mb-8">
              Готові обговорити партнерство? Напишіть нам, і ми відповімо
              протягом 24 годин
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:partners@klych.ua"
                className="rounded-xl bg-[#F7F4E3] text-[#202020] py-4 px-8 font-black text-lg hover:bg-[#C4C1B1] transition-colors"
              >
                partners@klych.ua
              </a>
              <Link
                href="/about-us"
                className="rounded-xl border border-[#F7F4E3] text-[#F7F4E3] py-4 px-8 font-black text-lg hover:bg-[#F7F4E3] hover:text-[#202020] transition-colors"
              >
                Дізнатись більше
              </Link>
            </div>
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
              href="/about-us"
              className="text-[#C4C1B1] hover:text-[#F7F4E3] transition-colors"
            >
              Про нас
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

function BenefitCard({
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

function PartnerTypeCard({
  icon,
  title,
  description,
  benefits,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
}) {
  return (
    <div className="border border-[#F7F4E3] rounded-2xl p-8 hover:bg-[#2A2A2A] transition-colors">
      <div className="text-[#F7F4E3] mb-4">{icon}</div>
      <h3 className="text-[#F7F4E3] text-2xl font-black mb-3">{title}</h3>
      <p className="text-[#C4C1B1] mb-6">{description}</p>
      <ul className="space-y-2">
        {benefits.map((benefit, index) => (
          <li key={index} className="text-[#F7F4E3] flex items-start gap-2">
            <span className="text-[#F7F4E3] mt-1">•</span>
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <p className="text-[#F7F4E3] text-5xl font-black mb-2 opacity-50">
        {number}
      </p>
      <h3 className="text-[#F7F4E3] text-xl font-black mb-2">{title}</h3>
      <p className="text-[#F7F4E3] opacity-80">{description}</p>
    </div>
  );
}

function PartnershipOption({
  icon,
  title,
  description,
  features,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}) {
  return (
    <div className="border border-[#2A2A2A] rounded-xl p-6 hover:border-[#F7F4E3] transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-[#F7F4E3]">{icon}</div>
        <h3 className="text-[#F7F4E3] text-xl font-black">{title}</h3>
      </div>
      <p className="text-[#C4C1B1] mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {features.map((feature, index) => (
          <span
            key={index}
            className="text-[#F7F4E3] text-sm border border-[#F7F4E3] rounded-full px-3 py-1"
          >
            {feature}
          </span>
        ))}
      </div>
    </div>
  );
}

function PartnerPlaceholder() {
  return (
    <div className="border border-dashed border-[#C4C1B1] rounded-xl h-24 flex items-center justify-center">
      <span className="text-[#C4C1B1] text-sm">Ваш логотип</span>
    </div>
  );
}
