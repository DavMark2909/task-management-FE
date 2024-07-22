export const getRequest = async (url, token) => {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", `Bearer ${token}`);
    const res = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers
    });
    if (!res.ok){
        throw new Error();
    }
    const data = await res.json();
    return data;
}

export const postRequest = async (url, token) => {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", `Bearer ${token}`);
    const res = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers
    });
    if (!res.ok){
        throw new Error();
    }
    const data = await res.json();
    return data;
}
