

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

//api
let url = "https://da9a-2600-1700-3f90-c170-1ca2-80a3-f726-a7ff.ngrok.io/Order";

//made for arrays of objects profile
let profileList = [
    // {"name":"Jerry","age":26,"gender":"male"}
];

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
        <button id="submitbtn" onclick="checkout()">Checkout</button>
    </div>
`;
}


function addInfo(){

    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let gender = document.getElementById("gender").value;

    if(name.length === 0){
        alert("You forgot to enter a name!");
        return;
    }

    // profileList.push( new Profile(name, age, gender));
    let profile = new Profile(name, age, gender);
    profileList.push(profile);

    
    console.log(profileList);
    sideBarUpdate();
    loadProfile();
    
}

function checkout(){


    //post
    fetch(url,{
        method:"POST",
        body: JSON.stringify(profileList),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => response.json)
    .then(json => console.log(json));

    document.getElementById("profilerCenter").innerHTML = `
        <h1>You have successfully checked out</h1>
    `;
    alert("You have successfully checked out");

    let profileList2 = [];
    profileList = profileList2;
    sideBarUpdate();

}



function sideBarUpdate(){
    document.getElementById("sideBar").innerHTML = "";
    for(let i = 0; i < profileList.length; i++){
        document.getElementById("sideBar").innerHTML += `
        <div class="profileAdded">
          Name: ${profileList[i].name} <br/> 
          Age: ${profileList[i].age} <br/>
          Gender: ${profileList[i].gender}
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
        <div class="navItem" onclick="transactionHistory()">Transaction History</div>
        <div class="navItem" onclick="">Account</div>
    `;
}

function loadHome(){
    document.getElementById("profileBox").innerHTML = `
        <div id="welcomeMsg">Mochi was here!</div>
    `;
}

function transactionHistory(){
    document.getElementById("profileBox").innerHTML = ``;

    fetch(url).then(response => response.json()).then(transactionList => {
        console.log("testing GET",transactionList);

        for(let i = 0; i < transactionList.length; i++){
            document.getElementById("profileBox").innerHTML += `
            Receipt#: ${transactionList[i].orderID} <br/>
            Name: ${transactionList[i].name} <br/>
            Age: ${transactionList[i].age} <br/>
            Gender: ${transactionList[i].gender} <br/>
            <br/>
        `;
        }
        


    });

    
}




loadHome();
loadNav();
sideBarUpdate();