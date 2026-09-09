const cl=console.log;

const sportForm = document.getElementById('sportForm')
const sportList = document.getElementById('sportList')
const sportInput = document.getElementById('sportInput')
const addSportbtn = document.getElementById('addSportbtn')
const updateSportbtn = document.getElementById('updateSportbtn')

// let sportsArr = [
//     {
//         sportName: "Cricket",
//         sportId: "101"
//     },
//     {
//         sportName: "Football",
//         sportId: "102"
//     },
//     {
//         sportName: "Basketball",
//         sportId: "103"
//     },
//     {
//         sportName: "Tennis",
//         sportId: "104"
//     },
//     {
//         sportName: "Badminton",
//         sportId: "105"
//     },
//     {
//         sportName: "Hockey",
//         sportId: "106"
//     },
//     {
//         sportName: "Volleyball",
//         sportId: "107"
//     },
//     {
//         sportName: "Baseball",
//         sportId: "108"
//     }
// ];

// localStorage.setItem('sportsArr', JSON.stringify(sportsArr))
let sportsArr = JSON.parse(localStorage.getItem('sportsArr'))||[]

//read

function oncreateSport(arr){
    let result = ``;
    arr.forEach((ele)=>{
        result +=`<li class="list-group-item d-flex justify-content-between align-items-center" id="${ele.sportId}">
                        <strong>${ele.sportName}</strong>
                        <div>
                           <button onclick="editSport(this)" class="btn btn-sm text-info" role="button">EDIT</button> 
                           <button onclick="deleteSport(this)" class="btn btn-sm text-dark"role="button">DELETE</button>
                        </div>
                    </li>`
    })
    sportList.innerHTML = result
}
oncreateSport(sportsArr)

//create

function onAddSport(eve){
    eve.preventDefault()
    let sportObj={
        sportName:sportInput.value,
        sportId:Date.now().toString()
    }
    sportsArr.push(sportObj)
    localStorage.setItem('sportsArr', JSON.stringify(sportsArr))
    sportForm.reset()
    let li = document.createElement('li')
    li.className = 'list-group-item d-flex justify-content-between align-items-center'
    li.id = sportObj.sportId;
    li.innerHTML = `<strong>${sportObj.sportName}</strong>
                        <div>
                           <button onclick="editSport(this)" class="btn btn-sm text-info" role="button">EDIT</button> 
                           <button onclick="deleteSport(this)" class="btn btn-sm text-dark" role="button">DELETE</button>
                        </div>`
    sportList.append(li)

    Swal .fire({
        title:'Data added successfully !!!',
        icon:'success',
        timer:3000
    });
}

//edit

function editSport(ele){
    let editId = ele.closest('li').id;
    localStorage.setItem('editId', editId)
    let editObj = sportsArr.find(y=>y.sportId === editId)
    sportInput.value = editObj.sportName;
    addSportbtn.classList.add('d-none')
    updateSportbtn.classList.remove('d-none')
}

//update

function onupdateSport(){
    let updateId = localStorage.getItem('editId')
    localStorage.removeItem('editId')
    let updateObj={
        sportName:sportInput.value,
        sportId:updateId
    }
    let getIndex = sportsArr.findIndex(u=>u.sportId === updateId)
    sportsArr[getIndex]=updateObj;
    localStorage.setItem('sportsArr', JSON.stringify(sportsArr))
    document.getElementById(updateId).querySelector('strong').innerHTML = updateObj.sportName
    sportForm.reset()
    addSportbtn.classList.remove('d-none')
    updateSportbtn.classList.add('d-none')

    Swal .fire({
        title:'Data updated successfully !!!',
        icon:'success',
        timer:3000
    });
}

//delete

function deleteSport(ele){
    let remove_Id = ele.closest('li').id;
    let getconfirmation = confirm(`Are you sure, you want to remove id ${remove_Id}`)
    if(getconfirmation){
        let getIndex = sportsArr.findIndex(d=>d.sportId === remove_Id)
        sportsArr.splice(getIndex, 1)
        localStorage.setItem('sportsArr', JSON.stringify(sportsArr))
        ele.closest('li').remove()
    }

    Swal .fire({
        title:'Data deleted successfully !!!',
        icon:'success',
        timer:3000
    });
}

sportForm.addEventListener('submit', onAddSport)
updateSportbtn.addEventListener('click', onupdateSport)