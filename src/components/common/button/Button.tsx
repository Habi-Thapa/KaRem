type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
};

const Button = ({ type = "submit", onClick, children }: Props) => {
  return (
    <>
      <button
        type={type}
        className="border border-cyan-500 w-full px-1 py-3 bg-cyan-900 text-white font-[500] capitalize my-1"
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
