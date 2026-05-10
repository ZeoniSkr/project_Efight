const events = [
    {
        id: 1,
        name: "Championship Fight Night",
        date: "2026-05-15",
        location: "Fablab",
        type: "spectator",
        description:
            "Un grand gala MMA pour les fans avec combats principaux, ambiance arena et expériences premium.",
        image: "../img/ARNAUD_FLOFLO_FACEOFF.png",
        fighters: [
            { name: "FLOFLO", weight: "85kg", record: "15-3-0" },
            { name: "ARNAUD", weight: "84kg", record: "12-2-0" }
        ]
    },
    {
        id: 2,
        name: "Ultimate Showdown 2026",
        date: "2026-05-22",
        location: "AVION A BAABAAA",
        type: "participant",
        description:
            "Événement orienté inscription combattants, qualifications et affrontements de haut niveau.",
        image: "/img/ilian_jules_faceoff.png",
        fighters: [
            { name: "ILIAN", weight: "77kg", record: "11-4-0" },
            { name: "BIIIIG J", weight: "78kg", record: "13-1-0" }
        ]
    },
    {
        id: 3,
        name: "Battle of Champions",
        date: "2026-06-05",
        location: "CUISINE DE MASTER POULET",
        type: "spectator",
        description:
            "Soirée spectaculaire avec affrontements de champions et diffusion en direct.",
        image: "/img/Lauris_Raph_faceoff.png",
        fighters: [
            { name: "LAUUURIS", weight: "70kg", record: "14-5-0" },
            { name: "RAAAPHAAEL", weight: "71kg", record: "16-2-0" }
        ]
    },
];

function getEventById(id) {
    return events.find((event) => event.id === Number(id));
}

function generateUniqueId() {
    return Date.now();
}

function formatDate(dateString) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
}

function getBadgeClass(type) {
    return type === "spectator" ? "badge badge-spectator" : "badge badge-participant";
}

function getBadgeLabel(type) {
    return type === "spectator" ? "SPECTATOR" : "PARTICIPANT";
}

function createEventCard(event) {
    return `
    <article class="event-card">
      <div class="card-image">
   <img src="${event.image}" alt="${event.name}">
       </div>
      <div class="card-content">
        <span class="${getBadgeClass(event.type)}">${getBadgeLabel(event.type)}</span>
        <h3>${event.name}</h3>
        <div class="event-meta">
          <p>Date: ${formatDate(event.date)}</p>
          <p>Lieu: ${event.location}</p>
        </div>
        <a class="btn btn-secondary" href="event-detail.html?id=${event.id}">Voir</a>
      </div>
    </article>
  `;
}

function displayHomeEvents() {
    const homeEventsContainer = document.getElementById("homeEventsContainer");
    if (!homeEventsContainer) return;

    const upcoming = events.slice(0, 4);
    homeEventsContainer.innerHTML = upcoming.map(createEventCard).join("");
}

function displayEvents() {
    const eventsContainer = document.getElementById("eventsContainer");
    if (!eventsContainer) return;

    eventsContainer.innerHTML = events.map(createEventCard).join("");
}

function displayEventDetails() {
    const detailContainer = document.getElementById("eventDetailContainer");
    if (!detailContainer) return;

    const params = new URLSearchParams(window.location.search);
    const eventId = params.get("id");
    const event = getEventById(eventId);

    if (!event) {
        detailContainer.innerHTML = "<p>Événement introuvable.</p>";
        return;
    }

    detailContainer.innerHTML = `
    <div class="detail-top">
      <p class="section-label">EVENT DETAILS</p>
      <span class="${getBadgeClass(event.type)}">${getBadgeLabel(event.type)}</span>
      <h1>${event.name}</h1>
    </div>

    <div class="detail-main-box">
      <h3>Informations</h3>

      <div class="fighters-grid">
        ${event.fighters
        .map(
            (fighter) => `
          <div class="fighter-card">
            <h4>${fighter.name}</h4>
            <p>Weight: ${fighter.weight}</p>
            <p>Record: ${fighter.record}</p>
          </div>
        `
        )
        .join("")}
      </div>

      <div class="detail-infos">
        <div>
          <h4>Date</h4>
          <p>${formatDate(event.date)}</p>
        </div>
        <div>
          <h4>Lieu</h4>
          <p>${event.location}</p>
        </div>
      </div>

      

      <div style="margin-top: 24px;">
        <a class="btn btn-primary" href="register.html?eventId=${event.id}">
          Réserver une place
        </a>
      </div>
    </div>

    <div class="detail-description">
      <h3>Description</h3>
      <p>${event.description}</p>
      <h4 style="margin-top: 20px;">Event Highlights</h4>
      <ul>
        <li>Championship title fight</li>
        <li>5 rounds, 5 minutes each</li>
        <li>Live broadcast worldwide</li>
        <li>Special guest appearances</li>
      </ul>
    </div>
  `;
}

