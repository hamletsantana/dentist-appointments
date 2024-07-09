import React, { useState, useEffect } from "react";
import "./buscar-pacientes.css"; // Import CSS file
import { useNavigate, Link } from "react-router-dom";
import Authenticate from "../../Components/Authenticator/authenticator";
import unibe from "../../Images/logo_unibe.png";

function BuscarPacientes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pacientesData, setpacientesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const handleClickDashboard = () => {
    navigate("/inicio");
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
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="BuscarPacientes">
        <div className="Encabezado">
          <Link to="/inicio">
            <img src={unibe} alt="UNIBE Logo" className="logo" />
          </Link>
          <div className="EncabezadoDerecha">
            <button
              className="buttonDashboardCuestionario"
              onClick={handleClickDashboard}
            >
              Página Principal
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
                  <th>Alertas Médicas</th>
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
                          <td>
                            {item.edadPaciente.S &&
                              formatDate(item.edadPaciente.S)}
                          </td>

                          <td>{item.direccionPaciente.S}</td>
                          <td>
                            {item.telefonoPaciente.S.replace(
                              /(\d{3})(\d{3})(\d{4})/,
                              "$1-$2-$3"
                            )}
                          </td>
                          <td style={{ color: "red" }}>
                            {item.emergenciaMedica.S &&
                              JSON.parse(item.emergenciaMedica.S).join(", ")}
                          </td>
                          <td>
                            <button
                              className="detallesPacientes"
                              onClick={() => toggleItem(index)}
                            >
                              Detalles
                            </button>
                            {(item.matriculaEstudiante_cirugia?.S &&
                              item.nombreEstudiante_cirugia?.S &&
                              item.apellidoEstudiante_cirugia?.S) ||
                            (item.matriculaEstudiante_endodoncia_preMolar?.S &&
                              item.nombreEstudiante_endodoncia_preMolar?.S &&
                              item.apellidoEstudiante_endodoncia_preMolar?.S) ||
                            (item.matriculaEstudiante_restauraciones?.S &&
                              item.nombreEstudiante_restauraciones?.S &&
                              item.apellidoEstudiante_restauraciones?.S) ||
                            (item.matriculaEstudiante_endodoncia_molar?.S &&
                              item.nombreEstudiante_endodoncia_molar?.S &&
                              item.apellidoEstudiante_endodoncia_molar?.S) ||
                            (item.matriculaEstudiante_endodoncia_anterior?.S &&
                              item.nombreEstudiante_endodoncia_anterior?.S &&
                              item.apellidoEstudiante_endodoncia_anterior) ||
                            (
                              item.matriculaEstudiante_periodoncia_periodontal
                                ?.S &&
                              item.nombreEstudiante_periodoncia_periodontal
                                ?.S &&
                              item.apellidoEstudiante_periodoncia_periodontal?.S
                            )?.S ||
                            (item.matriculaEstudiante_periodoncia_mantenimiento
                              ?.S &&
                              item.nombreEstudiante_periodoncia_mantenimiento
                                ?.S &&
                              item.apellidoEstudiante_periodoncia_mantenimiento
                                ?.S) ||
                            (item.matriculaEstudiante_ortodoncia_aparato?.S &&
                              item.nombreEstudiante_ortodoncia_aparato?.S &&
                              item.apellidoEstudiante_ortodoncia_aparato?.S) ||
                            (item.matriculaEstudiante_ortodoncia_control?.S &&
                              item.nombreEstudiante_ortodoncia_control?.S &&
                              item.apellidoEstudiante_ortodoncia_control?.S) ||
                            (item.matriculaEstudiante_protesis_fija?.S &&
                              item.nombreEstudiante_protesis_fija?.S &&
                              item.apellidoEstudiante_protesis_fija?.S) ||
                            (item.matriculaEstudiante_protesis_removible?.S &&
                              item.nombreEstudiante_protesis_removible?.S &&
                              item.apellidoEstudiante_protesis_removible?.S) ||
                            (item.matriculaEstudiante_protesis_total?.S &&
                              item.nombreEstudiante_protesis_total?.S &&
                              item.apellidoEstudiante_protesis_total?.S) ||
                            (item.matriculaEstudiante_odontopediatria_control
                              ?.S &&
                              item.nombreEstudiante_odontopediatria_control
                                ?.S &&
                              item.apellidoEstudiante_odontopediatria_control
                                ?.S) ||
                            (item
                              .matriculaEstudiante_odontopediatria_no_operatorio
                              ?.S &&
                              item
                                .nombreEstudiante_odontopediatria_no_operatorio
                                ?.S &&
                              item
                                .apellidoEstudiante_odontopediatria_no_operatorio
                                ?.S) ||
                            (item.matriculaEstudiante_odontopediatria_operatorio
                              ?.S &&
                              item.nombreEstudiante_odontopediatria_operatorio
                                ?.S &&
                              item.apellidoEstudiante_odontopediatria_operatorio
                                ?.S) ? (
                              <button
                                className="asignadoPacientes"
                                onClick={() =>
                                  alert(
                                    "Click en el botón 'detalles', localizado a la izquierda, para ver qué estudiantes están asignados a este paciente y en qué procedimientos a realizar se localizan"
                                  )
                                }
                              >
                                Asignado
                              </button>
                            ) : null}
                          </td>
                        </tr>
                        {selectedItemIndex === index && (
                          <tr>
                            <td colSpan="8">
                              <div className="informacionAdicional1">
                                <div className="above-group">
                                  <div className="attribute">
                                    <strong>Fecha:</strong>{" "}
                                    {item.fecha.S && formatDate(item.fecha.S)}
                                  </div>
                                  <br></br>
                                  <div className="attribute">
                                    <strong>Código:</strong> {item.cedula.S}
                                  </div>
                                  <br></br>
                                  <div
                                    className="atributoAlertaMedicaBuscaPacientes"
                                    style={{ color: "red" }}
                                  >
                                    <strong style={{ color: "#333" }}>
                                      Alertas Médicas:
                                    </strong>{" "}
                                    {item.emergenciaMedica.S &&
                                      JSON.parse(item.emergenciaMedica.S).join(
                                        ", "
                                      )}
                                  </div>
                                  <br></br>
                                  <div className="attribute">
                                    <strong>
                                      Procedimientos a ser Realizados
                                    </strong>{" "}
                                  </div>
                                </div>

                                <div className="group-containers">
                                  <div className="group">
                                    <div className="atributo">
                                      <Link
                                        to="/triaje/cirugias"
                                        className="LinkBuscarPacientes"
                                      >
                                        <strong>
                                          Cirugía: {item.cirugia_check.S}
                                        </strong>
                                      </Link>
                                    </div>
                                    <div className="atributo">
                                      - Asignado al estudiante:{" "}
                                      {item.nombreEstudiante_cirugia.S || "N/A"}{" "}
                                      {item.apellidoEstudiante_cirugia.S}
                                    </div>
                                    <div className="atributo">
                                      - Matrícula:{" "}
                                      {item.matriculaEstudiante_cirugia.S ||
                                        "N/A"}
                                    </div>
                                  </div>
                                  <div className="group">
                                    <div className="atributo">
                                      <Link
                                        to="/triaje/restauraciones"
                                        className="LinkBuscarPacientes"
                                      >
                                        <strong>
                                          Restauraciones:{" "}
                                          {item.restauracion_check.S}
                                        </strong>
                                      </Link>
                                    </div>
                                    <div className="atributo">
                                      - Asignado al estudiante:{" "}
                                      {item.nombreEstudiante_restauraciones.S ||
                                        "N/A"}{" "}
                                      {item.apellidoEstudiante_restauraciones.S}
                                    </div>
                                    <div className="atributo">
                                      - Matrícula:{" "}
                                      {item.matriculaEstudiante_restauraciones
                                        .S || "N/A"}
                                    </div>
                                  </div>
                                  <div className="group">
                                    <div className="atributo">
                                      <Link
                                        to="/triaje/endodoncias/anterior"
                                        className="LinkBuscarPacientes"
                                      >
                                        <strong>
                                          Endodoncia Anterior:{" "}
                                          {item.endodoncia_anterior_check.S}
                                        </strong>
                                      </Link>
                                    </div>
                                    <div className="atributo">
                                      - Asignado al estudiante:{" "}
                                      {item.nombreEstudiante_endodoncia_anterior
                                        .S || "N/A"}{" "}
                                      {
                                        item
                                          .apellidoEstudiante_endodoncia_anterior
                                          .S
                                      }
                                    </div>
                                    <div className="atributo">
                                      - Matrícula:{" "}
                                      {item
                                        .matriculaEstudiante_endodoncia_anterior
                                        .S || "N/A"}
                                    </div>
                                  </div>
                                  <div className="group">
                                    <div className="atributo">
                                      <Link
                                        to="/triaje/endodoncias/molar"
                                        className="LinkBuscarPacientes"
                                      >
                                        <strong>
                                          Endodoncia Molar:{" "}
                                          {item.endodoncia_molar_check.S}
                                        </strong>
                                      </Link>
                                    </div>
                                    <div className="atributo">
                                      - Asignado al estudiante:{" "}
                                      {item.nombreEstudiante_endodoncia_molar
                                        .S || "N/A"}{" "}
                                      {
                                        item.apellidoEstudiante_endodoncia_molar
                                          .S
                                      }
                                    </div>
                                    <div className="atributo">
                                      - Matrícula:{" "}
                                      {item.matriculaEstudiante_endodoncia_molar
                                        .S || "N/A"}
                                    </div>
                                  </div>
                                  <div className="group">
                                    <div className="atributo">
                                      <Link
                                        to="/triaje/endodoncias/pre-molar"
                                        className="LinkBuscarPacientes"
                                      >
                                        <strong>
                                          Endodoncia Premolar:{" "}
                                          {item.endodoncia_preMolar_check.S}
                                        </strong>
                                      </Link>
                                    </div>
                                    <div className="atributo">
                                      - Asignado al estudiante:{" "}
                                      {item.nombreEstudiante_endodoncia_preMolar
                                        .S || "N/A"}{" "}
                                      {
                                        item
                                          .apellidoEstudiante_endodoncia_preMolar
                                          .S
                                      }
                                    </div>
                                    <div className="atributo">
                                      - Matrícula:{" "}
                                      {item
                                        .matriculaEstudiante_endodoncia_preMolar
                                        .S || "N/A"}
                                    </div>
                                  </div>
                                  <div className="group">
                                    <div className="atributo">
                                      <Link
                                        to="/triaje/odontopediatria/operatorio"
                                        className="LinkBuscarPacientes"
                                      >
                                        <strong>
                                          Odontopediatría Operatorio:{" "}
                                          {
                                            item
                                              .odontopediatria_operatorio_check
                                              .S
                                          }
                                        </strong>
                                      </Link>
                                    </div>
                                    <div className="atributo">
                                      - Asignado al estudiante:{" "}
                                      {item
                                        .nombreEstudiante_odontopediatria_operatorio
                                        .S || "N/A"}{" "}
                                      {
                                        item
                                          .apellidoEstudiante_odontopediatria_operatorio
                                          .S
                                      }
                                    </div>
                                    <div className="atributo">
                                      - Matrícula:{" "}
                                      {item
                                        .matriculaEstudiante_odontopediatria_operatorio
                                        .S || "N/A"}
                                    </div>
                                  </div>
                                  <div className="group">
                                    <div className="atributo">
                                      <Link
                                        to="/triaje/odontopediatria/no-operatorio"
                                        className="LinkBuscarPacientes"
                                      >
                                        <strong>
                                          Odontopediatría No Operatorio:{" "}
                                          {
                                            item
                                              .odontopediatria_NoOperatorio_check
                                              .S
                                          }
                                        </strong>
                                      </Link>
                                    </div>
                                    <div className="atributo">
                                      - Asignado al estudiante:{" "}
                                      {item
                                        .nombreEstudiante_odontopediatria_no_operatorio
                                        .S || "N/A"}{" "}
                                      {
                                        item
                                          .apellidoEstudiante_odontopediatria_no_operatorio
                                          .S
                                      }
                                    </div>
                                    <div className="atributo">
                                      - Matrícula:{" "}
                                      {item
                                        .matriculaEstudiante_odontopediatria_no_operatorio
                                        .S || "N/A"}
                                    </div>
                                  </div>
                                  <div className="group">
                                    <div className="atributo">
                                      <Link
                                        to="/triaje/odontopediatria/control"
                                        className="LinkBuscarPacientes"
                                      >
                                        <strong>
                                          Odontopediatría Control:{" "}
                                          {item.odontopediatria_control_check.S}
                                        </strong>
                                      </Link>
                                    </div>
                                    <div className="atributo">
                                      - Asignado al estudiante:{" "}
                                      {item
                                        .nombreEstudiante_odontopediatria_control
                                        .S || "N/A"}{" "}
                                      {
                                        item
                                          .apellidoEstudiante_odontopediatria_control
                                          .S
                                      }
                                    </div>
                                    <div className="atributo">
                                      - Matrícula:{" "}
                                      {item
                                        .matriculaEstudiante_odontopediatria_control
                                        .S || "N/A"}
                                    </div>
                                  </div>
                                  <div className="group">
                                    <div className="atributo">
                                      <Link
                                        to="/triaje/protesis/total"
                                        className="LinkBuscarPacientes"
                                      >
                                        <strong>
                                          Prótesis Total:{" "}
                                          {item.protesis_total_check.S}
                                        </strong>
                                      </Link>
                                    </div>
                                    <div className="atributo">
                                      - Asignado al estudiante:{" "}
                                      {item.nombreEstudiante_protesis_total.S ||
                                        "N/A"}{" "}
                                      {item.apellidoEstudiante_protesis_total.S}
                                    </div>
                                    <div className="atributo">
                                      - Matrícula:{" "}
                                      {item.matriculaEstudiante_protesis_total
                                        .S || "N/A"}
                                    </div>
                                  </div>
                                  <div className="group">
                                    <div className="atributo">
                                      <Link
                                        to="/triaje/protesis/removible"
                                        className="LinkBuscarPacientes"
                                      >
                                        <strong>
                                          Prótesis Removible:{" "}
                                          {item.protesis_removible_check.S}
                                        </strong>
                                      </Link>
                                    </div>
                                    <div className="atributo">
                                      - Asignado al estudiante:{" "}
                                      {item.nombreEstudiante_protesis_removible
                                        .S || "N/A"}{" "}
                                      {
                                        item
                                          .apellidoEstudiante_protesis_removible
                                          .S
                                      }
                                    </div>
                                    <div className="atributo">
                                      - Matrícula:{" "}
                                      {item
                                        .matriculaEstudiante_protesis_removible
                                        .S || "N/A"}
                                    </div>
                                  </div>
                                  <div className="group">
                                    <div className="atributo">
                                      <Link
                                        to="/triaje/protesis/fija"
                                        className="LinkBuscarPacientes"
                                      >
                                        <strong>
                                          Prótesis Fija:{" "}
                                          {item.protesis_fija_check.S}
                                        </strong>
                                      </Link>
                                    </div>
                                    <div className="atributo">
                                      - Asignado al estudiante:{" "}
                                      {item.nombreEstudiante_protesis_fija.S ||
                                        "N/A"}{" "}
                                      {item.apellidoEstudiante_protesis_fija.S}
                                    </div>
                                    <div className="atributo">
                                      - Matrícula:{" "}
                                      {item.matriculaEstudiante_protesis_fija
                                        .S || "N/A"}
                                    </div>
                                  </div>
                                  <div className="group">
                                    <div className="atributo">
                                      <Link
                                        to="/triaje/ortodoncia/aparato"
                                        className="LinkBuscarPacientes"
                                      >
                                        <strong>
                                          Ortodoncia Aparato:{" "}
                                          {item.ortodoncia_aparato_check.S}
                                        </strong>
                                      </Link>
                                    </div>
                                    <div className="atributo">
                                      - Asignado al estudiante:{" "}
                                      {item.nombreEstudiante_ortodoncia_aparato
                                        .S || "N/A"}{" "}
                                      {
                                        item
                                          .apellidoEstudiante_ortodoncia_aparato
                                          .S
                                      }
                                    </div>
                                    <div className="atributo">
                                      - Matrícula:{" "}
                                      {item
                                        .matriculaEstudiante_ortodoncia_aparato
                                        .S || "N/A"}
                                    </div>
                                  </div>
                                  <div className="group">
                                    <div className="atributo">
                                      <Link
                                        to="/triaje/ortodoncia/control"
                                        className="LinkBuscarPacientes"
                                      >
                                        <strong>
                                          Ortodoncia Control:{" "}
                                          {item.ortodoncia_control_check.S}
                                        </strong>
                                      </Link>
                                    </div>
                                    <div className="atributo">
                                      - Asignado al estudiante:{" "}
                                      {item.nombreEstudiante_ortodoncia_control
                                        .S || "N/A"}{" "}
                                      {
                                        item
                                          .apellidoEstudiante_ortodoncia_control
                                          .S
                                      }
                                    </div>
                                    <div className="atributo">
                                      - Matrícula:{" "}
                                      {item
                                        .matriculaEstudiante_ortodoncia_control
                                        .S || "N/A"}
                                    </div>
                                  </div>
                                  <div className="group">
                                    <div className="atributo">
                                      <Link
                                        to="/triaje/periodoncia/periodontal"
                                        className="LinkBuscarPacientes"
                                      >
                                        <strong>
                                          Periodoncia Periodontal:{" "}
                                          {item.paciente_periodontal_check.S}
                                        </strong>
                                      </Link>
                                    </div>
                                    <div className="atributo">
                                      - Asignado al estudiante:{" "}
                                      {item
                                        .nombreEstudiante_periodoncia_periodontal
                                        .S || "N/A"}{" "}
                                      {
                                        item
                                          .apellidoEstudiante_periodoncia_periodontal
                                          .S
                                      }
                                    </div>
                                    <div className="atributo">
                                      - Matrícula:{" "}
                                      {item
                                        .matriculaEstudiante_periodoncia_periodontal
                                        .S || "N/A"}
                                    </div>
                                  </div>
                                  <div className="group">
                                    <div className="atributo">
                                      <Link
                                        to="/triaje/periodoncia/fase-mantenimiento"
                                        className="LinkBuscarPacientes"
                                      >
                                        <strong>
                                          Periodoncia Mantenimiento:{" "}
                                          {
                                            item.periodoncia_mantenimiento_check
                                              .S
                                          }
                                        </strong>
                                      </Link>
                                    </div>
                                    <div className="atributo">
                                      - Asignado al estudiante:{" "}
                                      {item
                                        .nombreEstudiante_periodoncia_mantenimiento
                                        .S || "N/A"}{" "}
                                      {
                                        item
                                          .apellidoEstudiante_periodoncia_mantenimiento
                                          .S
                                      }
                                    </div>
                                    <div className="atributo">
                                      - Matrícula:{" "}
                                      {item
                                        .matriculaEstudiante_periodoncia_mantenimiento
                                        .S || "N/A"}
                                    </div>
                                  </div>
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
          <div className="CopyrightUnibeBuscar">
            <img src={unibe} alt="UNIBE Logo" className="logo_pequeño" />
            <p>
              &copy; 2024 Facultad de Odontología UNIBE. Reservados todos los
              derechos.
              <br></br>Desarrollado por{" "}
              <a
                className="LinkedIn"
                target="_blank"
                href="https://www.linkedin.com/in/brian-scannell-5880261ba/"
              >
                Brian Scannell,
              </a>{" "}
              Omar García y{" "}
              <a
                className="LinkedIn"
                target="_blank"
                href="https://www.linkedin.com/in/hamlet-santana-620b511b2/"
              >
                Hamlet Santana
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default BuscarPacientes;
