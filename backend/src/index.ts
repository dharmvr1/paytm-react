import express from "express"
import cors from "cors"
import { rootRouter } from "./routes";
import { TOKEN_SECRET } from "./config";
const app=express()

app.use(express.json(),cors())
app.use("/api/v1",rootRouter)






app.listen(3000,()=>{console.log("listen to port 3000")})