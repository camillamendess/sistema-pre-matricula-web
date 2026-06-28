import { useAuth } from "../contexts/AuthContext";
import PagesLayout from "../layouts/PagesLayout";

export default function Disciplinas() {
    const { user } = useAuth();
    return (
        <PagesLayout
            pageTitle="Disciplinas"
            pageDescription="Visualize e gerencie as disciplinas cadastradas no sistema."
            userType={user?.tipo_usuario === 1 ? "admin" : "aluno"}
        >
            <div>Lista de Disciplinas</div>
        </PagesLayout>
    )
}
