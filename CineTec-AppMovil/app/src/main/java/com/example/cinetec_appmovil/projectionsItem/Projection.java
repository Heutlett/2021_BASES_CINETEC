package com.example.cinetec_appmovil.projectionsItem;

public class Projection {

    private String time;
    private String date;
    private String price;


    public Projection(String date, String time, String price) {
        this.time = time;
        this.date = date;
        this.price = price;
    }


    public String getTime() {
        return time;
    }

    public String getDate() {
        return date;
    }

    public String getPrice() {
        return price;
    }
}
