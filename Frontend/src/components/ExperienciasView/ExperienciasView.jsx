import "./ExperienciasView.scss";
import ExperienciasLayout from "../ExperienciasLayout/ExperienciasLayout";

import imgOfertas from "../../assets/ofertas.avif"

function ExperienciasView() {
    return (
        <div className="experiencias-view">
            <div className="banner">
                <img className="imgOfertas" src={imgOfertas} alt="ofertas" />
            </div>
            <ExperienciasLayout />
        </div>
    );
}

export default ExperienciasView;