const RelatorioModel = require('../models/RelatorioModel');

class RelatorioController {

    static async disciplinasMatriculadas(req, res) {

        try {

            const { semestre, ordenar_por } = req.query;

            const ordem =
                ordenar_por === 'quantidade'
                    ? 'quantidade'
                    : 'nome';

            const relatorio =
                await RelatorioModel.disciplinasMatriculadas(semestre,ordem);

            return res.status(200).json(relatorio);

        } catch (error) {

            return res.status(500).json({
                erro: error.message
            });

        }

    }

}

module.exports = RelatorioController;