import { useRef, useEffect } from "react";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const InputDirectory = (props: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setAttribute("webkitdirectory", "");
    }
  }, []);

  return <input type="file" ref={inputRef} {...props} />;
};

export default InputDirectory;
