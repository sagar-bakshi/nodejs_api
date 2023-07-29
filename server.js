import { app } from "./app.js";
import { connectToDatabase } from "./config/database.js";

//connecting to the database
connectToDatabase();

//app listening port
app.listen(4000, () => {
  console.log("Server is listing on port 4000");
});
