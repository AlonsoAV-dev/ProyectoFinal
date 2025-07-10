import "./Footer.scss"

function Footer() {
    return (
        <div className="footer">
            <div className="footer-siguenos">
                <h3>Siguenos</h3>
                <div className="footer-siguenos-icons">
                    <img src="/assets/facebook.png" alt="" />
                    <img src="/assets/x.png" alt="" />
                    <img src="/assets/instagram.png" alt="" />
                    <img src="/assets/youtube.png" alt="" />
                </div>
            </div>
            <div>
                <h3>Nosotros</h3>
                <p>Conocenos</p>
                <p>Responsabilidad social</p>
                <p>Nuestras tiendas </p>
            </div>
            <div>
                <h3>Atencion al cliente</h3>
                <p>Atencion al cliente</p>
                <p>Horarios de atencion</p>
                <p>Preguntas frecuentes</p>
            </div>
            <div>
                <h3>Politicas y condiciones</h3>
                <p>Politicas de datos personales</p>
                <p>Condicion de promociones</p>
                <p>Terminos y condiciones</p>
            </div>
        </div>
    )
}

export default Footer;