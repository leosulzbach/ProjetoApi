const ENDPOINT = "http://localhost:3000";

const loadTable = () => {
    axios.get(`${ENDPOINT}/users`)
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                var trHTML = '';
                data.forEach(element => {
                    trHTML += '<tr>';
                    trHTML += '<td>' + element.id + '</td>';
                    trHTML += '<td>' + element.name + '</td>';
                    trHTML += '<td>' + element.age + '</td>';
                    trHTML += '<td>' + element.sex + '</td>';
                    trHTML += '<td>' + element.email + '</td>';
                    trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' + element.id + ')">Edit</button>';
                    trHTML += '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' + element.id + ')">Del</button></td>';
                    trHTML += "</tr>";
                });
                document.getElementById("mytable").innerHTML = trHTML;
            }
        })
};

loadTable();

const userCreate = () => {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const sex = document.getElementById("sex").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    axios.post(`${ENDPOINT}/users`, {
        name: name,
        age: age,
        sex: sex,
        email: email,
        password: password
    })
        .then((response) => {
            Swal.fire(`User ${response.data.name} created`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to create user: ${error.response.data.error} `)
                .then(() => {
                    showUserCreateBox();
                })
        });
}

const getUser = (id) => {
    return axios.get(`${ENDPOINT}/users/` + id);
}

const userEdit = () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const sex = document.getElementById("sex").value;
    const email = document.getElementById("email").value;

    axios.put(`${ENDPOINT}/users/` + id, {
        name: name,
        age: age,
        sex: sex,
        email: email,
    })
        .then((response) => {
            Swal.fire(`User ${response.data.name} updated`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to update user: ${error.response.data.error} `)
                .then(() => {
                    showUserEditBox(id);
                })
        });
}

const userDelete = async (id) => {
    const user = await getUser(id);
    const data = user.data;
    axios.delete(`${ENDPOINT}/users/` + id)
        .then((response) => {
            Swal.fire(`User ${data.name} deleted`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to delete user: ${error.response.data.error} `);
            loadTable();
        });
};

const showUserCreateBox = () => {
    Swal.fire({
        title: 'Create user',
        html:
            '<input id="id" type="hidden">' +
            '<input id="name" class="swal2-input" placeholder="Name">' +
            '<input id="age" class="swal2-input" placeholder="Age">' +
            '<input id="sex" class="swal2-input" placeholder="Sex">' +
            '<input id="email" class="swal2-input" placeholder="Email">'+
            '<input id="password" class="swal2-input" placeholder="Password">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            userCreate();
        }
    });
}

const showUserEditBox = async (id) => {
    const user = await getUser(id);
    const data = user.data;
    Swal.fire({
        title: 'Edit User',
        html:
            '<input id="id" type="hidden" value=' + data.id + '>' +
            '<input id="name" class="swal2-input" placeholder="Name" value="' + data.name + '">' +
            '<input id="age" class="swal2-input" placeholder="Age" value="' + data.age + '">' +
            '<input id="sex" class="swal2-input" placeholder="Sex" value="' + data.sex + '">' +
            '<input id="email" class="swal2-input" placeholder="Email" value="' + data.email + '">'+
            '<input id="passwprd" class="swal2-input" placeholder="Password" value="' + data.password + '">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            userEdit();
        }
    });

}

const logar = async () => {
    const email = document.getElementById("email");
    const senha = document.getElementById("password");
    const user = await axios.get(`${ENDPOINT}/users/?"email"="${email}"`);
    if (user) {
        if (user.password === senha) {
            window.
        }
    }
}
