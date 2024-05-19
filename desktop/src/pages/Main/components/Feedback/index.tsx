import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../core/redux/store";
import DeleteButton from "../../../../components/DelelteButton";
import ApproveButton from "../../../../components/ApproveButton";

const Feedback: FC = () => {
	const { parents } = useSelector((global: RootState) => global.parentsSlice);
	const { psychologists } = useSelector(
		(global: RootState) => global.psychologistsSlice
	);
	const reviews = useSelector((global: RootState) => global.reviewsSlice);

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

	return (
		<div className="feedback-container full-width">
			<h2 className="text-acient page-header">Parents</h2>
			{mappedReviews.length !== 0 ? (
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
						{mappedReviews?.map((mappedReview) => {
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
										<ApproveButton handleClick={() => {}} />
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

export default Feedback;
