import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MapMenu from './MapMenu';
import MapView from './../../ISOF-React-modules/components/views/MapView';
import RoutePopupWindow from './../../ISOF-React-modules/components/controls/RoutePopupWindow';
import LocalLibraryView from './../../ISOF-React-modules/components/views/LocalLibraryView';
import PlaceView from './../../ISOF-React-modules/components/views/PlaceView';
import RecordView from './../../ISOF-React-modules/components/views/RecordView';
import ImageOverlay from './../../ISOF-React-modules/components/views/ImageOverlay';
import FeedbackOverlay from './../../ISOF-React-modules/components/views/FeedbackOverlay';
import TranscriptionOverlay from './../../ISOF-React-modules/components/views/TranscriptionOverlay';
import ContributeInfoOverlay from './../../ISOF-React-modules/components/views/ContributeInfoOverlay';
import PopupNotificationMessage from './../../ISOF-React-modules/components/controls/PopupNotificationMessage';
import OverlayWindow from './../../ISOF-React-modules/components/controls/OverlayWindow';
import GlobalAudioPlayer from './../../ISOF-React-modules/components/views/GlobalAudioPlayer';
import SitevisionContent from './../../ISOF-React-modules/components/controls/SitevisionContent';

import routeHelper from './../utils/routeHelper';
import WindowScroll from './../../ISOF-React-modules/utils/windowScroll';

import config from './../config.js';

import EventBus from 'eventbusjs';

export default class Application extends React.Component {
	constructor(props) {
		super(props);

		// Lägg till globalt eventBus variable för att skicka data mellan moduler
		window.eventBus = EventBus;

		/* Global applicationSettings, includeNordic = false betyder att vi inkluderar inte norskt material som standard
			includeNordic används av ISOF-React-modules/components/collections/MapCollection.js och
			ISOF-React-modules/components/collections/RecordsCollection.js i Nordisk_sägenkarta branchen.
		*/
		window.applicationSettings = {
			includeNordic: false
		};

		// Lissna på event när ljudspelare syns, lägger till .has-docked-control till body class
		window.eventBus.addEventListener('audio.playervisible', this.audioPlayerVisibleHandler.bind(this));

		// Bind all event handlers to this (the actual component) to make component variables available inside the functions
		this.mapMarkerClick = this.mapMarkerClick.bind(this);
		this.popupCloseHandler = this.popupCloseHandler.bind(this);
		this.popupWindowHideHandler = this.popupWindowHideHandler.bind(this);
		this.popupWindowShowHandler = this.popupWindowShowHandler.bind(this);
		this.introOverlayCloseButtonClickHandler = this.introOverlayCloseButtonClickHandler.bind(this);

		this.languageChangedHandler = this.languageChangedHandler.bind(this);

		this.languageChangedHandler = this.languageChangedHandler.bind(this);

		this.state = {
			selectedCategory: null,

			searchValue: '',
			searchField: '',
			searchMetadata: false,
			match: '',

			popupVisible: false
		};
	}

	audioPlayerVisibleHandler() {
		// När GlobalAudioPlayer visas lägger vi till class till document.body för att
		// få utrymme för ljudspelaren i gränssnittet
		document.body.classList.add('has-docked-control');
	}

	mapMarkerClick(placeId) {
		// När användaren klickar på en prick, lägger till #places/[id] till url:et,
		// detta kommer att hanteras av application router
		this.props.history.push(routeHelper.createPlacePathFromPlaces(placeId, this.props.location.pathname));
	}

	popupCloseHandler() {
		// Lägg till rätt route när användaren stänger popuprutan
		if (this.props.location.pathname.indexOf('records/') > -1) {
			this.props.history.push(routeHelper.createPlacesPathFromRecord(this.props.location.pathname));
		}
		else if (this.props.location.pathname.indexOf('places/') > -1) {
			this.props.history.push(routeHelper.createPlacesPathFromPlace(this.props.location.pathname));
		}
		else {
			this.props.history.push('places');
		}
	}

	popupWindowShowHandler() {
		// När popup-rutan är synlig, lägg till popupVisible: true till state,
		// i render() lägger detta till has-overlay class till <div id="app" />
		setTimeout(function() {
			this.setState({
				popupVisible: true
			});
		}.bind(this), 10);
	}

	popupWindowHideHandler() {
		// När popup-rutan är döljd, lägg till popupVisible: false till state
		setTimeout(function() {
			this.setState({
				popupVisible: false
			});
		}.bind(this), 10);
	}

	introOverlayCloseButtonClickHandler() {
		// Skickar overlay.hide via globala eventBus, OverlayWindow tar emot det
		eventBus.dispatch('overlay.hide');

		// Registrerar till localStorage om användaren har valt att inte visa intro igen
		if (this.state.neverShowIntro) {
			localStorage.setItem('neverShowIntro', true);
		}
	}

	languageChangedHandler() {
		// force render när språk har ändras
		this.forceUpdate();
	}

