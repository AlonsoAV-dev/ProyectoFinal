import "./BotonesAdmin.scss";


const BotonesAdmin = ({mode}) => {
    return (
        <div className="verUsuarios">
            <img src="/assets/hamburguer.png" alt="" />
            <p>
                {mode}
            </p>
        </div>
    );
}

export default BotonesAdmin;
