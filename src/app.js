import express from "express";
import ProductRouter from "./router/product.routes.js";
import { engine } from "express-handlebars";
import * as path from "path";
import __dirname from "./utils.js";
import ProductManager from "./controllers/ProductManager.js";
import { Server } from "socket.io";
import viewsRouter from './router/views.routes.js';


const app = express();
const httpServer = app.listen(8080, () => {
    console.log(`Server running in http://localhost:${8080}`);
  });
const product = new ProductManager();

const socketServer = new Server(httpServer)

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

app.use("/", express.static(__dirname + "/public"))

app.use("/", viewsRouter)

socketServer.on('connection', async(socket) => {
  console.log('🟢 Usuario conectado')
  
  const productos = await product.getProducts();
  socket.emit('bienvenidoLista', productos )

  socket.on('productoAgregado', async(data) => {
      console.log('Alguien presionó el click')
      await product.save(data);
      
      const productos = await product.getProducts();
      io.sockets.emit('listaActualizada', productos);
  })
  
  socket.on('disconnect', () => {
      console.log('🔴 Usuario desconectado')
  })
  
})
  
app.use("/api/products", ProductRouter)