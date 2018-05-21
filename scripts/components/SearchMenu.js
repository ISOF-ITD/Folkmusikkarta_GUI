import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';
import { hashHistory } from 'react-router';

import CategoryList from './CategoryList';
import categories from './../../ISOF-React-modules/utils/sagenkartaCategories.js';

export default class SearchMenu extends React.Component {
	constructor(props) {
		super(props);

		this.menuButtonClick = this.menuButtonClick.bind(this);
		this.toggleMinimize = this.toggleMinimize.bind(this);
		this.termClickHandler = this.termClickHandler.bind(this);

		this.state = {
			menuOpen: false,
			minimized: document.documentElement.clientWidth < 500 || false
		};

		this.searchTerms = {
			instruments: [
				'Dragspel',
				'Durspel',
				'Fiol',
				'Sång',
				'Läses',
				'Gitarr',
				'Nyckelharpa',
				'Tramporgel',
				'Piano'
			],
			genre: [
				'Låt',
				'Visa',
				'Schottis',
				'Vals',
				'Brudvals',
				'Tango',
				'Dans',
				'Polska',
				'Mazurka'
			]
		};
	}

	menuButtonClick() {
		this.setState({
			menuOpen: !this.state.menuOpen
		});
	}

	toggleMinimize() {
		this.setState({
			minimized: !this.state.minimized
		});
	}

	termClickHandler(event) {
		if (this.props.onSearch) {
			this.props.onSearch(event.currentTarget.dataset.term);
		}
	}

	render() {
		return (
			<div ref="container" className={'heading-list-wrapper'+(this.state.minimized ? ' minimized' : '')}>
				<div className="list-heading panel-heading">
					<span className="heading-label">Sökord</span>

					<button onClick={this.toggleMinimize} className="minimize-button"><span>Minimera</span></button>
				</div>

				<div className={'list-container minimal-scrollbar'}>

					<a className="item" href="#/places">Visa alla</a>

					<div className="list-subheading">Låttyp eller visgenre</div>

					<div className="grid-list">
						{
							_.map(this.searchTerms.genre, function(term) {
								return <a onClick={this.termClickHandler} data-term={term} className="item" key={term}>{term}</a>;
							}.bind(this))
						}
						<div className="u-cf" />
					</div>

					<div className="list-subheading">Sång/instrument</div>
					<div className="grid-list">
						{
							_.map(this.searchTerms.instruments, function(term) {
								return <a onClick={this.termClickHandler} data-term={term} className="item" key={term}>{term}</a>;
							}.bind(this))
						}
						<div className="u-cf" />
					</div>

				</div>
			</div>
		);
	}
}