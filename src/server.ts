import app from './app'; 
import dotenv from 'dotenv';
dotenv.config(); //configure to use environment variables

const PORT = process.env.PORT;

app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`);
});