export default {
  dark: () => {
    return (this.$cookies.get('dark') === true)
  }
  // // eslint-disable-next-line no-console
  // console.log(app.$cookies.get('dark') || 11)
  // return app.$cookies.get('dark')
}
