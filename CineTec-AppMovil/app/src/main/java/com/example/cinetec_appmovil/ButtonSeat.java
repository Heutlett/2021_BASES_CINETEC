package com.example.cinetec_appmovil;

import android.content.Context;
import android.graphics.Color;
import android.view.View;
import android.widget.Button;

public class ButtonSeat extends androidx.appcompat.widget.AppCompatButton {

    public boolean isSelected;
    public boolean isRestricted;
    public boolean isTaken;
    public int seatNumber;

    public ButtonSeat(Context context, int seatNumber, boolean isRestricted, boolean isTaken) {
        super(context);

        this.seatNumber = seatNumber;
        this.isSelected = false;
        this.isRestricted = isRestricted;
        this.isTaken = isTaken;
        this.setColor();
        this.setListener();
        this.setText(Integer.toString(seatNumber));

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
                this.isSelected = false;
                this.setBackgroundColor(Color.GRAY);

            } else {

                this.isSelected = true;
                this.setBackgroundColor(Color.GREEN);
            }



        }



    }


}
