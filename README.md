# reto-backend

Jadir Hervias

### SETUP

```bash
# Copy the env variables from the example
cat .env.example > .env

# Create the firebase.json file and fill it with the firebase service account credentials of the project
mkdir ./src/config/.firebase
touch ./src/config/.firebase/firebase.json

# Install dependencies
npm i

# Run in development mode
npm run dev

# Run in production mode
npm run start
```

### ENDPOINTS:

- <http://localhost:3000/api/>
