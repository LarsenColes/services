document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const closeModal = document.querySelector('.close-modal');
    
    // Function to show modal
    function showModal(title, message) {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modal.style.display = 'block';
    }
    
    // Function to hide modal
    function hideModal() {
        modal.style.display = 'none';
    }
    
    // Close modal when clicking the X
    closeModal.addEventListener('click', hideModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            hideModal();
        }
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Send form data to Formspree
        fetch('https://formspree.io/f/xanekgqo', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showModal('Success!', 'Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            showModal('Error', 'There was a problem sending your message. Please try again later.');
            console.error('Error:', error);
        });
    });
}); 