import { useContext, useState } from "react";
import { AppContext } from "context";
import { FieldValues, Option } from "config/interfaces"

const RadioField = ({ name, values, label, placeholder }: FieldValues): JSX.Element => {
    const { parameters, setParameter } = useContext(AppContext),
    [state, setState] = useState<React.SetStateAction<boolean | undefined>>();
    return (
        <>
            {label && <legend>{placeholder}</legend>}
            {values.map(({ key, value }: Option, k: number) => {
                setState(k === 0)
                return <>
                <input
                    type="radio"
                    key={k}
                    name={name}
                    id={String(key)}
                    data-testid={`${name}${k}`}
                    value={value}
                    placeholder={placeholder}
                    onChange={({ target }: any) => {
                        let { id, name, checked, defaultChecked } = target,
                            param = { id, [name]: checked },
                            newParam = parameters.find((reg: any) => reg.id === id);
                        if (!newParam && checked != defaultChecked) {
                            target.classList.remove("bg-success", "bg-danger");
                            target.classList.add("bg-warning");
                            setParameter((parameters: any) => [...parameters, param])
                        } else {
                            delete parameters[newParam];
                            newParam[name] = checked;
                            setParameter(parameters)
                        }
                        setState(!state)
                    }}
                />
                <label htmlFor={name}>{value}</label>
            </>
            })}
        </>
    );
}

export default RadioField