import React from "react";

/**
 * <TodoStatus message={} color="red" />
 * <TodoStatus message={} />
 * @param message
 * @param color
 * @returns {JSX.Element}
 * @constructor
 */
 export default function TodoStatus({
    message,
    color = "green",
}) {
    const className = `w-full mb-2 px-4 py-2 text-${color}-600 bg-${color}-100 text-center rounded`;
    return (
        <div className="flex justify-center mt-2">
            <div className={className}>
                {message}
            </div>
        </div>
    );
}
