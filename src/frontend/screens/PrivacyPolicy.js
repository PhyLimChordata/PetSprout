import React, { useState } from 'react';
import {
	View,
	SafeAreaView,
	Text,
	Image,
	ScrollView,
	StatusBar,
} from 'react-native';

import androidSafeAreaView from '../styling/AndroidSafeAreaView';
import MenuHeader from '../components/MenuHeader';
import styles from '../styling/TermsAndCondition';
import HomeButton from '../components/HomeButton';
import { useTheme } from '@react-navigation/native';

function PrivacyPolicy(props) {
	const { colors } = useTheme();
	const style = styles(colors);

	return (
		<SafeAreaView style={androidSafeAreaView().AndroidSafeArea}>
			<MenuHeader
				text='Privacy Policy'
				navigation={props.navigation}
			></MenuHeader>
			<View style={style.headContainer}>
				<Image
					style={style.termsImg}
					source={require('../resources/images/TermsAndCondition.png')}
				/>
				<ScrollView
					style={style.scrollView}
					contentContainerStyle={style.container}
				>
					<Text style={style.textTitle}>PetSprout's Privacy Policy</Text>
					<Text style={style.text}>
                        Last updated Nov 29, 2021
                    </Text>
                    <Text style={style.text}>
                        Please read the following Privacy Policy carefully. 
                        For any inquiries regarding this Privacy Policy, please contact us at petsprouthelp@gmail.com
					</Text>

					<Text style={style.textTitle}>I. Introduction</Text>
					<Text style={style.text}>
                        PetSprout's (referred to herein as “We” or “Our”) privacy policy (referred to herein below as “Policy”)
                        , contained on this mobile application, shall state how we collect, handle and process data from our users 
                        to support our services (referred to herein below as “Services”). We understand that users are concerned about 
                        the confidentiality of their personal information and want to make everything as transparent as possible. 
					</Text>
                    <Text style={style.text}>
                        When using this App, you accept and acknowledge that you (the user) are legally bound by this Privacy Policy.  
					</Text>
                    <Text style={style.text}>
                        Under no circumstances, should an individual be permitted to have access to the App if they have any objections or 
                        have not agreed to the entirety of our Privacy Policy. This applies to all users; registered or not.
					</Text>

					<Text style={style.textTitle}>II. Modification of Privacy Policy</Text>
					<Text style={style.text}>
                        Our Policy may be modified at any time and without prior notice. You are expected to review such Policy periodically to ensure you understand the Policy stating the confidentiality of your information.
					</Text>
                    <Text style={style.text}>
                        In the event that the Policy has been updated, an email will be sent notifying the update. The “Last Updated” section seen above “Introduction” will also correctly reflect the date the change has occurred. 
					</Text>
                    <Text style={style.text}>
                        A user continuing their use of our Services after an update to the Policy acknowledges that they are aware of the changes and subject themselves to be legally bound by the modified Policy. If there are any objections to the entirety of the changed Policy, a user must discontinue all uses of our Services. This applies to all users; registered or not.
					</Text>
                    <Text style={style.text}>
                        This site is a general audience site. We will not knowingly collect any information from, or sell to anyone under the age of 18. If you are an individual who has discovered that someone of invalid age has submitted his or her personally identifiable information  please email us at petsprouthelp@gmail.com.
					</Text>

					<Text style={style.textTitle}>III. User-Generated Content</Text>
					<Text style={style.text}>
                        Our services collects and stores user generated content in a cloud database known as MongoDB Atlas. The content you generate may include text of your habits, email and other important information. Your password is kept confidential and we encrypt it so that in the event of a breach, all passwords are safe and protected.
					</Text>
                    <Text style={style.text}>
                        We do NOT share any data with Google or third parties.
					</Text>

                    <Text style={style.textTitle}>IV. Third Party Transfer</Text>
					<Text style={style.text}>
                        In the event that we are acquired by or merged with a third party, we reserve the right to provide the current information to them. 
					</Text>

                    <Text style={style.textTitle}>V. Enforcement</Text>
					<Text style={style.text}>
                        In the event that information must be disclosed for legal purposes, such as satisfying a law, regulation, enforceable government request, or enforcing violations, we reserve the right to transfer only the necessary data needed to comply.
					</Text>

                    <Text style={style.textTitle}>VI. Changing and Updating Personal Information</Text>
					<Text style={style.text}>
                        A user has the option to request their personal information to be modified. An email must be sent and identification must be provided to approve the request. We reserve the right to decline any request that we consider unreasonable, costly, or unfair. However, the majority of personal information required can be modified through the application in the profile setting.
					</Text>

                    <Text style={style.textTitle}>VII. Contacting Us</Text>
					<Text style={style.text}>
                        For further inquiries regarding this Privacy Policy, please contact us at petsprouthelp@gmail.com
					</Text>
                    <Text style={style.text}>
                        We will keep records of this form of communication to help ensure your issues and feedback are addressed. We don’t use this email for any other purposes unrelated to the app. All electronic messages are kept confidential and private only viewable to authorized representatives of PetSprout. Additional use cases of our email may include sending updates to users regarding terms and conditions or the privacy policy.
					</Text>
                    <Text style={style.text}>
                        In any case, you can also ask us to remove your contact data and messages at any given time, to which we will respectfully do so.
					</Text>
                    <Text style={style.text}>
                        You must not submit unwanted, malicious, or spam emails to any of our staff.
					</Text>
                    
                    <Text style={style.textTitle}>VIII. Affiliates and Service Providers</Text>
                    <Text style={style.text}>
                        We reserve the right to provide such information to our affiliates or subsidiaries, or trusted service providers for the purpose of hosting our servers or processing or archiving personal information for us. We require that these parties agree to privacy and security safeguards for this information that are consistent with this Privacy Policy.
					</Text>

                    <Text style={style.textTitle}>IX. Miscellaneous</Text>
                    <Text style={style.text}>
                        We reserve the right to share personal information with the following additional parties: online organizers using our tools and resellers of our products and services from whose site the sale originated (even though the sale originates at site of the reseller, registration and collection of personal information occurs at this site).
					</Text>

				</ScrollView>
			</View>
			<HomeButton navigation={props.navigation} colors={colors} />
		</SafeAreaView>
	);
}

//https://reactnative.dev/docs/pixelratio

//<TextInput style={styles.textInput} defaultValue="Name unspecified" value={content} onChangeText={(text)=>setContent(text)}></TextInput>
//<Button title="Add it to the Database" onPress = {() => inputExample()}></Button>

export default PrivacyPolicy;