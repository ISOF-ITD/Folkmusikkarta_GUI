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
			// Döljd materialtyp i RecordList
			hideMaterialType: true,
			hideCategories: true,
			displayPlayButton: true
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
		}
	},

	// Vilket land
	country: 'sweden',

	// Webbsida som ska visas i OverlayWindow när användaren först kommer till kartan
	startPageUrl: 'https://www.sprakochfolkminnen.se/om-oss/kartor/sagenkartan/om-sagenkartan---kort.html',

	imageUrl: 'https://filemaker.sprakochfolkminnen.se/',
	audioUrl: 'https://filemaker.sprakochfolkminnen.se/',

	appUrl: 'https://www4.sprakochfolkminnen.se/folkmusik/',
	siteUrl: 'https://www.sprakochfolkminnen.se/om-oss/kartor/sagenkartan.html',

	// Url till Django/Elasticsearch API
	apiUrl: 'https://frigg-test.sprakochfolkminnen.se/sagendatabas/api/es/',

	// Url till Django Rest API
	restApiUrl: 'https://frigg-test.sprakochfolkminnen.se/sagendatabas/api/'
};