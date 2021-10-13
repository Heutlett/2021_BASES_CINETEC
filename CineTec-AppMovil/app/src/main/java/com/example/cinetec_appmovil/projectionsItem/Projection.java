package com.example.cinetec_appmovil.projectionsItem;

public class Projection {

    private String time;
    private String date;
    private int id;
    private int room;
    private String movie;
    private int free_spaces;


    public Projection(String date, String time, int id, int room, String movie, int free_spaces) {
        this.time = time;
        this.date = date;
        this.id = id;
        this.room = room;
        this.movie = movie;
        this.free_spaces = free_spaces;

    }

    public String getTime() {
        return time;
    }

    public String getDate() {
        return date;
    }

    public int getId() {
        return id;
    }

    public int getRoom() {
        return room;
    }

    public String getMovie() {
        return movie;
    }

    public int getFree_spaces() {
        return free_spaces;
    }
}
