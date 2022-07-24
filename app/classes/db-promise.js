const mysql = require('mysql');

const log = global.App.require('lib/log');

class DB {
    constructor(host, user, password, name, connectionLimit = 10) {
        this.config = {
            host, user, password, database: name, connectionLimit,
        };
        this.pool = null;
        this.pool = mysql.createPool(this.config);
    }

    /**
    * Send a 'call stored procedure' query. This method will only return a single record.
    * @param  {String} procedure - Procedure name
    * @param  {Array} params - a list of procedure's params in array format
    * @return {Object} Single-record query result
    */
    async callProcedure(procedure, params) {
        try {
            const conn = await this._acquire();

            // Build placeholder string
            let placeholders = '';
            if (params.length >= 1) {
                placeholders = '?';
                placeholders += Array(params.length).join(', ?');
            }
            const sql = `CALL ${procedure} (${placeholders})`;
            const result = await this._execute(conn, sql, params);

            if (result && result.length === 2 && result[0][0]) {
                return result[0][0];
            }

            return null;
        } catch (err) {
            log.error(err);
            throw err;
        }
    } // callProcedure()

    /**
    * Send a 'call stored procedure' query. This method can return more than 1 record.
    * @param  {String} procedure - Procedure name
    * @param  {Array} params - a list of procedure's params in array format
    * @return {Array} Multi-records query result in array format
    */
    async callProcedureArray(procedure, params) {
        try {
            const conn = await this._acquire();

            // Build placeholder string
            let placeholders = '';
            if (params.length >= 1) {
                placeholders = '?';
                placeholders += Array(params.length).join(', ?');
            }
            const sql = `CALL ${procedure} (${placeholders})`;
            const result = await this._execute(conn, sql, params);

            if (result && result.length === 2 && result[0]) {
                return result[0];
            }

            return null;
        } catch (err) {
            log.error(err);
            throw err;
        }
    } // callProcedureArray()

    _acquire() {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (!connection) {
                    reject(Error('Invalid connection returned by the mysql driver'));
                    return;
                }

                resolve(connection);
            });
        });
    } // _acquire()

    _execute(connection, sqlStatement, sqlParams) {
        return new Promise((resolve, reject) => {
            connection.query(sqlStatement, sqlParams, (err, result) => {
                connection.release();
                if (err) {
                    reject(err);
                    return;
                }

                resolve(result);
            });
        });
    } // _execute()
} // class DB

module.exports = DB;
