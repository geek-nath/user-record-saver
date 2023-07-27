// show modal with form to add user
const openModalButton = document.querySelector('#openModal');
const closeModalButton = document.querySelector('#closeModal');
const modalWrapper = document.querySelector('.modal_container');

// open modal function
openModalButton.addEventListener('click', function () {
  modalWrapper.classList.remove('d-none');
});

// close modal function
closeModalButton.addEventListener('click', function () {
  modalWrapper.classList.add('d-none');
});

// get user data on form submit 
const addUserFormElement = document.querySelector('#addUserForm');
const userData = [];

addUserFormElement.addEventListener('submit', function (e) {
  e.preventDefault();

  const userName = document.querySelector('#user_name').value;
  const userEmail = document.querySelector('#user_email').value;
  const userTelNumber = document.querySelector('#user_number').value;
  const userGender = document.getElementsByName('gender');

  let userGenderValue;

  for (i = 0; i < userGender.length; i++) {
    if (userGender[i].checked) {
      userGenderValue = userGender[i].value;
    }
  }

  userData.push({
    name: userName,
    email: userEmail,
    telNumber: userTelNumber,
    gender: userGenderValue,
    id: Math.random() * 1000
  });

  // loop through userData array and display it's data on the browser
  const userDataWrapper = document.querySelector('.users_data_wrapper');

  const userDataElement = document.createElement('div');
  userDataElement.className = 'd-flex align-items-center bg-white p-3 shadow-md border rounded-3 mb-3';

  userData.forEach((users) => {
    const { name, email, telNumber, gender, id } = users;
    userDataElement.innerHTML = `
      <div class="me-auto">
        <div class="d-flex gap-2 align-items-center">
          <img src="./assets/images/${gender}.svg" width="100%" class="avater_container border bg-light" alt="avatar">
          <div>
            <b class="fw-semibold d-block text-dark">${name}</b>
            <div class="text-sm text-muted">${email}</div>
          </div>
        </div>
      </div>

      <div class="me-auto">
        <b class="me-2 fw-semibold">Tel number:</b> <span class="text-muted">${telNumber}</span>
      </div>

      <div class="me-auto">
        <b class="me-2 fw-semibold">Gender:</b> <span class="text-muted">${gender}</span>
      </div>

      <div class="d-flex gap-3">
        <button class="btn btn-danger" onclick="deleteUseData(${id})">Delete</button>
        <button class="btn btn-primary">Edit</button>
      </div>
    `;
  });

  userDataWrapper.appendChild(userDataElement);

  console.log(userData);
})

// delete user data function
function deleteUseData(id) {
  const deletedUser = userData.filter(user => user.id != id);
}