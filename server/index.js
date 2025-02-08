const express=require("express");
const app=express();
const cors=require("cors");
const db=require("./config/db")
app.use(express.json());
app.use(cors());
db();
const playerouter=require("./routers/playerrouter");
const superadminrouter=require("./routers/superadmin")
const adminrouter=require("./routers/adminrouter")
const teacherrouter=require("./routers/teacherrouter");
const quizrouter=require("./routers/quizrouter");
app.use('/api/player', playerouter);
app.use('/api/superadmin', superadminrouter);
app.use("/api/admin",adminrouter)
app.use("/api/teacher",teacherrouter)
app.use("/api/quiz",quizrouter)

app.listen(2000,()=>{
    console.log("server started");
})