import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import NavBar from "../../../../Components/NavBar/navBar";
import "./cirugias.css"; // Import CSS for CirugiasPage
import postApiLinkGet from "../../../../API/api-get-request";
import unibe from "../../../../Images/logo_unibe.png";

const Cirugias = () => {
  const [cirugiasData, setCirugiasData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [showFormIndex, setShowFormIndex] = useState(null);
  const [formData, setFormData] = useState({
    fecha: "", // Add this field
    cedula: "",
    matriculaEstudiante_cirugia: "",
    nombreEstudiante_cirugia: "",
    apellidoEstudiante_cirugia: "",
  });

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
    // Close the "Asignar" dropdown if it's open
    if (showFormIndex === index) {
      setShowFormIndex(null);
    }
    // Toggle the "Detalles" dropdown
    setSelectedItemIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const toggleForm = (index) => {
    const item = cirugiasData[index];
    if (
      item.matriculaEstudiante_cirugia.S ||
      item.nombreEstudiante_cirugia.S ||
      item.apellidoEstudiante_cirugia.S
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
        matriculaEstudiante_cirugia: "",
        nombreEstudiante_cirugia: "",
        apellidoEstudiante_cirugia: "",
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
      formData.matriculaEstudiante_cirugia.trim() === "" ||
      formData.nombreEstudiante_cirugia.trim() === "" ||
      formData.apellidoEstudiante_cirugia.trim() === ""
    ) {
      alert("Por favor, complete todos los campos antes de enviar.");
      return;
    }

    // Validation for nombreEstudiante_cirugia and apellidoEstudiante_cirugia (only letters)
    const nameRegex = /^[a-zA-Z\s]*$/;
    if (
      !nameRegex.test(formData.nombreEstudiante_cirugia) ||
      !nameRegex.test(formData.apellidoEstudiante_cirugia)
    ) {
      alert("El nombre y el apellido deben contener solo letras.");
      return;
    }

    // Validation for matriculaEstudiante_cirugia (only numbers and dashes)
    const matriculaRegex = /^[0-9-]*$/;
    if (!matriculaRegex.test(formData.matriculaEstudiante_cirugia)) {
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
          pageType: "cirugia", // Change to appropriate page type based on the page
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
      <NavBar />
      <div className="PacientesCirugia">
        <h1>Pacientes en Cirugía</h1>
        <div className="table-container">
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
                      {item.matriculaEstudiante_cirugia.S ||
                      item.nombreEstudiante_cirugia.S ||
                      item.apellidoEstudiante_cirugia.S ? (
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
                            <strong>Dirección:</strong>{" "}
                            {item.direccionPaciente.S}
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
                            {item.matriculaEstudiante_cirugia.S || "N/A"}
                          </div>
                          <div className="attribute">
                            <strong>Nombre del Estudiante:</strong>{" "}
                            {item.nombreEstudiante_cirugia.S || "N/A"}
                          </div>
                          <div className="attribute">
                            <strong>Apellido del Estudiante:</strong>{" "}
                            {item.apellidoEstudiante_cirugia.S || "N/A"}
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
                                <Form.Group controlId="formmatriculaEstudiante_cirugia">
                                  <Form.Label>
                                    Matrícula del Estudiante
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Matrícula del Estudiante"
                                    value={formData.matriculaEstudiante_cirugia}
                                    name="matriculaEstudiante_cirugia"
                                    onChange={handleChange}
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row className="form-row">
                              <Col lg="5">
                                <Form.Group controlId="formnombreEstudiante_cirugia">
                                  <Form.Label>Nombre del Estudiante</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Nombre del Estudiante"
                                    value={formData.nombreEstudiante_cirugia}
                                    name="nombreEstudiante_cirugia"
                                    onChange={handleChange}
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row className="form-row">
                              <Col lg="5">
                                <Form.Group controlId="formapellidoEstudiante_cirugia">
                                  <Form.Label>
                                    Apellido del Estudiante
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Apellido del Estudiante"
                                    value={formData.apellidoEstudiante_cirugia}
                                    name="apellidoEstudiante_cirugia"
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
      </div>
    </>
  );
};

export default Cirugias;