function buildSpectatorForm(event) {
    return `
    <h2>Informations de réservation</h2>

    <div class="form-group">
      <label for="nom">Nom complet *</label>
      <input type="text" id="nom" name="nom" />
    </div>

    <div class="form-row-2">
      <div class="form-group">
        <label for="email">Email *</label>
        <input type="email" id="email" name="email" />
      </div>

      <div class="form-group">
        <label for="telephone">Téléphone *</label>
        <input type="text" id="telephone" name="telephone" />
      </div>
    </div>

    <div class="form-group">
      <label for="places">Nombre de places *</label>
      <select id="places" name="places">
        <option value="">-- Sélectionner --</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>

    <div class="form-group">
      <label>Catégorie de siège *</label>
      <div class="radio-boxes">
        <div class="radio-option">
          <label><input type="radio" name="categorie" value="VIP" /> VIP - $200</label>
        </div>
        <div class="radio-option">
          <label><input type="radio" name="categorie" value="Standard" /> Standard - $100</label>
        </div>
        <div class="radio-option">
          <label><input type="radio" name="categorie" value="Balcon" /> Balcon - $50</label>
        </div>
      </div>
    </div>
  `;
}

function buildParticipantForm(event) {
    return `
    <h2>Informations Participant</h2>

    <div class="form-group">
      <label for="nom">Nom complet *</label>
      <input type="text" id="nom" name="nom" />
    </div>

    <div class="form-row-2">
      <div class="form-group">
        <label for="email">Email *</label>
        <input type="email" id="email" name="email" />
      </div>

      <div class="form-group">
        <label for="telephone">Téléphone *</label>
        <input type="text" id="telephone" name="telephone" />
      </div>
    </div>

    <div class="form-group">
      <label for="dateNaissance">Date de naissance *</label>
      <input type="date" id="dateNaissance" name="dateNaissance" />
    </div>

    <div class="form-row-2">
      <div class="form-group">
        <label for="categoriePoids">Catégorie de poids *</label>
        <select id="categoriePoids" name="categoriePoids">
          <option value="">-- Sélectionner --</option>
          <option value="Flyweight">Flyweight</option>
          <option value="Bantamweight">Bantamweight</option>
          <option value="Featherweight">Featherweight</option>
          <option value="Lightweight">Lightweight</option>
          <option value="Welterweight">Welterweight</option>
          <option value="Middleweight">Middleweight</option>
          <option value="Heavyweight">Heavyweight</option>
        </select>
      </div>

      <div class="form-group">
        <label for="poids">Poids *</label>
        <input type="text" id="poids" name="poids" placeholder="Ex: 75kg" />
      </div>
    </div>

    <div class="form-group">
      <label for="record">Record *</label>
      <input type="text" id="record" name="record" placeholder="Ex: 10-2-0" />
    </div>

    <div class="form-group">
      <label for="experience">Expérience *</label>
      <input type="text" id="experience" name="experience" placeholder="Ex: 4 ans" />
    </div>

    <div class="form-group">
      <label for="styleCombat">Style de combat *</label>
      <input type="text" id="styleCombat" name="styleCombat" />
    </div>

    <div class="form-group">
      <label for="club">Club *</label>
      <input type="text" id="club" name="club" />
    </div>

    <div class="form-group">
      <label for="groupeSanguin">Groupe sanguin *</label>
      <input type="text" id="groupeSanguin" name="groupeSanguin" />
    </div>

    <div class="form-row-2">
      <div class="form-group">
        <label for="contactUrgenceNom">Contact urgence *</label>
        <input type="text" id="contactUrgenceNom" name="contactUrgenceNom" />
      </div>

      <div class="form-group">
        <label for="contactUrgenceTel">Téléphone urgence *</label>
        <input type="text" id="contactUrgenceTel" name="contactUrgenceTel" />
      </div>
    </div>

    <div class="form-group">
      <label for="conditionsMedicales">Conditions médicales *</label>
      <textarea id="conditionsMedicales" name="conditionsMedicales" rows="5"></textarea>
    </div>

    <div class="checkbox-group">
      <input type="checkbox" id="responsabilite" name="responsabilite" required />
      <label for="responsabilite">
        J'accepte la décharge de responsabilité *
      </label>
    </div>
  `;
}

