const express = require("express");
const {
    addSuperadmin,
    addAdmin,
    getAllAdmins,login
}=require("../controllers/superadmin")
const router = express.Router();
router.post("/addsuperadmin",addSuperadmin);
router.post("/addadmin",addAdmin);
router.get("/getadmins/:superadminId",getAllAdmins)
router.post("/login",login)





module.exports = router;
