import { forwardRef } from "react";

const FormTextArea = forwardRef (function FormTextArea ({
    label,
    name,
    rows ,
    required = false,
    placeholder = "",
    error = "",
    ...rest}, ref
) {
    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor={name}
                className="font-semibold text-green-700 dark:text-green-500"
            >
                {label} {required && "*"}
            </label>
            <textarea
                ref={ref}
                id={name}
                name={name}
                rows={rows}
                placeholder={placeholder}
                required={required}
                className="border border-green-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                {...rest}
            />
            {error && (
                <span className="text-sm text-red-500">
                    {error= "Error, Revisa bien los campos ingresados"}
                </span>
            )}
        </div>
    );
})

export default FormTextArea;