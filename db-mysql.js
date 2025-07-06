import mysql from 'mysql2'

//with promise and run query as async await
const db = mysql.createPool({
   host:'localhost',
   user:'mesto',
   password:'mk1972mk',
   database:'blog'
}).promise()


export default db
//query with promise
// const [row] = await Mysql.query('Select * From products')
//   console.log(result)


// with callback
// const db = mysql.createConnection({
//   host:'localhost',
//   user:'mesto',
//   password:'mk1972mk',
//   database:'blog'
// })

//db.connect(err => {
//  if(!err){
//   console.log('Mysql Connected')
//  } else {
//    console.log(err)
//  }
//})

// export default db


//query with callback
// Mysql.query('Select * From products', (err, res) => {
//   console.log(res)
// })



