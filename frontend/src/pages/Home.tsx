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
  const displayTitle = user ? `Olá, ${user.nome.split(" ")[0]}!` : "Página do Administrador";

  return (
    <PagesLayout 
      pageTitle={displayTitle} 
      pageDescription="Realize sua pré-matrícula nas disciplinas do semestre."
      userType={user?.tipo_usuario === 1 ? "admin" : "aluno"} // Passa o tipo de usuário para o layout
    >
      <div className="flex flex-col lg:flex-row gap-8 flex-1 h-full pb-4 lg:pb-0">
        <div className="flex-1 flex flex-col justify-center lg:justify-start">
          <LargeCard title="Minhas disciplinas">
            <p className="max-w-xs leading-relaxed text-base text-[#322A6A]">
              Você ainda não está pré-matriculado em nenhuma disciplina.
            </p>
          </LargeCard>
        </div>

        {/* Action Buttons Section: Side-by-side at the bottom on mobile, column on right for desktop */}
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
              linkTo="/editar-aluno"
              text="Editar Meus dados"
              icon="add-user"
              variant="blue"
            />
          </div>
        </div>
      </div>
    </PagesLayout>
  );
}