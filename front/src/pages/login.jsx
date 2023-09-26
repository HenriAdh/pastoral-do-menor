import React from "react";

const LoginPage = () => {
    return (
        <>
            <div className="content">
                <h1>Login</h1>
                <div className="input-field">
                    <label htmlFor="edtEmail">E-mail: </label>
                    <input type="email" id="edtEmail" />
                </div>
                <br />
                <div className="inputfield">
                    <label htmlFor="edtPass">Senha: </label>
                    <input type="password" id="edtPass" />
                </div>
                <br />
                <div className="buttons">
                    <button>Entrar</button>
                    <button>Registrar</button>
                </div>
                <a href="#">Esqueci minha senha?</a>
            </div>
        </>
    )
}

export default LoginPage;