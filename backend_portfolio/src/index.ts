import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import sendToken from "./AuthAdmin/sendToken";
import verifyEmail from "./AuthAdmin/verifyEmail";
import Login from "./AuthAdmin/login";
import signUp from "./AuthAdmin/signUp";
import checkVerification from "./AuthAdmin/checkVerification";
import checkAuth from "./AuthAdmin/checkAuth";
import { addLink, getLink, editLink, deleteLink } from "./AdminTabs/Links";
import { addSkill, deleteSkill, editSkill, getSkill } from "./AdminTabs/Skill";
import { editAbout, getAbout } from "./AdminTabs/About";
import sendContactEmail from "./AdminTabs/sendContactEmail";
import { getLikes, updateLikes } from "./AdminTabs/Likes";
import { addProjects, deleteProjects, editProjects, getProjects } from "./AdminTabs/projects";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(cors({ credentials: true, origin: clientOrigin }));
app.use(express.json());

app.post("/auth_check", sendToken);

app.get("/auth_check/:email/:token", verifyEmail);

app.get("/check_verification", checkVerification);

app.post("/login", Login);

app.post("/signup", checkAuth, signUp);

app.get("/check_auth", checkAuth, (req: Request, res: Response) => {
  res.status(200).json({ isAuthenticated: true });
});

app.put("/likes", updateLikes);

app.get("/likes", getLikes);

app.post("/links", checkAuth, addLink);

app.put("/links/:id", checkAuth, editLink);

app.get("/links", getLink);

app.delete("/links/:id", checkAuth, deleteLink);

app.post("/skills", checkAuth, addSkill);

app.put("/skills/:id", checkAuth, editSkill);

app.get("/skills", getSkill);

app.delete("/skills/:id", checkAuth, deleteSkill);

app.get("/getAbout", getAbout);

app.get("/getAbout", getAbout);

app.put("/editAbout", checkAuth, editAbout);

app.post("/send_contact_email", sendContactEmail);

app.post("/projects", checkAuth, addProjects)

app.put("/projects/:id", checkAuth, editProjects)

app.delete("/projects/:id", checkAuth, deleteProjects)

app.get("/projects",  getProjects);

app.get("/", (_req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
