import React, { useState, useEffect, useContext } from 'react';

import {
	View,
	Animated,
	SafeAreaView,
	RefreshControl,
	StatusBar,
	Text,
	TouchableOpacity,
	Image,
} from 'react-native';

import androidSafeAreaView from '../styling/AndroidSafeAreaView';
import Colours from '../resources/themes/Colours';
import styles from '../styling/HabitsScreen';
import Habits from '../components/Habits';
import MenuHeader from '../components/MenuHeader';

import { useTheme } from '@react-navigation/native';

import { AuthContext } from '../Context';

import { DisplayPet } from '../components/DisplayPet';

function HabitsScreen(props) {
	const [habits, setHabits] = useState([]);
	const [missed_twice, setMissedTwice] = useState(false);
	const [userHabitId, setUserHabitId] = useState('');

	const { colors } = useTheme();

	const [displayed, setDisplayed] = useState(false);

	const scrolling = React.useRef(new Animated.Value(0)).current;

	const { getToken, getRefreshing, changeRefreshing, getPet } =
		useContext(AuthContext);

	const [refreshing, setRefreshing] = React.useState(false);
	const [disabled, setDisabled] = useState(false);



	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		changeRefreshing(true);
		displayHabits();
	}, []);

	useEffect(() => {
		if (habits.length == 0 && !displayed) {
			console.log('ooop');
			displayHabits();
		}
	});

	useEffect(() => {
		if (getRefreshing) {
			console.log('rees');
			displayHabits();
		}
	}, [getRefreshing]);

	const disableCheck = (val) => {
		setDisabled(val);
		//console.log('disabled');
	}

	const checkMissedTwice = (missed_twice) => {
		for (var habit in missed_twice) {
			if (habit) {
				setMissedTwice(true);
				return;
			}
		}
		setMissedTwice(false);
	}

	const displayHabits = () => {
		console.log('huhhhhh');
		setDisplayed(true);
		setRefreshing(true);
		const date = new Date().toString();
		fetch('http://192.168.2.78:5000/api/v1.0.0/habit/show_user_habit/' + date, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'authentication-token': getToken,
			},
		})
			.then((res) =>
				res.json().then((data) => {
					console.log('inside success');
					setTimeout(() => {
						setHabits(data.habitList);
						checkMissedTwice(data.missed_twice);
						console.log("Missed twice: " + missed_twice);
						setUserHabitId(data._id);
						setDisplayed(true);
						setRefreshing(false);
						changeRefreshing(false);
					}, 1000);
				}),
			)
			.catch((err) => {
				console.log(err);
				console.log('saddasasdasddas');
			});
	};

	return (
		<SafeAreaView
			style={[
				styles(colors).headContainer,
				androidSafeAreaView().AndroidSafeArea,
			]}
		>
			<MenuHeader text='' navigation={props.navigation} displayHp={true} />
			<DisplayPet navigation={props.navigation} />
			{ missed_twice && <View style = {{height: 55, backgroundColor: Colours.Red.NotSelected, marginBottom: 0, marginTop: -20}}>
                <View style = {{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                    <Image style = {{
                        height: 34,
                        width: 50,
                        marginBottom: 0,
                        marginTop: 0,
                        resizeMode: 'contain',
                    }} source = {require('../resources/images/2Exclamation.png')}>
                    </Image>
                    <View>
                        <Text style={{fontSize: 16,fontWeight: 'bold',color: '#FFFFFF'}}>
                            Looks like you missed some habits!
                        </Text>
                        <Text style={{fontSize: 16, color: '#FFFFFF'}}
                        >
                            Try not to miss a habit 3x in a row
                        </Text>
                    </View>
                </View>
            </View>
			}
			<View style={styles(colors).scrollViewContainer}>
				<TouchableOpacity
					style={{ alignSelf: 'flex-end' }}
					onPress={() => props.navigation.navigate('AllHabitsScreen')}
				>
					<Text
						style={{
							fontSize: 16,
							fontWeight: 'bold',
							color: colors.Quaternary,
						}}
					>
						View All Habits
					</Text>
				</TouchableOpacity>
				<Animated.ScrollView
					showsVerticalScrollIndicator={false}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { y: scrolling } } }],
						{ useNativeDriver: true },
					)}
					scrollEventThrottle={16}
					// decelerationRate={'normal'}
					refreshControl={
						<RefreshControl refreshing={getRefreshing} onRefresh={onRefresh} />
					}
					scrollsToTop={true}
					snapToInterval={100}
					decelerationRate='normal'
				>
					{habits.map((data, index) => {
						let completed = data.times - data.todo > 0 ? false : true;
						const scale = scrolling.interpolate({
							inputRange: [-1, 0, 115 * index, 115 * (index + 1)],
							outputRange: [1, 1, 1, 0],
						});

						const opacity = scrolling.interpolate({
							inputRange: [-1, 0, 115 * index, 115 * (index + 0.8)],
							outputRange: [1, 1, 1, 0],
						});

						return (
							<View>
								<Animated.View style={{ opacity, transform: [{ scale }] }}>
									<Habits
										completed={completed}
										enableRight={true}
										navigation={props.navigation}
										habitId={data._id}
										name={data.title}
										streak={1}
										frequency={data.times - data.todo}
										habitId={data._id}
										userHabitId={userHabitId}
										disabled = {disabled}
										pauseFunction = {() => {disableCheck(true)}}
										startFunction = {() => {disableCheck(false)}}
									></Habits>
									<View style={{ height: 15 }}></View>
								</Animated.View>
							</View>
						);
					})}
				</Animated.ScrollView>
			</View>
		</SafeAreaView>
	);
}

export default HabitsScreen;
