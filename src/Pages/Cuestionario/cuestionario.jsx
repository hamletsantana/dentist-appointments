import "./cuestionario.css";
import React, { useEffect, useState } from "react";
import Authenticate from "../../Components/Authenticator/authenticator";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

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
          periodoncia: {
            sangrado_encias_cepillado: formState.sangrado_encias_cepillado,
            perdida_osea_dientes: formState.perdida_osea_dientes,
          },
          restauradora: {
            caries_dientes: formState.caries_dientes,
            paciente_profilaxis: formState.paciente_profilaxis,
          },
          protesis: {
            areas_perdida_dientes_unilateral:
              formState.areas_perdida_dientes_unilateral,
            areas_perdida_dientes_bilateral:
              formState.areas_perdida_dientes_bilateral,
            protesis_fija: formState.protesis_fija,
            protesis_removible: formState.protesis_removible,
            protesis_total: formState.protesis_total,
          },
          odontopediatria: {
            menor_presenta_caries: formState.menor_presenta_caries,
            menor_necesita_fluor_instruccions:
              formState.menor_necesita_fluor_instruccions,
          },
          ortodoncia: {
            paciente_pediatrico_succion_digital:
              formState.paciente_pediatrico_succion_digital,
            paciente_pediatrico_interposición_lingual:
              formState.paciente_pediatrico_interposición_lingual,
            paciente_pediatrico_deglucion_atipica:
              formState.paciente_pediatrico_deglucion_atipica,
            paciente_pediatrico_succion_labial:
              formState.paciente_pediatrico_succion_labial,
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
          <h1 style={{ color: "#047D95" }}>Formulario Pacientes</h1>
          <Form>
            <Row className="justify-content-md-center">
              <h2>Datos Generales</h2>
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
            <Row className="justify-content-md-center endodoncia">
              <p className="endodonciaP">
                ¿El paciente presenta sintomatología dolorosa?
              </p>
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
            <Row className="justify-content-md-center">
              <Col lg="9">
                <Form.Label>El paciente está inflamado??</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) =>
                    updateFormState("paciente_inflamado", e.target.value)
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
              <h2>Periodoncia</h2>
              <Col lg="9">
                <Form.Label>
                  El paciente se queja de sangrado de las encías al cepillarse?
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) =>
                    updateFormState("sangrado_encias_cepillado", e.target.value)
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
              <Col lg="9">
                <Form.Label>
                  Al examen radiográfico se observa pérdida ósea en los dientes?
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) =>
                    updateFormState("perdida_osea_dientes", e.target.value)
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
              <h2>Restauradora</h2>
              <Col lg="9">
                <Form.Label>
                  Paciente presenta caries en algún órgano dental?
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) =>
                    updateFormState("caries_dientes", e.target.value)
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
              <Col lg="9">
                <Form.Label>El paciente necesita una profilaxis?</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) =>
                    updateFormState("paciente_profilaxis", e.target.value)
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
              <h2>Prótesis</h2>
              <p>El paciente presenta áreas de pérdida de dientes:</p>
              <Col lg="4">
                <Form.Label>Unilateral:</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) =>
                    updateFormState(
                      "areas_perdida_dientes_unilateral",
                      e.target.value
                    )
                  }
                >
                  <option selected disabled>
                    Elija una opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </Form.Select>
              </Col>
              <Col lg="5">
                <Form.Label>Bilateral:</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) =>
                    updateFormState(
                      "areas_perdida_dientes_bilateral",
                      e.target.value
                    )
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
              <p>Es necesario realizarse una prótesis:</p>
              <Col lg="4">
                <Form.Label>Fija:</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) =>
                    updateFormState("protesis_fija", e.target.value)
                  }
                >
                  <option selected disabled>
                    Elija una opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </Form.Select>
              </Col>
              <Col lg="5">
                <Form.Label>Removible:</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) =>
                    updateFormState("protesis_removible", e.target.value)
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
              <Col lg="9">
                <Form.Label>
                  El paciente necesita una prótesis total?
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) =>
                    updateFormState("protesis_total", e.target.value)
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
              <h2>Odontopediatría</h2>
              <Col lg="9">
                <Form.Label>
                  ¿Paciente menor de 12 años presenta caries dental en algún
                  órgano dentario?
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) =>
                    updateFormState("menor_presenta_caries", e.target.value)
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
              <Col lg="9">
                <Form.Label>
                  ¿Paciente menor de 12 años necesita sellantes de flúor e
                  instrucciones de higiene oral?
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) =>
                    updateFormState(
                      "menor_necesita_fluor_instruccions",
                      e.target.value
                    )
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
            <Row className="justify-content-md-center ortodoncia">
              <h2 className="ortodoncia">Ortodoncia</h2>
              <p className="ortodonciaP">
                ¿Paciente pediátrico, padece de algún hábito?
              </p>
              <Col lg="2">
                <Form.Label>Succión digital:</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) =>
                    updateFormState(
                      "paciente_pediatrico_succion_digital",
                      e.target.value
                    )
                  }
                >
                  <option selected disabled>
                    Elija una opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </Form.Select>
              </Col>
              <Col lg="3">
                <Form.Label>Interposición lingual: </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) =>
                    updateFormState(
                      "paciente_pediatrico_interposición_lingual",
                      e.target.value
                    )
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
                <Form.Label>Deglución atípica: </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) =>
                    updateFormState(
                      "paciente_pediatrico_deglucion_atipica",
                      e.target.value
                    )
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
                <Form.Label>Succión labial: </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) =>
                    updateFormState(
                      "paciente_pediatrico_succion_labial",
                      e.target.value
                    )
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
            <div className="d-grid gap-2">
              <Button
                className="SubmitButton"
                size="lg"
                style={{ backgroundColor: "#047D95", borderColor: "#047D95" }}
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </section>
    </>
  );
}

export default Cuestionario;
