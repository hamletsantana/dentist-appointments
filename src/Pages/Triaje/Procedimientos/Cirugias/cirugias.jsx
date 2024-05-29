import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import NavBar from "../../../../Components/NavBar/navBar";
import "./cirugias.css"; // Import CSS for CirugiasPage
import postApiLinkGet from "../../../../API/api-get-request";

const Cirugias = () => {
  const [cirugiasData, setCirugiasData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [showFormIndex, setShowFormIndex] = useState(null);
  const [formData, setFormData] = useState({
    cirugia_check: "", // Add this field
    fecha: "", // Add this field
    cedula: "",
    matriculaEstudiante: "",
    nombreEstudiante: "",
    apellidoEstudiante: "",
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
    // Close the "Detalles" dropdown if it's open
    if (selectedItemIndex === index) {
      setSelectedItemIndex(null);
    }

    // Toggle the "Asignar" dropdown
    setShowFormIndex((prevIndex) => (prevIndex === index ? null : index));
    if (showFormIndex !== index) {
      const item = cirugiasData[index];
      setFormData({
        cedula: item.cedula.S, // Ensure this is correct
        fecha: item.fecha.S, // Ensure this is correct
        cedula: item.cedula.S,
        matriculaEstudiante: "",
        nombreEstudiante: "",
        apellidoEstudiante: "",
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
    fetch(
      "https://3lmv2y6pmb.execute-api.us-east-1.amazonaws.com/development/dentist-appointment-update-request",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
                    <button
                      className="asignarPacientes"
                      onClick={() => toggleForm(index)}
                    >
                      Asignar
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
                          <strong>Nombre Estudiante:</strong>{" "}
                          {item.nombreEstudiante.S}
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
                              <Form.Group controlId="formMatriculaEstudiante">
                                <Form.Label>
                                  Matrícula del Estudiante
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Matrícula del Estudiante"
                                  value={formData.matriculaEstudiante}
                                  name="matriculaEstudiante"
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
                                  value={formData.nombreEstudiante}
                                  name="nombreEstudiante"
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
                                  value={formData.apellidoEstudiante}
                                  name="apellidoEstudiante"
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
    </>
  );
};

export default Cirugias;
