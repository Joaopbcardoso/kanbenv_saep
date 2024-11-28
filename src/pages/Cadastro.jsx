import React, { useState } from "react";
import Header from "../components/Header";

export default function Cadastro() {
    const [formData, setFormData] = useState({
        username: "",
        email: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.username && formData.email) {
            // Buscar usuários já existentes no localStorage
            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            
            // Adicionar novo usuário
            usuarios.push(formData);
            
            // Atualizar localStorage
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            
            alert("Usuário cadastrado com sucesso!");

            // Resetar o formulário
            setFormData({
                username: "",
                email: ""
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
                        <h1 className="cadastro-title">Cadastro de usuário</h1>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Nome de usuário"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                        <button type="submit">Cadastrar</button>
                    </div>
                </form>
            </main>
        </>
    );
}
