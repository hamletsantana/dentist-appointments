import React, { useState, useEffect } from "react";
import NavBar from "../../../../Components/NavBar/navBar";
import { Form, Row, Col, Button } from "react-bootstrap";
import "./restauraciones.css"; // Import CSS for RestauracionesPage'
import postApiLinkGet from "../../../../API/api-get-request";
import unibe from "../../../../Images/logo_unibe.png";

const Restauraciones = () => {
  const [RestauracionesData, setRestauracionesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [showFormIndex, setShowFormIndex] = useState(null);
  const [formData, setFormData] = useState({
    fecha: "", // Add this field
    cedula: "",
    matriculaEstudiante_restauraciones: "",
    nombreEstudiante_restauraciones: "",
    apellidoEstudiante_restauraciones: "",
  });

  useEffect(() => {
    console.log("Fetching data...");
    fetch(postApiLinkGet + "?type=restauracion")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setRestauracionesData(data);
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
    const item = RestauracionesData[index];
    if (
      item.matriculaEstudiante_restauraciones.S ||
      item.nombreEstudiante_restauraciones.S ||
      item.apellidoEstudiante_restauraciones.S
    ) {
      alert("Un estudiante ya tiene a este paciente asignado");
      return;
    }

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
        matriculaEstudiante_restauraciones: "",
        nombreEstudiante_restauraciones: "",
        apellidoEstudiante_restauraciones: "",
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
      formData.matriculaEstudiante_restauraciones.trim() === "" ||
      formData.nombreEstudiante_restauraciones.trim() === "" ||
      formData.apellidoEstudiante_restauraciones.trim() === ""
    ) {
      alert("Por favor, complete todos los campos antes de enviar.");
      return;
    }

    // Validation for nombreEstudiante and apellidoEstudiante (only letters)
    const nameRegex = /^[a-zA-Z\s]*$/;
    if (
      !nameRegex.test(formData.nombreEstudiante_restauraciones) ||
      !nameRegex.test(formData.apellidoEstudiante_restauraciones)
    ) {
      alert("El nombre y el apellido deben contener solo letras.");
      return;
    }

    // Validation for matriculaEstudiante (only numbers and dashes)
    const matriculaRegex = /^[0-9-]*$/;
    if (!matriculaRegex.test(formData.matriculaEstudiante_restauraciones)) {
      alert("La matrícula debe contener solo números y guiones.");
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
          pageType: "restauraciones", // Change to appropriate page type based on the page
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
        window.location.reload();
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar></NavBar>
      <div className="PacientesRestauraciones">
        <h1>Pacientes en Restauración</h1>
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
            {RestauracionesData.map((item, index) => (
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
                    {item.matriculaEstudiante_restauraciones.S ||
                    item.nombreEstudiante_restauraciones.S ||
                    item.apellidoEstudiante_restauraciones.S ? (
                      <button
                        className="asignadoPacientes"
                        onClick={() =>
                          alert(
                            "Un estudiante ya ha sido asignado a este paciente"
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
                          <strong>Matrícula del Estudiante:</strong>{" "}
                          {item.matriculaEstudiante_restauraciones.S || "N/A"}
                        </div>
                        <div className="attribute">
                          <strong>Nombre del Estudiante:</strong>{" "}
                          {item.nombreEstudiante_restauraciones.S || "N/A"}
                        </div>
                        <div className="attribute">
                          <strong>Apellido del Estudiante:</strong>{" "}
                          {item.apellidoEstudiante_restauraciones.S || "N/A"}
                        </div>
                        <div className="attribute">
                          <strong>
                            ¿El paciente presenta caries en algún órgano dental?
                          </strong>{" "}
                          {
                            item.procedimientos?.M?.restauradora?.M
                              ?.caries_dientes?.S
                          }
                        </div>
                        <div className="attribute">
                          <strong>¿El paciente necesita una profilaxis?</strong>{" "}
                          {
                            item.procedimientos?.M?.restauradora?.M
                              ?.paciente_profilaxis?.S
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
                                    formData.matriculaEstudiante_restauraciones
                                  }
                                  name="matriculaEstudiante_restauraciones"
                                  onChange={handleChange}
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row className="form-row">
                            <Col lg="5">
                              <Form.Group controlId="formNombreEstudiante">
                                <Form.Label>Nombre del Estudiante</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Nombre del Estudiante"
                                  value={
                                    formData.nombreEstudiante_restauraciones
                                  }
                                  name="nombreEstudiante_restauraciones"
                                  onChange={handleChange}
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row className="form-row">
                            <Col lg="5">
                              <Form.Group controlId="formApellidoEstudiante">
                                <Form.Label>Apellido del Estudiante</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Apellido del Estudiante"
                                  value={
                                    formData.apellidoEstudiante_restauraciones
                                  }
                                  name="apellidoEstudiante_restauraciones"
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
            ))}
          </tbody>
        </table>
      </div>
      <div className="CopyrightUnibe">
        <img src={unibe} alt="UNIBE Logo" className="logo_pequeño" />
        <p>&copy; 2024 UNIBE School of Dentistry. All rights reserved.</p>
      </div>
    </>
  );
};

export default Restauraciones;
