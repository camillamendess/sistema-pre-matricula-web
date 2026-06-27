import { useState } from "react";
import logOutIcon from "../assets/icons/logout.svg";
import LargeCard from "../components/large-card";
import Sidebar from "../components/sidebar";
import SmallCard from "../components/small-card";

export default function HomeAluno() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden relative">
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Wrapper: Hidden off-screen on mobile, visible on lg+ desktop */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
      >
        <Sidebar role="aluno" />
      </div>

      <main className="flex-1 flex flex-col p-6 lg:p-12 overflow-y-auto w-full h-full relative">
        
        {/* Mobile Header: Hamburger menu, Headline, and Logout button */}
        <div className="flex justify-between items-start mb-6 lg:mb-10 w-full">
          <div className="flex items-center gap-3">
            {/* Hamburger Icon */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-[#322A6A] p-1 -ml-1 cursor-pointer"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            <header>
              <h2 className="text-[#322A6A] text-2xl lg:text-3xl font-bold mb-1">
                Olá, Fulano!
              </h2>
              <p className="text-[#332a6ad0] font-medium text-sm lg:text-base hidden lg:block">
                Realize sua pré-matrícula nas disciplinas do semestre.
              </p>
            </header>
          </div>

          <button className="flex items-center gap-2 text-[#322A6A] hover:text-[#272057] transition-colors cursor-pointer font-medium text-sm lg:absolute lg:top-12 lg:right-12">
            <span className="hidden lg:inline">Encerrar Sessão</span>
            <img src={logOutIcon} alt="Logout" className="w-6 h-6 lg:w-5 lg:h-5" />
          </button>
        </div>

        {/* Mobile Subheader Description */}
        <p className="text-[#332a6ad0] font-medium text-sm mb-6 lg:hidden">
          Realize sua pré-matrícula nas disciplinas do semestre.
        </p>

        {/* Content Wrapper */}
        <div className="flex flex-col lg:flex-row gap-8 flex-1 h-full pb-4 lg:pb-0">
          
          {/* Courses Section: Centered vertically on mobile, standard on desktop */}
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
                text="Realizar Pré Matrícula"
                icon="profile"
                variant="blue"
              />
            </div>
            <div className="flex-none w-fit">
              <SmallCard
                text="Editar Meus dados"
                icon="add-user"
                variant="blue"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}