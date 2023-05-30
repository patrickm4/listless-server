import express from 'express';

const app = express()
const port = 3030

// Middleware to parse JSON
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
	console.log('Server listening to port', port)
})


// app.get('/start-engine', engine)
app.get('/', (req, res) => {
	res.send('HELLLOo')
})