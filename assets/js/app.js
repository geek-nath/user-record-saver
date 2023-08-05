// show modal when "add a user" button is clicked
const modalContainer = document.querySelector('.modal_container');
const addContactBtn = document.querySelector('#addContactBtn');

addContactBtn.onclick = () => {
  modalContainer.classList.remove('d-none');
}

// close modal function 
const closeModalBtn = document.querySelector('#closeModal');

closeModalBtn.onclick = () => {
  modalContainer.classList.add('d-none');
}

// add new contact to contacts object by getting the contact details from "newContactForm"
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
const newContactForm = document.querySelector('#newContactForm');

// loop through all contacts and show in browser function
const contactWrapper = document.querySelector('#contactWrapper');
function displayContacts(allContacts) {
  contactWrapper.innerHTML = '';
  allContacts.forEach(details => {
    const { id, name, email, gender } = details;
    contactWrapper.innerHTML += `
      <div class="col-xl-3 col-lg-4 col-md-6 mb-3">
        <div class="bg-light border shadow-sm rounded-3 p-4">
          <div class="d-flex align-items-center justify-content-center">
            <img src="./assets/images/${gender === "female" ? "female.svg" : "male.svg"}" width="50%" alt="svg illustrator">
          </div>
          <div class="text-center mt-3">
            <h5 class="text-dark lh-1">${name}</h5>
            <h6 class="text-muted fw-light">${email === "" ? "email not set" : `${email}`}</h6>
          </div>
          <div class="mt-4 d-flex gap-3">
            <button class="btn btn-primary btn-sm w-100" onclick="previewContact(${id})">View profile</button>
            <button class="btn btn-danger btn-sm delete-btn" onclick="deleteContact(${id})">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  });
}
// display contacts details in browser
displayContacts(contacts);

// check contact length to display status message
const statusMessageEl = document.querySelector('#statusMessage');

function statusCheck() {
  if (contacts.length < 1) {
    statusMessageEl.className = "d-flex align-items-center justify-content-center"
  } else {
    statusMessageEl.className = "d-none align-items-center justify-content-center"
  }
}

statusCheck();

// add new contact details on newContactForm submit
// get contact details values from input Nodes
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const number = document.querySelector('#number');
const gender = document.getElementsByName('gender');

newContactForm.onsubmit = (e) => {
  e.preventDefault();
  let genderValue;

  for (i = 0; i < gender.length; i++) {
    if (gender[i].checked) {
      genderValue = gender[i].value;
    }
  }

  contacts = [...contacts,
  {
    id: Math.random() * 1000,
    name: name.value,
    email: email.value,
    number: number.value,
    gender: genderValue
  }
  ];

  // display newly added contacts to the browser by declaring the displayContactsFunction
  displayContacts(contacts);

  // hide modal after new contact has been added
  modalContainer.classList.add('d-none');

  // clear input field
  name.value = ''; email.value = ''; number.value = '';

  statusCheck();

  // add contact details to localStorage
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// delete contact function
function deleteContact(id) {
  let confirmation = confirm("Are you sure you want to delete this contact?");
  if (confirmation === true) {
    contacts = contacts.filter(details => details.id !== id);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    statusCheck();
    displayContacts(contacts);
  } else {
    alert('Contact not deleted');
  }
}

// preview contact details
const previewModal = document.querySelector('.preview_modal');

function previewContact(id) {
  previewModal.classList.remove('d-none');

  const contactDetail = contacts.find(details => details.id === id);
  const modalContent = document.querySelector('.modal_content');

  const { gender, name, email, number } = contactDetail;
  modalContent.innerHTML = `
    <div class="row">
      <div class="col-md-6">
        <div>
          <img src="./assets/images/${gender === 'female' ? "female.svg" : "male.svg"}" width="100%" alt="svg illustrator">
        </div>
      </div>
      <div class="col-md-6">
        <div class="d-flex justify-content-center flex-column gap-3 h-100">
          <div>
            <h6 class="text-muted">Name:</h6>
            <h5 class="text-dark">${name}</h5>
          </div>

          <div>
            <h6 class="text-muted">Email:</h6>
            <h5 class="text-dark">${email === "" ? "email not set" : `${email}`}</h5>
          </div>

          <div>
            <h6 class="text-muted">Phone number:</h6>
            <h5 class="text-dark">${number}</h5>
          </div>

          <div>
            <h6 class="text-muted">Gender:</h6>
            <h5 class="text-dark">${gender}</h5>
          </div>
        </div>
      </div>
    </div>

    <div class="float-end">
      <button class="btn btn-dark" onclick="closePreviewModal()">Close</button>
    </div>
  `;
}

function closePreviewModal() {
  previewModal.classList.add('d-none');
}