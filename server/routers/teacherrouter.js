const express = require("express");
const {
    addQuiz,login
    
}=require("../controllers/teachercontroller")
const router = express.Router();
router.post("/addquiz",addQuiz);
router.post("/login",login);






module.exports = router;
