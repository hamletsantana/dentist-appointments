import "./cuestionario.css";
import React, { useEffect, useState } from "react";
import Authenticate from "../../Components/Authenticator/authenticator";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import SeleccionDientes from "../../Components/Procedimientos/Endodoncia/endodoncia_dientes";
import { useNavigate } from "react-router-dom";

function Cuestionario() {
  const initState = {
    fecha: "",
    cedula: "",
    nombrePaciente: "",
    apellidoPaciente: "",
    edadPaciente: "",
    telefonoPaciente: "",
    emergenciaMedica: "",
    direccionPaciente: "",
    matriculaEstudiante: "",
    nombreEstudiante: "",
    apellidoEstudiante: "",
    procedimientos: {
      cirugia: {
        diente_sin_restauracion: "",
      },
      endodoncia: {
        dientes: "",
        endodoncia_frio: "",
        endodoncia_calor: "",
        endodoncia_masticacion: "",
        endodoncia_palpacion: "",
        endodoncia_percusion: "",
        paciente_inflamado: "",
      },
      periodoncia: {
        sangrado_encias_cepillado: "",
        perdida_osea_dientes: "",
      },
      restauradora: {
        caries_dientes: "",
        paciente_profilaxis: "",
      },
      protesis: {
        areas_perdida_dientes_unilateral: "",
        areas_perdida_dientes_bilateral: "",
        protesis_fija: "",
        protesis_removible: "",
        protesis_total: "",
      },
      odontopediatria: {
        menor_presenta_caries: "",
        menor_necesita_fluor_instruccions: "",
      },
      ortodoncia: {
        paciente_pediatrico_succion_digital: "",
        paciente_pediatrico_interposición_lingual: "",
        paciente_pediatrico_deglucion_atipica: "",
        paciente_pediatrico_succion_labial: "",
      },
    },
  };
  const [initialValues, setInitialValues] = React.useState(initState);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const navigate = useNavigate();
  const onSubmit = (values) => {
    console.log("Values:::", values);
    console.log("Values:::", JSON.stringify(values));
    if (!Object.keys(errors).length) {
      fetch(
        "https://3lmv2y6pmb.execute-api.us-east-1.amazonaws.com/development/dentist-appointment-post-request",
        {
          method: "POST",
          mode: "cors", // Ensure CORS mode is enabled

          body: JSON.stringify(values),
        }
      )
        .then((response) => {
          if (response.ok) {
            // Request successful, proceed with your logic
            setShowSuccessMessage(true);
            setTimeout(() => {
              navigate("/dashboard");
            }, 3000);
          } else {
            // Handle error if the request was not successful
            console.error("Failed to submit data:", response.status);
            // You can optionally display an error message to the user
            // or perform other error handling logic here
          }
        })
        .catch((error) => {
          // Handle error if fetch fails
          console.error("Error:", error);
        });
    }
  };

  const onError = (error) => {
    console.log("ERROR:::", error);
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    //reValidateMode: "onSubmit",
    // reValidateMode: "onChange",
    defaultValues: initialValues,
  });

  const today = new Date().toISOString().split("T")[0];

  const oldDate = new Date(
    new Date().setFullYear(new Date().getFullYear() - 109)
  )
    .toISOString()
    .split("T")[0];

  return (
    <>
      <section className="Cuestionario">
        <div className="LogOut">
          <Authenticate></Authenticate>
        </div>
        <div className="Formulario">
          <h1 style={{ color: "#047D95", marginTop: "50px" }}>
            Formulario Pacientes
          </h1>
          <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <Row className="justify-content-md-center">
              <h2>Datos Generales</h2>
              <Col lg="9">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  placeholder="Fecha"
                  type="date"
                  max={today}
                  {...register("fecha", {
                    required: "Fecha es obligatioria",
                  })}
                />
                {errors.fecha && (
                  <Form.Text className="text-danger">
                    {errors.fecha.message}
                  </Form.Text>
                )}
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col lg="3">
                <Form.Label>Cédula</Form.Label>
                <Form.Control
                  placeholder="402-5555555-5 o 40255555555"
                  {...register("cedula", {
                    required: "Cédula es obligatoria",
                    minLength: {
                      value: 11,
                      message: "La cédula debe tener al menos 11 caracteres",
                    },
                    maxLength: {
                      value: 13,
                      message: "La cédula debe tener máximo 13 caracteres",
                    },
                    pattern: {
                      value: /^[0-9\-]+$/,
                      message:
                        "La cédula solo puede contener números y el guión (-)",
                    },
                  })}
                ></Form.Control>
                {errors.cedula && errors.cedula.type && (
                  <Form.Text className="text-danger">
                    {
                      (errors.cedula.message =
                        "Campo Obligatorio: Mínimo 11 números y el guión es aceptado")
                    }
                  </Form.Text>
                )}
              </Col>
              <Col lg="3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  placeholder="Nombre"
                  {...register("nombrePaciente", {
                    required: "Nombre es obligatiorio",
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: "El nombre no puede contener números",
                    },
                    maxLength: {
                      value: 25,
                      message: "Nombre no puede contener más de 25 caracteres",
                    },
                  })}
                ></Form.Control>
                {errors.nombrePaciente && (
                  <Form.Text className="text-danger">
                    {errors.nombrePaciente.message}
                  </Form.Text>
                )}
              </Col>
              <Col lg="3">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  placeholder="Apellido"
                  {...register("apellidoPaciente", {
                    required: "Apellido es obligatiorio",
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "El apellido no puede contener números",
                    },
                    maxLength: {
                      value: 25,
                      message:
                        "Apellido no puede contener más de 25 caracteres",
                    },
                  })}
                ></Form.Control>
                {errors.apellidoPaciente && (
                  <Form.Text className="text-danger">
                    {errors.apellidoPaciente.message}
                  </Form.Text>
                )}
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col lg="3">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control
                  placeholder="Fecha de Nacimiento"
                  type="date"
                  min={oldDate}
                  max={today}
                  {...register("edadPaciente", {
                    required: "Edad es obligatioria",
                  })}
                ></Form.Control>
                {errors.edadPaciente && (
                  <Form.Text className="text-danger">
                    {errors.edadPaciente.message}
                  </Form.Text>
                )}
              </Col>
              <Col lg="3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  placeholder="809-555-5555"
                  {...register("telefonoPaciente", {
                    required: "Campo obligatorio",
                    minLength: {
                      value: 10,
                      message:
                        "El número de teléfono debe tener al menos 10 dígitos",
                    },
                    maxLength: {
                      value: 13,
                      message: "El teléfono debe tener máximo 13 caracteres",
                    },
                    pattern: {
                      value: /^[0-9\-]+$/,
                      message:
                        "El número de teléfono solo puede contener dígitos del 0 al 9",
                    },
                  })}
                ></Form.Control>
                {errors.telefonoPaciente && errors.telefonoPaciente.type && (
                  <Form.Text className="text-danger">
                    {
                      (errors.telefonoPaciente.message =
                        "Campo Obligatorio: Mínimo 10 números")
                    }
                  </Form.Text>
                )}
              </Col>
              <Col lg="3">
                <Form.Label>Emergencia Médica</Form.Label>
                <Form.Control
                  placeholder="Emergencia Medica"
                  {...register("emergenciaMedica", {
                    maxLength: {
                      value: 25,
                      message:
                        "Apellido no puede contener más de 25 caracteres",
                    },
                  })}
                ></Form.Control>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col lg="9">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  placeholder="Calle. Sector. Municipio"
                  {...register("direccionPaciente", {
                    required: "Dirección es obligatioria",
                    maxLength: {
                      value: 100,
                      message: "Max 100 caracteres",
                    },
                  })}
                />
                {errors.direccionPaciente && (
                  <Form.Text className="text-danger">
                    {errors.direccionPaciente.message}
                  </Form.Text>
                )}
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <h2>Cirugía</h2>
              <Col lg="9">
                <Form.Label>
                  ¿El paciente presenta dientes con ninguna posibilidad de ser
                  restaurables?
                </Form.Label>
                <Form.Select
                  defaultValue=""
                  aria-label="Default select example"
                  {...register(
                    "procedimientos.cirugia.diente_sin_restauracion",
                    {
                      required: "Selección Necesaria",
                    }
                  )}
                >
                  <option value="" disabled>
                    Elija una opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </Form.Select>
                {errors.procedimientos &&
                  errors.procedimientos.cirugia &&
                  errors.procedimientos.cirugia.diente_sin_restauracion && (
                    <Form.Text className="text-danger">
                      {
                        errors.procedimientos.cirugia.diente_sin_restauracion
                          .message
                      }
                    </Form.Text>
                  )}
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <h2>Endodoncia</h2>
              <Col lg="9">
                <Form.Label>¿Qué diente/dientes?</Form.Label>
              </Col>
              <SeleccionDientes setValue={setValue} control={control} />
            </Row>
            <Row className="justify-content-md-center endodoncia">
              <p className="endodonciaP">
                ¿El paciente presenta sintomatología dolorosa?
              </p>
              <Col lg="2">
                <Form.Label>Frío:</Form.Label>
                <Form.Select
                  defaultValue=""
                  aria-label="Default select example"
                  {...register("procedimientos.endodoncia.endodoncia_frio", {
                    required: "Selección Necesaria",
                  })}
                >
                  <option value="" disabled>
                    Elija una opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </Form.Select>
                {errors.procedimientos &&
                  errors.procedimientos.endodoncia &&
                  errors.procedimientos.endodoncia.endodoncia_frio && (
                    <Form.Text className="text-danger">
                      {errors.procedimientos.endodoncia.endodoncia_frio.message}
                    </Form.Text>
                  )}
              </Col>
              <Col lg="2">
                <Form.Label>Calor:</Form.Label>
                <Form.Select
                  defaultValue=""
                  aria-label="Default select example"
                  {...register("procedimientos.endodoncia.endodoncia_calor", {
                    required: "Selección Necesaria",
                  })}
                >
                  <option value="" disabled>
                    Elija una opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </Form.Select>
                {errors.procedimientos &&
                  errors.procedimientos.endodoncia &&
                  errors.procedimientos.endodoncia.endodoncia_calor && (
                    <Form.Text className="text-danger">
                      {
                        errors.procedimientos.endodoncia.endodoncia_calor
                          .message
                      }
                    </Form.Text>
                  )}
              </Col>
              <Col lg="2">
                <Form.Label>Masticación:</Form.Label>
                <Form.Select
                  defaultValue=""
                  aria-label="Default select example"
                  {...register(
                    "procedimientos.endodoncia.endodoncia_masticacion",
                    {
                      required: "Selección Necesaria",
                    }
                  )}
                >
                  <option value="" disabled>
                    Elija una opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </Form.Select>
                {errors.procedimientos &&
                  errors.procedimientos.endodoncia &&
                  errors.procedimientos.endodoncia.endodoncia_masticacion && (
                    <Form.Text className="text-danger">
                      {
                        errors.procedimientos.endodoncia.endodoncia_masticacion
                          .message
                      }
                    </Form.Text>
                  )}
              </Col>
              <Col lg="2">
                <Form.Label>Palpación:</Form.Label>
                <Form.Select
                  defaultValue=""
                  aria-label="Default select example"
                  {...register(
                    "procedimientos.endodoncia.endodoncia_palpacion",
                    {
                      required: "Selección Necesaria",
                    }
                  )}
                >
                  <option value="" disabled>
                    Elija una opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </Form.Select>
                {errors.procedimientos &&
                  errors.procedimientos.endodoncia &&
                  errors.procedimientos.endodoncia.endodoncia_palpacion && (
                    <Form.Text className="text-danger">
                      {
                        errors.procedimientos.endodoncia.endodoncia_palpacion
                          .message
                      }
                    </Form.Text>
                  )}
              </Col>
              <Col lg="2">
                <Form.Label>Percusión:</Form.Label>
                <Form.Select
                  defaultValue=""
                  aria-label="Default select example"
                  {...register(
                    "procedimientos.endodoncia.endodoncia_percusion",
                    {
                      required: "Selección Necesaria",
                    }
                  )}
                >
                  <option value="" disabled>
                    Elija una opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </Form.Select>
                {errors.procedimientos &&
                  errors.procedimientos.endodoncia &&
                  errors.procedimientos.endodoncia.endodoncia_percusion && (
                    <Form.Text className="text-danger">
                      {
                        errors.procedimientos.endodoncia.endodoncia_percusion
                          .message
                      }
                    </Form.Text>
                  )}
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col lg="9">
                <Form.Label>¿El paciente está inflamado?</Form.Label>
                <Form.Select
                  defaultValue=""
                  aria-label="Default select example"
                  {...register("procedimientos.endodoncia.paciente_inflamado", {
                    required: "Selección Necesaria",
                  })}
                >
                  <option value="" disabled>
                    Elija una opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </Form.Select>
                {errors.procedimientos &&
                  errors.procedimientos.endodoncia &&
                  errors.procedimientos.endodoncia.paciente_inflamado && (
                    <Form.Text className="text-danger">
                      {
                        errors.procedimientos.endodoncia.paciente_inflamado
                          .message
                      }
                    </Form.Text>
                  )}
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <h2>Periodoncia</h2>
              <Col lg="9">
                <Form.Label>
                  ¿El paciente se queja de sangrado de las encías al cepillarse?
                </Form.Label>
                <Form.Select
                  defaultValue=""
                  aria-label="Default select example"
                  {...register(
                    "procedimientos.periodoncia.sangrado_encias_cepillado",
                    {
                      required: "Selección Necesaria",
                    }
                  )}
                >
                  <option value="" disabled>
                    Elija una opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </Form.Select>

                {errors.procedimientos &&
                  errors.procedimientos.periodoncia &&
                  errors.procedimientos.periodoncia
                    .sangrado_encias_cepillado && (
                    <Form.Text className="text-danger">
                      {
                        errors.procedimientos.periodoncia
                          .sangrado_encias_cepillado.message
                      }
                    </Form.Text>
                  )}
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col lg="9">
                <Form.Label>
                  ¿En el examen radiográfico se observa pérdida ósea en los
                  dientes?
                </Form.Label>
                <Form.Select
                  defaultValue=""
                  aria-label="Default select example"
                  {...register(
                    "procedimientos.periodoncia.perdida_osea_dientes",
                    {
                      required: "Selección Necesaria",
                    }
                  )}
                >
                  <option value="" disabled>
                    Elija una opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </Form.Select>
                {errors.procedimientos &&
                  errors.procedimientos.periodoncia &&
                  errors.procedimientos.periodoncia.perdida_osea_dientes && (
                    <Form.Text className="text-danger">
                      {
                        errors.procedimientos.periodoncia.perdida_osea_dientes
                          .message
                      }
                    </Form.Text>
                  )}
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <h2>Restauradora</h2>
              <Col lg="9">
                <Form.Label>
                  ¿El paciente presenta caries en algún órgano dental?
                </Form.Label>
                <Form.Select
                  defaultValue=""
                  aria-label="Default select example"
                  {...register("procedimientos.restauradora.caries_dientes", {
                    required: "Selección Necesaria",
                  })}
                >
                  <option value="" disabled>
                    Elija una opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </Form.Select>

                {errors.procedimientos &&
                  errors.procedimientos.restauradora &&
                  errors.procedimientos.restauradora.caries_dientes && (
                    <Form.Text className="text-danger">
                      {
                        errors.procedimientos.restauradora.caries_dientes
                          .message
                      }
                    </Form.Text>
                  )}
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col lg="9">
                <Form.Label>¿El paciente necesita una profilaxis?</Form.Label>
                <Form.Select
                  defaultValue=""
                  aria-label="Default select example"
                  {...register(
                    "procedimientos.restauradora.paciente_profilaxis",
                    {
                      required: "Selección Necesaria",
                    }
                  )}
                >
                  <option value="" disabled>
                    Elija una opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </Form.Select>
                {errors.procedimientos &&
                  errors.procedimientos.restauradora &&
                  errors.procedimientos.restauradora.paciente_profilaxis && (
                    <Form.Text className="text-danger">
                      {
                        errors.procedimientos.restauradora.paciente_profilaxis
                          .message
                      }
                    </Form.Text>
                  )}
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <h2>Prótesis</h2>
              <p>¿El paciente presenta áreas de pérdida de dientes?</p>
              <Col lg="4">
                <Form.Label>Unilateral:</Form.Label>
                <Form.Select
                  defaultValue=""
                  aria-label="Default select example"
                  {...register(
                    "procedimientos.protesis.areas_perdida_dientes_unilateral",
                    {
                      required: "Selección Necesaria",
                    }
                  )}
                >
                  <option value="" disabled>
                    Elija una opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </Form.Select>

                {errors.procedimientos &&
                  errors.procedimientos.protesis &&
                  errors.procedimientos.protesis
                    .areas_perdida_dientes_unilateral && (
                    <Form.Text className="text-danger">
                      {
                        errors.procedimientos.protesis
                          .areas_perdida_dientes_unilateral.message
                      }
                    </Form.Text>
                  )}
              </Col>
              <Col lg="5">
                <Form.Label>Bilateral:</Form.Label>
                <Form.Select
                  defaultValue=""
                  aria-label="Default select example"
                  {...register(
                    "procedimientos.protesis.areas_perdida_dientes_bilateral",
                    {
                      required: "Selección Necesaria",
                    }
                  )}
                >
                  <option value="" disabled>
                    Elija una opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </Form.Select>
                {errors.procedimientos &&
                  errors.procedimientos.protesis &&
                  errors.procedimientos.protesis
                    .areas_perdida_dientes_bilateral && (
                    <Form.Text className="text-danger">
                      {
                        errors.procedimientos.protesis
                          .areas_perdida_dientes_bilateral.message
                      }
                    </Form.Text>
                  )}
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <p>¿Es necesario realizarse una prótesis?</p>
              <Col lg="4">
                <Form.Label>Fija:</Form.Label>
                <Form.Select
                  defaultValue=""
                  aria-label="Default select example"
                  {...register("procedimientos.protesis.protesis_fija", {
                    required: "Selección Necesaria",
                  })}
                >
                  <option value="" disabled>
                    Elija una opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </Form.Select>
                {errors.procedimientos &&
                  errors.procedimientos.protesis &&
                  errors.procedimientos.protesis.protesis_fija && (
                    <Form.Text className="text-danger">
                      {errors.procedimientos.protesis.protesis_fija.message}
                    </Form.Text>
                  )}
              </Col>
              <Col lg="5">
                <Form.Label>Removible:</Form.Label>
                <Form.Select
                  defaultValue=""
                  aria-label="Default select example"
                  {...register("procedimientos.protesis.protesis_removible", {
                    required: "Selección Necesaria",
                  })}
                >
                  <option value="" disabled>
                    Elija una opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </Form.Select>
                {errors.procedimientos &&
                  errors.procedimientos.protesis &&
                  errors.procedimientos.protesis.protesis_removible && (
                    <Form.Text className="text-danger">
                      {
                        errors.procedimientos.protesis.protesis_removible
                          .message
                      }
                    </Form.Text>
                  )}
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col lg="9">
                <Form.Label>
                  ¿El paciente necesita una prótesis total?
                </Form.Label>
                <Form.Select
                  defaultValue=""
                  aria-label="Default select example"
                  {...register("procedimientos.protesis.protesis_total", {
                    required: "Selección Necesaria",
                  })}
                >
                  <option value="" disabled>
                    Elija una opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </Form.Select>
                {errors.procedimientos &&
                  errors.procedimientos.protesis &&
                  errors.procedimientos.protesis.protesis_total && (
                    <Form.Text className="text-danger">
                      {errors.procedimientos.protesis.protesis_total.message}
                    </Form.Text>
                  )}
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
                  defaultValue=""
                  aria-label="Default select example"
                  {...register(
                    "procedimientos.odontopediatria.menor_presenta_caries",
                    {
                      required: "Selección Necesaria",
                    }
                  )}
                >
                  <option value="" disabled>
                    Elija una opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </Form.Select>

                {errors.procedimientos &&
                  errors.procedimientos.odontopediatria &&
                  errors.procedimientos.odontopediatria
                    .menor_presenta_caries && (
                    <Form.Text className="text-danger">
                      {
                        errors.procedimientos.odontopediatria
                          .menor_presenta_caries.message
                      }
                    </Form.Text>
                  )}
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col lg="9">
                <Form.Label>
                  ¿Paciente menor de 12 años necesita sellantes de flúor e
                  instrucciones de higiene oral?
                </Form.Label>
                <Form.Select
                  defaultValue=""
                  aria-label="Default select example"
                  {...register(
                    "procedimientos.odontopediatria.menor_necesita_fluor_instruccions",
                    {
                      required: "Selección Necesaria",
                    }
                  )}
                >
                  <option value="" disabled>
                    Elija una opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </Form.Select>
                {errors.procedimientos &&
                  errors.procedimientos.odontopediatria &&
                  errors.procedimientos.odontopediatria
                    .menor_necesita_fluor_instruccions && (
                    <Form.Text className="text-danger">
                      {
                        errors.procedimientos.odontopediatria
                          .menor_necesita_fluor_instruccions.message
                      }
                    </Form.Text>
                  )}
              </Col>
            </Row>
            <Row className="justify-content-md-center ortodoncia">
              <h2 className="ortodoncia">Ortodoncia</h2>
              <p className="ortodonciaP">
                ¿Paciente pediátrico padece de algún hábito?
              </p>
              <Col lg="2">
                <Form.Label>Succión digital:</Form.Label>
                <Form.Select
                  defaultValue=""
                  aria-label="Default select example"
                  {...register(
                    "procedimientos.ortodoncia.paciente_pediatrico_succion_digital",
                    {
                      required: "Selección Necesaria",
                    }
                  )}
                >
                  <option value="" disabled>
                    Elija una opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </Form.Select>
                {errors.paciente_pediatrico_succion_digital_select && (
                  <Form.Text className="text-danger">
                    {errors.paciente_pediatrico_succion_digital_select.message}
                  </Form.Text>
                )}
                {errors.procedimientos &&
                  errors.procedimientos.ortodoncia &&
                  errors.procedimientos.ortodoncia
                    .paciente_pediatrico_succion_digital && (
                    <Form.Text className="text-danger">
                      {
                        errors.procedimientos.ortodoncia
                          .paciente_pediatrico_succion_digital.message
                      }
                    </Form.Text>
                  )}
              </Col>
              <Col lg="3">
                <Form.Label>Interposición lingual: </Form.Label>
                <Form.Select
                  defaultValue=""
                  aria-label="Default select example"
                  {...register(
                    "procedimientos.ortodoncia.paciente_pediatrico_interposición_lingual",
                    {
                      required: "Selección Necesaria",
                    }
                  )}
                >
                  <option value="" disabled>
                    Elija una opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </Form.Select>
                {errors.procedimientos &&
                  errors.procedimientos.ortodoncia &&
                  errors.procedimientos.ortodoncia
                    .paciente_pediatrico_interposición_lingual && (
                    <Form.Text className="text-danger">
                      {
                        errors.procedimientos.ortodoncia
                          .paciente_pediatrico_interposición_lingual.message
                      }
                    </Form.Text>
                  )}
              </Col>
              <Col lg="2">
                <Form.Label>Deglución atípica: </Form.Label>
                <Form.Select
                  defaultValue=""
                  aria-label="Default select example"
                  {...register(
                    "procedimientos.ortodoncia.paciente_pediatrico_deglucion_atipica",
                    {
                      required: "Selección Necesaria",
                    }
                  )}
                >
                  <option value="" disabled>
                    Elija una opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </Form.Select>
                {errors.procedimientos &&
                  errors.procedimientos.ortodoncia &&
                  errors.procedimientos.ortodoncia
                    .paciente_pediatrico_deglucion_atipica && (
                    <Form.Text className="text-danger">
                      {
                        errors.procedimientos.ortodoncia
                          .paciente_pediatrico_deglucion_atipica.message
                      }
                    </Form.Text>
                  )}
              </Col>
              <Col lg="2">
                <Form.Label>Succión labial: </Form.Label>
                <Form.Select
                  defaultValue=""
                  aria-label="Default select example"
                  {...register(
                    "procedimientos.ortodoncia.paciente_pediatrico_succion_labial",
                    {
                      required: "Selección Necesaria",
                    }
                  )}
                >
                  <option value="" disabled>
                    Elija una opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </Form.Select>
                {errors.procedimientos &&
                  errors.procedimientos.ortodoncia &&
                  errors.procedimientos.ortodoncia
                    .paciente_pediatrico_succion_labial && (
                    <Form.Text className="text-danger">
                      {
                        errors.procedimientos.ortodoncia
                          .paciente_pediatrico_succion_labial.message
                      }
                    </Form.Text>
                  )}
              </Col>
            </Row>
            <div className="d-grid gap-2">
              <Button
                className="SubmitButton"
                size="lg"
                style={{ backgroundColor: "#047D95", borderColor: "#047D95" }}
                type="submit"
              >
                Enviar Formulario
              </Button>
            </div>
          </Form>
          {showSuccessMessage && (
            <div
              style={{
                marginTop: "20px",
                backgroundColor: "#047D95",
                padding: "10px",
                borderRadius: "10px",
                color: "white",
              }}
            >
              Su formulario se ha enviado existosamente! Redirigiendo al
              Dashboard...
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Cuestionario;
