import app from '../app';
require('dotenv').config()
const PORT = process.env.PORT;

try{
    app.listen(PORT);
    console.log("Listening on port " + PORT);
} catch (err) {
}
