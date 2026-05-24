import app from "./app"

const serverStart = ()=>{
    console.log("starting server")
    app.listen(3000,()=>{
        console.log("server start in port 3000")
    })
}

serverStart()