import React, { useState, useEffect } from "react";
import "./buscar-pacientes.css"; // Import CSS file
import { useNavigate } from "react-router-dom";
import Authenticate from "../../Components/Authenticator/authenticator";
import unibe from "../../Images/logo_unibe.png";

function BuscarPacientes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pacientesData, setpacientesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const handleClickDashboard = () => {
    navigate("/dashboard");
  };

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching data...");
    fetch(
      "https://3lmv2y6pmb.execute-api.us-east-1.amazonaws.com/development/dentist-appointments-getAll-requests"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setpacientesData(data);
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="BuscarPacientes">
        <div className="Encabezado">
          <img src={unibe} alt="UNIBE Logo" className="logo" />
          <div className="EncabezadoDerecha">
            <button
              className="buttonDashboardCuestionario"
              onClick={handleClickDashboard}
            >
              Dashboard
            </button>
            <Authenticate />
          </div>
        </div>
        <div className="Pacientes">
          <h1>Pacientes Registrados</h1>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-bar"
          />
          <div className="contenedorPacientes">
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
                </tr>
              </thead>
              <tbody>
                {pacientesData.map((item, index) => {
                  const codigoMatch = item.cedula.S.toLowerCase().startsWith(
                    searchQuery.toLowerCase()
                  );
                  const nombreMatch =
                    item.nombrePaciente.S.toLowerCase().startsWith(
                      searchQuery.toLowerCase()
                    );
                  const apellidoMatch =
                    item.apellidoPaciente.S.toLowerCase().startsWith(
                      searchQuery.toLowerCase()
                    );

                  if (
                    !searchQuery ||
                    codigoMatch ||
                    nombreMatch ||
                    apellidoMatch
                  ) {
                    return (
                      <React.Fragment key={index}>
                        <tr
                          className={
                            selectedItemIndex === index ? "selectedItem" : ""
                          }
                        >
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
                            {item.matriculaEstudiante_cirugia?.S &&
                            item.nombreEstudiante_cirugia?.S &&
                            item.apellidoEstudiante_cirugia?.S ? (
                              <button className="asignadoPacientes">
                                Asignado
                              </button>
                            ) : null}
                          </td>
                        </tr>
                        {selectedItemIndex === index && (
                          <tr>
                            <td colSpan="8">
                              <div className="informacionAdicional">
                                <div className="atributo">
                                  <strong>Código:</strong> {item.cedula.S}
                                </div>
                                <div className="atributo">
                                  <strong>Nombre:</strong>{" "}
                                  {item.nombrePaciente.S}
                                </div>
                                <div className="atributo">
                                  <strong>Apellido:</strong>{" "}
                                  {item.apellidoPaciente.S}
                                </div>
                                <div className="atributo">
                                  <strong>Fecha de Nacimiento:</strong>{" "}
                                  {item.edadPaciente.S}
                                </div>
                                <div className="atributo">
                                  <strong>Dirección:</strong>{" "}
                                  {item.direccionPaciente.S}
                                </div>
                                <div className="atributo">
                                  <strong>Teléfono:</strong>{" "}
                                  {item.telefonoPaciente.S}
                                </div>
                                <div className="atributo">
                                  <strong>Emergencia Médica:</strong>{" "}
                                  {item.emergenciaMedica.S}
                                </div>

                                <div className="atributo">
                                  <strong>Matrícula del Estudiante:</strong>{" "}
                                  {item.matriculaEstudiante_cirugia.S || "N/A"}
                                </div>
                                <div className="atributo">
                                  <strong>Nombre del Estudiante:</strong>{" "}
                                  {item.nombreEstudiante_cirugia.S || "N/A"}
                                </div>
                                <div className="atributo">
                                  <strong>Apellido del Estudiante:</strong>{" "}
                                  {item.apellidoEstudiante_cirugia.S || "N/A"}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default BuscarPacientes;
