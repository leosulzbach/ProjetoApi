const ENDPOINT = "http://localhost:3000";
const cities = () => {
    return axios.get(`${ENDPOINT}/city`)
}
const loadTable = () => {
    axios.get(`${ENDPOINT}/publisher`)
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                var trHTML = '';
                data.forEach(element => {
                    trHTML += '<tr>';
                    trHTML += '<td>' + element.id + '</td>';
                    trHTML += '<td>' + element.name + '</td>';
                    trHTML += '<td>' + element.City.name + '</td>';
                    trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showPublisherEditBox(' + element.id + ')">Edit</button>';
                    trHTML += '<button type="button" class="btn btn-outline-danger" onclick="publisherDelete(' + element.id + ')">Del</button></td>';
                    trHTML += "</tr>";
                });
                document.getElementById("mytable").innerHTML = trHTML;
            }
        })
};

loadTable();

const publisherCreate = () => {
    const name = document.getElementById("name").value;
    const city = document.getElementById("select").value;

    axios.post(`${ENDPOINT}/publisher`, {
        name: name,
        CityId: city
    })
        .then((response) => {
            Swal.fire(`Publisher ${response.data.name} created`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to create Publisher: ${error.response.data.error} `)
                .then(() => {
                    showPublisherCreateBox();
                })
        });
}

const getpublisher = (id) => {
    return axios.get(`${ENDPOINT}/publisher/` + id);
}


const publisherEdit = () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const city = document.getElementById("select").value;

    axios.put(`${ENDPOINT}/publisher/` + id, {
        name: name,
        CityId: city
    })
        .then((response) => {
            Swal.fire(`Publisher ${response.data.name} updated`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to update publisher: ${error.response.data.error} `)
                .then(() => {
                    showPublisherEditBox(id);
                })
        });
}

const publisherDelete = async (id) => {
    const publisher = await getPublisher(id);
    const data = publisher.data;
    axios.delete(`${ENDPOINT}/publisher/` + id)
        .then((response) => {
            Swal.fire(`Publisher ${data.name} deleted`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to delete publisher: ${error.response.data.error} `);
            loadTable();
        });
};


const showPublisherEditBox = async (id) => {
    const data = await getPublisher(id);
    const select = await createCitiesCombo()
    Swal.fire({
        title: 'Edit Publisher',
        html:
            '<input id="id" type="hidden" value=' + data.id + '>' +
            '<input id="name" class="swal2-input" placeholder="Name">' +
            select,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            publisherEdit();
        }
    });

}

const showPublisherCreateBox = async () => {
    const select = await createCitiesCombo()
    Swal.fire({

        title: 'Create publisher',
        html:
            '<input id="id" type="hidden">' +
            '<input id="name" class="swal2-input" placeholder="Name">' +
            select,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            publisherCreate();
        }
    });
}

const createCitiesCombo = async (id) => {
    const city = await cities();
    const data = city.data;

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
