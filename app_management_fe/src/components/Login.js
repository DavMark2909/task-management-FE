import { Link } from "react-router-dom";
import { generateCodeChallenge, generateCodeVerifier } from "../pkce/utils";

function Login(){
    const codeVerifier = generateCodeVerifier();
    localStorage.setItem('codeVerifier', codeVerifier);
    const codeChallenge = generateCodeChallenge();
    localStorage.setItem('codeChallenge', codeChallenge);
    return <Link to="/redirect">Login</Link>
}

export default Login;