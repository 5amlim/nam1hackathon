import {Router} from "express";
//import routes from controllers

const router = Router()

router.get("/", (req, res) => res.send("This is the api root!"));

// ex. router.use("/route", ____Routes)
// router.use("/", );
// router.use("/",);

export default router;
