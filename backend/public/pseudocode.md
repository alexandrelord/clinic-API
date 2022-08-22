**Based on Document Provided**

### Client-side Routing

-   To move between pages/components
    -   Create navBar (Login/SignUp, Home, BookAppointment, Appointments)

### Models

-   <ins>Create Models (refer to ERD for specifics)</ins>
    -   Clinic (necessary?)
    -   Patient
    -   Provider
    -   Availability
    -   Appointment

### CRUD

-   <ins>Create Patient</ins><br/>
    -   Needs a sign up page (name + surname, password?) Include error message if user already exist
    -   Needs a log in page (name + surname, password?)
    -   Setup backend (routes, ctrls) to save patient instance in DB

When user is created, redirect to book apointment page

-   <ins>Book Appoitment Page</ins>
    -   **On Component Mount (useEffect):**
    -   Load list of providers
    -   Load list of availabities for each provider
    -   Needs a form + button to submit
    -   **On Form Submit:**
    -   Create appointment w/ (patientId (saved in localStorage?), providerId, availability(timeSlot))
    -   **On Appointment Created:**
    -   Redirect to Appointments Page
    -   **On loading Appointments Page:**
    -   Show Appointments related to patient saved in Local Storage
    -   Allow user to delete appointment? (necessary?)
