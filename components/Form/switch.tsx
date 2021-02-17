import { useContext, useEffect, useState } from "react";
import { AppContext } from "context";
import type { FieldValue } from "config/interfaces"

const SwitchField = ({ id, name, className, placeholder, checked, disabled }: FieldValue): JSX.Element => {
    const { parameters, setParameter } = useContext(AppContext),
        [state, setState] = useState<boolean>(checked);
    return (
        <div className="form-check form-switch">
            <input
                id={id}
                name={name || id}
                data-testid={id}
                type="checkbox"
                className={`bg-${checked ? "success":"danger"} form-check-input${className ? ` ${className}` : ""}`}
                checked={state}
                disabled={disabled}
                onChange={({ target }: any) => {
                    let { id, name, checked, defaultChecked } = target,
                        param = { id, [name]: checked },
                        newParams = id.split('-'),
                        newParam = parameters.find((reg: any) => reg.id === newParams[1]);
                    if (!newParam && checked != defaultChecked) {
                        target.classList.remove("bg-success", "bg-danger");
                        target.classList.add("bg-warning");
                        setParameter((parameters: any) => [...parameters, {id: newParams[1], [newParams[0]]: checked}])
                    } else {
                        delete parameters[newParam];
                        newParam[name] = checked;
                        setParameter(parameters)
                    }
                    setState(!state)
                }}
            />
            {placeholder && <label className="form-check-label" htmlFor={id}>{placeholder}</label>}
        </div>
    )
}

export default SwitchField;