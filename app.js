// --- Global Tab Switching Function ---
// This function is placed in the global scope so it can be called by the onclick attribute in the HTML.
function openTab(evt, tabName) {
    // Hide all tab content
    const tabcontent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    // Deactivate all tab links
    const tablinks = document.getElementsByClassName("tab-link");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.className += " active";
}


// --- Main Application Logic ---
// We wrap all our code in a DOMContentLoaded listener to ensure the HTML is fully loaded before we try to find elements.
document.addEventListener('DOMContentLoaded', () => {

    // Data for the entire application
    const labsData = [
        { id: 1, name: 'Pune Precision Dental', location: 'Pune', image: 'https://keatingdentallab.com/wp-content/uploads/2024/05/GettyImages-1269471702.jpg', services: ['Zirconia Crowns', 'Implants', 'Veneers'], address: '123 Deccan Gymkhana, Pune', rating: 4.9, reviews: 152, deliveryTime: '3-5 days', about: 'State-of-the-art dental lab specializing in digital dentistry and aesthetic restorations.', isVerified: true, acceptsRush: true, specializations: ['Digital Smile Design', 'Implants'] },
        { id: 2, name: 'Koregaon Park Aesthetics', location: 'Pune', image: 'https://www.smilecentre.in/assets/images/facilities/dental-laboratory.jpg', services: ['E-max Crowns', 'Aligners', 'Dentures'], address: '456 KP Lane, Pune', rating: 4.8, reviews: 110, deliveryTime: '4-6 days', about: 'Dedicated to providing high-quality aesthetic dental solutions with a personal touch.', isVerified: false, acceptsRush: false, specializations: ['Cosmetic Veneers', 'Aligners'] },
        { id: 3, name: 'Hinjewadi Digital Labs', location: 'Pune', image: 'https://www.mndental.org/files/labtech-639x425.jpg', services: ['Implants', 'CAD/CAM', 'Bridges'], address: '789 IT Park, Hinjewadi, Pune', rating: 4.7, reviews: 98, deliveryTime: '2-4 days', about: 'Fast and reliable services for the modern dental practice, leveraging the latest technology.', isVerified: true, acceptsRush: true, specializations: ['CAD/CAM', 'Surgical Guides'] },
        { id: 5, name: 'Bandra Smile Studio', location: 'Mumbai', image: 'https://drsekharsdental.com/wp-content/uploads/2021/08/dental-lab.jpg', services: ['Veneers', 'Smile Design', 'E-max'], address: '55 Linking Road, Bandra, Mumbai', rating: 5.0, reviews: 250, deliveryTime: '4-6 days', about: 'Premier lab for cosmetic dentistry and full-mouth rehabilitations.', isVerified: true, acceptsRush: false, specializations: ['Smile Makeovers', 'Cosmetic Veneers'] },
    ];
    
    // ===================================================================
    // LOGIC FOR THE HOMEPAGE (index.html)
    // ===================================================================
    if (document.getElementById('labs-list')) {
        const labsList = document.getElementById('labs-list');
        const searchBar = document.getElementById('search-bar');
        const noResults = document.getElementById('no-results');
        const rushFilter = document.getElementById('rush-filter');
        const verifiedFilter = document.getElementById('verified-filter');
        const modal = document.getElementById('lab-modal');
        const closeButton = modal.querySelector('.close-button');
        const modalDetails = document.getElementById('modal-lab-details');

        const renderLabs = () => {
            const searchTerm = searchBar.value.toLowerCase();
            const showRushOnly = rushFilter.checked;
            const showVerifiedOnly = verifiedFilter.checked;

            const filteredLabs = labsData.filter(lab => {
                const matchesSearch = lab.name.toLowerCase().includes(searchTerm) || lab.location.toLowerCase().includes(searchTerm) || lab.specializations.some(s => s.toLowerCase().includes(searchTerm));
                const matchesRush = !showRushOnly || lab.acceptsRush;
                const matchesVerified = !showVerifiedOnly || lab.isVerified;
                return matchesSearch && matchesRush && matchesVerified;
            });

            labsList.innerHTML = ''; // Clear previous results
            if (filteredLabs.length === 0) {
                noResults.style.display = 'block';
            } else {
                noResults.style.display = 'none';
                filteredLabs.forEach(lab => {
                    const labCard = document.createElement('div');
                    labCard.className = 'lab-card';
                    labCard.dataset.labId = lab.id;
                    labCard.innerHTML = `
                        ${lab.isVerified ? '<div class="verified-badge">✔️ DentoRX Verified</div>' : ''}
                        ${lab.acceptsRush ? '<div class="rush-badge">⚡ Rush Available</div>' : ''}
                        <img src="${lab.image}" alt="${lab.name}" class="lab-card-image">
                        <div class="lab-card-content">
                             <div class="lab-specializations">${lab.specializations.map(s => `<span class="spec-tag">${s}</span>`).join('')}</div>
                            <h3>${lab.name}</h3>
                            <div class="lab-rating">
                                <span class="stars">★★★★★</span>
                                <span style="font-weight: 700;">${lab.rating.toFixed(1)}</span>
                                <span>(${lab.reviews} reviews)</span>
                            </div>
                        </div>
                    `;
                    labCard.addEventListener('click', () => openModal(lab.id));
                    labsList.appendChild(labCard);
                });
            }
        };
        
        const openModal = (labId) => {
            const lab = labsData.find(l => l.id === parseInt(labId));
            modalDetails.innerHTML = `
                <h2>${lab.name}</h2>
                <p><strong>Location:</strong> ${lab.address}</p>
                <h4>Specializations</h4>
                <div class="lab-specializations">${lab.specializations.map(s => `<span class="spec-tag">${s}</span>`).join('')}</div>
                <h4>Services Offered</h4>
                <ul>${lab.services.map(s => `<li>${s}</li>`).join('')}</ul>
                <h4>About Us</h4>
                <p>${lab.about}</p>
                <a href="request-service.html?labId=${lab.id}" class="btn-request-service-modal">Request Service</a>
            `;
            modal.style.display = 'block';
        };

        // Event Listeners for the homepage
        searchBar.addEventListener('input', renderLabs);
        rushFilter.addEventListener('change', renderLabs);
        verifiedFilter.addEventListener('change', renderLabs);
        closeButton.onclick = () => modal.style.display = "none";
        window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; };

        // Initial render of labs on page load
        renderLabs();
    }


    // ===================================================================
    // LOGIC FOR DENTIST DASHBOARD (dashboard-dentist.html)
    // ===================================================================
  if (document.getElementById('dentist-dashboard-container')) {
        const orders = [
            { id: 'DENT701', lab: 'Pune Precision Dental', patient: 'R. Sharma', product: 'Zirconia Crown', status_code: 2, payment_status: 'Paid', amount: 12000 },
            { id: 'DENT702', lab: 'Bandra Smile Studio', patient: 'A. Khan', product: 'E-max Veneers', status_code: 3, payment_status: 'Due', amount: 25000 },
            { id: 'DENT704', lab: 'Hinjewadi Digital Labs', patient: 'S. Jones', product: 'Implant Bridge', status_code: 1, payment_status: 'Paid', amount: 45000 },
            { id: 'DENT705', lab: 'Koregaon Park Aesthetics', patient: 'M. Chen', product: 'Cosmetic Veneers', status_code: 4, payment_status: 'Paid', amount: 22000 },
            { id: 'DENT706', lab: 'Pune Precision Dental', patient: 'P. Patel', product: 'Denture', status_code: 1, payment_status: 'Due', amount: 18000 },
        ];
        
        // Populate stat cards
        document.getElementById('stat-active-cases').textContent = orders.filter(o => o.status_code < 4).length;
        document.getElementById('stat-awaiting-action').textContent = orders.filter(o => o.status_code === 1).length;
        document.getElementById('stat-shipped').textContent = orders.filter(o => o.status_code === 3).length;
        const totalDue = orders.filter(o => o.payment_status === 'Due').reduce((sum, o) => sum + o.amount, 0);
        document.getElementById('stat-payment-due').textContent = `₹${totalDue.toLocaleString('en-IN')}`;

        const ordersListContainer = document.getElementById('orders-list');
        ordersListContainer.innerHTML = ''; 
        orders.forEach(order => {
            const orderCard = document.createElement('div');
            orderCard.className = 'order-card';
            
            // Determine border color based on payment status
            if (order.payment_status === 'Due') {
                orderCard.style.borderLeft = '5px solid var(--rush-color)';
            } else if (order.status_code === 4) {
                 orderCard.style.borderLeft = '5px solid var(--verified-color)';
            } else {
                 orderCard.style.borderLeft = '5px solid var(--secondary-color)';
            }


            const progress = (order.status_code - 1) / 3 * 100;
            const timelineHTML = `
                <div class="timeline">
                    <div class="timeline-progress" style="width: ${progress}%"></div>
                    <div class="timeline-step ${order.status_code >= 1 ? 'completed' : ''} ${order.status_code === 1 ? 'active' : ''}"><div class="dot"></div><p>Submitted</p></div>
                    <div class="timeline-step ${order.status_code >= 2 ? 'completed' : ''} ${order.status_code === 2 ? 'active' : ''}"><div class="dot"></div><p>In Production</p></div>
                    <div class="timeline-step ${order.status_code >= 3 ? 'completed' : ''} ${order.status_code === 3 ? 'active' : ''}"><div class="dot"></div><p>Shipped</p></div>
                    <div class="timeline-step ${order.status_code >= 4 ? 'completed' : ''}"><div class="dot"></div><p>Delivered</p></div>
                </div>`;
            
            const paymentInfoHTML = `
                <div class="order-payment-info" style="text-align: right;">
                    <p style="margin:0; font-size: 16px; font-weight: 700;">₹${order.amount.toLocaleString('en-IN')}</p>
                    <p style="margin:0; font-size: 14px; font-weight: 700;" class="${order.payment_status === 'Due' ? 'status-due' : 'status-paid'}">
                        ${order.payment_status}
                    </p>
                </div>
            `;


            orderCard.innerHTML = `
                <div class="order-info">
                    <h4>${order.product}</h4>
                    <p><strong>Lab:</strong> ${order.lab} &bull; <strong>Patient:</strong> ${order.patient}</p>
                    <p><strong>Order ID:</strong> #${order.id}</p>
                </div>
                <div class="order-timeline">${timelineHTML}</div>
                <div class="order-actions">
                     ${paymentInfoHTML}
                     <a href="case-details.html?orderId=${order.id}" class="btn-view-case" style="margin-top: 10px;">View Case</a>
                </div>
            `;
            ordersListContainer.appendChild(orderCard);
        });
    }


    // ===================================================================
    // LOGIC FOR LAB DASHBOARD (dashboard-lab.html)
    // ===================================================================
    if(document.getElementById('lab-dashboard-container')) {
        const labOrders = [
            { id: 'DENT701', dentist: 'Dr. Mehta', due: 'July 10, 2025', status: 'In Production', priority: 'Normal' },
            { id: 'DENT708', dentist: 'Dr. Singh', due: 'July 8, 2025', status: 'Order Submitted', priority: 'Rush' },
            { id: 'DENT704', dentist: 'Dr. Patel', due: 'July 11, 2025', status: 'Order Submitted', priority: 'Normal' },
            { id: 'DENT705', dentist: 'Dr. Gupta', due: 'July 14, 2025', status: 'In Production', priority: 'Normal' },
        ];

        document.getElementById('stat-new-orders').textContent = labOrders.filter(o => o.status === 'Order Submitted').length;
        document.getElementById('stat-in-production').textContent = labOrders.filter(o => o.status === 'In Production').length;
        
        const tableBody = document.querySelector('#lab-orders-table tbody');
        tableBody.innerHTML = '';
        labOrders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${order.id}</strong></td>
                <td>${order.dentist}</td>
                <td><span class="priority-tag ${order.priority.toLowerCase()}">${order.priority}</span></td>
                <td>${order.due}</td>
                <td>
                    <select class="status-select">
                        <option value="Order Submitted" ${order.status === 'Order Submitted' ? 'selected' : ''}>Order Submitted</option>
                        <option value="In Production" ${order.status === 'In Production' ? 'selected' : ''}>In Production</option>
                        <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                        <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                    </select>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Analytics Charts for Lab
        new Chart(document.getElementById('monthlyRevenueChart'), {
            type: 'line',
            data: { labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], datasets: [{ label: 'Revenue (in ₹)', data: [180000, 220000, 210000, 280000, 260000, 310000], borderColor: '#007BFF', fill: true, tension: 0.4 }] },
            options: { scales: { y: { beginAtZero: false } }, responsive: true }
        });

        new Chart(document.getElementById('clientMixChart'), {
            type: 'pie',
            data: { labels: ['Repeat Clients', 'New Clients'], datasets: [{ data: [82, 18], backgroundColor: ['#1B3A57', '#00A9E0'] }] },
            options: { responsive: true }
        });

        new Chart(document.getElementById('topProductsChart'), {
            type: 'bar',
            data: { labels: ['Zirconia Crowns', 'Implants', 'E-max Veneers', 'Dentures', 'Aligners'], datasets: [{ label: 'Units Ordered', data: [152, 98, 75, 54, 32], backgroundColor: ['#1B3A57', '#007BFF', '#00A9E0', '#6c757d', '#adb5bd'], borderRadius: 5 }] },
            options: { indexAxis: 'y', responsive: true, scales: { x: { beginAtZero: true } } }
        });
    }

    // ===================================================================
    // LOGIC FOR REQUEST SERVICE PAGE (request-service.html)
    // ===================================================================
    if(document.getElementById('rx-form')) {
        const urlParams = new URLSearchParams(window.location.search);
        const labId = parseInt(urlParams.get('labId'));
        const lab = labsData.find(l => l.id === labId);
        
        if (lab) {
            document.getElementById('lab-name-sidebar').textContent = lab.name;
            document.querySelector('#lab-location-sidebar span').textContent = lab.address;
            document.getElementById('lab-services-sidebar').innerHTML = lab.services.map(s => `<li>${s}</li>`).join('');
            document.getElementById('lab-name-title').textContent = `Request Service from ${lab.name}`;
        }

        const rxFileInput = document.getElementById('rx-file');
        const fileUploadText = document.getElementById('file-upload-text');

        rxFileInput.addEventListener('change', () => {
            if (rxFileInput.files.length > 0) {
                fileUploadText.textContent = rxFileInput.files.length === 1 ? rxFileInput.files[0].name : `${rxFileInput.files.length} files selected`;
            } else {
                fileUploadText.textContent = 'Choose Files...';
            }
        });

        document.getElementById('rx-form').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Rx Submitted Successfully!\n\nYou would now be redirected to your dashboard to track the order.');
            window.location.href = 'dashboard-dentist.html';
        });
    }

    // ===================================================================
    // LOGIC FOR CASE DETAILS PAGE (case-details.html)
    // ===================================================================
    if(document.getElementById('chat-window')) {
        const chatInput = document.getElementById('chat-input-text');
        const sendButton = document.getElementById('send-chat-btn');
        const chatWindow = document.getElementById('chat-window');

        const sendMessage = () => {
            const messageText = chatInput.value.trim();
            if(messageText === '') return;
            const messageEl = document.createElement('div');
            messageEl.classList.add('chat-message', 'dentist');
            messageEl.textContent = messageText;
            chatWindow.appendChild(messageEl);
            chatInput.value = '';
            chatWindow.scrollTop = chatWindow.scrollHeight;
        };
        sendButton.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
    }

});