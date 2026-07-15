function loginUser(){

    let email = document.getElementById("loginEmail").value.trim();

    if(!email){
        alert("Enter email first");
        return;
    }

    document.getElementById("loginScreen").style.display = "none";

    document.getElementById("app").classList.remove("hidden");

    localStorage.setItem(
        "rolyfeUser",
        email
    );

    console.log("Logged in:", email);
}



function logoutUser(){

    localStorage.removeItem("rolyfeUser");

    document.getElementById("loginScreen").style.display = "flex";

    document.getElementById("app").classList.add("hidden");

}

// ==========================================
// RO'Lyfe NoteForge™
// Main Application Engine
// ==========================================


let notes = [];


// ==========================================
// LOAD SAMPLE NOTE TAPE
// ==========================================

async function loadNotes(){

try {

const response = await fetch("data/sample-notes.json");

notes = await response.json();

renderNotes();

updateDashboard();


} catch(error){

console.log("Sample notes not loaded yet:", error);

}

}




// ==========================================
// DASHBOARD
// ==========================================


function updateDashboard(){

if(!notes.length) return;


let totalUPB = notes.reduce(
(sum,n)=>sum + Number(n.upb || 0),0
);


let totalPrice = notes.reduce(
(sum,n)=>sum + Number(n.salePrice || 0),0
);


document.getElementById("totalNotes").innerHTML =
notes.length;


document.getElementById("totalUPB").innerHTML =
"$"+totalUPB.toLocaleString();


document.getElementById("purchasePrice").innerHTML =
"$"+totalPrice.toLocaleString();


document.getElementById("yield").innerHTML =
"12.5%";


}




// ==========================================
// NOTE TABLE
// ==========================================


function renderNotes(){

let table =
document.getElementById("noteTable");


if(!table) return;


table.innerHTML="";


notes.forEach(note=>{


table.innerHTML += `

<tr>

<td>${note.id || "-"}</td>

<td>${note.county || "-"}</td>

<td>
$${Number(note.upb).toLocaleString()}
</td>

<td>
${note.yield || 0}%
</td>

</tr>

`;

});


}





// ==========================================
// PROPERTY SEARCH
// ==========================================


function getAddress(){

return document
.getElementById("searchAddress")
.value.trim();

}



function searchZillow(){

let address=getAddress();

if(!address)return alert("Enter address");


window.open(
"https://www.zillow.com/homes/"
+
encodeURIComponent(address)
+"_rb/"
);


}



function searchRedfin(){

let address=getAddress();

window.open(
"https://www.redfin.com/stingray/do/location-autocomplete?location="
+
encodeURIComponent(address)
);

}



function searchRealtor(){

let address=getAddress();

window.open(
"https://www.realtor.com/realestateandhomes-search/"
+
encodeURIComponent(address)
);

}



function searchPropWire(){

let address=getAddress();

window.open(
"https://www.propwire.com/"
);

}



function searchOPA(){

window.open(
"https://property.phila.gov/"
);

}




// ==========================================
// NOTE ANALYZER
// ==========================================


function analyzeNote(){


let upb =
Number(document.getElementById("noteUPB").value);


let price =
Number(document.getElementById("notePrice").value);


let rate =
Number(document.getElementById("noteRate").value);


let payment =
Number(document.getElementById("notePayment").value);


let discount =
upb-price;


let roi =
((payment*120-price)/price)*100;



document.getElementById("noteResults").innerHTML = `

<div class="result">

<h3>Analysis</h3>

<p>Discount:
$${discount.toLocaleString()}</p>

<p>Projected ROI:
${roi.toFixed(2)}%</p>

<p>Interest:
${rate}%</p>

<p>Monthly Cash Flow:
$${payment.toLocaleString()}</p>


</div>

`;

}




// ==========================================
// ROI CALCULATOR
// ==========================================


function calculateROI(){


let investment =
Number(document.getElementById("investment").value);


let income =
Number(document.getElementById("monthlyIncome").value);


let years =
Number(document.getElementById("years").value);



let total =
income * 12 * years;


let roi =
((total-investment)/investment)*100;



document.getElementById("roiResults").innerHTML=

`

<h3>ROI Result</h3>

<p>
Total Cash Flow:
$${total.toLocaleString()}
</p>


<p>
ROI:
${roi.toFixed(2)}%
</p>

`;

}





// ==========================================
// CREATIVE OFFER ENGINE
// ==========================================


function calculateOffer(){


let arv =
Number(document.getElementById("arvOffer").value);


let type =
document.getElementById("offerType").value;


let result="";



if(type==="cash"){


let offer=arv*.50;


result=`

<h3>💵 Cash Offer</h3>

Offer:
$${offer.toLocaleString()}

`;

}




if(type==="carry"){


let price=arv*.65;

let down=price*.05;

let note=price-down;


result=`

<h3>🤝 Seller Carry</h3>

Price:
$${price.toLocaleString()}

Down:
$${down.toLocaleString()}

Seller Note:
$${note.toLocaleString()}

Interest:
5%

Balloon:
4 Years

`;

}




if(type==="finance"){


let price=arv*.75;


result=`

<h3>📄 Seller Financing</h3>

Price:
$${price.toLocaleString()}

Seller Note:
$${price.toLocaleString()}

Interest:
6%

Balloon:
5 Years

`;

}



document.getElementById("offerResults").innerHTML=result;


}





// ==========================================
// PDF REPORT
// ==========================================


function generatePDF(){


const {jsPDF}=window.jspdf;


let pdf=new jsPDF();


pdf.text(
"RO'Lyfe NoteForge™",
20,
20
);


pdf.text(
"Note Acquisition Report",
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
"RO-Lyfe-Note-Report.pdf"
);


}





// ==========================================
// EMAIL PACKAGE
// ==========================================


function emailPackage(){


let subject =
"RO'Lyfe NoteForge Investment Opportunity";


let body =
`
Hello,

I would like to share a RO'Lyfe NoteForge opportunity.

Attached information includes:

- Note Analysis
- Cash Flow
- ROI Projection
- Risk Review

Please review.

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
// OPEN LINKS
// ==========================================


function openLink(url){

window.open(url,"_blank");

}




// START APP

window.onload=function(){

loadNotes();

};
