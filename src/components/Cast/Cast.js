import { useState, useEffect } from "react";
import * as api from "../../servieces/api";

function Cast({ movieId, url }) {
  const [castData, setCastData] = useState(null);

  useEffect(() => {
    api.fetchMovieCredits(movieId).then((data) => {
      setCastData(data.cast);
    });
  }, [movieId]);

  return castData && castData.length !== 0 ? (
    <div>
      <ul>
        {castData.map((castId) => {
          return (
            <li key={castId.id}>
              <img
                src={
                  castId.profile_path
                    ? `${url}${castId.profile_path}`
                    : "actor not found"
                }
                alt=""
                width={!castId.profile_path ? 185 : null}
              />

              <h1>{castId.name}</h1>

              <p>Character {castId.character}</p>
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    <p>Нету информации о актерском составе.</p>
  );
}

export default Cast;
