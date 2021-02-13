import db from '../Databases'
export default class Model {
  constructor (table, Key) {
    this.table = table
    this.primaryKey = Key
  }

  Runsql (sql, params = [], result) {
    db.all(sql, params, (error, rows) => {
      if (error) {
        return result(false)
      } else {
        return result(rows)
      }
    })
  }

  findAll (result) {
    const sql = `SELECT * FROM ${this.table};`
    db.all(sql, (error, rows) => {
      if (error) {
        return result(false)
      } else {
        return result(rows)
      }
    })
  }

  findFields (colums, result) {
    const sql = `SELECT ${colums} FROM ${this.table};`
    db.all(sql, (error, rows) => {
      if (error) {
        return result(false)
      } else {
        return result(rows)
      }
    })
  }

  find (id, result) {
    const sql = `SELECT * FROM ${this.table} WHERE ${this.primaryKey} = ?;`
    db.get(sql, id, (error, rows) => {
      if (error) {
        return result(false)
      } else {
        return result(rows)
      }
    })
  }

  findOne (id, whereID, colums, result) {
    const sql = `SELECT ${colums} FROM ${this.table} WHERE ${whereID}=?;`
    db.get(sql, id, (error, rows) => {
      if (error) {
        return result(false)
      } else {
        return result(rows)
      }
    })
  }

  insert (data, result) {
    const key = Object.keys(data)
    const value = Object.values(data)
    const valuedata = []
    key.forEach(() => valuedata.push('?'))
    const sql = `INSERT INTO ${this.table}(${key}) VALUES (${valuedata})`
    db.run(sql, value, (err) => {
      if (err) {
        return result(false)
      } else {
        return result(true)
      }
    })
  }

  update (id, data, result) {
    const key = Object.keys(data)
    const value = Object.values(data)
    const valuedata = []
    key.forEach(el => valuedata.push(`${el} = ?`))
    const sql = `UPDATE ${this.table} SET ${valuedata} WHERE ${this.primaryKey} = ${id};`
    db.run(sql, value, (err) => {
      if (err) {
        return result(false)
      } else {
        return result(true)
      }
    })
  }

  delete (id, result) {
    const sql = `DELETE FROM ${this.table} WHERE ${this.primaryKey} = ?`
    db.run(sql, id, (err) => {
      if (err) {
        return result(false)
      } else {
        return result(true)
      }
    })
  }

  selectCOUNT (name, result) {
    const sql = `SELECT COUNT(${this.primaryKey}) AS ${name} FROM ${this.table}`
    db.get(sql, (err, rows) => {
      if (err) {
        return result(false)
      } else {
        return result(rows)
      }
    })
  }

  selectSUM (colums, name, result) {
    const sql = `SELECT SUM(${colums}) AS ${name} FROM ${this.table}`
    db.get(sql, (err, rows) => {
      if (err) {
        return result(false)
      } else {
        return result(rows)
      }
    })
  }
}
