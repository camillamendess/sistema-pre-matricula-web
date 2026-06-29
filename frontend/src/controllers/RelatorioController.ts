import { request } from "../services/api";
import { RelatorioModel } from "../models/RelatorioModel";

class RelatorioController {

    static async gerarRelatorio(
        semester: string,
        ordenacao: string
    ) {

        const ordenar =
            ordenacao === "quantity"
                ? "quantidade"
                : "nome";

        const data = await request  <RelatorioModel[]>(`/relatorios/disciplinas?semestre=${semester}&ordenar_por=${ordenar}`);

        return data;
    }

}

export default RelatorioController;