import { useEffect, useState } from "react";
import LargeCard from "../components/large-card";
import SmallCard from "../components/small-card";
import PagesLayout from "../layouts/PagesLayout";
import { UsuarioController } from "../controllers/UsuarioController";
import { UsuarioModel } from "../models/UsuarioModel";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <PagesLayout
        pageTitle="Carregando..."
        pageDescription="Buscando informações do usuário."
      >
        <div className="flex h-full items-center justify-center">
          <div className="text-[#322A6A] font-bold text-lg animate-pulse">
            Carregando seus dados...
          </div>
        </div>
      </PagesLayout>
    );
  }

  // Fallback to "Aluno" if for some reason the name doesn't load

  const isAdmin = true;

  const displayTitle = user
    ? `Olá, ${user.nome.split(" ")[0]}!`
    : "Painel Administrativo";

  const displayDescription = isAdmin
    ? "Gerencie disciplinas, alunos e turmas."
    : "Realize sua pré-matrícula nas disciplinas do semestre.";

  return (
    <PagesLayout
      pageTitle={displayTitle}
      pageDescription={displayDescription}
      userType={isAdmin ? "admin" : "aluno"}
    >
      {isAdmin ? (
        /* ================= VISÃO DO ADMINISTRADOR ================= */
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl items-center pb-6">
          <SmallCard
            linkTo="/admin/cadastrar-aluno"
            text="Cadastrar Aluno"
            icon="add-user"
            variant="white"
          />
          <SmallCard
            linkTo="/admin/cadastrar-disciplina"
            text="Cadastrar Disciplina"
            icon="document"
            variant="white"
          />
          <SmallCard
            linkTo="/admin/cadastrar-turma"
            text="Cadastrar Turma"
            icon="profile"
            variant="white"
          />
          <SmallCard
            linkTo="/alunos"
            text="Consultar Alunos"
            icon="people"
            variant="white"
          />
          <SmallCard
            linkTo="/disciplinas"
            text="Consultar Disciplinas"
            icon="analyze"
            variant="white"
          />
          <SmallCard
            linkTo="/relatorios"
            text="Relatórios"
            icon="graph-report"
            variant="white"
          />
        </div>
      ) : (
        /* ================= VISÃO DO ALUNO ================= */
        <div className="flex flex-col lg:flex-row gap-8 flex-1 h-full pb-4 lg:pb-0">
          <div className="flex-1 flex flex-col justify-center lg:justify-start">
            <LargeCard title="Minhas disciplinas">
              <p className="max-w-xs leading-relaxed text-base text-[#322A6A]">
                Você ainda não está pré-matriculado em nenhuma disciplina.
              </p>
            </LargeCard>
          </div>

          <div className="flex flex-col md:flex-row lg:flex-col gap-4 lg:gap-6 mt-auto lg:mt-0 lg:w-auto justify-center items-center w-full">
            <div className="flex-none w-fit">
              <SmallCard
                linkTo="/matricular"
                text="Realizar Pré Matrícula"
                icon="profile"
                variant="blue"
              />
            </div>
            <div className="flex-none w-fit">
              <SmallCard
                linkTo="/perfil" // Atualizado de "/editar-aluno" para "/perfil" conforme AppRoutes
                text="Editar Meus dados"
                icon="add-user"
                variant="blue"
              />
            </div>
          </div>
        </div>
      )}
    </PagesLayout>
  );
}
