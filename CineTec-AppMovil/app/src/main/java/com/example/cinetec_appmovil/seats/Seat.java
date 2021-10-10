package com.example.cinetec_appmovil.seats;

public class Seat  {

    private int number;
    private String status;


    public Seat(int number, String status) {
        this.number = number;
        this.status = status;
    }

    public int getNumber() {
        return number;
    }

    public String getStatus() {
        return status;
    }
}
