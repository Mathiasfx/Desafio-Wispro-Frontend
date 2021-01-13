import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alerta/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

const Login = (props) => {
  //extraer valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext;

  //Verifica password o usuario no exita
  useEffect(() => {
    if (autenticado) {
      props.history.push("/dashboard");
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    //eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

  //State de Inicio de Session
  const [usuario, guardarUsuario] = useState({
    email: "",
    password: "",
  });
  //Extraer
  const { email, password } = usuario;

  //Funcion cuando se rellena el Formulario
  const onChange = (e) => {
    guardarUsuario({
      //copia de usuario
      ...usuario,
      //reescribimos
      [e.target.name]: e.target.value,
    });
  };

  //Funcion de Inicio de Session
  const onSubmit = (e) => {
    e.preventDefault();
    //Validacion
    if (email.trim() === "" || password.trim() === "") {
      mostrarAlerta("Todos los campos son Obligatorios", "alerta-error");
      return;
    }
    //Pasarlo
    iniciarSesion({ email, password });
  };
  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}

      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email"
              onChange={onChange}
              value={email}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu Password"
              onChange={onChange}
              value={password}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              value="Iniciar Sesión"
              className="boton boton-primario boton-block"
            />
          </div>
        </form>
        <Link to={"/nuevo-user"} className="enlace-cuenta">
          Registrarse
        </Link>
      </div>
    </div>
  );
};

export default Login;
