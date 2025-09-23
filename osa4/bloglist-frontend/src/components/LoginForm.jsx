const LoginForm = ({
  handleLogin,
  username,
  password,
  handlePasswordChange,
  handleUsernameChange
  }) => {
  return (
    <div>
      <h2> log in from here! </h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="type"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm