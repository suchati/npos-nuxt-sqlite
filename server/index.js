import express from 'express'
import body from 'body-parser'
import fileupload from 'express-fileupload'

import Users from './Controllers/UserController'
import Product from './Controllers/ProductController'
import Category from './Controllers/CategoryController'
import Sale from './Controllers/SaleController'
import Customer from './Controllers/CustomerController'

const app = express()
app.use(body.urlencoded({ extended: true }))
app.use(express.json())
app.use(body.json())
app.use(fileupload())

app.post('/login', Users.Check_login)
app.post('/forgot_password', Users.Forgot_password)
app.post('/reset_password', Users.Reset_password)

app.post('/user/me', Users.me)
app.post('/users', Users.AllUsers)
app.post('/users/register', Users.CreateUser)
app.post('/users/count', Users.UserCount)
app.post('/user/activateID', Users.activateID)
app.get('/user/activate/:id', Users.activate)

app.post('/products', Product.All)
app.post('/products/count', Product.Count)
app.post('/products/create', Product.Create)
app.put('/products/update/:id', Product.Update)
app.delete('/products/delete/:id/:code/:img', Product.Delete)
app.put('/products/productbycategory/:id', Product.Productbycategory)
app.post('/product/find_product', Product.find_product)

app.post('/sales/save_sale', Sale.save_sale)
app.post('/sales/save_sale_list', Sale.save_sale_list)
app.post('/sales/listsales', Sale.listsales)
app.put('/sales/listsale_info/:order', Sale.listsale_info)
app.post('/sales/saletoday', Sale.saletoday)
app.post('/sales/saletomonth', Sale.saletomonth)
app.post('/sales/saletoyear', Sale.saletoyear)
app.post('/sales/productsaletoday', Sale.productsaletoday)
app.post('/sales/chart_month', Sale.chart_month)
app.post('/sales/chart_year', Sale.chart_year)
app.put('/sales/updatecash/:id/:cash', Customer.updatecash)

app.post('/categorys', Category.All)
app.post('/category/create', Category.Create)
app.put('/category/update/:id', Category.Update)
app.delete('/category/delete/:id/:code', Category.Delete)

app.post('/customer/findID', Customer.findID)
app.post('/customer/history', Customer.history)
app.post('/customer/create', Customer.create)
app.post('/customer/find_sale_customer', Customer.find_sale_customer)

app.get('/test', (req, res) => {
  return res.json({ url: process.env.BASE_URL })
})

export default app
