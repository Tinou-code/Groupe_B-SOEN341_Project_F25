# CAMPUSX Web App
try the app online (render server may take a minute to load) : https://campusx-app.onrender.com/

### test users - Use following info to login and test user features
User ID - Password - User type<br>
S12345 - 12345 - Student<br>
S1212 - 1212 - Student<br>
O12345 - 12345 - Organizer (unapproved)<br>
O45678 - 45678 - Organizer (approved)<br>
A12345 - 12345 - Admin<br>

### frontend 
ReactJS

### backend 
MongoDB database, ExpressJS server 

### api
allows frontend to communnicate with backend

### calendar 
handled with [fullcalendar js](https://fullcalendar.io/docs/getting-started)

### run locally
to run locally, you need to:
- run "pnpm install" to add neccessary node modules (if pnpm not found, run "npm install pnpm" first)

- create ".env.local" file in frontend folder and add the following variable in it 
    - VITE_SERVER_URL = http://localhost:3000 
    - this is to access backend server 

- create ".env.local" file in backend folder and add the following variable in it
    - ATLAS_URI=mongodb+srv://<username>:<password>@cluster-url.mongodb.net/
    - this is to connect to database, you can contact dev team to get access to app database or create your own free mongodb atlas cluster
    - To set up your own database
        - initial setup currently requires 2 collections, "events" and "users"
        - "events" collection needs 1 initial document with attribute "nextEventId" that can be initialized to any positive int
        - admin users must be added manually to database, with following attributes :
            - { userId, email, firstName, lastName, password, phoneNumber, type: "admin" }
            - "type" must be set to "admin", "userId" and "password" cannot be null, rest can be ommited

- start local server in dev mode -> run "pnpm dev"
    - this starts a server for frontend on port:5173 and a server to handle backend requests on port:3000 
    - to use app in dev mode navigate to http://localhost:5173/ 

- start local server in prod mode -> run "pnpm build", then "pnpm test"
    - this builds the static files for frontend then serves it on port:3000 along with the backend
    - to use app in dev mode navigate to http://localhost:3000/ 
