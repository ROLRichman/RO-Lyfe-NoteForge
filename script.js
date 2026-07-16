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


// ==========================================
// RO'Lyfe NoteForge™
// COMMAND CENTER OPERATING ENGINE
// PART 2
// ==========================================


// ==========================================
// SESSION CONTROL
// ==========================================


function loginUser(){

    const email =
    document.getElementById("loginEmail").value.trim();


    if(!email){

        alert("Enter email first");

        return;

    }


    localStorage.setItem(
        "rolyfeUser",
        email
    );


    localStorage.setItem(
        "rolyfeLoggedIn",
        "true"
    );


    document
    .getElementById("loginScreen")
    .classList.add("hidden");


    document
    .getElementById("app")
    .classList.remove("hidden");


    console.log(
        "RO'Lyfe User:",
        email
    );


}



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




function checkSession(){

    if(
    localStorage.getItem(
    "rolyfeLoggedIn"
    )
    === "true"
    ){


        document
        .getElementById("loginScreen")
        .classList.add("hidden");


        document
        .getElementById("app")
        .classList.remove("hidden");


    }


}





// ==========================================
// DATABASE ENGINE
// ==========================================


let noteDatabase = [];

let investorDatabase = [];

let lenderDatabase = [];





async function loadDatabase(){


try{


const notes =
await fetch(
"data/notes.json"
);


noteDatabase =
await notes.json();



const investors =
await fetch(
"data/investors.json"
);


investorDatabase =
await investors.json();



const lenders =
await fetch(
"data/lenders.json"
);


lenderDatabase =
await lenders.json();



console.log(
"RO'Lyfe Database Loaded"
);



updateDashboard();



renderPortfolio();



}

catch(error){


console.log(
"Database loading error:",
error
);


}



}






// ==========================================
// PORTFOLIO DASHBOARD
// ==========================================



function updateDashboard(){



let totalNotes =
noteDatabase.length;



let upb =
noteDatabase.reduce(

(total,n)=>

total +
Number(
n.upb || 0
)

,0);



let price =
noteDatabase.reduce(

(total,n)=>

total +
Number(
n.purchasePrice || 0
)

,0);




let cashflow =
noteDatabase.reduce(

(total,n)=>

total +
Number(
n.monthlyPayment || 0
)

,0);




let totalNotesBox =
document.getElementById(
"totalNotes"
);



if(totalNotesBox)

totalNotesBox.innerHTML =
totalNotes;



let upbBox =
document.getElementById(
"totalUPB"
);


if(upbBox)

upbBox.innerHTML =
"$"+
upb.toLocaleString();



let priceBox =
document.getElementById(
"purchasePrice"
);


if(priceBox)

priceBox.innerHTML =
"$"+
price.toLocaleString();




let cashBox =
document.getElementById(
"monthlyCashflow"
);


if(cashBox)

cashBox.innerHTML =
"$"+
cashflow.toLocaleString();



}




// ==========================================
// PORTFOLIO TABLE
// ==========================================



function renderPortfolio(){



const table =
document.getElementById(
"portfolioTable"
);



if(!table)

return;



table.innerHTML="";



noteDatabase.forEach(note=>{


table.innerHTML += `


<tr>

<td>
${note.id || "-"}
</td>


<td>
${note.county || "-"}
</td>


<td>
$${Number(note.upb || 0).toLocaleString()}
</td>


<td>
${note.yield || 0}%
</td>


<td>
${note.status || "Active"}
</td>


</tr>


`;



});



}





// ==========================================
// PROPERTY SEARCH HUB
// ==========================================



function getPropertyAddress(){


return document
.getElementById(
"propertyAddress"
)
.value.trim();



}



function openZillow(){


let address =
getPropertyAddress();



if(!address){

alert(
"Enter property address"
);

return;

}



window.open(

"https://www.zillow.com/homes/"
+
encodeURIComponent(address)

+"_rb/",

"_blank"

);


}





function openRedfin(){


let address =
getPropertyAddress();



window.open(

"https://www.redfin.com/stingray/do/location-autocomplete?location="
+
encodeURIComponent(address),

"_blank"

);


}





function openRealtor(){


let address =
getPropertyAddress();



window.open(

"https://www.realtor.com/realestateandhomes-search/"
+
encodeURIComponent(address),

"_blank"

);


}





function openPropWire(){


window.open(

"https://www.propwire.com/",

"_blank"

);


}





function openOPA(){


window.open(

"https://property.phila.gov/",

"_blank"

);


}




function openPropertyChecker(){


window.open(

"https://pennsylvania.propertychecker.com/",

"_blank"

);


    }



// ==========================================
// RO'Lyfe NoteForge™
// COMMAND CENTER OPERATING ENGINE
// PART 3
// ==========================================



// ==========================================
// NOTE ANALYZER
// ==========================================


function analyzeNote(){


const upb =
Number(
document.getElementById("noteUPB").value || 0
);


const purchase =
Number(
document.getElementById("notePurchase").value || 0
);



const rate =
Number(
document.getElementById("noteRate").value || 0
);



const payment =
Number(
document.getElementById("notePayment").value || 0
);



const payments =
Number(
document.getElementById("notePayments").value || 0
);




const discount =
upb - purchase;



const totalPayments =
payment * payments;



const roi =
purchase > 0
?
((totalPayments - purchase) / purchase) * 100
:
0;



const result =
document.getElementById(
"noteResults"
);



if(result){


result.innerHTML = `

<h3>📄 Note Analysis</h3>

<p>
UPB:
$${upb.toLocaleString()}
</p>

<p>
Purchase Price:
$${purchase.toLocaleString()}
</p>


<p>
Discount Captured:
$${discount.toLocaleString()}
</p>


<p>
Interest Rate:
${rate}%
</p>


<p>
Projected Cash Received:
$${totalPayments.toLocaleString()}
</p>


<p>
Estimated ROI:
${roi.toFixed(2)}%
</p>


`;

}


}




