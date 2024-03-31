async function getLastTransactions() {
    const base_url  = process.env.base_api
    const r  = await fetch(base_url + "/transactions", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const response  = await r.json()
    return response
}

async function claimFaucet(address: string) {
    const base_url  = process.env.base_api

    const r  = await fetch(base_url + "/claim", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            address: address
        })
    })
    const response  = await r.json()
    return response
}

export { getLastTransactions, claimFaucet }