export async function fetchUser(user_id) {
    const response = await fetch(`http://localhost:8000/users/${user_id}`);
    const data = await response.json();
    return data;
}

export async function fetchUsers(index) {
    const response = await fetch(`http://localhost:8000/users` + {
        left_index: index
    });
    const data = await response.json();
    return data;
}

export async function fetchProducts(product_id) {
    const response = await fetch(`http://localhost:8000/products/${product_id}`);
    const data = await response.json();
    return data;
}

export async function fetchPurchases(user_id) {
    const response = await fetch(`http://localhost:8000/purchases` + {
        user_id: user_id
    });
    const data = await response.json();
    return data;
}

export async function postLogin(username, password) {
    const request = {
        username: username,
        password: password
    };
    const response = await fetch(`http://localhost:8000/login`, {
        method: 'POST',
        body: JSON.stringify(request)
    })
    console.log(response);
}