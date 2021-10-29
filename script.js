document.body.innerHTML =`
<header>
    <h2>Programmatic <span>Screenshots</span> of Any <span> Website </span> in <span> Seconds </span> </h2>
</header>
<section class="inputForm" id="inputForm">
   <label for="basic-url" >URL</label>
      <div class="input-group">
         <span class="input-group-text" id="basic-addon3">https://</span>
         <input type="url" class="form-control" id="basic-url" placeholder="example.com">
      </div>
    <p>Browser Size</p>
   <div class="input-group mb-3">
      <input type="text" class="form-control  inputSize" id="width" placeholder="Browser width">
      <input type="text" class="form-control inputSize" id="heigth" placeholder="Browser height">
   </div>
    <p>Options</p>
   <div class="optionClass">
   <div class="form-check form-check-inline">
      <input class="form-check-input" checked type="checkbox" id="fullSS">
      <label class="form-check-label" for="inlineCheckbox1">Full page screenshot</label>
   </div>
   <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" id="freshSS" >
      <label class="form-check-label" for="inlineCheckbox2">Fresh screenshot</label>
   </div><br>
   </div>
   <div class="buttonClass">
       <input class="optionButton" type="submit" onclick="toggleEdits()" value="Show Advanced Options">
   </div>
   <div class="advancedOption">
       <label for="fileType">File type</label>
        <select name="outputFileType" id="fileType" class="form-select">
           <option value="png">png</option>
           <option value="jpeg">jpeg</option>
        </select>
       <label for="loadEvent">Load Event</label>
        <select name="loadEvent" id="loadEvent" class="form-select">
           <option value="load">load</option>
           <option value="domcontentloaded">domcontentloaded</option>
           <option value="networkidle">networkidle</option>
        </select>
    </div>
    <div class="buttonClass">
      <input class="captureButton" type="submit" onclick="capture()" value="Capture">
    </div>
    <hr>
</section>`

//advanced options function
async function toggleEdits(){
  const editUserForm=document.querySelector(".advancedOption");
  button = document.querySelector(".optionButton")
  if (button.value=="Show Advanced Options") {
    button.value = "Hide Advanced Options";
   button.style.background = "#0a4296"
}
    else {button.value = "Show Advanced Options";
    button.style.background = "#0d6efd"
  }
  editUserForm.style.display =
  editUserForm.style.display ==="block" ? "none" : "block";
}
//capture button function
async function capture(){
  const url = document.querySelector("#basic-url").value
  const width = document.querySelector("#width").value
  const height = document.querySelector("#heigth").value
  const fullSS = document.querySelector("#fullSS")
  const freshSS = document.querySelector("#freshSS")
  const fileType = document.querySelector("#fileType").value
  const loadEvent = document.querySelector("#loadEvent").value
 
//check if url is empty
if (document.querySelector("#basic-url").value == "") {
  alert("Empty URL");
  return
}
//for browser width 
if(width ==""){
 screenWidth = "0"
}else{
screenWidth=width
}
//for browser height 
if(height ==""){
  screenHeight = "0"
 }else{
  screenHeight=height
 }
//options
if(fullSS.checked){
 ssFull = fullSS.value ="full_page=true"
}else{
 ssFull = fullSS.value ="full_page=false"
}
if(freshSS.checked){
 ssFresh = freshSS.value ="fresh=true"
}else{
 ssFresh = freshSS.value ="fresh=false"
}

  let token = "N5J3DE8-HWRM9W0-MEAH7M3-7H0EVY9" // api key
  let query = `https://shot.screenshotapi.net/screenshot`;
  query += `?token=${token}&url=${url}&width=${screenWidth}&height=${screenHeight}&${ssFull}&${ssFresh}&output=json&file_type=${fileType}&wait_for_event=${loadEvent}`;
try{  
  const data = await fetch(query)
if(data.status==200){
  const screenShot = await data.json()
  image = document.querySelector("#inputForm")
  image.innerHTML+=`
<div class="container">
   <div class="preview">
     <h5 class="previewText">Preview</h5>
   </div>
   <div class="preview">
     <a href="${screenShot.screenshot}" target="_blank">
       <img class="output"  src="${screenShot.screenshot}" />
       <P>click to full image</p>
     </a>
   </div>
</div>`
}
else if(data.status==500){
    throw new Error("page.goto: net::ERR_NAME_NOT_RESOLVED ") 
}else{
  throw new Error("Response Not Ok- Failed to fetch")
}}
catch(err){
   const image = document.querySelector("#inputForm")
    image.innerHTML=`
    <p>${err.message}</p>
    <button class="errorButton"onclick="back()">Back</button>`
}}

//back from error page
function back(){
  location.reload()
}
 
 
 




