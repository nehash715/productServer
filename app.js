let products = [
    {
      id: "A101",
      name: "Pepsi 300ml",
      price: 20,
    },
    {
      id: "A232",
      name: "Diet Coke 300ml",
      price: 25,
    },
    {
      id: "A102",
      name: "Pepsi 500ml",
      price: 40,
    },
    {
      id: "A237",
      name: "Coke 1l",
      price: 75,
    },
    {
      id: "B034",
      name: "Fruit and Nuts - 40g",
      price: 15,
    },
    {
      id: "B035",
      name: "Crackles - 100g",
      price: 45,
    },
    {
      id: "B036",
      name: "Nutties - 20g",
      price: 10,
    },
    {
      id: "B173",
      name: "25gm bar",
      price: 35,
    },
  ];
  let users=[
    {id:1,name:"John",password:"john",role:"customer"},
     {id:2,name:"Sarah",password:"sarah",role:"customer"},
      {id:3,name:"George",password:"george",role:"customer"},
       {id:4,name:"Anna",password:"anna",role:"customer"},
       {id:5,name:"Tim",password:"tim",role:"admin"},
       {id:6,name:"Steve",password:"steve",role:"admin"},
]
let orders=[
    {orderId:1,userId:1,qty:10,value:55},
     {orderId:2,userId:2,qty:15,value:75},
      {orderId:3,userId:3,qty:20,value:20},
       {orderId:4,userId:1,qty:4,value:100},
        {orderId:5,userId:1,qty:6,value:72},
         {orderId:6,userId:2,qty:8,value:96},
          {orderId:7,userId:2,qty:12,value:240},
           {orderId:8,userId:1,qty:30,value:450},
]




let express=require("express")
let app=express()
app.use(express.json())
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT,  DELETE, HEAD"
      );
    res.header("Access-Control-Allow-Credentials",true);
    next();
})


var port=process.env.PORT || 2410;
//const port=2410;
app.listen(port,()=>console.log(`Listening on port ${port}`))


const jwt=require("jsonwebtoken")
const jwt_key="secretkey237483"
const jwtExpiryTime=300;


app.post("/login",function(req,res){
let {username,password}=req.body
let user=users.find(u=>u.name==username && u.password==password)
if(user){
    const token=jwt.sign({user},jwt_key,{
        algorithm:"HS256",
        expiresIn:jwtExpiryTime,
    })
    
    res.send(token)
}
else{
    res.status(401).send("Login failed")
}
})

app.get("/myOrders",function(req,res){
    
console.log(req.headers)
    const token=req.headers["authorization"];
    console.log(token)
    if(!token) res.status(401).send('Plaese login first')
    else{
        jwt.verify(token,jwt_key,function(err,data){
            if(err){
                res.send(err)
            }
            else{
                console.log(data)
let orders1=orders.filter(p=>p.userId==data.user.id)
res.send(orders1)
            }
        })
    }
})

app.get("/user",function(req,res){
  const token=req.headers["authorization"];
  console.log(token)
  if(!token) res.status(401).send('Plaese login first')
  else{
      jwt.verify(token,jwt_key,function(err,data){
          if(err){
              res.send(err)
          }
          else{
              console.log(data)
let user=users.find(p=>p.id==data.user.id)
res.send(user)
          }
      })
  }
})

app.get("/info",function(req,res){
  res.send("Hello.Welcome to tutorial")
})

app.get("/productApp/products", function (req, res) {
    res.send(products);
  });
  app.post("/productApp/products", (req, res) => {
    const product = req.body;
    products.push(product);
    console.log(product);
    res.send(product);
  });
  app.get("/productApp/products/:id", function (req, res) {
    let id = req.params.id;
    let obj = products.find((obj1) => obj1.id === id);
    obj ? res.send(obj) : res.send("not found");
  });
  app.put("/productApp/products/:id", function (req, res) {
    console.log("Put called");
    let id = req.params.id;
    const product = req.body;
    console.log(id, product);
    let index = products.findIndex((obj1) => obj1.id === id);
    if (index >= 0) {
      products[index] = product;
      res.send(product);
    } else res.send("not found");
  });
  app.delete("/productApp/products/:id", function (req, res) {
    let id = req.params.id;
    let index = products.findIndex((obj1) => obj1.id === id);
    if (index >= 0) {
      let product = products.splice(index, 1);
      res.send(product);
    }
    res.send("not found");
  });
  