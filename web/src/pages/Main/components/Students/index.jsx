import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";
import { childrenSliceName } from "../../../../core/redux/children";
import StudentCard from "../../../../components/StudentCard";
import { userProfileSliceName } from "../../../../core/redux/userProfile";

const Students = () => {
	const teacher = useSelector((global) => global[userProfileSliceName]);
	const { children } = useSelector((global) => global[childrenSliceName]);
	const [filteredStudents, setFilteredStudents] = useState([]);

	console.log(filteredStudents);
	useEffect(() => {
		const filteredChildren = children.filter(
			(child) => child.teacherId === teacher.teacher.id
		);
		setFilteredStudents(filteredChildren);
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

				<div className="flex wrap students-cards-wrapper">
					{filteredStudents?.map((student) => {
						console.log(student);
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
			</div>
		</div>
	);
};

export default Students;
