import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export type TooltipPosition = "top" | "bottom" | "left" | "right";
export type TooltipProps = {
  id: string;
  children: React.ReactNode;
  open?: boolean;
  position: TooltipPosition;
};
// ASSUMPTION: move the collision logic to a hook and maybe even the onleave/onenter. Why? keep UI cleaner and make it more testable. I think that's better.
export function Tooltip({ children, open, position, id }: TooltipProps) {
  const [tooltipPosition, setTooltipPosition] =
    useState<TooltipPosition>("top");
  const ref = useRef<HTMLDivElement>(null);

  const onMouseEnter: React.MouseEventHandler<HTMLDivElement> = (e) => {
    console.log(e.currentTarget.getBoundingClientRect());
    const container = e.currentTarget.closest("main")!;
    // handle collision
    ref.current?.showPopover();
    handleViewportCollision({
      gapToTopBoundary:
        e.currentTarget.getBoundingClientRect().y -
        container.getBoundingClientRect().top,
      gapToLeftBoundary:
        e.currentTarget.getBoundingClientRect().x -
        container.getBoundingClientRect().left,
    });
  };

  const onMouseLeave = () => {
    ref.current?.hidePopover();
  };

  // for now, only supported case is top
  const handleViewportCollision = (args: {
    gapToTopBoundary: number;
    gapToLeftBoundary: number;
  }) => {
    const tooltipHeight = ref.current!.getBoundingClientRect().height;
    const tooltipWidth = ref.current!.getBoundingClientRect().width;

    switch (position) {
      case "top":
        if (tooltipHeight > args.gapToTopBoundary) {
          setTooltipPosition("bottom");
        } else {
          setTooltipPosition(position);
        }
        break;

      case "left":
        if (tooltipWidth > args.gapToLeftBoundary) {
          setTooltipPosition("right");
        } else {
          setTooltipPosition(position);
        }

        break;
      default:
        console.warn("unsupported case")

    }
  };

  const onFocusIn: React.FocusEventHandler = () => {
    ref.current?.showPopover();
  };
  const onFocusOut: React.FocusEventHandler = () => {
    ref.current?.hidePopover();
  };

  useEffect(() => {
    if (open !== undefined) {
      if (open) {
        ref.current?.showPopover();
      } else {
        ref.current?.hidePopover();
      }
    }
  }, [ref.current, open]);
  return (
    <>
      <StyledPopover
        $anchorName={id}
        style={{ positionArea: tooltipPosition }}
        popover="manual"
        ref={ref}
        onToggle={(e) => console.log(e.newState)}
      >
        POPOVER
      </StyledPopover>
      <StyledTriggerWrapper
        onFocus={onFocusIn}
        onBlur={onFocusOut}
        $anchorName={id}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </StyledTriggerWrapper>
    </>
  );
}

const StyledPopover = styled.div<{ $anchorName: string }>`
  inset: auto;
  position-anchor: ${({ $anchorName }) => `--tooltip-trigger-${$anchorName}`};
`;

const StyledTriggerWrapper = styled.div<{ $anchorName: string }>`
  button {
    anchor-name: ${({ $anchorName }) => `--tooltip-trigger-${$anchorName}`};
  }
`;
