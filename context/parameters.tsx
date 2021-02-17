import { createContext, useReducer } from 'react'
import { removeFromArray } from 'utils'

interface Action {
    type: string;
    payload: {
        id: string;
        name: number | string;
    }
}

const ParametersContext = createContext<any>(null);

const initialState: Array<object> = [];

const parametersReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case "ADD_PARAMETER":
            return [action.payload, ...state];
        case "REMOVE_PARAMETER": return removeFromArray(state, action.payload.id);
        case "RESET_PARAMETERS": return initialState;
        default:
            return state
    }
}

const ParametersProvider = ({ children }: any) => {
    const [parameters, updateParams] = useReducer(parametersReducer, initialState);
    return (
        <ParametersContext.Provider value={{ parameters, updateParams }}>
            {children}
        </ParametersContext.Provider>
    );
};

export { ParametersContext, ParametersProvider }