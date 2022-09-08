const ENDPOINT = "http://localhost:3000";

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
    const state = document.getElementById("state").value;
    const states = getStates();
    states.forEach((data) => {
        if (data.province === state){
            state = data.id;
        }
    });
    axios.post(`${ENDPOINT}/city`, {
        name: name,
        state: state
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
const getStates = () => {
    return axios.get(`${ENDPOINT}/states`);
}

const citiesEdit = () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const state = document.getElementById("state").value;
    getStates().forEach((data) => {
        if (data.province === state){
            state = data.id;
        }
    });
    axios.put(`${ENDPOINT}/city/` + id, {
        name: name,
        state: state

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

const showCitiesCreateBox = () => {
    Swal.fire({
        title: 'Create city',
        html:
            '<input id="id" type="hidden">' +
            '<input id="name" class="swal2-input" placeholder="Name">' +
            '<input id="state" class="swal2-input" placeholder="State">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            cityCreate();
        }
    });
}

const showCityEditBox = async (id) => {
    const city = await getState(id);
    const data = city.data;
    Swal.fire({
        title: 'Edit City',
        html:
            '<input id="id" type="hidden" value=' + data.id + '>' +
            '<input id="name" class="swal2-input" placeholder="Name" value="' + data.name + '">' +
            '<input id="state" class="swal2-input" placeholder="State" value="' + data.State.province + '">' ,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            stateEdit();
        }
    });

}
