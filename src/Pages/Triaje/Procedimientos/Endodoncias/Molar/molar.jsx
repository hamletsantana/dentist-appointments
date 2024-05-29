import React, { useState, useEffect } from "react";
import NavBar from "../../../../../Components/NavBar/navBar";
import "./molar.css"; // Import CSS for endodonciaMolarPage'
import postApiLinkGet from "../../../../../API/api-get-request";

const Molar = () => {
  const [endodonciaMolarData, setendodonciaMolarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  useEffect(() => {
    console.log("Fetching data...");
    fetch(postApiLinkGet + "?type=endodoncia_molar")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setendodonciaMolarData(data);
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

  // Values to include in the filter
  const includedValues = [
    "1",
    "2",
    "3",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "30",
    "31",
    "32",
  ];
  return (
    <>
      <NavBar></NavBar>
      <div className="PacientesendodonciaMolar">
        <h1>Pacientes en Endodoncia Molar</h1>
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Fecha de Nacimiento</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Emergencia Médica</th>
              <th></th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {endodonciaMolarData.map((item, index) => (
              <React.Fragment key={index}>
                <tr key={index}>
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
                          <strong>Código:</strong> {item.cedula.S}
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
                            Dientes donde el paciente presenta sintomatología
                            dolorosa o inflamación:
                          </strong>
                          <ul>
                            {item.procedimientos?.M?.endodoncia?.M?.dientes
                              ?.L ? (
                              item.procedimientos.M.endodoncia.M.dientes.L.filter(
                                (diente) => includedValues.includes(diente.S)
                              ).map((diente, i) => <li key={i}>{diente.S}</li>)
                            ) : (
                              <li>No data available</li>
                            )}
                          </ul>
                        </div>
                        <div className="attribute">
                          <strong>
                            ¿El paciente presenta sintomatología dolorosa? Frío?
                          </strong>{" "}
                          {
                            item.procedimientos?.M?.endodoncia?.M
                              ?.endodoncia_frio?.S
                          }
                        </div>
                        <div className="attribute">
                          <strong>
                            ¿El paciente presenta sintomatología dolorosa?
                            Calor?
                          </strong>{" "}
                          {
                            item.procedimientos?.M?.endodoncia?.M
                              ?.endodoncia_calor?.S
                          }
                        </div>
                        <div className="attribute">
                          <strong>
                            ¿El paciente presenta sintomatología dolorosa?
                            Masticación?
                          </strong>{" "}
                          {
                            item.procedimientos?.M?.endodoncia?.M
                              ?.endodoncia_masticacion?.S
                          }
                        </div>
                        <div className="attribute">
                          <strong>
                            ¿El paciente presenta sintomatología dolorosa?
                            Palpación?
                          </strong>{" "}
                          {
                            item.procedimientos?.M?.endodoncia?.M
                              ?.endodoncia_palpacion?.S
                          }
                        </div>
                        <div className="attribute">
                          <strong>
                            ¿El paciente presenta sintomatología dolorosa?
                            Percusión?
                          </strong>{" "}
                          {
                            item.procedimientos?.M?.endodoncia?.M
                              ?.endodoncia_percusion?.S
                          }
                        </div>
                        <div className="attribute">
                          <strong>¿El paciente está inflamado?</strong>{" "}
                          {
                            item.procedimientos?.M?.endodoncia?.M
                              ?.paciente_inflamado?.S
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

export default Molar;
