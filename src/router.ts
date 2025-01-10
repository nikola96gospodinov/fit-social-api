import { Router } from "express";
import { searchGyms } from "./handlers/gym/search-gym.handler";

const router = Router();

router.route("/search-gyms").get(searchGyms);

export default router;
