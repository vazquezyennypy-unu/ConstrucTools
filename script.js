/* =====================================================
   CONSTRUCTOOLS
   JAVASCRIPT PRINCIPAL
===================================================== */

let data = {
  user: {
    name: "",
    email: "",
    role: "Estudiante",
    accountType: "Estudiante",
    project: "",
    preferences: "",
    password: ""
  },

  works: [],
  notes: [],
  events: [],
  documents: [],
  materials: [],
  tasks: [],
  purchases: [],
  photos: []
};

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let currentTaskFilter = "all";


/* =====================================================
   INICIO
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  loadData();

  document
    .getElementById("loginForm")
    ?.addEventListener("submit", handleLogin);

  document
    .getElementById("registerForm")
    ?.addEventListener("submit", handleRegister);

  document
    .getElementById("accountForm")
    ?.addEventListener("submit", saveAccount);

  document
    .getElementById("obraForm")
    ?.addEventListener("submit", saveWork);

  document
    .getElementById("noteForm")
    ?.addEventListener("submit", saveNote);

  document
    .getElementById("photoForm")
    ?.addEventListener("submit", savePhoto);

  document
    .getElementById("eventForm")
    ?.addEventListener("submit", saveEvent);

  document
    .getElementById("documentForm")
    ?.addEventListener("submit", saveDocument);

  document
    .getElementById("purchaseForm")
    ?.addEventListener("submit", savePurchase);

  document
    .getElementById("materialForm")
    ?.addEventListener("submit", saveMaterial);

  document
    .getElementById("taskForm")
    ?.addEventListener("submit", saveTask);


  if (localStorage.getItem("construcToolsLogged") === "true") {
    showApp();
  } else {
    showWelcome();
  }

  renderEverything();

});


/* =====================================================
   PANTALLAS
===================================================== */

function startConstrucTools() {

  document
    .getElementById("welcomeScreen")
    ?.classList.add("hidden");

  document
    .getElementById("roleScreen")
    ?.classList.remove("hidden");

}


function showWelcome() {

  document
    .getElementById("welcomeScreen")
    ?.classList.remove("hidden");

  document
    .getElementById("roleScreen")
    ?.classList.add("hidden");

  document
    .getElementById("loginScreen")
    ?.classList.add("hidden");

  document
    .getElementById("registerScreen")
    ?.classList.add("hidden");

  document
    .getElementById("app")
    ?.classList.add("hidden");

}


function showLogin() {

  document
    .getElementById("welcomeScreen")
    ?.classList.add("hidden");

  document
    .getElementById("roleScreen")
    ?.classList.add("hidden");

  document
    .getElementById("registerScreen")
    ?.classList.add("hidden");

  document
    .getElementById("loginScreen")
    ?.classList.remove("hidden");

}


function showRegister() {

  document
    .getElementById("welcomeScreen")
    ?.classList.add("hidden");

  document
    .getElementById("roleScreen")
    ?.classList.add("hidden");

  document
    .getElementById("loginScreen")
    ?.classList.add("hidden");

  document
    .getElementById("registerScreen")
    ?.classList.remove("hidden");

}


function selectRole(role) {

  data.user.role = role;

  saveData();

  showLogin();

}


/* =====================================================
   REGISTRO
===================================================== */

function handleRegister(event) {

  event.preventDefault();

  const name =
    document.getElementById("registerName").value.trim();

  const email =
    document.getElementById("registerEmail").value.trim();

  const password =
    document.getElementById("registerPassword").value;

  const project =
    document.getElementById("registerProject").value.trim();


  data.user.name = name;
  data.user.email = email;
  data.user.password = password;
  data.user.project = project;

  if (!data.user.role) {
    data.user.role = "Estudiante";
  }

  saveData();

  localStorage.setItem(
    "construcToolsLogged",
    "true"
  );

  showApp();

  alert("Cuenta creada correctamente.");

}


/* =====================================================
   LOGIN
===================================================== */

function handleLogin(event) {

  event.preventDefault();

  const email =
    document.getElementById("loginEmail").value.trim();

  const password =
    document.getElementById("loginPassword").value;


  if (
    email === data.user.email &&
    password === data.user.password
  ) {

    localStorage.setItem(
      "construcToolsLogged",
      "true"
    );

    showApp();

  } else {

    alert(
      "El correo electrónico o la contraseña no coinciden."
    );

  }

}


/* =====================================================
   MOSTRAR APP
===================================================== */

function showApp() {

  document
    .getElementById("welcomeScreen")
    ?.classList.add("hidden");

  document
    .getElementById("roleScreen")
    ?.classList.add("hidden");

  document
    .getElementById("loginScreen")
    ?.classList.add("hidden");

  document
    .getElementById("registerScreen")
    ?.classList.add("hidden");

  document
    .getElementById("app")
    ?.classList.remove("hidden");


  updateUserInterface();
  renderEverything();

}


/* =====================================================
   CERRAR SESIÓN
===================================================== */

function logout() {

  localStorage.removeItem(
    "construcToolsLogged"
  );

  document
    .getElementById("app")
    ?.classList.add("hidden");

  showLogin();

}


/* =====================================================
   DATOS
===================================================== */

function loadData() {

  const saved =
    localStorage.getItem("construcToolsData");

  if (!saved) {
    return;
  }

  try {

    const parsed = JSON.parse(saved);

    data = {
      ...data,
      ...parsed,

      user: {
        ...data.user,
        ...(parsed.user || {})
      },

      works: Array.isArray(parsed.works)
        ? parsed.works
        : [],

      notes: Array.isArray(parsed.notes)
        ? parsed.notes
        : [],

      events: Array.isArray(parsed.events)
        ? parsed.events
        : [],

      documents: Array.isArray(parsed.documents)
        ? parsed.documents
        : [],

      materials: Array.isArray(parsed.materials)
        ? parsed.materials
        : [],

      tasks: Array.isArray(parsed.tasks)
        ? parsed.tasks
        : [],

      purchases: Array.isArray(parsed.purchases)
        ? parsed.purchases
        : [],

      photos: Array.isArray(parsed.photos)
        ? parsed.photos
        : []

    };

  } catch (error) {

    console.error(
      "No se pudieron cargar los datos:",
      error
    );

  }

}


function saveData() {

  try {

    localStorage.setItem(
      "construcToolsData",
      JSON.stringify(data)
    );

  } catch (error) {

    console.error(error);

    alert(
      "No se pudieron guardar los datos. Es posible que el almacenamiento esté lleno."
    );

  }

}


/* =====================================================
   INTERFAZ DE USUARIO
===================================================== */

