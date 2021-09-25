package com.example.cinetec_appmovil;

import android.graphics.drawable.Drawable;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.GridLayout;
import android.widget.HorizontalScrollView;
import android.widget.LinearLayout;
import android.widget.TableLayout;
import android.widget.TableRow;

import com.example.cinetec_appmovil.databinding.FragmentSeatsBinding;

import java.util.ArrayList;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link Seats} factory method to
 * create an instance of this fragment.
 */
public class Seats extends Fragment {

    private FragmentSeatsBinding binding;


    private ArrayList<ButtonSeat> buttonSeats = new ArrayList<>();

    public Seats() {
        // Required empty public constructor
    }


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        binding = FragmentSeatsBinding.inflate(inflater, container, false);
        return binding.getRoot();

    }


    @Override
    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        int row = 15;
        int column = 10;


        GridLayout seats_layout= view.findViewById(R.id.xd);

        seats_layout.setRowCount(row);
        seats_layout.setColumnCount(column);

        int x = 20;
        int y;
        int seat = 1;
        for(int i=0; i<row; i++){



            x += 25;
            y = 500;

            for(int j=0; j<column; j++){


                ButtonSeat button = new ButtonSeat(getContext(), seat, false, false);

                LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(125, 125);
                if (column/2 == j) {

                    params.setMargins(70, 10, 10, 10);
                }
                else
                {
                    params.setMargins(5, 10, 5, 10);

                }


                button.setLayoutParams(params);
                button.setId(seat);
                seats_layout.addView(button);
                this.buttonSeats.add(button);
                seat++;

                y += 200;

            }


            if (x >= 900){
                x = 20;

            }else{
                x += 150;
            }



        }



    }
}