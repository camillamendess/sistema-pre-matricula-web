import { useEffect } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";

interface PopupNotificacaoProps {
  isOpen: boolean;
  tipo: "sucesso" | "erro";
  mensagem: string;
  onClose: () => void;
  duration?: number;
}

export default function PopupNotificacao({
  isOpen,
  tipo,
  mensagem,
  onClose,
  duration = 3000,
}: PopupNotificacaoProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const cores = {
    sucesso: {
      bg: "bg-emerald-50 border-emerald-200",
      texto: "text-emerald-800",
      subtexto: "text-emerald-600/90",
      icone: <CheckCircle2 className="text-emerald-500" size={28} />,
    },
    erro: {
      bg: "bg-rose-50 border-rose-200",
      texto: "text-rose-800",
      subtexto: "text-rose-600/90",
      icone: <XCircle className="text-rose-500" size={28} />,
    },
  }[tipo];

  return (
    <div className="fixed top-5 right-5 z-100 max-w-md w-full bg-white border rounded-2xl shadow-2xl p-4 animate-in slide-in-from-top-5 fade-in duration-300">
      <div
        className={`flex items-start gap-3 p-1.5 rounded-xl border ${cores.bg}`}
      >
        {cores.icone}

        <div className="flex-1 min-w-0 pt-0.5">
          <p className={`text-sm font-bold ${cores.texto}`}>
            {tipo === "sucesso" ? "Sucesso!" : "Ops, algo deu errado"}
          </p>
          <p
            className={`text-xs mt-0.5 font-medium leading-relaxed ${cores.subtexto}`}
          >
            {mensagem}
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-0.5 rounded-lg hover:bg-gray-200/50"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
