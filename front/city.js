const ENDPOINT = "http://localhost:3000";
const states = () => {
    return axios.get(`${ENDPOINT}/states`)
}
const loadTable = () => {
    axios.get(`${ENDPOINT}/city`)
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                var trHTML = '';
                data.forEach(element => {
                    trHTML += '<tr>';
                    trHTML += '<td>' + element.id + '</td>';
                    trHTML += '<td>' + element.name + '</td>';
                    trHTML += '<td>' + element.State.province + '</td>';
                    trHTML += '<td>' + element.cep + '</td>';
                    trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showCityEditBox(' + element.id + ')">Edit</button>';
                    trHTML += '<button type="button" class="btn btn-outline-danger" onclick="cityDelete(' + element.id + ')">Del</button></td>';
                    trHTML += "</tr>";
                });
                document.getElementById("mytable").innerHTML = trHTML;
            }
        })
};

loadTable();

const cityCreate = () => {
    const name = document.getElementById("name").value;
    const state = document.getElementById("select").value;
    const cep = document.getElementById("cep").value;

    axios.post(`${ENDPOINT}/city`, {
        name: name,
        StateId: state,
        cep: cep
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

const getCity = (id) => {
    return axios.get(`${ENDPOINT}/city/` + id);
}


const citiesEdit = () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const state = document.getElementById("select").value;
    const cep = document.getElementById("cep").value;

    axios.put(`${ENDPOINT}/city/` + id, {
        name: name,
        StateId: state,
        cep: cep
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
            '<input id="cep" class="swal2-input" placeholder="Cep">' +
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
            '<input id="cep" class="swal2-input" placeholder="Cep">' +
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
