package com.example.cinetec_appmovil.room;


/**
 * Clase de modela las caracteristicas de una sala de cine
 */
public class Room {


    private int rows;
    private int columns;


    public Room(int rows, int columns) {
        this.rows = rows;
        this.columns = columns;
    }

    public int getRows() {
        return rows;
    }

    public int getColumns() {
        return columns;
    }
}
