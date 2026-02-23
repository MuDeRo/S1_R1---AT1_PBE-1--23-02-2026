import pool from "../config/db.js";

const produtoModel = {
    
    insertProduto: async (pNome, pValor, pVinculoImage, pData)=> {
        const sql = 'INSERT INTO produtos (nome, valor, vinculo_image, data_cad) VALUES (?,?,?,?);';
        const values = [pNome, pValor, pVinculoImage, pData];
        const [rows] = await pool.execute(sql, values);
        return rows;
    },

    selectTodosProdutos: async () => {
        const sql = 'SELECT * FROM produtos;';
        const [rows] = await pool.execute(sql);
        return rows;
    },

    updateProduto: async (pId, pNome, pValor, pData ) => {
        const sql = 'UPDATE produtos SET nome=?, valor=?, data_cad=? WHERE id_produto=?;'
        const values = [pNome, pValor, pData, pId] //Ordem correta de acordo com o comando sql 
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    excludeProdutos: async (pId) => {
        const sql = 'DELETE FROM produtos WHERE id_produtos = ?;';
        const values = [pId];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    selecionarProdutoId: async(pId)=>{
        const sql = 'SELECT * FROM produtos WHERE id_produto = ?;';
        const values =[pId];
        const [rows] = await pool.query(sql, values);
        return rows;
        
    }
};

export default produtoModel;
