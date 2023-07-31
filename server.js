import { app } from "./app.js";
import { connectToDatabase } from "./config/database.js";

connectToDatabase();

//app listening port
app.listen(process.env.PORT, () => {
  console.log(`Server is listing on port ${process.env.PORT}`);
});
