import { useState, ReactNode } from "react";
import Sidebar from "../components/sidebar";
import logOutIcon from "../assets/icons/logout.svg";

interface StudentLayoutProps {
  children: ReactNode;
  pageTitle: string;
  pageDescription?: string;
}

export default function StudentLayout({ children, pageTitle, pageDescription }: StudentLayoutProps) {
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

      {/* Sidebar Wrapper */}
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
                {pageTitle}
              </h2>
              {pageDescription && (
                <p className="text-[#332a6ad0] font-medium text-sm lg:text-base hidden lg:block">
                  {pageDescription}
                </p>
              )}
            </header>
          </div>

          <button className="flex items-center gap-2 text-[#322A6A] hover:text-[#272057] transition-colors cursor-pointer font-medium text-sm lg:absolute lg:top-12 lg:right-12">
            <span className="hidden lg:inline">Encerrar Sessão</span>
            <img src={logOutIcon} alt="Logout" className="w-6 h-6 lg:w-5 lg:h-5" />
          </button>
        </div>

        {/* Mobile Subheader Description */}
        {pageDescription && (
          <p className="text-[#332a6ad0] font-medium text-sm mb-6 lg:hidden">
            {pageDescription}
          </p>
        )}

        {/* Dynamic Page Content */}
        {children}
      </main>
    </div>
  );
}