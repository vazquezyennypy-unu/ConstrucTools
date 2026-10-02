/* =====================================================
   CONSTRUC TOOLS
   JavaScript principal
===================================================== */


/* =====================================================
   DATOS
===================================================== */

let data = {
    user: {
        name: "",
        email: "",
        role: "",
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
    tasks: []
};


let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let currentTaskFilter = "all";


/* =====================================================
   INICIO
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    loadData();

    document
        .getElementById("loginForm")
        .addEventListener("submit", login);

    document
        .getElementById("registerForm")
        .addEventListener("submit", register);

    document
        .getElementById("accountForm")
        .addEventListener("submit", saveAccount);

    document
        .getElementById("obraForm")
        .addEventListener("submit", saveWork);

    document
        .getElementById("noteForm")
        .addEventListener("submit", saveNote);

    document
        .getElementById("eventForm")
        .addEventListener("submit", saveEvent);

    document
        .getElementById("documentForm")
        .addEventListener("submit", saveDocument);

    document
        .getElementById("materialForm")
        .addEventListener("submit", saveMaterial);

    document
        .getElementById("taskForm")
        .addEventListener("submit", saveTask);


    if (localStorage.getItem("construcToolsLogged") === "true") {

        showApp();

    } else {

        document
            .getElementById("welcomeScreen")
            .classList.remove("hidden");

        document
            .getElementById("roleScreen")
            .classList.add("hidden");

    }


    renderEverything();

});


/* =====================================================
   PANTALLA DE BIENVENIDA
===================================================== */

function startConstrucTools() {

    document
        .getElementById("welcomeScreen")
        .classList.add("hidden");

    document
        .getElementById("roleScreen")
        .classList.remove("hidden");

}


/* =====================================================
   LOCAL STORAGE
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

            works: parsed.works || [],
            notes: parsed.notes || [],
            events: parsed.events || [],
            documents: parsed.documents || [],
            materials: parsed.materials || [],
            tasks: parsed.tasks || []
        };

    } catch (error) {

        console.error(
            "No se pudieron cargar los datos.",
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

        return true;

    } catch (error) {

        console.error(error);

        alert(
            "No se pudieron guardar los datos. " +
            "Es posible que algún archivo sea demasiado grande."
        );

        return false;
    }

}


/* =====================================================
   ROLES
===================================================== */
function startConstrucTools() {

    document
        .getElementById("welcomeScreen")
        .classList.add("hidden");

    document
        .getElementById("roleScreen")
        .classList.remove("hidden");

}
function selectRole(role) {

    data.user.role = role;

    saveData();

    document
        .getElementById("roleScreen")
        .classList.add("hidden");

    document
        .getElementById("loginScreen")
        .classList.remove("hidden");

}


function showRegister() {

    document
        .getElementById("loginScreen")
        .classList.add("hidden");

    document
        .getElementById("registerScreen")
        .classList.remove("hidden");

}


function showLogin() {

    document
        .getElementById("registerScreen")
        .classList.add("hidden");

    document
        .getElementById("loginScreen")
        .classList.remove("hidden");

}


/* =====================================================
   REGISTRO
===================================================== */

function register(event) {

    event.preventDefault();

    const name =
        document
            .getElementById("registerName")
            .value.trim();

    const email =
        document
            .getElementById("registerEmail")
            .value.trim();

    const password =
        document
            .getElementById("registerPassword")
            .value;

    const project =
        document
            .getElementById("registerProject")
            .value.trim();


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


    document
        .getElementById("registerForm")
        .reset();


    showApp();

}


/* =====================================================
   LOGIN
===================================================== */

function login(event) {

    event.preventDefault();

    const email =
        document
            .getElementById("loginEmail")
            .value.trim();

    const password =
        document
            .getElementById("loginPassword")
            .value;


    if (!data.user.email) {

        alert(
            "Todavía no existe una cuenta. Registrate primero."
        );

        return;

    }


    if (
        email !== data.user.email ||
        password !== data.user.password
    ) {

        alert(
            "El correo o la contraseña no son correctos."
        );

        return;

    }


    localStorage.setItem(
        "construcToolsLogged",
        "true"
    );

    showApp();

}


/* =====================================================
   MOSTRAR APP
===================================================== */

function showApp() {

    document
        .getElementById("welcomeScreen")
        .classList.add("hidden");

    document
        .getElementById("roleScreen")
        .classList.add("hidden");

    document
        .getElementById("loginScreen")
        .classList.add("hidden");

    document
        .getElementById("registerScreen")
        .classList.add("hidden");

    document
        .getElementById("app")
        .classList.remove("hidden");


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
        .classList.add("hidden");

    document
        .getElementById("loginScreen")
        .classList.remove("hidden");

}


/* =====================================================
   NAVEGACIÓN
===================================================== */

function showSection(sectionId, button = null) {

    const sections =
        document.querySelectorAll(".content-section");

    sections.forEach(section => {

        section.classList.remove(
            "active-section"
        );

    });


    const selected =
        document.getElementById(sectionId);

    if (selected) {

        selected.classList.add(
            "active-section"
        );

    }


    const buttons =
        document.querySelectorAll(".menu-item");

    buttons.forEach(item => {

        item.classList.remove("active");

    });


    if (button) {

        button.classList.add("active");

    } else {

        buttons.forEach(item => {

            if (
                item
                    .getAttribute("onclick")
                    ?.includes(sectionId)
            ) {

                item.classList.add("active");

            }

        });

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


    document
        .getElementById("pageTitle")
        .textContent =
        titles[sectionId] || "ConstrucTools";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   USUARIO
===================================================== */

function updateUserInterface() {

    const name =
        data.user.name || "Usuario";

    const role =
        data.user.role || "Estudiante";


    document
        .getElementById("profileName")
        .textContent = name;


    document
        .getElementById("accountHeaderName")
        .textContent = name;


    document
        .getElementById("accountHeaderRole")
        .textContent = role;


    document
        .getElementById("welcomeText")
        .textContent =
        `Bienvenido/a, ${name}`;


    const firstLetter =
        name.charAt(0).toUpperCase() || "U";


    document
        .getElementById("accountAvatar")
        .textContent = firstLetter;


    document
        .getElementById("accountName")
        .value =
        data.user.name || "";


    document
        .getElementById("accountEmail")
        .value =
        data.user.email || "";


    document
        .getElementById("accountRole")
        .value =
        data.user.role || "Estudiante";


    document
        .getElementById("accountType")
        .value =
        data.user.accountType || "Estudiante";


    document
        .getElementById("accountProject")
        .value =
        data.user.project || "";


    document
        .getElementById("accountPreferences")
        .value =
        data.user.preferences || "";

}


/* =====================================================
   CUENTA
===================================================== */

function saveAccount(event) {

    event.preventDefault();

    data.user.name =
        document
            .getElementById("accountName")
            .value.trim();

    data.user.email =
        document
            .getElementById("accountEmail")
            .value.trim();

    data.user.role =
        document
            .getElementById("accountRole")
            .value;

    data.user.accountType =
        document
            .getElementById("accountType")
            .value;

    data.user.project =
        document
            .getElementById("accountProject")
            .value.trim();

    data.user.preferences =
        document
            .getElementById("accountPreferences")
            .value.trim();


    saveData();

    updateUserInterface();

    alert(
        "Los cambios se guardaron correctamente."
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
            document
                .getElementById("obraName")
                .value.trim(),

        location:
            document
                .getElementById("obraLocation")
                .value.trim(),

        status:
            document
                .getElementById("obraStatus")
                .value

    };


    data.works.push(work);

    saveData();

    document
        .getElementById("obraForm")
        .reset();

    closeModal("obraModal");

    renderWorks();

    updateStats();

}


function getWorkStatusClass(status) {

    if (status === "Planificación") {
        return "status-planificacion";
    }

    if (status === "En progreso") {
        return "status-progreso";
    }

    if (status === "Finalizada") {
        return "status-finalizada";
    }

    return "";

}


function renderWorks() {

    const container =
        document.getElementById("worksContainer");


    if (!data.works.length) {

        container.innerHTML = `
            <div class="panel">
                <p class="empty-message">
                    Todavía no tenés obras registradas.
                </p>
            </div>
        `;

        return;
    }


    container.innerHTML =
        data.works.map(work => {

            const mapUrl =
                "https://www.google.com/maps/search/?api=1&query=" +
                encodeURIComponent(work.location);

            const initial =
                escapeHTML(
                    (work.name || "O")
                        .charAt(0)
                        .toUpperCase()
                );

            return `

                <div class="work-card">

                    <div class="work-card-cover"></div>

                    <div class="work-icon">
                        ${initial}
                    </div>

                    <h3>
                        ${escapeHTML(work.name)}
                    </h3>

                    <p class="work-location">
                        <strong>Ubicación:</strong>
                        ${escapeHTML(work.location)}
                    </p>

                    <a
                        class="map-link"
                        href="${mapUrl}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Ver ubicación
                    </a>

                    <br>

                    <span class="status ${getWorkStatusClass(work.status)}">
                        ${escapeHTML(work.status)}
                    </span>

                    <div class="card-actions">

                        <button
                            class="delete-button"
                            onclick="deleteWork(${work.id})"
                        >
                            Eliminar
                        </button>

                    </div>

                </div>

            `;

        }).join("");

}


function deleteWork(id) {

    if (!confirm("¿Eliminar esta obra?")) {
        return;
    }

    data.works =
        data.works.filter(
            work => work.id !== id
        );

    saveData();

    renderWorks();

    updateStats();

}


/* =====================================================
   NOTAS
===================================================== */

function saveNote(event) {

    event.preventDefault();

    const note = {

        id: Date.now(),

        title:
            document
                .getElementById("noteTitle")
                .value.trim(),

        work:
            document
                .getElementById("noteWork")
                .value.trim(),

        progress:
            document
                .getElementById("noteProgress")
                .value.trim(),

        pending:
            document
                .getElementById("notePending")
                .value.trim(),

        observations:
            document
                .getElementById("noteObservations")
                .value.trim(),

        difficulties:
            document
                .getElementById("noteDifficulties")
                .value.trim(),

        date:
            document
                .getElementById("noteDate")
                .value

    };


    data.notes.push(note);

    saveData();

    document
        .getElementById("noteForm")
        .reset();

    closeModal("noteModal");

    renderNotes();

}


function renderNotes() {

    const container =
        document.getElementById("notesContainer");


    if (!data.notes.length) {

        container.innerHTML = `
            <div class="panel">
                <p class="empty-message">
                    Todavía no hay notas o reportes.
                </p>
            </div>
        `;

        return;
    }


    container.innerHTML =
        data.notes.map(note => `

            <div class="note-card">

                <div class="note-card-header">

                    <div>

                        <h3>
                            ${escapeHTML(note.title)}
                        </h3>

                        <span class="note-date">
                            ${escapeHTML(note.date || "")}
                        </span>

                    </div>

                    <button
                        class="delete-button"
                        onclick="deleteNote(${note.id})"
                    >
                        Eliminar
                    </button>

                </div>


                ${
                    note.work
                    ? `
                    <div class="note-block">
                        <strong>Obra</strong>
                        <p>${escapeHTML(note.work)}</p>
                    </div>
                    `
                    : ""
                }


                <div class="note-block">
                    <strong>Avances</strong>
                    <p>
                        ${escapeHTML(
                            note.progress ||
                            "Sin registrar."
                        )}
                    </p>
                </div>


                <div class="note-block">
                    <strong>Pendientes</strong>
                    <p>
                        ${escapeHTML(
                            note.pending ||
                            "Sin registrar."
                        )}
                    </p>
                </div>


                <div class="note-block">
                    <strong>Observaciones</strong>
                    <p>
                        ${escapeHTML(
                            note.observations ||
                            "Sin registrar."
                        )}
                    </p>
                </div>


                <div class="note-block">
                    <strong>Dificultades</strong>
                    <p>
                        ${escapeHTML(
                            note.difficulties ||
                            "Sin registrar."
                        )}
                    </p>
                </div>

            </div>

        `).join("");

}


function deleteNote(id) {

    if (!confirm("¿Eliminar esta nota?")) {
        return;
    }

    data.notes =
        data.notes.filter(
            note => note.id !== id
        );

    saveData();

    renderNotes();

}


/* =====================================================
   CALCULADORA NORMAL
===================================================== */

function appendNormal(value) {

    const display =
        document.getElementById("normalDisplay");


    if (
        display.value === "0" ||
        display.value === "Error"
    ) {

        display.value = value;

    } else {

        display.value += value;

    }

}


function clearNormal() {

    document
        .getElementById("normalDisplay")
        .value = "0";

}


function deleteNormal() {

    const display =
        document.getElementById("normalDisplay");


    if (display.value === "Error") {

        display.value = "0";

        return;
    }


    display.value =
        display.value.length > 1
        ? display.value.slice(0, -1)
        : "0";

}


function calculateNormal() {

    const display =
        document.getElementById("normalDisplay");


    try {

        if (
            !/^[0-9+\-*/.() ]+$/.test(
                display.value
            )
        ) {

            throw new Error();

        }


        display.value =
            Function(
                `"use strict"; return (${display.value})`
            )();

    } catch {

        display.value = "Error";

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


    if (
        display.value === "0" ||
        display.value === "Error"
    ) {

        display.value = value;

    } else {

        display.value += value;

    }

}


function scientificClear() {

    document
        .getElementById("scientificDisplay")
        .value = "0";

}


function scientificDelete() {

    const display =
        document.getElementById(
            "scientificDisplay"
        );


    if (display.value === "Error") {

        display.value = "0";

        return;

    }


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


    const value =
        parseFloat(display.value);


    if (isNaN(value)) {

        display.value = "Error";

        return;

    }


    let result;


    switch (type) {

        case "sin":
            result = Math.sin(value);
            break;

        case "cos":
            result = Math.cos(value);
            break;

        case "tan":
            result = Math.tan(value);
            break;

        case "sqrt":
            result = Math.sqrt(value);
            break;

        case "log":
            result = Math.log10(value);
            break;

        case "ln":
            result = Math.log(value);
            break;

        default:
            result = value;

    }


    display.value = result;

}


function calculateScientific() {

    const display =
        document.getElementById(
            "scientificDisplay"
        );


    try {

        if (
            !/^[0-9+\-*/.() ]+$/.test(
                display.value
            )
        ) {

            throw new Error();

        }


        display.value =
            Function(
                `"use strict"; return (${display.value})`
            )();

    } catch {

        display.value = "Error";

    }

}


/* =====================================================
   PESTAÑAS CALCULADORA
===================================================== */

function showCalculatorTab(tab, button) {

    document
        .getElementById("normalCalculator")
        .classList.add("hidden");

    document
        .getElementById("scientificCalculator")
        .classList.add("hidden");

    document
        .getElementById("conversionCalculator")
        .classList.add("hidden");


    document
        .querySelectorAll(".calculator-tab")
        .forEach(btn => {

            btn.classList.remove("active");

        });


    button.classList.add("active");


    if (tab === "normal") {

        document
            .getElementById("normalCalculator")
            .classList.remove("hidden");

    }


    if (tab === "scientific") {

        document
            .getElementById("scientificCalculator")
            .classList.remove("hidden");

    }


    if (tab === "conversion") {

        document
            .getElementById("conversionCalculator")
            .classList.remove("hidden");

    }

}


/* =====================================================
   CONVERSIONES
===================================================== */

function convertMass() {

    const value =
        parseFloat(
            document.getElementById("massValue").value
        );


    if (isNaN(value)) {

        showResult(
            "massResult",
            "Ingresá un valor."
        );

        return;

    }


    const from =
        document.getElementById("massFrom").value;

    const to =
        document.getElementById("massTo").value;


    const units = {

        mg: 0.000001,
        g: 0.001,
        kg: 1,
        t: 1000

    };


    const kg =
        value * units[from];

    const result =
        kg / units[to];


    showResult(
        "massResult",
        `${formatNumber(result)} ${to}`
    );

}


function convertLength() {

    const value =
        parseFloat(
            document.getElementById("lengthValue").value
        );


    if (isNaN(value)) {

        showResult(
            "lengthResult",
            "Ingresá un valor."
        );

        return;

    }


    const from =
        document.getElementById("lengthFrom").value;

    const to =
        document.getElementById("lengthTo").value;


    const units = {

        mm: 0.001,
        cm: 0.01,
        m: 1,
        km: 1000,
        in: 0.0254,
        ft: 0.3048

    };


    const meters =
        value * units[from];

    const result =
        meters / units[to];


    showResult(
        "lengthResult",
        `${formatNumber(result)} ${to}`
    );

}


function convertArea() {

    const value =
        parseFloat(
            document.getElementById("areaValue").value
        );


    if (isNaN(value)) {

        showResult(
            "areaResult",
            "Ingresá un valor."
        );

        return;

    }


    const from =
        document.getElementById("areaFrom").value;

    const to =
        document.getElementById("areaTo").value;


    const units = {

        mm2: 0.000001,
        cm2: 0.0001,
        m2: 1,
        ha: 10000

    };


    const m2 =
        value * units[from];

    const result =
        m2 / units[to];


    showResult(
        "areaResult",
        `${formatNumber(result)} ${to}`
    );

}


function convertVolume() {

    const value =
        parseFloat(
            document.getElementById("volumeValue").value
        );


    if (isNaN(value)) {

        showResult(
            "volumeResult",
            "Ingresá un valor."
        );

        return;

    }


    const from =
        document.getElementById("volumeFrom").value;

    const to =
        document.getElementById("volumeTo").value;


    const units = {

        cm3: 0.000001,
        l: 0.001,
        m3: 1

    };


    const m3 =
        value * units[from];

    const result =
        m3 / units[to];


    showResult(
        "volumeResult",
        `${formatNumber(result)} ${to}`
    );

}


function calculateWeight() {

    const mass =
        parseFloat(
            document.getElementById("weightValue").value
        );


    if (isNaN(mass)) {

        showResult(
            "weightResult",
            "Ingresá una masa en kg."
        );

        return;

    }


    const gravity = 9.81;

    const force =
        mass * gravity;


    showResult(
        "weightResult",
        `${formatNumber(force)} N`
    );

}


function convertTemperature() {

    const value =
        parseFloat(
            document
                .getElementById("temperatureValue")
                .value
        );


    if (isNaN(value)) {

        showResult(
            "temperatureResult",
            "Ingresá un valor."
        );

        return;

    }


    const from =
        document
            .getElementById("temperatureFrom")
            .value;

    const to =
        document
            .getElementById("temperatureTo")
            .value;


    let celsius;


    if (from === "C") {

        celsius = value;

    } else if (from === "F") {

        celsius =
            (value - 32) * 5 / 9;

    } else {

        celsius =
            value - 273.15;

    }


    let result;


    if (to === "C") {

        result = celsius;

    } else if (to === "F") {

        result =
            celsius * 9 / 5 + 32;

    } else {

        result =
            celsius + 273.15;

    }


    showResult(
        "temperatureResult",
        `${formatNumber(result)} °${to}`
    );

}


function showResult(id, text) {

    document
        .getElementById(id)
        .textContent = text;

}


function formatNumber(number) {

    return Number(
        number.toFixed(6)
    );

}


/* =====================================================
   CALENDARIO
===================================================== */

function saveEvent(event) {

    event.preventDefault();


    const newEvent = {

        id: Date.now(),

        title:
            document
                .getElementById("eventTitle")
                .value.trim(),

        date:
            document
                .getElementById("eventDate")
                .value,

        description:
            document
                .getElementById("eventDescription")
                .value.trim()

    };


    data.events.push(newEvent);

    saveData();

    document
        .getElementById("eventForm")
        .reset();

    closeModal("eventModal");


    const eventDate =
        new Date(
            newEvent.date + "T00:00:00"
        );

    currentMonth =
        eventDate.getMonth();

    currentYear =
        eventDate.getFullYear();


    renderCalendar();

    renderEvents();

    updateStats();

}


function changeMonth(amount) {

    currentMonth += amount;


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


function getEventsForDate(dateString) {

    return data.events.filter(
        event =>
            event.date === dateString
    );

}


function renderCalendar() {

    const grid =
        document.getElementById(
            "calendarGrid"
        );

    const monthTitle =
        document.getElementById(
            "calendarMonth"
        );


    const date =
        new Date(
            currentYear,
            currentMonth,
            1
        );


    const monthName =
        date.toLocaleDateString(
            "es-ES",
            {
                month: "long",
                year: "numeric"
            }
        );


    monthTitle.textContent =
        monthName.charAt(0).toUpperCase() +
        monthName.slice(1);


    const firstDay =
        date.getDay();


    const daysInMonth =
        new Date(
            currentYear,
            currentMonth + 1,
            0
        ).getDate();


    let html = "";


    const names = [
        "Dom",
        "Lun",
        "Mar",
        "Mié",
        "Jue",
        "Vie",
        "Sáb"
    ];


    names.forEach(name => {

        html += `
            <div class="calendar-day-name">
                ${name}
            </div>
        `;

    });


    for (
        let i = 0;
        i < firstDay;
        i++
    ) {

        html += `<div></div>`;

    }


    const today = new Date();


    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const dateString =
            `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;


        const dayEvents =
            getEventsForDate(dateString);


        const hasEvent =
            dayEvents.length > 0;


        const isToday =
            today.getFullYear() === currentYear &&
            today.getMonth() === currentMonth &&
            today.getDate() === day;


        const firstEvent =
            dayEvents[0];


        html += `

            <div
                class="
                    calendar-day
                    ${isToday ? "today" : ""}
                    ${hasEvent ? "has-event" : ""}
                "
                title="${
                    hasEvent
                    ? escapeHTML(
                        dayEvents
                            .map(item => item.title)
                            .join(", ")
                    )
                    : ""
                }"
            >

                <span class="calendar-number">
                    ${day}
                </span>

                ${
                    hasEvent
                    ? `
                        <span class="calendar-event-badge">
                            ${escapeHTML(
                                firstEvent.title
                            )}
                        </span>

                        ${
                            dayEvents.length > 1
                            ? `
                                <span class="calendar-event-count">
                                    +${dayEvents.length - 1} más
                                </span>
                            `
                            : ""
                        }
                    `
                    : ""
                }

            </div>

        `;

    }


    grid.innerHTML = html;

}


function formatDate(dateString) {

    if (!dateString) {
        return "";
    }

    const parts =
        dateString.split("-");

    if (parts.length !== 3) {
        return dateString;
    }

    return `${parts[2]}/${parts[1]}/${parts[0]}`;

}


function renderEvents() {

    const container =
        document.getElementById(
            "eventsContainer"
        );


    if (!data.events.length) {

        container.innerHTML = `
            <p class="empty-message">
                No hay actividades registradas.
            </p>
        `;

        return;
    }


    const sorted =
        [...data.events].sort(
            (a, b) =>
                a.date.localeCompare(b.date)
        );


    container.innerHTML =
        sorted.map(event => `

            <div class="event-list-item">

                <strong>
                    ${escapeHTML(event.title)}
                </strong>

                <span>
                    ${escapeHTML(
                        formatDate(event.date)
                    )}
                </span>

                ${
                    event.description
                    ? `
                    <p>
                        ${escapeHTML(
                            event.description
                        )}
                    </p>
                    `
                    : ""
                }

                <button
                    class="delete-button"
                    onclick="deleteEvent(${event.id})"
                    style="margin-top:8px;"
                >
                    Eliminar
                </button>

            </div>

        `).join("");

}


function deleteEvent(id) {

    data.events =
        data.events.filter(
            event =>
                event.id !== id
        );


    saveData();

    renderCalendar();

    renderEvents();

}


/* =====================================================
   DOCUMENTOS
===================================================== */

async function saveDocument(event) {

    event.preventDefault();


    const fileInput =
        document.getElementById(
            "documentFile"
        );


    const file =
        fileInput.files[0];


    if (
        file &&
        file.size > 4 * 1024 * 1024
    ) {

        alert(
            "El archivo es demasiado grande. " +
            "Para esta versión seleccioná un archivo de hasta 4 MB."
        );

        return;

    }


    let fileData = null;


    if (file) {

        try {

            fileData =
                await readFileAsDataURL(file);

        } catch (error) {

            alert(
                "No se pudo cargar el archivo."
            );

            return;

        }

    }


    const documentData = {

        id: Date.now(),

        name:
            document
                .getElementById("documentName")
                .value.trim(),

        work:
            document
                .getElementById("documentWork")
                .value.trim(),

        type:
            document
                .getElementById("documentType")
                .value,

        description:
            document
                .getElementById("documentDescription")
                .value.trim(),

        fileName:
            file
            ? file.name
            : "",

        fileType:
            file
            ? file.type
            : "",

        fileData:
            fileData

    };


    data.documents.push(documentData);


    if (!saveData()) {

        data.documents.pop();

        return;

    }


    document
        .getElementById("documentForm")
        .reset();

    closeModal("documentModal");

    renderDocuments();

    updateStats();

}


function readFileAsDataURL(file) {

    return new Promise(
        (resolve, reject) => {

            const reader =
                new FileReader();


            reader.onload = function () {

                resolve(
                    reader.result
                );

            };


            reader.onerror = function () {

                reject(
                    reader.error
                );

            };


            reader.readAsDataURL(file);

        }
    );

}


function getDocumentClass(type) {

    if (type === "Planos") {
        return "document-plan";
    }

    if (type === "Presupuesto") {
        return "document-budget";
    }

    if (type === "Informe") {
        return "document-report";
    }

    if (type === "Factura") {
        return "document-invoice";
    }

    return "document-other";

}


function getDocumentLabel(type) {

    if (type === "Planos") {
        return "PLANO";
    }

    if (type === "Presupuesto") {
        return "PRESUPUESTO";
    }

    if (type === "Informe") {
        return "INFORME";
    }

    if (type === "Factura") {
        return "FACTURA";
    }

    if (type === "Lista de materiales") {
        return "MATERIALES";
    }

    return "DOCUMENTO";

}


function openDocumentFile(id) {

    const doc =
        data.documents.find(
            item => item.id === id
        );


    if (
        !doc ||
        !doc.fileData
    ) {

        alert(
            "Este documento no tiene un archivo cargado."
        );

        return;

    }


    const newWindow =
        window.open();

    if (!newWindow) {

        alert(
            "El navegador bloqueó la ventana. " +
            "Permití las ventanas emergentes para abrir el archivo."
        );

        return;

    }


    newWindow.document.write(`
        <html>
            <head>
                <title>
                    ${escapeHTML(doc.fileName || doc.name)}
                </title>
            </head>

            <body
                style="
                    margin:0;
                    background:#f4f7fa;
                    font-family:Arial, sans-serif;
                "
            >

                <div
                    style="
                        padding:15px;
                        background:white;
                        border-bottom:1px solid #dce4ec;
                    "
                >
                    <strong>
                        ${escapeHTML(doc.name)}
                    </strong>

                    <span
                        style="
                            margin-left:10px;
                            color:#697586;
                        "
                    >
                        ${escapeHTML(doc.fileName || "")}
                    </span>
                </div>

                <iframe
                    src="${doc.fileData}"
                    style="
                        width:100%;
                        height:calc(100vh - 65px);
                        border:none;
                    "
                ></iframe>

            </body>
        </html>
    `);

    newWindow.document.close();

}


function downloadDocument(id) {

    const doc =
        data.documents.find(
            item => item.id === id
        );


    if (
        !doc ||
        !doc.fileData
    ) {

        alert(
            "Este documento no tiene un archivo cargado."
        );

        return;

    }


    const link =
        document.createElement("a");

    link.href = doc.fileData;

    link.download =
        doc.fileName ||
        doc.name ||
        "documento";

    document.body.appendChild(link);

    link.click();

    link.remove();

}


function renderDocuments() {

    const container =
        document.getElementById(
            "documentsContainer"
        );


    if (!data.documents.length) {

        container.innerHTML = `
            <div class="panel">
                <p class="empty-message">
                    Todavía no hay documentos registrados.
                </p>
            </div>
        `;

        return;
    }


    container.innerHTML =
        data.documents.map(doc => {

            const typeClass =
                getDocumentClass(doc.type);

            const typeLabel =
                getDocumentLabel(doc.type);


            return `

                <div class="
                    document-card
                    ${typeClass}
                ">

                    <div class="document-preview"></div>

                    <div class="document-icon">
                        ${escapeHTML(
                            typeLabel.charAt(0)
                        )}
                    </div>

                    <span class="document-type">
                        ${escapeHTML(typeLabel)}
                    </span>

                    <h3>
                        ${escapeHTML(doc.name)}
                    </h3>

                    ${
                        doc.work
                        ? `
                        <p>
                            <strong>Obra:</strong>
                            ${escapeHTML(doc.work)}
                        </p>
                        `
                        : ""
                    }

                    ${
                        doc.description
                        ? `
                        <p>
                            ${escapeHTML(
                                doc.description
                            )}
                        </p>
                        `
                        : ""
                    }


                    ${
                        doc.fileName
                        ? `
                        <div class="document-file">

                            <strong>
                                Archivo:
                            </strong>

                            <br>

                            ${escapeHTML(
                                doc.fileName
                            )}

                        </div>

                        <div class="card-actions">

                            <button
                                class="document-view-button"
                                onclick="openDocumentFile(${doc.id})"
                            >
                                Abrir
                            </button>

                            <button
                                class="edit-button"
                                onclick="downloadDocument(${doc.id})"
                            >
                                Descargar
                            </button>

                        </div>
                        `
                        : `
                        <div class="document-file">
                            Sin archivo adjunto.
                        </div>
                        `
                    }


                    <div class="card-actions">

                        <button
                            class="delete-button"
                            onclick="deleteDocument(${doc.id})"
                        >
                            Eliminar
                        </button>

                    </div>

                </div>

            `;

        }).join("");

}


function deleteDocument(id) {

    if (
        !confirm(
            "¿Eliminar este documento?"
        )
    ) {

        return;

    }


    data.documents =
        data.documents.filter(
            doc =>
                doc.id !== id
        );


    saveData();

    renderDocuments();

    updateStats();

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
                .value.trim(),

        quantity:
            document
                .getElementById("materialQuantity")
                .value,

        unit:
            document
                .getElementById("materialUnit")
                .value,

        status:
            document
                .getElementById("materialStatus")
                .value

    };


    data.materials.push(material);

    saveData();

    document
        .getElementById("materialForm")
        .reset();

    closeModal("materialModal");

    renderMaterials();

    updateStats();

}


function getMaterialStatusClass(status) {

    if (status === "Disponible") {
        return "status-disponible";
    }

    if (status === "Bajo stock") {
        return "status-bajo";
    }

    if (status === "Agotado") {
        return "status-agotado";
    }

    return "";

}


function renderMaterials() {

    const container =
        document.getElementById(
            "materialsContainer"
        );


    if (!data.materials.length) {

        container.innerHTML = `
            <div class="panel">
                <p class="empty-message">
                    Todavía no hay materiales registrados.
                </p>
            </div>
        `;

        return;
    }


    container.innerHTML =
        data.materials.map(material => `

            <div class="material-card">

                <div class="material-card-cover"></div>

                <h3>
                    ${escapeHTML(material.name)}
                </h3>

                <div class="material-quantity">

                    <span>
                        CANTIDAD
                    </span>

                    <strong>
                        ${escapeHTML(
                            String(material.quantity)
                        )}
                    </strong>

                    <span class="material-unit">
                        ${escapeHTML(material.unit)}
                    </span>

                </div>

                <span class="
                    status
                    ${getMaterialStatusClass(material.status)}
                ">
                    ${escapeHTML(material.status)}
                </span>

                <div class="card-actions">

                    <button
                        class="delete-button"
                        onclick="deleteMaterial(${material.id})"
                    >
                        Eliminar
                    </button>

                </div>

            </div>

        `).join("");

}


function deleteMaterial(id) {

    if (
        !confirm(
            "¿Eliminar este material?"
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

    renderMaterials();

    updateStats();

}


/* =====================================================
   TAREAS
===================================================== */

function saveTask(event) {

    event.preventDefault();


    const task = {

        id: Date.now(),

        title:
            document
                .getElementById("taskTitle")
                .value.trim(),

        work:
            document
                .getElementById("taskWork")
                .value.trim(),

        date:
            document
                .getElementById("taskDate")
                .value,

        description:
            document
                .getElementById("taskDescription")
                .value.trim(),

        completed: false

    };


    data.tasks.push(task);

    saveData();

    document
        .getElementById("taskForm")
        .reset();

    closeModal("taskModal");

    renderTasks();

    updateStats();

}


function filterTasks(filter) {

    currentTaskFilter = filter;

    renderTasks();

}


function renderTasks() {

    const container =
        document.getElementById(
            "tasksContainer"
        );


    let tasks =
        [...data.tasks];


    if (
        currentTaskFilter === "pending"
    ) {

        tasks =
            tasks.filter(
                task =>
                    !task.completed
            );

    }


    if (
        currentTaskFilter === "completed"
    ) {

        tasks =
            tasks.filter(
                task =>
                    task.completed
            );

    }


    if (!tasks.length) {

        container.innerHTML = `
            <div class="panel">
                <p class="empty-message">
                    No hay tareas en esta categoría.
                </p>
            </div>
        `;

        return;
    }


    container.innerHTML =
        tasks.map(task => `

            <div class="
                task-card
                ${task.completed ? "completed" : ""}
            ">

                <div class="task-visual"></div>

                <div class="task-info">

                    <h3>
                        ${escapeHTML(task.title)}
                    </h3>

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
                            <strong>Fecha:</strong>
                            ${escapeHTML(
                                formatDate(task.date)
                            )}
                        </p>
                        `
                        : ""
                    }

                    ${
                        task.description
                        ? `
                        <p>
                            ${escapeHTML(
                                task.description
                            )}
                        </p>
                        `
                        : ""
                    }

                </div>


                <div class="task-actions">

                    <button
                        class="complete-button"
                        onclick="toggleTask(${task.id})"
                    >
                        ${
                            task.completed
                            ? "Marcar pendiente"
                            : "Completar"
                        }
                    </button>

                    <button
                        class="delete-button"
                        onclick="deleteTask(${task.id})"
                    >
                        Eliminar
                    </button>

                </div>

            </div>

        `).join("");

}


function toggleTask(id) {

    const task =
        data.tasks.find(
            task =>
                task.id === id
        );


    if (!task) {
        return;
    }


    task.completed =
        !task.completed;


    saveData();

    renderTasks();

    updateStats();

}


function deleteTask(id) {

    if (
        !confirm(
            "¿Eliminar esta tarea?"
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

    renderTasks();

    updateStats();

}


/* =====================================================
   ESTADÍSTICAS
===================================================== */

function updateStats() {

    document
        .getElementById("statObras")
        .textContent =
        data.works.length;


    document
        .getElementById("statTareas")
        .textContent =
        data.tasks.filter(
            task =>
                !task.completed
        ).length;


    document
        .getElementById("statMateriales")
        .textContent =
        data.materials.length;


    document
        .getElementById("statDocumentos")
        .textContent =
        data.documents.length;


    renderDashboard();

}


/* =====================================================
   DASHBOARD
===================================================== */

function renderDashboard() {

    const eventContainer =
        document.getElementById(
            "dashboardEvents"
        );


    const taskContainer =
        document.getElementById(
            "dashboardTasks"
        );


    const today =
        new Date();

    const todayString =
        `${today.getFullYear()}-${String(
            today.getMonth() + 1
        ).padStart(2, "0")}-${String(
            today.getDate()
        ).padStart(2, "0")}`;


    const upcomingEvents =
        [...data.events]
            .filter(
                event =>
                    event.date >= todayString
            )
            .sort(
                (a, b) =>
                    a.date.localeCompare(b.date)
            )
            .slice(0, 4);


    if (!upcomingEvents.length) {

        eventContainer.innerHTML = `
            <p class="empty-message">
                No hay próximas actividades.
            </p>
        `;

    } else {

        eventContainer.innerHTML =
            upcomingEvents.map(event => `

                <div class="event-list-item">

                    <strong>
                        ${escapeHTML(event.title)}
                    </strong>

                    <span>
                        ${escapeHTML(
                            formatDate(event.date)
                        )}
                    </span>

                </div>

            `).join("");

    }


    const pendingTasks =
        data.tasks
            .filter(
                task =>
                    !task.completed
            )
            .slice(0, 4);


    if (!pendingTasks.length) {

        taskContainer.innerHTML = `
            <p class="empty-message">
                No hay tareas pendientes.
            </p>
        `;

    } else {

        taskContainer.innerHTML =
            pendingTasks.map(task => `

                <div class="event-list-item">

                    <strong>
                        ${escapeHTML(task.title)}
                    </strong>

                    <span>
                        ${
                            task.date
                            ? escapeHTML(
                                formatDate(task.date)
                            )
                            : "Sin fecha"
                        }
                    </span>

                </div>

            `).join("");

    }

}


/* =====================================================
   MODALES
===================================================== */

function openModal(id) {

    document
        .getElementById(id)
        .classList.remove("hidden");

}


function closeModal(id) {

    document
        .getElementById(id)
        .classList.add("hidden");

}


window.addEventListener(
    "click",
    function (event) {

        if (
            event.target.classList.contains("modal")
        ) {

            event.target.classList.add(
                "hidden"
            );

        }

    }
);


/* =====================================================
   BÚSQUEDA
===================================================== */

function globalSearch() {

    const value =
        document
            .getElementById("globalSearch")
            .value
            .toLowerCase()
            .trim();


    if (!value) {
        return;
    }


    const results = [];


    data.works.forEach(work => {

        if (
            work.name
                .toLowerCase()
                .includes(value) ||
            work.location
                .toLowerCase()
                .includes(value)
        ) {

            results.push(
                `Obra: ${work.name}`
            );

        }

    });


    data.notes.forEach(note => {

        if (
            note.title
                .toLowerCase()
                .includes(value)
        ) {

            results.push(
                `Nota: ${note.title}`
            );

        }

    });


    data.tasks.forEach(task => {

        if (
            task.title
                .toLowerCase()
                .includes(value)
        ) {

            results.push(
                `Tarea: ${task.title}`
            );

        }

    });


    data.documents.forEach(doc => {

        if (
            doc.name
                .toLowerCase()
                .includes(value) ||
            doc.type
                .toLowerCase()
                .includes(value)
        ) {

            results.push(
                `Documento: ${doc.name}`
            );

        }

    });


    data.materials.forEach(material => {

        if (
            material.name
                .toLowerCase()
                .includes(value)
        ) {

            results.push(
                `Material: ${material.name}`
            );

        }

    });


    if (results.length) {

        console.log(
            "Resultados:",
            results
        );

    }

}


/* =====================================================
   RENDERIZAR TODO
===================================================== */

function renderEverything() {

    renderWorks();

    renderNotes();

    renderCalendar();

    renderEvents();

    renderDocuments();

    renderMaterials();

    renderTasks();

    updateStats();

    updateUserInterface();

}


/* =====================================================
   SEGURIDAD DE TEXTO
===================================================== */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}