function renderRegisterPage() {
    const title = document.getElementById("registerPageTitle");
    const selectedEventInfo = document.getElementById("selectedEventInfo");
    const fieldsContainer = document.getElementById("dynamicFormFields");
    const spectatorTypeCard = document.getElementById("spectatorTypeCard");
    const participantTypeCard = document.getElementById("participantTypeCard");

    if (!title || !selectedEventInfo || !fieldsContainer) return;

    const params = new URLSearchParams(window.location.search);
    const eventId = params.get("eventId");
    const event = getEventById(eventId);

    if (!event) {
        title.textContent = "Inscription";
        selectedEventInfo.textContent = "Aucun événement trouvé.";
        fieldsContainer.innerHTML = "<p>Impossible de charger le formulaire.</p>";
        return;
    }

    title.textContent =
        event.type === "spectator"
            ? "Réservation Spectateur"
            : "Inscription Participant";

    selectedEventInfo.innerHTML = `
    <strong>Événement :</strong> ${event.name}<br>
    <strong>Type :</strong> ${getBadgeLabel(event.type)}<br>
    <strong>Date :</strong> ${formatDate(event.date)}<br>
    <strong>Lieu :</strong> ${event.location}
  `;

    if (event.type === "spectator") {
        spectatorTypeCard.classList.add("active");
        participantTypeCard.classList.remove("active");
        fieldsContainer.innerHTML = buildSpectatorForm(event);
    } else {
        participantTypeCard.classList.add("active");
        spectatorTypeCard.classList.remove("active");
        fieldsContainer.innerHTML = buildParticipantForm(event);
    }
}

function saveToLocalStorage(data) {
    const registrations = JSON.parse(localStorage.getItem("efightRegistrations")) || [];
    registrations.push(data);
    localStorage.setItem("efightRegistrations", JSON.stringify(registrations));
}

function validateRegistrationForm(eventType) {
    const errors = [];
    const nom = document.getElementById("nom")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const telephone = document.getElementById("telephone")?.value.trim();

    if (!nom) errors.push("Le nom complet est obligatoire.");
    if (!email) errors.push("L'email est obligatoire.");
    if (!telephone) errors.push("Le téléphone est obligatoire.");

    if (eventType === "spectator") {
        const places = document.getElementById("places")?.value;
        const categorie = document.querySelector('input[name="categorie"]:checked');

        if (!places) errors.push("Le nombre de places est obligatoire.");
        if (!categorie) errors.push("La catégorie de siège est obligatoire.");
    }

    if (eventType === "participant") {
        const requiredIds = [
            "dateNaissance",
            "categoriePoids",
            "poids",
            "record",
            "experience",
            "styleCombat",
            "club",
            "groupeSanguin",
            "contactUrgenceNom",
            "contactUrgenceTel",
            "conditionsMedicales"
        ];

        requiredIds.forEach((id) => {
            const value = document.getElementById(id)?.value.trim();
            if (!value) {
                errors.push(`Le champ ${id} est obligatoire.`);
            }
        });

        const checked = document.getElementById("responsabilite")?.checked;
        if (!checked) {
            errors.push("Vous devez accepter la décharge de responsabilité.");
        }
    }

    return errors;
}

