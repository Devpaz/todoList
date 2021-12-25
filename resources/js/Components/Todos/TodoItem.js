import React from "react";

/**
 * <TodoItem todo={} className={} onRestore={} onComplete={} onRemove={} />
 * @param todo
 * @param className
 * @param onRestore
 * @param onComplete
 * @param onRemove
 * @returns {JSX.Element}
 * @constructor
 */
export default function TodoItem({
    todo,
    className,
    onRestore,
    onComplete,
    onRemove,
}) {
    return (
        <div className="flex mb-4 items-center">
            <p className={className}>{todo.tex}</p>
            {todo.completed === true &&
                <button
                    onClick={onRestore}
                    className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-grey-200 border-grey hover:bg-gray-600"
                >
                    Deshacer
                </button>
            }

            {!todo.completed &&
                <button
                    onClick={onComplete}
                    className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-200 border-green hover:bg-green-600"
                >
                    Completar
                </button>
            }

            <button
                onClick={onRemove}
                className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-200 border-red hover:text-white hover:bg-red-600"
            >
                Eliminar
            </button>
        </div>
    );
}
