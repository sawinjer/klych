interface Props {
  title: string;
}

export const FilterWithTitle: React.FC<React.PropsWithChildren<Props>> = (
  props,
) => {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="font-bold text-[20px]">{props.title}</p>
      {props.children}
    </div>
  );
};
