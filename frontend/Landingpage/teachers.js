       const modal = document.getElementById('uploadModal');
        const closeBtn = document.querySelector('.close');
        const subjectBtns = document.querySelectorAll('.subject-btn');
        const uploadForm = document.getElementById('uploadForm');
        const fileInput = document.getElementById('fileInput');
        const fileName = document.getElementById('fileName');
        const subjectNameInput = document.getElementById('subjectName');
        const successMessage = document.getElementById('successMessage');

        // Open modal when subject button is clicked
        subjectBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const subject = this.getAttribute('data-subject');
                document.getElementById('selectedSubject').value = subject;
                subjectNameInput.value = subject;
                modal.classList.add('show');
            });
        });

        // Close modal
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('show');
            resetForm();
        });

        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.classList.remove('show');
                resetForm();
            }
        });

        // Display selected file name
        fileInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                fileName.textContent = '📎 ' + this.files[0].name;
                fileName.classList.add('show');
            }
        });

        // Handle form submission
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            successMessage.classList.add('show');
            
            // Hide success message and close modal after 2 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
                modal.classList.remove('show');
                resetForm();
            }, 2000);
        });

        function resetForm() {
            uploadForm.reset();
            fileName.classList.remove('show');
            fileName.textContent = '';
            successMessage.classList.remove('show');
        }
    