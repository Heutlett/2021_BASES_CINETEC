package com.example.cinetec_appmovil.seats;

import android.content.Context;
import android.graphics.Color;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.example.cinetec_appmovil.Tickets;

public class ButtonSeat extends androidx.appcompat.widget.AppCompatButton {

    public boolean isSelected;
    public boolean isRestricted;
    public boolean isTaken;
    public int seatNumber;
    private static int left_seats;

    public ButtonSeat(Context context, int seatNumber, boolean isRestricted, boolean isTaken) {
        super(context);

        this.seatNumber = seatNumber;
        this.isSelected = false;
        this.isRestricted = isRestricted;
        this.isTaken = isTaken;
        this.setColor();
        this.setListener();
        this.setText(Integer.toString(seatNumber));
        left_seats = Tickets.getTotalSeats();

    }


    private void setListener(){

        this.setOnClickListener(new OnClickListener() {

            @Override
            public void onClick(View view) {

                updateColor();


            }

        });
    }


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

    private void updateColor(){

        if (!isTaken && !isRestricted)
        {

            if(isSelected)
            {
                left_seats++;
                this.isSelected = false;
                this.setBackgroundColor(Color.GRAY);

            } else if (left_seats != 0){

                left_seats--;
                this.isSelected = true;
                this.setBackgroundColor(Color.GREEN);
            }



        }

    }


}