function updateUserInterface() {

  const name =
    data.user.name || "Usuario";

  const role =
    data.user.role || "Estudiante";


  const profileName =
    document.getElementById("profileName");

  if (profileName) {
    profileName.textContent = name;
  }


  const welcomeText =
    document.getElementById("welcomeText");

  if (welcomeText) {
    welcomeText.textContent =
      `Bienvenido/a, ${name}`;
  }


  const accountName =
    document.getElementById("accountName");

  if (accountName) {
    accountName.value =
      data.user.name || "";
  }


  const accountEmail =
    document.getElementById("accountEmail");

  if (accountEmail) {
    accountEmail.value =
      data.user.email || "";
  }


  const accountRole =
    document.getElementById("accountRole");

  if (accountRole) {
    accountRole.value =
      data.user.role || "Estudiante";
  }


  const accountType =
    document.getElementById("accountType");

  if (accountType) {
    accountType.value =
      data.user.accountType || "Estudiante";
  }


  const accountProject =
    document.getElementById("accountProject");

  if (accountProject) {
    accountProject.value =
      data.user.project || "";
  }


  const accountPreferences =
    document.getElementById("accountPreferences");

  if (accountPreferences) {
    accountPreferences.value =
      data.user.preferences || "";
  }


  const accountHeaderName =
    document.getElementById("accountHeaderName");

  if (accountHeaderName) {
    accountHeaderName.textContent = name;
  }


  const accountHeaderRole =
    document.getElementById("accountHeaderRole");

  if (accountHeaderRole) {
    accountHeaderRole.textContent = role;
  }


  const accountAvatar =
    document.getElementById("accountAvatar");

  if (accountAvatar) {

    accountAvatar.textContent =
      name.charAt(0).toUpperCase() || "U";

  }

}


/* =====================================================
   NAVEGACIÓN
===================================================== */