	componentDidMount() {
		if (this.props.match.params.nordic) {
			window.eventBus.dispatch('nordicLegendsUpdate', null, {includeNordic: true});			
		}
		// Skickar alla sök-parametrar via global eventBus
		if (window.eventBus) {
			window.eventBus.dispatch('application.searchParams', {
				selectedCategory: this.props.match.params.category,
				searchValue: this.props.match.params.search,
				searchField: this.props.match.params.search_field,
				searchYearFrom: this.props.match.params.year_from,
				searchYearTo: this.props.match.params.year_to,
				searchPersonRelation: this.props.match.params.person_relation,
				searchGender: this.props.match.params.gender,
				searchMetadata: this.props.match.params.has_metadata
			});

			window.eventBus.addEventListener('Lang.setCurrentLang', this.languageChangedHandler);

			// Väntar två och halv sekund för att visa intro, om användaren inte har valt att visa den inte igen
			setTimeout(function() {
				if (!localStorage.getItem('neverShowIntro')) {
					eventBus.dispatch('overlay.intro');
				}
			}, 2500);
		}

		this.setState({
			selectedCategory: this.props.match.params.category,
			searchValue: this.props.match.params.search,
			searchField: this.props.match.params.search_field,
			searchYearFrom: this.props.match.params.year_from,
			searchYearTo: this.props.match.params.year_to,
			searchPersonRelation: this.props.match.params.person_relation,
			searchGender: this.props.match.params.gender,
			searchMetadata: this.props.match.params.has_metadata,
			match: this.props.match,
		}, function() {
			setTimeout(function() {
				// Väntar en sekund, lägger till app-initialized till body class,
				// detta kör css transition som animerar gränssnittet i början
				document.body.classList.add('app-initialized');
			}.bind(this), 1000);
		}.bind(this));
	}

	UNSAFE_componentWillReceiveProps(props) {
		// När application tar emot parametrar från url:et, skicka dem via eventBus
		// MapView, RecordsList och sökfält tar emot dem och hämtar data
		if (window.eventBus) {
			eventBus.dispatch('application.searchParams', {
				selectedCategory: props.match.params.category,
				searchValue: props.match.params.search,
				searchField: props.match.params.search_field,
				searchYearFrom: props.match.params.year_from,
				searchYearTo: props.match.params.year_to,
				searchPersonRelation: props.match.params.person_relation,
				searchGender: props.match.params.gender,
				searchMetadata: props.match.params.has_metadata
			});
		}

		this.setState({
			selectedCategory: props.match.params.category,
			searchValue: props.match.params.search,
			searchField: props.match.params.search_field,
			searchYearFrom: props.match.params.year_from,
			searchYearTo: props.match.params.year_to,
			searchPersonRelation: props.match.params.person_relation,
			searchGender: props.match.params.gender,
			searchMetadata: props.match.params.has_metadata,
			match: props.match,
		});
	}

	shouldComponentUpdate(nextProps, nextState) {
		// Checkar om gränssnittet skulle uppdateras med att jämföra nya parametrar med förre parametrar
		return (JSON.stringify(nextState) != JSON.stringify(this.state));
	}

	render() {
		// Innehåll av RoutePopupWindow, kommer från application route i app.js
		let props = this.props;
		let match = this.props.match;

		return (
			<div className={'app-container'+(this.state.popupVisible ? ' has-overlay' : '')}>

				<MapView
					searchParams={this.props.match.params}
					onMarkerClick={this.mapMarkerClick}
				>
					<MapMenu
						searchMetadata={this.state.searchMetadata}
						{...props}
					/>

					<LocalLibraryView headerText={l('Mina sägner')} history={props.history} />

					<GlobalAudioPlayer />

				</MapView>

				<Switch>
					<Route
						path="/places/:place_id([0-9]+)">
							<RoutePopupWindow
								onShow={this.popupWindowShowHandler}
								onHide={this.popupWindowHideHandler}
								onClose={this.popupCloseHandler}
								router={this.context.router}>
									<PlaceView match={match}/>
							</RoutePopupWindow>
					</Route>
					<Route 
							path="/places"
							render={() =>
								<RoutePopupWindow
									onShow={this.popupWindowShowHandler}
									onHide={this.popupWindowHideHandler}
									onClose={this.popupCloseHandler}
									router={this.context.router}>
										{props.popup}
								</RoutePopupWindow>
					}/>
					<Route 
							path="/records"
							render={() =>
								<RoutePopupWindow
									onShow={this.popupWindowShowHandler}
									onHide={this.popupWindowHideHandler}
									onClose={this.popupCloseHandler}
									router={this.context.router}>
										<RecordView {...props} />
								</RoutePopupWindow>
					}/>
				</Switch>

				<div className="map-progress"><div className="indicator"></div></div>

				<ImageOverlay />
				<FeedbackOverlay />
				<ContributeInfoOverlay />
				<TranscriptionOverlay />
				<PopupNotificationMessage />

			</div>
		);
	}
}
