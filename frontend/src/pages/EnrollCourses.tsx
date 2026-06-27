import { useState } from "react";
import StudentLayout from "../layouts/StudentLayout"; // Adjust path as needed
import SmallCard from "../components/small-card";

// 1. Mock data object for courses
const MOCK_COURSES = [
  {
    id: 1,
    name: "Desenvolvimento de Sistemas Web",
    teacher: "Stenio Longo Araújo",
    credits: 60,
    schedule: {
      Segunda: ["07:30 - 09:10", "09:10 - 11:00"],
      Terça: [],
      Quarta: ["07:30 - 09:10"],
      Quinta: [],
      Sexta: [],
      Sábado: []
    }
  },
  {
    id: 2,
    name: "Programação Concorrente",
    teacher: "Prof. Me. Santos",
    credits: 60,
    schedule: {
      Segunda: [],
      Terça: ["09:10 - 11:00", "11:00 - 12:40"],
      Quarta: [],
      Quinta: ["09:10 - 11:00"],
      Sexta: [],
      Sábado: []
    }
  },
  {
    id: 3,
    name: "Arquitetura de Computadores",
    teacher: "Prof. Dr. Silva",
    credits: 30,
    schedule: {
      Segunda: ["07:30 - 09:10", "09:10 - 11:00"],
      Terça: [],
      Quarta: ["07:30 - 09:10"],
      Quinta: [],
      Sexta: [],
      Sábado: []
    }
  }
];

const TIME_SLOTS = ["07:30 - 09:10", "09:10 - 11:00", "11:00 - 12:40"];
const DAYS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

export default function EnrollCourses() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <StudentLayout pageTitle="Disciplinas Disponíveis">
      {/* Required Container: bg #f8f8f8, border-radius 10px, padding 40px */}
      <div className="bg-[#f8f8f8] rounded-[10px] p-[40px] w-full max-w-5xl">
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
                    <p className="text-gray-700 font-medium"><strong>Professor(a):</strong> {course.teacher}</p>
                    <p className="text-gray-700 font-medium"><strong>Créditos:</strong> {course.credits}</p>
                  </div>

                  {/* Schedule Table */}
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse text-sm text-center">
                      <thead>
                        <tr>
                          <th className="border border-gray-300 bg-gray-100 p-2 text-[#322A6A]">Horários</th>
                          {DAYS.map(day => (
                            <th key={day} className="border border-gray-300 bg-gray-100 p-2 text-[#322A6A]">{day}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {TIME_SLOTS.map(time => (
                          <tr key={time}>
                            <td className="border border-gray-300 p-2 font-medium bg-gray-50">{time}</td>
                            {DAYS.map(day => {
                              // Check if the current time slot exists in the array for this specific day
                              const hasClass = (course.schedule as Record<string, string[]>)[day]?.includes(time);
                              return (
                                <td key={`${day}-${time}`} className="border border-gray-300 p-2">
                                  {hasClass ? (
                                    <div className="bg-[#322A6A] text-white rounded text-xs py-1 px-2 font-bold w-full">
                                      Aula
                                    </div>
                                  ) : (
                                    <span className="text-gray-300">-</span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
            linkTo="/home-aluno"
            text="Voltar"
            variant="blue"
        />
      </div>
    </StudentLayout>
  );
}