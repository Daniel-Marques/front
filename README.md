<h2>Cadastro de Usuário WEB - ReactJS</h2>

## Important Notices
Before starting, insert the data of the environment variables for a good functioning
<p>File: <strong>.env</strong></p>
REACT_APP_API_URL=Your api`s link

<strong>Create a project on the link below and follow the step by step</strong>
Link: <a href="https://console.cloud.google.com/apis/credentials?hl=pt-br&project=">Clique aqui</a>
1. Create Credentials > OAuth Client ID;
2. Type of application: Web application > Name > Add urls that will consume the service;
3. Menu: Permission screen > Create a name for the application, enter a logo and save;
4. Menu: Credentials > Project created > Copy the customer ID and fill in the variable below;
REACT_APP_CREDENTIALS_GOOGLE="Google api credentials"

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
