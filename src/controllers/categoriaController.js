import categoriaModel from "../models/categoriaModel.js";

const categoriaController = {

    buscarTodasCategorias: async (req, res) => {
        try {

            const resultado = await categoriaModel.selectTodasCategorias();

            if (resultado.length === 0) {  // quando o resultado for 0 (sem categorias)
                return res.status(200).json({ message: 'A tabela selecionada não contém dados' })
            }

            res.status(200).json({
                message:
                    'Resultado dos dados listados',
                    data: resultado
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Ocorreu um erro no server!',
                errorMessage: error.message
            });
        }

    },

      incluirCategoria: async(req, res)=>{
        try {
            
            const {descricao} = req.body;

            if(typeof descricao !== 'string' || !descricao){

                return res.status(400).json({
                    message: 'Dados inválidos'
                });

            }
            const resultado = await categoriaModel.insertCategoria(descricao);

            if(resultado.affectedRows === 1 && resultado.insertId !== 0) {
                res.status(201).json({
                    message: 'Registro incluido com sucesso', 
                    result: resultado
                })
            }else{
                throw new Error('Ocorreu um erro ao incluir um registro'); //
            }

        } catch (error) {
            
            console.error(error);
            res.status(500).json({
                message: 'Ocorreu um erro no server!',
                errorMessage: error.message
            });

        }
    },

    excluirCategoria: async (req, res) => {
        try {
            
            const id = Number(req.params.idCategoria);

            if(!id || !Number.isInteger(id)) {
                return res.status(400).json({
                    message: 'Forneça um ID válido'
                });
            }

            const categoriaSelecionada = await categoriaModel.selecionarCategoriaId(id);
            
            if(categoriaSelecionada.length === 0){
                throw new Error('Registro não localizado');
            } else {
                const resultado = await categoriaModel.excludeCategoria(id);

                if(resultado.affectedRows === 1){
                    res.status(200).json({
                        message: 'Produto excluído com sucesso',
                        data: resultado
                    });
                } else {
                    throw new Error('Não foi possível excluir produto');
                }
            }


        } catch (error) {
            
            console.error(error);
            res.status(500).json({
                message: 'Ocorreu um erro no server!',
                errorMessage: error.message
            });
        }
        
    },

    atualizarCategoria: async (req, res) => {
        try {
            
            const idCategoria = Number(req.params.idCategoria);

            let {descricao} = req.body;
            
            descricao = descricao.trim();

            if(!idCategoria || !descricao || typeof idCategoria !== 'number' || !isNaN(descricao) || descricao.trim().length < 3){ // trim(): limpa os espaços digitados pelo usuário (EX: {   murilo   })
;
                return res.status(400).json({
                    message: 'Dados inválidos, tente novamente'
                });

            }

            const categoriaAtual = await categoriaModel.selecionarCategoriaId(idCategoria); //Se o usuário quiser atualizar apenas um campo, o campo não atualizado receberá o valor anterior
            
            if(categoriaAtual.length === 0){
                throw new Error('Registro não localizado');
            }

            const novaDescricao = descricao ?? categoriaAtual[0].descricao;
            

            const resultado = await categoriaModel.updateCategoria(idCategoria, novaDescricao);

            if(resultado.changedRows === 0){
                throw new Error('Ocorreu um erro ao atualizar o produto');

            }

            res.status(200).json({
                message: 'Registro atualizado com sucesso',
                data: resultado
            });

        } catch (error) {
            
            console.error(error);
            res.status(500).json({
                message: 'Ocorreu um erro no server!',
                errorMessage: error.message
            });
        }
        
    }

};

export default categoriaController;