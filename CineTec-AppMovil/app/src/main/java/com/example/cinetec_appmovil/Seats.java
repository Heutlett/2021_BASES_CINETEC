package com.example.cinetec_appmovil;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.navigation.fragment.NavHostFragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.GridLayout;
import android.widget.LinearLayout;

import com.example.cinetec_appmovil.database.CineTecDatabase;
import com.example.cinetec_appmovil.databinding.FragmentSeatsBinding;
import com.example.cinetec_appmovil.projectionsItem.Projection;
import com.example.cinetec_appmovil.room.Room;
import com.example.cinetec_appmovil.seats.ButtonSeat;
import com.example.cinetec_appmovil.seats.Seat;

import java.util.ArrayList;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link Seats} factory method to
 * create an instance of this fragment.
 */
public class Seats extends Fragment {

    private FragmentSeatsBinding binding;


    private ArrayList<ButtonSeat> buttonSeats = new ArrayList<>();
    public static ArrayList<Integer> selectedSeats = new ArrayList<>();

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


        binding.finalizePurchaseButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {


                CineTecDatabase.getInstance(getContext()).purchase(Projections.current_projection.getId(), selectedSeats);
                NavHostFragment.findNavController(Seats.this)
                        .navigate(R.id.action_seats_to_menu);


            }
        });

        binding.totalSeatsText.setText(Integer.toString(Tickets.getTotalSeats()));
        binding.movieNameText.setText(Movies.current_movie);
        binding.scheduleText.setText(Projections.current_projection.getDate() + "," + Projections.current_projection.getTime());



        return binding.getRoot();

    }


    @Override
    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);


        ArrayList<Seat> seats = CineTecDatabase.getInstance(getContext()).getSeatsByProjections(Projections.current_projection.getId());
        Room currentRoom = CineTecDatabase.getInstance(getContext()).getRoom(Projections.current_projection.getRoom());


        int row = currentRoom.getRows();
        int column = currentRoom.getColumns();
        GridLayout seats_layout= view.findViewById(R.id.seats_layout);
        seats_layout.setRowCount(row);
        seats_layout.setColumnCount(column);
        int index = 0;


        if (seats.size() != 0) {
            for (int i = 0; i < row; i++) {

                for (int j = 0; j < column; j++) {


                    Seat currentSeat = seats.get(index);
                    ButtonSeat currentButton = createButton(currentSeat.getNumber(), column, j, currentSeat.getStatus());
                    seats_layout.addView(currentButton);
                    this.buttonSeats.add(currentButton);
                    index++;


                }


            }

        }

    }

    private ButtonSeat createButton(int seat, int column, int j, String status){

        ButtonSeat button = new ButtonSeat(getContext(), seat, status);

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
        return button;

    }
}