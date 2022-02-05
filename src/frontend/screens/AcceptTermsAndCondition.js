import React, { useState, useContext } from 'react';
import {
	View,
	SafeAreaView,
	Text,
	Image,
	ScrollView,
	TouchableOpacity,
	StatusBar,
	Platform,
} from 'react-native';

import androidSafeAreaView from '../styling/AndroidSafeAreaView';
import styles from '../styling/TermsAndCondition';
import { ThemeProvider, useTheme } from '@react-navigation/native';
import { Checkbox } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import MenuHeader from '../components/MenuHeader';
import HomeButton from '../components/HomeButton';
import { AuthContext } from '../Context';

function AcceptTermsAndCondition(props) {
	const { colors } = useTheme();
	const style = styles(colors);
	const [status, setState] = useState('unchecked');
	const [disabled, setEnable] = useState(true);
	const [greyed, setStyle] = useState(0.6);

	const [show, setShow] = useState(props.route.params.isAcceptScreen);

	const { getToken, setTCAccepted, getPrivacyAccepted } =
		useContext(AuthContext);

	const checkSwitch = () => {
		if (status == 'unchecked') {
			setState('checked');
		} else {
			setState('unchecked');
		}
		enableButton();
		switchStyle();
	};

	const switchStyle = () => {
		if (greyed == 0.6) {
			setStyle(1);
		} else {
			setStyle(0.6);
		}
	};

	const enableButton = () => {
		setEnable(!disabled);
	};

	const checkboxStyle = Platform.OS == 'ios' && style.appleCheck;

	const getStyle = () => {
		if (show == true) {
			return style.headContainerAccept;
		} else {
			return style.headContainer;
		}
	};

	return (
		<SafeAreaView style={androidSafeAreaView().AndroidSafeArea}>
			{!show && (
				<MenuHeader
					text='Terms and Condition'
					navigation={props.navigation}
				></MenuHeader>
			)}
			<View style={getStyle()}>
				<Image
					style={style.termsImg}
					source={require('../resources/images/TermsAndCondition.png')}
				/>
				{show && (
					<>
						<Text style={style.textTitle}>
							PetSprout's Terms and Conditions
						</Text>
						<Text style={style.text}>Last updated Nov 29, 2021</Text>
					</>
				)}
				<ScrollView
					style={style.scrollView}
					contentContainerStyle={style.container}
				>
					<Text style={style.text}>
						Please read the following Privacy Policy carefully. For any
						inquiries regarding this Privacy Policy, please contact us at
						PetSproutHelp@gmail.com
					</Text>
					<Text style={style.textTitle}>I. Introduction</Text>
					<Text style={style.text}>
						PetSprout's (referred to herein as “We” or “Our”) terms and
						conditions (referred to herein below as “Terms”), contained on this
						mobile application, shall govern the expectations of your
						accessibility and use of our services (referred to herein below as
						“Services”). This includes all sections, screens, pages and content
						within this mobile application (collectively referred to herein
						below as “App”).{'\n\n'}
						When using this App, you accept and acknowledge that you (the user)
						are legally bound to the Terms.{'\n\n'}
						Under no circumstances, should an individual be permitted to have
						access to the App if they have any objections or have not agreed to
						the entirety of our Terms. This applies to all users; registered or
						not.
					</Text>
					<Text style={style.textTitle}>
						II. Ownership and Intellectual Property Rights
					</Text>
					<Text style={style.text}>
						We own all rights to the intellectual property, material and content
						contained in this App and all such rights are reserved.{'\n\n'}
						This includes the modification and addition of any section
						associated with the App; discontinued, terminated or live. At any
						time, a choice to modify, discontinue or terminate a specific
						Service is permitted without the need to provide prior notice to the
						users. Similarly, the Terms may be updated at any time and without
						prior notice. You are expected to review such Terms periodically to
						ensure you understand the terms and conditions governing the
						accessibility and use of our Service.{'\n\n'}
						{'\n\n'}
						In the event that the terms have been updated, an email will be sent
						notifying the update. The “Last Updated” section seen above
						“Introduction” will also correctly reflect the date the change has
						occurred.{'\n\n'}A user continuing their use of our Services after
						an update to the Terms acknowledges that they are aware of the
						changes and subject themselves to be legally bound by the modified
						Terms. If there are any objections to the entirety of the changed
						Terms, a user must discontinue all uses of our Services. This
						applies to all users; registered or not.{'\n\n'}
						You are granted a limited license, subject to the restrictions
						provided in these Terms, for purposes of viewing the material
						contained on this App.{'\n\n'}
						Our services and content (defined in “Content” below) are protected
						by copyright, trademark, the laws of the Canadian Government’s
						Copyright Act (R.S.C., 1985, c.C-42) and other laws of foreign
						countries. {'\n\n'}
						Any activity, conducted by you, that involves removing, altering or
						obscuring any copyright, trademark, service mark or other
						proprietary rights notices incorporated in or accompanying the
						contents of our Services are not permitted.
					</Text>
					<Text style={style.textTitle}>III. Restrictions</Text>
					<Text style={style.text}>
						You are restricted from performing all of the following:
					</Text>
					<Text style={style.text}>
						1. Selling, sublicensing and/or otherwise commercializing any
						material on our App{'\n\n'}
						2. Mishandling this app in any way that may cause damage to this
						app, an individual or other parties{'\n\n'}
						3. Collect personal information from our Services’ users without
						their consent {'\n\n'}
						4. Using the app in a way that does not respect applicable laws and
						regulations{'\n\n'}
						5. Engaging in any data mining, data harvesting, data extracting,
						deciphering, disassembling, reverse engineering or any other similar
						activity in relation to this app, or while using this app{'\n\n'}
						6. Attempt to probe, scan, or test the vulnerability of any
						PetSprout's system or network or breach any security or
						authentication measures{'\n\n'}
						7. Use framing techniques to enclose content or our Services. This
						may include any graphical element, text, data, layout or design
						within our Services without a written document from an authorized
						representative of PetSprout{'\n\n'}
						8. Search content associated to PetSprout through the use of any
						engine, software, tool, agent, device or mechanism other than the
						software provided by PetSprout or other generally available third
						party web browsers (such as Google Chrome, Microsoft Internet
						Explorer, Mozilla Firefox, Safari or Opera){'\n\n'}
					</Text>
					<Text style={style.textTitle}>IV. Content</Text>
					<Text style={style.text}>
						Our content is defined as the collection of text, data, code,
						images, illustrations, themes, logos, work flows, technologies, and
						other visual or conceptual matters brought by our Services. {'\n\n'}
						A registered account is required in the process of becoming our
						member; gaining access to our content. This is established through
						the registration process where a user will be required to provide
						information, establish a username and password, and be exposed to
						the Terms. This information will be kept confidential between the
						App and the user. {'\n\n'}
						We do not allow users below the age of 18 to create accounts. It is
						the user’s responsibility to provide accurate information at the
						time of registration. This information must also be maintained to
						reflect current information regarding a user.{'\n\n'}
						Termination of your account requires an email sent to
						PetSprouthelp@gmail.com with evidence that you are the user. Upon
						termination, the user associated with the account will no longer
						have access to our content. Additionally, any rights given to the
						user by the Terms will be revoked and PetSprout will have no
						obligations to store your information in our database and continue
						to not be liable to you for any reason following the termination.
						Your obligations to our Terms will persist.{'\n\n'}
						We are permitted to remove or disable an account from our systems at
						any time, for any reason and without prior notice. {'\n\n'}
						You are responsible for keeping your password confidential from
						third parties. We will not be held liable for any activity on your
						account that wasn’t conducted by you; authorized or not. {'\n\n'}
						However, it is your responsibility to notify us at
						PetSprouthelp@gmail.com if any suspicious activity has been detected
						by you.
					</Text>
					<Text style={style.textTitle}>V. Warranties</Text>
					<Text style={style.text}>
						he App is provided “as is” with all faults. PetSprout makes no
						implied representations or warranties of any kind related to this
						App. Furthermore, the content of this app shall not be interpreted
						or presumed to be giving consult, advice, or any professional input
						to its users.
					</Text>
					<Text style={style.textTitle}>VI. Limitation of Liability</Text>
					<Text style={style.text}>
						You acknowledge that there are risks that may arise out of using our
						Services. Responsible activity on our App will remain your
						responsibility. As a result, in no event shall PetSprout, nor the
						creators, representatives and other parties responsible involved in
						the production of our Services be liable to you for anything arising
						out of or in any way connected with your use of this App, whether
						such liability is under contract. {'\n\n'}
						PetSprout, including its creators, representatives and other parties
						responsible involved in the production of our Services shall not be
						liable for any indirect, consequential or special liability arising
						out of or in any way related to your use of this App.
					</Text>
					<Text style={style.textTitle}>VII. Idemnification</Text>
					<Text style={style.text}>
						You hereby defend, hold and indemnify to the fullest extent
						PetSprout, and their representatives from and against any and all
						liabilities, costs, demands, causes of action, damages, claims and
						expenses (including, without limitation, reasonable attorney’s fees)
						arising out of or in any way related to your breach of any of the
						provisions of these Terms.
					</Text>
					<Text style={style.textTitle}>VIII. Severability</Text>
					<Text style={style.text}>
						The waiver of any violation will be effective only with the
						existence of a written document signed by an authorized
						representative of PetSprout. In the case of an unenforced violation,
						this will not contribute to the waiver of future enforcements.
						{'\n\n'}
						If a court of competent jurisdiction finds any provision of our
						Terms invalid or unenforceable under any applicable law, such
						invalidity or unenforceability shall not render the Terms invalid or
						enforceable as a whole, and such provisions shall be deleted without
						affecting the remaining provisions herein.
					</Text>
					<Text style={style.textTitle}>VIII. Assignment</Text>
					<Text style={style.text}>
						PetSprout shall be permitted to assign, transfer, and subcontract
						its rights and/or obligations under these Terms without any
						notification or consent required. However, you shall not be
						permitted to assign, transfer, or subcontract any of your rights
						and/or obligations under these Terms. A written document signed by
						an authorized representative of PetSprout will be required. Without
						this, any attempt will have no effect.
					</Text>
					<Text style={style.textTitle}>X. Contacting Us</Text>
					<Text style={style.text}>
						For further inquiries regarding these Terms and Conditions, please
						contact us at PetSprouthelp@gmail.com{'\n\n'}
						You must not submit unwanted, malicious, or spam emails to any of
						our staff.{'\n\n'}
						We encourage and welcome the notion of providing feedback, reporting
						bugs and other forms of constructive criticism. Any such notions
						will become the exclusive property of PetSprout; forfeiting all of
						your rights associated with the notions. As a result, we reserve the
						right to not compensate for this act but hope that it was left with
						the intention of creating a better tool.
					</Text>
					<Text style={style.textTitle}>XI. Conclusion of Agreement</Text>
					<Text style={style.text}>
						Upon clicking ACCEPT, using our Services, downloading or posting
						content associated to PetSprout, you acknowledge that you have fully
						read, understood and agreed to be legally bound by these Terms.
						These Terms supersede and replace all prior oral and written
						understandings or agreements with respect to the same.
					</Text>
				</ScrollView>
				{show && (
					<View style={style.center}>
						<View style={style.checkboxContainer}>
							<View style={checkboxStyle}>
								<Checkbox
									status={status}
									onPress={checkSwitch}
									uncheckedColor={style.textTop.color}
									color={style.textTop.color}
								/>
							</View>
							<Text style={style.text}>
								I have read, understood and agreed to the Terms and Conditions
								that apply with the use of PetSprout.
							</Text>
						</View>
						<View opacity={greyed}>
							<TouchableOpacity
								disabled={disabled}
								activeOpacity={0.6}
								style={style.aboutButton}
								onPress={() => {
									if (status == 'checked') {
										fetch('http://localhost:5000/api/v1.0.0/doc/acceptTerms', {
											method: 'POST',
											headers: {
												'Content-Type': 'application/json',
												'authentication-token': getToken,
											},
										})
											.then((res) => {
												setTCAccepted(true);
											})
											.then(() => {
												if (getPrivacyAccepted) {
													props.navigation.navigate('HomeScreen');
												} else {
													props.navigation.navigate(
														'AcceptPrivacyPolicyScreen',
													);
												}
											});
									}
								}}
							>
								<Text style={style.aboutButtonText}>Accept</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
			</View>
			{!show && (
				<View style={style.spacer}>
					<HomeButton navigation={props.navigation} colors={colors} />
				</View>
			)}
		</SafeAreaView>
	);
}

//https://reactnative.dev/docs/pixelratio

//<TextInput style={styles.textInput} defaultValue="Name unspecified" value={content} onChangeText={(text)=>setContent(text)}></TextInput>
//<Button title="Add it to the Database" onPress = {() => inputExample()}></Button>

export default AcceptTermsAndCondition;
