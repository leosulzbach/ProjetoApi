const ENDPOINT = "http://localhost:3000";

const loadTable = () => {
    axios.get(`${ENDPOINT}/categorie`)
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                var trHTML = '';
                data.forEach(element => {
                    trHTML += '<tr>';
                    trHTML += '<td>' + element.id + '</td>';
                    trHTML += '<td>' + element.description + '</td>';
                    trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showCategorieEditBox(' + element.id + ')">Edit</button>';
                    trHTML += '<button type="button" class="btn btn-outline-danger" onclick="categorieDelete(' + element.id + ')">Del</button></td>';
                    trHTML += "</tr>";
                });
                document.getElementById("mytable").innerHTML = trHTML;
            }
        })
};

loadTable();

const categorieCreate = () => {
    const description = document.getElementById("description").value;

    axios.post(`${ENDPOINT}/categorie`, {
        description: description,
    })
        .then((response) => {
            Swal.fire(`Categorie ${response.data.description} created`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to create categorie: ${error.response.data.error} `)
                .then(() => {
                    showCategorieCreateBox();
                })
        });
};

const getCategorie = (id) => {
    return axios.get(`${ENDPOINT}/categorie/` + id);
};

const categorieEdit = () => {
    const id = document.getElementById("id").value;
    const description = document.getElementById("description").value;

    axios.put(`${ENDPOINT}/categorie/` + id, {
        description: description,
    })
        .then((response) => {
            Swal.fire(`Categorie ${response.data.name} updated`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to update categorie: ${error.response.data.error} `)
                .then(() => {
                    showCategorieEditBox(id);
                })
        });
};

const categorieDelete = async (id) => {
    const categorie = await getCategorie(id);
    const data = categorie.data;
    axios.delete(`${ENDPOINT}/categorie/` + id)
        .then((response) => {
            Swal.fire(`Categorie ${data.name} deleted`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to delete Categorie: ${error.response.data.error} `);
            loadTable();
        });
};

const showCategorieCreateBox = () => {
    Swal.fire({
        title: 'Create categorie',
        html:
            '<input id="id" type="hidden">' +
            '<input id="description" class="swal2-input" placeholder="Description">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            categorieCreate();
        }
    });
};

const showCategorieEditBox = async (id) => {
    const categorie = await getCategorie(id);
    const data = categorie.data;
    Swal.fire({
        title: 'Edit Categorie',
        html:
            '<input id="id" type="hidden" value=' + data.id + '>' +
            '<input id="description" class="swal2-input" placeholder="Description" value="' + data.description + '">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            categorieEdit();
        }
    });
};
