const express = require("express");
const {
    addStudent,addTeacher,login
}=require("../controllers/admin")
const router = express.Router();
router.post("/addstudent",addStudent);
router.post("/addteacher",addTeacher);
router.post("/login",login)


module.exports = router;