function showSection(sectionId, button = null) {

  document
    .querySelectorAll(".content-section")
    .forEach(section => {

      section.classList.remove(
        "active-section"
      );

    });


  const section =
    document.getElementById(sectionId);

  if (section) {

    section.classList.add(
      "active-section"
    );

  }


  document
    .querySelectorAll(".menu-item")
    .forEach(item => {

      item.classList.remove("active");

    });


  if (button) {

    button.classList.add("active");

  } else {

    const menuButton =
      document.querySelector(
        `.menu-item[onclick*="'${sectionId}'"]`
      );

    if (menuButton) {
      menuButton.classList.add("active");
    }

  }


  const titles = {

    inicio: "Inicio",
    obras: "Mis obras",
    notas: "Notas y reportes",
    calculadora: "Calculadora",
    calendario: "Calendario",
    documentos: "Documentos",
    materiales: "Materiales",
    tareas: "Tareas",
    cuenta: "Mi cuenta"

  };


  const pageTitle =
    document.getElementById("pageTitle");

  if (pageTitle) {

    pageTitle.textContent =
      titles[sectionId] || "ConstrucTools";

  }


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =====================================================
   CUENTA
===================================================== */

function saveAccount(event) {

  event.preventDefault();

  data.user.name =
    document.getElementById("accountName").value.trim();

  data.user.email =
    document.getElementById("accountEmail").value.trim();

  data.user.role =
    document.getElementById("accountRole").value;

  data.user.accountType =
    document.getElementById("accountType").value;

  data.user.project =
    document.getElementById("accountProject").value.trim();

  data.user.preferences =
    document.getElementById("accountPreferences").value.trim();


  saveData();
  updateUserInterface();

  alert(
    "Los cambios de tu cuenta fueron guardados."
  );

}


/* =====================================================
   OBRAS
===================================================== */

function saveWork(event) {

  event.preventDefault();

  const work = {

    id: Date.now(),

    name:
      document.getElementById("obraName").value.trim(),

    location:
      document.getElementById("obraLocation").value.trim(),

    status:
      document.getElementById("obraStatus").value,

    currency:
      document.getElementById("obraCurrency").value,

    budget: {

      estimated:
        Number(
          document.getElementById("obraBudget").value
        ) || 0,

      labor:
        Number(
          document.getElementById("obraLabor").value
        ) || 0,

      other:
        Number(
          document.getElementById("obraOtherExpenses").value
        ) || 0

    }

  };


  data.works.push(work);

  saveData();

  document
    .getElementById("obraForm")
    .reset();

  closeModal("obraModal");

  renderEverything();

}


function getWorkPurchasesTotal(workName) {

  return data.purchases
    .filter(
      purchase =>
        normalizeText(purchase.work) ===
        normalizeText(workName)
    )
    .reduce(
      (total, purchase) =>
        total + Number(purchase.total || 0),
      0
    );

}


function getWorkExpenses(work) {

  const budget =
    work.budget || {};

  const purchases =
    getWorkPurchasesTotal(work.name);

  const labor =
    Number(budget.labor || 0);

  const other =
    Number(budget.other || 0);

  return purchases + labor + other;

}


function renderWorks() {

  const container =
    document.getElementById("worksContainer");

  if (!container) return;


  if (!data.works.length) {

    container.innerHTML =
      `<p class="empty-message">
        Todavía no hay obras registradas.
      </p>`;

    return;

  }


  container.innerHTML =
    data.works.map(work => {

      const budget =
        work.budget || {};

      const estimated =
        Number(budget.estimated || 0);

      const spent =
        getWorkExpenses(work);

      const remaining =
        estimated - spent;

      const currency =
        work.currency || "PYG";


      const materialCount =
        data.materials.filter(
          material =>
            normalizeText(material.work) ===
            normalizeText(work.name)
        ).length;


      const taskCount =
        data.tasks.filter(
          task =>
            normalizeText(task.work) ===
            normalizeText(work.name)
        ).length;


      const documentCount =
        data.documents.filter(
          document =>
            normalizeText(document.work) ===
            normalizeText(work.name)
        ).length;


      const purchaseCount =
        data.purchases.filter(
          purchase =>
            normalizeText(purchase.work) ===
            normalizeText(work.name)
        ).length;


      return `

        <article class="work-card">

          <div class="work-card-cover">

            <div class="work-icon">
              CT
            </div>

          </div>


          <div class="work-card-body">

            <div class="work-card-top">

              <div>

                <h3>
                  ${escapeHTML(work.name)}
                </h3>

                <span class="status-badge">
                  ${escapeHTML(work.status)}
                </span>

              </div>


              <button
                class="delete-button"
                onclick="deleteWork(${work.id})">
                Eliminar
              </button>

            </div>


            <p class="work-location">
              📍 ${escapeHTML(work.location)}
            </p>


            <a
              class="map-link"
              href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(work.location)}"
              target="_blank">
              Ver ubicación
            </a>


            <div class="work-summary">

              <div>
                <span>Materiales</span>
                <strong>${materialCount}</strong>
              </div>

              <div>
                <span>Tareas</span>
                <strong>${taskCount}</strong>
              </div>

              <div>
                <span>Documentos</span>
                <strong>${documentCount}</strong>
              </div>

              <div>
                <span>Compras</span>
                <strong>${purchaseCount}</strong>
              </div>

            </div>


            <div class="budget-summary">

              <div>
                <span>Presupuesto</span>
                <strong>
                  ${formatMoney(estimated, currency)}
                </strong>
              </div>

              <div>
                <span>Gastado</span>
                <strong>
                  ${formatMoney(spent, currency)}
                </strong>
              </div>

              <div>
                <span>Restante</span>
                <strong class="${remaining < 0 ? "negative-value" : ""}">
                  ${formatMoney(remaining, currency)}
                </strong>
              </div>

            </div>

          </div>

        </article>

      `;

    }).join("");

}


function deleteWork(id) {

  if (
    !confirm(
      "¿Querés eliminar esta obra?"
    )
  ) {
    return;
  }


  data.works =
    data.works.filter(
      work => work.id !== id
    );


  saveData();
  renderEverything();

}


/* =====================================================
   NOTAS Y REPORTES
===================================================== */

async function saveNote(event) {

  event.preventDefault();

  const photoInput =
    document.getElementById("notePhoto");

  let photoData = "";
  let photoName = "";


  if (
    photoInput &&
    photoInput.files &&
    photoInput.files[0]
  ) {

    const file =
      photoInput.files[0];

    if (file.size > 2 * 1024 * 1024) {

      alert(
        "La fotografía debe pesar menos de 2 MB."
      );

      return;

    }

    photoData =
      await fileToDataURL(file);

    photoName =
      file.name;

  }


  const note = {

    id: Date.now(),

    title:
      document.getElementById("noteTitle").value.trim(),

    work:
      document.getElementById("noteWork").value.trim(),

    progress:
      document.getElementById("noteProgress").value.trim(),

    pending:
      document.getElementById("notePending").value.trim(),

    observations:
      document.getElementById("noteObservations").value.trim(),

    difficulties:
      document.getElementById("noteDifficulties").value.trim(),

    date:
      document.getElementById("noteDate").value,

    photoData,
    photoName

  };


  data.notes.push(note);

  saveData();

  document
    .getElementById("noteForm")
    .reset();

  closeModal("noteModal");

  renderEverything();

}


function renderNotes() {

  const container =
    document.getElementById("notesContainer");

  if (!container) return;


  if (!data.notes.length) {

    container.innerHTML =
      `<p class="empty-message">
        Todavía no hay notas o reportes registrados.
      </p>`;

    return;

  }


  container.innerHTML =
    data.notes.map(note => `

      <article class="note-card">

        <div class="note-card-header">

          <div>

            <span class="note-date">
              ${formatDate(note.date)}
            </span>

            <h3>
              ${escapeHTML(note.title)}
            </h3>

            ${
              note.work
                ? `<p class="note-work">
                    Obra: ${escapeHTML(note.work)}
                  </p>`
                : ""
            }

          </div>


          <button
            class="delete-button"
            onclick="deleteNote(${note.id})">
            Eliminar
          </button>

        </div>


        <div class="note-sections">

          <div>
            <strong>Avances</strong>
            <p>
              ${escapeHTML(note.progress || "Sin registrar")}
            </p>
          </div>

          <div>
            <strong>Pendientes</strong>
            <p>
              ${escapeHTML(note.pending || "Sin registrar")}
            </p>
          </div>

          <div>
            <strong>Observaciones</strong>
            <p>
              ${escapeHTML(note.observations || "Sin registrar")}
            </p>
          </div>

          <div>
            <strong>Dificultades</strong>
            <p>
              ${escapeHTML(note.difficulties || "Sin registrar")}
            </p>
          </div>

        </div>


        ${
          note.photoData
            ? `
              <div class="note-photo">

                <img
                  src="${note.photoData}"
                  alt="Fotografía del reporte">

              </div>
            `
            : ""
        }

      </article>

    `).join("");

}


function deleteNote(id) {

  if (
    !confirm(
      "¿Querés eliminar esta nota?"
    )
  ) {
    return;
  }


  data.notes =
    data.notes.filter(
      note => note.id !== id
    );


  saveData();
  renderEverything();

}


/* =====================================================
   FOTOGRAFÍAS DE OBRA
===================================================== */

async function savePhoto(event) {

  event.preventDefault();

  const fileInput =
    document.getElementById("photoFile");

  if (
    !fileInput ||
    !fileInput.files ||
    !fileInput.files[0]
  ) {

    alert(
      "Seleccioná una fotografía."
    );

    return;

  }


  const file =
    fileInput.files[0];


  if (file.size > 2 * 1024 * 1024) {

    alert(
      "La fotografía debe pesar menos de 2 MB."
    );

    return;

  }


  const photo = {

    id: Date.now(),

    work:
      document.getElementById("photoWork").value.trim(),

    date:
      document.getElementById("photoDate").value,

    description:
      document
        .getElementById("photoDescription")
        .value
        .trim(),

    fileName:
      file.name,

    fileData:
      await fileToDataURL(file)

  };


  data.photos.push(photo);

  saveData();

  document
    .getElementById("photoForm")
    .reset();

  closeModal("photoModal");

  renderEverything();

}


function renderPhotos() {

  const container =
    document.getElementById("photosContainer");

  if (!container) return;


  if (!data.photos.length) {

    container.innerHTML =
      `<p class="empty-message">
        Todavía no hay fotografías registradas.
      </p>`;

    return;

  }


  container.innerHTML =
    data.photos.map(photo => `

      <article class="photo-card">

        <div class="photo-image">

          <img
            src="${photo.fileData}"
            alt="${escapeHTML(photo.description || "Fotografía de obra")}">

        </div>

        <div class="photo-card-body">

          <span class="photo-date">
            ${formatDate(photo.date)}
          </span>

          <h3>
            ${escapeHTML(photo.work)}
          </h3>

          <p>
            ${escapeHTML(
              photo.description ||
              "Sin descripción."
            )}
          </p>

          <button
            class="delete-button"
            onclick="deletePhoto(${photo.id})">
            Eliminar
          </button>

        </div>

      </article>

    `).join("");

}


function deletePhoto(id) {

  if (
    !confirm(
      "¿Querés eliminar esta fotografía?"
    )
  ) {
    return;
  }


  data.photos =
    data.photos.filter(
      photo => photo.id !== id
    );


  saveData();
  renderEverything();

}


/* =====================================================
   CALENDARIO
===================================================== */

function saveEvent(event) {

  event.preventDefault();

  const newEvent = {

    id: Date.now(),

    title:
      document.getElementById("eventTitle").value.trim(),

    date:
      document.getElementById("eventDate").value,

    time:
      document.getElementById("eventTime").value,

    work:
      document.getElementById("eventWork").value.trim(),

    description:
      document
        .getElementById("eventDescription")
        .value
        .trim()

  };


  data.events.push(newEvent);

  saveData();

  document
    .getElementById("eventForm")
    .reset();

  closeModal("eventModal");

  renderEverything();

}


function changeMonth(change) {

  currentMonth += change;


  if (currentMonth < 0) {

    currentMonth = 11;
    currentYear--;

  }


  if (currentMonth > 11) {

    currentMonth = 0;
    currentYear++;

  }


  renderCalendar();

}


function renderCalendar() {

  const grid =
    document.getElementById("calendarGrid");

  const title =
    document.getElementById("calendarMonth");


  if (!grid || !title) return;


  const firstDay =
    new Date(
      currentYear,
      currentMonth,
      1
    );


  const lastDay =
    new Date(
      currentYear,
      currentMonth + 1,
      0
    );


  const monthName =
    firstDay.toLocaleDateString(
      "es-ES",
      {
        month: "long",
        year: "numeric"
      }
    );


  title.textContent =
    monthName.charAt(0).toUpperCase() +
    monthName.slice(1);


  let startDay =
    firstDay.getDay();

  startDay =
    startDay === 0
      ? 6
      : startDay - 1;


  let html = "";


  const days = [
    "Lun",
    "Mar",
    "Mié",
    "Jue",
    "Vie",
    "Sáb",
    "Dom"
  ];


  days.forEach(day => {

    html += `
      <div class="calendar-weekday">
        ${day}
      </div>
    `;

  });


  for (
    let i = 0;
    i < startDay;
    i++
  ) {

    html += `
      <div class="calendar-day empty"></div>
    `;

  }


  for (
    let day = 1;
    day <= lastDay.getDate();
    day++
  ) {

    const dateString =
      `${currentYear}-${String(
        currentMonth + 1
      ).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;


    const hasEvent =
      data.events.some(
        event =>
          event.date === dateString
      );


    const today =
      new Date();


    const isToday =
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear();


    html += `

      <div
        class="calendar-day
        ${hasEvent ? "has-event" : ""}
        ${isToday ? "today" : ""}">

        <span>
          ${day}
        </span>

      </div>

    `;

  }


  grid.innerHTML = html;

}


function renderEvents() {

  const container =
    document.getElementById("eventsContainer");

  if (!container) return;


  const sorted =
    [...data.events].sort(
      (a, b) =>
        new Date(a.date) -
        new Date(b.date)
    );


  if (!sorted.length) {

    container.innerHTML =
      `<p class="empty-message">
        No hay actividades registradas.
      </p>`;

    return;

  }


  container.innerHTML =
    sorted.map(event => `

      <div class="event-item">

        <div>

          <strong>
            ${escapeHTML(event.title)}
          </strong>

          <span>
            ${formatDate(event.date)}
            ${event.time ? ` • ${event.time}` : ""}
          </span>

          ${
            event.work
              ? `<small>
                  Obra: ${escapeHTML(event.work)}
                </small>`
              : ""
          }

          ${
            event.description
              ? `<p>
                  ${escapeHTML(event.description)}
                </p>`
              : ""
          }

        </div>

        <button
          class="delete-button"
          onclick="deleteEvent(${event.id})">
          Eliminar
        </button>

      </div>

    `).join("");

}


function deleteEvent(id) {

  if (
    !confirm(
      "¿Querés eliminar esta actividad?"
    )
  ) {
    return;
  }


  data.events =
    data.events.filter(
      event =>
        event.id !== id
    );


  saveData();
  renderEverything();

}


/* =====================================================
   DOCUMENTOS
===================================================== */

async function saveDocument(event) {

  event.preventDefault();

  const fileInput =
    document.getElementById("documentFile");

  let fileData = "";
  let fileName = "";
  let fileType = "";


  if (
    fileInput &&
    fileInput.files &&
    fileInput.files[0]
  ) {

    const file =
      fileInput.files[0];


    if (file.size > 4 * 1024 * 1024) {

      alert(
        "El archivo debe pesar menos de 4 MB."
      );

      return;

    }


    fileData =
      await fileToDataURL(file);

    fileName =
      file.name;

    fileType =
      file.type;

  }


  const documentItem = {

    id: Date.now(),

    name:
      document
        .getElementById("documentName")
        .value
        .trim(),

    work:
      document
        .getElementById("documentWork")
        .value
        .trim(),

    type:
      document
        .getElementById("documentType")
        .value,

    description:
      document
        .getElementById("documentDescription")
        .value
        .trim(),

    fileName,
    fileType,
    fileData

  };


  data.documents.push(
    documentItem
  );

  saveData();

  document
    .getElementById("documentForm")
    .reset();

  closeModal("documentModal");

  renderEverything();

}


function renderDocuments() {

  const container =
    document.getElementById("documentsContainer");

  if (!container) return;

  if (!data.documents.length) {

    container.innerHTML =
      `<p class="empty-message">
        Todavía no hay documentos registrados.
      </p>`;

    return;
  }

  container.innerHTML =
    data.documents.map(documentItem => `

      <article class="document-card">

        <div class="document-card-top">

          <div class="document-icon">
            DOC
          </div>

          <button
            class="delete-button"
            onclick="deleteDocument(${documentItem.id})">
            Eliminar
          </button>

        </div>


        <div class="document-card-content">

          <span class="document-type">
            ${escapeHTML(documentItem.type)}
          </span>

          <h3>
            ${escapeHTML(documentItem.name)}
          </h3>


          ${
            documentItem.work
              ? `
                <p class="document-work">
                  <strong>Obra:</strong>
                  ${escapeHTML(documentItem.work)}
                </p>
              `
              : ""
          }


          ${
            documentItem.description
              ? `
                <p class="document-description">
                  ${escapeHTML(documentItem.description)}
                </p>
              `
              : ""
          }


          ${
            documentItem.fileData
              ? `
                <div class="document-file-box">

                  <span>
                    📄 ${escapeHTML(
                      documentItem.fileName || "Documento adjunto"
                    )}
                  </span>

                </div>

                <div class="document-actions">

                  <button
                    class="document-view-button"
                    onclick="openFile('${documentItem.fileData}')">
                    Ver archivo
                  </button>

                  <button
                    class="document-download-button"
                    onclick="downloadFile(
                      '${documentItem.fileData}',
                      '${escapeHTML(
                        documentItem.fileName || "documento"
                      )}'
                    )">
                    Descargar
                  </button>

                </div>
              `
              : `
                <span class="file-help">
                  Sin archivo adjunto.
                </span>
              `
          }

        </div>

      </article>

    `).join("");
}


function deleteDocument(id) {

  if (
    !confirm(
      "¿Querés eliminar este documento?"
    )
  ) {
    return;
  }


  data.documents =
    data.documents.filter(
      documentItem =>
        documentItem.id !== id
    );


  saveData();
  renderEverything();

}


/* =====================================================
   COMPRAS Y COMPROBANTES
===================================================== */

async function savePurchase(event) {

  event.preventDefault();

  const fileInput =
    document.getElementById(
      "purchaseReceiptFile"
    );


  let receiptData = "";
  let receiptName = "";
  let receiptType = "";


  if (
    fileInput &&
    fileInput.files &&
    fileInput.files[0]
  ) {

    const file =
      fileInput.files[0];


    if (file.size > 3 * 1024 * 1024) {

      alert(
        "El comprobante debe pesar menos de 3 MB."
      );

      return;

    }


    receiptData =
      await fileToDataURL(file);

    receiptName =
      file.name;

    receiptType =
      file.type;

  }


  const purchase = {

    id: Date.now(),

    work:
      document
        .getElementById("purchaseWork")
        .value
        .trim(),

    product:
      document
        .getElementById("purchaseProduct")
        .value
        .trim(),

    supplier:
      document
        .getElementById("purchaseSupplier")
        .value
        .trim(),

    date:
      document
        .getElementById("purchaseDate")
        .value,

    total:
      Number(
        document
          .getElementById("purchaseTotal")
          .value
      ) || 0,

    description:
      document
        .getElementById("purchaseDescription")
        .value
        .trim(),

    receiptData,
    receiptName,
    receiptType

  };


  data.purchases.push(
    purchase
  );

  saveData();

  document
    .getElementById("purchaseForm")
    .reset();

  closeModal("purchaseModal");

  renderEverything();

}


function renderPurchases() {

  const container =
    document.getElementById(
      "purchasesContainer"
    );

  if (!container) return;


  if (!data.purchases.length) {

    container.innerHTML =
      `<p class="empty-message">
        Todavía no hay compras registradas.
      </p>`;

    return;

  }


  const sorted =
    [...data.purchases].sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date)
    );


  container.innerHTML =
    sorted.map(purchase => `

      <article class="purchase-card">

        <div class="purchase-card-body">

          <div class="purchase-header">

            <div>

              <span class="purchase-date">
                ${formatDate(purchase.date)}
              </span>

              <h3>
                ${escapeHTML(purchase.product)}
              </h3>

            </div>

            <button
              class="delete-button"
              onclick="deletePurchase(${purchase.id})">
              Eliminar
            </button>

          </div>


          <div class="purchase-info">

            <span>
              <strong>Obra:</strong>
              ${escapeHTML(purchase.work)}
            </span>

            ${
              purchase.supplier
                ? `
                  <span>
                    <strong>Proveedor:</strong>
                    ${escapeHTML(
                      purchase.supplier
                    )}
                  </span>
                `
                : ""
            }

            <span>
              <strong>Total:</strong>
              ${formatMoney(
                purchase.total,
                getWorkCurrency(purchase.work)
              )}
            </span>

          </div>


          ${
            purchase.description
              ? `
                <p>
                  ${escapeHTML(
                    purchase.description
                  )}
                </p>
              `
              : ""
          }


          ${
            purchase.receiptData
              ? `
                <div class="receipt-actions">

                  <button
                    class="secondary-action"
                    onclick="openFile('${purchase.receiptData}')">
                    Ver comprobante
                  </button>

                  <button
                    class="secondary-action"
                    onclick="downloadFile(
                      '${purchase.receiptData}',
                      '${escapeHTML(purchase.receiptName || "comprobante")}'
                    )">
                    Descargar
                  </button>

                </div>
              `
              : `
                <span class="file-help">
                  Esta compra no tiene comprobante adjunto.
                </span>
              `
          }

        </div>

      </article>

    `).join("");

}


function deletePurchase(id) {

  if (
    !confirm(
      "¿Querés eliminar esta compra?"
    )
  ) {
    return;
  }


  data.purchases =
    data.purchases.filter(
      purchase =>
        purchase.id !== id
    );


  saveData();
  renderEverything();

}


/* =====================================================
   MATERIALES
===================================================== */

function saveMaterial(event) {

  event.preventDefault();

  const material = {

    id: Date.now(),

    name:
      document
        .getElementById("materialName")
        .value
        .trim(),

    category:
      document
        .getElementById("materialCategory")
        .value,

    quantity:
      Number(
        document
          .getElementById("materialQuantity")
          .value
      ) || 0,

    unit:
      document
        .getElementById("materialUnit")
        .value,

    price:
      Number(
        document
          .getElementById("materialPrice")
          .value
      ) || 0,

    supplier:
      document
        .getElementById("materialSupplier")
        .value
        .trim(),

    work:
      document
        .getElementById("materialWork")
        .value
        .trim(),

    status:
      document
        .getElementById("materialStatus")
        .value

  };


  data.materials.push(
    material
  );

  saveData();

  document
    .getElementById("materialForm")
    .reset();

  closeModal("materialModal");

  renderEverything();

}


function renderMaterials() {

  const container =
    document.getElementById(
      "materialsContainer"
    );

  if (!container) return;


  if (!data.materials.length) {

    container.innerHTML =
      `<p class="empty-message">
        Todavía no hay materiales registrados.
      </p>`;

    return;

  }


  container.innerHTML =
    data.materials.map(material => `

      <article class="material-card">

        <div class="material-card-body">

          <div class="material-header">

            <div>

              <h3>
                ${escapeHTML(material.name)}
              </h3>

              <span class="material-category">
                ${escapeHTML(
                  material.category || "Sin categoría"
                )}
              </span>

            </div>

            <button
              class="delete-button"
              onclick="deleteMaterial(${material.id})">
              Eliminar
            </button>

          </div>


          <div class="material-details">

            <div>
              <span>Cantidad</span>
              <strong>
                ${material.quantity}
                ${escapeHTML(material.unit)}
              </strong>
            </div>

            <div>
              <span>Precio unitario</span>
              <strong>
                ${formatMoney(
                  material.price,
                  getWorkCurrency(material.work)
                )}
              </strong>
            </div>

            <div>
              <span>Valor total</span>
              <strong>
                ${formatMoney(
                  material.quantity *
                  material.price,
                  getWorkCurrency(material.work)
                )}
              </strong>
            </div>

          </div>


          ${
            material.work
              ? `
                <p>
                  <strong>Obra:</strong>
                  ${escapeHTML(material.work)}
                </p>
              `
              : ""
          }


          ${
            material.supplier
              ? `
                <p>
                  <strong>Proveedor:</strong>
                  ${escapeHTML(material.supplier)}
                </p>
              `
              : ""
          }


          <span
            class="stock-badge stock-${normalizeText(
              material.status
            ).replaceAll(" ", "-")}">

            ${escapeHTML(material.status)}

          </span>

        </div>

      </article>

    `).join("");

}


function deleteMaterial(id) {

  if (
    !confirm(
      "¿Querés eliminar este material?"
    )
  ) {
    return;
  }


  data.materials =
    data.materials.filter(
      material =>
        material.id !== id
    );


  saveData();
  renderEverything();

}


/* =====================================================
   TAREAS
===================================================== */

function saveTask(event) {

  event.preventDefault();

  const status =
    document
      .getElementById("taskStatus")
      .value;


  const task = {

    id: Date.now(),

    title:
      document
        .getElementById("taskTitle")
        .value
        .trim(),

    work:
      document
        .getElementById("taskWork")
        .value
        .trim(),

    status,

    priority:
      document
        .getElementById("taskPriority")
        .value,

    date:
      document
        .getElementById("taskDate")
        .value,

    description:
      document
        .getElementById("taskDescription")
        .value
        .trim(),

    completed:
      status === "Completada"

  };


  data.tasks.push(task);

  saveData();

  document
    .getElementById("taskForm")
    .reset();

  closeModal("taskModal");

  renderEverything();

}


function filterTasks(filter) {

  currentTaskFilter =
    filter;

  renderTasks();

}


function renderTasks() {

  const container =
    document.getElementById(
      "tasksContainer"
    );

  if (!container) return;


  let tasks =
    [...data.tasks];


  if (
    currentTaskFilter ===
    "pending"
  ) {

    tasks =
      tasks.filter(
        task =>
          (task.status || "Pendiente") ===
          "Pendiente"
      );

  }


  if (
    currentTaskFilter ===
    "progress"
  ) {

    tasks =
      tasks.filter(
        task =>
          task.status ===
          "En progreso"
      );

  }


  if (
    currentTaskFilter ===
    "completed"
  ) {

    tasks =
      tasks.filter(
        task =>
          task.status ===
          "Completada" ||
          task.completed === true
      );

  }


  if (!tasks.length) {

    container.innerHTML =
      `<p class="empty-message">
        No hay tareas en esta categoría.
      </p>`;

    return;

  }


  container.innerHTML =
    tasks.map(task => {

      const status =
        task.status ||
        (
          task.completed
            ? "Completada"
            : "Pendiente"
        );


      return `

        <article class="task-card">

          <div class="task-card-main">

            <div class="task-header">

              <div>

                <h3>
                  ${escapeHTML(task.title)}
                </h3>

                <div class="task-badges">

                  <span
                    class="task-status status-${normalizeText(status).replaceAll(" ", "-")}">
                    ${escapeHTML(status)}
                  </span>

                  <span
                    class="task-priority priority-${normalizeText(task.priority || "Media")}">
                    Prioridad ${escapeHTML(
                      task.priority || "Media"
                    )}
                  </span>

                </div>

              </div>

              <button
                class="delete-button"
                onclick="deleteTask(${task.id})">
                Eliminar
              </button>

            </div>


            ${
              task.work
                ? `
                  <p>
                    <strong>Obra:</strong>
                    ${escapeHTML(task.work)}
                  </p>
                `
                : ""
            }


            ${
              task.date
                ? `
                  <p>
                    <strong>Fecha límite:</strong>
                    ${formatDate(task.date)}
                  </p>
                `
                : ""
            }


            ${
              task.description
                ? `
                  <p>
                    ${escapeHTML(task.description)}
                  </p>
                `
                : ""
            }


            <div class="task-actions">

              <button
                class="secondary-action"
                onclick="changeTaskStatus(${task.id})">
                Cambiar estado
              </button>

            </div>

          </div>

        </article>

      `;

    }).join("");

}


function changeTaskStatus(id) {

  const task =
    data.tasks.find(
      item => item.id === id
    );

  if (!task) return;


  const statuses = [
    "Pendiente",
    "En progreso",
    "Completada"
  ];


  const current =
    task.status ||
    "Pendiente";


  const currentIndex =
    statuses.indexOf(current);


  const nextIndex =
    (currentIndex + 1) %
    statuses.length;


  task.status =
    statuses[nextIndex];

  task.completed =
    task.status ===
    "Completada";


  saveData();
  renderEverything();

}


function deleteTask(id) {

  if (
    !confirm(
      "¿Querés eliminar esta tarea?"
    )
  ) {
    return;
  }


  data.tasks =
    data.tasks.filter(
      task =>
        task.id !== id
    );


  saveData();
  renderEverything();

}


/* =====================================================
   CALCULADORAS
===================================================== */

function appendNormal(value) {

  const display =
    document.getElementById(
      "normalDisplay"
    );

  if (!display) return;


  if (display.value === "0") {
    display.value = value;
  } else {
    display.value += value;
  }

}


function clearNormal() {

  const display =
    document.getElementById(
      "normalDisplay"
    );

  if (display) {
    display.value = "0";
  }

}


function deleteNormal() {

  const display =
    document.getElementById(
      "normalDisplay"
    );

  if (!display) return;


  display.value =
    display.value.length > 1
      ? display.value.slice(0, -1)
      : "0";

}


function calculateNormal() {

  const display =
    document.getElementById(
      "normalDisplay"
    );

  if (!display) return;


  try {

    const expression =
      display.value.replace(
        /×/g,
        "*"
      );


    const result =
      Function(
        `"use strict"; return (${expression})`
      )();


    display.value =
      Number.isFinite(result)
        ? result
        : "Error";

  } catch {

    display.value =
      "Error";

  }

}


/* =====================================================
   CALCULADORA CIENTÍFICA
===================================================== */

function scientificAppend(value) {

  const display =
    document.getElementById(
      "scientificDisplay"
    );

  if (!display) return;


  if (display.value === "0") {
    display.value = value;
  } else {
    display.value += value;
  }

}


function scientificClear() {

  const display =
    document.getElementById(
      "scientificDisplay"
    );

  if (display) {
    display.value = "0";
  }

}


function scientificDelete() {

  const display =
    document.getElementById(
      "scientificDisplay"
    );

  if (!display) return;


  display.value =
    display.value.length > 1
      ? display.value.slice(0, -1)
      : "0";

}


function scientificFunction(type) {

  const display =
    document.getElementById(
      "scientificDisplay"
    );

  if (!display) return;


  const value =
    Number(display.value);


  if (Number.isNaN(value)) {

    display.value =
      "Error";

    return;

  }


  let result;


  switch (type) {

    case "sin":
      result =
        Math.sin(
          value *
          Math.PI /
          180
        );
      break;

    case "cos":
      result =
        Math.cos(
          value *
          Math.PI /
          180
        );
      break;

    case "tan":
      result =
        Math.tan(
          value *
          Math.PI /
          180
        );
      break;

    case "sqrt":
      result =
        Math.sqrt(value);
      break;

    case "log":
      result =
        Math.log10(value);
      break;

    case "ln":
      result =
        Math.log(value);
      break;

    default:
      result =
        value;

  }


  display.value =
    Number.isFinite(result)
      ? Number(
          result.toFixed(10)
        )
      : "Error";

}


function calculateScientific() {

  const display =
    document.getElementById(
      "scientificDisplay"
    );

  if (!display) return;


  try {

    const expression =
      display.value
        .replace(
          /×/g,
          "*"
        );


    const result =
      Function(
        `"use strict"; return (${expression})`
      )();


    display.value =
      Number.isFinite(result)
        ? result
        : "Error";

  } catch {

    display.value =
      "Error";

  }

}


function showCalculatorTab(
  tab,
  button
) {

  document
    .querySelectorAll(
      ".calculator-tab"
    )
    .forEach(item =>
      item.classList.remove(
        "active"
      )
    );


  document
    .querySelectorAll(
      ".calculator-panel"
    )
    .forEach(panel =>
      panel.classList.add(
        "hidden"
      )
    );


  if (button) {
    button.classList.add(
      "active"
    );
  }


  const panels = {

    normal:
      "normalCalculator",

    scientific:
      "scientificCalculator",

    conversion:
      "conversionCalculator"

  };


  document
    .getElementById(
      panels[tab]
    )
    ?.classList.remove(
      "hidden"
    );

}


/* =====================================================
   CONVERSIONES
===================================================== */

function convertMass() {

  const value =
    Number(
      document.getElementById(
        "massValue"
      ).value
    );


  const from =
    document.getElementById(
      "massFrom"
    ).value;


  const to =
    document.getElementById(
      "massTo"
    ).value;


  const factors = {

    mg: 0.000001,
    g: 0.001,
    kg: 1,
    t: 1000

  };


  const result =
    value *
    factors[from] /
    factors[to];


  document.getElementById(
    "massResult"
  ).textContent =
    `${result} ${to}`;

}


function convertLength() {

  const value =
    Number(
      document.getElementById(
        "lengthValue"
      ).value
    );


  const from =
    document.getElementById(
      "lengthFrom"
    ).value;


  const to =
    document.getElementById(
      "lengthTo"
    ).value;


  const factors = {

    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
    in: 0.0254,
    ft: 0.3048

  };


  const result =
    value *
    factors[from] /
    factors[to];


  document.getElementById(
    "lengthResult"
  ).textContent =
    `${result} ${to}`;

}


function convertArea() {

  const value =
    Number(
      document.getElementById(
        "areaValue"
      ).value
    );


  const from =
    document.getElementById(
      "areaFrom"
    ).value;


  const to =
    document.getElementById(
      "areaTo"
    ).value;


  const factors = {

    mm2: 0.000001,
    cm2: 0.0001,
    m2: 1,
    ha: 10000

  };


  const result =
    value *
    factors[from] /
    factors[to];


  document.getElementById(
    "areaResult"
  ).textContent =
    `${result} ${to}`;

}


function convertVolume() {

  const value =
    Number(
      document.getElementById(
        "volumeValue"
      ).value
    );


  const from =
    document.getElementById(
      "volumeFrom"
    ).value;


  const to =
    document.getElementById(
      "volumeTo"
    ).value;


  const factors = {

    cm3: 0.000001,
    l: 0.001,
    m3: 1

  };


  const result =
    value *
    factors[from] /
    factors[to];


  document.getElementById(
    "volumeResult"
  ).textContent =
    `${result} ${to}`;

}


function calculateWeight() {

  const mass =
    Number(
      document.getElementById(
        "weightValue"
      ).value
    );


  const weight =
    mass * 9.80665;


  document.getElementById(
    "weightResult"
  ).textContent =
    `${weight.toFixed(2)} N`;

}


function convertTemperature() {

  const value =
    Number(
      document.getElementById(
        "temperatureValue"
      ).value
    );


  const from =
    document.getElementById(
      "temperatureFrom"
    ).value;


  const to =
    document.getElementById(
      "temperatureTo"
    ).value;


  let celsius;


  if (from === "C") {
    celsius = value;
  }

  if (from === "F") {
    celsius =
      (value - 32) * 5 / 9;
  }

  if (from === "K") {
    celsius =
      value - 273.15;
  }


  let result;


  if (to === "C") {
    result = celsius;
  }

  if (to === "F") {
    result =
      celsius * 9 / 5 + 32;
  }

  if (to === "K") {
    result =
      celsius + 273.15;
  }


  document.getElementById(
    "temperatureResult"
  ).textContent =
    `${result.toFixed(2)} ${to}`;

}


/* =====================================================
   NOTIFICACIONES
===================================================== */

function renderNotifications() {

  const container =
    document.getElementById(
      "notificationsContainer"
    );

  if (!container) return;


  const notifications = [];


  const pendingTasks =
    data.tasks.filter(
      task =>
        task.status !== "Completada" &&
        task.completed !== true
    );


  if (pendingTasks.length) {

    notifications.push({
      type: "task",
      text:
        `Tenés ${pendingTasks.length} tarea(s) pendiente(s).`
    });

  }


  const lowStock =
    data.materials.filter(
      material =>
        material.status ===
        "Bajo stock"
    );


  if (lowStock.length) {

    notifications.push({
      type: "material",
      text:
        `${lowStock.length} material(es) tienen bajo stock.`
    });

  }


  const outOfStock =
    data.materials.filter(
      material =>
        material.status ===
        "Agotado"
    );


  if (outOfStock.length) {

    notifications.push({
      type: "warning",
      text:
        `${outOfStock.length} material(es) están agotados.`
    });

  }


  const today =
    new Date();


  const tomorrow =
    new Date(today);

  tomorrow.setDate(
    tomorrow.getDate() + 1
  );


  const tomorrowString =
    tomorrow.toISOString()
      .split("T")[0];


  const tomorrowEvents =
    data.events.filter(
      event =>
        event.date ===
        tomorrowString
    );


  if (tomorrowEvents.length) {

    notifications.push({
      type: "calendar",
      text:
        `Mañana tenés ${tomorrowEvents.length} actividad(es) programada(s).`
    });

  }


  if (!notifications.length) {

    container.innerHTML =
      `<p class="empty-message">
        No hay notificaciones nuevas.
      </p>`;

    return;

  }


  container.innerHTML =
    notifications.map(notification => `

      <div class="notification-item">

        <span class="notification-dot"></span>

        <p>
          ${escapeHTML(notification.text)}
        </p>

      </div>

    `).join("");

}


/* =====================================================
   DASHBOARD
===================================================== */

function renderDashboard() {

  const eventsContainer =
    document.getElementById(
      "dashboardEvents"
    );


  const tasksContainer =
    document.getElementById(
      "dashboardTasks"
    );


  if (eventsContainer) {

    const upcoming =
      [...data.events]
        .filter(event => {

          if (!event.date) {
            return false;
          }

          return new Date(event.date) >=
            new Date(
              new Date().toISOString()
                .split("T")[0]
            );

        })
        .sort(
          (a, b) =>
            new Date(a.date) -
            new Date(b.date)
        )
        .slice(0, 5);


    if (!upcoming.length) {

      eventsContainer.innerHTML =
        `<p class="empty-message">
          No hay actividades próximas.
        </p>`;

    } else {

      eventsContainer.innerHTML =
        upcoming.map(event => `

          <div class="dashboard-list-item">

            <div>

              <strong>
                ${escapeHTML(event.title)}
              </strong>

              <span>
                ${formatDate(event.date)}
                ${event.time ? ` • ${event.time}` : ""}
              </span>

            </div>

          </div>

        `).join("");

    }

  }


  if (tasksContainer) {

    const pending =
      data.tasks
        .filter(
          task =>
            task.status !== "Completada" &&
            task.completed !== true
        )
        .slice(0, 5);


    if (!pending.length) {

      tasksContainer.innerHTML =
        `<p class="empty-message">
          No hay tareas pendientes.
        </p>`;

    } else {

      tasksContainer.innerHTML =
        pending.map(task => `

          <div class="dashboard-list-item">

            <div>

              <strong>
                ${escapeHTML(task.title)}
              </strong>

              <span>
                ${escapeHTML(
                  task.status ||
                  "Pendiente"
                )}
              </span>

            </div>

          </div>

        `).join("");

    }

  }

}


/* =====================================================
   ESTADÍSTICAS
===================================================== */

function updateStats() {

  const statObras =
    document.getElementById(
      "statObras"
    );

  const statTareas =
    document.getElementById(
      "statTareas"
    );

  const statMateriales =
    document.getElementById(
      "statMateriales"
    );

  const statDocumentos =
    document.getElementById(
      "statDocumentos"
    );


  if (statObras) {
    statObras.textContent =
      data.works.length;
  }


  if (statTareas) {

    statTareas.textContent =
      data.tasks.filter(
        task =>
          task.status !== "Completada" &&
          task.completed !== true
      ).length;

  }


  if (statMateriales) {
    statMateriales.textContent =
      data.materials.length;
  }


  if (statDocumentos) {
    statDocumentos.textContent =
      data.documents.length;
  }

}


/* =====================================================
   BÚSQUEDA GLOBAL
===================================================== */

function globalSearch() {

  const input =
    document.getElementById(
      "globalSearch"
    );

  const resultsContainer =
    document.getElementById(
      "searchResults"
    );


  if (!input || !resultsContainer) {
    return;
  }


  const query =
    normalizeText(
      input.value.trim()
    );


  if (!query) {

    resultsContainer.classList.add(
      "hidden"
    );

    resultsContainer.innerHTML =
      "";

    return;

  }


  const results = [];


  data.works.forEach(work => {

    if (
      matchesSearch(
        query,
        work.name,
        work.location,
        work.status
      )
    ) {

      results.push({
        section: "obras",
        title: work.name,
        detail: work.location
      });

    }

  });


  data.tasks.forEach(task => {

    if (
      matchesSearch(
        query,
        task.title,
        task.work,
        task.status,
        task.priority,
        task.description
      )
    ) {

      results.push({
        section: "tareas",
        title: task.title,
        detail: task.work || "Tarea"
      });

    }

  });


  data.materials.forEach(material => {

    if (
      matchesSearch(
        query,
        material.name,
        material.category,
        material.work,
        material.supplier,
        material.status
      )
    ) {

      results.push({
        section: "materiales",
        title: material.name,
        detail:
          material.work ||
          material.category ||
          "Material"
      });

    }

  });


  data.documents.forEach(documentItem => {

    if (
      matchesSearch(
        query,
        documentItem.name,
        documentItem.work,
        documentItem.type,
        documentItem.description,
        documentItem.fileName
      )
    ) {

      results.push({
        section: "documentos",
        title: documentItem.name,
        detail:
          documentItem.type
      });

    }

  });


  data.purchases.forEach(purchase => {

    if (
      matchesSearch(
        query,
        purchase.product,
        purchase.work,
        purchase.supplier,
        purchase.description,
        purchase.receiptName
      )
    ) {

      results.push({
        section: "documentos",
        title:
          `Compra: ${purchase.product}`,
        detail:
          purchase.work
      });

    }

  });


  data.notes.forEach(note => {

    if (
      matchesSearch(
        query,
        note.title,
        note.work,
        note.progress,
        note.observations,
        note.difficulties
      )
    ) {

      results.push({
        section: "notas",
        title: note.title,
        detail:
          note.work ||
          "Nota o reporte"
      });

    }

  });


  if (!results.length) {

    resultsContainer.innerHTML =
      `<p class="search-empty">
        No se encontraron resultados.
      </p>`;

  } else {

    resultsContainer.innerHTML =
      results.slice(0, 8)
        .map(result => `

          <button
            class="search-result-item"
            onclick="openSearchResult('${result.section}')">

            <strong>
              ${escapeHTML(result.title)}
            </strong>

            <span>
              ${escapeHTML(result.detail || "")}
            </span>

          </button>

        `).join("");

  }


  resultsContainer.classList.remove(
    "hidden"
  );

}


function openSearchResult(section) {

  const input =
    document.getElementById(
      "globalSearch"
    );

  const results =
    document.getElementById(
      "searchResults"
    );


  if (input) {
    input.value = "";
  }


  if (results) {
    results.classList.add(
      "hidden"
    );
  }


  showSection(section);

}


function matchesSearch(
  query,
  ...values
) {

  return values.some(
    value =>
      normalizeText(
        String(value || "")
      ).includes(query)
  );

}


/* =====================================================
   MODALES
===================================================== */

function openModal(id) {

  const modal =
    document.getElementById(id);

  if (modal) {

    modal.classList.remove(
      "hidden"
    );

  }

}


function closeModal(id) {

  const modal =
    document.getElementById(id);

  if (modal) {

    modal.classList.add(
      "hidden"
    );

  }

}


document.addEventListener(
  "click",
  event => {

    if (
      event.target.classList.contains(
        "modal"
      )
    ) {

      event.target.classList.add(
        "hidden"
      );

    }

  }
);


/* =====================================================
   ARCHIVOS
===================================================== */

function fileToDataURL(file) {

  return new Promise(
    (resolve, reject) => {

      const reader =
        new FileReader();

      reader.onload =
        () => resolve(
          reader.result
        );

      reader.onerror =
        reject;

      reader.readAsDataURL(file);

    }
  );

}


function openFile(dataURL) {

  if (!dataURL) {
    return;
  }


  const windowRef =
    window.open(
      "",
      "_blank"
    );


  if (!windowRef) {

    alert(
      "El navegador bloqueó la ventana. Permití ventanas emergentes para ver el archivo."
    );

    return;

  }


  if (
    dataURL.startsWith(
      "data:image"
    )
  ) {

    windowRef.document.write(`

      <html>

      <head>
        <title>Archivo - ConstrucTools</title>
      </head>

      <body
        style="
          margin:0;
          padding:20px;
          display:flex;
          justify-content:center;
          align-items:center;
          min-height:100vh;
          background:#f1f5f9;
        ">

        <img
          src="${dataURL}"
          style="
            max-width:100%;
            max-height:90vh;
            object-fit:contain;
          ">

      </body>

      </html>

    `);

  } else {

    windowRef.location.href =
      dataURL;

  }

}


function downloadFile(
  dataURL,
  fileName
) {

  if (!dataURL) {
    return;
  }


  const link =
    document.createElement("a");

  link.href =
    dataURL;

  link.download =
    fileName ||
    "archivo";


  document.body.appendChild(
    link
  );

  link.click();

  link.remove();

}


/* =====================================================
   FUNCIONES AUXILIARES
===================================================== */

function formatMoney(value, currency = "PYG") {

  return new Intl.NumberFormat(
    "es-PY",
    {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0
    }
  ).format(
    Number(value) || 0
  );

}


function getWorkCurrency(workName) {

  const work =
    data.works.find(
      item =>
        normalizeText(item.name) ===
        normalizeText(workName)
    );

  return work?.currency || "PYG";

}


function formatDate(dateString) {

  if (!dateString) {
    return "Sin fecha";
  }


  const date =
    new Date(
      `${dateString}T00:00:00`
    );


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return dateString;
  }


  return date.toLocaleDateString(
    "es-PY",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }
  );

}


function normalizeText(text) {

  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    );

}


function escapeHTML(value) {

  return String(value || "")
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}


/* =====================================================
   RENDERIZAR TODO
===================================================== */

function renderEverything() {

  updateUserInterface();

  renderWorks();

  renderNotes();

  renderPhotos();

  renderCalendar();

  renderEvents();

  renderDocuments();

  renderPurchases();

  renderMaterials();

  renderTasks();

  renderDashboard();

  renderNotifications();

  updateStats();

}