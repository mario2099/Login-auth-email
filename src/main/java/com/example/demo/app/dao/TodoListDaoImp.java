package com.example.demo.app.dao;

import com.example.demo.app.models.TodoList;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class TodoListDaoImp implements TodoListDao {
    @PersistenceContext
    EntityManager entityManager;

    @Override
    @Transactional
    public List<TodoList> getTodos(){
        String query = "FROM TodoList";
        return entityManager.createQuery(query).getResultList();
    };

    @Override
    public void addTodo(TodoList todoList){
        entityManager.merge(todoList);
    };

    @Override
    public void deleteTodo(Long id){
        TodoList todoList = entityManager.find(TodoList.class, id);
        entityManager.remove(todoList);
    }
    @Override
    public void completeTodo(Long id){
        TodoList todoList = entityManager.find(TodoList.class, id);
        if (todoList != null) {
            boolean currentCompleted = todoList.isCompleted();
            todoList.setCompleted(!currentCompleted);
            entityManager.merge(todoList);
        }
    }
}
