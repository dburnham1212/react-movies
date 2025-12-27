// React hooks used:
// useRef       → hold DOM references and mutable values without re-rendering
// useState     → store UI state (height, expanded/collapsed)
// useLayoutEffect → run code AFTER layout but BEFORE paint (safe for measuring)
import { useLayoutEffect, useRef, useState } from "react";

// CSS module for grid + button styling
import styles from "../../../styles/utility/Grids/MediaCreditGrid.module.css";

// Individual card component rendered inside the grid
import MediaCreditCard from "../Cards/MediaCreditCard";

const MediaCreditGrid = (props) => {
    // Props passed into the grid
    const { mediaCredits, title, mediaType, creditType } = props;

    // Reference to the grid DOM element
    // Used to measure layout and observe size changes
    const gridRef = useRef(null);

    // Stores the requestAnimationFrame ID so we can cancel it
    // Prevents multiple queued measurements during resize
    const rafId = useRef(null);

    // Height of the FIRST grid row (measured dynamically)
    const [rowHeight, setRowHeight] = useState(null);

    // Whether the grid is expanded or collapsed
    const [expanded, setExpanded] = useState(false);

    // Whether there is more than one row (controls button visibility)
    const [isCollapsible, setIsCollapsible] = useState(false);

    // Measures the height of the first grid row
    // This function is called whenever layout may have changed
    const measureFirstRow = () => {
        // Cancel any pending frame to avoid duplicate work
        cancelAnimationFrame(rafId.current);

        // Schedule measurement AFTER the browser finishes layout + paint
        rafId.current = requestAnimationFrame(() => {
            // Safety check: grid must exist
            if (!gridRef.current) return;

            // Get all grid items (MediaCreditCard elements)
            const items = Array.from(gridRef.current.children);
            if (!items.length) return;

            // Bounding box of the grid container
            const gridRect = gridRef.current.getBoundingClientRect();

            // Vertical position of the first row
            // All items in row 1 share this value
            const firstTop = items[0].getBoundingClientRect().top;

            // Find all items that belong to the first row
            const firstRowItems = items.filter((el) => Math.abs(el.getBoundingClientRect().top - firstTop) < 2);

            // Last item in the first row (rightmost item)
            const lastItem = firstRowItems[firstRowItems.length - 1];

            // Height of the first row:
            // bottom of last item minus top of grid
            const firstRowHeight = lastItem.getBoundingClientRect().bottom - gridRect.top;

            // Total height of all grid content (including hidden rows)
            const fullHeight = gridRef.current.scrollHeight;

            // Store the first row height in state
            setRowHeight(firstRowHeight);

            // Determine if there is content beyond the first row
            setIsCollapsible(fullHeight > firstRowHeight + 1);
        });
    };

    // Measure when the data changes (new credits rendered)
    useLayoutEffect(() => {
        measureFirstRow();
    }, [mediaCredits]);

    // Observe size changes of the grid (responsive layouts, resizing)
    useLayoutEffect(() => {
        if (!gridRef.current) return;

        // ResizeObserver notifies us when the grid's size changes
        const observer = new ResizeObserver(measureFirstRow);
        observer.observe(gridRef.current);

        // Cleanup observer on unmount
        return () => observer.disconnect();
    }, []);

    // Re-measure when images inside cards finish loading
    // Images often change layout AFTER initial render
    useLayoutEffect(() => {
        if (!gridRef.current) return;

        // Find all images inside the grid
        const images = gridRef.current.querySelectorAll("img");

        images.forEach((img) => {
            // If image isn't loaded yet, wait for it
            if (!img.complete) {
                img.addEventListener("load", measureFirstRow);
            }
        });

        // Cleanup image listeners on re-render/unmount
        return () => {
            images.forEach((img) => {
                img.removeEventListener("load", measureFirstRow);
            });
        };
    }, [mediaCredits]);

    return (
        <div className={styles.credit_container}>
            {/* Section title */}
            <h3>{title}</h3>

            {/* Grid container */}
            <div
                ref={gridRef}
                className={styles.credit_list}
                style={{
                    // Hide overflowing rows when collapsed
                    overflow: "hidden",

                    // When collapsed → limit to first row height
                    // When expanded → show full grid
                    maxHeight: expanded || !rowHeight ? "none" : rowHeight,
                }}
            >
                {/* Render each credit as a card */}
                {mediaCredits.map((credit, index) => (
                    <MediaCreditCard key={index} media={credit} mediaType={mediaType} creditType={creditType} />
                ))}
            </div>

            {/* Expand / collapse button only shows if needed */}
            {isCollapsible && (
                <button className={styles.expand_button} onClick={() => setExpanded((prev) => !prev)}>
                    {expanded ? "Show Less" : "Show More"}
                </button>
            )}
        </div>
    );
};

export default MediaCreditGrid;
