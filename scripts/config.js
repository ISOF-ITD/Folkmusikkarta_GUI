export default {
	// Namn på localStorage som lagrar sparade sägner
	localLibraryName: 'folkmusikkarta_library',

	// Parametrar som alltid skulle skickas till API:et, här passar vi på att sägenkartan alltid hämtar textar av typ arkiv eller tryckt och som finns i en kategori
	requiredParams: {
		type: 'folkmusik',
		mark_metadata: 'folkmusik_published',
	},

	// Speciella inställningar för projektet, används nu mest för Matkarta-GUI, siteOptions som property av config måste dock finnas
	siteOptions: {
		recordList: {
			// Visa playbutton i RecordList, används för ?
			displayPlayButton: true,

			// Döljd materialtyp i RecordList, används för matkartan
			hideMaterialType: true,

			// Döljd accession:page i RecordList, används för dialektkartan
			hideAccessionpage: true,

			// Dölj kategorier kolumn i RecordList, används för folkmusiken
			hideCategories: true,

			// Dölj TranscriptionStatus kolumn i RecordList, används bara för crowdsource?
			hideTranscriptionStatus: true,

			// Vilka kategorier vi vill visa i listan, här vill vi bara visa matkarta kategorier men dölja frågolista-kategorier
			//visibleCategories: ['sägner']
		},

		recordView: {
			visible_metadata_fields: [
				'folkmusik_instrument',
				'folkmusik_recorded_by',
				'folkmusik_musician_name',
				'folkmusik_genre',
				'folkmusik_proveniens',
				'folkmusik_comment'
			],

			// Placering av ljudspelare ('under'|'right' (standard 'right'))
			audioPlayerPosition: 'under',

			// Placering av pdf filer ('under'|'right' (standard 'right'))
			pdfIconsPosition: 'under'
		},

		metadataLabels: {
			folkmusik_instrument: 'Sång/instrument',
			folkmusik_recorded_by: 'Inspelat eller inlämnat av',
			folkmusik_musician_name: 'Sångare/instrumentalist',
			folkmusik_genre: 'Låttyp eller visgenre',
			folkmusik_proveniens: 'Proveniens',
			folkmusik_comment: 'Övrigt'
		},
		feedbackText: 'Har du hittat några fel i Folkmusikdatabasen? Har du kompletterande information om musik eller text? Eller vill du hjälpa till på annat sätt? Kontakta oss gärna!',
	},

	// Vilket land
	country: 'sweden',

	// Webbsida som ska visas i OverlayWindow när användaren först kommer till kartan
	startPageUrl: 'https://www.isof.se/om-oss/kartor/sagenkartan/om-sagenkartan---kort.html',

	imageUrl: 'https://filemaker.isof.se/',
	audioUrl: 'https://filemaker.isof.se/',

	appUrl: 'https://frigg.isof.se/static/js-apps/folkmusikkartan/',
	siteUrl: 'https://www.isof.se/folkminnen/projekt/hitta-folkmusiken/databasen-hitta-folkmusiken.html',

	// Url till Django/Elasticsearch API
	apiUrl: 'https://frigg.isof.se/sagendatabas/api/es/',

	// Url till Django Rest API
	restApiUrl: 'https://frigg.isof.se/sagendatabas/api/'
};