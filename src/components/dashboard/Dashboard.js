import React, { Fragment, useContext, useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import TableUsers from "../TableUsers";
import Header from "../layout/Header";
import GraficoEstadistico from "../grafico/GraficoEstadistico";
import AuthContext from "../../context/autenticacion/authContext";
import FormularioEdicion from "../../components/FormularioEdicion";
import UsuarioContext from "../../context/usuarios/usuarioContext";
import VistaContext from "../../context/vista_activa/vistaContext";

const Dashboard = () => {
  //extraer informacion de autenticacion
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado } = authContext;

  //extraer Context Vista
  //extrayebndo props de usuarios
  const vistaContext = useContext(VistaContext);
  const { vistaestadistica, vistausuarios } = vistaContext;

  const usuarioContext = useContext(UsuarioContext);
  const { editando, usuario } = usuarioContext;

  //cuando se actualize
  useEffect(() => {
    usuarioAutenticado();
    //eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <div className="contenedor-app">
        <Sidebar />
        <div className="seccion-principal">
          <Header />
          <main>
            <div className="contenedor-usuarios">
              {editando ? <FormularioEdicion usuario={usuario} /> : null}
              {vistausuarios ? <TableUsers /> : null}
              {vistaestadistica ? <GraficoEstadistico /> : null}
            </div>
          </main>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
