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
	  ConditionID: 3000, // Condition ID for new items
	  Country: 'CA',
	  Currency: 'CAD',
	  DispatchTimeMax: 3,
	  ListingDuration: 'Days_7',
	  Location: 'Surrey, BC',
	  PaymentMethods: ['PayPal', 'VisaMC', 'AmEx'],
	  PayPalEmailAddress: 'your-paypal-email@example.com',
	  PictureDetails: {
		PictureURL: ['https://example.com/item-picture.jpg']
	  },
	  Quantity: 1,
	  ReturnPolicy: {
		ReturnsAcceptedOption: 'ReturnsNotAccepted'
		// RefundOption: 'MoneyBack',
		// ReturnsWithinOption: 'Days_30',
		// Description: 'If you are not satisfied with the item, you can return it within 30 days for a refund.'
	  },
	  PrimaryCategory: {
		CategoryID: "183454"
	  },
	  ShippingDetails: {
		ShippingServiceOptions: [
		  {
			ShippingServicePriority: 1,
			ShippingService: 'CA_PostLettermail',
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

app.post('/inventory', () => {
	
})