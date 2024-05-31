/*document.addEventListener("DOMContentLoaded", function () {
    fetchDocuments();

    function fetchDocuments() {
        fetch('php/admin_dashboard.php')
            .then(response => response.json())
            .then(data => {
                let documentsList = document.getElementById('all-documents-list');
                documentsList.innerHTML = '';
                data.forEach(doc => {
                    let listItem = document.createElement('div');
                    listItem.innerHTML = `Username: ${doc.username}, Filename: ${doc.filename}, Uploaded on: ${doc.upload_time}, Status: ${doc.status}
                    <select onchange="updateStatus(${doc.id}, this.value)">
                        <option value="Pending" ${doc.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Received" ${doc.status === 'Received' ? 'selected' : ''}>Received</option>
                    </select>`;
                    documentsList.appendChild(listItem);
                });
            });
    }
});

function updateStatus(documentId, status) {
    fetch('php/update_status.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `document_id=${documentId}&status=${status}`
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            fetchDocuments();
        });
}*/
document.addEventListener("DOMContentLoaded", function () {
    fetchDocuments();

    function fetchDocuments() {
        fetch('php/admin_dashboard.php')
            .then(response => response.json())
            .then(data => {
                let documentsList = document.getElementById('all-documents-list');
                documentsList.innerHTML = ''; // Clear existing content

                data.forEach(doc => {
                    let listItem = document.createElement('div');

                    // Highlight document based on status
                    listItem.classList.add(doc.status === 'Received' ? 'received' : 'pending');

                    listItem.innerHTML = `
              Username: ${doc.username}, 
              Filename: ${doc.filename}, 
              Uploaded on: ${doc.upload_time}, 
              Status: ${doc.status}`;

                    // Download link for all documents
                    let downloadLink = document.createElement('a');
                    downloadLink.href = `http://localhost/printsmart/uploads/${doc.file_path}`; // Adjusted path
                    downloadLink.download = doc.filename;
                    downloadLink.textContent = 'Download';
                    listItem.appendChild(downloadLink);

                    // Existing Status update select (unchanged)
                    listItem.innerHTML += `
              <select onchange="updateStatus(${doc.id}, this.value)">
                <option value="Pending" ${doc.status === 'Pending' ? 'selected' : ''}>Pending</option>
                <option value="Received" ${doc.status === 'Received' ? 'selected' : ''}>Received</option>
              </select>`;

                    documentsList.appendChild(listItem);
                });
            });
    }
});

// Existing function to update document status (unchanged)
function updateStatus(documentId, status) {
    fetch('php/update_status.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `document_id=${documentId}&status=${status}`
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            fetchDocuments(); // Refetch documents to update display
        });
}

