import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import profileRouter from "./routes/profile";

app.use("/api/profile", profileRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});