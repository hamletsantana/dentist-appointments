import React, { useState, useEffect } from "react";
import NavBar from "../../../../../Components/NavBar/navBar";
import { Form, Row, Col, Button } from "react-bootstrap";
import "./fase-mantenimiento.css"; // Import CSS for endodonciaMolarPage'
import postApiLinkGet from "../../../../../API/api-get-request";
import unibe from "../../../../../Images/logo_unibe.png";
import { useNavigate } from "react-router-dom";

const PeriodonciaFaseMantenimiento = () => {
  const navigate = useNavigate();
  const [
    PeriodonciaFaseMantenimientoData,
    setPeriodonciaFaseMantenimientoData,
  ] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFormIndex, setShowFormIndex] = useState(null);
  const [formData, setFormData] = useState({
    fecha: "", // Add this field
    cedula: "",
    matriculaEstudiante_periodoncia_mantenimiento: "",
    nombreEstudiante_periodoncia_mantenimiento: "",
    apellidoEstudiante_periodoncia_mantenimiento: "",
  });

  useEffect(() => {
    console.log("Fetching data...");
    fetch(postApiLinkGet + "?type=periodoncia_mantenimiento")
      .then((response) => response.json())

      .then((data) => {
        console.log("Fetched data:", data);
        setPeriodonciaFaseMantenimientoData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const toggleItem = (index) => {
    // Close the "Asignar" dropdown if it's open
    if (showFormIndex === index) {
      setShowFormIndex(null);
    }
    // Toggle the "Detalles" dropdown
    setSelectedItemIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const toggleForm = (index) => {
    const item = PeriodonciaFaseMantenimientoData[index];

    // Close the "Detalles" dropdown if it's open
    if (selectedItemIndex === index) {
      setSelectedItemIndex(null);
    }

    // Toggle the "Asignar" dropdown
    setShowFormIndex((prevIndex) => (prevIndex === index ? null : index));
    if (showFormIndex !== index) {
      setFormData({
        cedula: item.cedula.S, // Ensure this is correct
        fecha: item.fecha.S, // Ensure this is correct
        matriculaEstudiante_periodoncia_mantenimiento: "",
        nombreEstudiante_periodoncia_mantenimiento: "",
        apellidoEstudiante_periodoncia_mantenimiento: "",
      });
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for empty fields
    if (
      formData.matriculaEstudiante_periodoncia_mantenimiento.trim() === "" ||
      formData.nombreEstudiante_periodoncia_mantenimiento.trim() === "" ||
      formData.apellidoEstudiante_periodoncia_mantenimiento.trim() === ""
    ) {
      alert("Por favor, complete todos los campos antes de enviar.");
      return;
    }

    // Validation for nombreEstudiante and apellidoEstudiante (only letters)
    const nameRegex = /^[a-zA-Z\s]*$/;
    if (
      !nameRegex.test(formData.nombreEstudiante_periodoncia_mantenimiento) ||
      !nameRegex.test(formData.apellidoEstudiante_periodoncia_mantenimiento)
    ) {
      alert("El nombre y el apellido deben contener solo letras.");
      return;
    }

    // Validation for matriculaEstudiante (only numbers and dashes)
    const matriculaRegex = /^[0-9]{2}-[0-9]{4}$/;
    if (
      !matriculaRegex.test(
        formData.matriculaEstudiante_periodoncia_mantenimiento
      )
    ) {
      alert(
        "La matrícula debe contener 2 números, un guión, y luego 4 números, sin espacios."
      );
      return;
    }

    // If all validations pass, proceed with form submission
    fetch(
      "https://3lmv2y6pmb.execute-api.us-east-1.amazonaws.com/development/dentist-appointment-update-request",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          pageType: "periodoncia_mantenimiento", // Change to appropriate page type based on the page
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(
              `Network response was not ok: ${JSON.stringify(data)}`
            );
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Updated data:", data);
        // Optionally update the local state or refetch data if necessary
        //window.location.reload();
        navigate("/triaje");
        alert(
          `El estudiante fue exitosamente asignado al paciente en Periodoncia Fase Mantenimiento`
        );
      })
      .catch((error) => console.error("Error updating data:", error));
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
      <NavBar />
      <div className="PacientesProcedimientos">
        <h1>Pacientes Periodontales en Mantenimiento</h1>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />
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
            {PeriodonciaFaseMantenimientoData.map((item, index) => {
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

              if (!searchQuery || codigoMatch || nombreMatch || apellidoMatch) {
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
                        {item.edadPaciente.S && formatDate(item.edadPaciente.S)}
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
                        {item.matriculaEstudiante_periodoncia_mantenimiento.S ||
                        item.nombreEstudiante_periodoncia_mantenimiento.S ||
                        item.apellidoEstudiante_periodoncia_mantenimiento.S ? (
                          <button
                            className="asignadoPacientes"
                            onClick={() =>
                              alert(
                                `El estudiante ${item.nombreEstudiante_periodoncia_mantenimiento.S} ${item.apellidoEstudiante_periodoncia_mantenimiento.S} de matrícula ${item.matriculaEstudiante_periodoncia_mantenimiento.S} ya fue asignado a este paciente previamente`
                              )
                            }
                          >
                            Asignado
                          </button>
                        ) : (
                          <button
                            className="asignarPacientes"
                            onClick={() => toggleForm(index)}
                          >
                            Asignar
                          </button>
                        )}
                      </td>
                    </tr>
                    {selectedItemIndex === index && (
                      <tr>
                        <td colSpan="8">
                          <div className="additional-info">
                            <div className="attribute">
                              <strong>Fecha:</strong>{" "}
                              {item.fecha.S && formatDate(item.fecha.S)}
                            </div>
                            <div className="attribute">
                              <strong>Código:</strong> {item.cedula.S}
                            </div>
                            <div className="attribute">
                              <strong>Nombre:</strong> {item.nombrePaciente.S}
                            </div>
                            <div className="attribute">
                              <strong>Apellido:</strong>{" "}
                              {item.apellidoPaciente.S}
                            </div>
                            <div className="attribute">
                              <strong>Fecha de Nacimiento:</strong>{" "}
                              {item.edadPaciente.S &&
                                formatDate(item.edadPaciente.S)}
                            </div>
                            <div className="attribute">
                              <strong>Dirección:</strong>{" "}
                              {item.direccionPaciente.S}
                            </div>
                            <div className="attribute">
                              <strong>Teléfono:</strong>{" "}
                              {item.telefonoPaciente.S.replace(
                                /(\d{3})(\d{3})(\d{4})/,
                                "$1-$2-$3"
                              )}
                            </div>
                            <div className="attribute" style={{ color: "red" }}>
                              <strong style={{ color: "#333" }}>
                                Alertas Médicas:
                              </strong>{" "}
                              {item.emergenciaMedica.S
                                ? JSON.parse(item.emergenciaMedica.S).join(", ")
                                : "N/A"}
                            </div>
                            <div className="attribute">
                              <strong>Estudiante Asignado al Paciente</strong>{" "}
                            </div>
                            <div className="attribute">
                              <strong>- Matrícula:</strong>{" "}
                              {item
                                .matriculaEstudiante_periodoncia_mantenimiento
                                .S || "N/A"}
                            </div>
                            <div className="attribute">
                              <strong>- Nombre:</strong>{" "}
                              {item.nombreEstudiante_periodoncia_mantenimiento
                                .S || "N/A"}{" "}
                              {
                                item
                                  .apellidoEstudiante_periodoncia_mantenimiento
                                  .S
                              }
                            </div>
                            <div className="attribute">
                              <strong>
                                ¿Paciente dado de alta en su tratamiento
                                quirúrgico/no quirúrgico, necesita una fase de
                                mantenimiento?
                              </strong>{" "}
                              {
                                item.procedimientos?.M?.periodoncia?.M
                                  ?.periodoncia_mantenimiento?.S
                              }
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                    {showFormIndex === index && (
                      <tr>
                        <td colSpan="8">
                          <div className="form-container">
                            <Form
                              onSubmit={handleSubmit}
                              style={{
                                backgroundColor: "#f8f9fa",
                                padding: "10px",
                                marginTop: "5px",
                              }}
                            >
                              <Row className="form-row">
                                <Col lg="5">
                                  <Form.Group controlId="formMatriculaEstudiante">
                                    <Form.Label>
                                      Matrícula del Estudiante
                                    </Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Matrícula del Estudiante"
                                      value={
                                        formData.matriculaEstudiante_periodoncia_mantenimiento
                                      }
                                      name="matriculaEstudiante_periodoncia_mantenimiento"
                                      onChange={handleChange}
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>
                              <Row className="form-row">
                                <Col lg="5">
                                  <Form.Group controlId="formNombreEstudiante">
                                    <Form.Label>
                                      Nombre del Estudiante
                                    </Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Nombre del Estudiante"
                                      value={
                                        formData.nombreEstudiante_periodoncia_mantenimiento
                                      }
                                      name="nombreEstudiante_periodoncia_mantenimiento"
                                      onChange={handleChange}
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>
                              <Row className="form-row">
                                <Col lg="5">
                                  <Form.Group controlId="formApellidoEstudiante">
                                    <Form.Label>
                                      Apellido del Estudiante
                                    </Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Apellido del Estudiante"
                                      value={
                                        formData.apellidoEstudiante_periodoncia_mantenimiento
                                      }
                                      name="apellidoEstudiante_periodoncia_mantenimiento"
                                      onChange={handleChange}
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>
                              <Button
                                variant="primary"
                                type="submit"
                                className="asignarEstudiante"
                              >
                                Asignar Estudiante
                              </Button>
                            </Form>
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
      <div className="CopyrightUnibe">
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
    </>
  );
};

export default PeriodonciaFaseMantenimiento;
