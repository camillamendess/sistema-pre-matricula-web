import { useState, useEffect } from "react";
import PagesLayout from "../layouts/PagesLayout";
import { useAuth } from "../contexts/AuthContext";

export default function Perfil() {
  const { user } = useAuth();
  useEffect(() => {
   console.log("User data:", user);
 }, [user]);

  return (
    <PagesLayout
      pageTitle="Meu Perfil"
      pageDescription="Visualize suas informações cadastradas no sistema."
      userType="aluno"
    >
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 w-full max-w-2xl">
        <div className="space-y-6">
        <div className="border-b border-gray-100 pb-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Nome Completo</h3>
            <p className="text-lg text-[#322A6A] font-semibold">{user?.nome}</p>
        </div>

        <div className="border-b border-gray-100 pb-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">E-mail Institucional</h3>
            <p className="text-lg text-[#322A6A] font-semibold">{user?.email || "Não disponível"}</p>
        </div>

        <div className="pb-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Número de Matrícula</h3>
            <p className="text-lg text-[#322A6A] font-semibold">{user?.matricula || "Não disponível"}</p>
        </div>
        </div>
      </div>
    </PagesLayout>
  );
}