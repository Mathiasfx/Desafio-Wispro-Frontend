import React, { useReducer } from "react";
import ClienteAxios from "../../config/axios";
import usuarioContext from "./usuarioContext";
import usuarioReducer from "./usuarioReducer";
import {
  OBTENER_USUARIOS,
  ELIMINAR_USUARIO,
  ERROR,
  USUARIO_ACTUAL,
  ACTUALIZAR_USUARIO,
  VALIDAR_EDICION,
} from "../../types";
import clienteAxios from "../../config/axios";

const UsuarioState = (props) => {
  const initialState = {
    usuarios: [],
    editando: false,
    mensaje: null,
    usuarioSeleccionado: null,
    error: false,
  };

  //Dispatch para ejecutar las acciones

  const [state, dispatch] = useReducer(usuarioReducer, initialState);

  //serie de Funciones
  const ObtenerUsuarios = async () => {
    try {
      const resultado = await ClienteAxios.get("/api/usuarios/listar");
      dispatch({
        type: OBTENER_USUARIOS,
        payload: resultado.data.usuarios,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un Error",
        categoria: "alerta-error",
      };
      dispatch({
        type: ERROR,
        payload: alerta,
      });
    }
  };
  //EditarUsuario
  const actualizarUsuario = async (usuarios) => {
    try {
      const resultado = await clienteAxios.put(
        `/api/usuarios/${usuarios._id}`,
        usuarios
      );
      dispatch({
        type: ACTUALIZAR_USUARIO,
        payload: resultado.data.usuario,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un Error",
        categoria: "alerta-error",
      };
      dispatch({
        type: ERROR,
        payload: alerta,
      });
    }
  };
  //Elimina Usuario
  const EliminarUsuario = async (usuarioID) => {
    try {
      await clienteAxios.delete(`/api/usuarios/${usuarioID}`);
      dispatch({
        type: ELIMINAR_USUARIO,
        payload: usuarioID,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un Error",
        categoria: "alerta-error",
      };
      dispatch({
        type: ERROR,
        payload: alerta,
      });
    }
  };

  //validarEdicion

  const validarEdicion = () => {
    dispatch({
      type: VALIDAR_EDICION,
    });
  };

  //Extrae usuario actual para edicion
  const guardarUsuarioActual = (usuarios) => {
    dispatch({
      type: USUARIO_ACTUAL,
      payload: usuarios,
    });
  };

  //

  return (
    <usuarioContext.Provider
      value={{
        usuarios: state.usuarios,
        editando: state.editando,
        mensaje: state.mensaje,
        error: state.error,
        usuarioSeleccionado: state.usuarioSeleccionado,
        ObtenerUsuarios,
        EliminarUsuario,
        guardarUsuarioActual,
        actualizarUsuario,
        validarEdicion,
      }}
    >
      {props.children}
    </usuarioContext.Provider>
  );
};

export default UsuarioState;
