import { VISTA_EDICION, VISTA_ESTADISTICA } from "../../types";

const vistaReducer = (state, action) => {
  switch (action.type) {
    case VISTA_EDICION:
      return {
        ...state,
        vistaestadistica: false,
        vistausuarios: true,
      };
    case VISTA_ESTADISTICA:
      return {
        ...state,
        vistaestadistica: true,
        vistausuarios: false,
      };
    default:
      return state;
  }
};

export default vistaReducer;
