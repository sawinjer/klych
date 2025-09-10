import Link from "next/link";
import { Logo } from "../Logo/Logo";
import { LinkButton } from "../Button/LinkBuntton";

export const Header: React.FC = () => {
	return (
		<header className="flex gap-8 items-center justify-center">
			<Logo />
			<nav className="flex gap-8">
				<Link href="/list">Кличі</Link>
				<Link href="/request">Кинути клич</Link>
				<Link href="/stories">Історії</Link>
				<Link href="/partners">Партнерам</Link>
				<Link href="/about-us">Про нас</Link>
				<Link href="/rating">Рейтинг</Link>
				<Link href="/support">Підтримати</Link>
			</nav>
			<LinkButton href="/sign-up">Стати своїм</LinkButton>
		</header>
	);
};
