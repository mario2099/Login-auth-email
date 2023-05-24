package com.example.demo.app.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "todo_list")
@ToString @EqualsAndHashCode
public class TodoList {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Getter @Setter @Column(name = "id")
    private Long id;

    @Getter @Setter @Column(name = "todo")
    private String  todo;

    @Getter @Setter @Column(name = "completed")
    private boolean completed;




}
