import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../core/redux/store";
import DeleteButton from "../../../../components/DelelteButton";

const Parents: FC = () => {
	const { parents } = useSelector((global: RootState) => global.parentsSlice);

	return (
		<div className="feedback-container full-width">
			<h2 className="text-acient page-header">Parens</h2>
			{parents.length !== 0 ? (
				<table className="table full-width">
					<thead>
						<tr className="text-acient">
							<th>Image</th>
							<th>Name</th>
							<th>Email</th>
							<th>Children</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{parents?.map((parent) => {
							const { id, name, email, children, profilePic } =
								parent;
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
									<td className="tr-end">
										{children.join(", ")}
									</td>
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
					<h3>You have no Feedback yet.</h3>
				</div>
			)}
		</div>
	);
};

export default Parents;
