const express = require('express')
const app = express()
const port = 3000
const pool =require('./db')
app.use(express.json());

// app.get("/hotels", function (req, res) {
//     pool
//       .query("SELECT * FROM hotels ")
//       .then((result) => res.json(result.rows))
//       .catch((e) => console.error(e));
//   });
  app.get("/bookings", function (req, res) {
    pool
      .query("SELECT * FROM bookings")
      .then((result) => res.json(result.rows))
      .catch((e) => console.error(e));
  });


app.get('/hotels',(req,res) =>{
    const name = req.query.name
    if(name){
        pool
    .query(`SELECT * FROM hotels where name like '%${name}%'`,
    (error,result) =>{
        res.json(result.rows)
    })
    }else{
        pool
    .query(`SELECT * FROM hotels `,(error,result) =>{
        res.json(result.rows)
    })
    }
 
});


  app.post("/hotels", function (req, res) {
    const newHotelName = req.body.name;
    const newHotelRooms = req.body.rooms;
    const newHotelPostcode = req.body.postcode;
  
    if (!Number.isInteger(newHotelRooms) || newHotelRooms <= 0) {
      return res
        .status(400)
        .send("The number of rooms should be a positive integer.");
    }
  
    pool
      .query("SELECT * FROM hotels WHERE name=$1", [newHotelName])
      .then((result) => {
        if (result.rows.length > 0) {
          return res
            .status(400)
            .send("An hotel with the same name already exists!");
        } else {
          const query =
            "INSERT INTO hotels (name, rooms, postcode) VALUES ($1, $2, $3)";
          pool
            .query(query, [newHotelName, newHotelRooms, newHotelPostcode])
            .then(() => res.send("Hotel created!"))
            .catch((e) => console.error(e));
        }
      });
  });






//   app.post('/hotels', async(req,res) =>{
//     try {
//         const {name, rooms,postcode} =req.body;
//         const newHotel =await pool.query("INSERT INTO hotels (name,rooms,postcode) VALUES($1,$2,$3) RETURNING *", [name,rooms,postcode] ) 
       
//        res.json(newHotel.rows[0]);
//         console.log(req.body);
//     } catch (err) {
//         console.error(err.message);
        
//     }
//  })
 
 

//   app.post("/hotels", function (req, res) {
//     const name = req.body.name;
//     const rooms = req.body.rooms;
//     const postcode = req.body.postcode;
  
//     const query =
//       "INSERT INTO hotels ( name, rooms, postcode) VALUES ($1, $2, $3)";
  
//     pool
//       .query(query, [name, rooms, postcode])
//       .then(() => res.send("Hotel created!"))
//       .catch((e) => console.error(e));
//   });


  app.get("/customers", function (req, res) {
    pool
      .query("SELECT * FROM customers")
      .then((result) => res.json(result.rows))
      .catch((e) => console.error(e));
  });


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))