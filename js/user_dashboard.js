// document.addEventListener("DOMContentLoaded", function () {
//     fetchUserDetails();
//     fetchDocuments();

//     function fetchUserDetails() {
//         fetch('php/user_details.php')
//             .then(response => response.json())
//             .then(data => {
//                 document.getElementById('user-details').innerText = `Username: ${data.username}, Email: ${data.email}`;
//             });
//     }

//     function fetchDocuments() {
//         fetch('php/fetch_documents.php')
//             .then(response => response.json())
//             .then(data => {
//                 let documentsList = document.getElementById('documents-list');
//                 documentsList.innerHTML = '';
//                 data.forEach(doc => {
//                     let listItem = document.createElement('div');
//                     listItem.innerText = `Filename: ${doc.filename}, Uploaded on: ${doc.upload_time}, Status: ${doc.status}`;
//                     documentsList.appendChild(listItem);
//                 });
//             });
//     }
// });

document.addEventListener("DOMContentLoaded", () => {
    fetchUserDetails();
    fetchDocuments();

    function fetchUserDetails() {
        fetch("php/user_details.php")
            .then(res => res.json())
            .then(data => {
                document.getElementById("user-details").innerHTML = `
          <strong>Username:</strong> ${data.username}<br/>
          <strong>Email:</strong> ${data.email}
        `;
            });
    }

    function fetchDocuments() {
        fetch("php/fetch_documents.php")
            .then(res => res.json())
            .then(data => {
                const list = document.getElementById("documents-list");
                list.innerHTML = "";

                if (data.length === 0) {
                    list.innerHTML = "<p>No documents uploaded yet.</p>";
                    return;
                }

                data.forEach(doc => {
                    const badgeClass = doc.status.toLowerCase() === "received" ? "badge-received" : "badge-pending";

                    const item = document.createElement("div");
                    item.className = "doc-card";
                    item.innerHTML = `
            <p><strong>Filename:</strong> ${doc.filename}</p>
            <p><strong>Uploaded on:</strong> ${doc.upload_time}</p>
            <span class="badge ${badgeClass}">${doc.status}</span>
          `;
                    list.appendChild(item);
                });
            });
    }
});
