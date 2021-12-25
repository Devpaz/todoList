<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class TodoController extends Controller
{
    public function index(): Response{
        $todos = Todo::select(["id", "tex", "completed"])
            ->orderBy("completed")
            ->orderByDesc("id")
            ->get();

        return Inertia::render("Todos/TodoList", [
            "todos" => $todos->toArray(),
            "status" => session("status"),
        ]);
    }

    public function store():RedirectResponse
    {
        $this->validate(request(), [
            "todo" => "required|min:4|unique:todos,tex",
        ]);

        Todo::create([
            "tex" => request("todo"),
            "completed" => false,
        ]);

        return back()->with("status", __("¡ To Do creado!"));
    }

    public function restore(int $id): RedirectResponse {
        Todo::findOrFail($id)->fill([
            "completed" => false,
        ])->update();

        return back()->with("status", __("¡To Do restaurado!"));
    }

    public function complete(int $id): RedirectResponse {
        Todo::findOrFail($id)->fill([
            "completed" => true,
        ])->update();

        return back()->with("status", __("¡To Do completado!"));
    }

    public function destroy(int $id): RedirectResponse {
        $todo = Todo::findOrFail($id);
        $todo->delete();
        return back()->with("status", __("¡To Do eliminado!"));
    }

}
