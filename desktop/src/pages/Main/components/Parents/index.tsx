import { FC, useEffect, useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../core/redux/store";
import { deleteParent } from "../../../../core/redux/parents";

// Components
import DeleteButton from "../../../../components/DelelteButton";

// Tools
import { toast } from "react-toastify";
import { useSendRequest } from "../../../../core/tools/remote/request";
import { requestMethods } from "../../../../core/enums/requestMethods";

const Parents: FC = () => {
	const { parents } = useSelector((global: RootState) => global.parentsSlice);

	const [filteredParents, setFilteredParents] = useState(parents);

	const sendRequest = useSendRequest();
	const dispatch = useDispatch();

	const [deletedId, setDeletedId] = useState<number>(0);
	console.log(deletedId);

	useEffect(() => {
		setFilteredParents(parents);
	}, [parents]);

	const handleDeleteParent = (id: number) => {
		sendRequest(requestMethods.POST, "api/admin/delete-user", {
			userId: id,
		})
			.then((response) => {
				if (response.status === 200) {
					dispatch(deleteParent(id));
					setDeletedId(id);
				}
			})
			.catch((error: any) => {
				console.log(error);
				toast.error(error.response.error);
			});
	};
	const handleParentsSearch = (value: string) => {
		const userSearch = value.toLowerCase();
		setFilteredParents(
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
			{filteredParents.length !== 0 ? (
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
						{filteredParents?.map((parent) => {
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
										<DeleteButton
											handleClick={() =>
												handleDeleteParent(id)
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
