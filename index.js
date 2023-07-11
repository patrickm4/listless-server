import express from 'express';
import eBayApi from 'ebay-api';
import config from './config.js';

const app = express()
const port = 3030

const eBay = new eBayApi({
	appId: config.appId,
	certId: config.certId,
	sandbox: true,
	siteId: eBayApi.SiteId.EBAY_ENCA,
	devId: config.devId,
	authToken: config.authToken.testuser_jimtest
});  

const itemData = {
	Item: {
	  Title: 'Example Item',
	  Description: {
		__cdata: '<div>This is an example item for demonstration purposes.</div>'
	  },
	  StartPrice: '10.00',
	  CategoryMappingAllowed: true,
	  ConditionID: 1000, // Condition ID for new items
	  Country: 'US',
	  Currency: 'USD',
	  ListingDuration: 'Days_7',
	  Location: 'San Jose, CA',
	  PaymentMethods: ['PayPal'],
	  PayPalEmailAddress: 'your-paypal-email@example.com',
	  PictureDetails: {
		PictureURL: ['https://example.com/item-picture.jpg']
	  },
	  Quantity: 1,
	  ReturnPolicy: {
		ReturnsAcceptedOption: 'ReturnsAccepted',
		RefundOption: 'MoneyBack',
		ReturnsWithinOption: 'Days_30',
		Description: 'If you are not satisfied with the item, you can return it within 30 days for a refund.'
	  },
	  ShippingDetails: {
		ShippingServiceOptions: [
		  {
			ShippingServicePriority: 1,
			ShippingService: 'USPSFirstClass',
			ShippingServiceCost: '0.00'
		  }
		],
		ShippingType: 'Flat'
	  }
	}
  };
  

// Middleware to parse JSON
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
	console.log('Server listening to port', port)
})

app.get('/', (req, res) => {
	res.send('HELLLOo')
})

app.post('/add-item', (req, res) => {
	console.log("add-item endpoint")

	eBay.trading.AddItem(itemData)
	.then(result => {
		const data = JSON.stringify(result, null, 2)
		console.log(JSON.stringify(result, null, 2));
		res.send({ok:true, data: data})
	}).catch(e => {
		console.error('add-item error: ', e);
		res.send({ok:false, err: e.meta.Errors})
	});

	// eBay.ebayApiPostXmlRequest({
	// 	serviceName: 'Trading',
	// 	opType: 'AddItem',
	// 	devId: eBayConfig.devId,
	// 	certId: eBayConfig.certId,
	// 	appName: eBayConfig.appName,
	// 	authToken: eBayConfig.authToken,
	// 	sandbox: eBayConfig.sandbox,
	// 	params: itemData
	//   }, (error, data) => {
	// 	if (error) {
	// 	  console.error('Error:', error);
	// 	} else {
	// 	  console.log('Response:', data);
	// 	}
	//   });	  
})