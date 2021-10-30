import { useState, useEffect } from "react";
import * as api from "../../servieces/api";

function Review({ movieId }) {
  const [reviewsData, setReviewsData] = useState(null);

  useEffect(() => {
    api.fetchMovieReview(movieId).then((data) => {
      setReviewsData(data.results);
    });
  }, [movieId]);

  return reviewsData && reviewsData.length !== 0 ? (
    <ul>
      {reviewsData.map((reviewsId) => (
        <li key={reviewsId.id}>
          <p>Author: {reviewsId.author}</p>
          <p>{reviewsId.content}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p>Нету рецензии на етот фильм</p>
  );
}

export default Review;
