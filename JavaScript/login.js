    function submitForm() {
        // Get user input
        const name = document.querySelector('input[placeholder="Enter Name"]').value;
        const enrollmentNumber = document.querySelector('input[placeholder="Enrollment Number"]').value;
        const semester = document.querySelector('input[placeholder="Semester"]').value;
        const college = document.querySelector('input[placeholder="College"]').value;

        // Check if any field is empty
        if (!name || !enrollmentNumber || !semester || !college) {
           
            return false;  // Prevent form submission
        }

        // Save the data to local storage
        localStorage.setItem("name", name);
        localStorage.setItem("enrollmentNumber", enrollmentNumber);
        localStorage.setItem("semester", semester);
        localStorage.setItem("college", college);

        // Redirect to rules.html
        window.location.href = "/HTML/rules.html";

        return false;  // Ensure the form does not submit in the traditional way
    }
