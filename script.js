// ================= GET ELEMENTS =================

const authModal = document.getElementById("authModal");

const loginForm = document.getElementById("loginForm");

const registerForm = document.getElementById("registerForm");

const dashboard = document.getElementById("dashboard");

const home = document.getElementById("home");

const services = document.getElementById("services");

const about = document.getElementById("about");

const dashboardSection =
    document.getElementById("dashboardSection");


// ================= DOCTORS DATA =================

const doctors = [

    {
        id: 1,
        name: "Dr. Anjali Rao",
        specialization: "General Physician",
        experience: "10 years",
        fee: 500
    },

    {
        id: 2,
        name: "Dr. Rahul Sharma",
        specialization: "Cardiologist",
        experience: "12 years",
        fee: 800
    },

    {
        id: 3,
        name: "Dr. Priya Reddy",
        specialization: "Dermatologist",
        experience: "8 years",
        fee: 600
    },

    {
        id: 4,
        name: "Dr. Arjun Kumar",
        specialization: "Orthopedic",
        experience: "15 years",
        fee: 700
    },

    {
        id: 5,
        name: "Dr. Sneha Patel",
        specialization: "Pediatrician",
        experience: "9 years",
        fee: 550
    },

    {
        id: 6,
        name: "Dr. Vikram Singh",
        specialization: "Neurologist",
        experience: "14 years",
        fee: 900
    }

];


// ================= LOGIN / REGISTER =================

function showLogin() {

    authModal.style.display = "flex";

    loginForm.style.display = "block";

    registerForm.style.display = "none";
}


function showRegister() {

    authModal.style.display = "flex";

    loginForm.style.display = "none";

    registerForm.style.display = "block";
}


function closeModal() {

    authModal.style.display = "none";
}


// ================= REGISTER =================

function registerUser(event) {

    event.preventDefault();

    const name =
        document.getElementById("registerName").value;

    const email =
        document.getElementById("registerEmail").value;

    const password =
        document.getElementById("registerPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    if (password !== confirmPassword) {

        alert("Passwords do not match!");

        return;
    }


    const existingUser =
        JSON.parse(localStorage.getItem("healthcareUser"));


    if (existingUser &&
        existingUser.email === email) {

        alert("User already registered. Please login.");

        showLogin();

        return;
    }


    const user = {

        name: name,

        email: email,

        password: password

    };


    localStorage.setItem(
        "healthcareUser",
        JSON.stringify(user)
    );


    alert("Registration successful! Please login.");

    document
        .querySelector("#registerForm form")
        .reset();

    showLogin();
}


// ================= LOGIN =================

function loginUser(event) {

    event.preventDefault();


    const email =
        document.getElementById("loginEmail").value;

    const password =
        document.getElementById("loginPassword").value;


    const user =
        JSON.parse(
            localStorage.getItem("healthcareUser")
        );


    if (!user) {

        alert(
            "No registered user found. Please register first."
        );

        return;
    }


    if (
        email === user.email &&
        password === user.password
    ) {

        localStorage.setItem(
            "isLoggedIn",
            "true"
        );


        document.getElementById("userName")
            .textContent = user.name;


        authModal.style.display = "none";


        home.style.display = "none";

        services.style.display = "none";

        about.style.display = "none";


        dashboard.style.display = "block";


        dashboardSection.innerHTML = "";


        document
            .querySelector("#loginForm form")
            .reset();

    }

    else {

        alert("Invalid email or password!");

    }
}


// ================= SHOW DOCTORS =================

function showDoctors() {

    let html = `
        <h2 class="section-title">
            Available Doctors
        </h2>

        <div class="doctors-container">
    `;


    doctors.forEach(function (doctor) {

        html += `

            <div class="doctor-card">

                <div class="doctor-icon">
                    👨‍⚕️
                </div>

                <h3>
                    ${doctor.name}
                </h3>

                <p class="specialization">
                    ${doctor.specialization}
                </p>

                <p>
                    Experience: ${doctor.experience}
                </p>

                <p>
                    Consultation Fee: ₹${doctor.fee}
                </p>

                <button
                    onclick="bookDoctor(${doctor.id})"
                >
                    Book Appointment
                </button>

            </div>

        `;

    });


    html += `</div>`;


    dashboardSection.innerHTML = html;


    dashboardSection.scrollIntoView({
        behavior: "smooth"
    });
}


// ================= BOOK APPOINTMENT =================

