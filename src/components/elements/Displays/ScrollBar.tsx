import React, {
  useRef,
  useEffect,
  useState,
  ReactNode,
  HTMLAttributes,
} from "react";
import "@eveworld/ui-components/styles-ui.css";

interface FakeScrollbarProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  maxHeight: string;
  classStyles?: string;
}

const EveScrollBar: React.FC<FakeScrollbarProps> = ({
  children,
  maxHeight,
  classStyles,
  ...props
}) => {
  const { id } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollVisible, setScrollVisible] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const updateScrollState = () => {
      if (containerRef.current && contentRef.current) {
        const containerHeight = containerRef.current.clientHeight;
        const contentHeight = contentRef.current.scrollHeight;

        setScrollVisible(contentHeight > containerHeight);
        setScrollHeight((containerHeight / contentHeight) * containerHeight);
      }
    };

    updateScrollState();

    // Add a resize listener to handle container size changes
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [children]);

  const handleScroll = () => {
    if (containerRef.current && contentRef.current) {
      const containerHeight = containerRef.current.clientHeight;
      const contentHeight = contentRef.current.scrollHeight;

      const scrollTop = containerRef.current.scrollTop;
      setScrollTop(scrollTop / (contentHeight - containerHeight)); // Ratio of scroll position
    }
  };

  const handleContentScroll = () => {
    if (containerRef.current && contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;

      const scrollTop = contentRef.current.scrollTop;
      setScrollTop(scrollTop / contentHeight);
      containerRef.current.scrollTop = scrollTop;
    }
  };

  const contentWidth = scrollVisible ? `calc(100% - 0.5rem)` : `100%`;

  return (
    <div
      className="Eve-Scroll-Container"
      ref={containerRef}
      style={{ maxHeight }}
      onScroll={handleScroll} // Only handle scroll on the container
      id={id}
    >
      <div
        className={`Eve-Scroll-Content ${classStyles || ""}`}
        ref={contentRef}
        style={{ width: contentWidth }}
      >
        {children}
      </div>
      {scrollVisible && (
        <div className="Eve-Scrollbar">
          <div
            className="Eve-Scroll-Thumb"
            style={{
              height: `${scrollHeight}px`,
              top: `${scrollTop * (containerRef.current!.clientHeight - scrollHeight)}px`,
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default EveScrollBar;
