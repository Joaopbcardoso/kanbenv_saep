import React, { useState, useEffect } from "react";
import Header from "../components/Header";

export default function Gerenciador() {
    const [tarefas, setTarefas] = useState({
        aFazer: [],
        emAndamento: [],
        feito: [],
    });

    const [usuarios, setUsuarios] = useState([]);
    const [editando, setEditando] = useState(null); // Para controlar a tarefa em edição
    const [editFormData, setEditFormData] = useState(null); // Dados do formulário de edição

    // Carregar tarefas e usuários do localStorage
    useEffect(() => {
        const tarefasArmazenadas = JSON.parse(localStorage.getItem("tarefas")) || [];
        const usuariosArmazenados = JSON.parse(localStorage.getItem("usuarios")) || [];

        setUsuarios(usuariosArmazenados);
        setTarefas(organizeTasks(tarefasArmazenadas));
    }, []);

    // Função para ordenar tarefas por prioridade
    const sortByPriority = (a, b) => {
        const prioridades = { alta: 1, media: 2, baixa: 3 };
        return prioridades[a.prioridade] - prioridades[b.prioridade];
    };

    // Função para organizar tarefas
    const organizeTasks = (tarefas) => ({
        aFazer: tarefas.filter(tarefa => tarefa.status === "aFazer").sort(sortByPriority),
        emAndamento: tarefas.filter(tarefa => tarefa.status === "emAndamento").sort(sortByPriority),
        feito: tarefas.filter(tarefa => tarefa.status === "feito").sort(sortByPriority),
    });

    // Função para salvar tarefas no localStorage
    const saveTasksToLocalStorage = (tarefas) => {
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    };

    // Iniciar edição
    const startEditing = (tarefa) => {
        setEditando(tarefa);
        setEditFormData({ ...tarefa }); // Copiar dados para edição
    };

    // Handle input changes no formulário de edição
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    // Salvar alterações da tarefa
    const saveEdit = () => {
        const todasTarefas = [...tarefas.aFazer, ...tarefas.emAndamento, ...tarefas.feito];
        const index = todasTarefas.findIndex(t => t.descricao === editando.descricao && t.usuario === editando.usuario);

        if (index !== -1) {
            todasTarefas[index] = { ...editFormData };
        }

        saveTasksToLocalStorage(todasTarefas);
        setTarefas(organizeTasks(todasTarefas));
        setEditando(null);
    };

    // Cancelar edição
    const cancelEdit = () => {
        setEditando(null);
    };

    // Excluir tarefa
    const deleteTask = (tarefa) => {
        if (window.confirm("Tem certeza de que deseja excluir esta tarefa?")) {
            const todasTarefas = [...tarefas.aFazer, ...tarefas.emAndamento, ...tarefas.feito];
            const tarefasFiltradas = todasTarefas.filter(t => t !== tarefa);

            saveTasksToLocalStorage(tarefasFiltradas);
            setTarefas(organizeTasks(tarefasFiltradas));
        }
    };

    // Renderizar tarefas nas colunas
    const renderTarefas = (status) => {
        return tarefas[status].map((tarefa, index) => (
            <div key={index} className="tarefa">
                {editando === tarefa ? (
                    <div className="edit-form">
                        <input
                            type="text"
                            name="descricao"
                            value={editFormData.descricao}
                            onChange={handleEditChange}
                            placeholder="Descrição"
                        />
                        <input
                            type="text"
                            name="setor"
                            value={editFormData.setor}
                            onChange={handleEditChange}
                            placeholder="Setor"
                        />
                        <select
                            name="prioridade"
                            value={editFormData.prioridade}
                            onChange={handleEditChange}
                        >
                            <option value="alta">Alta</option>
                            <option value="media">Média</option>
                            <option value="baixa">Baixa</option>
                        </select>
                        <select
                            name="status"
                            value={editFormData.status}
                            onChange={handleEditChange}
                        >
                            <option value="aFazer">A Fazer</option>
                            <option value="emAndamento">Em Andamento</option>
                            <option value="feito">Feito</option>
                        </select>
                        <select
                            name="usuario"
                            value={editFormData.usuario}
                            onChange={handleEditChange}
                        >
                            <option value="">Selecione o Usuário</option>
                            {usuarios.map((usuario, index) => (
                                <option key={index} value={usuario.username}>
                                    {usuario.username}
                                </option>
                            ))}
                        </select>
                        <button onClick={saveEdit}>Salvar</button>
                        <button onClick={cancelEdit}>Cancelar</button>
                    </div>
                ) : (
                    <>
                        <h4>{tarefa.descricao}</h4>
                        <p><strong>Setor:</strong> {tarefa.setor}</p>
                        <p><strong>Prioridade:</strong> {tarefa.prioridade}</p>
                        <p><strong>Status:</strong> {tarefa.status}</p>
                        <p><strong>Usuário:</strong> {tarefa.usuario}</p>
                        <button className="gerenciar-button" onClick={() => startEditing(tarefa)}>Editar</button>
                        <button className="gerenciar-button" onClick={() => deleteTask(tarefa)}>Apagar</button>
                    </>
                )}
            </div>
        ));
    };

    return (
        <>
            <Header />
            <main className="main-kanban">
                <div className="coluna" id="aFazer">
                    <h2>A Fazer</h2>
                    {renderTarefas("aFazer")}
                </div>
                <div className="coluna" id="emAndamento">
                    <h2>Em Andamento</h2>
                    {renderTarefas("emAndamento")}
                </div>
                <div className="coluna" id="feito">
                    <h2>Feito</h2>
                    {renderTarefas("feito")}
                </div>
            </main>
        </>
    );
}
