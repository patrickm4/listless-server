import express from 'express';
import eBayApi from 'ebay-api';
import config from 'config.js';

const app = express()
const port = 3030

const eBay = new eBayApi({
	appId: config.appId,
	certId: config.certId,
	sandbox: true,
	siteId: eBayApi.SiteId.EBAY_ENCA,
	devId: config.devId,
});  

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