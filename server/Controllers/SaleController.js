import moment from 'moment'
import Model from '../Models'
const Sale = new Model('sales', 's_id')
const Saledetail = new Model('saledetails', 'sd_id')
export default {
  save_sale: (req, res) => {
    const total = req.body.total
    const customer = req.body.cus
    const saledata = {
      s_order: req.body.order_no,
      s_total: total,
      s_get: req.body.cash,
      s_change: req.body.chang_money,
      customer,
      payment: customer > 1 ? 2 : 1,
      s_date: moment().format('YYYY-MM-DD HH:mm'),
      s_d: moment().format('DD'),
      s_m: moment().format('MM'),
      s_y: moment().format('YYYY'),
      s_user: req.body.user
    }
    if (saledata) {
      Sale.insert(saledata, (result) => {
        if (result) {
          return res.json({ success: true })
        } else {
          return res.json({ success: false })
        }
      })
    }
  },
  save_sale_list: (req, res) => {
    const id = req.body.p_id
    const qty = req.body.qty
    const listdata = {
      sd_order: req.body.order_no,
      sd_product: id,
      sd_price: req.body.price,
      qty,
      sd_date: moment().format('YYYY-MM-DD')
    }
    if (listdata) {
      Saledetail.insert(listdata, (result) => {
        if (result) {
          const sql = 'UPDATE products SET stock = stock-? WHERE p_id = ?'
          Sale.Runsql(sql, [qty, id], (update) => {
            if (update) {
              return res.json({ success: true })
            } else {
              return res.json({ success: false })
            }
          })
        } else {
          return res.json({ success: false })
        }
      })
    }
  },
  listsales: (_req, res) => {
    Sale.findAll((result) => {
      if (result) {
        return res.json({ success: true, lists: result })
      } else {
        return res.json({ success: false })
      }
    })
  },
  listsale_info: (req, res) => {
    const Order = req.params.order
    const sql = `SELECT products.p_name, saledetails.qty, saledetails.sd_price
                FROM saledetails
                LEFT JOIN products on products.p_id = sd_product
                WHERE sd_order = ?`
    Saledetail.Runsql(sql, [Order], (result) => {
      if (result) {
        return res.json({ success: true, lists: result })
      } else {
        return res.json({ success: false })
      }
    })
  },
  saletoday: (_req, res) => {
    const D = moment().format('DD')
    const M = moment().format('MM')
    const Y = moment().format('YYYY')
    const sql = `
      SELECT SUM(s_total) as total
      FROM sales 
      WHERE s_d = ? AND s_m = ? AND s_y = ?;
    `
    Sale.Runsql(sql, [D, M, Y], (result) => {
      if (result) {
        return res.json({ success: true, data: result[0] })
      } else {
        return res.json({ success: false })
      }
    })
  },
  saletomonth: (_req, res) => {
    const M = moment().format('MM')
    const Y = moment().format('YYYY')
    const sql = `
      SELECT SUM(s_total) as total
      FROM sales 
      WHERE s_m = ? AND s_y = ?
    `
    Sale.Runsql(sql, [M, Y], (result) => {
      if (result) {
        return res.json({ success: true, data: result[0] })
      } else {
        return res.json({ success: false })
      }
    })
  },
  saletoyear: (_req, res) => {
    const Y = moment().format('YYYY')
    const sql = `
      SELECT SUM(s_total) as total
      FROM sales 
      WHERE s_y = ?
    `
    Sale.Runsql(sql, [Y], (result) => {
      if (result) {
        return res.json({ success: true, data: result[0] })
      } else {
        return res.json({ success: false })
      }
    })
  },
  productsaletoday: (_req, res) => {
    const today = moment().format('YYYY-MM-DD')
    const sql = `
    SELECT pd.p_name AS p_name,(
      SELECT sum(qty) 
      FROM saledetails 
      WHERE sd_product = pd.p_id 
      AND sd_date BETWEEN ? AND ?
    ) AS product_qty 
    FROM products AS pd  
    ORDER BY product_qty 
    DESC LIMIT 5;`
    Sale.Runsql(sql, [today, today], (result) => {
      if (result) {
        return res.json({ success: true, data: result })
      } else {
        return res.json({ success: false })
      }
    })
  },
  chart_month: (_req, res) => {
    const M = moment().format('MM')
    const Y = moment().format('YYYY')
    const sql = `
      SELECT s_d, SUM(s_total) AS total 
      FROM sales 
      WHERE s_m = ? AND s_y = ?
      GROUP BY s_d;
    `
    Sale.Runsql(sql, [M, Y], (result) => {
      if (result) {
        return res.json({ success: true, data: result })
      } else {
        return res.json({ success: false })
      }
    })
  },
  chart_year: (_req, res) => {
    const Y = moment().format('YYYY')
    const sql = `
      SELECT s_m,SUM(s_total) AS total 
      FROM sales 
      WHERE s_y = ?
      GROUP BY s_m;`
    Sale.Runsql(sql, [Y], (result) => {
      if (result) {
        return res.json({ success: true, data: result })
      } else {
        return res.json({ success: false })
      }
    })
  }
}
