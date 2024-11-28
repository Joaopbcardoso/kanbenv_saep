import { Link } from "react-router-dom"

export default function Header(){
    return(
        <header>        
            <div className="logo">
                <h1>KanBenv</h1>
                <h2>Seu Gerenciador de Tarefas</h2>
            </div>
            <nav className="nav">
                <ul>
                    <li>
                        <Link className="link" to={"/"}>Cadastro do Usuário</Link>
                        <Link className="link" to={"/cadastrar-tarefas"}>Cadastro de Tarefas</Link>
                        <Link className="link" to={"/gerenciar-tarefas"}>Gerenciar Tarefas</Link>
                    </li>
                </ul>
            </nav>
        </header>

    )
}