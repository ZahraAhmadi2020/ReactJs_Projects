import { useEffect, useRef } from "react";

const InputWithLabel = ({
  id,
  label,
  value,
  onInputChange,
  type = "text",
  isFocused,
}) => {
  const handleChange = (event) => {
    onInputChange(event);
  };

  const inputRef = useRef();

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused])

  return (
    <div className="ms-4">
      <label htmlFor={id} className="me-3 text-info ">{label}</label>
      <input className="w-50 my-4 p-1"  
        onChange={handleChange}
        type={type}
        id={id}
        value={value}
        ref={inputRef}
      />
    </div>
  );
};

export default InputWithLabel;
