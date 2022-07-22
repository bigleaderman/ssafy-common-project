package com.ssafy.mafia.Entity;

import javax.persistence.*;

@Entity
@Table(name = "member")
public class MemberEntity {

    @Id // pk 라는걸 알려주는 어노테이션
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String name;

    @Column
    private int age;

    public MemberEntity() {}

    public MemberEntity(int id, String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
