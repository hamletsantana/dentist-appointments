import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useController } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Col";
import "./emergencia_medica.css";

function EmergenciaMedica({ control, register, setValue }) {
  const predeterminedOptions = [
    "Diabetes",
    "Hipertensión (presión alta)",
    "Hipotensión (presión baja)",
    "Problemas del corazón (infartos, marcapasos, stents, taquicardia, arritmia cardiaca, ect.)",
    "Endocarditis bacteriana o fiebre reumática",
    "Anemia",
    "Asma o (pecho apretado)",
    "Tuberculosis",
    "Problema de los nervios o temblores",
    "Epilepsia",
    "Problemas tiroideos (hipertirodismo, hipotirodismo, nódulos, ect.)",
    "Problemas renales",
    "Problemas urinarios o de la vejiga",
    "Osteoporosis",
    "Cáncer",
    "Hepatitis",
    "Enfermedades de transmisión sexual (VIH/SIDA, Sífilis, Gonorrea, VHS, ect.)",
  ];

  const [emergenciaMedicaSelected, setEmergenciaMedicaSelected] = useState([]);
  const [otraOption, setOtraOption] = useState("");

  useEffect(() => {
    setValue("emergenciaMedica", JSON.stringify(emergenciaMedicaSelected));
  }, [emergenciaMedicaSelected]);

  const handleOtraOptionChange = (e) => {
    const value = e.target.value;
    setOtraOption(value);
  };

  const handleOtraOptionBlur = () => {
    if (otraOption.trim() !== "") {
      const index = emergenciaMedicaSelected.findIndex((item) =>
        item.startsWith("")
      );
      if (index !== -1) {
        setEmergenciaMedicaSelected((prevSelected) => {
          const updatedArray = [...prevSelected];
          updatedArray[index] = `${otraOption}`;
          console.log("Updated array:", updatedArray);
          return updatedArray;
        });
      } else {
        setEmergenciaMedicaSelected((prevSelected) => {
          const newArray = [...prevSelected];
          if (newArray.length > 0) {
            newArray.push(`${otraOption}`);
          } else {
            newArray.unshift(`${otraOption}`);
          }
          console.log("Updated array:", newArray);
          return newArray;
        });
      }
    } else {
      const index = emergenciaMedicaSelected.findIndex((item) =>
        item.startsWith("")
      );
      if (index !== -1) {
        setEmergenciaMedicaSelected((prevSelected) => {
          const updatedArray = [...prevSelected];
          updatedArray.splice(index, 1);
          console.log("Updated array:", updatedArray);
          return updatedArray;
        });
      }
    }
  };

  const handleSwitchChange = (option, isChecked) => {
    setEmergenciaMedicaSelected((prevSelected) => {
      if (isChecked) {
        const updatedArray = [...prevSelected, option];
        console.log("Updated array:", updatedArray);
        return updatedArray;
      } else {
        const updatedArray = prevSelected.filter((item) => item !== option);
        console.log("Updated array:", updatedArray);
        return updatedArray;
      }
    });
  };

  return (
    <div>
      <div className="EmergenciaMedicaSwitches">
        {predeterminedOptions.map((option, index) => (
          <Form.Check
            key={index}
            className="FormSwitch"
            type="switch"
            id={`switch-${index}`}
            label={option}
            checked={emergenciaMedicaSelected.includes(option)}
            onChange={(e) => handleSwitchChange(option, e.target.checked)}
          />
        ))}
      </div>
      <Row className="justify-content-md-center">
        <Col lg="6s">
          <Form.Control
            placeholder="Otra..."
            value={otraOption}
            onChange={handleOtraOptionChange}
            onBlur={handleOtraOptionBlur}
          />
        </Col>
      </Row>
    </div>
  );
}

export default EmergenciaMedica;
