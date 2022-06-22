import { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ResizableProps {
  direction: "x" | "y";
  className?: string | undefined;
  children?: React.ReactNode;
}

const CONSTRAINTS = {
  x: [0.3, 0.8],
  y: [0.7],
};

const Resizable: React.FC<ResizableProps> = ({
  direction,
  className,
  children,
}) => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * CONSTRAINTS["x"][1]);
  const isVertical = direction === "y";
  const resizeProps: ResizableBoxProps = isVertical
    ? {
        // vertical
        maxConstraints: [Infinity, innerHeight * CONSTRAINTS["y"][0]],
        minConstraints: [Infinity, 96],
        width: Infinity,
        height: 500,
        resizeHandles: ["s"],
      }
    : {
        // horizontal
        maxConstraints: [innerWidth * CONSTRAINTS["x"][1], Infinity],
        minConstraints: [innerWidth * CONSTRAINTS["x"][0], Infinity],
        width,
        height: Infinity,
        resizeHandles: ["e"],
        onResizeStop: (event, data) => {
          setWidth(data.size.width);
        },
      };

  useEffect(() => {
    let timer: any;

    if (timer) {
      clearTimeout(timer);
    }

    const listener = () => {
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * CONSTRAINTS["x"][1] < width) {
          setWidth(window.innerWidth * CONSTRAINTS["x"][1]);
        }
      }, 100);
    };

    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [width]);

  return (
    <ResizableBox {...resizeProps} className={className || ""}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;
