import { useState } from "react";
import { StarRating } from "./StarRating";

export default function StarRatingPage() {
  const [starRating, setStarRating] = useState(0)
  const onStarRatingChange = (value: number) => {
    setStarRating(value)
  }
  return <>
    <h1>Current value: { starRating }</h1>
    <StarRating count={5} value={starRating} onStarRatingChange={onStarRatingChange} />
  </>
}
