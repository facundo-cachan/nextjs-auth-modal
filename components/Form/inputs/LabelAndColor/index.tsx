import { useContext } from "react";
import { AppContext } from "context";
import type { FieldBase } from "config/interfaces";

const InputLabelAndColor = ({ id, name, placeholder, type, className, required, autoFocus, autoComplete, ro, value }: FieldBase): JSX.Element => {
    const { parameters, setParameter } = useContext(AppContext);
    return (
        <div className="form-floating mb-3">
            <input
                id={id}
                name={name ? name : id}
                className={className}
                placeholder={placeholder}
                required={required ? required : false}
                autoFocus={autoFocus ? true : false}
                type={type}
                autoComplete={String(autoComplete ? autoComplete : 'off')}
                aria-describedby={placeholder}
                readOnly={ro}
                defaultValue={value}
                onBlur={({ target }: any) => {
                    let { id, name, value, defaultValue } = target;
                    if (defaultValue != value) {
                        target.classList.add("bg-warning");
                        let param = { id, [name]: value },
                            newParam = parameters.find((reg: any) => reg.id === id);
                        if (!newParam) {
                            setParameter((parameters: any) => [...parameters, param])
                        } else {
                            delete parameters[newParam];
                            newParam[name] = value;
                            setParameter(parameters)
                        }
                    }
                }}
            />
            <label htmlFor={id}>{placeholder}</label>
        </div>
    )
}

export default InputLabelAndColor