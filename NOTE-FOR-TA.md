**Note to the TA**
- Final app is in ```campusx-app/``` - it contains the following subfolders:
	- ```api/``` - code to allow communication between frontend and backend
	- ```backend/``` - code for backend (to read and write data)
	- ```frontend/``` - code for website frontend
	- ```tests/``` 
		- ```integration-tests/``` - currently there are tests for (each with various edge cases) :
			- Login flow
			- Register flow
			- Events creation flow
		- ```unit-tests/``` - currently there are tests for (each with various edge cases) :
			- handleLogin
			- handleRegister
			- handleCreateEvents
			- getEvents
			- getOrganizations
			
		- CI tests are run automatically on every push to ```react-app``` and pull requests to ```main```


