package com.example.cinetec_appmovil.client;


/**
 * Clase que modela las caracteristicas de un cliente
 */
public class Client {


    /**
     * Constructor
     * @param id
     * @param first_name
     * @param middle_name
     * @param first_surname
     * @param second_surname
     * @param birth_date
     * @param username
     * @param password
     * @param phone_number
     * @param age
     */
    public Client(int id, String first_name, String middle_name, String first_surname, String second_surname, String birth_date, String username, String password, String phone_number, int age) {
        this.id = id;
        this.first_name = first_name;
        this.middle_name = middle_name;
        this.first_surname = first_surname;
        this.second_surname = second_surname;
        this.birth_date = birth_date;
        this.phone_number = phone_number;
        this.username = username;
        this.password = password;
        this.age = age;
    }

    public int id;
    public String first_name;
    public String middle_name;
    public String first_surname;
    public String second_surname;
    public String birth_date;
    public String phone_number;
    public String username;
    public String password;
    public int age;




}
