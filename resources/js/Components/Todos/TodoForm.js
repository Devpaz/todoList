import React from "react";
import Input from "@/Components/Input";

export default function TodoForm({
    formData,
    setData,
    addTodo,
}){
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.todo.length<2){
            alert("¡Completa la tarea antes de publicarla!")
            return;
        }
        addTodo();
    }
    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <Input
                value={formData.todo}
                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                isFocused={true}
                handleChange={e => setData("todo", e.target.value)}
            />

        </form>
    );
}
