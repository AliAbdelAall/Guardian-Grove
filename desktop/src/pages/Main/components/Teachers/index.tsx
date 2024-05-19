import { FC, useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../core/redux/store";
import { deleteTeacher } from "../../../../core/redux/teachers";

// Components
import DeleteButton from "../../../../components/DelelteButton";

// Tools
import { toast } from "react-toastify";
import { useSendRequest } from "../../../../core/tools/remote/request";
import { requestMethods } from "../../../../core/enums/requestMethods";

const Teachers: FC = () => {
	const { teachers } = useSelector(
		(global: RootState) => global.teachersSlice
	);
	const [filterdTeachers, setFilterdTeachers] = useState(teachers);

	const sendRequest = useSendRequest();
	const dispatch = useDispatch();

	const [deletedId, setDeletedId] = useState<number>(0);
	console.log(deletedId);

	const handleDeleteTeacher = (id: number) => {
		sendRequest(requestMethods.POST, "api/admin/delete-user", {
			userId: id,
		})
			.then((response) => {
				if (response.status === 200) {
					dispatch(deleteTeacher(id));
					setDeletedId(id);
				}
			})
			.catch((error: any) => {
				console.log(error);
				toast.error(error.response.error);
			});
	};
	const handleTeachersSearch = (value: string) => {
		const userSearch = value.toLowerCase();
		setFilterdTeachers(
			teachers.filter(
				(teacher) =>
					teacher.name.toLowerCase().includes(userSearch) ||
					teacher.email.toLowerCase().includes(userSearch) ||
					teacher.speciality?.toLowerCase().includes(userSearch) ||
					teacher.school?.toLowerCase().includes(userSearch)
			)
		);
	};

	return (
		<div className="feedback-container full-width">
			<h2 className="text-acient page-header">Teachers</h2>
			<div>
				<input
					className="search-input "
					placeholder="Search"
					type="text"
					onChange={(e: any) => handleTeachersSearch(e.target.value)}
				/>
			</div>
			{filterdTeachers.length !== 0 ? (
				<table className="table full-width">
					<thead>
						<tr className="text-acient">
							<th>Image</th>
							<th>Name</th>
							<th>Email</th>
							<th>Speciality</th>
							<th>School</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{filterdTeachers?.map((teacher) => {
							const {
								id,
								name,
								email,
								speciality,
								school,
								profilePic,
							} = teacher;
							return (
								<tr key={id} className="full-width text-acient">
									<td className="tr-start">
										<img
											className="user-image "
											src={`${
												import.meta.env
													.VITE_PROFILE_PIC_URL
											}${profilePic}`}
											alt="profile"
										/>
									</td>
									<td className="tr-middle">{name}</td>
									<td className="tr-middle">{email}</td>
									<td className="tr-middle">{speciality}</td>
									<td className="tr-middle">{school}</td>
									<td className="tr-end">
										<DeleteButton
											handleClick={() =>
												handleDeleteTeacher(id)
											}
										/>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			) : (
				<div className="flex full-width center">
					<h3>{`${
						teachers
							? "No teachers with filter"
							: "You have no teachers yet."
					}`}</h3>
				</div>
			)}
		</div>
	);
};

export default Teachers;