function showBooking(selectedDoctorId = "") {

    let doctorOptions = "";

    doctors.forEach(function (doctor) {

        doctorOptions += `

            <option
                value="${doctor.id}"
                ${doctor.id == selectedDoctorId ? "selected" : ""}
            >

                ${doctor.name} -
                ${doctor.specialization}

            </option>

        `;

    });


    dashboardSection.innerHTML = `

        <h2 class="section-title">
            Book an Appointment
        </h2>

        <div class="booking-box">

            <form onsubmit="saveAppointment(event)">

                <label>
                    Select Doctor
                </label>

                <select id="doctorSelect" required>

                    <option value="">
                        Select a doctor
                    </option>

                    ${doctorOptions}

                </select>


                <label>
                    Appointment Date
                </label>

                <input
                    type="date"
                    id="appointmentDate"
                    required
                >


                <label>
                    Appointment Time
                </label>

                <select id="appointmentTime" required>

                    <option value="">
                        Select time
                    </option>

                    <option>09:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>12:00 PM</option>
                    <option>02:00 PM</option>
                    <option>03:00 PM</option>
                    <option>04:00 PM</option>
                    <option>05:00 PM</option>

                </select>


                <button type="submit">
                    Confirm Appointment
                </button>

            </form>

        </div>

    `;


    // Prevent selecting past dates

    const today =
        new Date().toISOString().split("T")[0];

    document.getElementById("appointmentDate")
        .min = today;


    dashboardSection.scrollIntoView({
        behavior: "smooth"
    });
}


// ================= BOOK FROM DOCTOR CARD =================

function bookDoctor(doctorId) {

    showBooking(doctorId);

}


// ================= SAVE APPOINTMENT =================

function saveAppointment(event) {

    event.preventDefault();


    const doctorId =
        Number(
            document.getElementById("doctorSelect").value
        );


    const date =
        document.getElementById("appointmentDate").value;


    const time =
        document.getElementById("appointmentTime").value;


    const doctor =
        doctors.find(function (d) {

            return d.id === doctorId;

        });


    const user =
        JSON.parse(
            localStorage.getItem("healthcareUser")
        );


    // Get existing appointments

    let appointments =
        JSON.parse(
            localStorage.getItem("appointments")
        ) || [];


    // Create appointment

    const appointment = {

        id: Date.now(),

        patientEmail: user.email,

        doctorName: doctor.name,

        specialization: doctor.specialization,

        date: date,

        time: time,

        fee: doctor.fee

    };


    appointments.push(appointment);


    // Save appointment

    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );


    alert(
        "Appointment booked successfully!"
    );


    showAppointments();

}


// ================= MY APPOINTMENTS =================

function showAppointments() {

    const user =
        JSON.parse(
            localStorage.getItem("healthcareUser")
        );


    const appointments =
        JSON.parse(
            localStorage.getItem("appointments")
        ) || [];


    // Only show current user's appointments

    const myAppointments =
        appointments.filter(function (appointment) {

            return appointment.patientEmail === user.email;

        });


    if (myAppointments.length === 0) {

        dashboardSection.innerHTML = `

            <h2 class="section-title">
                My Appointments
            </h2>

            <div class="no-appointments">

                <h3>
                    📋 No Appointments
                </h3>

                <p>
                    You have not booked any appointments yet.
                </p>

                <button
                    class="primary-btn"
                    onclick="showBooking()"
                    style="margin-top:20px;"
                >
                    Book Appointment
                </button>

            </div>

        `;

        return;
    }


    let html = `

        <h2 class="section-title">
            My Appointments
        </h2>

        <div class="appointments-container">

    `;


    myAppointments.forEach(function (appointment) {

        html += `

            <div class="appointment-card">

                <h3>
                    ${appointment.doctorName}
                </h3>

                <p>
                    👨‍⚕️
                    ${appointment.specialization}
                </p>

                <p>
                    📅
                    ${appointment.date}
                </p>

                <p>
                    ⏰
                    ${appointment.time}
                </p>

                <p>
                    💰
                    Consultation Fee: ₹${appointment.fee}
                </p>

                <button
                    class="cancel-btn"
                    onclick="cancelAppointment(${appointment.id})"
                >
                    Cancel Appointment
                </button>

            </div>

        `;

    });


    html += `</div>`;


    dashboardSection.innerHTML = html;


    dashboardSection.scrollIntoView({
        behavior: "smooth"
    });
}


// ================= CANCEL APPOINTMENT =================

function cancelAppointment(id) {

    const confirmCancel =
        confirm(
            "Are you sure you want to cancel this appointment?"
        );


    if (!confirmCancel) {

        return;

    }


    let appointments =
        JSON.parse(
            localStorage.getItem("appointments")
        ) || [];


    appointments =
        appointments.filter(function (appointment) {

            return appointment.id !== id;

        });


    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );


    alert(
        "Appointment cancelled successfully."
    );


    showAppointments();

}


// ================= LOGOUT =================

function logoutUser() {

    localStorage.setItem(
        "isLoggedIn",
        "false"
    );


    dashboard.style.display = "none";

    home.style.display = "flex";

    services.style.display = "block";

    about.style.display = "block";


    dashboardSection.innerHTML = "";


    alert(
        "You have been logged out."
    );

}


// ================= PAGE LOAD =================

window.onload = function () {

    const isLoggedIn =
        localStorage.getItem("isLoggedIn");


    const user =
        JSON.parse(
            localStorage.getItem("healthcareUser")
        );


    if (
        isLoggedIn === "true" &&
        user
    ) {

        document.getElementById("userName")
            .textContent = user.name;


        home.style.display = "none";

        services.style.display = "none";

        about.style.display = "none";

        dashboard.style.display = "block";

    }

};