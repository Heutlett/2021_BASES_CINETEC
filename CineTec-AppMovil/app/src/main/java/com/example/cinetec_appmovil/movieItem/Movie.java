package com.example.cinetec_appmovil.movieItem;

public class Movie {

    private String name;
    private String length;
    private String classification;
    private String protagonists;
    private String director;

    private String original_name;
    private String image;
    private int classification_id;
    private int director_id;
    private int id;

    public Movie(String name, String length, String classification, String protagonists, String director) {
        this.name = name;
        this.length = length;
        this.classification = classification;
        this.protagonists = protagonists;
        this.director = director;
    }

    public Movie(int id, int classification_id, int director_id, String image, String original_name, String name, String length) {
        this.name = name;
        this.length = length;
        this.original_name = original_name;
        this.image = image;
        this.classification_id = classification_id;
        this.director_id = director_id;
        this.id = id;
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

    public String getClassification() {
        return classification;
    }

    public String getProtagonists() {
        return protagonists;
    }

    public String getDirector() {
        return director;
    }
}
