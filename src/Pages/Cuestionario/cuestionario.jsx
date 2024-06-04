import "./cuestionario.css";
import React, { useState } from "react";
import dientes from "../../Images/dientes.jpg";
import Authenticate from "../../Components/Authenticator/authenticator";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import SeleccionDientes from "../../Components/Procedimientos/Endodoncia/endodoncia_dientes";
import { useNavigate } from "react-router-dom";
import postApiLinkPost from "../../API/api-post-request";
import unibe from "../../Images/logo_unibe.png";

function Cuestionario() {
  const initState = {
    fecha: "",
    cedula: "",
    cedula_paciente: "",
    nombrePaciente: "",
    apellidoPaciente: "",
    edadPaciente: "",
    telefonoPaciente: "",
    emergenciaMedica: "",
    direccionPaciente: "",
    matriculaEstudiante_cirugia: "",
    nombreEstudiante_cirugia: "",
    apellidoEstudiante_cirugia: "",
    matriculaEstudiante_endodoncia_anterior: "",
    nombreEstudiante_endodoncia_anterior: "",
    apellidoEstudiante_endodoncia_anterior: "",
    matriculaEstudiante_endodoncia_molar: "",
    nombreEstudiante_endodoncia_molar: "",
    apellidoEstudiante_endodoncia_molar: "",
    matriculaEstudiante_endodoncia_preMolar: "",
    nombreEstudiante_endodoncia_preMolar: "",
    apellidoEstudiante_endodoncia_preMolar: "",
    matriculaEstudiante_periodoncia_periodontal: "",
    nombreEstudiante_periodoncia_periodontal: "",
    apellidoEstudiante_periodoncia_periodontal: "",
    matriculaEstudiante_periodoncia_mantenimiento: "",
    nombreEstudiante_periodoncia_mantenimiento: "",
    apellidoEstudiante_periodoncia_mantenimiento: "",
    matriculaEstudiante_restauraciones: "",
    nombreEstudiante_restauraciones: "",
    apellidoEstudiante_restauraciones: "",
    matriculaEstudiante_protesis_total: "",
    nombreEstudiante_protesis_total: "",
    apellidoEstudiante_protesis_total: "",
    matriculaEstudiante_protesis_removible: "",
    nombreEstudiante_protesis_removible: "",
    apellidoEstudiante_protesis_removible: "",
    matriculaEstudiante_protesis_fija: "",
    nombreEstudiante_protesis_fija: "",
    apellidoEstudiante_protesis_fija: "",
    matriculaEstudiante_odontopediatria_no_operatorio: "",
    nombreEstudiante_odontopediatria_no_operatorio: "",
    apellidoEstudiante_odontopediatria_no_operatorio: "",
    matriculaEstudiante_odontopediatria_operatorio: "",
    nombreEstudiante_odontopediatria_operatorio: "",
    apellidoEstudiante_odontopediatria_operatorio: "",
    matriculaEstudiante_odontopediatria_control: "",
    nombreEstudiante_odontopediatria_control: "",
    apellidoEstudiante_odontopediatria_control: "",
    matriculaEstudiante_ortodoncia_aparato: "",
    nombreEstudiante_ortodoncia_aparato: "",
    apellidoEstudiante_ortodoncia_aparato: "",
    matriculaEstudiante_ortodoncia_control: "",
    nombreEstudiante_ortodoncia_control: "",
    apellidoEstudiante_ortodoncia_control: "",
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
        periodoncia_mantenimiento: "",
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
        protesis_total_superior: "",
        protesis_total_inferior: "",
      },
      odontopediatria: {
        menor_presenta_caries: "",
        menor_necesita_fluor_instruccions: "",
        odontopediatria_control: "",
      },
      ortodoncia: {
        paciente_pediatrico_succion_digital: "",
        paciente_pediatrico_interposición_lingual: "",
        paciente_pediatrico_deglucion_atipica: "",
        paciente_pediatrico_succion_labial: "",
        ortoroncia_control: "",
      },
    },
  };
  const [initialValues, setInitialValues] = React.useState(initState);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleClickDashboard = () => {
    navigate("/dashboard");
  };

  const navigate = useNavigate();
  const onSubmit = (values) => {
    console.log("Values:::", values);
    console.log("Values:::", JSON.stringify(values));
    if (!Object.keys(errors).length) {
      fetch(postApiLinkPost, {
        method: "POST",
        mode: "cors", // Ensure CORS mode is enabled

        body: JSON.stringify(values),
      })
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

  const openImageInNewTab = () => {
    const newTab = window.open();
    newTab.document.body.innerHTML = `<img src="${dientes}" alt="Dientes" style="max-width:100%; height:auto;">`;
  };

  return (
    <>
      <section className="Cuestionario">
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
        <div className="Formulario">
          <h1 style={{ color: "#047D95", marginTop: "50px" }}>
            Formulario Pacientes
          </h1>
          <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <Row className="justify-content-md-center">
              <h2>Datos Generales</h2>
              <Col lg="9">
                <Form.Label class="required-field">Fecha</Form.Label>
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
                <Form.Label class="required-field">Código</Form.Label>
                <Form.Control
                  placeholder="2024-55555"
                  {...register("cedula", {
                    required: "El Código es obligatorio",
                    minLength: {
                      value: 10,
                      message: "El código debe tener 10 caracteres",
                    },
                    maxLength: {
                      value: 10,
                      message: "El código debe tener 10 caracteres",
                    },
                    pattern: {
                      value: /^[0-9\-]+$/,
                      message:
                        "La código solo puede contener números y el guión (-)",
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
                <Form.Label class="required-field">Nombre</Form.Label>
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
                <Form.Label class="required-field">Apellido</Form.Label>
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
                <Form.Label class="required-field">
                  Fecha de Nacimiento
                </Form.Label>
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
                <Form.Label class="required-field">Teléfono</Form.Label>
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
                <Form.Label class="required-field">Cédula</Form.Label>
                <Form.Control
                  placeholder="402-5555555-5 o 40255555555"
                  {...register("cedula_paciente", {
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
                {errors.cedula_paciente && errors.cedula_paciente.type && (
                  <Form.Text className="text-danger">
                    {
                      (errors.cedula_paciente.message =
                        "Campo Obligatorio: Mínimo 11 números y el guión es aceptado")
                    }
                  </Form.Text>
                )}
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col lg="5">
                <Form.Label class="required-field">Dirección</Form.Label>
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
              <Col lg="4">
                <Form.Label>Emergencia Médica</Form.Label>
                <Form.Control
                  placeholder="Emergencia Medica"
                  {...register("emergenciaMedica", {
                    maxLength: {
                      value: 25,
                      message:
                        "Emergencia no puede contener más de 25 caracteres",
                    },
                  })}
                ></Form.Control>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <h2>Cirugía</h2>
              <Col lg="9">
                <Form.Label class="required-field">
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
                <Form.Label class="required-field">
                  ¿Qué diente/dientes?
                </Form.Label>
              </Col>
              <SeleccionDientes setValue={setValue} control={control} />
            </Row>

            <div className="image-container">
              <img
                src={dientes}
                className="ImagenDientes"
                alt="Dientes"
                onClick={openImageInNewTab}
              />
            </div>

            <Row className="justify-content-md-center endodoncia">
              <p className="endodonciaP">
                ¿El paciente presenta sintomatología dolorosa?
              </p>
              <Col lg="2">
                <Form.Label class="required-field">Frío:</Form.Label>
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
                <Form.Label class="required-field">Calor:</Form.Label>
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
                <Form.Label class="required-field">Masticación:</Form.Label>
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
                <Form.Label class="required-field">Palpación:</Form.Label>
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
                <Form.Label class="required-field">Percusión:</Form.Label>
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
                <Form.Label class="required-field">
                  ¿El paciente está inflamado?
                </Form.Label>
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
                <Form.Label class="required-field">
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
                <Form.Label class="required-field">
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
              <Col lg="9">
                <Form.Label class="required-field">
                  ¿Paciente dado de alta en su tratamiento quirúrgico/no
                  quirúrgico, necesita una fase de mantenimiento?
                </Form.Label>
                <Form.Select
                  defaultValue=""
                  aria-label="Default select example"
                  {...register(
                    "procedimientos.periodoncia.periodoncia_mantenimiento",
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
                    .periodoncia_mantenimiento && (
                    <Form.Text className="text-danger">
                      {
                        errors.procedimientos.periodoncia
                          .periodoncia_mantenimiento.message
                      }
                    </Form.Text>
                  )}
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <h2>Restauradora</h2>
              <Col lg="9">
                <Form.Label class="required-field">
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
                <Form.Label class="required-field">
                  ¿El paciente necesita una profilaxis?
                </Form.Label>
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
                <Form.Label class="required-field">Unilateral:</Form.Label>
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
                <Form.Label class="required-field">Bilateral:</Form.Label>
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
                <Form.Label class="required-field">Fija:</Form.Label>
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
                <Form.Label class="required-field">Removible:</Form.Label>
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
              <p>¿El paciente necesita una prótesis total?</p>
              <Col lg="4">
                <Form.Label class="required-field">Arcada Superior:</Form.Label>
                <Form.Select
                  defaultValue=""
                  aria-label="Default select example"
                  {...register(
                    "procedimientos.protesis.protesis_total_superior",
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
                  errors.procedimientos.protesis.protesis_total_superior && (
                    <Form.Text className="text-danger">
                      {
                        errors.procedimientos.protesis.protesis_total_superior
                          .message
                      }
                    </Form.Text>
                  )}
              </Col>
              <Col lg="5">
                <Form.Label class="required-field">Arcada Inferior:</Form.Label>
                <Form.Select
                  defaultValue=""
                  aria-label="Default select example"
                  {...register(
                    "procedimientos.protesis.protesis_total_inferior",
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
                  errors.procedimientos.protesis.protesis_total_inferior && (
                    <Form.Text className="text-danger">
                      {
                        errors.procedimientos.protesis.protesis_total_inferior
                          .message
                      }
                    </Form.Text>
                  )}
              </Col>
            </Row>

            <Row className="justify-content-md-center">
              <h2>Odontopediatría</h2>
              <Col lg="9">
                <Form.Label class="required-field">
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
                <Form.Label class="required-field">
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
            <Row className="justify-content-md-center">
              <Col lg="9">
                <Form.Label class="required-field">
                  ¿Paciente dado de alta en su tratamiento definitivo, necesita
                  que se le realice un tratamiento de control?
                </Form.Label>
                <Form.Select
                  defaultValue=""
                  aria-label="Default select example"
                  {...register(
                    "procedimientos.odontopediatria.odontopediatria_control",
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
                    .odontopediatria_control && (
                    <Form.Text className="text-danger">
                      {
                        errors.procedimientos.odontopediatria
                          .odontopediatria_control.message
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
                <Form.Label class="required-field">Succión digital:</Form.Label>
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
                <Form.Label class="required-field">
                  Interposición lingual:{" "}
                </Form.Label>
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
                <Form.Label class="required-field">
                  Deglución atípica:{" "}
                </Form.Label>
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
                <Form.Label class="required-field">Succión labial: </Form.Label>
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
            <Row className="justify-content-md-center">
              <Col lg="9">
                <Form.Label class="required-field">
                  ¿El paciente tiene algún aparato ortodóntico y necesita que le
                  realicen un control ortodóntico?
                </Form.Label>
                <Form.Select
                  defaultValue=""
                  aria-label="Default select example"
                  {...register("procedimientos.ortodoncia.ortodoncia_control", {
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
                  errors.procedimientos.ortodoncia &&
                  errors.procedimientos.ortodoncia.ortodoncia_control && (
                    <Form.Text className="text-danger">
                      {
                        errors.procedimientos.ortodoncia.ortodoncia_control
                          .message
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
