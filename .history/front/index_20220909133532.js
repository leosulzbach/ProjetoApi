const ENDPOINT = "http://localhost:3000";

const fazerLogin = async () => {
    const email = document.getElementById("email");
    const senha = document.getElementById("password");
    const user = await axios.get(`${ENDPOINT}/users/?"email"="${email}"`);
    console.log(user);
    if (user) {
        if (user.data.password === senha) {
            window.location.href = "users.html";
        }else {
            Swal.fire(`Login inválido`);
        }
    }
}
