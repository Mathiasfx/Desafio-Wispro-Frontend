import {
  ELIMINAR_USUARIO,
  OBTENER_USUARIOS,
  ERROR,
  ACTUALIZAR_USUARIO,
  USUARIO_ACTUAL,
  VALIDAR_EDICION,
} from "../../types";

const usuarioReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_USUARIOS:
      return {
        ...state,
        usuarios: action.payload,
      };
    case ELIMINAR_USUARIO:
      return {
        ...state,
        usuarios: state.usuarios.filter(
          (usuario) => usuario._id !== action.payload
        ),
        usuario: null,
      };
    case ACTUALIZAR_USUARIO:
      return {
        ...state,
        error: false,
        editando: false,
        mensaje: action.payload,
        usuarios: state.usuarios.map((usuario) =>
          usuario._id === action.payload._id ? action.payload : usuario
        ),
      };
    case USUARIO_ACTUAL:
      return {
        ...state,
        usuarioSeleccionado: action.payload,
        editando: true,
      };
    case VALIDAR_EDICION:
      return {
        ...state,
        error: true,
      };
    case ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    default:
      return state;
  }
};

export default usuarioReducer;
