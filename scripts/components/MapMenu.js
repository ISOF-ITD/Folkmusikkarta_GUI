import React from 'react';

import SearchMenu from './SearchMenu';
import SearchBox from './../../ISOF-React-modules/components/views/SearchBox';

export default class MapMenu extends React.Component {
	constructor(props) {
		super(props);

		this.searchBoxSizeChangeHandler = this.searchBoxSizeChangeHandler.bind(this);
		this.searchHandler = this.searchHandler.bind(this);
		this.pointTypeOptionClickHandler = this.pointTypeOptionClickHandler.bind(this);
		this.pointTypeOptionKeyUpHandler = this.pointTypeOptionKeyUpHandler.bind(this);

		this.state = {
			selectedCategory: null,
			expanded: false,
			advanced: false,
			pointTypeOption: 1
		};

		// Lyssna efter event från eventBus som kommer om url:et ändras med nya sökparams
		if (window.eventBus) {
			window.eventBus.addEventListener('application.searchParams', this.receivedSearchParams.bind(this))
		}
	}


	receivedSearchParams(event) {
		// Fick parametrar från eventBus, uppdaterar sökfält
		this.setState({
			searchValue: event.target.searchValue || '',
			searchField: event.target.searchField || 'record',
			searchYearFrom: event.target.searchYearFrom,
			searchYearTo: event.target.searchYearTo,
			searchPersonRelation: event.target.searchPersonRelation || '',
			searchGender: event.target.searchGender || '',
			pointTypeOption: event.target.searchMetadata == 'folkmusik_published' ? 2 : 1
		});
	}

	searchBoxSizeChangeHandler(event) {
		this.setState({
			expanded: event.expanded,
			advanced: event.advanced
		});
	}

	pointTypeOptionKeyUpHandler(event) {
		if(event.keyCode == 13){
			this.pointTypeOptionClickHandler(event);
		}
	}

	pointTypeOptionClickHandler(event) {
		this.setState({
			pointTypeOption: event.currentTarget.dataset.option
		}, function() {
			this.updateRoute();
		}.bind(this));
	}

	searchHandler(searchTerm) {
		console.log('searchHandler')
		this.setState({
			searchValue: searchTerm
		}, function() {
			this.updateRoute();
		}.bind(this));
	}

	updateRoute() {
		this.props.history.push('/places'+(this.state.searchValue && this.state.searchValue != '' ? '/search/'+this.state.searchValue : '')+(this.state.pointTypeOption == 2 ? '/has_metadata/folkmusik_published' : ''));
	}

	render() {
		return (
			<div className={'menu-wrapper'+(this.state.expanded ? ' menu-expanded' : '')+(this.state.advanced ? ' advanced-menu-view' : '')}>

				<div className={'point-type-options map-floating-control option-'+this.state.pointTypeOption}>

					<div tabIndex={0} className="option-item" data-option="1" onClick={this.pointTypeOptionClickHandler} onKeyUp={this.pointTypeOptionKeyUpHandler}>
						<span className="icon icon-marker-normal"></span>
						<span className="label">Alla punkter</span>
					</div>

					<div tabIndex={0} className="option-item" data-option="2" onClick={this.pointTypeOptionClickHandler} onKeyUp={this.pointTypeOptionKeyUpHandler}>
						<span className="icon icon-marker-curated"></span>
						<span className="label">Ljudfiler</span>
					</div>

					<span className="selected-line"></span>

				</div>

				<SearchBox ref="searchBox" 
					onSizeChange={this.searchBoxSizeChangeHandler} onSearch={this.searchHandler} />

				<SearchMenu onSearch={this.searchHandler} />

			</div>
		);
	}
}