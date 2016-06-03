import React, {
  Component,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';
import Dimensions from 'Dimensions';
import HeaderMenu from './HeaderMenu';
import Button from 'react-native-button';

//Get the screen width and height.
const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

class MainCard extends Component{
	constructor(props){
		super(props);

		this.styles = StyleSheet.create({
			mainCard: {
				backgroundColor: '#FF6664',
				width: screen_width * 0.8,
				height: screen_height * 0.25,
				borderRadius : 3,
				padding: screen_width * 0.0625,
				shadowColor: 'black',
				shadowOpacity: 0.3,
				shadowRadius: 10,
				shadowOffset:{
					width: 0,
					height: 10
				},
			},

			paymentAmountLabel: {
				fontSize: screen_height * 0.017,
				color: '#3D313D',
				fontFamily: 'JosefinSans-Bold'
			},

			bottomView: {
				left: screen_width * 0.0625, 
				bottom: screen_width * 0.0625, 
				position: 'absolute',
				flex: 1,
				width: screen_width * 0.675,
			},

			paymentAmountBig: {
				fontSize: screen_height * 0.065,
				height: screen_height * 0.065,
				fontFamily: 'Letter Gothic Std',
				color: 'white',
			},

			paymentAmountSmall: {
				fontSize: screen_height * 0.013,
			},

			paymentType: {
				color: 'white',
				fontSize: screen_height * 0.019,
				height: screen_height * 0.019,
			},

			paymentTypeBlock: {
				 flex: 1, 
				 flexDirection: 'row'
			},

			paymentUnitButtonBlock: {
				right: 0,
				position: 'absolute',

			},

			paymentUnitButton: {
				color: 'white',
				fontSize: screen_height * 0.015,
				backgroundColor: '#677ada',
				paddingTop: screen_height * 0.012,
				paddingBottom: screen_height * 0.012,
				paddingLeft: screen_width * 0.067,
				paddingRight: screen_width * 0.067,
				borderRadius: screen_height * 0.02,
				overflow: 'hidden'
			}
		});
	}
	render(){
		const {styles, props} = this;
		const payment_amount_int = parseInt(props.payment_detail.amount);
		const payment_amount_decimal_part = '.' + (parseInt(props.payment_detail.amount * 100)+'').substr(-2);
		return (
			<View style = {[styles.mainCard, this.props.style]}>
				<Text style={styles.paymentAmountLabel}>
					PAYMENT AMOUNT
				</Text>
				<View style={styles.bottomView}>
					<Text style={styles.paymentAmountBig}>
						{payment_amount_int}
						<Text style={styles.paymentAmountSmall}>
							{payment_amount_decimal_part}
						</Text>
					</Text>
					<View style={styles.paymentTypeBlock}>
						<Text style={styles.paymentType}>
							{props.payment_detail.type}
						</Text>
						<View style={styles.paymentUnitButtonBlock}>
							<Button style={styles.paymentUnitButton}>
								USD
							</Button>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

class DetailInfo extends Component{
	constructor(props){
		super(props);
		this.styles = StyleSheet.create({
			detailInfo: {
				height: screen_height * 0.124,
				borderBottomWidth: props.disable_border?0:1,
				flexDirection: 'row',
				alignItems: 'center',
				borderBottomColor: '#dee8ef',
				backgroundColor: 'transparent'
			},

			mainBlock: {
				flexDirection: 'row',
				alignItems: 'flex-end'
			},

			title: {
				color: '#aebecc',
				fontSize: screen_height * 0.014,
			},

			text: {
				color: '#44566c',
				fontSize: screen_height * 0.024,
				marginTop: 3
			},

			headerPlayerPhoto: {
				height: screen_height * 0.023,
				width: screen_width * 0.0625,
				marginBottom: screen_height * 0.005,
				resizeMode : Image.resizeMode.contain
			},

			titleAndText: {
				marginLeft: screen_width * 0.018
			}
		})
	}

	render(){
		const {styles, props} = this;
		const img_src = props.img_src;
		return(
			<View style={styles.detailInfo}>
				<View style={styles.mainBlock}>
					<Image 
	                	style={styles.headerPlayerPhoto}
	                	source={img_src} />
					<View style={styles.titleAndText}>
						<Text style={styles.title}>{props.title}</Text>
						<Text style={styles.text}>{props.text}</Text>
					</View>
				</View>
			</View>
		);
	}
}

class DetailCard extends Component{
	constructor(props){
		super(props);

		this.styles = StyleSheet.create({
			detailCard:{
				backgroundColor: '#FFFFFF',
				width: screen_width * 0.9,
				height: screen_height * 0.677,
				borderRadius : 3,
				alignItems: 'stretch',
				paddingLeft:  screen_width * 0.05,
				paddingRight:  screen_width * 0.05,
			},

			marginMainCard: {
				marginTop: -screen_height * 0.074,
			}
		});
	}

	render(){
		const {styles, props} = this;
		return (
			<View style = {styles.detailCard}>
				<MainCard style={styles.marginMainCard} payment_detail = {props.payment_detail}/>
				<DetailInfo 
					img_src={require('../assets/images/payment_detail/payment_id.png')} 
					title='PAYMENT ID' 
					text={props.payment_detail.payment_id}/>
				<DetailInfo 
					img_src={require('../assets/images/payment_detail/payment_date.png')} 
					title='PAYMENT DATE' 
					text={props.payment_detail.payment_date}/>
				<DetailInfo 
					img_src={require('../assets/images/payment_detail/payment_status.png')} 
					title='PAYMENT STATUS' 
					text={props.payment_detail.payment_status}/>
				<DetailInfo 
					img_src={require('../assets/images/payment_detail/payment_details.png')} 
					title='PAYMENT DETAILS' 
					text={props.payment_detail.payment_details}
					disable_border={true}/>
			</View>
		);
	}
}

class PaymentDetails extends Component {

	constructor(props) {
		super(props);

		this.styles = StyleSheet.create({
			
			paymentDetails: {
				flex: 1,
				alignItems: 'center',
				backgroundColor: '#3D313D',
				width: screen_width,
			},

			heading: {
				height: screen_height * 0.12,
				color: 'white',
				fontSize: screen_height * 0.03,
				fontFamily: 'Letter Gothic Std'
			},

			mainBlock: {
				position: 'absolute',
				alignItems: 'center',
				bottom: screen_width * 0.05,
				left: screen_width * 0.05
			}
		});
	}

	render() {
		const {styles, props} = this;
		return (
			<View style={styles.paymentDetails}>
				<HeaderMenu onClickTmpButton = {props.onClickTmpButton}
          			tmpButtonLabel = {props.tmpButtonLabel}/>
				<View style = {styles.mainBlock}>
					<Text style={styles.heading}>
						PAYMENT DETAILS
					</Text>
					<DetailCard payment_detail = {props.payment_detail}/>
				</View>
			</View>
		)
	}
}

export default PaymentDetails;