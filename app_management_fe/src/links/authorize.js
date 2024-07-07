const authorize = () => {
    // const code_challenge = 'QYPAZ5NU8yvtlQ9erXrUYR-T5AGCjCF47vN-KsaI2A8&';
    const code_challenge = localStorage.getItem('codeChallenge');
    return `http://localhost:9000/oauth2/authorize?client_id=client&redirect_uri=http://127.0.0.1:3000/authorized&scope=openid&response_type=code&response_mode=query&code_challenge_method=S256&code_challenge=${code_challenge}&state=c3cn0u3ee2f&nonce=r13xjtjz3yo`;
}

export default authorize;