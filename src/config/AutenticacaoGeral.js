import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Autenticacao } from "./Autenticacao";
import { toast } from "react-hot-toast";

export const AutenticacaoGeral = (props) => {
    const autenticacao = Autenticacao();
    const navigate = useNavigate();
    const resposta = autenticacao.token && Array.isArray(autenticacao.roleNames) && autenticacao.roleNames.length > 0;

    if (!autenticacao.token || !resposta) {
        toast.error("Acesso negado.", { position: "bottom-right", duration: 2000 });
        navigate("/error");
        return <Navigate to="/error" />;
    }

    return <Outlet {...props} />;
};