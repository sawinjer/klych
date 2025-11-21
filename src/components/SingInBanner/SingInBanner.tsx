import { LinkButton } from "../Button/LinkBuntton";

export const SingInBanner: React.FC = () => {
  return (
    <div className="flex items-center flex-col gap-5">
      <h2 className="text-[32px] text-center font-bold">
        Хочеш, щоб на твій клич відгукнулись?
      </h2>
      <div className="flex gap-2 items-center justify-center">
        <LinkButton href="/sign-in">Увійти</LinkButton>
        <span>або</span>
        <LinkButton href="/sing-up">Зареєеструватися</LinkButton>
      </div>
    </div>
  );
};
