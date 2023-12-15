import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListaCatador from "./pages/lista-catador";
import Login from "./pages/login";
import AcompanhamentoColeta from "./pages/acompanhamento-coleta";
import Header from "./components/header";
import HeaderLogin from "./components/header-login";
import Admin from "./pages/admin";
import { Toaster } from "react-hot-toast";
import Catador from "./pages/catador";
import Associacao from "./pages/associacao";
import OperadorLogistico from "./pages/operadorLogistico";
import Perfil from "./pages/perfil";
import { AutenticacaoGeral } from "./config/AutenticacaoGeral";
import { ProtecaoAssociacao } from "./config/ProtecaoAssociacao";
import { ProtecaoCatador } from "./config/ProtecaoCatador";
import { ProtecaoAdmin } from "./config/ProtecaoAdmin";
import { ProtecaoLogistica } from "./config/ProtecaoLogistica";
import ListaColeta from "./pages/lista-coleta";
import RelatorioColeta from "./pages/relatorio-coleta";
import RelatorioVenda from "./pages/relatorio-venda";
import ListaRelatorioColeta from "./pages/lista-relatorio-coleta";
import ListaRelatorioVenda from "./pages/lista-relatorio-venda";
import ListarAdministradores from "./pages/lista-adm"; //TODO: NÃO ESTA SENDO UTILIZADO
import ListarAssociacoes from "./pages/lista-associacao";
import ListarTodosCatadores from "./pages/lista-catador-adm";
import PaginaNaoEncontrada from "./pages/pagina-nao-encontrada";
import ListaVenda from "./pages/lista-venda";
import ListaRelatorioColetaCatador from "./pages/lista-relatorio-coleta-catador";
import ListaRelatorioVendaAssociacao from "./pages/lista-relatorio-venda-associacao";
import ListarOperadorLogistico from "./pages/lista-operador";
import RedefinirSenha from "./pages/resetar-senha";
import ListarColetasCatador from "./pages/lista-coleta-catador";
import RelatorioColetaAdm from "./pages/relatorio-coleta-adm";
import RelatorioVendaAdm from "./pages/relatorio-venda-adm";

//TODO:  PODE SER SUBSTITUIDO POR <>...</> NAS NOVA VERSÕES DO REACT. IGUAL EU FIZ ABAIXO

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeaderLogin />
                <Login />
              </>
            }
          />

          <Route path="/resetar-senha/:token" element={<RedefinirSenha />} />

          {/* Rota Geral */}
          <Route path="/" element={<AutenticacaoGeral />}>
            <Route
              path="*"
              element={
                <>
                  <Header />
                  <PaginaNaoEncontrada />
                </>
              }
            />
          </Route>

          {/* Rota CATADOR */}
          <Route path="/" element={<ProtecaoCatador />}>
            <Route
              path="/perfil-catador"
              element={
                <>
                  <Header />
                  <Catador />
                </>
              }
            />
            <Route
              path="/lista-coleta-catador"
              element={
                <>
                  <Header />
                  <ListarColetasCatador />
                </>
              }
            />
            <Route
              path="/lista-relatorio-coleta-catador"
              element={
                <>
                  <Header />
                  <ListaRelatorioColetaCatador />
                </>
              }
            />
            <Route
              path="/relatorio-coleta"
              element={
                <>
                  <Header />
                  <RelatorioColeta />
                </>
              }
            />
            <Route
              path="/test"
              element={
                <>
                  <Header />
                  <AcompanhamentoColeta />
                </>
              }
            />
          </Route>

          {/* Rota ASSOCIAÇÃO */}
          <Route path="/" element={<ProtecaoAssociacao />}>
            <Route
              path="/lista-catador"
              element={
                <>
                  <Header />
                  <ListaCatador />
                </>
              }
            />
            <Route
              path="/perfil-associacao"
              element={
                <>
                  <Header />
                  <Associacao />
                </>
              }
            />
            <Route
              path="/lista-venda"
              element={
                <>
                  <Header />
                  <ListaVenda />
                </>
              }
            />
            <Route
              path="/lista-relatorio-venda-associacao"
              element={
                <>
                  <Header />
                  <ListaRelatorioVendaAssociacao />
                </>
              }
            />
            <Route
              path="/relatorio-venda"
              element={
                <>
                  <Header />
                  <RelatorioVenda />
                </>
              }
            />
          </Route>

          {/* Rota Admin */}
          <Route path="/" element={<ProtecaoAdmin />} />
          <Route
            path="/perfil-admin"
            element={
              <>
                <Header />
                <Admin />
              </>
            }
          />
          <Route
            path="/lista-catadores-adm"
            element={
              <>
                <Header />
                <ListarTodosCatadores />
              </>
            }
          />
          <Route
            path="/lista-associacao"
            element={
              <>
                <Header />
                <ListarAssociacoes />
              </>
            }
          />
          <Route
            path="/lista-operador"
            element={
              <>
                {" "}
                <Header /> <ListarOperadorLogistico />
              </>
            }
          />
          <Route
            path="/lista-coleta"
            element={
              <>
                <Header />
                <ListaColeta />
              </>
            }
          />
          <Route
            path="/lista-venda"
            element={
              <>
                <Header />
                <ListaVenda />
              </>
            }
          />
          <Route
            path="/lista-relatorio-coleta"
            element={
              <>
                <Header />
                <ListaRelatorioColeta />
              </>
            }
          />
          <Route
            path="/lista-relatorio-venda"
            element={
              <>
                <Header />
                <ListaRelatorioVenda />
              </>
            }
          />
          <Route
            path="/relatorio-coleta-adm"
            element={
              <>
                <Header />
                <RelatorioColetaAdm />
              </>
            }
          />
          <Route
            path="/relatorio-venda-adm"
            element={
              <>
                <Header />
                <RelatorioVendaAdm />
              </>
            }
          />

          {/* Rota LOGISTICA */}
          <Route path="/" element={<ProtecaoLogistica />}>
            <Route
              path="/perfil-logistica"
              element={
                <>
                  <Header />
                  <OperadorLogistico />
                </>
              }
            />
            {/* TODO: REMOVER CODIGO COMENTADO */}
            {/* <Route path="/lista-coleta" element={<><Header /><ListaColeta /></>} />
          <Route path="/lista-venda" element={<><Header /><ListaVenda /></>} />
          <Route path="/lista-relatorio-coleta" element={<><Header /><ListaRelatorioColeta /></>} />
          <Route path="/lista-relatorio-venda" element={<><Header /><ListaRelatorioVenda /></>} />
          <Route path="/relatorio-coleta-adm" element={<><Header /><RelatorioColetaAdm /></>} />
          <Route path="/relatorio-venda-adm" element={<><Header /><RelatorioVendaAdm/></>} /> */}
          </Route>

          <Route
            path="/usuario"
            element={
              <>
                <Header />
                <Perfil />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
