import { InputError } from ".";

export const InputContainer = ({
  title,
  type = "text",
  placeholder = "",
  id,
  name,
  value,
  errorText,
  errors,
  onChange,
  className = "",
}) => {
  const inputClasses = `
    focus-visible:border-[#0CA5E9]
    outline-none
    text-black
    text-[16px]
    w-full
    border
    ${errors ? "border-red-500" : "border-[#8B8E95]"}
    rounded-[8px]
    p-3
    ${className}
  `;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[14px] text-[#334155] font-semibold">
        {title} <span className="text-[#E14942]"> *</span>
      </label>

      <input
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={inputClasses}
      />

      {errors && <InputError errorText={errorText} />}
    </div>
  );
};
