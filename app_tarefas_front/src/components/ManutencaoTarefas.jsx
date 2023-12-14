import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { api } from "../config_axios";
import ItemLista from "./ItemLista";

const ManutencaoTarefas = () => {
    //servem para manipular os dados do formulario  
    const { register, handleSubmit, reset } = useForm();
    //guardar e setar as informações do objeto
    const [tarefas, setTarefas] = useState([]);

    const obterLista = async () => {
        try {
            const lista = await api.get("tarefas");
            setTarefas(lista.data);
        } catch (error) {
            alert(`Erro: ..Não foi possível obter os dados: ${error}`);
        }
    }


    //define o método que será executado assim que o componente for renderizado
    useEffect(() => {
        obterLista();
    }, []);

    const filtrarLista = async (campos) => {
        try {
            const lista = await api.get(`tarefas/filtro/${campos.palavra}`);
            lista.data.length
                ? setTarefas(lista.data)
                : alert("Não há tarefas cadastrados com a palavra chave pesquisada");
        } catch (error) {
            alert(`Erro: ..Não foi possível obter os dados: ${error}`);
        }
    }

    const excluir = async (id, titulo) => {
        if (!window.confirm(`Confirma a exclusão da Tarefa ${titulo}?`)) {
            return;
        }
        try {
            await api.delete(`tarefas/${id}`);
            setTarefas(tarefas.filter(Tarefas => Tarefas.id !== id));

        } catch (error) {
            alert(`excluida com sucesso`);
        }
    }

    //alterar os registros
    const alterar = async (id, titulo, index) => {
        const novoStatus = prompt(`Digite o novo status da tarefa ${titulo}`);
        if (novoStatus == "") {
            alert('Digite um status valido!(status em branco)')
            return;
        }
        try {//captura os erros 
            //chamando o backend e passando os dados
            await api.put(`tarefas/${id}`, { status: novoStatus });
            const TarefasAtualizadas = [...tarefas];
            const indiceTarefas = TarefasAtualizadas.findIndex(Tarefa => Tarefa.id === id);
            TarefasAtualizadas[indiceTarefas.id].status = novoStatus;
            setTarefas(TarefasAtualizadas);
            obterLista();
            location.reload();
            
        } catch (error) {
            alert(`tarefa alterada com sucesso`);
            
        }
        
        
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-7">
                    <h4 className="fst-italic mt-3">Manutenção de Tarefas</h4>
                </div>
                <div className="col-sm-5">
                    <form onSubmit={handleSubmit(filtrarLista)}>
                        <div className="input-group mt-3">
                            <input type="text" className="form-control" placeholder="Titulo" required {...register("palavra")} />
                            <input type="submit" className="btn btn-primary" value="Pesquisar" />
                            <input type="button" className="btn btn-danger" value="Todos" onClick={() => { reset({ palavra: "" }); obterLista(); }} />
                        </div>
                    </form>
                </div>
            </div>

            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Cód.</th>
                        <th>Titulo</th>
                        <th>Descrição</th>
                        <th>Status</th>
                        <th>Data Criação</th>
                        <th>Data Limite</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {tarefas.map((Tarefa) => (
                        <ItemLista
                            key={Tarefa.idtarefas}
                            id={Tarefa.idtarefas}
                            titulo={Tarefa.titulo}
                            descricao={Tarefa.descricao}
                            status={Tarefa.status}
                            data_criacao={Tarefa.data_criacao}
                            data_limite={Tarefa.data_limite}
                            excluirClick={() => excluir(Tarefa.idtarefas, Tarefa.titulo)}
                            alterarClick={() => alterar(Tarefa.idtarefas, Tarefa.titulo)}
                        />
                    ))}
                </tbody>
                
            </table>

        </div>
    );
};

export default ManutencaoTarefas;