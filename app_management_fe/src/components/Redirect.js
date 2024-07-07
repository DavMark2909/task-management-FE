import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import authorize from "../links/authorize";
import {Buffer} from "buffer";

function Redirect(){
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    useEffect(() => {
        if(searchParams?.get('code')){
            localStorage.setItem("code", searchParams.get('code'));
            const client = 'client';
            const secret = 'secret';
            const url = 'http://localhost:9000/oauth2/token';
            const code_verifier = "qPsH306-ZDDaOE8DFzVn05TkN3ZZoVmI_6x4LsVglQI";
            console.log("Code verifier ==== ", code_verifier);

            const body = new URLSearchParams();
            body.append('grant_type', 'authorization_code');
            body.append('code', searchParams.get('code'));
            body.append('redirect_uri', "http://127.0.0.1:3000/authorized");
            body.append('client_id', client);
            body.append('code_verifier', code_verifier);



            const headers = new Headers();
            headers.set('Content-Type', 'application/x-www-form-urlencoded');
            headers.set('Authorization', `Basic ${Buffer.from(`${client}:${secret}`).toString('base64')}`);

            fetch(url, {
                method: "POST",
                mode: 'cors',
                headers,
                body: body.toString()
            }).then(async (response) => {
                const token = await response.json();
                if(token?.access_token){
                    localStorage.setItem("access_token", token.access_token);
                    navigate("/home");
                }
            }).catch((err) => {
                console.log(err);
            }, []);
        }
        else {
            const code_challenge = "QYPAZ5NU8yvtlQ9erXrUYR-T5AGCjCF47vN-KsaI2A8&";
            const urlRedirect = `http://localhost:9000/oauth2/authorize?client_id=client&redirect_uri=http://127.0.0.1:3000/authorized&scope=openid&response_type=code&response_mode=query&code_challenge_method=S256&code_challenge=${code_challenge}&state=c3cn0u3ee2f&nonce=r13xjtjz3yo`;
            window.location.href = urlRedirect;
        }
    });
    return <p>Redirecting....</p>;
}

export default Redirect; 