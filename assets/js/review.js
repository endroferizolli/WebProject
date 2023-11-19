$(document).ready(function () {
    // Validation and submission function for the Review form
    function validateAndSubmitReview(event) {
        event.preventDefault();

        var isValidated = true;

        // Reset all errors
        $("#fullnamespn").html("");
        $("#ratingspn").html("");
        $("#commentspn").html("");

        const fullName = $("#fullname").val();
        if (fullName.length < 5) {
            $("#fullnamespn").html("Full name must be at least 5 characters");
            isValidated = false;
        }

        const rating = $("#rating").val();
        if (rating === null || rating === "") {
            $("#ratingspn").html("Please select a valid rating");
            isValidated = false;
        }

        const comment = $("#comment").val();
        if (comment.length === 0) {
            $("#commentspn").html("Please enter your comment");
            isValidated = false;
        }

        // Validate input values
        if (!isValidated) {
            return;
        }

        // Call method to handle the submission
        handleReviewSubmission(fullName, rating, comment);

        // Show Thank You modal or perform other actions based on your needs
        showThankYouModal();
    }

    // Handle the review submission logic
    function handleReviewSubmission(_fullName, _rating, _comment) {
        // Create an object with review details
        var newReview = {
            fullName: _fullName,
            rating: _rating,
            comment: _comment
        }

        console.log('newReview Object = ', newReview);
        // You can perform additional actions here, such as sending data to a server, etc.
    }

    function showThankYouModal() {
        // Display the modal
        $('#thankYouModal').css('display', 'flex');

        // Close modal when clicking the close button
        $('#closeModal').on('click', function () {
            $('#thankYouModal').css('display', 'none');
        });
    }

    // Attach the click event to the submit button
    $("#submitReviewBtn").click(validateAndSubmitReview);
});