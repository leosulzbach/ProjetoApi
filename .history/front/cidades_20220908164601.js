const ENDPOINT = "http://localhost:3000";

const states = () => {
    return axios.get(`${ENDPOINT}/states`)
}
const loadTable = () => {
    axios.get(`${ENDPOINT}/cities`)
        .then((response) => {
            if (response.status === 200) {
                const dados = response.data;
                console.log(dados)
                var trHTML = '';
                dados.forEach(function (element) {
                    trHTML += '<tr>';
                    trHTML += '<td>' + element.id + '</td>';
                    trHTML += '<td>' + element.name + '</td>';
                    trHTML += '<td>' + element.State.name + '</td>';
                    
                    trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showCityEditBox(' + element.id + ')">Edit</button>';
                    trHTML += '<button type="button" class="btn btn-outline-danger" onclick="cityDelete(' + element.id + ')">Del</button></td>';
                    trHTML += "</tr>";
                });
                document.getElementById("mytable").innerHTML = trHTML;

            }
        })
};

loadTable();

const cityCreate = async () => {
    const name = document.getElementById("name").value;
    const state_id = document.getElementById("select").value;
console.log(state_id)
     
            axios.post(`${ENDPOINT}/cities`, {
        name: name,
        StateId: state_id
    })
        .then((response) => {
            Swal.fire(`City ${response.data.name} created`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to create city: ${error.response.data.error} `)
                .then(() => {
                    showCityCreateBox();
                })
        });
   }  
 
   const getCity = (id) => {
    return axios.get(`${ENDPOINT}/cities/` + id);
}

const cityEdit = () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const state_id = document.getElementById("state").value;

    axios.put(`${ENDPOINT}/cities/` + id, {
        name: name,
        stateId: state_id
    })
        .then((response) => {
            Swal.fire(`City ${response.data.name} updated`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to update city: ${error.response.data.error} `)
                .then(() => {
                    showCityCreateBox(id);
                })
        });
}

const cityDelete = async (id) => {
    const city = await getCity(id);
    const data = city.data;
    axios.delete(`${ENDPOINT}/cities/` + id)
        .then((response) => {
            Swal.fire(`City ${data.name} deleted`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to delete city: ${error.response.data.error} `);
            loadTable();
        });
};

const showCityCreateBox = async () => {
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



const createStatesCombo = async(id) => {
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