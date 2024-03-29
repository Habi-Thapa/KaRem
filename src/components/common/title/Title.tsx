type Props = {
  title: string;
};

const Title = ({ title }: Props) => {
  return <h1 className="font-medium text-xl underline">{title}</h1>;
};

export default Title;
