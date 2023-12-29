import express from "express";
import { createLeads, getALead, getAllActiveLeads, getAllConnectedLeads, updateUserStatus } from "../controllers/leadController.js";
import {isAuthenticated} from "../middlewares/auth.js";

const router = express.Router();

//get all active leads--Admin
router.route("/activeleads").get(isAuthenticated,getAllActiveLeads);

//get all connected leads--Admin
router.route("/connectedleads").get(isAuthenticated,getAllConnectedLeads);

//create Leads---user
router.route("/createlead").post(createLeads);


//get a specific---Lead
router.route("/lead/:id").get(isAuthenticated,getALead).put(updateUserStatus);

export default router;
