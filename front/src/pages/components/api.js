export async function fetchUser(user_id) {
  const response = await fetch(`http://localhost:8000/users/${user_id}`);
  const data = await response.json();
  return data;
}

export async function fetchUsers(index) {
  const query = new URLSearchParams({ left_index: index });
  const response = await fetch(
    `http://localhost:8000/users?${query}`
  );
  const data = await response.json();
  return data;
}

export async function fetchProducts(product_id) {
  const response = await fetch(`http://localhost:8000/products/${product_id}`);
  const data = await response.json();
  return data;
}

export async function fetchPurchases(user_id) {
  const query = new URLSearchParams({user_id: user_id});
  const response = await fetch(
    `http://localhost:8000/purchases?${query}`);
  const data = await response.json();
  return data;
}

export async function fetchAllPurchases() {
  const response = await fetch(`http://localhost:8000/purchases`);
  const data = await response.json();
  return data;
}

export async function postLogin(username, password) {
  const request = {
    username: username,
    password: password,
  };
  const response = await fetch(`http://localhost:8000/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;',
    },
    body: JSON.stringify(request),
  });
  // const data = await response.json();
  return response;
}

export async function fetchAuthUser(token) {
  const response = await fetch('http://localhost:8000/auth_user', {
    headers: {
      'Content-Type': 'application/json;',
      Authorization: `Bearer ${token}`,
    },
  });
  // const data = await response.json();
  return response;
}
