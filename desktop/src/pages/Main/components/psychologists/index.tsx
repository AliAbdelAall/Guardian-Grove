import { FC, useEffect, useState } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../core/redux/store";
import DeleteButton from "../../../../components/DelelteButton";
import { useSendRequest } from "../../../../core/tools/remote/request";
import { requestMethods } from "../../../../core/enums/requestMethods";
import { toast } from "react-toastify";
import { deletePsychologist } from "../../../../core/redux/psychologists";

const Psychologists: FC = () => {
	const { psychologists } = useSelector(
		(global: RootState) => global.psychologistsSlice
	);
	const sendRequest = useSendRequest();
	const dispatch = useDispatch();

	const [filteredPsychologists, setFilteredPsychologists] =
		useState(psychologists);

	useEffect(() => {
		setFilteredPsychologists(psychologists);
	}, [Psychologists]);

	const [deletedId, setDeletedId] = useState<number>(0);
	console.log(deletedId);

	const handleDeletePsychologist = (id: number) => {
		sendRequest(requestMethods.POST, "api/admin/delete-user", {
			userId: id,
		})
			.then((response) => {
				if (response.status === 200) {
					dispatch(deletePsychologist(id));
					setDeletedId(id);
				}
			})
			.catch((error: any) => {
				console.log(error);
				toast.error(error.response.error);
			});
	};

	const handlePsychologistsSearch = (value: string) => {
		const userSearch = value.toLowerCase();
		setFilteredPsychologists(
			psychologists.filter(
				(psychologist) =>
					psychologist.name.toLowerCase().includes(userSearch) ||
					psychologist.email.toLowerCase().includes(userSearch) ||
					psychologist.speciality?.toLowerCase().includes(userSearch)
			)
		);
	};

	return (
		<div className="feedback-container full-width">
			<h2 className="text-acient page-header">Psychologists</h2>
			<div>
				<input
					className="search-input "
					placeholder="Search"
					type="text"
					onChange={(e: any) =>
						handlePsychologistsSearch(e.target.value)
					}
				/>
			</div>
			{filteredPsychologists.length !== 0 ? (
				<table className="table full-width">
					<thead>
						<tr className="text-acient">
							<th>Image</th>
							<th>Name</th>
							<th>Email</th>
							<th>Speciality</th>
							<th>Rating</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{filteredPsychologists?.map((psychologist) => {
							const {
								id,
								name,
								email,
								speciality,
								rating,
								profilePic,
							} = psychologist;
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
									<td className="tr-middle">{rating}</td>
									<td className="tr-end">
										<DeleteButton
											handleClick={() =>
												handleDeletePsychologist(id)
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
						psychologists
							? "No Psychologists with filter"
							: "You have no Psychologists yet."
					}`}</h3>
				</div>
			)}
		</div>
	);
};

export default Psychologists;
