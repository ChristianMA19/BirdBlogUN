import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
// Creacion del app
const app = express();

// Conexión a MongoDB usando mongoose
mongoose
  .connect(
    'mongodb+srv://' +
      process.env.MONGO_USER +
      ':' +
      process.env.MONGO_PASS +
      '@cluster0.ya9izxd.mongodb.net',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Connected.');
  })
  .catch((err) => {
    console.log('There was an error with connection!');
    console.log(err);
  });

// Middlewares
app.use(cors());
app.use(express.json());

import forouploadRouters from './foroupload/foroupload.router.js'
app.use('/foroupload', forouploadRouters)

// import usuariosRoutes from './usuarios/usuarios.routes'
// app.use('/usuarios', usuariosRoutes)

// import restaurantesRoutes from './restaurantes/restaurantes.routes'
// app.use('/restaurantes', restaurantesRoutes)

// import productosRoutes from './productos/productos.routes'
// app.use('/productos', productosRoutes)

// Endpoint para 404
app.use((req, res) => {
  res.status(404).json({ message: 'Not found.' });
});

// Inicia app en puerto 8080
app.listen(8080);