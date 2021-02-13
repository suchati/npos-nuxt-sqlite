import fs from 'fs'
import moment from 'moment'
import Model from '../Models'
const Product = new Model('products', 'p_id')
export default {
  All: (_req, res) => {
    const sql = 'SELECT products.*, categorys.cat_name FROM products LEFT JOIN categorys ON categorys.cat_id = products.category'
    Product.Runsql(sql, [], (results) => {
      if (results) {
        return res.json({ success: true, products: results })
      } else {
        return res.json({ success: false })
      }
    })
  },
  Create: (req, res) => {
    const File = req.files.p_img
    const filename = `${Date.now()}-${File.name}`
    const newdata = {
      p_code: req.body.p_code,
      p_name: req.body.p_name,
      cost_price: req.body.cost_price,
      sale_price: req.body.sale_price,
      stock: req.body.stock,
      discontinued: 0,
      p_details: req.body.p_details,
      p_img: filename,
      category: req.body.category,
      supplier: ''
    }
    if (newdata) {
      const columns = ['p_id', 'p_code', 'p_name', 'sale_price']
      Product.findOne(req.body.p_code, 'p_code', columns, (result) => {
        if (result) {
          return res.json({ error_code: true })
        } else {
          File.mv(`assets/images/uploads/products/${filename}`, (err) => {
            if (err) { return res.json({ erorr_img: true }) }
            Product.insert(newdata, (insert) => {
              if (insert) {
                return res.json({ success: true })
              } else {
                return res.json({ success: false })
              }
            })
          })
        }
      })
    }
  },
  Update: (req, res) => {
    const id = req.params.id
    const data = {
      p_name: req.body.p_name,
      cost_price: req.body.cost_price,
      sale_price: req.body.sale_price,
      stock: req.body.stock,
      p_details: req.body.p_details,
      category: req.body.category,
      p_updated_at: moment().format('YYYY-MM-DD HH:mm')
    }
    if (id && data) {
      Product.update(id, data, (update) => {
        if (update) {
          return res.json({ success: true })
        } else {
          return res.json({ success: false })
        }
      })
    } else {
      return res.json({ success: false })
    }
  },
  Delete: (req, res) => {
    const { id, code, img } = req.params
    Product.find(id, (resultdata) => {
      if (resultdata) {
        if (code === resultdata.p_code) {
          Product.delete(id, (resultdelete) => {
            if (resultdelete) {
              if (fs.existsSync(`assets/images/uploads/products/${img}`)) {
                fs.unlinkSync(`assets/images/uploads/products/${img}`)
              }
              res.json({ success: true })
            } else {
              res.json({ success: false })
            }
          })
        } else {
          res.json({ error_code: true })
        }
      } else {
        res.json({ Nodata: true })
      }
    })
  },
  Productbycategory: (req, res) => {
    const sql = 'SELECT * FROM products LEFT JOIN categorys ON categorys.cat_id = products.category WHERE category = ?'
    Product.Runsql(sql, [req.params.id], (result) => {
      if (result) {
        return res.json({ success: true, products: result })
      } else {
        return res.json({ success: false })
      }
    })
  },
  Count: (_req, res) => {
    Product.selectCOUNT('product', (results) => {
      if (results) {
        return res.json({ success: true, data: results })
      } else {
        return res.json({ success: false })
      }
    })
  },
  find_product: (req, res) => {
    const barcode = req.body.barcode
    Product.findOne(barcode, 'p_code', '*', (result) => {
      if (result) {
        if (result.stock <= 1) {
          return res.json({ outstock: true })
        } else {
          return res.json({ success: true, product: result })
        }
      } else {
        return res.json({ nodata: true })
      }
    })
  }
}
