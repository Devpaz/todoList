import React from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import ValidationErrors from "@/Components/ValidationErrors";
import TodoStatus from "@/Components/Todos/TodoStatus";
import TodoForm from "@/Components/Todos/TodoForm";
import TodoItem from "@/Components/Todos/TodoItem";

//import route from "vendor/tightenco/ziggy/src/js";

export default function TodoList(props){
    const {data, setData, post, put, delete:destroy, errors, reset} = useForm({
        todo:'',
    })

    const submitTodo = async () => {
        await post(route("todos.store"),{
            preserveScroll:true,
            onSuccess: () => reset("todo"),
        });
    }
    const restore = async id => {
        await put(route("todos.restore", { id }), {
            preserveScroll: true,
        })
    }

    const complete = async id => {
        await put(route("todos.complete", { id }), {
            preserveScroll: true,
        })
    }

    const remove = async id => {
        await destroy(route("todos.remove", { id }), {
            preserveScroll: true,
        })
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h1 className="font-semibold text-xl text-gary-800 leading-tight">To Do List</h1>}
        >
            <Head title= "To Do List" />

            <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
                <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-2/4 lg:max-w-lg">
                    <h2 className="text-grey-darkest text-center">To Do List</h2>



                    <div className="mb-4">
                        <ValidationErrors errors={errors}/>
                        {props.status && <TodoStatus message={props.status}/>}
                    </div>

                    <div className="mb-2">
                        <TodoForm
                            setData={setData}
                            formData={data}
                            addTodo={submitTodo}
                        />
                    </div>

                    <div>
                        {props.todos.length === 0 &&
                            <TodoStatus color="red" message="¡No hay nada que hacer!" />
                        }

                        {props.todos.map(todo => {
                            const className = todo.completed ? "w-full line-through text-green-500" : "w-full text-grey-darkest";
                            return (
                                <TodoItem
                                    key={todo.id}
                                    todo={todo}
                                    className={className}
                                    onRestore={() => restore(todo.id)}
                                    onComplete={() => complete(todo.id)}
                                    onRemove={() => remove(todo.id)}
                                />
                            );
                        })}
                    </div>

                </div>
            </div>

        </Authenticated>
    );
}
