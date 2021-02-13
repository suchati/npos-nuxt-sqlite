import sqlite from 'sqlite3'
import consola from 'consola'
import tb from './.data/tables'
const { Database } = sqlite
const db = new Database('server/Databases/.data/database.db', (error) => {
  if (error) {
    return consola.error('Can not Connect Database')
  } else {
    db.serialize(() => {
      db.run(tb.users)
      db.run(tb.products)
      db.run(tb.sales)
      db.run(tb.saledetails)
      db.run(tb.categorys)
      db.run(tb.customers)
      db.run(tb.payment)
      db.run(tb.suppliers)
    })
  }
})
export default db
