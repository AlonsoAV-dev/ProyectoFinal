const URI = 'http://localhost:3001/'

const get = async (endpoint) => {
    return await fetch(URI + endpoint)
            .then(response => response.json())
            .then(data => {
                return data;
            })
}

const post = async (endpoint, payload) => {
    const objPayload = {
        method: 'POST', 
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(payload) 
    }

    return await fetch(URI + endpoint, objPayload)
                .then(response => response.json())
                .then(data => {
                    return data;
                })
}

const put = async (endpoint, payload) => {
    const objPayload = {
        method: 'PUT', 
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(payload) 
    }

    return await fetch(URI + endpoint, objPayload)
                .then(response => response.json())
                .then(data => {
                    return data;
                })
}

const remove = async (endpoint) => {
    const objPayload = {
        method: 'DELETE', 
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    return await fetch(URI + endpoint, objPayload)
                .then(response => response.json())
                .then(data => {
                    return data;
                })
}

const base = { get, post, put, remove } 

export default base;