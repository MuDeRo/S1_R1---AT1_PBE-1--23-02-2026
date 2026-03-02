import produtoModel from "../models/produtoModel.js";

const produtoController = {

    buscarTodosProdutos: async (req, res) => {
        try {

            const resultado = await produtoModel.selectTodosProdutos();

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

    incluirProduto: async (req, res) => {
        try {

            const { nome, id_categoria } = req.body;

            const valor = Number(req.body.valor);

            const vinculo_image = `/uploads/image/${req.file.filename}`;


            if ( !nome || !valor || !id_categoria || typeof valor !== 'number' || typeof nome !== 'string') {

                return res.status(400).json({
                    message: 'Dados inválidos'
                });

            }
            // const pathImage = `uploads/images/${req, file.filename}`;
            const resultado = await produtoModel.insertProduto(id_categoria, nome, valor, vinculo_image);

            if (resultado.affectedRows === 1 && resultado.insertId !== 0) {
                res.status(201).json({
                    message: 'Registro incluido com sucesso',
                    result: resultado
                })
            } else {
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

    excluirProduto: async (req, res) => {
        try {

            const id = Number(req.params.idProduto);

            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({
                    message: 'Forneça um ID válido'
                });
            }

            const produtoSelecionado = await produtoModel.selecionarProdutoId(id);

            if (produtoSelecionado.length === 0) {
                throw new Error('Registro não localizado');
            } else {
                const resultado = await produtoModel.excludeProdutos(id);

                if (resultado.affectedRows === 1) {
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

    atualizarProduto: async (req, res) => {
        try {

            const idProduto = Number(req.params.idProduto);

            let { nome, valor } = req.body;

            nome = descricao.trim();

            if (!idProduto || !nome || typeof idProduto !== 'number' || !isNaN(nome) || !valor || typeof valor !== 'number') { // trim(): limpa os espaços digitados pelo usuário (EX: {   murilo   })
                ;
                return res.status(400).json({
                    message: 'Dados inválidos, tente novamente'
                });

            }

            const produtoAtual = await produtoModel.selecionarProdutoId(idProduto); //Se o usuário quiser atualizar apenas um campo, o campo não atualizado receberá o valor anterior

            if (produtoAtual.length === 0) {
                throw new Error('Registro não localizado');
            }

            const novaNome = nome ?? produtoAtual[0].nome;
            const novoValor = valor ?? produtoAtual[0].valor;


            const resultado = await produtoModel.updateProduto(idProduto, novaNome, novoValor);

            if (resultado.changedRows === 0) {
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

    },

    upload: async (req, res) => {
        try {

            if (!req.file) {
                return res.status(400).json({
                    message: 'Arquivo não enviado'
                })
            }

            res.status(200).json({
                message: 'Upload realizado com sucesso',
                file: {
                    filename: req.file.filename,
                    size: req.file.size,
                    mimetype: req.file.mimetype
                }
            })


        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Ocorreu um erro no server',
                errorMessage: error.message
            });
        }

    }
}

export default produtoController