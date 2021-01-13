import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import NuevoUser from "./components/auth/NuevoUser";
import Dashboard from "./components/dashboard/Dashboard";
import AlertaState from "./context/alerta/alertaState";
import AuthState from "./context/autenticacion/authState";
import UsuarioState from "./context/usuarios/usuarioState";
import VistaState from "./context/vista_activa/vistaState";
import SesionesState from "./context/sesiones/sesionesState";
import tokenAuth from "./config/tokenAuth";
import RutaPrivada from "./components/rutas/rutaprivada";

//Revisar si tenemos un token

const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <SesionesState>
      <VistaState>
        <UsuarioState>
          <AlertaState>
            <AuthState>
              <Router>
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/nuevo-user" component={NuevoUser} />
                  <RutaPrivada exact path="/dashboard" component={Dashboard} />
                </Switch>
              </Router>
            </AuthState>
          </AlertaState>
        </UsuarioState>
      </VistaState>
    </SesionesState>
  );
}

export default App;
