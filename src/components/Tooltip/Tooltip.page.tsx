import styled from "styled-components";
import { Tooltip } from "./Tooltip";
import { useState } from "react";

export default function TooltipPage() {
  const [topOpen, setTopOpen] = useState(false);
  return (
    <Container>
      <Top>
        <Tooltip open={topOpen} position="top" id="one">
          <button onClick={() => setTopOpen(!topOpen)}>TOP</button>
        </Tooltip>
      </Top>
      <LeftRight>
        <Tooltip position="left" id="left">
          <button>LEFT</button>
        </Tooltip>
        <Tooltip position="right" id="right">
          <button>RIGHT</button>
        </Tooltip>
      </LeftRight>
      <Bottom>
        <Tooltip position="bottom" id="two">
          <button>BOTTOM</button>
        </Tooltip>
      </Bottom>
    </Container>
  );
}

const Container = styled.div`
  max-height: 700px;
  max-width: 700px;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  gap: 16px;
`;
const Top = styled.div`
  position: relative;
  margin: auto;
`;

const Bottom = styled.div`
  margin: auto;
`;

const LeftRight = styled.div`
  display: flex;
  justify-content: space-around;
  position: relative;
  align-items: center;
`;
