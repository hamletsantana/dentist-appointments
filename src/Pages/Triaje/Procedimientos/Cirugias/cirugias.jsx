import React, { useState, useEffect } from "react";
import NavBar from "../../../../Components/NavBar/navBar";
import "./cirugias.css"; // Import CSS for CirugiasPage
import postApiLinkGet from "../../../../API/api-get-request";

const Cirugias = () => {
  const [cirugiasData, setCirugiasData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  useEffect(() => {
    console.log("Fetching data...");
    fetch(postApiLinkGet + "?type=cirugia")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setCirugiasData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const toggleItem = (index) => {
    setSelectedItemIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <div className="PacientesCirugia">
        <h1>Pacientes en Cirugía</h1>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cirugiasData.map((item, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td>{item.cedula.S}</td>
                  <td>{item.nombrePaciente.S}</td>
                  <td>{item.apellidoPaciente.S}</td>
                  <td>{item.edadPaciente.S}</td>
                  <td>{item.direccionPaciente.S}</td>
                  <td>{item.telefonoPaciente.S}</td>
                  <td>{item.emergenciaMedica.S}</td>
                  <td>
                    <button
                      className="detallesPacientes"
                      onClick={() => toggleItem(index)}
                    >
                      Detalles
                    </button>
                  </td>
                </tr>
                {selectedItemIndex === index && (
                  <tr>
                    <td colSpan="8">
                      <div className="additional-info">
                        <div className="attribute">
                          <strong>Cédula:</strong> {item.cedula.S}
                        </div>
                        <div className="attribute">
                          <strong>Nombre:</strong> {item.nombrePaciente.S}
                        </div>
                        <div className="attribute">
                          <strong>Apellido:</strong> {item.apellidoPaciente.S}
                        </div>
                        <div className="attribute">
                          <strong>Fecha de Nacimiento:</strong>{" "}
                          {item.edadPaciente.S}
                        </div>
                        <div className="attribute">
                          <strong>Dirección:</strong> {item.direccionPaciente.S}
                        </div>
                        <div className="attribute">
                          <strong>Teléfono:</strong> {item.telefonoPaciente.S}
                        </div>
                        <div className="attribute">
                          <strong>Emergencia Médica:</strong>{" "}
                          {item.emergenciaMedica.S}
                        </div>
                        <div className="attribute">
                          <strong>
                            ¿El paciente presenta dientes con ninguna
                            posibilidad de ser restaurables?
                          </strong>{" "}
                          {
                            item.procedimientos?.M?.cirugia?.M
                              ?.diente_sin_restauracion?.S
                          }
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Cirugias;
