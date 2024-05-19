import { FC, useEffect, useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../core/redux/store";
import { deleteReview } from "../../../../core/redux/reviews";

// Components
import DeleteButton from "../../../../components/DelelteButton";
import ApproveButton from "../../../../components/ApproveButton";

// Tools
import { toast } from "react-toastify";
import { useSendRequest } from "../../../../core/tools/remote/request";
import { requestMethods } from "../../../../core/enums/requestMethods";

const Feedback: FC = () => {
	const { parents } = useSelector((global: RootState) => global.parentsSlice);
	const { psychologists } = useSelector(
		(global: RootState) => global.psychologistsSlice
	);
	const reviews = useSelector((global: RootState) => global.reviewsSlice);

	const sendRequest = useSendRequest();
	const dispatch = useDispatch();

	const mappedReviews = reviews.map((review) => {
		const psychologist = psychologists.find(
			(psychologist) =>
				psychologist.psychologistId === review.psychologistId
		);
		const parent = parents.find(
			(parent) => parent.parentId === review.parentId
		);
		return {
			...review,
			parent,
			psychologist,
		};
	});
	const [filteredReviews, setFilteredReviews] = useState(mappedReviews);

	const [deletedId, setDeletedId] = useState<number>(0);
	console.log(deletedId);

	const handleApproveReview = (id: number) => {
		sendRequest(requestMethods.POST, "api/admin/approve-review", {
			reviewId: id,
		})
			.then((response) => {
				if (response.status === 200) {
					dispatch(deleteReview(id));
					setDeletedId(id);
				}
			})
			.catch((error: any) => {
				console.log(error);
				toast.error(error.response.error);
			});
	};

	const handleDeleteReview = (id: number) => {
		sendRequest(requestMethods.POST, "api/admin/delete-review", {
			reviewId: id,
		})
			.then((response) => {
				if (response.status === 200) {
					dispatch(deleteReview(id));
					setDeletedId(id);
				}
			})
			.catch((error: any) => {
				console.log(error);
				toast.error(error.response.error);
			});
	};

	const handleReviewsSearch = (value: string) => {
		const userSearch = value.toLowerCase();
		setFilteredReviews(
			mappedReviews.filter(
				(mappedReview) =>
					mappedReview.parent?.name
						.toLowerCase()
						.includes(userSearch) ||
					mappedReview.psychologist?.name
						.toLowerCase()
						.includes(userSearch) ||
					mappedReview.review.toLowerCase().includes(userSearch)
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
					onChange={(e: any) => handleReviewsSearch(e.target.value)}
				/>
			</div>
			{filteredReviews.length !== 0 ? (
				<table className="table full-width">
					<thead>
						<tr className="text-acient">
							<th>Parent</th>
							<th>Psychologist</th>
							<th>Rating</th>
							<th>Review</th>
							<th>Approve</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{filteredReviews?.map((mappedReview) => {
							const { id, rating, review, parent, psychologist } =
								mappedReview;
							return (
								<tr key={id} className="full-width text-acient">
									<td className="tr-start">
										<div className="flex align-center user-image-name">
											<img
												className="user-image "
												src={`${
													import.meta.env
														.VITE_PROFILE_PIC_URL
												}${parent?.profilePic}`}
												alt="profile"
											/>
											<p>{parent?.name}</p>
										</div>
									</td>
									<td className="tr-middle">
										<div className="flex align-center user-image-name">
											<img
												className="user-image "
												src={`${
													import.meta.env
														.VITE_PROFILE_PIC_URL
												}${psychologist?.profilePic}`}
												alt="profile"
											/>
											<p>{psychologist?.name}</p>
										</div>
									</td>
									<td className="tr-middle">{rating}</td>
									<td className="tr-middle">{review}</td>
									<td className="tr-end">
										<ApproveButton
											handleClick={() =>
												handleApproveReview(id)
											}
										/>
									</td>
									<td className="tr-end">
										<DeleteButton
											handleClick={() =>
												handleDeleteReview(id)
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
					<h3>You have no Feedback yet.</h3>
				</div>
			)}
		</div>
	);
};

export default Feedback;
