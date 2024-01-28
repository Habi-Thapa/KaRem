import React from "react";

type Props = {
  id: string;
  name: string;
  value?: string;
  type?: "text" | "file";
  accept?: string;
  label: string;
  forwardRef?: React.RefObject<HTMLInputElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  id,
  type = "text",
  accept = "image/*",
  name,
  value,
  label,
  forwardRef,
  onChange,
}: Props) => {
  return (
    <>
      <div className="flex flex-col my-1">
        <label htmlFor={id}>{label}</label>
        <input
          ref={forwardRef}
          type={type}
          id={id}
          accept={accept}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border border border-cyan-500 px-1 py-3"
        />
      </div>
    </>
  );
};

export default Input;
