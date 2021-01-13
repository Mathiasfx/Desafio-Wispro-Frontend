import React, { useEffect, useContext } from "react";
import AuthContext from "../../context/autenticacion/authContext";

const Header = () => {
  //extraer informacion de autenticacion
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

  //cuando se actualize
  useEffect(() => {
    usuarioAutenticado();
    //eslint-disable-next-line
  }, []);
  return (
    <header className="app-header">
      {usuario ? (
        <p className="nombre-usuario">
          Hola <span>{usuario.nombre}</span>
        </p>
      ) : null}

      <nav className="nav-principal">
        <button
          className="boton boton-blanck cerrar-sesion"
          onClick={() => cerrarSesion()}
        >
          Cerrar Session
        </button>
      </nav>
    </header>
  );
};

export default Header;
