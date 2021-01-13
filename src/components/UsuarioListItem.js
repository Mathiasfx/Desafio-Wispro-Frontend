import React from "react";

const UsuarioListItem = ({
  usuario,
  EliminarUsuario,
  actualizarUsuario,
  guardarUsuarioActual,
}) => {
  //Funcion para Eliminar
  const Eliminar = () => {
    EliminarUsuario(usuario._id);
  };

  //agrega un usuario actual cuando desee editar
  const selecionarUsuario = (usuario) => {
    guardarUsuarioActual(usuario);
  };
  return (
    <tr>
      <td>{usuario.nombre}</td>
      <td>{usuario.mail}</td>
      <td>
        <button
          type="button"
          className="btn btn-secondary btn-block btn-lg"
          onClick={() => selecionarUsuario(usuario)}
        >
          Editar
        </button>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger btn-block btn-lg"
          onClick={Eliminar}
        >
          Eliminar &times;
        </button>
      </td>
    </tr>
  );
};

export default UsuarioListItem;
