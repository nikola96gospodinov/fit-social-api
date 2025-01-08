import * as dotenv from "dotenv";
dotenv.config();

import app from "./server";
import "./schedules/update-exercises";

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
});
