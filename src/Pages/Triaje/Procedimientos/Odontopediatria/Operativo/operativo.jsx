import React, { useState, useEffect } from "react";
import NavBar from "../../../../../Components/NavBar/navBar";
import "./operativo.css"; // Import CSS for endodonciaMolarPage'
import postApiLinkGet from "../../../../../API/api-get-request";

const Operativo = () => {
  const [odontopediatriaOperativoData, setodontopediatriaOperativoData] =
    useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching data...");
    fetch(postApiLinkGet + "?type=odontopediatria_operatorio")
      .then((response) => response.json())

      .then((data) => {
        console.log("Fetched data:", data);
        setodontopediatriaOperativoData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar></NavBar>
      <div className="PacientesodontopediatriaOperativo">
        <h1>Pacientes en Odontopediatria Operativo</h1>
        <table>
          <thead>
            <tr>
              <th>Cédula</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Fecha de Nacimiento</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Emergencia Médica</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {odontopediatriaOperativoData.map((item, index) => (
              <tr key={index}>
                <td>{item.cedula.S}</td>
                <td>{item.nombrePaciente.S}</td>
                <td>{item.apellidoPaciente.S}</td>
                <td>{item.edadPaciente.S}</td>
                <td>{item.direccionPaciente.S}</td>
                <td>{item.telefonoPaciente.S}</td>
                <td>{item.emergenciaMedica.S}</td>
                {/* Add more table cells as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Operativo;
