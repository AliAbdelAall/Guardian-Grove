import React from "react";

// Styles
import "./style.css";

// Redux
import { useSelector } from "react-redux";
import { reviewsSliceName } from "../../../../core/redux/reviews";
import { parentsSliceName } from "../../../../core/redux/parents";

const Feedback = () => {
	const { parents } = useSelector((global) => global[parentsSliceName]);
	const { reviews } = useSelector((global) => global[reviewsSliceName]);
	console.log(parents);
	console.log(reviews);
	const parentReviews = parents
		.filter((parent) =>
			reviews.some((review) => review.parentId === parent.id)
		)
		.map((parent) => {
			const parentReview = reviews.find(
				(review) => review.parentId === parent.id
			);
			return { ...parent, review: parentReview };
		});

	console.log(parentReviews);

	return (
		<div className="feedback-container full-width">
			<h2>Users Feedback</h2>
			{parentReviews.length !== 0 ? (
				<table className="table full-width">
					<thead>
						<tr className="text-acient">
							<th>Image</th>
							<th>Name</th>
							<th>Rating</th>
							<th>Review</th>
						</tr>
					</thead>
					<tbody>
						{parentReviews?.map((parent) => {
							const { id, profile, review } = parent;
							return (
								<tr key={id} className="full-width text-acient">
									<td className="tr-start">
										<img
											className="user-image "
											src={`${
												import.meta.env
													.VITE_PROFILE_PIC_URL
											}${profile.profilePic}`}
											alt="profile"
										/>
									</td>
									<td className="tr-middle">{`${profile.firstName} ${profile.lastName}`}</td>
									<td className="tr-middle">
										{review.rating}
									</td>
									<td className="tr-end">{review.review}</td>
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
