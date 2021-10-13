package com.example.cinetec_appmovil.movieItem;

public class Movie {

    private String name;
    private String length;

    private String protagonists;
    private String director;
    private String code;
    private String age_rating;
    private String details;
    private String actors;

    private String original_name;



    private int id;


    public Movie(int id, String director, String original_name, String name, String code, String age_rating, String details, String length, String actors ) {
        this.name = name;
        this.length = length;
        this.original_name = original_name;
        this.director = director;
        this.id = id;
        this.code = code;
        this.age_rating = age_rating;
        this.details = details;
        this.actors = actors;
    }

    public String getName() {
        return name;
    }

    public int getId() {
        return id;
    }

    public String getLength() {
        return length;
    }

    public String getProtagonists() {
        return protagonists;
    }

    public String getDirector() {
        return director;
    }


    public String getCode() {
        return code;
    }

    public String getAge_rating() {
        return age_rating;
    }

    public String getDetails() {
        return details;
    }

    public String getActors() {
        return actors;
    }

    public String getOriginal_name() {
        return original_name;
    }
}
