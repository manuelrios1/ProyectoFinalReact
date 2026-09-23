import { forwardRef } from "react";

const FormSelect = forwardRef (function FormSelect({ label, name, options = [], required = false, error = "", ...rest}, ref) {
    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor={name}
                className="font-semibold text-green-700 dark:text-green-500"
            >
                {label} {required && "*"}
            </label>
            <select
                ref={ref}
                id={name}
                name={name}
                required={required}
                className="border border-green-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                {...rest} >
                <option className="text-green-300 bg-green-950" value="">
                    Selecciona una opción
                </option>
                {options.map((option) => (
                    <option className="text-green-500"
                        key={option}
                        value={option}
                    >
                        {option}
                    </option>
                ))}
            </select>
            {error && (
                <span className="text-sm text-red-500">
                    {error}
                </span>
            )}
        </div>
    );
})
export default FormSelect;
