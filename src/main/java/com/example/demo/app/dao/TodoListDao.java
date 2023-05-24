package com.example.demo.app.dao;

//DAO Design Pattern is used to separate the data persistence logic in a separate layer.
//This way, the service remains completely in dark about how the low-level operations to access the database is done.
//This is known as the principle of Separation of Logic.

import com.example.demo.app.models.TodoList;

import java.util.List;

//three components: model, interface, interface implementation
public interface TodoListDao {
    List<TodoList> getTodos();
    void addTodo(TodoList todoList);
    void deleteTodo(Long id);
    void completeTodo(Long id);
}
