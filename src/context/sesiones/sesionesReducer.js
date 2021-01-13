import { MOSTRAR_DATOS, ERROR_DATOS } from "../../types";
const sesionesReducer = (state, action) => {
  switch (action.type) {
    case MOSTRAR_DATOS:
      return {
        ...state,
        datosSesiones: action.payload,
      };
    case ERROR_DATOS:
      return {
        ...state,
        mensaje: action.payload,
      };
    default:
      return state;
  }
};

export default sesionesReducer;
