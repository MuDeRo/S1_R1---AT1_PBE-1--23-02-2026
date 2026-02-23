import pool from "../config/db.js";

const categoriaModel = {
    
    insertCategoria: async (pDescricao)=> {
        const sql = 'INSERT INTO categoria (descricao) VALUES (?);';
        const values = [pDescricao];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    selectTodasCategorias: async () => {
        const sql = 'SELECT * FROM categoria;';
        const [rows] = await pool.execute(sql);
        return rows;
    },

    excludeCategoria: async (pId) => {
        const sql = 'DELETE FROM categoria WHERE id_categoria = ?;';
        const values = [pId];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    updateCategoria: async (pId, pDescricao) => {
        const sql = 'UPDATE categoria SET descricao=? WHERE id_categoria=?;'
        const values = [pDescricao, pId] //Ordem correta de acordo com o comando sql 
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    selecionarCategoriaId: async(pId)=>{
        const sql = 'SELECT * FROM categoria WHERE id_categoria = ?;';
        const values =[pId];
        const [rows] = await pool.query(sql, values);
        return rows;
        
    },

    // updateProduto: async (pId, ) => {
        
    // }
};

export default categoriaModel;
