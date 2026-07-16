// ============================================
// RO'Lyfe NoteForge™
// Main Operating Engine
// Root Of Lyfe Holdings LLC™
// ============================================


// ============================================
// CONFIGURATION
// ============================================

const RO_LYFE = {

    company: "Root Of Lyfe Holdings LLC",

    brand: "RO'Lyfe NoteForge™",

    email: "richman@rootoflyfe.com",

    backupEmail: "richprivatelender@gmail.com",

    version: "Enterprise Command Center v2.0",

    database: {
        notes: "data/notes.json",
        investors: "data/investors.json",
        lenders: "data/lenders.json",
        deals: "data/deals.json"
    }

};




// ============================================
// GLOBAL DATABASE MEMORY
// ============================================

let RO_DATA = {

    notes: [],

    investors: [],

    lenders: [],

    deals: []

};




// ============================================
// LOGIN ENGINE
// ============================================


function loginUser(){


    const email =
    document.getElementById("loginEmail").value.trim();


    const password =
    document.getElementById("loginPassword").value.trim();



    if(!email){

        alert("Enter email first");

        return;

    }



    // Command center access

    localStorage.setItem(
        "rolyfeLoggedIn",
        "true"
    );


    localStorage.setItem(
        "rolyfeUser",
        email
    );



    document
    .getElementById("loginScreen")
    .classList.add("hidden");



    document
    .getElementById("app")
    .classList.remove("hidden");



    console.log(
        "RO'Lyfe Access:",
        email
    );


    initializeROLyfe();


}




// ============================================
// LOGOUT
// ============================================


function logoutUser(){


    localStorage.removeItem(
        "rolyfeLoggedIn"
    );


    localStorage.removeItem(
        "rolyfeUser"
    );



    document
    .getElementById("loginScreen")
    .classList.remove("hidden");



    document
    .getElementById("app")
    .classList.add("hidden");


}




// ============================================
// SESSION CHECK
// ============================================


function checkSession(){


    const session =
    localStorage.getItem(
        "rolyfeLoggedIn"
    );



    if(session === "true"){


        document
        .getElementById("loginScreen")
        ?.classList.add("hidden");



        document
        .getElementById("app")
        ?.classList.remove("hidden");


        initializeROLyfe();


    }


}






// ============================================
// THEME ENGINE
// ============================================


function toggleTheme(){


    document.body.classList.toggle(
        "light-mode"
    );


    localStorage.setItem(

        "rolyfeTheme",

        document.body.className

    );


}




function loadTheme(){


    const savedTheme =
    localStorage.getItem(
        "rolyfeTheme"
    );


    if(savedTheme){

        document.body.className =
        savedTheme;

    }


}






// ============================================
// MOBILE MENU
// ============================================


function toggleMenu(){


    const menu =
    document.getElementById(
        "mobileMenu"
    );


    if(menu){

        menu.classList.toggle(
            "active"
        );

    }


}




function scrollSection(id){


    const section =
    document.getElementById(id);


    if(section){

        section.scrollIntoView({

            behavior:"smooth"

        });

    }


}




// ============================================
// STARTUP ENGINE
// ============================================


async function initializeROLyfe(){


    console.log(
        "Launching RO'Lyfe NoteForge™..."
    );


    loadTheme();


    await loadDatabase();


    updateDashboard();


}



// ============================================
// LOAD JSON DATABASE
// ============================================


async function loadDatabase(){


try{


const [
notes,
investors,
lenders,
deals

] = await Promise.all([


fetch(RO_LYFE.database.notes)
.then(r=>r.json()),


fetch(RO_LYFE.database.investors)
.then(r=>r.json()),


fetch(RO_LYFE.database.lenders)
.then(r=>r.json()),


fetch(RO_LYFE.database.deals)
.then(r=>r.json())


]);



RO_DATA.notes = notes;

RO_DATA.investors = investors;

RO_DATA.lenders = lenders;

RO_DATA.deals = deals;



console.log(
"Database Loaded",
RO_DATA
);



renderPortfolio();



}

catch(error){


console.log(
"Database loading error:",
error
);


}



}
