import React, { useState, useEffect } from "react";
import Header from "../components/Header";

export default function CadastroTarefa() {
    const [formData, setFormData] = useState({
        descricao: "",
        setor: "",
        prioridade: "baixa",
        status: "aFazer",
        usuario: "" 
    });

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        // Buscar usuários salvos no localStorage
        const usuariosArmazenados = JSON.parse(localStorage.getItem("usuarios")) || [];
        setUsuarios(usuariosArmazenados);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.descricao && formData.setor && formData.usuario) {
            const tarefa = { ...formData };

            // Buscar tarefas existentes no localStorage
            const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
            
            // Adicionar a nova tarefa
            tarefas.push(tarefa);
            
            // Atualizar localStorage
            localStorage.setItem("tarefas", JSON.stringify(tarefas));
            
            alert("Tarefa cadastrada com sucesso!");

            // Resetar o formulário
            setFormData({
                descricao: "",
                setor: "",
                prioridade: "baixa",
                status: "aFazer",
                usuario: "" 
            });
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    };

    return (
        <>
            <Header />
            <main>
                <form className="cadastro" onSubmit={handleSubmit}>
                    <div className="box">
                        <h1 className="cadastro-title">Cadastro de Tarefa</h1>
                        <input
                            type="text"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                            placeholder="Descrição da Tarefa"
                            required
                        />
                        <input
                            type="text"
                            name="setor"
                            value={formData.setor}
                            onChange={handleChange}
                            placeholder="Setor"
                            required
                        />
                        <select
                            name="prioridade"
                            value={formData.prioridade}
                            onChange={handleChange}
                        >
                            <option value="alta">Alta</option>
                            <option value="media">Média</option>
                            <option value="baixa">Baixa</option>
                        </select>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="aFazer">A Fazer</option>
                            <option value="emAndamento">Em Andamento</option>
                            <option value="feito">Feito</option>
                        </select>
                        <select
                            name="usuario"
                            value={formData.usuario}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione o Usuário</option>
                            {usuarios.map((usuario, index) => (
                                <option key={index} value={usuario.username}>
                                    {usuario.username}
                                </option>
                            ))}
                        </select>
                        <button type="submit">Cadastrar</button>
                    </div>
                </form>
            </main>
        </>
    );
}
