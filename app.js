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

    // --- Hamburger Menu Logic for all pages ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Data for the entire application
    const labsData = [
  {"id":1,"name":"Baluke Dental Studios","location":"Toronto, GTA","image":"https://baluke1.wordpress.com/wp-content/uploads/2024/05/baluke-dental-studios.jpg?w=1024","services":["Crowns & Bridges","Implants","Cosmetic Dentistry","Digital Workflow"],"address":"123 Toronto Main St, Toronto, ON","rating":4.8,"reviews":180,"deliveryTime":"5-7 days","about":"Full-service lab with a strong focus on advanced digital workflows and cosmetic and restorative dentistry.","isVerified":true,"acceptsRush":true,"specializations":["Digital Dentistry","Cosmetic Restorations"]},
  {"id":2,"name":"Klausz Dental Laboratories","location":"Toronto, GTA","image":"https://klauszdentallab.com/wp-content/uploads/2019/04/klaus-dental-lab-cosmetic-consultation.jpg","services":["Occlusal Appliances","Implant Restorations","Cosmetic Cases"],"address":"234 Bay St, Toronto, ON","rating":4.7,"reviews":165,"deliveryTime":"5-8 days","about":"A specialized laboratory known for its expertise in complex occlusal and implant-based restorations.","isVerified":true,"acceptsRush":false,"specializations":["Occlusal Appliances","Implantology"]},
  {"id":3,"name":"ADL Dental Laboratories","location":"Toronto, GTA","image":"https://adllabs.com/wp-content/uploads/2018/04/adl101.jpg","services":["Digital Dentistry","Implants","Crowns & Bridges"],"address":"345 Yonge St, Toronto, ON","rating":4.6,"reviews":140,"deliveryTime":"4-6 days","about":"Modern lab offering a full range of digital dentistry solutions, including implants and aesthetic crowns.","isVerified":true,"acceptsRush":true,"specializations":["Digital Workflow","Implant Restorations"]},
  {"id":4,"name":"Shaw Lab Group (North York)","location":"North York, GTA","image":"https://sprottshaw.com/wp-content/uploads/2020/01/PXL_20210430_161439500-1024x768.jpg","services":["Digital Dentures","Implant Solutions","Full Service"],"address":"456 Sheppard Ave, North York, ON","rating":4.8,"reviews":210,"deliveryTime":"4-7 days","about":"A branch of a major lab group, providing comprehensive services with a focus on digital dentures.","isVerified":true,"acceptsRush":true,"specializations":["Digital Dentures","Implantology"]},
  {"id":5,"name":"Sentana Dental Laboratory","location":"Toronto, GTA","image":"https://roydentlabs.com/wp-content/uploads/2024/09/cc3.jpg","services":["Fixed Prosthodontics","Removable Prosthodontics","Implants"],"address":"567 Queen St W, Toronto, ON","rating":4.5,"reviews":95,"deliveryTime":"5-7 days","about":"Dedicated lab for fixed and removable prosthodontics, serving the Toronto dental community.","isVerified":false,"acceptsRush":false,"specializations":["Prosthodontics","Implants"]},
  {"id":6,"name":"Perfect Smile Dental Laboratory","location":"Port Colborne, Niagara Region","image":"https://i5.walmartimages.com/asr/54080cc7-fee6-4545-bbe6-c7e210420402.c499f97cbf1cab83017f2a344214b6c2.jpeg","services":["General Lab Services","Dentures","Repairs"],"address":"456 Vineyard Rd, Port Colborne, ON","rating":4.6,"reviews":75,"deliveryTime":"4-6 days","about":"Providing reliable general dental laboratory services to the Niagara community.","isVerified":false,"acceptsRush":true,"specializations":["Denture Fabrication","Removable Prosthetics"]},
  {"id":7,"name":"Niagara Denture Clinic & Lab","location":"Niagara Falls, Niagara Region","image":"https://static.wixstatic.com/media/ba2cd3_76c2f623960d4457a0efec68a778e177~mv2.jpg/v1/fill/w_640,h_400,al_t,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/ba2cd3_76c2f623960d4457a0efec68a778e177~mv2.jpg","services":["Complete Dentures","Partial Dentures","Same-day Repairs"],"address":"789 Clifton Hill, Niagara Falls, ON","rating":4.7,"reviews":120,"deliveryTime":"1-3 days","about":"Specializing in denture services with an on-site lab for quick turnarounds and same-day repairs.","isVerified":true,"acceptsRush":true,"specializations":["On-site Denture Fabrication","Same-day Repairs"]},
  {"id":8,"name":"Stomadent Dental Laboratory","location":"London, Southwestern Ontario","image":"https://stomadent.ca/wp-content/uploads/2023/02/two_dentures_on_both_hands-scaled.jpg","services":["CAD/CAM","Implants","Crowns & Bridges"],"address":"789 Forest City Ave, London, ON","rating":4.7,"reviews":112,"deliveryTime":"3-5 days","about":"Specializing in digital dentistry, crowns, bridges, and implant prosthetics for Southwestern Ontario.","isVerified":true,"acceptsRush":true,"specializations":["Digital Dentistry","Implant Prosthetics"]},
  {"id":9,"name":"Halton Dental Lab","location":"Burlington, Southwestern Ontario","image":"https://haltondentureclinic.com/wp-content/uploads/2022/04/shutterstock_1666332586-630x408.jpg","services":["Digital Services","Crowns","Bridges","Implants"],"address":"123 Plains Rd, Burlington, ON","rating":4.6,"reviews":90,"deliveryTime":"4-6 days","about":"Full-service digital laboratory providing a comprehensive range of products to the Halton and surrounding areas.","isVerified":true,"acceptsRush":true,"specializations":["CAD/CAM Solutions","Full Service"]},
  {"id":10,"name":"Silva Dental Lab","location":"Kitchener, Southwestern Ontario","image":"https://images.squarespace-cdn.com/content/v1/652feddf3553b80ca1fa8330/1708118536413-YW5XW4EC1JU8S9BBUNYF/10-DSC_5904.jpg","services":["Aesthetic Dentistry","Implant Restorations","Crowns"],"address":"456 King St E, Kitchener, ON","rating":4.8,"reviews":155,"deliveryTime":"5-7 days","about":"A full-service lab with a dedicated focus on high-quality aesthetic dentistry and complex implant cases.","isVerified":true,"acceptsRush":false,"specializations":["Cosmetic Dentistry","Implant Restorations"]},
  {"id":11,"name":"Ivory Dental Laboratory","location":"Ottawa, Eastern Ontario","image":"https://www.ivorydental.lk/assets/img/about.jpg","services":["Digital Technology","Crowns","Bridges","Implants"],"address":"101 Parliament Hill View, Ottawa, ON","rating":4.8,"reviews":130,"deliveryTime":"5-7 days","about":"Full-service lab located in Ottawa with a strong emphasis on leveraging digital technology for precision results.","isVerified":true,"acceptsRush":false,"specializations":["CAD/CAM Solutions","Aesthetic Cases"]},
  {"id":12,"name":"Watersedge Dental Lab","location":"Ottawa, Eastern Ontario","image":"https://www.watersedgedentallab.com/wp-content/uploads/2023/10/watersedge-ottawa.jpg","services":["Orthodontics","Crowns","Bridges","General Services"],"address":"234 Rideau Canal Way, Ottawa, ON","rating":4.7,"reviews":115,"deliveryTime":"4-7 days","about":"Family-owned lab in Ottawa offering a comprehensive range of services, including specialized orthodontic appliances.","isVerified":true,"acceptsRush":true,"specializations":["Orthodontic Appliances","Family Owned"]},
  {"id":13,"name":"M-Tech Dental Lab","location":"Kingston, Eastern Ontario","image":"https://www.lancashire.ac.uk/image-library/content/course-galleries/clinical-dental-lab.xfc4e14c2.jpg?f=webp&q=75&w=740","services":["Crown & Bridge","Implant-supported Restorations"],"address":"567 Princess St, Kingston, ON","rating":4.6,"reviews":85,"deliveryTime":"5-8 days","about":"Kingston-based lab specializing in high-quality crown and bridge work and implant-supported restorations.","isVerified":false,"acceptsRush":false,"specializations":["Crown & Bridge","Implant Prosthetics"]},
  {"id":14,"name":"Balmoral Dental Designs","location":"Thunder Bay, Northern Ontario","image":"https://media.licdn.com/dms/image/v2/D5610AQE6lMGU6a3Amw/image-shrink_800/image-shrink_800/0/1731441660531?e=2147483647&v=beta&t=HWjYmXgEtSfiPT8U9ZQnYM2qRbB1fNEcFsxf4XECtYk","services":["Digital Lab","Aesthetics","Restorative Dentistry"],"address":"210 Great Lakes Way, Thunder Bay, ON","rating":4.7,"reviews":88,"deliveryTime":"6-8 days","about":"Full-service digital dental laboratory serving Northern Ontario with a focus on esthetic and restorative dentistry.","isVerified":true,"acceptsRush":false,"specializations":["Digital Restorations","Logistics for Remote Practices"]},
  {"id":15,"name":"Imperius Dental Laboratory","location":"Thunder Bay, Northern Ontario","image":"https://images.squarespace-cdn.com/content/v1/59f894ab4c0dbf4f0efec409/1eb47576-f3d5-4718-a2a6-bc031f7b9793/PDS_Partial_Dentury_Acrylic_Web_fonds.png","services":["Orthodontic Appliances","Dental Prosthetics"],"address":"321 North Shore Dr, Thunder Bay, ON","rating":4.5,"reviews":60,"deliveryTime":"5-7 days","about":"Specializing in the fabrication of orthodontic appliances and other essential dental prosthetics.","isVerified":false,"acceptsRush":true,"specializations":["Orthodontics","Prosthetics"]},
  {"id":16,"name":"Northern Dental Laboratory","location":"Sault Ste. Marie, Northern Ontario","image":"https://www.designerdental.co.uk/wp-content/uploads/2015/07/Northern-Lab-2.jpg","services":["Crowns","Bridges","Dentures"],"address":"654 Great Northern Rd, Sault Ste. Marie, ON","rating":4.4,"reviews":55,"deliveryTime":"7-10 days","about":"Providing essential dental lab services including crowns, bridges, and dentures to Sault Ste. Marie and beyond.","isVerified":false,"acceptsRush":false,"specializations":["General Prosthodontics","Remote Servicing"]},
  {"id":17,"name":"Pune Precision Dental","location":"Pune","image":"https://keatingdentallab.com/wp-content/uploads/2024/05/GettyImages-1269471702.jpg","services":["Zirconia Crowns","Implants","Veneers"],"address":"123 Deccan Gymkhana, Pune","rating":4.9,"reviews":152,"deliveryTime":"3-5 days","about":"State-of-the-art dental lab specializing in digital dentistry and aesthetic restorations.","isVerified":true,"acceptsRush":true,"specializations":["Digital Smile Design","Implants"]},
  {"id":18,"name":"Koregaon Park Aesthetics","location":"Pune","image":"https://www.smilecentre.in/assets/images/facilities/dental-laboratory.jpg","services":["E-max Crowns","Aligners","Dentures"],"address":"456 KP Lane, Pune","rating":4.8,"reviews":110,"deliveryTime":"4-6 days","about":"Dedicated to providing high-quality aesthetic dental solutions with a personal touch.","isVerified":false,"acceptsRush":false,"specializations":["Cosmetic Veneers","Aligners"]},
  {"id":19,"name":"Hinjewadi Digital Labs","location":"Pune","image":"https://www.mndental.org/files/labtech-639x425.jpg","services":["Implants","CAD/CAM","Bridges"],"address":"789 IT Park, Hinjewadi, Pune","rating":4.7,"reviews":98,"deliveryTime":"2-4 days","about":"Fast and reliable services for the modern dental practice, leveraging the latest technology.","isVerified":true,"acceptsRush":true,"specializations":["CAD/CAM","Surgical Guides"]},
  {"id":20,"name":"Smile Studio","location":"Mumbai","image":"https://boutiquedentalis.co.uk/wp-content/uploads/2025/02/67499fc24c3feeabd513d590_dental-implant-7.png","services":["Veneers","Smile Design","E-max"],"address":"55 Linking Road, Bandra, Mumbai","rating":5.0,"reviews":250,"deliveryTime":"4-6 days","about":"Premier lab for cosmetic dentistry and full-mouth rehabilitations.","isVerified":true,"acceptsRush":false,"specializations":["Smile Makeovers","Cosmetic Veneers"]},
  {"id":21,"name":"Illusion Dental Craft","location":"Mumbai","image":"https://content.jdmagicbox.com/v2/comp/mumbai/n9/022pxx22.xx22.090623153008.h1n9/catalogue/illusion-dental-laboratory-pvt-ltd-head-office-andheri-west-mumbai-dental-laboratory-product-manufacturers-67h634dgkn.jpg","services":["PFM Crowns","Dentures","Orthodontic Appliances"],"address":"88 SV Road, Andheri, Mumbai","rating":4.6,"reviews":85,"deliveryTime":"3-5 days","about":"A legacy of craftsmanship meeting modern dental needs with reliable and consistent quality.","isVerified":true,"acceptsRush":true,"specializations":["Orthodontics","Prosthodontics"]},
  {"id":22,"name":"Keating Dental Arts","location":"Irvine, CA, USA","image":"https://media.licdn.com/dms/image/v2/C4D1BAQFh-sl1r6z-Ug/company-background_10000/company-background_10000/0/1628098385189/keatingdentallab_cover?e=2147483647&v=beta&t=F4mgCTZFDtyXUZq001qCRM2h-BhI_6fj8qLx3Kjir98","services":["KDZ Bruxer","Implants","Cosmetic Veneers","Digital Dentistry"],"address":"168 Technology Dr, Irvine, CA 92618","rating":4.9,"reviews":350,"deliveryTime":"5-7 days","about":"A highly personalized, full-service dental lab known for consistent, quality work and cutting-edge aesthetics.","isVerified":true,"acceptsRush":true,"specializations":["Aesthetic Restorations","Digital Model-less Workflow"]},
  {"id":23,"name":"Modern Dental Laboratory USA","location":"Troy, MI, USA","image":"https://www.buildyoursmile.com/images/services-images/inhouse-dental-laboratory.jpg","services":["Crown & Bridge","Removables","Implants","Sleep Therapy"],"address":"101 W Big Beaver Rd, Troy, MI 48084","rating":4.8,"reviews":280,"deliveryTime":"6-8 days","about":"Backed by over 35 years of experience, providing exceptionally crafted dental restorations with a focus on continuing education.","isVerified":true,"acceptsRush":false,"specializations":["Full-Service Restorations","Continuing Education"]},
  {"id":24,"name":"PRO-Craft Dental Laboratory","location":"Murrieta, CA, USA","image":"https://blog.pro-craft.com/hubfs/Youtube%20Thumbnail%20Another%20Lab%20for%20Less.png","services":["All-On-4 Solutions","Implants","Digital Scanners","Occlusal Appliances"],"address":"26855 Jefferson Ave, Murrieta, CA 92562","rating":4.9,"reviews":220,"deliveryTime":"5-7 days","about":"A leader in dental innovation, delivering unparalleled solutions with a 10-step quality assurance check on every case.","isVerified":true,"acceptsRush":true,"specializations":["All-On-4 Solutions","CAD/CAM Technology"]},
  {"id":25,"name":"Leixir Dental Laboratory Group","location":"New York, NY, USA","image":"https://www.leixir.com/wp-content/uploads/2024/03/clinik-hall.jpg","services":["Crowns & Bridges","Full-arch restorations","Implants","Intraoral Scanners"],"address":"1500 Broadway, New York, NY 10036","rating":4.7,"reviews":195,"deliveryTime":"6-9 days","about":"A premier network of labs offering a one-stop shop for restorations and a seamless transition to digital dentistry.","isVerified":true,"acceptsRush":false,"specializations":["Dental Lab Network","Digital Integration & Training"]},
  {"id":26,"name":"Uptown Dental Lab","location":"Houston, TX, USA","image":"https://uptowncosmeticimplantdentistry.com/wp-content/uploads/2022/02/dental-lab-dr-velasco-houston-1.jpg","services":["Zirconia Crowns","All-On-4 Hybrid Prosthesis","Veneers","Digital Dentistry"],"address":"6201 Bonhomme Rd, Houston, TX 77036","rating":4.8,"reviews":150,"deliveryTime":"4-6 days","about":"Full-service lab with expertise in full mouth ceramics and implant restorations, fabricating all products in-house.","isVerified":true,"acceptsRush":true,"specializations":["All-On-4 Conversions","In-House Milling"]},
  {"id":27,"name":"Authentic Dental Laboratory","location":"San Antonio, TX, USA","image":"https://authenticlab.com/wp-content/uploads/2020/06/happy-dentist-patient-checking-whitening-results-picture-id1055182040-1536x701.jpg","services":["Zirconia Restorations","Implants & Abutments","CE Seminars","Case Planning"],"address":"10911 W I-10, San Antonio, TX 78230","rating":4.7,"reviews":175,"deliveryTime":"6-8 days","about":"Family-owned lab building relationships through education, customer service, and a consistent, high-quality product.","isVerified":true,"acceptsRush":false,"specializations":["Continuing Education", "Implantology"]},
  {"id":28,"name":"Imperial Dental Lab","location":"Fort Myers, FL, USA","image":"https://cdn.prod.website-files.com/61f1bda8144ece4f3a593320/61f81c993ca605a4b6891707_help-team.jpg","services":["Full Contour Zirconia","CAD/CAM","3D Printing","Implants"],"address":"12655 New Brittany Blvd, Fort Myers, FL 33907","rating":4.6,"reviews":130,"deliveryTime":"5-7 days","about":"A 100% digital dental lab empowering dentists with fast, reliable laboratory services and state-of-the-art technology.","isVerified":true,"acceptsRush":true,"specializations":["100% Digital Workflow","CAD/CAM Milling"]}
];
    
    // ===================================================================
    // LOGIC FOR THE HOMEPAGE (index.html)
    // ===================================================================
    if (document.getElementById('labs-list') && !document.getElementById('products-view')) {
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
            { id: 'DENT701', lab: 'Pune Precision Dental', patient: 'R. Sharma', product: 'Zirconia Crown', status_code: 2, payment_status: 'Paid', amount: 120 },
            { id: 'DENT702', lab: 'Bandra Smile Studio', patient: 'A. Khan', product: 'E-max Veneers', status_code: 3, payment_status: 'Due', amount: 250 },
            { id: 'DENT704', lab: 'Hinjewadi Digital Labs', patient: 'S. Jones', product: 'Implant Bridge', status_code: 1, payment_status: 'Paid', amount: 450 },
            { id: 'DENT705', lab: 'Koregaon Park Aesthetics', patient: 'M. Chen', product: 'Cosmetic Veneers', status_code: 4, payment_status: 'Paid', amount: 220 },
            { id: 'DENT706', lab: 'Pune Precision Dental', patient: 'P. Patel', product: 'Denture', status_code: 1, payment_status: 'Due', amount: 180 },
        ];
        
        // Populate stat cards
        document.getElementById('stat-active-cases').textContent = orders.filter(o => o.status_code < 4).length;
        document.getElementById('stat-awaiting-action').textContent = orders.filter(o => o.status_code === 1).length;
        document.getElementById('stat-shipped').textContent = orders.filter(o => o.status_code === 3).length;
        const totalDue = orders.filter(o => o.payment_status === 'Due').reduce((sum, o) => sum + o.amount, 0);
        document.getElementById('stat-payment-due').textContent = `$${totalDue.toLocaleString('en-IN')}`;

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
                    <p style="margin:0; font-size: 16px; font-weight: 700;">$${order.amount.toLocaleString('en-IN')}</p>
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
            data: { labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], datasets: [{ label: 'Revenue (in $)', data: [18000, 22000, 21090, 28000, 26000, 31000], borderColor: '#007BFF', fill: true, tension: 0.4 }] },
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
    
    // ===================================================================
    // LOGIC FOR PRODUCTS PAGE (products.html)
    // ===================================================================
    if(document.getElementById('products-view')) {
        const productsView = document.getElementById('products-view');
        const labsByProductView = document.getElementById('labs-by-product-view');
        const productCards = document.querySelectorAll('.product-card');
        const labsByProductList = document.getElementById('labs-by-product-list');
        const backToProductsBtn = document.getElementById('back-to-products');
        const labsByProductTitle = document.getElementById('labs-by-product-title');
        const modal = document.getElementById('lab-modal');
        const closeButton = modal.querySelector('.close-button');
        const modalDetails = document.getElementById('modal-lab-details');

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

        closeButton.onclick = () => modal.style.display = "none";
        window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; };

        productCards.forEach(card => {
            card.addEventListener('click', () => {
                const productName = card.dataset.product;
                const filteredLabs = labsData.filter(lab => 
                    lab.services.some(service => service.toLowerCase().includes(productName.toLowerCase().slice(0, -1))) // Removes 's' from product name for better matching
                );

                labsByProductTitle.textContent = `Labs Offering ${productName}`;
                labsByProductList.innerHTML = ''; // Clear previous results

                if (filteredLabs.length > 0) {
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
                        labsByProductList.appendChild(labCard);
                    });
                } else {
                    labsByProductList.innerHTML = '<p>No labs found offering this product.</p>';
                }

                productsView.style.display = 'none';
                labsByProductView.style.display = 'block';
            });
        });

        backToProductsBtn.addEventListener('click', () => {
            productsView.style.display = 'block';
            labsByProductView.style.display = 'none';
        });
    }

});