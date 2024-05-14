import React, { useState, useEffect } from "react";
import NavBar from "../../../../../Components/NavBar/navBar";
import "./aparato.css"; // Import CSS for endodonciaMolarPage'
import postApiLinkGet from "../../../../../API/api-get-request";

const OrtodonciaAparato = () => {
  const [OrtodonciaAparatoDataData, setOrtodonciaAparatoDataData] = useState(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching data...");
    fetch(postApiLinkGet + "?type=ortodoncia_aparato")
      .then((response) => response.json())

      .then((data) => {
        console.log("Fetched data:", data);
        setOrtodonciaAparatoDataData(data);
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
      <div className="PacientesOrtodonciaAparatoData">
        <h1>Pacientes en Ortodoncia Aparato</h1>
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
            {OrtodonciaAparatoDataData.map((item, index) => (
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

export default OrtodonciaAparato;
