import "./cuestionario.css";
import React, { useEffect, useState } from "react";
import Authenticate from "../../Components/Authenticator/authenticator";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";

const formState = {};

function updateFormState(key, value) {
  formState[key] = value;
}

function Cuestionario() {
  const [dientesSeleccionados, setDientesSeleccionados] = useState([]);
  useEffect(() => {
    console.log(dientesSeleccionados);
  }, [dientesSeleccionados]);

  async function agregarPaciente() {
    const data = {
      body: {
        cedula: formState.cedula,
        nombrePaciente: formState.nombrePaciente,
        apellidoPaciente: formState.apellidoPaciente,
        edadPaciente: formState.edadPaciente,
        telefonoPaciente: formState.telefonoPaciente,
        emergenciaMedica: formState.emergenciaMedica,
        matriculaEstudiante: "",
        nombreEstudiante: "",
        apellidoEstudiante: "",
        procedimientos: {
          cirugia: {
            diente_sin_restauracion: formState.diente_sin_restauracion,
          },
          endodoncia: {
            dientes: dientesSeleccionados,
            endodoncia_frio: formState.endodoncia_frio,
            endodoncia_calor: formState.endodoncia_calor,
            endodoncia_masticacion: formState.endodoncia_masticacion,
            endodoncia_palpacion: formState.endodoncia_palpacion,
            endodoncia_percusion: formState.endodoncia_percusion,
            paciente_inflamado: formState.paciente_inflamado,
          },
        },
      },
    };
  }

  return (
    <>
      <section className="Cuestionario">
        <div className="LogOut">
          <Authenticate></Authenticate>
        </div>
        <div className="Formulario">
          <h1>Formulario Pacientes</h1>
          <Form>
            <Row className="justify-content-md-center">
              <Col lg="9">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  placeholder="Fecha"
                  type="date"
                  onChange={(e) =>
                    updateFormState("telefonoPaciente", e.target.value)
                  }
                />
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col lg="3">
                <Form.Label>Cedula</Form.Label>
                <Form.Control
                  placeholder="Cedula"
                  onChange={(e) => updateFormState("cedula", e.target.value)}
                ></Form.Control>
              </Col>
              <Col lg="3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  placeholder="Nombre"
                  onChange={(e) =>
                    updateFormState("nombrePaciente", e.target.value)
                  }
                ></Form.Control>
              </Col>
              <Col lg="3">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  placeholder="Apellido"
                  onChange={(e) =>
                    updateFormState("apellidoPaciente", e.target.value)
                  }
                ></Form.Control>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col lg="3">
                <Form.Label>Edad</Form.Label>
                <Form.Control
                  placeholder="Edad"
                  type="date"
                  onChange={(e) =>
                    updateFormState("edadPaciente", e.target.value)
                  }
                ></Form.Control>
              </Col>
              <Col lg="3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  placeholder="809-555-5555"
                  onChange={(e) =>
                    updateFormState("telefonoPaciente", e.target.value)
                  }
                ></Form.Control>
              </Col>
              <Col lg="3">
                <Form.Label>Emergencia Médica</Form.Label>
                <Form.Control
                  placeholder="Emergencia Medica"
                  onChange={(e) =>
                    updateFormState("emergenciaMedica", e.target.value)
                  }
                ></Form.Control>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col lg="9">
                <Form.Label>Direccion</Form.Label>
                <Form.Control
                  placeholder="Calle. Sector. Municipio"
                  onChange={(e) =>
                    updateFormState("telefonoPaciente", e.target.value)
                  }
                />
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <h2>Cirugía</h2>
              <Col lg="9">
                <Form.Label>
                  El paciente presenta dientes con ninguna posibilidad de ser
                  restaurables?
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) =>
                    updateFormState("diente_sin_restauracion", e.target.value)
                  }
                >
                  <option selected disabled>
                    Elija una opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </Form.Select>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <h2>Endodoncia</h2>
              <Col lg="9">
                <Form.Label>¿Qué diente/dientes?</Form.Label>
                <div className="Checkboxes">
                  {Array(32)
                    .fill(0)
                    .map((diente, index) => (
                      <>
                        <Form.Check
                          inline
                          label={index + 1}
                          name="group1"
                          value={diente}
                          type="checkbox"
                          id={`inline-checkbox-1`}
                          onClick={() => {
                            if (
                              dientesSeleccionados.includes(
                                (index + 1).toString()
                              )
                            ) {
                              setDientesSeleccionados((prev) => {
                                const previousArray = [...prev];
                                const newState = previousArray.filter(
                                  (value) => value !== (index + 1).toString()
                                );
                                return newState;
                              });

                              return;
                            }

                            setDientesSeleccionados((prev) => [
                              ...prev,
                              (index + 1).toString(),
                            ]);
                          }}
                        />
                      </>
                    ))}
                </div>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <p>¿El paciente presenta sintomatología dolorosa? </p>
              <Col lg="2">
                <Form.Label>Frío:</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) =>
                    updateFormState("endodoncia_frio", e.target.value)
                  }
                >
                  <option selected disabled>
                    Elija una opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </Form.Select>
              </Col>
              <Col lg="2">
                <Form.Label>Calor:</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) =>
                    updateFormState("endodoncia_calor", e.target.value)
                  }
                >
                  <option selected disabled>
                    Elija una opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </Form.Select>
              </Col>
              <Col lg="2">
                <Form.Label>Masticación:</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) =>
                    updateFormState("endodoncia_masticacion", e.target.value)
                  }
                >
                  <option selected disabled>
                    Elija una opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </Form.Select>
              </Col>
              <Col lg="2">
                <Form.Label>Palpación:</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) =>
                    updateFormState("endodoncia_palpacion", e.target.value)
                  }
                >
                  <option selected disabled>
                    Elija una opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </Form.Select>
              </Col>
              <Col lg="2">
                <Form.Label>Percusión:</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) =>
                    updateFormState("endodoncia_percusion", e.target.value)
                  }
                >
                  <option selected disabled>
                    Elija una opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </Form.Select>
              </Col>
            </Row>
          </Form>
        </div>
      </section>
    </>
  );
}

export default Cuestionario;
