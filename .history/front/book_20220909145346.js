const ENDPOINT = "http://localhost:3000";
const categories = () => {
    return axios.get(`${ENDPOINT}/categorie`)
}
const publishers = () => {
    return axios.get(`${ENDPOINT}/publisher`)
}
const loadTable = () => {
    axios.get(`${ENDPOINT}/books`)
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                var trHTML = '';
                data.forEach(element => {
                    trHTML += '<tr>';
                    trHTML += '<td>' + element.id + '</td>';
                    trHTML += '<td>' + element.title + '</td>';
                    trHTML += '<td>' + element.author + '</td>';
                    trHTML += '<td>' + element.publication_year + '</td>';
                    trHTML += '<td>' + element.pages + '</td>';
                    trHTML += '<td>' + element.Categorie.description + '</td>';
                    trHTML += '<td>' + element.Publisher.name + '</td>';
                    trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showBooksEditBox(' + element.id + ')">Edit</button>';
                    trHTML += '<button type="button" class="btn btn-outline-danger" onclick="booksDelete(' + element.id + ')">Del</button></td>';
                    trHTML += "</tr>";
                });
                document.getElementById("mytable").innerHTML = trHTML;
            }
        })
};

loadTable();

const booksCreate = () => {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const publication_year = document.getElementById("publication_year").value;
    const categorie = document.getElementById("select").value;
    const publisher = document.getElementById("select2").value;

    axios.post(`${ENDPOINT}/city`, {
        title: title,
        author: author,
        publication_year: publication_year,
        pages: pages,
        CategorieId: categorie,
        PublisherId: publisher
    })
        .then((response) => {
            Swal.fire(`City ${response.data.name} created`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to create City: ${error.response.data.error} `)
                .then(() => {
                    showCitiesCreateBox();
                })
        });
}

const getBooks = (id) => {
    return axios.get(`${ENDPOINT}/books/` + id);
}


const booksEdit = () => {
    const id = document.getElementById("id").value;
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const publication_year = document.getElementById("publication_year").value;
    const categorie = document.getElementById("select").value;
    const publisher = document.getElementById("select2").value;

    axios.put(`${ENDPOINT}/city/` + id, {
        title: title,
        author: author,
        publication_year: publication_year,
        pages: pages,
        CategorieId: categorie,
        PublisherId: publisher
    })
        .then((response) => {
            Swal.fire(`City ${response.data.name} updated`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to update city: ${error.response.data.error} `)
                .then(() => {
                    showCityEditBox(id);
                })
        });
}

const cityDelete = async (id) => {
    const city = await getCity(id);
    const data = city.data;
    axios.delete(`${ENDPOINT}/city/` + id)
        .then((response) => {
            Swal.fire(`City ${data.name} deleted`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to delete city: ${error.response.data.error} `);
            loadTable();
        });
};


const showCityEditBox = async (id) => {
    const data = await getCity(id);

    const select = await createStatesCombo()
    Swal.fire({
        title: 'Edit City',
        html:
            '<input id="id" type="hidden" value=' + id + '>' +
            '<input id="name" class="swal2-input" placeholder="Name">' +
            select,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            citiesEdit();
        }
    });

}

const showCitiesCreateBox = async () => {
    const select = await createStatesCombo()
    Swal.fire({

        title: 'Create city',
        html:
            '<input id="id" type="hidden">' +
            '<input id="name" class="swal2-input" placeholder="Name">' +
            select,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            cityCreate();
        }
    });
}

const createStatesCombo = async (id) => {
    const state = await states();
    const data = state.data;

    var select = '<select class="swal2-input" id="select">'

    await data.forEach(function (item) {
        if (id === item.id) {
            select += `<option value= "${item.id}" selected >${item.name}`
        } else {
            select += `<option value= "${item.id}">${item.name}</option>`
        }
    })
    select += '</select>'
    return select;
}
