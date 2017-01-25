import React, { Component } from 'react';

class Formscreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// lat: '',
			// lng: '',
			// name: '',
			// category: '',
			// subcategory: '',
			// address: '',
			// phone: '',
			// website: '',
			// summary: '',
			// description: '',
			// images: []
		}
	}

	handleSubmit(event) {
		//validation
		console.log('submit')
		console.log(this.state)
		event.preventDefault();
	}

	handleChange (event, id){
		this.setState({[id]: event.target.value})
	}

	handleBlur(event) {
		//validation
	}

	validate() {

	}

	renderFormElement(label, id, type) {

		return(
			<label>
				{label}  
				<input 
					id 
					type 
					value={this.state.value} 
					onChange={(event) => this.handleChange(event, id)} 
					onBlur={(event) => this.handleBlur(event)}
				/>
			</label>			
		)
	}

	renderForm() {
		return (
			<form onSubmit={(event) => this.handleSubmit(event)}>
				{this.renderFormElement('Name', 'name', 'text')}
				{this.renderFormElement('Website', 'website', 'text')}
				{this.renderFormElement('Latitude', 'lat', 'text')}
				{this.renderFormElement('Longitude', 'lng', 'text')}
				<input type="submit" value="Submit"/>
			</form>
		)
	}

	componentDidMount() {

	}

	render() {
		return (
			<div className="formscreen-container">
				{this.renderForm()}
			</div>
		)
	}
}

export default Formscreen;