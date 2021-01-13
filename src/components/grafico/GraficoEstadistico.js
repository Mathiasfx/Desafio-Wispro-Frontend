import React, { useState, useContext, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import AlertaContext from "../../context/alerta/alertaContext";
import SesionesContext from "../../context/sesiones/sesionesContext";

const GraficoEstadistico = () => {
  //extraer valores del alerta
  const alertaContext = useContext(AlertaContext);
  const { mostrarAlerta } = alertaContext;

  const sesionesContext = useContext(SesionesContext);
  const { datosSesiones, mostrarSesiones } = sesionesContext;

  //Datos del Grafico
  const [Estadistica, setEstadistica] = useState({});

  //Cargo Datos UsueEffect
  useEffect(() => {
    mostrarSesiones();
    if (!datosSesiones) {
      mostrarAlerta("Hubo un Error en el Servidor", "alerta-error");
    }
    setEstadistica({
      labels: [
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
        "Domingo",
      ],
      datasets: [
        {
          label: "Inicios de Sesion ",
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: datosSesiones,
        },
      ],
    });

    //eslint-disable-next-line
  }, [datosSesiones]);

  return (
    <div>
      <Bar
        data={Estadistica}
        options={{
          title: {
            display: true,
            text: "Inicio de Sesion por Día del Mes de Enero 2021",
            fontSize: 22,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
};

export default GraficoEstadistico;
