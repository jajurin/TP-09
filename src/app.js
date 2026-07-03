import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import publicacionesRoutes from "./routes/publicacionesRoutes.js";


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/publicaciones', publicacionesRoutes);

app.listen(port, () => {
  console.log(`"server" Listening on port ${port}`);
});