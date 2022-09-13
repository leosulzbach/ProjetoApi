const ENDPOINT = "http://localhost:3000";
const categories = () => {
    return axios.get(`${ENDPOINT}/categorie`)
}
const formats = () => {
    return axios.get(`${ENDPOINT}/format`)
}
const publishers = () => {
    return axios.get(`${ENDPOINT}/publisher`)
}
const loadTable = () => {
    axios.get(`${ENDPOINT}/books`)
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                table(data);
            }
        })
};

loadTable();

const table = async (data) => {
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
        trHTML += '<td>' + element.Format.description + '</td>';
        trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showBooksEditBox(' + element.id + ')">Edit</button>';
        trHTML += '<button type="button" class="btn btn-outline-danger" onclick="booksDelete(' + element.id + ')">Del</button></td>';
        trHTML += "</tr>";
    });
    document.getElementById("mytable").innerHTML = trHTML;
}

const booksCreate = () => {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const publication_year = document.getElementById("publication_year").value;
    const categorie = document.getElementById("select").value;
    const publisher = document.getElementById("select2").value;
    const format = document.getElementById("select3").value;

    axios.post(`${ENDPOINT}/books`, {
        title: title,
        author: author,
        publication_year: publication_year,
        pages: pages,
        CategorieId: categorie,
        PublisherId: publisher,
        FormatId: format
    })
        .then((response) => {
            Swal.fire(`book ${response.data.title} created`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to create books: ${error.response.data.error} `)
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
    const format = document.getElementById("select3").value;

    axios.put(`${ENDPOINT}/books/` + id, {
        title: title,
        author: author,
        publication_year: publication_year,
        pages: pages,
        CategorieId: categorie,
        PublisherId: publisher,
        FormatId: format
    })
        .then((response) => {
            Swal.fire(`Book ${response.data.title} updated`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to update book: ${error.response.data.error} `)
                .then(() => {
                    showBooksEditBox(id);
                })
        });
}

const booksDelete = async (id) => {
    const books = await getBooks(id);
    const data = books.data;
    axios.delete(`${ENDPOINT}/books/` + id)
        .then((response) => {
            Swal.fire(`Book ${data.name} deleted`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to delete book: ${error.response.data.error} `);
            loadTable();
        });
};


const showBooksEditBox = async (id) => {
    const data = await getBooks(id);
    const select = await createCategorieCombo()
    const select2 = await createPublisherCombo()
    const select3 = await createFormatCombo()
    Swal.fire({
        title: 'Edit books',
        html:
            '<input id="id" type="hidden" value=' + data.id + '>' +
            '<input id="title" class="swal2-input" placeholder="Title">' +
            '<input id="author" class="swal2-input" placeholder="Author">' +
            '<input id="publication_year" class="swal2-input" placeholder="Year">' +
            '<input id="pages" class="swal2-input" placeholder="Pages">' +
            select +
            select2+
            select3,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            booksEdit();
        }
    });

}

const showBooksCreateBox = async () => {
    const select = await createCategorieCombo()
    const select2 = await createPublisherCombo()
    const select3 = await createFormatCombo()
    
    Swal.fire({

        title: 'Create books',
        html:
            '<input id="id" type="hidden">' +
            '<input id="title" class="swal2-input" placeholder="Title">' +
            '<input id="author" class="swal2-input" placeholder="Author">' +
            '<input id="publication_year" class="swal2-input" placeholder="Year">' +
            '<input id="pages" class="swal2-input" placeholder="Pages">' +
            select +
            select2+
            select3,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            booksCreate();
        }
    });
}

const createCategorieCombo = async (id) => {
    const categorie = await categories();
    const data = categorie.data;

    var select = '<select class="swal2-input" id="select">'

    await data.forEach(function (item) {
        if (id === item.id) {
            select += `<option value= "${item.id}" selected >${item.description}`
        } else {
            select += `<option value= "${item.id}">${item.description}</option>`
        }
    })
    select += '</select>'
    return select;
}
const createPublisherCombo = async (id) => {
    const publisher = await publishers();
    const data = publisher.data;

    var select2 = '<select class="swal2-input" id="select2">'

    await data.forEach(function (item) {
        if (id === item.id) {
            select2 += `<option value= "${item.id}" selected >${item.name}`
        } else {
            select2 += `<option value= "${item.id}">${item.name}</option>`
        }
    })
    select2 += '</select>'
    return select2;
}
const createFormatCombo = async (id) => {
    const format = await formats();
    const data = format.data;

    var select3 = '<select class="swal2-input" id="select3">'

    await data.forEach(function (item) {
        if (id === item.id) {
            select3 += `<option value= "${item.id}" selected >${item.description}`
        } else {
            select3 += `<option value= "${item.id}">${item.description}</option>`
        }
    })
    select3 += '</select>'
    return select3;
}

const searchBook = async () => {
    const filter = document.getElementById('search').value;
    const categorie = await categories();
    console.log(categorie)
    const books = await axios.get(`${ENDPOINT}/books`);
    if (filter) {
        categorie.data.forEach(async (data) => {
            if (filter === data.description) {
                const element = await axios.get(`${ENDPOINT}/books/?CategorieId=${data.id}`);
                table(element.data);
            }
        });
        books.data.forEach(async (book) => {
            if (filter === book.title) {
                const element = await axios.get(`${ENDPOINT}/books/?title=${filter}`);
                table(element.data);
            }
        })
    }else {
        loadTable();
    }
}

const orderByPrice = async () => {
    axios.get(`${ENDPOINT}/books/?sort=price`)
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                table(data);
            }
        })
}