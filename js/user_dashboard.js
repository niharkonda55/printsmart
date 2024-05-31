document.addEventListener("DOMContentLoaded", function () {
    fetchUserDetails();
    fetchDocuments();

    function fetchUserDetails() {
        fetch('php/user_details.php')
            .then(response => response.json())
            .then(data => {
                document.getElementById('user-details').innerText = `Username: ${data.username}, Email: ${data.email}`;
            });
    }

    function fetchDocuments() {
        fetch('php/fetch_documents.php')
            .then(response => response.json())
            .then(data => {
                let documentsList = document.getElementById('documents-list');
                documentsList.innerHTML = '';
                data.forEach(doc => {
                    let listItem = document.createElement('div');
                    listItem.innerText = `Filename: ${doc.filename}, Uploaded on: ${doc.upload_time}, Status: ${doc.status}`;
                    documentsList.appendChild(listItem);
                });
            });
    }
});
