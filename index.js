const express = require("express");
const app = express();

const path = require("path");
const logger = require("morgan");
const cors = require("cors");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

app.use("/api/test", (req,res)=>{
    res.send("test");
});

app.use(express.static(path.join(__dirname, "./front/build")));

app.get("*",function(_, res){
    res.sendFile(
        path.join(__dirname, "./front/build:index.html"),
        function(err){
            if(err){
                res.status(500).send(err);
            }
        }
    )
});

const port = process.env.PORT || 5001;
app.listen(port, ()=> console.log(`Server Running on port ${port}`));

module.exports = app;