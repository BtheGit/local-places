import React, { Component } from  'react';
import { hidePlacescreen } from '../actions/actions';
import Lightbox from 'react-image-lightbox';

class Place extends Component {
	constructor(props) {
		super(props);
		this.state = {
            photoIndex: 0,
            isOpen: false
        };
	}

	renderPlace(place) {


		return(
			<div>
				<h1>{place.title || ''}</h1>
				<div>
					{place.imagesArray.length > 0 ? <img src={place.imagesArray[0]} className="placescreen-img" onClick={() => this.setState({ isOpen: true })}/> : null}
				</div>
				<a href={place.website} target="_blank">{place.website}</a>
				<p>{place.address || ''}</p>
				<br/>
				<h3>{place.summary || ''}</h3>
				<p>Rating: {place.rating || 'N/A'}</p>
				<br/>
				<div className="placescreen-desc">{place.description || ''}</div>
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
			<div className="placescreen">
				<a id="placescreen-btn-close" onClick={(e) => this.props.dispatch(hidePlacescreen())}>✕</a>
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
