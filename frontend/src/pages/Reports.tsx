import { useState, useRef, UIEvent } from "react";
import StudentLayout from "../layouts/StudentLayout";
import logoUesb from "../assets/uesb-logo-2.png"; // Adjust this path to your actual logo asset

// Mock data for the report
const MOCK_REPORT_DATA = [
  { id: 1, name: "Arquitetura de Computadores", department: "Ciência da Computação", enrolled: 45 },
  { id: 2, name: "Programação Concorrente", department: "Ciência da Computação", enrolled: 38 },
  { id: 3, name: "Lógica Digital", department: "Engenharia", enrolled: 52 },
  { id: 4, name: "Cálculo I", department: "Matemática", enrolled: 60 },
  { id: 5, name: "Física Básica", department: "Física", enrolled: 41 },
];

export default function Reports() {
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [isAtTop, setIsAtTop] = useState(true);

  // Determine if the report should be generated (both options selected)
  const isReportGenerated = selectedSemester !== "" && selectedSort !== "";

  // Handle scroll on the gray container to show/hide the floating message
  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop > 20) {
      setIsAtTop(false);
    } else {
      setIsAtTop(true);
    }
  };

  // Trigger the browser's print dialog, which we will style via CSS to only print the A4 paper
  const handleDownloadPDF = () => {
    window.print();
  };

  // Sort data based on user selection
  const getSortedData = () => {
    const data = [...MOCK_REPORT_DATA];
    if (selectedSort === "name") {
      return data.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (selectedSort === "quantity") {
      return data.sort((a, b) => b.enrolled - a.enrolled);
    }
    return data;
  };

  return (
    <StudentLayout
      pageTitle="Gerar Relatórios"
      pageDescription="Configure e visualize relatórios de matrículas."
    >
      <div className="flex flex-col gap-8 w-full max-w-6xl h-full pb-10">
        
        {/* === SECTION 1: Controls (Hidden during print) === */}
        <div className="flex flex-col md:flex-row gap-6 print:hidden">
          {/* Container 1: Semester Selection */}
          <div className="flex-1 bg-white border border-gray-200 p-6 rounded-xl shadow-sm flex flex-col gap-4 justify-between">
            <div className="flex items-center gap-3">
              <span className="bg-[#322A6A] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                1
              </span>
              <h3 className="text-[#322A6A] font-bold text-lg">
                Selecione o Semestre
              </h3>
            </div>
            <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-500 ">
                  Escolha o período letivo para o qual deseja gerar o relatório.
                </p>
                <select
                  className=" bg-[#f8f8f8] border border-gray-300 text-[#322A6A] text-sm rounded-lg focus:ring-[#322A6A] focus:border-[#322A6A] block w-full p-2.5 outline-none"
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                >
                  <option value="">Selecione uma opção...</option>
                  <option value="2024.2">2024.2</option>
                  <option value="2025.1">2025.1</option>
                  <option value="2025.2">2025.2</option>
                  <option value="2026.1">2026.1</option>
                </select>
            </div>
          </div>

          {/* Container 2: Sorting Selection */}
          <div className="flex-1 bg-white border border-gray-200 p-6 rounded-xl shadow-sm flex flex-col gap-4 justify-between">
            <div className="flex items-center gap-3">
              <span className="bg-[#322A6A] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                2
              </span>
              <h3 className="text-[#322A6A] font-bold text-lg">
                Selecione a Ordenação
              </h3>
            </div>
            <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-500 ">
                  Escolha como os dados devem ser organizados no documento.
                </p>
                <select
                  className=" bg-[#f8f8f8] border border-gray-300 text-[#322A6A] text-sm rounded-lg focus:ring-[#322A6A] focus:border-[#322A6A] block w-full p-2.5 outline-none"
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                >
                  <option value="">Selecione uma opção...</option>
                  <option value="name">Por nome da disciplina</option>
                  <option value="quantity">Por quantidade de alunos matriculados</option>
                  <option value="classes">Por turmas</option>
                </select>
            </div>
          </div>
        </div>

        {/* === SECTION 2: Report Preview === */}
        <div className="flex-1 flex flex-col min-h-0 ">
          {!isReportGenerated ? (
            /* STATE 1: No Report */
            <div className="flex-1 border-2 border-dashed border-[#322A6A] rounded-xl flex items-center justify-center bg-[#f8f8f8] print:hidden">
              <p className="hidden lg:block text-[#322A6A] text-lg font-medium text-center px-4">
                Selecione o semestre e a ordenação acima para gerar e visualizar o relatório.
              </p>
              <p className="lg:hidden text-[#322A6A] text-lg font-medium text-center px-4">
                Ainda será possível baixar o relatório em PDF. No entanto, para pre-visualizar o relatório, acesse o sistema de um dispositivo desktop (PC, notebook, etc.).
              </p>
            </div>
          ) : (
            /* STATE 2: Report Generated */
            <div className="flex-col h-full gap-4 relative">
              {/* Scrollable Gray Container */}
              <div 
                className="hidden lg:flex max-h-100 bg-[#e0e0e0] rounded-[20px] shadow-inner flex-1 overflow-y-auto relative justify-center py-10 px-4 print:p-0 print:bg-white print:overflow-visible print:shadow-none print:block"
                onScroll={handleScroll}
              >
                
                {/* Floating Message (Hidden on print) */}
                <div
                  className={`absolute bottom-1/14 z-10 bg-[#322A6A] text-white px-6 py-2 rounded-full font-medium shadow-md transition-all duration-200 print:hidden ${
                    isAtTop ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                  }`}
                >
                  Deslize para ver mais ↓
                </div>

                {/* A4 Paper Frame */}
                <div 
                  className="bg-white w-[210mm] min-h-[297mm] shadow-lg p-[20mm] flex flex-col print:shadow-none print:w-full print:min-h-0 print:p-0"
                >
                  {/* Report Header */}
                  <div className="flex items-start gap-6 mb-12">
                    <img src={logoUesb} alt="Logo Instituição" className="w-24 object-contain" />
                    <div className="flex flex-col items-start justify-center text-left">
                      <h1 className="text-black font-bold text-2xl uppercase tracking-wide">
                        Relatório de Matrículas
                      </h1>
                      <h2 className="text-black font-bold text-lg mt-1">
                        Semestre Letivo: {selectedSemester}
                      </h2>
                      <p className="text-black text-sm mt-2">
                        27 de junho de 2026, 16:26
                      </p>
                    </div>
                  </div>

                  {/* Report Table */}
                  <table className="w-full border-collapse text-black text-sm text-left">
                    <thead>
                      <tr>
                        <th className="border border-black p-3 font-bold bg-gray-50 w-12 text-center">#</th>
                        <th className="border border-black p-3 font-bold bg-gray-50">Nome da Disciplina</th>
                        <th className="border border-black p-3 font-bold bg-gray-50">Departamento</th>
                        <th className="border border-black p-3 font-bold bg-gray-50 text-center">Alunos Matriculados</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getSortedData().map((course, index) => (
                        <tr key={course.id}>
                          <td className="border border-black p-3 text-center">{index + 1}</td>
                          <td className="border border-black p-3">{course.name}</td>
                          <td className="border border-black p-3">{course.department}</td>
                          <td className="border border-black p-3 text-center">{course.enrolled}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {/* Spacer to push potential footers down, acting as standard A4 filler */}
                  <div className="flex-1"></div>
                  
                  <div className="border-t border-black pt-4 mt-12 text-center text-xs text-black">
                    Documento gerado pelo Sistema Acadêmico de Pre-Matricula - UESB
                  </div>
                </div>
              </div>

              {/* Download Button (Hidden on print) */}
              <div className="flex justify-center lg:justify-end print:hidden">
                <button 
                  onClick={handleDownloadPDF}
                  className="bg-[#322A6A] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#251c61] transition-colors shadow-md flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                  Baixar em PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Global styles specifically for printing this component */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          /* Target only the A4 paper to be visible during print */
          .print\\:block, .print\\:block * {
            visibility: visible;
          }
          .print\\:block {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          /* Hide elements tagged with print:hidden */
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </StudentLayout>
  );
}