package com.example.cinetec_appmovil.movieItem;


/**
 * Clase que modela las caracteristicas de una pelicula
 */
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


    /**
     * Constructir
     * @param id
     * @param director
     * @param original_name
     * @param name
     * @param code
     * @param age_rating
     * @param details
     * @param length
     * @param actors
     */
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

    /**
     * Devuelve el nombre de la pelicula
     * @return name
     */
    public String getName() {
        return name;
    }

    /**
     * Devuelve el id de la pelicula
     * @return id
     */
    public int getId() {
        return id;
    }

    /**
     * Devuelve la duracion de la pelicula
     * @return length
     */
    public String getLength() {
        return length;
    }


    /**
     * Devuelve el director de la pelicula
     * @return director
     */
    public String getDirector() {
        return director;
    }


    /**
     * Devuelve el codigo de la clasificacion
     * @return code
     */
    public String getCode() {
        return code;
    }


    /**
     * Devuelve la edad permitida de la pelicula
     * @return age_rating
     */
    public String getAge_rating() {
        return age_rating;
    }

    /**
     * Devuelve los detalles de la clasificacion
     * @return details
     */
    public String getDetails() {
        return details;
    }

    /**
     * Devuelve los actores de la pelicula
     * @return actors
     */
    public String getActors() {
        return actors;
    }

    /**
     * Devuelve el nombre original de la pelicula
     * @return original_name
     */
    public String getOriginal_name() {
        return original_name;
    }
}
