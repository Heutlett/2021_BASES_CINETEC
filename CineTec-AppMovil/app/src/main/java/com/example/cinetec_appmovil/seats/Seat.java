package com.example.cinetec_appmovil.seats;


/**
 * Clase que modela un asiento del cine
 */
public class Seat  {

    private int number;
    private String status;


    /**
     * Constructor
     * @param number numero de asiento
     * @param status estado del asiento
     */
    public Seat(int number, String status) {
        this.number = number;
        this.status = status;
    }

    /**
     * Devuelve el numero de asiento
     * @return number
     */
    public int getNumber() {
        return number;
    }

    /**
     * Devuelve el estado del asiento
     * @return status
     */
    public String getStatus() {
        return status;
    }
}
