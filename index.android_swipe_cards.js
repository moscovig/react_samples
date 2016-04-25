/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
	  Image,
	  Navigator,
  TouchableOpacity,
  Animation
} from 'react-native';



	  
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var displayText = ""
class swipe_cards  extends React.Component {
	
	    constructor(){
        super()
      
        this.state = {
              x:0,y: 0,
			      lastDragDirectio: displayText

        };
			    this.resetPosition = this.resetPosition.bind(this);
			    this.setPosition = this.setPosition.bind(this);

	this.drag = {
		x:0,y:0
		}
    }
	


  setPosition(e) {
    //Update our state with the deltaX/deltaY of the movement
    this.setState({
      x: this.state.x + (e.nativeEvent.pageX - this.drag.x),
      y: this.state.y + (e.nativeEvent.pageY - this.drag.y)
    });
    this.drag.x = e.nativeEvent.pageX;
    this.drag.y = e.nativeEvent.pageY;
  }

  resetPosition(e) {
    this.dragging = false;
    //Reset on release

	
    var left = e.nativeEvent.pageX < (windowSize.width/2),
        displayText = left ? 'Released left' : 'Released right';
	  
	      this.setState({
      x: 0,
      y: 0,
		lastDragDirectio: displayText
    })
  }

 _onStartShouldSetResponder(e) {
    this.dragging = true;
    this.rotateTop = e.nativeEvent.locationY <= 150;
    this.drag = {
      x: e.nativeEvent.pageX,
      y: e.nativeEvent.pageY
    }
    return true;
  }
  getRotationDegree(rotateTop, x) {
    var rotation = ( (x/windowSize.width) * 100)/3;
    var rotate = rotateTop ? 1 : -1,
        rotateString = (rotation * rotate) + 'deg';
    return rotateString;
  }
  getCardStyle() {
    var transform = [{translateX: this.state.x}, {translateY: this.state.y}];
    if (this.dragging) {
        transform.push({rotate: this.getRotationDegree(this.rotateTop, this.state.x)})
    }
    return {transform: transform};
  }
	  
render() {
    return (
      <View style={styles.container}>
          <View
            onResponderMove={this.setPosition}
            onResponderRelease={this.resetPosition}
            onStartShouldSetResponder={this._onStartShouldSetResponder}
            onMoveShouldSetResponder={this._onMoveShouldSetResponder}
            style={[styles.card, this.getCardStyle()]}
          >
            <Image source={require('./images/moshe.jpg')} style={styles.cardImage} />
                    <View style={styles.cardTextContainer}>
              <Text style={styles.textLeft}>Rabbit, 10</Text>
              <Text style={styles.textRight}>1 Connection</Text>
            </View>
          </View>
          <View style={styles.dragText}>
            <Text>{this.state.lastDragDirectio}</Text>
          </View>
      </View>
    );
  }
};
var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dragText: {
    position: 'absolute',
    bottom: 0,
    left: 0
  },
  card: {
    borderWidth: 3,
    borderRadius: 3,
    borderColor: '#000',
    width: 300,
    height: 300,
    padding: 10
  },
  cardImage: {
    height: 260,
	   width: 280
  },
  textLeft: {
    position: 'absolute',
    left:0,
    top:0
  },
  textRight: {
    position: 'absolute',
    right: 0,
    top: 0
  }
});

AppRegistry.registerComponent('swipe_cards', () => swipe_cards);
