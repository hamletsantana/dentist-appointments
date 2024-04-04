import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useController, Controller } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import "./endodoncia_dientes.css";

function SeleccionDientes({ control, setValue }) {
  const [dientesSeleccionados, setDientesSeleccionados] = useState([]);

  useEffect(() => {
    setValue("procedimientos.endodoncia.dientes", dientesSeleccionados);
  }, [dientesSeleccionados]);

  return (
    <Controller
      name="procedimientos.endodoncia.dientes"
      control={control}
      render={({ field, fieldState: { error } }) => (
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
                    if (dientesSeleccionados.includes((index + 1).toString())) {
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
      )}
    />
  );
}

export default SeleccionDientes;
