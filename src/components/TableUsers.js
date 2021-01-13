import React, { useContext, useEffect } from "react";
import UsuarioList from "./UsuarioListItem";
import UsuarioContext from "../context/usuarios/usuarioContext";
import AlertaContext from "../context/alerta/alertaContext";

const TableUsers = () => {
  //Conexion al context que trae los usuarios
  const usuarioContext = useContext(UsuarioContext);
  const {
    mensaje,
    usuarios,
    ObtenerUsuarios,
    EliminarUsuario,
    guardarUsuarioActual,
    actualizarUsuario,
  } = usuarioContext;

  //context de Alerta
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  //Obtener usuarios ni bien carga
  useEffect(() => {
    //si hay error
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    ObtenerUsuarios();
    //eslint-disable-next-line
  }, [mensaje]);

  return (
    <div className="table-responsive">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <table className="table">
        {/* Titulo de tabla */}
        <thead className="thead-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Editar</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {/* Condicional que verifica que hay usuarios */}
          {usuarios.length === 0 ? (
            <tr>
              <td>No hay Usuarios en la Base de datos</td>
            </tr>
          ) : (
            usuarios.map((usuario) => (
              <UsuarioList
                usuario={usuario}
                key={usuario._id}
                EliminarUsuario={EliminarUsuario}
                actualizarUsuario={actualizarUsuario}
                guardarUsuarioActual={guardarUsuarioActual}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default TableUsers;
