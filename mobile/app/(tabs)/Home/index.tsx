import React, { useEffect, useState } from "react";
import {
	FlatList,
	Image,
	Pressable,
	ScrollView,
	Text,
	ToastAndroid,
	View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";
import StarRating, { StarRatingDisplay } from "react-native-star-rating-widget";
import Toast from "react-native-toast-message";

// Styles
import utilities from "../../../Styles/utilities";
import styles from "./styles";

// Components
import PsychologistCard from "../../../components/PsychologistCard";
import TeacherCard from "../../../components/TeacherCard";

// Assets
const profilePicc = require("../../../assets/profile/profile.jpg");
const heroImage = require("../../../assets/images/hero-image.png");

// Redux
import { RootState } from "../../../core/redux/store";
import { teachersSliceName } from "../../../core/redux/teachers";
import {
	psychologistsSliceName,
	setpsychologists,
} from "../../../core/redux/Psychologists";
import { userSliceName } from "../../../core/redux/user/index.";

// Utilities
import { useSendRequest } from "../../../core/tools/remote/request";
import { requestMethods } from "../../../core/enum/requestMetods";

const Main = () => {
	const teachers = useSelector(
		(global: RootState) => global[teachersSliceName]
	);
	const psychologists = useSelector(
		(global: RootState) => global[psychologistsSliceName]
	);

	const profile = useSelector((global: RootState) => global[userSliceName]);

	const [rating, setRating] = useState(0);
	const [teachersList, setTeachersList] = useState(0);

	return (
		<View style={utilities.container}>
			{/* <StarRating
				rating={rating}
				onChange={(e) => setRating(e)}
				maxStars={5}
				starSize={30}
				enableHalfStar={true}
			/> */}

			<View style={styles.userProfileWrapper}>
				<Image
					src={`${process.env.EXPO_PUBLIC_PROFILE_PICS_URL}${profile.profilePic}`}
					style={styles.userProfilePic}
				></Image>
				<Text
					style={styles.userName}
				>{`Hi ${profile.firstName}!`}</Text>
			</View>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.heroContainer}>
					<Image source={heroImage} style={styles.heroImage}></Image>
					<View style={styles.heroTextWrapper}>
						<Text style={styles.heroTitle}>
							We make parenting easy
						</Text>
						<Text style={styles.heroText}>
							Raising a family is no small feat. With our support,
							you'll find that parenting can be more manageable
							than ever before.
						</Text>
					</View>
				</View>

				<View style={styles.sectionTitleWrapper}>
					<Text style={styles.sectionTitle}>Popular Specialists</Text>
					<Pressable onPress={() => router.push("/Psychologists")}>
						<Text style={styles.seeAll}>See All</Text>
					</Pressable>
				</View>

				<FlatList
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					data={psychologists}
					ItemSeparatorComponent={() => {
						return <View style={styles.horizontalSeparator}></View>;
					}}
					renderItem={(psychologist) => {
						const {
							id,
							firstName,
							lastName,
							profilePic,
							rating,
							speciality,
						} = psychologist.item;

						return (
							<Pressable
								onPress={() =>
									router.push(`/PsychologistProfile/${id}`)
								}
							>
								<PsychologistCard
									key={id}
									id={id}
									profilePic={`${process.env.EXPO_PUBLIC_PROFILE_PICS_URL}${profilePic}`}
									name={`${firstName} ${lastName}`}
									speciality={speciality}
									rating={rating}
								/>
							</Pressable>
						);
					}}
				/>

				<View style={styles.sectionTitleWrapper}>
					<Text style={styles.sectionTitle}>Popular Teachers</Text>
					<Pressable onPress={() => router.push("/Teachers")}>
						<Text style={styles.seeAll}>See All</Text>
					</Pressable>
				</View>

				<FlatList
					data={teachers}
					scrollEnabled={false}
					renderItem={(teacher) => {
						const {
							id,
							firstName,
							lastName,
							profilePic,
							school,
							speciality,
							dob,
							email,
						} = teacher.item;
						console.log(teacher);
						return (
							<Pressable
								onPress={() =>
									router.push(`/TeacherProfile/${id}`)
								}
							>
								<TeacherCard
									key={id}
									id={id}
									profilePic={`${process.env.EXPO_PUBLIC_PROFILE_PICS_URL}${profilePic}`}
									name={`${firstName} ${lastName}`}
									school={school}
									speciality={speciality}
								/>
							</Pressable>
						);
					}}
				/>
			</ScrollView>
			<Toast />
		</View>
	);
};

export default Main;
