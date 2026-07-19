/*
=========================================
RO'Lyfe AI Underwriting Engine
Version: 1.0
=========================================
*/


function runAIUnderwriter(){


if(!currentDeal){

alert("Create a deal first.");

return;

}


let score = 0;

let notes = [];


// ARV Spread

let equityPercent =
(currentDeal.equity / currentDeal.arv) * 100;


if(equityPercent >= 30){

score += 25;

notes.push(
"Strong equity spread"
);

}

else if(equityPercent >= 20){

score += 15;

notes.push(
"Acceptable equity spread"
);

}

else{

notes.push(
"Thin equity margin"
);

}




// Credit

let credit =
Number(currentDeal.creditScore);



if(credit >= 700){

score += 20;

notes.push(
"Strong borrower credit"
);

}

else if(credit >= 650){

score += 15;

notes.push(
"Acceptable credit"
);

}

else{

score += 5;

notes.push(
"Credit improvement recommended"
);

}





// LTV

let ltv =
Number(currentDeal.ltv);



if(ltv <= 65){

score += 25;

notes.push(
"Conservative leverage"
);

}

else if(ltv <= 75){

score += 15;

}

else{

notes.push(
"High leverage exposure"
);

}





// Exit Strategy

if(
currentDeal.exitStrategy === "BRRRR" ||
currentDeal.exitStrategy === "DSCR"
){

score += 15;

notes.push(
"Long-term wealth strategy detected"
);

}

else{

score += 10;

}





// Final Grade


let grade;


if(score >= 80){

grade="A - FUNDABLE";

}

else if(score >=60){

grade="B - REVIEW";

}

else{

grade="C - HIGH RISK";

}



document.getElementById(
"aiDecision"
).innerHTML =


`

<h3>
🤖 RO'Lyfe AI Decision
</h3>

<h2>
${grade}
</h2>


<p>
Deal Score:
${score}/100
</p>


<ul>

${notes.map(
n=>`<li>${n}</li>`
).join("")}

</ul>

`;



currentDeal.aiScore = score;

currentDeal.aiGrade = grade;


saveDeal();



  }
