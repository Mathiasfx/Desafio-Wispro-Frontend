import React, { useState, useContext, useEffect } from "react";
import AlertaContext from "../../context/alerta/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

const NuevoUser = (props) => {
  //extrayendo valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario } = authContext;

  //Usuario registrado o duplicado
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
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });
  //Extraer
  const { nombre, email, password, confirmar } = usuario;

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
    //Validacion campos vacios
    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar.trim() === ""
    ) {
      mostrarAlerta("Todos los campos son Obligatorios", "alerta-error");
      return;
    }

    //password minimo 6 chart
    if (password.length < 6) {
      mostrarAlerta(
        "El password debe ser de al menos 6 caracteres",
        "alerta-error"
      );
      return;
    }

    //Comprobar password Iguales
    if (password !== confirmar) {
      mostrarAlerta("No coincide las contraseñas", "alerta-error");
      return;
    }

    //Registrar Usuario
    mostrarAlerta("Registro Exitoso", "alerta-ok");
    registrarUsuario({ nombre, email, password });
  };
  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}

      <div className="contenedor-form sombra-dark">
        <h1>Registrar Nuevo User</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu Nombre"
              onChange={onChange}
              value={nombre}
            />
          </div>
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
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu Contraseña"
              onChange={onChange}
              value={password}
              autoComplete="on"
            />
          </div>
          <div className="campo-form">
            <label htmlFor="confirmar">Confirmar contraseña</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Confirma tu Contraseña"
              onChange={onChange}
              value={confirmar}
              autoComplete="on"
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              value="Registrarse"
              className="boton boton-primario boton-block"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevoUser;
