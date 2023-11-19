$(document).ready(function () {
    // Set interval to update the current year every second
    const modalCssLink = $('<link rel="stylesheet" type="text/css" href="modal.css">');
    $('head').append(modalCssLink);

    setInterval(() => {
        $("#currentYear").html(new Date().getFullYear());
    }, 1000);

    // List of valid book titles
    const validBookTitles = ["Twilight", "New Moon", "Eclipse", "Breaking Dawn", "Midnight Sun","Life and death"];

    // Regular expression for a general email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation and submission function for the Order page
    function validateAndSubmit(event) {
        event.preventDefault();

        var isValidated = true;

        // Reset all errors
        $("#fullnamespn").html("");
        $("#emailspn").html("");
        $("#bookspn").html("");
        $("#bookspn").html("Invalid book title").css("color", "red !important");
        $("#phonespn").html("");
        $("#descriptionSpn").html("");

        const fullName = $("#fullname").val();
        if (fullName.length < 5) {
            $("#fullnamespn").html("Full name must be at least 5 characters");
            isValidated = false;
        }

        const email = $("#email").val();
        if (!emailRegex.test(email)) {
            $("#emailspn").html("Invalid email format");
            isValidated = false;
        }

        const enteredPhoneNo = $("#phone").val();
        if (!validateEnteredPhoneNo(enteredPhoneNo)) {
            $("#phonespn").html("Invalid phone no");
            isValidated = false;
        }

        const enteredBookTitle = $("#book").val();
if (!validateBookTitle(enteredBookTitle)) {
    $("#bookspn").html("Invalid book title");
    isValidated = false;
} else {
    // If the book title is valid, clear the error message
    $("#bookspn").html("");
}


        const description = $("#description").val();
        if (description.length < 10) {
            $("#descriptionSpn").html("Description must be at least 10 characters");
            isValidated = false;
        }

        // Validate input values
        if (!isValidated) {
            return;
        }

        // Call method to handle the submission
        handleSubmit(fullName, email, enteredBookTitle, enteredPhoneNo, description);

        // Show Thank You modal outside of the if (isValidated) block
        showThankYouModal();

        // Populate the table with the stored data
        populateTable();
    }

    // Validate entered phone number function
    function validateEnteredPhoneNo(phoneNo) {
        // Validate phone number - starts with +355 and has a total of 12 characters
        var phoneRegex = /^\+355\d{9}$/;
        return phoneRegex.test(phoneNo);
    }

    // Validate book title function
    function validateBookTitle(inputTitle) {
        return validBookTitles.includes(inputTitle);
    }

    function showThankYouModal() {
        // Display the modal
        $('#thankYouModal').css('display', 'flex');

        // Close modal when clicking the close button
        $('#closeModal').on('click', function () {
            $('#thankYouModal').css('display', 'none');
        });
    }

    // Handle the submission logic (you can customize this based on your needs)
    function handleSubmit(_fullName, _email, _bookTitle, _phoneno, _description) {
        // Create Object
        var newOrder = {
            fullName: _fullName,
            email: _email,
            bookTitle: _bookTitle,
            phone: _phoneno,
            description: _description
        }

        // Save data to local storage
        saveDataToLocal(newOrder);

        // You can perform additional actions here, such as sending data to a server, etc.
    }

    // Attach the click event to the submit button
    $("#submitBtn").click(validateAndSubmit);

    // Function to save data to local storage
    function saveDataToLocal(data) {
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(data);
        localStorage.setItem('orders', JSON.stringify(orders));
    }

  // Function to populate the table with stored data
function populateTable() {
    const tableBody = $(".sma tbody");
    // tableBody.html(""); // Clear existing rows

    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    orders.forEach(order => {
        const row = tableBody[0].insertRow();
        Object.values(order).forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value;
        });

        // Add Remove button to each row
        const removeCell = row.insertCell();
        const removeButton = document.createElement('button');
        removeButton.className = 'removeBtn';
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', function () {
            // Find the index of the clicked row
            const rowIndex = this.parentNode.parentNode.rowIndex;
            
            // Remove the corresponding data from local storage
            removeDataFromLocalStorage(rowIndex - 1); // Adjusting for the header row
            
            // Remove the clicked row from the table
            tableBody[0].deleteRow(rowIndex);

        });
        removeCell.appendChild(removeButton);
    });
}

// Function to remove data from local storage by index
function removeDataFromLocalStorage(index) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.splice(index, 1);
    localStorage.setItem('orders', JSON.stringify(orders));
}
    // Populate the table when the page loads
    populateTable();
});
$(document).ready(function () {
    // Function to handle remove button click
    $(".removeBtn").on('click', function () {
        // Find the closest row and remove it
        $(this).closest('tr').remove();

        // Call a function to update the local storage or perform any other necessary actions
        updateLocalStorage();
    });

    // Function to update local storage after removing a row
    function updateLocalStorage() {
        // Retrieve the remaining data from the table
        const ordersData = [];
        $('.sma tbody tr').each(function () {
            const row = $(this).find('td');
            const order = {
                fullName: row.eq(0).text(),
                email: row.eq(1).text(),
                phoneNo: row.eq(2).text(),
                bookTitle: row.eq(3).text(),
                description: row.eq(4).text()
            };
            ordersData.push(order);
        });

        // Save the updated data to local storage
        localStorage.setItem('orders', JSON.stringify(ordersData));
    }
});