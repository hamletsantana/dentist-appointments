import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Pages/LoginPage/homePage";
import Dashboard from "./Pages/Dashboard/dashboard";
import Cuestionario from "./Pages/Cuestionario/cuestionario";
import Triaje from "./Pages/Triaje/triaje";

import Cirugias from "./Pages/Triaje/Procedimientos/Cirugias/cirugias";
import Anterior from "./Pages/Triaje/Procedimientos/Endodoncias/Anterior/anterior";
import Molar from "./Pages/Triaje/Procedimientos/Endodoncias/Molar/molar";
import PreMolar from "./Pages/Triaje/Procedimientos/Endodoncias/PreMolar/pre-molar";

import OdontopediatriaControl from "./Pages/Triaje/Procedimientos/Odontopediatria/Control/control";
import OdontopediatriaNoOperativo from "./Pages/Triaje/Procedimientos/Odontopediatria/NoOperativo/no-operativo";
import OdontopediatriaOperativo from "./Pages/Triaje/Procedimientos/Odontopediatria/Operativo/operativo";

import OrtodonciaAparato from "./Pages/Triaje/Procedimientos/Ortodoncia/Aparato/aparato";
import OrtodonciaControl from "./Pages/Triaje/Procedimientos/Ortodoncia/Control/ortodoncia-control";

import PeriodonciaFaseMantenimiento from "./Pages/Triaje/Procedimientos/Periodoncia/FaseMantenimiento/fase-mantenimiento";
import PeriodonciaNoQuirurgico from "./Pages/Triaje/Procedimientos/Periodoncia/NoQuirurgico/no-quirurgico";
import PeriodonciaQuirurgico from "./Pages/Triaje/Procedimientos/Periodoncia/Quirurgico/quirurgico";

import ProtesisFija from "./Pages/Triaje/Procedimientos/Protesis/Fija/fija";
import ProtesisRemovible from "./Pages/Triaje/Procedimientos/Protesis/Removible/removible";
import ProtesisTotal from "./Pages/Triaje/Procedimientos/Protesis/Total/total";

import Restauraciones from "./Pages/Triaje/Procedimientos/Restauraciones/restauraciones";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cuestionario" element={<Cuestionario />} />
        <Route path="/triaje" element={<Triaje />} />

        <Route path="/triaje/cirugias" element={<Cirugias />} />

        <Route path="/triaje/endodoncias/anterior" element={<Anterior />} />
        <Route path="/triaje/endodoncias/molar" element={<Molar />} />
        <Route path="/triaje/endodoncias/pre-molar" element={<PreMolar />} />

        <Route
          path="/triaje/odontopediatria/control"
          element={<OdontopediatriaControl />}
        />
        <Route
          path="/triaje/odontopediatria/no-operatorio"
          element={<OdontopediatriaNoOperativo />}
        />
        <Route
          path="/triaje/odontopediatria/operatorio"
          element={<OdontopediatriaOperativo />}
        />

        <Route
          path="/triaje/ortodoncia/aparato"
          element={<OrtodonciaAparato />}
        />
        <Route
          path="/triaje/ortodoncia/control"
          element={<OrtodonciaControl />}
        />

        <Route
          path="/triaje/periodoncia/no-quirurgico"
          element={<PeriodonciaNoQuirurgico />}
        />
        <Route
          path="/triaje/periodoncia/quirurgico"
          element={<PeriodonciaQuirurgico />}
        />
        <Route
          path="/triaje/periodoncia/fase-mantenimiento"
          element={<PeriodonciaFaseMantenimiento />}
        />

        <Route path="/triaje/protesis/fija" element={<ProtesisFija />} />
        <Route
          path="/triaje/protesis/removible"
          element={<ProtesisRemovible />}
        />
        <Route path="/triaje/protesis/total" element={<ProtesisTotal />} />

        <Route path="/triaje/restauraciones" element={<Restauraciones />} />
      </Routes>
    </Router>
  );
}

export default App;
