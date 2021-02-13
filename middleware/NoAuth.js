export default ({ $auth, redirect }) => {
  if ($auth.loggedIn && $auth.user) {
    return redirect('/')
  }
}
