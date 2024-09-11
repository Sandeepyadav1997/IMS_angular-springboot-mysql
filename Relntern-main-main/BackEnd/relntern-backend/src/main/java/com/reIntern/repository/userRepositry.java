package com.reIntern.repository;

import org.springframework.data.jpa.repository.JpaRepository;
// userRepositry is responsible for interacting with the database. It provides methods for performing CRUD (Create, Read, Update, Delete) operations on the user entity in the database.

import com.reIntern.model.user;

public interface userRepositry extends JpaRepository<user,Integer> {


    // Method to find user by username (email)
    user findByUsername(String username);

    // Method to find user by username and password
    user findByUsernameAndPassword(String username, String password);

}
