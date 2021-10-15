package com.example.cinetec_appmovil.seats;

import android.content.Context;
import android.graphics.Color;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.example.cinetec_appmovil.Seats;
import com.example.cinetec_appmovil.Tickets;


/**
 * Clase que permite crea un boton customizado para representar
 * un asiento de cine
 */
public class ButtonSeat extends androidx.appcompat.widget.AppCompatButton {

    public boolean isSelected;
    public boolean isRestricted;
    public boolean isTaken;
    public int seatNumber;
    private static int left_seats;
    private String status;

    /**
     * Constructor
     * @param context
     * @param seatNumber numero de asiento
     * @param status estado del asiento
     */
    public ButtonSeat(Context context, int seatNumber, String status) {
        super(context);

        this.seatNumber = seatNumber;
        this.isSelected = false;
        this.isRestricted = false;
        this.isTaken = false;
        this.setListener();
        this.setText(Integer.toString(seatNumber));
        left_seats = Tickets.getTotalSeats();


        if (status.equals("COVID"))
        {
            this.isRestricted = true;
        }

        else if (status.equals("TAKEN"))
        {
            this.isTaken = true;
        }

        this.setColor();



    }


    /**
     * Establece el evento para definir como se debe comportar el asiento
     * en caso de que se presionado.
     */
    private void setListener(){

        this.setOnClickListener(new OnClickListener() {

            @Override
            public void onClick(View view) {

                updateColor();


            }

        });
    }


    /**
     * Establece el color del asiento dependiendo del estado
     */
    private void setColor(){


        if(isTaken)
        {

            this.setBackgroundColor(Color.RED);
        }

        else if (isRestricted)
        {

            this.setBackgroundColor(Color.YELLOW);

        } else
            {

                this.setBackgroundColor(Color.GRAY);

        }

    }


    /**
     * Actualiza el color del estado dependiendo del estado
     */
    private void updateColor(){

        if (!isTaken && !isRestricted)
        {

            if(isSelected)
            {
                left_seats++;
                Seats.selectedSeats.remove(new Integer(seatNumber));
                this.isSelected = false;
                this.setBackgroundColor(Color.GRAY);

            } else if (left_seats != 0){

                left_seats--;
                Seats.selectedSeats.add(seatNumber);
                this.isSelected = true;
                this.setBackgroundColor(Color.GREEN);
            }



        }

    }


}
