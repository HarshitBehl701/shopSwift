import { executeQuery } from "../config/mySqlConfig";
import { getCustomResponseBlockForQueriesExecution } from "./commonHelpers";

export default class CustomModal {
    private _tableName: string;
    private _query: string;
    private _values: any[];

    constructor(tableName: string) {
        this._tableName = tableName;
        this._query = "";
        this._values = [];
    }

    get query() {
        return this._query;
    }

    get values() {
        return this._values;
    }

    //operations   
    create(obj: { [key: string]: any }) {
        const columns = Object.keys(obj).map((str) => `\`${str}\``);
        this._values = Object.values(obj);
        this._query = `INSERT INTO \`${this._tableName}\` (${columns.join(", ")}) VALUES (${columns.map(() => "?").join(",")}) `;
    }

    //read
    select(columns?: string[]) {
        this._query = (this._query.includes("UNION")) ? `${this._query}  SELECT ${Array.isArray(columns) ? columns.join(",") : '*'} FROM \`${this._tableName}\` ` : `SELECT ${Array.isArray(columns) ? columns.join(",") : '*'} FROM \`${this._tableName}\` `;
    }

    update(obj: { [key: string]: any }) {
        const columns = Object.keys(obj).map((str) => `\`${str}\`=?`);
        this._values = Object.values(obj);
        this._query = `UPDATE  \`${this._tableName}\` SET ${columns.join(", ")} `;
    }

    delete(conditions: { column_name: string, value: any, operand?: string }[], condition_type?: string) {
        const conditionsString = this.where(conditions, condition_type);
        this._query = `DELETE  FROM  \`${this._tableName}\` WHERE ${conditionsString} `;
    }

    //conditions
    where(conditions: { column_name: string, value: any, operand?: string } | { column_name: string, value: any, operand?: string }[], condition_type?: string) {
        if (Array.isArray(conditions)) {
            const conditionsString = conditions.map(condition => condition.column_name.includes(".") ?
                condition.column_name.split(".").map((str) => `\`${str}\``).join(".") +  '=? ' : 
                `\`${condition.column_name}\`` + `${condition.operand ? condition.operand : '='}?`).join(` ${condition_type ? condition_type.toUpperCase() 
                : 'AND'} `);
            this._values.push(...conditions.flatMap(condition => condition.value))
            this._query = this._query + ` WHERE ${conditionsString}`;
            return conditionsString;
        } else {
            this._values.push(conditions.value);
            const conditionsString =
                conditions.column_name.includes(".") ?
                    conditions.column_name.split(".").map((str) => `\`${str}\``).join(".") + (conditions.operand ? conditions.operand : '=') + '?' :
                    `\`${conditions.column_name}\`${conditions.operand ? conditions.operand : '='}?`;
            this._query = this._query + `  WHERE ${conditionsString}`;
            return conditionsString;
        }
    }

    groupBy(column_name: string) {
        this._query = this._query + ` GROUP   BY \`${column_name}\` `;
    }

    orderBy(columns: { column_name: string, condition?: string } | { column_name: string, condition?: string }[], condition?: string) {
        if (Array.isArray(columns)) {
            if (condition) {
                this._query = this._query + ` ORDER BY  \`${columns.map((column) => `\`${column.column_name}\` `).join(", ")}\` ${condition.toUpperCase()} `;
            } else {
                this._query = this._query + ` ORDER BY  \`${columns.map((column) => `\`${column.column_name}\` ${column.condition ? column.condition : ''} `).join(", ")}\` `;
            }
        } else {
            if (columns.condition) {
                this._query = this._query + ` ORDER BY  \`${columns.column_name}\` ${columns.condition.toUpperCase()} `;
            } else {
                this._query = this._query + ` ORDER BY  \`${columns.column_name}\` ${condition ? condition.toUpperCase() : "ASC"} `;
            }
        }
    }

    join(second_table_name: string, conditions: { first_table_column_name: string, operand: string, second_table_column_name: string }, join_type?: string) {
        this._query = this.query + ` ${join_type ? join_type : "INNER JOIN"} \`${second_table_name}\` ON ${this._tableName}.${conditions.first_table_column_name} ${conditions.operand ? conditions.operand : '='} ${second_table_name}.${conditions.second_table_column_name} `;
    }

    union() {
        this._query = this.query + " UNION ";
    }

    async execute() {
        const response = await executeQuery(this._query, this._values);
        return getCustomResponseBlockForQueriesExecution(response);
    }

}