import moment from 'moment'
import Model from '../Models'
const Category = new Model('categorys', 'cat_id')
export default {
  All: (_req, res) => {
    Category.findAll((result) => {
      if (result) {
        return res.json({ success: true, categorys: result })
      } else {
        return res.json({ success: false })
      }
    })
  },
  Create: (req, res) => {
    const newdata = {
      cat_name: req.body.cat_name,
      cat_details: req.body.cat_details
    }
    if (newdata) {
      Category.insert(newdata, (insert) => {
        if (insert) {
          return res.json({ success: true })
        } else {
          return res.json({ success: false })
        }
      })
    } else {
      return res.json({ success: false })
    }
  },
  Update: (req, res) => {
    const id = req.params.id
    const data = {
      cat_name: req.body.cat_name,
      cat_details: req.body.cat_details,
      cat_updated_at: moment().format('YYYY-MM-DD HH:mm')
    }
    if (id && data) {
      Category.update(id, data, (update) => {
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
    const id = req.params.id
    const code = req.params.code
    Category.find(id, (result) => {
      if (result) {
        if (code === result.cat_name) {
          Category.delete(id, (datadelete) => {
            if (datadelete) {
              return res.json({ success: true })
            } else {
              return res.json({ success: false })
            }
          })
        } else {
          return res.json({ error_code: true })
        }
      } else {
        return res.json({ Nodata: true })
      }
    })
  }
}
