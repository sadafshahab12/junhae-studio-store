import express from "express";
import { createContact, getContact } from "../controller/contactController.js";

const contactRouter = express.Router();
contactRouter.get("/contact", getContact);
contactRouter.post("/contact", createContact);

export { contactRouter };
