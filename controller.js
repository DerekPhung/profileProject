

//prompt user to enter number of profiles
//prompt user to enter information (name, age, gender)
//Store user information (with objects and arrays)
//Send user information to the backend (GET, POST, PUT, DELETE)

class Profile{

    constructor(name, age, gender){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    setName(name){
        this.name = name;
    }

    setAge(age){
        this.age = age;
    }

    setGender(gender){
        this.gender = gender;    
    }
}

//made for arrays of objects profile
let profileList = [];

function loadProfile(){
    document.getElementById("profileBox").innerHTML = `
    <div id="profilerCenter"></div>`;

    document.getElementById("profilerCenter").innerHTML += `
    <h1>Movie Tickets</h1>
    <input type="text" id="name" class="field" placeholder="name"/><br/>
    <input type="number" id="age" class="field" placeholder="age"/><br/>
    <input type="text" id="gender" class="field" placeholder="gender"/><br/>
    <br/>
`;

document.getElementById("profilerCenter").innerHTML += `
    <div>
        <button id="addbtn" onclick="addInfo()">Add</button>
        <button id="submitbtn" onclick="editInterface()">test</button>
    </div>
`;
}


function addInfo(){

    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let gender = document.getElementById("gender").value;

    if(name.length < 1){
        alert("You forgot to enter a name!");
        return;
    }

    profileList.push( new Profile(name, age, gender));

    
    console.log(profileList);
    sideBarUpdate();
    loadProfile();
    
}


function sideBarUpdate(){
    document.getElementById("sideBar").innerHTML = "";
    for(let i = 0; i < profileList.length; i++){
        document.getElementById("sideBar").innerHTML += `
        <div class="profileAdded">
          ${profileList[i].name}, ${profileList[i].age}, ${profileList[i].gender}
          <div>
          <button class="sidebtn" onclick="deleteProfile(${i})">X</button>
          <button class="sidebtn" onclick="editInterface(${i})">edit</button>
          </div>
          
        </div>
    `;
    }
}

function deleteProfile(target){
    profileList.splice(target,1);
    sideBarUpdate();
}

//document.getElementById("sideBar").innerHTML += btnTest();

// function btnTest(){
//     return "<button>Testing feature</button>";
// }

//---------------------------Edit Function Below-----------------------------------------------

function editInterface(target){
    let name = profileList[target].name;
    let age = profileList[target].age;
    let gender = profileList[target].gender;

    document.getElementById("profileBox").innerHTML = `
        <div id="editBox"></div>
    `;

    document.getElementById("editBox").innerHTML += `
        <h1>Edit</h1>
        <input type="text" id="name" class="field" value="${name}"/><br/>
        <input type="number" id="age" class="field" value="${age}"/><br/>
        <input type="text" id="gender" class="field" value="${gender}"/><br/>
        <br/>
    `;

    document.getElementById("editBox").innerHTML += `
        <button onclick="loadProfile()">Cancel</button>
        <button onclick="updateProfile(${target})">update</button>
    `;
    
}

function updateProfile(target){
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let gender = document.getElementById("gender").value;

    profileList[target].setName(name);
    profileList[target].setAge(age);
    profileList[target].setGender(gender);

    sideBarUpdate();
    loadProfile();
}


//---------------------navBar--------------------

function loadNav(){
    document.getElementById("navBar").innerHTML += `
        <div class="navItem" onclick="loadHome()">Home</div>
        <div class="navItem" onclick="loadProfile()">Ticket</div>
        <div class="navItem" onclick="">Purchase History</div>
        <div class="navItem" onclick="">Account</div>
    `;
}

function loadHome(){
    document.getElementById("profileBox").innerHTML = `
        <div id="welcomeMsg">Mochi was here!</div>
    `;
}
loadHome();
loadNav();