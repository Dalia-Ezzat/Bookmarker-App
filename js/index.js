
// ----------------- Start Global
var documentHtml = document,
siteName = documentHtml.getElementById("siteName"),
siteUrl = documentHtml.getElementById("siteUrl"),
btnAdd = documentHtml.getElementById("btnAdd"),
btnUpdate = documentHtml.getElementById("btnUpdate"),
searchInput = documentHtml.getElementById("searchBook"),

booksContainer = [],
indexUpdate = 0,
validSucess = false;

// ----------------- When-Start-----------------------

if (getLocal() !== null) {
booksContainer = getLocal();
displayData();
}

// ----------------- Start Events-------------------
btnAdd.onclick = function () {
addBookMark();
};

btnUpdate.onclick = function () {
   updateBook();
};

searchInput.oninput = function () {
searchBook(this.value);
};

// ----------------- Start Function------------------
function addBookMark() {
if (validSucess) {
   var book = {
      name: siteName.value,
      url: siteUrl.value,
   };
   booksContainer.push(book);
   setLocal();
   displayData();
   resetForm();

   
}
}

function setUpdateInfo(index) {
   indexUpdate = index;
   siteName.value = booksContainer[index].name;
   siteUrl.value = booksContainer[index].url;
   btnAdd.classList.add("d-none");
   btnUpdate.classList.remove("d-none");
}

function updateBook() {
   if (validSucess) {
      var book = {
         name: siteName.value,
         url: siteUrl.value,
      };
      booksContainer.splice(indexUpdate, 1, book);
      displayData();
      setLocal();
      resetForm();
      btnAdd.classList.remove("d-none");
      btnUpdate.classList.add("d-none");
    
   }
}


function searchBook() {
displayData();
}

function displayData() {
var tableBody = "";
var term = searchInput.value.toLowerCase();

for (var i = 0; i < booksContainer.length; i++) {
   if (booksContainer[i].name.toLowerCase().includes(term)) {
      tableBody += `
      
      <tr >
      <td >${i+1}</td>
      <td scope="row">${booksContainer[i].name.toLowerCase().replaceAll(term, `<span class="text-bg-info">${term}</span>`)}</td>
    
      <td >
         <div class="hstack justify-content-center">
            <a href="${booksContainer[i].url}" target="_blank" class="btn btn-sm btn1">Visit <i class="fa-regular fa-eye"></i>
             </a>
            </td>
   
               <td><button class="btn btn-sm btn-warning" onclick="setUpdateInfo(${i})">
                Update <i class="fa-regular fa-pen-to-square"></i>
               </button></td>
  
               <td> <button class="btn btn-sm btn-danger" onclick="deleteBookMark(${i})">
                 Delete <i class="fa-solid fa-trash"></i>
               </button>
            </div>
         </td>
   </tr>
      `;
   }
}

documentHtml.getElementById("tableBody").innerHTML = tableBody;
}

function resetForm() {
siteName.value = "";
siteUrl.value = "";
}

function setLocal() {
localStorage.setItem("booksData", JSON.stringify(booksContainer));
}

function getLocal() {
return JSON.parse(localStorage.getItem("booksData"));
}


// -----------------delete-sites--------------

function deleteBookMark(index){
 
    booksContainer.splice(index,1);
    
    localStorage.setItem("booksData", JSON.stringify(booksContainer));
 
    displayData(booksContainer);
     

}

// ----------------- Start Validation-------------

var validation = {
nameStyle:
   /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/,
urlStyle: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
validationTest: function (styleValidation, input, msg) {
   if (styleValidation.test(input.value)) {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        input.nextElementSibling.classList.add("d-none");
      return true;

   } else {  
      input.classList.add('is-invalid');
      input.classList.remove('is-valid');
      input.nextElementSibling.classList.remove("d-none");
      input.nextElementSibling.innerHTML = msg;
    
      return false;
   }
},
};

["input", "mousedown"].forEach((item) => {
documentHtml.forms[0].addEventListener(item, function (e) {
   const validationName = validation.validationTest(
      validation.nameStyle,
      siteName,
      " Site name must contain at least 3 characters"
      
   );
   const validationUrl = validation.validationTest(validation.urlStyle, siteUrl, "write the proper URL with https://");

   validationName && validationUrl ? (validSucess = true) : (validSucess = false);
});
});










