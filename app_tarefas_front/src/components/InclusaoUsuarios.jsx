import { useForm } from "react-hook-form";
import { api } from "../config_axios";
import { useState } from "react";

const InclusaoUsuarios = () => {
    const { register, handleSubmit,reset } = useForm();
    const [aviso, setAviso] = useState("");

    const salvar = async (campos) => {
        try {
            const response = await api.post("usuarios", campos);
            setAviso(`Usuário cadastrado com sucesso! ID: ${response.data.idusuarios}`);
            reset();
        } catch (error) {
            setAviso(`Erro ao cadastrar usuário: ${error.message}`);
        }
    }
    return (
        <div className="container">
            <h4 className="fst-italic mt-3">Usuarios</h4>
            <form onSubmit={handleSubmit(salvar)}>


                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input type="text" className="form-control" id="nome"
                        required autoFocus {...register("nome")} />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control" id="email"
                        required autoFocus {...register("email")} />
                </div>

                <div className="form-group mt-2">
                    <label htmlFor="senha">Senha</label>
                    <input type="password" className="form-control" id="senha" required {...register("senha")} />
                </div>

                <input type="submit" className="btn btn-primary mt-3"
                    value="Enviar" />
                <input type="reset" className="btn btn-danger mt-3 ms-3"
                    value="Limpar" />
            </form>
            <div className="alert"></div>
        </div>
    )
}

export default InclusaoUsuarios;