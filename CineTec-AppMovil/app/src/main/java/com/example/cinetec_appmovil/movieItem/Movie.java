package com.example.cinetec_appmovil.movieItem;

public class Movie {

    private String name;
    private String length;
    private String classification;
    private String protagonists;
    private String director;

    public Movie(String name, String length, String classification, String protagonists, String director) {
        this.name = name;
        this.length = length;
        this.classification = classification;
        this.protagonists = protagonists;
        this.director = director;
    }


    public String getName() {
        return name;
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
