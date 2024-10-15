import * as dotenv from "dotenv";
dotenv.config();

import app from "./server";
import "./schedules/update-exercises";
import { updateExercises } from "./schedules/update-exercises";

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);

  // Update exercises on server start as the server might be restarted
  // await updateExercises();
});
