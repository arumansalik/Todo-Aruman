const API = "https://localhost:3000";

function signup() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;

    axios.post(`${API}/signup`, {
        name,
        email,
        password
    })
    .then(res => {
        alert("Signed Up!");
    })
    .catch(err => {
        console.log(err);
        alert("Signup failed");
    });
}