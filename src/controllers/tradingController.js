import eBayApi from 'ebay-api';
import config from 'listless-server/config.js';

const eBay = new eBayApi({
	appId: config.appId,
	certId: config.certId,
	sandbox: true,
	siteId: eBayApi.SiteId.EBAY_ENCA,
	devId: config.devId,
	authToken: config.authToken.testuser_jimtest
});

export const addItem = () => {
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

    eBay.trading.AddItem(itemData)
	.then(result => {
		const data = JSON.stringify(result, null, 2)
		return data
	}).catch(e => {
        throw new Error(e)
	});
}

export const getSellerList = () => {
    const event = new Date('10 June 2023 14:48 UTC');
    const event2 = new Date('16 July 2023 14:48 UTC');

    const input = {
        StartTimeFrom: event.toISOString(),
        StartTimeTo: event2.toISOString()
    }

    return eBay.trading.GetSellerList(input)
    .then(result => {
        return result
    })
    .catch(err => {
        throw new Error(err)
    })
}