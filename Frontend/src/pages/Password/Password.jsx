import './Password.scss'

function Password(){
     
    return(
        <div className='password1'>
        <div className='password-card'>
        <h2 className='titulo'>Olvidé mi contraseña</h2>

        <div className='texto'>
                <p>Se enviará un enlace a tu correo electrónico para que puedas validar tu
                    identidad y restablecer tu contraseña.
                    Por favor, asegúrate de revisar tu bandeja de entrada y carpeta de spam.
                </p>
        </div>

        <div className='sector-correo'>
            <p className='texto-correo'>Correo</p>
            <input className='input-correo' placeholder='usuario@gmail.com' type="text" />
        </div>

        <button className='boton-recuperar-contra'>Recuperar contraseña</button>


       </div>
               
        
        </div>
    );
}
export default Password;