import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function SkillPage() {
  const [skill, setSkill] = useState({});
  const [isReviewing, setIsReviewing] = useState(false);
  const { skillId } = useParams();
  useEffect(() => {
    axios.get(`/api/skills/${skillId}`).then((response) => {
      console.log(response.data);
      setSkill(response.data);
    });
  }, [skillId]);

  const navigate = useNavigate();

  function goToUser(id) {
    return () => navigate(`/users/${id}`);
  }
  function handleSubmitReview() {}

  return (
    <>
      {/* display skills and user information using bootstrap row and cols */}
      <div className="row mt-3">
        <div className="col-12 col-lg-8 shadow p-3 mb-5 bg-body rounded">
          <h3>{skill.title}</h3>
          <p>{skill.description}</p>
          <p>Reviews:</p>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {skill.reviews?.map((review) => (
              <div key={review._id} className="col">
                <div className="card h-100">
                  <div className="card-body">
                    <p>{review.reviewText}</p>
                    <p>{review.rating}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-12 col-lg-4 shadow p-3 mb-5 bg-body rounded" onClick={goToUser(skill.user?.userId)}>
          <h3>{skill.user?.name}</h3>
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
                    <input type="number" className="form-control" id="rating" />
                  </fieldset>
                  <fieldset className="">
                    <label htmlFor="reviewText" className="form-label">
                      Review
                    </label>
                    <textarea className="form-control" id="reviewText" rows="3"></textarea>
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
    </>
  );
}
