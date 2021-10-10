package com.example.cinetec_appmovil.projectionsItem;

public class Projection {

    private String time;
    private String date;
    private int id;
    private int room_id;
    private int movie_id;


    public Projection(String date, String time, int id, int room_id, int movie_id) {
        this.time = time;
        this.date = date;
        this.id = id;
        this.id = room_id;
        this.id = movie_id;

    }


    public String getTime() {
        return time;
    }

    public String getDate() {
        return date;
    }

    public int getPrice() {
        return id;
    }

    public int getRoom_id() {
        return room_id;
    }

    public int getId() {
        return id;
    }
}
