import {useAuth0} from "@auth0/auth0-react"
import styles from "./Login.module.css"; 

const Login = ()=> {
   const {loginWithRedirect} = useAuth0();
   return (
    <button className={styles.loginButton}  onClick={()=> loginWithRedirect()}>Login</button>
   )
}

export default Login