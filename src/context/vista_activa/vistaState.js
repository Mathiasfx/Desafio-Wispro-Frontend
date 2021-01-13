import React, { useReducer } from "react";
import vistaContext from "./vistaContext";
import vistaReducer from "./vistaReducer";
import { VISTA_EDICION, VISTA_ESTADISTICA } from "../../types";

const VistaState = (props) => {
  const initialState = {
    vistaestadistica: false,
    vistausuarios: true,
  };

  //Dispatch para ejecutar las acciones

  const [state, dispatch] = useReducer(vistaReducer, initialState);

  //Funciones

  const ActivarLista = () => {
    dispatch({
      type: VISTA_EDICION,
    });
  };

  const ActivarEstadistica = () => {
    dispatch({
      type: VISTA_ESTADISTICA,
    });
  };

  return (
    <vistaContext.Provider
      value={{
        vistaestadistica: state.vistaestadistica,
        vistausuarios: state.vistausuarios,
        ActivarLista,
        ActivarEstadistica,
      }}
    >
      {props.children}
    </vistaContext.Provider>
  );
};

export default VistaState;
