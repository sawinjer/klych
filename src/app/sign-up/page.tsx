import { GoogleSignInButton } from "@/components/GoogleSignInButton/GoogleSignInButton";
import { SignUpForm } from "./_components/SignUpForm/SignUpForm";

export default async function SignUp() {
	return (
		<div className="flex items-center justify-center">
			<main className="flex items-center justify-center flex-col gap-10 max-w-[360px] w-full">
				<h1>Реєстрація</h1>
				<GoogleSignInButton />
				<span>або</span>
				<SignUpForm />
			</main>
		</div>
	);
}
