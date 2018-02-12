export default {
	// Namn på localStorage som lagrar sparade sägner
	localLibraryName: 'folkmusikkarta_library',

	// Parametrar som alltid skulle skickas till API:et, här passar vi på att sägenkartan alltid hämtar textar av typ arkiv eller tryckt och som finns i en kategori
	requiredParams: {
		type: 'folkmusik'
	},

	// Speciella inställningar för projektet, används nu mest för Matkarta-GUI, siteOptions som property av config måste dock finnas
	siteOptions: {
	/*
		recordList: {
			// Döljd materialtyp i RecordList, används för matkartan
			hideMaterialType: true,

			// Vilka kategorier vi vill visa i listan, här vill vi bara visa matkarta kategorier men dölja frågolista-kategorier
			visibleCategories: ['matkarta']
		},
		// Inaktivera länker till personer, visa bara namnet
		disablePersonLinks: true
	*/
	},

	// Vilket land
	country: 'sweden',

	// Webbsida som ska visas i OverlayWindow när användaren först kommer till kartan
	startPageUrl: 'http://www.sprakochfolkminnen.se/om-oss/kartor/sagenkartan/om-sagenkartan---kort.html',

	imageUrl: 'http://www4.sprakochfolkminnen.se/Folkminnen/Svenska_sagor_filer/',
	audioUrl: 'http://www4.sprakochfolkminnen.se/Folkminnen/Svenska_sagor_filer/inspelningar/',

	appUrl: 'http://www4.sprakochfolkminnen.se/sagner/',
	siteUrl: 'http://www.sprakochfolkminnen.se/om-oss/kartor/sagenkartan.html',

	// Url till Django/Elasticsearch API
	apiUrl: 'http://frigg.sprakochfolkminnen.se/sagendatabas/api/es/',

	// Url till Django Rest API
	restApiUrl: 'http://frigg-test.sprakochfolkminnen.se/sagendatabas/api/'
};