import styled from "styled-components";

type StarRatingProps = {
  count: number;
  value: number;
  readOnly?: boolean;
  onStarRatingChange: (value: number) => void
};

export function StarRating({ count, value, readOnly, onStarRatingChange }: StarRatingProps) {
  return (
      <div
        role="radiogroup"
        aria-label="Star rating"
        aria-readonly={!!readOnly}
      >
        {Array.from({ length: count }).map((_, index) => (
          // star rating
          // input is more accessible than button
          // lesson: pick the closest element in behaviour to the custom element to build - get accessibility and functionality for free
          <StyledLabel key={index}>
            <input
              disabled={readOnly}
              type="radio"
              name={`star-${index + 1}`}
              value={index + 1}
              checked={value === index + 1}
              aria-label={`${index + 1} star${index + 1 > 1 ? 's' : ''}`}
              onChange={(e) => {
                onStarRatingChange(index + 1)
              }}
            />
            <span className={index + 1 <= value ? 'checked' : '' }>{"\u2605"}</span>
          </StyledLabel>
        ))}
      </div>
  );
}

// awfully complicated way to hide something visually but keep it visible for accessibility
// keep it for state and behaviour
const StyledLabel = styled.label`
  input {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  cursor: pointer;

  span {
      color: #ccc;
      transition: color 0.15s ease;
  }

  .checked {
      color: #f5c518;
  }

  &:has(~ label:hover) span {
        color: #f5c518;
    }

  &:hover span {
      color: #f5c518;
  }

  /* would be nice to learn this further */
  &:hover ~ label span {
      color: #ccc;
  }

  &:has(~ label:hover) span {
      color: #f5c518;
  }

  &:has(input:focus-visible) {
      outline: 2px solid;
      outline-offset: 2px;
  }
`;
