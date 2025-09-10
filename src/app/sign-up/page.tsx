import { auth } from "@/auth";
import { GoogleSignInButton } from "@/components/GoogleSignInButton/GoogleSignInButton";
import { SignOutButton } from "@/components/SignOutButton/SignOutButton";
import { headers } from "next/headers";

export default async function SignUp() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	return (
		<div>
			<main>
				<GoogleSignInButton />
				<SignOutButton />
				<pre>{JSON.stringify(session, null, 2)}</pre>
			</main>
		</div>
	);
}
