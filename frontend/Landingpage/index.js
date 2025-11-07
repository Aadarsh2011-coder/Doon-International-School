// // Password constant
// const CORRECT_PASSWORD = 'Aadarsh2011';

// // Modal elements
// const modal = document.getElementById('passwordModal');
// const passwordForm = document.getElementById('passwordForm');
// const passwordInput = document.getElementById('teacherPassword');
// const passwordMessage = document.getElementById('passwordMessage');

// // Teacher icon click handler
// document.querySelector('.teacher-icon-btn').addEventListener('click', function(event) {
//   event.preventDefault(); // Prevent default link behavior
//   openPasswordModal();
// });

// // Form submit handler for password verification
// passwordForm.addEventListener('submit', function(event) {
//   event.preventDefault();
  
//   const enteredPassword = passwordInput.value.trim();
  
//   if (enteredPassword === CORRECT_PASSWORD) {
//     passwordMessage.textContent = 'Password correct! Redirecting...';
//     passwordMessage.className = 'password-message success';
//     closePasswordModal();
//     // Redirect to teachers.html after a short delay
//     setTimeout(() => {
//       window.location.href = 'teachers.html';
//     }, 500);
//   } else {
//     passwordMessage.textContent = 'Incorrect password. Try again.';
//     passwordMessage.className = 'password-message error';
//     passwordInput.value = ''; // Clear input on error
//     passwordInput.focus();
//   }
// });

// // Function to open modal
// function openPasswordModal() {
//   modal.style.display = 'block';
//   passwordInput.focus(); // Auto-focus on password field
// }

// // Function to close modal
// function closePasswordModal() {
//   modal.style.display = 'none';
//   passwordForm.reset();
//   passwordMessage.textContent = '';
//   passwordMessage.className = 'password-message';
// }

// // Close modal when clicking outside
// window.addEventListener('click', function(event) {
//   if (event.target === modal) {
//     closePasswordModal();
//   }
// });

// // Also handle Escape key to close modal
// document.addEventListener('keydown', function(event) {
//   if (event.key === 'Escape' && modal.style.display === 'block') {
//     closePasswordModal();
//   }
// });

// // Update existing goBack function if needed, but add this for class buttons
// document.addEventListener('DOMContentLoaded', function() {
//   // Class button handlers (assuming they exist or need to be added)
//   const classButtons = document.querySelectorAll('.class-button');
//   classButtons.forEach(button => {
//     button.addEventListener('click', function(event) {
//       event.preventDefault();
//       const className = this.getAttribute('data-class');
//       document.getElementById('classTitle').textContent = `Class ${className}`;
//       document.getElementById('classView').classList.add('active');
//       // Load PDFs logic here if needed
//       document.getElementById('pdfs').innerHTML = `<p>PDFs for ${className} will load here. (Placeholder)</p>`;
//     });
//   });
  
//   // Back button handler
//   window.goBack = function() {
//     document.getElementById('classView').classList.remove('active');
//   };
// });




// index.js

// Password constant
const CORRECT_PASSWORD = 'Aadarsh2011';

// Elements
const teacherButton = document.getElementById('teacherButton');
const modal = document.getElementById('passwordModal');
const modalContent = document.getElementById('modalContent');
const closeModalBtn = document.getElementById('closeModal');
const cancelModalBtn = document.getElementById('cancelModal');
const passwordForm = document.getElementById('passwordForm');
const passwordInput = document.getElementById('teacherPassword');
const passwordMessage = document.getElementById('passwordMessage');

// === Open Modal ===
teacherButton.addEventListener('click', (event) => {
  event.preventDefault();
  event.stopPropagation(); // Prevents bubbling clicks
  modal.style.display = 'block';
  passwordInput.focus();
});

// === Close Modal ===
closeModalBtn.addEventListener('click', closeModal);
cancelModalBtn.addEventListener('click', closeModal);

function closeModal() {
  modal.style.display = 'none';
  passwordForm.reset();
  passwordMessage.textContent = '';
  passwordMessage.className = 'password-message';
}

// === Submit Password ===
passwordForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const enteredPassword = passwordInput.value.trim();

  if (enteredPassword === CORRECT_PASSWORD) {
    passwordMessage.textContent = 'Password correct! Redirecting...';
    passwordMessage.classList.add('success');
    setTimeout(() => {
      closeModal();
      window.location.href = 'teachers.html';
    }, 1000);
  } else {
    passwordMessage.textContent = 'Incorrect password. Try again.';
    passwordMessage.classList.add('error');
    passwordInput.value = '';
    passwordInput.focus();
  }
});

// === Close modal on outside click ===
window.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});

// === Close on Escape key ===
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.style.display === 'block') {
    closeModal();
  }
});
