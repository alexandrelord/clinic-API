You are in charge of developing the REST API of a simplified online medical appointment booking application. After careful analysis, you conclude that you will have to implement the following  features:

- A patient can search for the different providers of the clinic
- A patient can look for the availabilities of a specific provider within a defined time interval (for  instance, the availabilities of Dr. A between May 8th, 2019 and May 12th, 2019) - A patient can book an appointment with a provider by selecting one of their availabilities.

Implement a simplified REST API that will support the aforementioned features.

__Please note:__
### Clinic
Only one clinic is to be supported
- A clinic has only one attribute, its name, which also acts as its unique identifier (ID) 

### Patient (A clinic can have one or several patients)
A patient has the following attribute:
- First name
- Last name
- The combination of the first and last names acts as an ID

### A clinic can have one or several providers
A provider has the following attributes:
- First name
- Last name
- The combination of the first and last names acts as an ID
- Availability
- An availability is a time-slot during which a provider is able to treat a patient, if the latter  has booked an pointment
- Each provider has one or several availabilities everyday

### Availability
- An availability has the following attributes:
- Start date and time (timestamp)
- End date and time (timestamp)
- Availabilities are 15-minutes time-slots (8:00, 8:15, 8:30, etc.)
- An availability that's been chosen by a patient is converted into an appointment upon booking (one availability one appointment)

### Appointment
- An appointment has the following attributes:
- An appointed patient
- An appointed provider
- Start date and time (timestamp)
- End date and time (timestamp)
- As appointments are booked on availabilities, they are also 15-minutes time-slots
