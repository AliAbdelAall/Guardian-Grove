import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../core/redux/store";
import DeleteButton from "../../../../components/DelelteButton";

const Teachers: FC = () => {
	const { teachers } = useSelector(
		(global: RootState) => global.teachersSlice
	);

	return (
		<div className="feedback-container full-width">
			<h2 className="text-acient page-header">Teachers</h2>
			{teachers.length !== 0 ? (
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
						{teachers?.map((teacher) => {
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
										<DeleteButton handleClick={() => {}} />
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			) : (
				<div className="flex full-width center">
					<h3>You have no Teachers yet.</h3>
				</div>
			)}
		</div>
	);
};

export default Teachers;
