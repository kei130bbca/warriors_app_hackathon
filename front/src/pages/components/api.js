export async function fetchUser(user_id) {
    const response = await fetch(`https:8000/users/${user_id}`, {
        method: "GET"
    });
    const data = await response.json();
    return data.message;
}

export async function fetchUsers(index) {
    const response = await fetch(`https:8000/users` + {
        left_index: 0
    });
}