function generateTicket(registration, event) {
    const ticketContainer = document.getElementById("ticketContainer");

    if (!ticketContainer) return;

    let extraRows = "";

    if (registration.type === "spectator") {
        extraRows = `
            <tr>
                <th>Places</th>
                <td>${registration.places}</td>
            </tr>
            <tr>
                <th>Catégorie</th>
                <td>${registration.categorie}</td>
            </tr>
        `;
    } else {
        extraRows = `
            <tr>
                <th>Date de naissance</th>
                <td>${registration.dateNaissance}</td>
            </tr>
            <tr>
                <th>Catégorie poids</th>
                <td>${registration.categoriePoids}</td>
            </tr>
            <tr>
                <th>Poids</th>
                <td>${registration.poids}</td>
            </tr>
            <tr>
                <th>Record</th>
                <td>${registration.record}</td>
            </tr>
            <tr>
                <th>Expérience</th>
                <td>${registration.experience}</td>
            </tr>
            <tr>
                <th>Style</th>
                <td>${registration.styleCombat}</td>
            </tr>
            <tr>
                <th>Club</th>
                <td>${registration.club}</td>
            </tr>
            <tr>
                <th>Groupe sanguin</th>
                <td>${registration.groupeSanguin}</td>
            </tr>
        `;
    }

    ticketContainer.classList.remove("hidden");

    ticketContainer.innerHTML = `
        <div class="ticket-card">
            <h2>EFIGHT TICKET</h2>

            <table class="ticket-table">
                <tr>
                    <th>Ticket ID</th>
                    <td>#${registration.id}</td>
                </tr>
                <tr>
                    <th>Nom</th>
                    <td>${registration.nom}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>${registration.email}</td>
                </tr>
                <tr>
                    <th>Téléphone</th>
                    <td>${registration.telephone}</td>
                </tr>
                <tr>
                    <th>Événement</th>
                    <td>${event.name}</td>
                </tr>
                <tr>
                    <th>Date</th>
                    <td>${formatDate(event.date)}</td>
                </tr>
                <tr>
                    <th>Lieu</th>
                    <td>${event.location}</td>
                </tr>
                ${extraRows}
            </table>

            <button class="btn btn-primary" onclick="window.print()">
                Imprimer le ticket
            </button>
        </div>
    `;
}


function handleFormSubmit() {
    const form = document.getElementById("registrationForm");
    const errorBox = document.getElementById("formErrors");

    if (!form || !errorBox) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const params = new URLSearchParams(window.location.search);
        const eventId = params.get("eventId");
        const event = getEventById(eventId);

        if (!event) return;

        const errors = validateRegistrationForm(event.type);

        if (errors.length > 0) {
            errorBox.style.display = "block";
            errorBox.innerHTML = errors.map((err) => `<p>${err}</p>`).join("");
            return;
        }

        errorBox.style.display = "none";
        errorBox.innerHTML = "";

        const registration = {
            id: generateUniqueId(),
            eventId: event.id,
            type: event.type,
            nom: document.getElementById("nom").value.trim(),
            email: document.getElementById("email").value.trim(),
            telephone: document.getElementById("telephone").value.trim()
        };

        if (event.type === "spectator") {
            registration.places =
                document.getElementById("places").value;

            registration.categorie =
                document.querySelector('input[name="categorie"]:checked').value;

            localStorage.setItem(
                "tempRegistration",
                JSON.stringify(registration)
            );

            window.location.href = `payment.html?eventId=${event.id}`;
        }

        else {
            registration.dateNaissance =
                document.getElementById("dateNaissance").value.trim();

            registration.categoriePoids =
                document.getElementById("categoriePoids").value;

            registration.poids =
                document.getElementById("poids").value.trim();

            registration.record =
                document.getElementById("record").value.trim();

            registration.experience =
                document.getElementById("experience").value.trim();

            registration.styleCombat =
                document.getElementById("styleCombat").value.trim();

            registration.club =
                document.getElementById("club").value.trim();

            registration.groupeSanguin =
                document.getElementById("groupeSanguin").value.trim();

            registration.contactUrgenceNom =
                document.getElementById("contactUrgenceNom").value.trim();

            registration.contactUrgenceTel =
                document.getElementById("contactUrgenceTel").value.trim();

            registration.conditionsMedicales =
                document.getElementById("conditionsMedicales").value.trim();

            saveToLocalStorage(registration);
            generateTicket(registration, event);
        }
    });
}

