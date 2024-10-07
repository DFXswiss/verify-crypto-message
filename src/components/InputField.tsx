interface InputFieldProps {
  id: string;
  label: string;
  register: any;
  errors: any;
  type?: string;
  isTextArea?: boolean;
}

export function InputField({
  id,
  label,
  register,
  errors,
  type = "text",
  isTextArea = false,
}: InputFieldProps): JSX.Element {
  return (
    <div className="relative">
      {isTextArea ? (
        <textarea
          id="message"
          {...register(id, { required: `${label} is required` })}
          className={`block h-24 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border ${
            errors.message ? "border-dfxRed-150" : "border-gray-300"
          } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-dfxRed-150 focus:outline-none focus:ring-0 focus:border-dfxRed-150 peer`}
          placeholder=" "
          autoComplete="off"
        />
      ) : (
        <input
          type={type}
          id={id}
          {...register(id, { required: `${label} is required` })}
          className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border ${
            errors[id] ? "border-dfxRed-150" : "border-gray-300"
          } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-dfxRed-150 focus:outline-none focus:ring-0 focus:border-dfxRed-150 peer`}
          placeholder=" "
          autoComplete="off"
        />
      )}
      <label
        htmlFor={id}
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-dfxRed-150 peer-focus:dark:text-dfxRed-150 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {label}
        <div className="absolute h-0.5 -z-10 w-11/12 top-[7px] left-1 bg-white dark:bg-[#242424] transform peer-focus:visible peer-focus:opacity-100 peer-placeholder-shown:opacity-0" />
      </label>
      {errors[id] && (
        <p className="text-left pl-2.5 pt-1 text-dfxRed-150 text-sm">
          {errors[id].message}
        </p>
      )}
    </div>
  );
}
