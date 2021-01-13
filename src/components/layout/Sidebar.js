import React, { useContext } from "react";
import VistaContext from "../../context/vista_activa/vistaContext";

const Sidebar = () => {
  //extrayebndo props de usuarios
  const vistaContext = useContext(VistaContext);
  const { ActivarLista, ActivarEstadistica } = vistaContext;

  const mostrarLista = () => {
    ActivarLista();
  };

  const mostrarEstadistica = () => {
    ActivarEstadistica();
  };

  return (
    <aside>
      <h1>Dashboard</h1>
      <div className="usuarios">
        <button
          className="boton boton-primario boton-block p-3 mb-4"
          onClick={mostrarLista}
        >
          Lista de Usuarios
        </button>
        <button
          className="boton boton-primario boton-block p-3 mb-4"
          onClick={mostrarEstadistica}
        >
          Estadisticas
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
