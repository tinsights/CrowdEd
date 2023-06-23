import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function SkillPage() {
  const [skill, setSkill] = useState({});
  const [user, setUser] = useState({});
  const [isReviewing, setIsReviewing] = useState(false);
  const [review, setReview] = useState({
    rating: 0,
    reviewText: "",
  });
  const { userId, skillId } = useParams();
  useEffect(() => {
    axios.get(`/api/users/${userId}/skills/${skillId}`).then((response) => {
      console.log(response.data);
      setUser(response.data);
      if (response.data.skills) setSkill(response.data.skills[0]);
    });
  }, [userId, skillId]);

  const navigate = useNavigate();

  function goToUser(id) {
    return () => navigate(`/users/${id}`);
  }
  function handleSubmitReview() {
    axios.post(`/api/users/${userId}/skills/${skillId}/reviews`, review).then((response) => {
      console.log(response.data);
      setIsReviewing(false);
    });
  }

  function goToUser(id) {
    return () => navigate(`/users/${id}`);
  }

  function onReviewChange(e) {
    setReview({ ...review, [e.target.name]: e.target.value });
  }

  function isValidUrl(urlString) {
    var urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // validate protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // validate fragment locator
    return !!urlPattern.test(urlString);
  }
  return (
    <>
      <div className="container">
        <div className="row mt-3">
          <div className="col-12 col-lg-8 shadow p-3 mb-5 bg-body rounded">
            <h3>{skill.title}</h3>
            <p>{skill.description}</p>
            <p>
              {skill.experience?.split(" ").map((str) => {
                if (isValidUrl(str)) {
                  return <a href={str}>{str}</a>;
                } else return str + " ";
              })}
            </p>
            <p>Reviews:</p>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {skill.ratingsAndReviews?.map((review) => (
                <div key={review._id} className="col">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">{review.rating}</h5>
                      <p className="card-text">{review.review}</p>
                      <div onClick={goToUser(review.reviewer._id)} class="card-footer text-muted">
                        {review.reviewer.username}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 col-lg-4 shadow p-3 mb-5 bg-body rounded" onClick={goToUser(user?._id)}>
            <h3>{user?.username}</h3>
          </div>
          {localStorage.userLoggedIn && (
            <div>
              {/* button to leave a review */}
              {(!isReviewing && (
                <button className="btn btn-primary" onClick={() => setIsReviewing(true)}>
                  Leave a Review
                </button>
              )) || (
                <>
                  <form className="col-12 col-lg-8">
                    <fieldset className="">
                      <label htmlFor="rating" className="form-label">
                        Rating
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="rating"
                        name="rating"
                        value={review.rating}
                        onChange={(e) => onReviewChange(e)}
                      />
                    </fieldset>
                    <fieldset className="">
                      <label htmlFor="reviewText" className="form-label">
                        Review
                      </label>
                      <textarea
                        className="form-control"
                        id="reviewText"
                        rows="3"
                        name="reviewText"
                        value={review.review}
                        onChange={(e) => onReviewChange(e)}
                      ></textarea>
                    </fieldset>
                    <div className="d-flex flex-row-reverse">
                      <button className="btn btn-primary" onClick={handleSubmitReview}>
                        Submit
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
