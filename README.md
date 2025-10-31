### CAMPUSX-APP
Final app is in campusx-app - it contains the following subfolders: 
	•	api/ - code to allow communication between frontend and backend
	•	backend/ - code for backend (to read and write data)
	•	frontend/ - code for website frontend
	•	tests/ - code for CI tests, 
		- currently there are tests for (each with various edge cases) :
			- Login route 
			- Register route

### to run the app locally

- A list of test users to try the app is available in ``` campusx-app/README.md ```

1. pull from main
2. run ``` cd campusx-app ``` to navigate to app folder
3. run ``` pnpm install ``` to install required node modules
  - if you get the error ``` pnpm not found ``` run ``` npm install pnpm ``` to install pnpm, then try the command again
4. start local server
  a. in dev mode 
    - run ``` pnpm dev ```
      - it should start a local server for frontend on port 5173 and backend on port 3000
      - access app by going to http://localhost:5173/

  b. in prod mode 
    - run ``` pnpm build ``` to build static frontend files
    - run ``` pnpm start ``` to start server
      - it should start a local server to serve frontend and backend on port 3000
      - access app by going to http://localhost:300/

## Team info: 

<table>  
<tr><td>Saeed Ramez Fakhouri</td> <td>40308146</td> <td>SF30-fa<td><tr>
  
<tr><td>Abdoul Kone</td> <td>40307505</td> <td>osrlazlo<td><tr>
  
<tr><td>Ryan Abdalla</td> <td>40243555</td> <td>rayanabdalla<td><tr>
  
<tr><td>Abderraouf El Khalil Karoun</td> <td>40315753- Khalil-Krn<td><tr>
  
<tr><td>Madona Beshara</td> <td>40316641</td> <td>madonabeshara5-ui<td><tr>
  
<tr><td>Mbog Wendy</td> <td> 40259455</td> <td>wenm983<td><tr>

<tr><td>Etienne Vorms</td> <td>40286823</td> <td>Tinou-code<td><tr>

<tr><td>Ibrahim Ahmad</td> <td>40279224</td> <td>ibrahimrocks<td><tr>
</table>

## Core Features:
1. Student: 
- Each student should be able to browse and search events with filters (date, category, organization).
- Save events to a personal calendar.
- Claim tickets (free or mock paid).
- Receive a digital ticket with a unique QR code.

2. Organizers
- Enter event details: title, description, date/time, location, ticket capacity, ticket type (free or paid).
- Have a Dashboard per event with stats: tickets issued, attendance rates, and remaining capacity.
- Be able to export the attendee list in CSV.
- Need an Integrated QR scanner for ticket validation (for simplicity, we can assume the QR code image can be provided via file upload).

3. Administrators
- Be able to approve organizer accounts.
- Moderate event listings for policy compliance.
- View global stats: number of events, tickets issued, and participation trends.
- Edit or update organization details (like their name, description, or logo).
- Suspend or deactivate organizations if they’re not following the rules.
- Assign and manage roles within each organization.
  
- Roles:
   - Owner: Full control of the organization, including members and events.
   - Organizer: Can create and manage events, see attendance, and view analytics.
   - Staff/Moderator: Helps with events (like scanning tickets) but can’t edit or create events.

4. Notification and Alert system
- Event reminders for students 
- Notify organizers when ticket sales are nearing capacity, when new attendees register or cancelled tickets
- Allow users to set how they wish to receive notifications (email, SMS)


## Languages and frameworks:
- ReactJS;
- NodeJS;
- ExpressJS;
- MongoDB (NoSQL);
- Javascript;
- HTML;
- CSS;
- SQL

- CI Test framework:
   - Jest



