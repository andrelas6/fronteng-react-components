import styled from "styled-components";
export type AccordionProps = {
  items: {
    title: string;
    content: string;
  }[];
};

export function Accordion({ items }: AccordionProps) {
  return (
    <>
      {items.map((item, index) => (
        <StyledDetails key={index}>
          <summary>{item.title}</summary>
          <p>{item.content}</p>
        </StyledDetails>
      ))}
    </>
  );
}

const StyledDetails = styled.details`
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;

  summary {
    background-color: #f9f9f9;
    cursor: pointer;
    font-weight: 500;
    list-style: none;
  }

  &::details-content {
    transition:
      max-height 0.3s ease,
      content-visibility 0.3s allow-discrete;
    max-height: 0;
    overflow: hidden;
  }

  &[open]::details-content {
    max-height: 500px;
    overflow: auto;
  }
`;
