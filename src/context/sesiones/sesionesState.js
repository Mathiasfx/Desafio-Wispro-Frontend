import React, { useReducer } from "react";
import sesionesReducer from "./sesionesReducer";
import sesionesContext from "./sesionesContext";
import ClienteAxios from "../../config/axios";
import { MOSTRAR_DATOS, ERROR_DATOS } from "../../types";

const SesionesState = (props) => {
  const initialState = {
    datosSesiones: [],
    mensaje: null,
  };
  const [state, dispatch] = useReducer(sesionesReducer, initialState);

  //funciones
  const mostrarSesiones = async () => {
    try {
      const resultado = await ClienteAxios.get("/api/sesiones");
      dispatch({
        type: MOSTRAR_DATOS,
        payload: resultado.data.sesiones[0].data,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un Errors",
        categoria: "alerta-error",
      };
      dispatch({
        type: ERROR_DATOS,
        payload: alerta,
      });
    }
  };

  return (
    <sesionesContext.Provider
      value={{ datosSesiones: state.datosSesiones, mostrarSesiones }}
    >
      {props.children}
    </sesionesContext.Provider>
  );
};

export default SesionesState;