function initContactForm() {
    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return;

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Message envoyé avec succès !");
        contactForm.reset();
    });
}

function initMobileMenu() {
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (!menuToggle || !mainNav) return;

    menuToggle.addEventListener("click", function () {
        mainNav.classList.toggle("show");
    });
}

function basculerMode() {
    document.body.classList.toggle('light-mode');

    const estEnModeClair = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', estEnModeClair ? 'light' : 'dark');
}

function appliquerThemeSauvegarde() {
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
    }
}



document.addEventListener("DOMContentLoaded", function () {
    initMobileMenu();
    appliquerThemeSauvegarde();
    displayHomeEvents();
    displayEvents();
    displayEventDetails();
    renderRegisterPage();
    initContactForm();
    handleFormSubmit();
    FormatPayment();
});

function FormatPayment() {
    const paymentForm = document.getElementById("paymentForm");
    if (!paymentForm) return;

    const tempData = JSON.parse(localStorage.getItem("tempRegistration"));
    if (!tempData) return;

    const event = getEventById(tempData.eventId);
    if (!event) return;

    const paymentSummary = document.getElementById("paymentSummary");
    const errorBox = document.getElementById("paymentErrors");

    paymentSummary.innerHTML = `
        <h2>Récapitulatif avant paiement</h2>

        <table class="ticket-table">
            <tr>
                <th>Nom</th>
                <td>${tempData.nom}</td>
            </tr>
            <tr>
                <th>Email</th>
                <td>${tempData.email}</td>
            </tr>
            <tr>
                <th>Téléphone</th>
                <td>${tempData.telephone}</td>
            </tr>
            <tr>
                <th>Événement</th>
                <td>${event.name}</td>
            </tr>
            <tr>
                <th>Date</th>
                <td>${formatDate(event.date)}</td>
            </tr>
            <tr>
                <th>Lieu</th>
                <td>${event.location}</td>
            </tr>
            <tr>
                <th>Places</th>
                <td>${tempData.places}</td>
            </tr>
            <tr>
                <th>Catégorie</th>
                <td>${tempData.categorie}</td>
            </tr>
        </table>
    `;

    const cardInput = document.getElementById("cardNumber");

    if (cardInput) {
        cardInput.addEventListener("input", function (e) {
            e.target.value = e.target.value
                .replace(/[^\d]/g, "")
                .replace(/(.{4})/g, "$1 ")
                .trim();
        });
    }

    paymentForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const cardNumber = document.getElementById("cardNumber").value.replace(/\s/g, "");
        const expDate = document.getElementById("expDate").value.trim();
        const cvv = document.getElementById("cvv").value.trim();

        let errors = [];

        if (cardNumber.length !== 16) {
            errors.push("Numéro de carte invalide");
        }

        if (!/^\d{2}\/\d{2}$/.test(expDate)) {
            errors.push("Date invalide");
        }

        if (cvv.length !== 3) {
            errors.push("CVV invalide");
        }

        if (errors.length > 0) {
            errorBox.style.display = "block";
            errorBox.innerHTML = errors.map(err => `<p>${err}</p>`).join("");
            return;
        }

        errorBox.style.display = "none";
        errorBox.innerHTML = "";

        saveToLocalStorage(tempData);
        localStorage.removeItem("tempRegistration");

        let ticketContainer = document.getElementById("ticketContainer");

        if (!ticketContainer) {
            ticketContainer = document.createElement("div");
            ticketContainer.id = "ticketContainer";
            ticketContainer.className = "ticket-section";
            paymentForm.parentElement.appendChild(ticketContainer);
        }

        generateTicket(tempData, event);
    });
}