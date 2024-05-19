import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../core/redux/store";
import DeleteButton from "../../../../components/DelelteButton";

const Parents: FC = () => {
	const { parents } = useSelector((global: RootState) => global.parentsSlice);

	const [filterdParents, setFilterdParents] = useState(parents);

	const handleParentsSearch = (value: string) => {
		const userSearch = value.toLowerCase();
		setFilterdParents(
			parents.filter(
				(parent) =>
					parent.name.toLowerCase().includes(userSearch) ||
					parent.email.toLowerCase().includes(userSearch)
			)
		);
	};

	return (
		<div className="feedback-container full-width">
			<h2 className="text-acient page-header">Parents</h2>
			<div>
				<input
					className="search-input "
					placeholder="Search"
					type="text"
					onChange={(e: any) => handleParentsSearch(e.target.value)}
				/>
			</div>
			{filterdParents.length !== 0 ? (
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
						{filterdParents?.map((parent) => {
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
									<td className="tr-middle">
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
					<h3>{`${
						parents
							? "No parents with filter"
							: "You have no parents yet."
					}`}</h3>
				</div>
			)}
		</div>
	);
};

export default Parents;
