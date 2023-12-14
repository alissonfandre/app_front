import { useForm } from "react-hook-form";
import { api } from "../config_axios";
import { useState } from "react";

const InclusaoTarefas = () => {
    const { register, handleSubmit } = useForm();
    const [aviso, setAviso] = useState("");

    const salvar = async (campos) => {
        try {
            const response = await api.post("tarefas", campos);
            setAviso(`Tarefa cadastrada com sucesso! ${response.data.id}`);
        } catch (error) {
            setAviso("Erro ao cadastrar Tarefa!");
        }
    }

    return (
        <div className="container mt-4">
            <h4 className="fst-italic text-dark">Tarefas</h4>
            <form onSubmit={handleSubmit(salvar)}>

                <div className="form-group">
                    <label htmlFor="titulo" className="titulo">Título</label>
                    <input type="text" className="form-control" id="titulo"
                        required autoFocus {...register("titulo")} />
                </div>

                <div className="form-group">
                    <label htmlFor="descricao" className="descricao">Descrição</label>
                    <input type="text" className="form-control" id="descricao"
                        required autoFocus {...register("descricao")} />
                </div>

                <div className="form-group mt-2">
                    <label htmlFor="status" className="status">Status</label>
                    <input type="text" className="form-control" id="status"
                        required {...register("status")} />
                </div>

                <div className="form-group mt-2">
                    <label htmlFor="data_criacao" className="data">Data de criação</label>
                    <input type="date" className="form-control" id="data_criacao"
                        required {...register("data_criacao")} />
                </div>

                <div className="row mt-2">
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label htmlFor="data_limite" className="date">Data limite</label>
                            <input type="date" className="form-control"
                                id="data_limite" required {...register("data_limite")} />
                        </div>
                    </div>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                    <button type="submit" className="btn btn-success me-md-2">Enviar</button>
                    <button type="reset" className="btn btn-danger">Limpar</button>
                </div>

            </form>
            <div className="alert text-dark">{aviso}</div>
        </div>
    )
}

export default InclusaoTarefas;