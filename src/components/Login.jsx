const LoginForm = ({
   handleLogin,
   username,
   setUsername,
   password,
   setPassword,
}) => (
   <form onSubmit={handleLogin}>
      <div>
         username
         <input
            name="username"
            type="text"
            value={username}
            onChange={({ target }) => {
               setUsername(target.value);
            }}
         />
      </div>
      <div>
         password
         <input
            name="password"
            type="password"
            value={password}
            onChange={({ target }) => {
               setPassword(target.value);
            }}
         />
      </div>
      <button type="submit">Login</button>
   </form>
);

export default LoginForm;
