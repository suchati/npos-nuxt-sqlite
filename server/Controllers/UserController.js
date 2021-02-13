import jwt from 'jsonwebtoken'
import moment from 'moment'
import Hashpass from '../Libraries/Hashpassword'
import Random from '../Libraries/RandomInt'
import Salt from '../Libraries/Salt'
import Mail from '../Libraries/Mail'
import Model from '../Models'
const User = new Model('users', 'u_id')
export default {
  me: (req, res) => {
    const head = req.headers.authorization
    const token = head && head.split(' ')[1]
    const user = jwt.decode(token)
    if (token) {
      return res.json({ user })
    } else {
      return res.json({ errer: 'token error' })
    }
  },
  AllUsers: (_req, res) => {
    User.findAll((results) => {
      if (results) {
        return res.json({ success: true, users: results })
      } else {
        return res.json({ success: false })
      }
    })
  },
  UserCount: (_req, res) => {
    User.selectCOUNT('user', (results) => {
      if (results) {
        return res.json({ success: true, data: results })
      } else {
        return res.json({ success: false })
      }
    })
  },
  CreateUser: (req, res) => {
    const salt = Salt()
    const rand = Random(8)
    const idactivate = Random(20)
    const password = Hashpass(rand, salt)
    const { username, email, name, phone, address } = req.body
    const newdata = {
      u_name: name,
      username,
      salt,
      password,
      email,
      phone,
      address,
      idactivate,
      u_created_at: moment().format('YYYY-MM-DD HH:mm')
    }
    if (newdata) {
      User.findOne(username, 'username', 'username', (resuser) => {
        if (resuser) {
          return res.json({ erorr_user: true })
        } else {
          const Gmail = email.includes('@gmail.com')
          if (!Gmail) {
            return res.json({ notgmail: true })
          }
          User.findOne(email, 'email', 'email', (resemail) => {
            if (resemail) {
              return res.json({ erorr_email: true })
            } else {
              const Html = `Password: ${rand} <br><br><a href="${process.env.BASE_URL}/server/user/activate/${idactivate}">Click activate</a>`
              Mail(email, 'Password', Html, (send) => {
                if (send) {
                  User.insert(newdata, (insert) => {
                    if (insert) {
                      return res.json({ success: true })
                    } else {
                      return res.json({ success: false })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  },
  Check_login: (req, res) => {
    const { username, password } = req.body
    User.findOne(username, 'username', '*', (result) => {
      if (result) {
        if (result.activate < 1) {
          return res.json({ noactivate: true })
        } else {
          const passwordHash = Hashpass(password, result.salt)
          if (passwordHash === result.password) {
            const data = { login_at: moment().format('YYYY-MM-DD HH:mm') }
            User.update(result.u_id, data, (update) => {
              if (update) {
                const user = {
                  u_id: result.u_id,
                  username: result.username,
                  u_name: result.u_name,
                  email: result.email,
                  phone: result.phone,
                  address: result.address,
                  type: result.type
                }
                const token = jwt.sign(user, 'shhhhh')
                return res.json({ success: true, token })
              }
            })
          } else {
            return res.json({ errorpassword: true })
          }
        }
      } else {
        return res.json({ errorusername: true })
      }
    })
  },
  Forgot_password: (req, res) => {
    const { email } = req.body
    const Gmail = email.includes('@gmail.com')
    if (!Gmail) {
      return res.json({ notgmail: true })
    }
    const colums = ['u_id', 'email', 'salt', 'activate']
    User.findOne(email, 'email', colums, (result) => {
      if (result) {
        if (result.activate < 1) {
          return res.json({ noactivate: true })
        }
        const rand = Random(6)
        const id = result.u_id
        const idreset = Hashpass(id, result.salt)
        const Html = `Code Reset Password : ${rand} <br><br><a href="${process.env.BASE_URL}/resetpassword/${idreset}">Click to Reset</a>`
        const data = {
          codereset: Hashpass(rand, result.salt),
          idreset
        }
        Mail(email, 'Reset Password', Html, (send) => {
          if (send) {
            User.update(id, data, (update) => {
              if (update) {
                return res.json({ success: true })
              } else {
                return res.json({ success: false })
              }
            })
          } else {
            return res.json({ nosend: true })
          }
        })
      } else {
        return res.json({ erorr_email: true })
      }
    })
  },
  Reset_password: (req, res) => {
    const { id, code } = req.body
    const salt = Salt()
    const password = Hashpass(req.body.password, salt)
    const colums = ['u_id', 'codereset', 'salt']
    User.findOne(id, 'idreset', colums, (result) => {
      if (result) {
        const codereset = Hashpass(code, result.salt)
        if (codereset === result.codereset) {
          const data = {
            password,
            salt,
            codereset: '',
            idreset: '',
            u_updated_at: moment().format('YYYY-MM-DD HH:mm')
          }
          User.update(result.u_id, data, (update) => {
            if (update) {
              return res.json({ success: true })
            } else {
              return res.json({ success: false })
            }
          })
        } else {
          return res.json({ errorcode: true })
        }
      } else {
        return res.json({ error: true })
      }
    })
  },
  activateID: (req, res) => {
    const id = req.body.id
    User.find(id, (result) => {
      if (result) {
        const data = { activate: 1 }
        User.update(id, data, (update) => {
          if (update) {
            return res.json({ success: true })
          } else {
            return res.json({ success: false })
          }
        })
      } else {
        return res.json({ noID: true })
      }
    })
  },
  activate: (req, res) => {
    const id = req.params.id
    const colums = ['u_id', 'idactivate']
    User.findOne(id, 'idactivate', colums, (result) => {
      if (result) {
        const data = { activate: 1, idactivate: '' }
        User.update(result.u_id, data, (update) => {
          if (update) {
            res.redirect('/login')
          }
        })
      }
    })
  }
}
