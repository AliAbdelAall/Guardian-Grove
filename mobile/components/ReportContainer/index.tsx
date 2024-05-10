import { View, Text, Pressable } from "react-native";
import React, { FC } from "react";
import { ChildStyles } from "../../Styles/ChildReport";
import { router } from "expo-router";

type props = {
	dateTime: string;
	report: string;
	route?: string;
};

const ReportContainer: FC<props> = ({ dateTime, report, route }) => {
	return (
		<View style={ChildStyles.reportContainer}>
			<View style={ChildStyles.dateTimeWrapper}>
				<Text style={ChildStyles.dateText}>
					{`${route ? "Last Report " : ""}${dateTime.slice(0, 10)}`}
				</Text>
				<Text>{dateTime.slice(11, 16)}</Text>
			</View>
			<Text style={ChildStyles.reportText}>{report}</Text>
			{route && (
				<Pressable onPress={() => router.push(route)}>
					<Text style={ChildStyles.seeAllText}>See All</Text>
				</Pressable>
			)}
		</View>
	);
};

export default ReportContainer;
