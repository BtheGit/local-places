import React, { Component } from  'react';
import { hidePlacescreen } from '../actions/actions';
import Lightbox from 'react-image-lightbox';

const rippleSVG = (
	<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		 viewBox="0 0 304.7 304.7" className="ripples">
	<circle id="XMLID_1_" className="ripple-1" cx="152.4" cy="152.4" r="112.9"/>
	<circle id="XMLID_2_" className="ripple-2" cx="152.4" cy="152.4" r="134.7"/>
	<circle id="XMLID_3_" className="ripple-3" cx="152.4" cy="152.4" r="151.9"/>
	</svg>);


class Place extends Component {
	constructor(props) {
		super(props);
		this.state = {
            photoIndex: 0,
            isOpen: false
        };
	}

	renderPlace(place) {
		const category = place.category ? 'cat-'+place.category.toLowerCase() : '';

		return(
			<div className={'wrapper '+category}>
				<div className="hero-col">
					<div className="col-inner-wrapper">
						<a id="placescreen-btn-close" onClick={(e) => this.props.dispatch(hidePlacescreen())}>✕</a>
						<h1>{place.title || ''}</h1>
						<hr className="title-separator" />
						<h2>{place.summary || ''}</h2>
						<div className="img-circle-wrapper">
							<div className="img-circle">
								{place.imagesArray.length > 0 ? <img src={place.imagesArray[0]} className="placescreen-img" onClick={() => this.setState({ isOpen: true })}/> : null}
							</div>
							{rippleSVG}
						</div>
						<br />
						<a className="website-link" href={place.website} target="_blank">{place.website}</a>
					</div>
				</div>
				<div className="info-col">
					<div className="col-inner-wrapper">
						<div className="details">
							<b>Phone</b>
							<p>{place.phone || 'N/A'}</p>
							<b>Address</b>
							<p>{place.address || 'N/A'}</p>
							<b>Hours</b>
							<p>{place.hours || 'N/A'}</p>
						</div>
						<div className="description">
							<h3>Description</h3>
							<p>{place.description || ''}</p>
						</div>
						<div className="more-images">
							<h3>More Images</h3>
						</div>
					</div>
				</div>
			</div>
		)
	}

	render() {

		const {
            photoIndex,
            isOpen,
        } = this.state;
        const images = this.props.place[0].imagesArray;
		return (
			<div className="placescreen" key={this.props.key}>
				{this.renderPlace(this.props.place[0])}


				{isOpen &&
	                <Lightbox
	                    mainSrc={images[photoIndex]}
	                    nextSrc={images[(photoIndex + 1) % images.length]}
	                    prevSrc={images[(photoIndex + images.length - 1) % images.length]}

	                    onCloseRequest={() => this.setState({ isOpen: false })}
	                    onMovePrevRequest={() => this.setState({
	                        photoIndex: (photoIndex + images.length - 1) % images.length,
	                    })}
	                    onMoveNextRequest={() => this.setState({
	                        photoIndex: (photoIndex + 1) % images.length,
	                    })}
	                />
	            }
			</div>

		)
	}
}

export default Place;
