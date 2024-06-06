import React, { useState, useEffect } from "react";
import NavBar from "../../../../../Components/NavBar/navBar";
import { Form, Row, Col, Button } from "react-bootstrap";
import "./pre-molar.css"; // Import CSS for endodonciaPreMolarPage'
import unibe from "../../../../../Images/logo_unibe.png";
import postApiLinkGet from "../../../../../API/api-get-request";
import { useNavigate } from "react-router-dom";

const PreMolar = () => {
  const navigate = useNavigate();
  const [endodonciaPreMolarData, setendodonciaPreMolarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [showFormIndex, setShowFormIndex] = useState(null);
  const [formData, setFormData] = useState({
    fecha: "", // Add this field
    cedula: "",
    matriculaEstudiante_endodoncia_preMolar: "",
    nombreEstudiante_endodoncia_preMolar: "",
    apellidoEstudiante_endodoncia_preMolar: "",
  });

  useEffect(() => {
    console.log("Fetching data...");
    fetch(postApiLinkGet + "?type=endodoncia_preMolar")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setendodonciaPreMolarData(data);
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
    const item = endodonciaPreMolarData[index];
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
        matriculaEstudiante_endodoncia_preMolar: "",
        nombreEstudiante_endodoncia_preMolar: "",
        apellidoEstudiante_endodoncia_preMolar: "",
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
      formData.matriculaEstudiante_endodoncia_preMolar.trim() === "" ||
      formData.nombreEstudiante_endodoncia_preMolar.trim() === "" ||
      formData.apellidoEstudiante_endodoncia_preMolar.trim() === ""
    ) {
      alert("Por favor, complete todos los campos antes de enviar.");
      return;
    }

    // Validation for nombreEstudiante and apellidoEstudiante (only letters)
    const nameRegex = /^[a-zA-Z\s]*$/;
    if (
      !nameRegex.test(formData.nombreEstudiante_endodoncia_preMolar) ||
      !nameRegex.test(formData.apellidoEstudiante_endodoncia_preMolar)
    ) {
      alert("El nombre y el apellido deben contener solo letras.");
      return;
    }

    // Validation for matriculaEstudiante (only numbers and dashes)
    const matriculaRegex = /^[0-9]{2}-[0-9]{4}$/;
    if (
      !matriculaRegex.test(formData.matriculaEstudiante_endodoncia_preMolar)
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
          pageType: "endodoncia_preMolar", // Change to appropriate page type based on the page
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
          `El estudiante fue exitosamente asignado al paciente en Endodoncia Pre-Molar`
        );
      })
      .catch((error) => console.error("Error updating data:", error));
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const includedValues = ["4", "5", "12", "13", "20", "21", "28", "29"];

  return (
    <>
      <NavBar></NavBar>
      <div className="PacientesProcedimientos">
        <h1>Pacientes en Endodoncia Pre-Molar</h1>
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
            {endodonciaPreMolarData.map((item, index) => {
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
                      <td>
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
                        {item.matriculaEstudiante_endodoncia_preMolar.S ||
                        item.nombreEstudiante_endodoncia_preMolar.S ||
                        item.apellidoEstudiante_endodoncia_preMolar.S ? (
                          <button
                            className="asignadoPacientes"
                            onClick={() =>
                              alert(
                                `El estudiante ${item.nombreEstudiante_endodoncia_preMolar.S} ${item.apellidoEstudiante_endodoncia_preMolar.S} de matrícula ${item.matriculaEstudiante_endodoncia_preMolar.S} ya fue asignado a este paciente previamente`
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
                            <div className="attribute">
                              <strong>Alertas Médicas:</strong>{" "}
                              {item.emergenciaMedica.S
                                ? JSON.parse(item.emergenciaMedica.S).join(", ")
                                : "N/A"}
                            </div>
                            <div className="attribute">
                              <strong>Estudiante Asignado al Paciente</strong>{" "}
                            </div>
                            <div className="attribute">
                              <strong>- Matrícula:</strong>{" "}
                              {item.matriculaEstudiante_endodoncia_preMolar.S ||
                                "N/A"}
                            </div>
                            <div className="attribute">
                              <strong>- Nombre:</strong>{" "}
                              {item.nombreEstudiante_endodoncia_preMolar.S ||
                                "N/A"}{" "}
                              {item.apellidoEstudiante_endodoncia_preMolar.S}
                            </div>

                            <div className="attribute">
                              <strong>
                                Dientes donde el paciente presenta
                                sintomatología dolorosa o inflamación:
                              </strong>
                              <ul>
                                {item.procedimientos?.M?.endodoncia?.M?.dientes
                                  ?.L ? (
                                  item.procedimientos.M.endodoncia.M.dientes.L.filter(
                                    (diente) =>
                                      includedValues.includes(diente.S)
                                  ).map((diente, i) => (
                                    <li key={i}>{diente.S}</li>
                                  ))
                                ) : (
                                  <li>No data available</li>
                                )}
                              </ul>
                            </div>
                            <div className="attribute">
                              <strong>
                                ¿El paciente presenta sintomatología dolorosa?
                                Frío?
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
                                        formData.matriculaEstudiante_endodoncia_preMolar
                                      }
                                      name="matriculaEstudiante_endodoncia_preMolar"
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
                                        formData.nombreEstudiante_endodoncia_preMolar
                                      }
                                      name="nombreEstudiante_endodoncia_preMolar"
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
                                        formData.apellidoEstudiante_endodoncia_preMolar
                                      }
                                      name="apellidoEstudiante_endodoncia_preMolar"
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
        <div className="CopyrightUnibe">
          <img src={unibe} alt="UNIBE Logo" className="logo_pequeño" />
          <p>&copy; 2024 UNIBE School of Dentistry. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default PreMolar;
