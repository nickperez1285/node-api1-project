const express = require('express');
const shortid = require('shortid');

const server = express()

server.use(express.json())
const usersArr= [
{
  id:1,
  name: "Janes", 
  bio: "Not Tsarzan's Wife, another Jane", 
},{
  id:2,
  name: "Janes", 
  bio: "Not Tsarzan's Wife, another Jane", 
}
]

server.get('/', (req, res) => {
	res.json({message: "hello world"})


})
server.get('/api/users', (req, res) => {
	
	res.status(200).json(usersArr)


})
server.get('/api/users/:id', (req, res) => {
const {id} = req.params

const found = usersArr.find(user => user.id === id )

if(found){
	res.status(200).json({message: 'user found'})

}else {
	res.status(404).json({message: "user not found "})
}


})

server.post("/api/users", (req, res) => { 
  const userInfo = req.body;
    const name = req.body.name;
    const bio = req.body.bio;
    !name || !bio ?
        res.status(400).json({ errorMessage: "Please provide a name and bio for the user." })
        :

	userInfo.id = shortid.generate();
	usersArr.push(userInfo);

	res.status(201).json(userInfo)

})



server.delete('/api/users/:id', (req, res) => {
const {id} = req.params
const found = usersArr.find(user => user.id === id )

if(found){
	usersArr = usersArr.filter( user=> user.id !== id)
	res.status(200).json({message: 'found'})

}else {
	res.status(404).json({message: "user not found "})
}

})


server.patch('/api/users/:id', (req, res) => {
	const {id} = req.params;
	const changes = req.body ;

	let found = usersArr.find(user => user.id === id )

	if(found){
		Object.assign(found, changes); 
		res.status(200).json(found)
	}else {
		res.status(400).json({message: "user not found "})
	}

})

// server.put('/api/users/:id', (req, res) => {
// 	const {id} = req.params;
// 	const changes = req.body ;

// 	let index = userArr.findIndex(user => user.id === id )

// 	if(index !== -1){
// 		changes.id = shortid.generate();
// 	usersArr[index] = changes 
// 			res.status(200).json(userInfo[index])
// 	}else {
// 		res.status(400).json({message: "user not found "})
// 	}

// })


// -------------------------

const PORT = 5000; 

server.listen(PORT, ()=> {
	console.log('listening ')
})