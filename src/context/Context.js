
import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
    user:JSON.parse(localStorage.getItem("user")) || null,  // usuario con su nombre, email y password, almacenado en el localstorage
    isFetching:false,                                       // Se refiere para una consulta en curso 
    error:false,                                            // errores si los hay
};

export const Context = createContext( INITIAL_STATE ); // El contexto proporciona una forma de compartir valores entre componentes sin necesidad de props 

export const ContextProvider = ({ children }) => {                      // El contexto compartirá con los children un estado que se modificará a través 
    const [ state, dispatch ] = useReducer( Reducer, INITIAL_STATE );   // de un dispatch. El dispatch usará el reducer y este las actions. Estas últimas
                                                                        // devolverán un estado modificado.
    useEffect(() => {
        localStorage.setItem("user",JSON.stringify( state.user ));      // Cada vez que el estado del usuario cambie se grabará en localStorage
    },[ state.user ])
    
    
    return(                                                             
        <Context.Provider
            value={{
                user:state.user,
                isFetching: state.isFetching,                           // Este es el estado inicial que se comparte con toda la aplicación (childrens)
                error:state.error,
                dispatch,                                               // dispatch también se comparte para poder modificar el estado
            }}
        >
            { children }    
        </Context.Provider>
    )
}