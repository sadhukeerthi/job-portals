# Job Portal

This workspace contains a simple Job Portal application with a React frontend and an Express/MongoDB backend.

## Run Backend

1. Create a `.env` file in `server/` with:

```
MONGO_URI=<your-mongo-uri>
JWT_SECRET=<a-secret>
PORT=5000
```

2. Install and start server:

```powershell
cd server
npm install
npm run dev
```

## Run Frontend

1. Create `.env` in `Client/` (optional):

```
REACT_APP_API_URL=http://localhost:5000/api
```

2. Install and start client:

```powershell
cd Client
npm install
npm start
```

## Notes

- Ensure MongoDB is reachable and `MONGO_URI` is correct.
- The frontend stores JWT token in `localStorage` after login.
