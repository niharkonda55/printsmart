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

//updated Code for Dashboard
document.addEventListener("DOMContentLoaded", function () {
    fetchDocuments();

    function fetchDocuments() {
        fetch('php/admin_dashboard.php')
            .then(response => response.json())
            .then(data => {
                let tbody = document.getElementById('documents-tbody');
                tbody.innerHTML = ''; // Clear existing content

                data.forEach(doc => {
                    let row = document.createElement('tr');

                    // Highlight row based on status
                    row.classList.add(doc.status === 'Received' ? 'received' : 'pending');

                    row.innerHTML = `
                        <td>${doc.username}</td>
                        <td>${doc.filename}</td>
                        <td>${doc.upload_time}</td>
                        <td>
                            <select onchange="updateStatus(${doc.id}, this.value)">
                                <option value="Pending" ${doc.status === 'Pending' ? 'selected' : ''}>Pending</option>
                                <option value="Received" ${doc.status === 'Received' ? 'selected' : ''}>Received</option>
                            </select>
                        </td>
                        <td>
                            <a href="http://localhost/printsmart/uploads/${doc.file_path}" download="${doc.filename}">Download</a>
                        </td>
                    `;

                    tbody.appendChild(row);
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

