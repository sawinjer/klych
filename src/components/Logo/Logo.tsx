import Image from "next/image";
import React from "react";

export const Logo: React.FC = () => {
	return <Image src="/logo.png" width={212} height={85} alt="logotype" />;
};
