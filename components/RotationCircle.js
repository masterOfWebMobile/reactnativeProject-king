import React, {
  Animated,
  Easing,
  Component,
  StyleSheet,
  Text,
  PanResponder,
  View
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Dimensions from 'Dimensions';
import HeaderMenu from './HeaderMenu';

class RotationCircle extends Component {
  constructor(props) {
    super(props);
    this._animatedValue = new Animated.Value(0);
    this.base_exponent_backup = 0;
    this.state = {
      base_exponent: 0
    }
    this._animatedValue.addListener(({value}) => this.setState({base_exponent: value}));
  }

  componentDidMount() {
    
  }

  render() {
    //const slidingAnimationStyle = this.state
     // .slidingRadian
      //.getTranslateTransform(); // Get the initial transform style
    const {_animatedValue, gravity} = this;
    const {base_exponent} = this.state;

    this._panResponder = PanResponder.create({
        onStartShouldSetPanResponder : () => true,
        onPanResponderGrant          : (evt, gestureState) => {this.gravity = 0; this._animatedValue.setValue(this.state.base_exponent);},
        onPanResponderMove           : (e, gestureState) => {this.setState({base_exponent: this.state.base_exponent-gestureState.dy/50}); this.gravity = gestureState.dy},
        onPanResponderRelease        : (e, gestureState) => {
          const {_animatedValue, gravity} = this;
          _animatedValue.setValue(this.state.base_exponent);
          Animated.decay(
            _animatedValue,
            {
              velocity: -gravity/1000,
              deceleration: 0.997,
            }
          ).start();
        }
    });

    var Infos = [
      {title: "BANK CARDS", amount: "3112"},
      {title: "DEBIT CARDS", amount: "4143"},
      {title: "BANK CARDS", amount: "1154"},
      {title: "DEBIT CARDS", amount: "2345"},
      {title: "DEBIT CARDS", amount: "5423"},
      {title: "BANK CARDS", amount: "3674"},
      {title: "DEBIT CARDS", amount: "5234"}
    ];
    var Circles = [];
    var count = 7;
    for (var i = 0; i < count; i++) {
      var radian = Math.pow(1.1, Math.abs(((base_exponent+i*4) % (4*count) + 4*count) % (4*count)) - 2*count);
      //radian = Math.abs(radian % (Math.PI*2)-Math.PI);
      var radius = radian+1;
      if(radius > 5)
        radius = 0;

      Circles.push({radius: radius/2, radian: radian, dollar: Infos[i % 7].amount, title: Infos[i % 7].title});
      
    }
    circle_x = Dimensions.get('window').width;

    circle_y = circle_x * 1;
    radius = circle_x * 0.8;
    circle_radius = circle_x * 0.48;
    Circles = Circles.sort(function(a,b){
      return a.radius>b.radius;
    }).map(function(object, index) {
      var animateStyle = {transform: [{translateX:  -Math.sin(object.radian)*radius+circle_x}, {translateY: Math.cos(object.radian)*radius+circle_y}, 
      {scaleX: object.radius}, {scaleY: object.radius}], position: 'absolute',
        backgroundColor: 'rgba(255,'+(200-object.radian*50)+',50,1)'}
      return (
        <View key={index}>
          <Animated.View style={[styles.circle, animateStyle, {
            shadowOffset:{
              width: 0,
              height: 10
            },
            width: circle_radius,
            height: circle_radius,
            borderRadius: circle_radius/2
            }]} key={"main"}>
            <View style={{left: 0, top: circle_radius*9/20, width: circle_radius, position: 'absolute', alignItems: 'center', backgroundColor: 'transparent'}}>
              <View style = {{flexDirection: 'row', alignItems: 'flex-end'}}>
                <Text style={{fontSize: circle_radius*3/20, color: 'white'}}>{object.dollar}</Text>
                <Text style={{fontSize: circle_radius*3/50, color: 'white', paddingBottom: 2}}>usd</Text>
              </View>
              <Text style={{fontSize: circle_radius*3/50}}>{object.title}</Text>
            </View>
            
          </Animated.View>
        </View>
      );
    });

    const {props} = this;
    return (

      <View  {...this._panResponder.panHandlers}>
        <View style={{left:-1000, top: -1000, width:2000, height:2000, position: 'absolute', backgroundColor: '#3D313D'}}/>
        <HeaderMenu onClickTmpButton = {props.onClickTmpButton}
          tmpButtonLabel = {props.tmpButtonLabel}/>
        {Circles}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    left: 50, top: 50, position: 'absolute'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  circle: {
    shadowColor: 'black',
    shadowOpacity: 0.5,
  },
});

export default RotationCircle;