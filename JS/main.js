

// Doted line
let LineContent = "";
for (i = 0; i < 375; i++) {
    LineContent += "<span>.</span>";
}
document.getElementById('line1').innerHTML = LineContent;
document.getElementById('line2').innerHTML = LineContent;



// Inputs
let siteNameInput = document.getElementById('siteName');
let siteUrlInput = document.getElementById('siteUrl');
let bookMarks = [];

if (localStorage.getItem('allMarkBooks') != null) {
    bookMarks = JSON.parse(localStorage.getItem('allMarkBooks')),
        displayBookMarks();
}



//Add new book mark
function submitNewBookmark() {
    if (validateInputs(siteNameInput) && validateInputs(siteUrlInput)) {
        let bookMark = {
            name: siteNameInput.value,
            url: siteUrlInput.value,
        };
        bookMarks.push(bookMark);
        localStorage.setItem('allMarkBooks', JSON.stringify(bookMarks));
        displayBookMarks();
        clearInputs();
        removeValidationStyles();
    } else {
        alert("Please provide valid inputs for both name and URL.");
    }
}


//Display the new book mark
function displayBookMarks() {
    let cartona = "";
    for (let i = 0; i < bookMarks.length; i++) {
        cartona += `
        <tr class="border-bottom">
        <td>${i + 1}</td>
        <td>${bookMarks[i].name}</td>
        <td>
            <button class="visit my-2 border-0 rounded">
                <a class="text-white" href="${bookMarks[i].url}" target="_blank">
                    <i class="fa-solid fa-eye"></i>
                    <span>Visit</span>
                </a>
            </button>
        </td>
        <td>
            <button onclick="deleteBookMark(${i})" class="delete my-2 border-0 bg-danger rounded">
                <a class="text-white" href="">
                    <i class="fa-solid fa-trash-can"></i>
                    <span>Delete</span>
                </a>
            </button>
        </td>
         </tr>  
            `
    }

    document.getElementById('tableContent').innerHTML = cartona;
}

//Reset
function clearInputs() {
    siteNameInput.value = "";
    siteUrlInput.value = "";
}

//Delete
function deleteBookMark(index) {
    bookMarks.splice(index, 1);
    localStorage.setItem('allMarkBooks', JSON.stringify(bookMarks));
    displayBookMarks();
}


//Validation
function validateInputs(element) {
    console.log(element.value, element.id)
    let regux = {
        siteName: /^[A-Z][a-z]{2,}/,
        siteUrl: /^https:\/\/[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)*\.(com|net)$/,
    }

    if (regux[element.id].test(element.value) == true) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        element.nextElementSibling.classList.replace('d-block', 'd-none')
        return true;
    } else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        element.nextElementSibling.classList.replace('d-none', 'd-block')
        return false;
    }

}

//remove validation style after push
function removeValidationStyles() {
    siteNameInput.classList.remove('is-valid', 'is-invalid');
    siteUrlInput.classList.remove('is-valid', 'is-invalid');
}



