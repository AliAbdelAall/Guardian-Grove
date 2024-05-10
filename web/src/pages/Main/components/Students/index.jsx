import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";
import { childrenSliceName } from "../../../../core/redux/children";
import StudentCard from "../../../../components/StudentCard";
import { userProfileSliceName } from "../../../../core/redux/userProfile";

const Students = () => {
	const teacher = useSelector((global) => global[userProfileSliceName]);
	const { children } = useSelector((global) => global[childrenSliceName]);
	const [filteredStudents, setFilteredStudents] = useState([]);

	const location = useLocation();

	const isSchool = location.pathname.includes("school");

	useEffect(() => {
		setTeacherStudents();
	}, [children]);

	const handleStudentSearch = (e) => {
		const userSearch = e.target.value.toLowerCase();
		setFilteredStudents(
			children.filter((child) =>
				child.name.toLowerCase().includes(userSearch)
			)
		);
	};

	const calculateStudentAge = (dob) => {
		const birthDate = new Date(dob);
		if (isNaN(birthDate.getTime())) {
			return null;
		}
		const currentDate = new Date();
		const difference = currentDate.getTime() - birthDate.getTime();
		const age = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
		return age;
	};

	const setTeacherStudents = () => {
		let filteredChildren = [];
		if (isSchool) {
			filteredChildren = children.filter(
				(child) =>
					child.schoolId === teacher.teacher.schoolId &&
					!child.teacherId
			);
		} else {
			filteredChildren = children.filter(
				(child) => child.teacherId === teacher.teacher.id
			);
		}
		setFilteredStudents(filteredChildren);
	};

	return (
		<div className="flex column full-width students-cards-container">
			<h2 className="text-acient"> My Students </h2>

			<div className="flex column full-width students-search-wrapper">
				<div>
					<input
						className="search-input "
						placeholder="Search"
						type="text"
						onChange={(e) => handleStudentSearch(e)}
					/>
				</div>

				{filteredStudents.length !== 0 ? (
					<div className="flex wrap students-cards-wrapper">
						{filteredStudents?.map((student) => {
							const { id, name, dob, profilePic } = student;
							const age = calculateStudentAge(dob);
							return (
								<Link
									key={id}
									to={`/main/teacher/students/student/${id}`}
								>
									<StudentCard
										id={id}
										name={name}
										age={age}
										profilePic={`${
											import.meta.env.VITE_PROFILE_PIC_URL
										}${profilePic}`}
									/>
								</Link>
							);
						})}
					</div>
				) : (
					<h2>
						{isSchool
							? "There is no Students without a teacher keeping an eye on them."
							: "You have no students to send reports check your school students."}
					</h2>
				)}
			</div>
		</div>
	);
};

export default Students;
