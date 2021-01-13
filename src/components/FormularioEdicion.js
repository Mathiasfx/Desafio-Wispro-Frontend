import React, { Fragment, useState, useContext, useEffect } from "react";
import UsuarioContext from "../context/usuarios/usuarioContext";
import AlertaContext from "../context/alerta/alertaContext";

const FormularioEdicion = () => {
  //extrayebndo props de usuarios
  const usuarioContext = useContext(UsuarioContext);
  const {
    error,
    usuarioSeleccionado,
    validarEdicion,
    actualizarUsuario,
  } = usuarioContext;
  //extrayendo valores del context
  const alertaContext = useContext(AlertaContext);
  const { mostrarAlerta } = alertaContext;

  //State de Formulario
  const [usuarioform, guardarusuario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });

  useEffect(() => {
    if (usuarioSeleccionado !== null) {
      guardarusuario(usuarioSeleccionado);
    } else {
      guardarusuario({
        nombre: "",
        email: "",
        password: "",
        confirmar: "",
      });
    } //eslint-disable-next-line
  }, [usuarioSeleccionado]);

  const { nombre, email, password, confirmar } = usuarioform;

  const handleChangue = (e) => {
    guardarusuario({
      ...usuarioform,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //validar
    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.length < 6 ||
      confirmar !== password
    ) {
      validarEdicion();
      return;
    }

    mostrarAlerta("Edicion Exitosa", "alerta-ok");

    actualizarUsuario(usuarioform);
    //
  };

  return (
    <Fragment>
      {error === true ? (
        <div className="alerta alerta-error">
          Verifica los Datos, password debe ser mayor a 6 caracteres
        </div>
      ) : null}
      <form onSubmit={onSubmit}>
        <div className="campo-form">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre.."
            value={nombre}
            onChange={handleChangue}
          />
        </div>
        <div className="campo-form">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email..."
            value={email}
            onChange={handleChangue}
          />
        </div>
        <div className="campo-form">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChangue}
            autoComplete="on"
          />
        </div>
        <div className="campo-form">
          <label htmlFor="confirmar">Confirmar contraseña</label>
          <input
            type="password"
            id="confirmar"
            name="confirmar"
            placeholder="Password"
            value={confirmar}
            onChange={handleChangue}
            autoComplete="on"
          />
        </div>
        <div className="campo-form">
          <input
            type="submit"
            value="Editar Usuario"
            className="boton boton-primario boton-block"
          />
        </div>
      </form>
    </Fragment>
  );
};

export default FormularioEdicion;
