import { useState } from "react";
import PagesLayout from "../layouts/PagesLayout"; // Adjust path as needed
import SmallCard from "../components/small-card";

// 1. Mock data object for courses
const MOCK_COURSES = [
  {
    id: 1,
    name: "Desenvolvimento de Sistemas Web",
    credits: 60,
    department: 'DCET'
  },
  {
    id: 2,
    name: "Programação Concorrente",
    credits: 60,
    department: 'DCET'
  },
  {
    id: 3,
    name: "Arquitetura de Computadores",
    credits: 30,
    department: 'DCET'
  },
  {
    id: 4,
    name: "Desenvolvimento de Sistemas Web",
    credits: 60,
    department: 'DCET'
  },
  {
    id: 5,
    name: "Programação Concorrente",
    credits: 60,
    department: 'DCET'
  },
  {
    id: 6,
    name: "Arquitetura de Computadores",
    credits: 30,
    department: 'DCET'
  }
];

export default function EnrollCourses() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <PagesLayout pageTitle="Disciplinas Disponíveis">
      {/* Required Container: bg #f8f8f8, border-radius 10px, padding 40px */}
      <div className="bg-[#f8f8f8] rounded-[10px] p-10 w-full max-w-5xl">
        <h3 className="text-[#322A6A] text-xl font-bold mb-6">
          Selecione as disciplinas para matrícula
        </h3>

        <div className="flex flex-col gap-4">
          {MOCK_COURSES.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              
              {/* Accordion Trigger */}
              <button
                onClick={() => toggleAccordion(course.id)}
                className="w-full flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <span className="text-[#322A6A] font-bold text-lg">{course.name}</span>
                {/* Arrow Icon */}
                <svg
                  className={`w-6 h-6 text-[#322A6A] transition-transform duration-300 ${openAccordion === course.id ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              {/* Accordion Content */}
              {openAccordion === course.id && (
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="mb-6">
                    <p className="text-gray-700 font-medium"><strong>Departamento:</strong> {course.department}</p>
                    <p className="text-gray-700 font-medium"><strong>Créditos:</strong> {course.credits}</p>
                  </div>

                  {/* Action Button */}
                  <div className="flex justify-end">
                    <button className="bg-[#322A6A] text-white px-8 py-2 rounded-lg font-bold hover:bg-[#251c61] transition-colors cursor-pointer shadow-md">
                      Matricular
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <br />
        <SmallCard
            linkTo="/home"
            text="Voltar"
            variant="blue"
        />
      </div>
    </PagesLayout>
  );
}