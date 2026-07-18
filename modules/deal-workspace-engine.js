<!-- ==========================
RO'LYFE DEAL WORKSPACE
========================== -->

<section id="dealWorkspace" class="section">

<h2>
🏦 RO'Lyfe Deal Workspace
</h2>


<div class="card">


<div class="input-grid">


<input
id="dealAddress"
placeholder="Property Address"
value="2855 W Lehigh Ave, Philadelphia, PA 19132">


<input
id="dealPurchase"
placeholder="Purchase Price"
value="65000">


<input
id="dealARV"
placeholder="ARV"
value="225000">


<input
id="dealRehab"
placeholder="Rehab Budget"
value="90000">


<input
id="dealBorrower"
placeholder="Borrower Name"
value="RJ Construction & Design">


<input
id="dealCredit"
placeholder="Borrower Credit Score"
value="680">


<select id="dealExit">

<option value="Fix & Flip">
Fix & Flip
</option>

<option value="BRRRR">
BRRRR
</option>

<option value="DSCR">
DSCR Hold
</option>

<option value="Wholesale">
Wholesale
</option>

</select>


</div>



<button 
class="glow-btn"
onclick="createWorkspaceDeal()">

🚀 CREATE DEAL

</button>



<button 
class="glow-btn"
onclick="clearWorkspaceDeal()">

🗑 CLEAR

</button>



<div 
id="dealWorkspaceResult"
class="result-box">

No active deal.

</div>


</div>


</section>
