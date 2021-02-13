import crypto from 'crypto'
const Hashsha256 = (passwd) => {
  return crypto.createHash('sha256').update(passwd).digest('hex')
}
export default (password, salt) => {
  const pass = password + salt
  const hash = Hashsha256(pass)
  const SH = salt + hash
  return Buffer.from(SH).toString('base64')
}
