const db = require('../config/database');

class User {
    static async create (name, email) {
        const [result] = await db.promise().query(
            'INSERT INTO users (name,email) VALUES (?,?)', [name, email]
        );
        return result.insertId;
    }

    static async getAll () {
        const [rows] = await db.promise().query(
            'SELECT * FROM users'
        );
        return rows;
    }
}

module.exports = User;