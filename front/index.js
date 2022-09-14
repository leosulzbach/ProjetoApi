const ENDPOINT = "http://localhost:3000";

const fazerLogin = async () => {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;
    const user = await axios.get(`${ENDPOINT}/users/?email=${email}`);
    console.log(user.data[0].password);
    console.log(senha);
    if (user) {
        if (user.data[0].password === senha) {
            window.location.href = "book.html";
        }else {
            Swal.fire(`Login inválido`);
        }
    }
}