// ==========================================
// COMPOUND ROI ENGINE
// ==========================================



function calculateCompoundROI(){


const investment =
Number(
document.getElementById(
"investmentAmount"
).value || 0
);



const monthly =
Number(
document.getElementById(
"monthlyCashflow"
).value || 0
);



const years =
Number(
document.getElementById(
"roiYears"
).value || 0
);



const growth =
Number(
document.getElementById(
"annualGrowth"
).value || 0
);



let futureValue =
investment;



for(
let i = 0;
i < years;
i++
){

futureValue =
futureValue *
(1 + growth / 100);

}



futureValue +=
(monthly * 12 * years);



const profit =
futureValue - investment;



const roi =
investment > 0
?
(profit / investment) * 100
:
0;



const box =
document.getElementById(
"roiResult"
);



if(box){


box.innerHTML = `

<h3>
📈 Compound Wealth Result
</h3>


<p>
Future Value:
$${futureValue.toLocaleString(undefined,
{
maximumFractionDigits:0
})}
</p>


<p>
Profit:
$${profit.toLocaleString(undefined,
{
maximumFractionDigits:0
})}
</p>


<p>
ROI:
${roi.toFixed(2)}%
</p>

`;

}


}




// ==========================================
// CREATIVE OFFER ENGINE
// ==========================================



function calculateCreativeOffer(){


const arv =
Number(
document.getElementById(
"offerARV"
).value || 0
);



const type =
document.getElementById(
"offerType"
).value;




const cashPercent =
Number(
document.getElementById(
"cashPercent"
).value || 50
);



const carryPercent =
Number(
document.getElementById(
"carryPercent"
).value || 65
);



const financePercent =
Number(
document.getElementById(
"financePercent"
).value || 75
);



const down =
Number(
document.getElementById(
"downPayment"
).value || 5
);



const interest =
Number(
document.getElementById(
"interestRate"
).value || 5
);



const balloon =
Number(
document.getElementById(
"balloonYears"
).value || 5
);



let result="";



if(type==="cash"){


let offer =
arv *
(cashPercent/100);



result = `

<h3>
💵 All Cash Offer
</h3>

Offer:
$${offer.toLocaleString()}

`;



}




if(type==="carry"){



let price =
arv *
(carryPercent/100);



let downPayment =
price *
(down/100);



let sellerNote =
price-downPayment;



result = `

<h3>
🤝 Seller Carry Structure
</h3>


Purchase Price:
$${price.toLocaleString()}


<br>

Down Payment:
$${downPayment.toLocaleString()}


<br>

Seller Note:
$${sellerNote.toLocaleString()}


<br>

Interest:
${interest}%


<br>

Balloon:
${balloon} Years


`;



}




if(type==="finance"){



let price =
arv *
(financePercent/100);



result = `

<h3>
🏦 Seller Financing
</h3>


Purchase Price:
$${price.toLocaleString()}


<br>

Seller Note:
$${price.toLocaleString()}


<br>

Interest:
${interest}%


<br>

Balloon:
${balloon} Years


`;



}



document.getElementById(
"offerResult"
).innerHTML = result;



}






// ==========================================
// AI UNDERWRITING CONNECTION
// ==========================================



function runAIUnderwriter(){



if(
typeof RO_LYFE_AI_UNDERWRITE
===
"function"
){


let decision =
RO_LYFE_AI_UNDERWRITE();



document.getElementById(
"aiDecision"
).innerHTML =
decision;



}

else{


document.getElementById(
"aiDecision"
).innerHTML =

`

<h3>
🤖 AI Engine Ready
</h3>

<p>
Load AI underwriting module.
</p>

`;

}



}






// ==========================================
// PDF DEAL REPORT
// ==========================================



function generateDealReport(){



if(!window.jspdf){

alert(
"PDF Engine not loaded"
);

return;

}



const {
jsPDF
}
=
window.jspdf;



const pdf =
new jsPDF();



pdf.text(
"RO'Lyfe NoteForge™",
20,
20
);



pdf.text(
"Capital Intelligence Deal Report",
20,
35
);



pdf.text(
"Root Of Lyfe Holdings LLC",
20,
50
);



pdf.text(
"Generated Investor Package",
20,
65
);



pdf.save(
"RO-Lyfe-Deal-Report.pdf"
);



}






// ==========================================
// EMAIL PACKAGE
// ==========================================



function sendDealEmail(){



const subject =
"RO'Lyfe NoteForge™ Deal Package";



const body = `

Hello,

I would like to share a RO'Lyfe NoteForge opportunity.

Included:

- Note Analysis
- ROI Projection
- Creative Finance Structure
- AI Underwriting Review
- Investor Summary


Thank you,

Richardson L.
Root Of Lyfe Holdings LLC

richman@rootoflyfe.com

`;



window.location.href =

"mailto:richman@rootoflyfe.com?subject="
+
encodeURIComponent(subject)
+
"&body="
+
encodeURIComponent(body);



}







// ==========================================
// START SYSTEM
// ==========================================


document.addEventListener(
"DOMContentLoaded",
()=>{


checkSession();


loadDatabase();


}
);


