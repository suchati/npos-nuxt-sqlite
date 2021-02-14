export default ({ $auth, redirect }) => {
  if ($auth.loggedIn && $auth.user.type <= 0) {
    return redirect('/sales')
  }
}
