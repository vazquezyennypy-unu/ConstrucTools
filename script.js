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
  const welcomeScreen = document.getElementById("welcomeScreen");
  const roleScreen = document.getElementById("roleScreen");

  if (welcomeScreen) {
    welcomeScreen.classList.add("hidden");
  }

  if (roleScreen) {
    roleScreen.classList.remove("hidden");
  }
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


let editingWorkId = null;

function saveWork(event) {
  event.preventDefault();

  const work = {
    name: document.getElementById("obraName").value.trim(),
    location: document.getElementById("obraLocation").value.trim(),
    status: document.getElementById("obraStatus").value,
    currency: document.getElementById("obraCurrency").value,
    budget: {
      estimated:
        Number(document.getElementById("obraBudget").value) || 0,
      labor:
        Number(document.getElementById("obraLabor").value) || 0,
      other:
        Number(document.getElementById("obraOtherExpenses").value) || 0
    }
  };

  if (editingWorkId !== null) {
    const existingWork = data.works.find(
      item => item.id === editingWorkId
    );

    if (!existingWork) {
      alert("No se encontró la obra que querés editar.");
      return;
    }

    existingWork.name = work.name;
    existingWork.location = work.location;
    existingWork.status = work.status;
    existingWork.currency = work.currency;
    existingWork.budget = work.budget;

    editingWorkId = null;
  } else {
    work.id = Date.now();
    data.works.push(work);
  }

  saveData();

  document.getElementById("obraForm").reset();
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
  const container = document.getElementById("worksContainer");

  if (!container) return;

  if (!data.works.length) {
    container.innerHTML = `
      <p class="empty-message">
        Todavía no hay obras registradas.
      </p>
    `;
    return;
  }

  container.innerHTML = data.works.map(work => {
    const budget = work.budget || {};

    const estimated = Number(budget.estimated || 0);
    const materialsCost = getWorkPurchasesTotal(work.name);
    const laborCost = Number(budget.labor || 0);
    const otherCost = Number(budget.other || 0);

    const spent = getWorkExpenses(work);
    const remaining = estimated - spent;
    const currency = work.currency || "PYG";

    const materialCount = data.materials.filter(
      material =>
        normalizeText(material.work) === normalizeText(work.name)
    ).length;

    const taskCount = data.tasks.filter(
      task =>
        normalizeText(task.work) === normalizeText(work.name)
    ).length;

    const documentCount = data.documents.filter(
      document =>
        normalizeText(document.work) === normalizeText(work.name)
    ).length;

    const purchaseCount = data.purchases.filter(
      purchase =>
        normalizeText(purchase.work) === normalizeText(work.name)
    ).length;

    return `
      <article class="work-card">

        <div class="work-card-cover">
          <div class="work-icon">CT</div>
        </div>

        <div class="work-card-body">

          <div class="work-card-top">
            <div>
              <h3>${escapeHTML(work.name)}</h3>
              <span class="status-badge">
                ${escapeHTML(work.status || "Sin estado")}
              </span>
            </div>

            <div class="work-card-actions">

          <button
             type="button"
             class="edit-button"
             onclick="editWork(${work.id})">
             Editar
          </button>

          <button
             type="button"
             class="delete-button"
             onclick="deleteWork(${work.id})">
             Eliminar
          </button>

        </div>
          </div>

          <p class="work-location">
            📍 ${escapeHTML(work.location || "Sin ubicación")}
          </p>

          <a
            class="map-link"
            href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(work.location || work.name)}"
            target="_blank"
            rel="noopener noreferrer">
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
              <strong>${formatMoney(estimated, currency)}</strong>
            </div>

            <div>
              <span>Total utilizado</span>
              <strong>${formatMoney(spent, currency)}</strong>
            </div>

            <div>
              <span>Saldo disponible</span>
              <strong class="${remaining < 0 ? "negative-value" : ""}">
                ${formatMoney(remaining, currency)}
              </strong>
            </div>
          </div>

          <details class="work-budget-details">
            <summary>Ver detalles del presupuesto</summary>

            <div class="work-budget-breakdown">
              <div>
                <span>Materiales y compras</span>
                <strong>${formatMoney(materialsCost, currency)}</strong>
              </div>

              <div>
                <span>Mano de obra</span>
                <strong>${formatMoney(laborCost, currency)}</strong>
              </div>

              <div>
                <span>Otros gastos</span>
                <strong>${formatMoney(otherCost, currency)}</strong>
              </div>

              <div class="work-budget-total">
                <span>Total de gastos</span>
                <strong>${formatMoney(spent, currency)}</strong>
              </div>

              <div>
                <span>Saldo restante</span>
                <strong class="${remaining < 0 ? "negative-value" : ""}">
                  ${formatMoney(remaining, currency)}
                </strong>
              </div>
            </div>
          </details>

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

function editWork(id) {
  const work = data.works.find(
    item => item.id === id
  );

  if (!work) {
    alert("No se encontró la obra.");
    return;
  }

  editingWorkId = work.id;

  document.getElementById("obraName").value =
    work.name || "";

  document.getElementById("obraLocation").value =
    work.location || "";

  document.getElementById("obraStatus").value =
    work.status || "";

  document.getElementById("obraCurrency").value =
    work.currency || "PYG";

  document.getElementById("obraBudget").value =
    work.budget?.estimated ?? 0;

  document.getElementById("obraLabor").value =
    work.budget?.labor ?? 0;

  document.getElementById("obraOtherExpenses").value =
    work.budget?.other ?? 0;

  const title = document.querySelector(
    "#obraModal h2, #obraModal h3"
  );

  if (title) {
    title.textContent = "Editar obra";
  }

  openModal("obraModal");
}


/* =====================================================
   NOTAS Y REPORTES SEMANALES
===================================================== */

async function saveNote(event) {
  event.preventDefault();

  const photoInput = document.getElementById("notePhoto");

  let photoData = "";
  let photoName = "";

  // Guardar fotografía opcional
  if (photoInput && photoInput.files && photoInput.files[0]) {
    const file = photoInput.files[0];

    if (file.size > 2 * 1024 * 1024) {
      alert("La fotografía debe pesar menos de 2 MB.");
      return;
    }

    photoData = await fileToDataURL(file);
    photoName = file.name;
  }

  // Obtener las actividades seleccionadas
  const activities = Array.from(
    document.querySelectorAll(
      'input[name="noteActivities"]:checked'
    )
  ).map(input => input.value);

  // Crear el reporte semanal
  const note = {
    id: Date.now(),

    title: document.getElementById("noteTitle").value.trim(),

    work: document.getElementById("noteWork").value.trim(),

    week: Number(document.getElementById("noteWeek").value),

    activities: activities,

    progress: document.getElementById("noteProgress").value.trim(),

    pending: document.getElementById("notePending").value.trim(),

    observations: document.getElementById("noteObservations").value.trim(),

    difficulties: document.getElementById("noteDifficulties").value.trim(),

    date: document.getElementById("noteDate").value,

    photoData,
    photoName
  };

  // Agregar y guardar el reporte
  data.notes.push(note);

  saveData();

  document.getElementById("noteForm").reset();

  closeModal("noteModal");

  renderEverything();
}


/* =====================================================
   MOSTRAR NOTAS Y REPORTES SEMANALES
===================================================== */


function renderNotes() {
  const container = document.getElementById("notesContainer");

  if (!container) return;

  if (!data.notes.length) {
    container.innerHTML = `
      <p class="empty-message">
        Todavía no hay notas o reportes registrados.
      </p>
    `;
    return;
  }

  // Agrupar los reportes por obra
  const groupedNotes = {};

  data.notes.forEach(note => {
    const workName = (note.work || "Sin obra asignada").trim();
    const key = normalizeText(workName);

    if (!groupedNotes[key]) {
      groupedNotes[key] = {
        name: workName,
        reports: []
      };
    }

    groupedNotes[key].reports.push(note);
  });

  container.innerHTML = Object.values(groupedNotes)
    .map(group => {
      const reports = group.reports.sort(
        (a, b) =>
          (Number(a.week) || 0) - (Number(b.week) || 0)
      );

      return `
        <article class="note-card">
          <div class="note-card-header">
            <div>
              <span class="note-date">REPORTES SEMANALES</span>
              <h3>${escapeHTML(group.name)}</h3>
              <p class="note-work">
                ${reports.length} reporte${reports.length === 1 ? "" : "s"} registrado${reports.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          <div class="grouped-weekly-reports">
            ${reports.map(note => `
              <details class="weekly-report-item">
                <summary>
                  <span>
                    Semana ${Number(note.week) > 0 ? Number(note.week) : "—"}
                    — ${escapeHTML(note.title || "Reporte semanal")}
                  </span>
                  <span>${escapeHTML(note.date || "Sin fecha")}</span>
                </summary>

                <div class="weekly-report-content">
                  ${
                    note.activities && note.activities.length
                      ? `
                        <div class="note-activities-summary">
                          <strong>Actividades realizadas</strong>
                          <ul>
                            ${note.activities.map(activity => `
                              <li>${escapeHTML(activity)}</li>
                            `).join("")}
                          </ul>
                        </div>
                      `
                      : ""
                  }

                  <div class="note-sections">
                    <div>
                      <strong>Avances realizados</strong>
                      <p>${escapeHTML(note.progress || "Sin registrar")}</p>
                    </div>

                    <div>
                      <strong>Pendientes y próximos trabajos</strong>
                      <p>${escapeHTML(note.pending || "Sin registrar")}</p>
                    </div>

                    <div>
                      <strong>Observaciones</strong>
                      <p>${escapeHTML(note.observations || "Sin registrar")}</p>
                    </div>

                    <div>
                      <strong>Dificultades</strong>
                      <p>${escapeHTML(note.difficulties || "Sin registrar")}</p>
                    </div>
                  </div>

                  ${
                    note.photoData
                      ? `
                        <div class="note-photo">
                          <img src="${note.photoData}" alt="Fotografía del reporte semanal">
                        </div>
                      `
                      : ""
                  }

                  <button
                    type="button"
                    class="delete-button"
                    onclick="deleteNote(${note.id})">
                    Eliminar este reporte
                  </button>
                </div>
              </details>
            `).join("")}
          </div>
        </article>
      `;
    })
    .join("");
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
   CONECTAR OBRAS CON LOS SELECTORES
===================================================== */

function updateWorkSelect(selectId, placeholder) {
  const select = document.getElementById(selectId);

  if (!select) return;

  const selectedWork = select.value;

  select.innerHTML = "";

  const firstOption = document.createElement("option");
  firstOption.value = "";
  firstOption.textContent = placeholder;
  select.appendChild(firstOption);

  data.works.forEach(work => {
    const option = document.createElement("option");

    option.value = work.name;
    option.textContent = work.name;

    select.appendChild(option);
  });

  // Conservar la selección si la obra sigue existiendo
  if (
    [...select.options].some(
      option => option.value === selectedWork
    )
  ) {
    select.value = selectedWork;
  }
}

function updateTaskWorkOptions() {
  updateWorkSelect(
    "taskWork",
    "Seleccioná una obra"
  );
}

function updateNoteWorkOptions() {
  updateWorkSelect(
    "noteWork",
    "Seleccioná una obra"
  );
}

function updateMaterialWorkOptions() {
  updateWorkSelect(
    "materialWork",
    "Seleccioná una obra"
  );
}

function updateDocumentWorkOptions() {
  updateWorkSelect(
    "documentWork",
    "Seleccioná una obra"
  );
}

function updateEventWorkOptions() {
  updateWorkSelect(
    "eventWork",
    "Seleccioná una obra"
  );
}

function updatePhotoWorkOptions() {
  updateWorkSelect(
    "photoWork",
    "Seleccioná una obra"
  );
}

function updatePurchaseWorkOptions() {
  updateWorkSelect(
    "purchaseWork",
    "Seleccioná una obra"
  );
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



function showCalculatorTab(tab, button) {
  document
    .querySelectorAll(".calculator-tab")
    .forEach(item => {
      item.classList.remove("active");
    });

  document
    .querySelectorAll(".calculator-panel")
    .forEach(panel => {
      panel.classList.add("hidden");
    });

  if (button) {
    button.classList.add("active");
  }

  const panels = {
    normal: "normalCalculator",
    scientific: "scientificCalculator",
    conversion: "conversionCalculator",
    metric: "metricCalculator"
  };

  const selectedPanel = document.getElementById(panels[tab]);

  if (selectedPanel) {
    selectedPanel.classList.remove("hidden");
  }
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

  updateTaskWorkOptions();

  updateNoteWorkOptions();

  updateMaterialWorkOptions();

  updateDocumentWorkOptions();

  updateEventWorkOptions();

  updatePhotoWorkOptions();

  updatePurchaseWorkOptions();

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


function viewWorkReports(workId) {
    const work = data.works.find(
        item => item.id === workId
    );

    if (!work) {
        alert("No se encontró la obra.");
        return;
    }

    const reports = data.notes
        .filter(
            note =>
                normalizeText(note.work) ===
                normalizeText(work.name)
        )
        .sort(
            (a, b) =>
                (Number(a.week) || 0) -
                (Number(b.week) || 0)
        );

    const worksContainer = document.getElementById("worksContainer");
    const reportsView = document.getElementById("workReportsView");
    const reportsTitle = document.getElementById("workReportsTitle");
    const reportsContainer = document.getElementById("workReportsContainer");

    if (!worksContainer || !reportsView || !reportsTitle || !reportsContainer) {
        alert("No se encontró el espacio para mostrar los reportes.");
        return;
    }

    reportsTitle.textContent = `Reportes semanales: ${work.name}`;

    if (reports.length === 0) {
        reportsContainer.innerHTML = `
            <div class="empty-state">
                <h3>Todavía no hay reportes</h3>
                <p>Registrá un reporte semanal para esta obra y aparecerá aquí.</p>
            </div>
        `;
    } else {
        reportsContainer.innerHTML = reports.map(note => {
            const activities = note.activities?.length
                ? note.activities
                    .map(activity => escapeHTML(activity))
                    .join(", ")
                : "Sin actividades seleccionadas";

            const photo = note.photoData
                ? `
                    <div class="work-report-photo">
                        <img
                            src="${note.photoData}"
                            alt="Fotografía del reporte semanal">
                    </div>
                `
                : "";

            return `
                <article class="work-report-card">
                    <div class="work-report-header">
                        <div>
                            <span class="section-kicker">SEGUIMIENTO SEMANAL</span>
                            <h3>${escapeHTML(note.title || "Reporte semanal")}</h3>
                        </div>
                        <span class="work-report-week">
                            Semana ${escapeHTML(note.week || "—")}
                        </span>
                    </div>

                    <p class="work-report-date">
                        <strong>Fecha:</strong>
                        ${escapeHTML(note.date || "Sin fecha")}
                    </p>

                    <div class="work-report-activities">
                        <strong>Actividades realizadas</strong>
                        <p>${activities}</p>
                    </div>

                    <div class="work-report-sections">
                        <div>
                            <h4>Avances</h4>
                            <p>${escapeHTML(note.progress || "Sin registrar")}</p>
                        </div>

                        <div>
                            <h4>Pendientes</h4>
                            <p>${escapeHTML(note.pending || "Sin registrar")}</p>
                        </div>

                        <div>
                            <h4>Observaciones</h4>
                            <p>${escapeHTML(note.observations || "Sin registrar")}</p>
                        </div>

                        <div>
                            <h4>Dificultades</h4>
                            <p>${escapeHTML(note.difficulties || "Sin registrar")}</p>
                        </div>
                    </div>

                    ${photo}
                </article>
            `;
        }).join("");
    }

    worksContainer.classList.add("hidden");
    reportsView.classList.remove("hidden");
}

function closeWorkReports() {
    document.getElementById("workReportsView")?.classList.add("hidden");
    document.getElementById("worksContainer")?.classList.remove("hidden");
}


/* =========================================
   CÓMPUTO MÉTRICO
========================================= */

// Calcula metros lineales
function calculateMetricLength() {
  const length = Number(
    document.getElementById("metricLength").value
  );

  const quantity = Number(
    document.getElementById("metricLengthQuantity").value
  );

  const result = document.getElementById("metricLengthResult");

  if (
    document.getElementById("metricLength").value === "" ||
    document.getElementById("metricLengthQuantity").value === "" ||
    !Number.isFinite(length) ||
    !Number.isInteger(quantity) ||
    length <= 0 ||
    quantity <= 0
  ) {
    result.textContent = "Ingresá una longitud y una cantidad válidas.";
    return;
  }

  const total = length * quantity;

  result.textContent =
    "Total: " + total.toLocaleString("es-PY", {
      maximumFractionDigits: 3
    }) + " m lineales";
}


// Calcula metros cuadrados
function calculateMetricArea() {
  const length = Number(
    document.getElementById("metricAreaLength").value
  );

  const width = Number(
    document.getElementById("metricAreaWidth").value
  );

  const quantity = Number(
    document.getElementById("metricAreaQuantity").value
  );

  const result = document.getElementById("metricAreaResult");

  if (
    document.getElementById("metricAreaLength").value === "" ||
    document.getElementById("metricAreaWidth").value === "" ||
    document.getElementById("metricAreaQuantity").value === "" ||
    !Number.isFinite(length) ||
    !Number.isFinite(width) ||
    !Number.isInteger(quantity) ||
    length <= 0 ||
    width <= 0 ||
    quantity <= 0
  ) {
    result.textContent = "Ingresá medidas y una cantidad válidas.";
    return;
  }

  const total = length * width * quantity;

  result.textContent =
    "Superficie total: " + total.toLocaleString("es-PY", {
      maximumFractionDigits: 3
    }) + " m²";
}


// Calcula metros cúbicos
function calculateMetricVolume() {
  const length = Number(
    document.getElementById("metricVolumeLength").value
  );

  const width = Number(
    document.getElementById("metricVolumeWidth").value
  );

  const height = Number(
    document.getElementById("metricVolumeHeight").value
  );

  const quantity = Number(
    document.getElementById("metricVolumeQuantity").value
  );

  const result = document.getElementById("metricVolumeResult");

  if (
    document.getElementById("metricVolumeLength").value === "" ||
    document.getElementById("metricVolumeWidth").value === "" ||
    document.getElementById("metricVolumeHeight").value === "" ||
    document.getElementById("metricVolumeQuantity").value === "" ||
    !Number.isFinite(length) ||
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    !Number.isInteger(quantity) ||
    length <= 0 ||
    width <= 0 ||
    height <= 0 ||
    quantity <= 0
  ) {
    result.textContent = "Ingresá medidas y una cantidad válidas.";
    return;
  }

  const total = length * width * height * quantity;

  result.textContent =
    "Volumen total: " + total.toLocaleString("es-PY", {
      maximumFractionDigits: 3
    }) + " m³";
}
