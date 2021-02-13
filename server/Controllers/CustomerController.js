import Model from '../Models'
import Random from '../Libraries/RandomInt'
const Customer = new Model('customers', 'cus_id')
export default {
  create: (req, res) => {
    const { name, email, phone, address } = req.body
    const data = {
      cus_code: Random(13),
      cus_name: name,
      cus_email: email,
      cus_phone: phone,
      cus_cash: 0,
      cus_address: address
    }
    if (data) {
      Customer.findOne(email, 'cus_email', 'cus_email', (result) => {
        if (result) {
          return res.json({ error_email: true })
        } else {
          Customer.insert(data, (insert) => {
            if (insert) {
              return res.json({ success: true })
            } else {
              return res.json({ success: false })
            }
          })
        }
      })
    } else {
      return res.json({ nodata: true })
    }
  },
  findID: (req, res) => {
    const id = req.body.code
    Customer.findOne(id, 'cus_code', '*', (result) => {
      if (result) {
        return res.json({ success: true, data: result })
      } else {
        return res.json({ success: false })
      }
    })
  },
  history: (req, res) => {
    const id = req.body.id
    const sql = 'SELECT * FROM sales WHERE customer = ?'
    Customer.Runsql(sql, id, (result) => {
      if (result) {
        return res.json({ success: true, data: result })
      } else {
        return res.json({ nodata: true })
      }
    })
  },
  find_sale_customer: (req, res) => {
    const cus = req.body.cus_code
    const total = req.body.total
    Customer.findOne(cus, 'cus_code', '*', (result) => {
      if (result) {
        if (result.cus_cash < total) {
          return res.json({ error_cash: true })
        } else {
          return res.json({ success: true, data: result })
        }
      } else {
        return res.json({ nodata: true })
      }
    })
  },
  updatecash: (req, res) => {
    const cash = req.params.cash
    const id = req.params.id
    const sql = 'UPDATE customers SET cus_cash = cus_cash-? WHERE cus_id = ?'
    Customer.Runsql(sql, [cash, id], (result) => {
      if (result) {
        return res.json({ success: true })
      } else {
        return res.json({ success: false })
      }
    })
  }
}
