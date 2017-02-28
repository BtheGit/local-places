//from https://github.com/glennflanagan/react-collapsible/
import React, { Component } from 'react';
import SidebarPlace from './SidebarPlace';
import icons from '../media/inlineIcons';

class Collapsible extends Component {

  constructor(props){
    super(props);
    this.state = {
        isClosed: true,
        shouldSwitchAutoOnNextCycle: false,
        height: 0,
        transition: 'height ' + this.props.transitionTime + 'ms ' + this.props.easing,
        hasBeenOpened: false,
        overflow: 'hidden',
        transitionTime: 400,
        easing: 'linear',
        open: false,
        classParentString: 'Collapsible',
        overflowWhenOpen: 'hidden'
      }


  }

  // Taken from https://github.com/EvandroLG/transitionEnd/
  // Determines which prefixed event to listen for
  whichTransitionEnd = (element) => {
      const transitions = {
          'WebkitTransition' : 'webkitTransitionEnd',
          'MozTransition'    : 'transitionend',
          'OTransition'      : 'oTransitionEnd otransitionend',
          'transition'       : 'transitionend'
      };

      for(let t in transitions){
          if(element.style[t] !== undefined){
              return transitions[t];
          }
      }
  }

  componentDidMount = () => {
    //Set up event listener to listen to transitionend so we can switch the height from fixed pixel to auto for much responsiveness;
    //TODO:  Once Synthetic transitionend events have been exposed in the next release of React move this funciton to a function handed to the onTransitionEnd prop

    this.refs.outer.addEventListener(this.whichTransitionEnd(this.refs.outer), (event) => {
      if(this.state.isClosed === false){
        this.setState({
          shouldSwitchAutoOnNextCycle: true
        });
      }

    });
  }

  componentDidUpdate = (prevProps) =>{

    if(this.state.shouldSwitchAutoOnNextCycle === true && this.state.isClosed === false) {
      //Set the height to auto to make compoenent re-render with the height set to auto.
      //This way the dropdown will be responsive and also change height if there is another dropdown within it.
      this.makeResponsive();
    }

    if(this.state.shouldSwitchAutoOnNextCycle === true && this.state.isClosed === true) {
      this.prepareToOpen();
    }

    //If there has been a change in the open prop (controlled by accordion)
    if(prevProps.open != this.props.open) {
      console.log('Open state changed!', this.props.accordionPosition);

      if(this.props.open === true) {
        this.openCollapsible();
      }
      else {
        this.closeCollapsible();
      }
    }
  }


  handleTriggerClick = (event) => {
    event.preventDefault();
    if(this.state.isClosed === true){
      this.openCollapsible();
    }
    else {
      this.closeCollapsible();
    }
  }

  closeCollapsible = () => {
    this.setState({
      isClosed: true,
      shouldSwitchAutoOnNextCycle: true,
      height: this.refs.inner.offsetHeight,
      overflow: 'hidden',
    });
  }

  openCollapsible = () => {
    this.setState({
      height: this.refs.inner.offsetHeight,
      transition: 'height ' + this.props.transitionTime + 'ms ' + this.props.easing,
      isClosed: false,
      hasBeenOpened: true
    });
  }

  makeResponsive = () => {
    this.setState({
      height: 'auto',
      transition: 'none',
      shouldSwitchAutoOnNextCycle: false,
      overflow: this.props.overflowWhenOpen
    });
  }

  prepareToOpen = () => {
    //The height has been changes back to fixed pixel, we set a small timeout to force the CSS transition back to 0 on the next tick.
    window.setTimeout(() => {
      this.setState({
        height: 0,
        shouldSwitchAutoOnNextCycle: false,
        transition: 'height ' + this.props.transitionTime + 'ms ' + this.props.easing
      });
    }, 50);
  }

  // handleHoverOn: function() {
  //   console.log(this.props.markerIcons);
  //   this.props.place.marker.setIcon(this.props.markerIcons.Highlighted);
  // },

  // handleHoverOff: function() {
  //   this.props.place.marker.setIcon(this.props.markerIcons[this.props.place.subCategory] || this.props.markerIcons[this.props.place.category] || this.props.markerIcons.Default);
  // },

  render = () => {
    const dropdownStyle = {
      height: this.state.height,
      WebkitTransition: this.state.transition,
      msTransition: this.state.transition,
      transition: this.state.transition,
      overflow: this.state.overflow
    }

    const openClass = this.state.isClosed ? 'is-closed' : 'is-open';

    return(
      <div className={this.props.classParentString} id={this.props.placeId} onMouseEnter={this.handleHoverOn} onMouseLeave={this.handleHoverOff}>
        <span className={this.props.classParentString + "__trigger" + ' ' + openClass} id={this.props.idParentString} onClick={this.handleTriggerClick}>{this.props.trigger}</span>
        <div className={this.props.classParentString + "__contentOuter" } ref="outer" style={dropdownStyle}>
          <div className={this.props.classParentString + "__contentInner"} ref="inner">
            <SidebarPlace
              key={this.props.iterKey}
              iterKey={this.props.iterKey}
              highlightSelectedPlace={this.props.highlightSelectedPlace}
              dispatch={this.props.dispatch}
              place={this.props.place}
            />
          </div>
        </div>
      </div>
    );
  }

};

export default Collapsible;
