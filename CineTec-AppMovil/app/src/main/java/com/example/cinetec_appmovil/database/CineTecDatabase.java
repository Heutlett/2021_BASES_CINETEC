package com.example.cinetec_appmovil.database;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import androidx.annotation.Nullable;

import com.example.cinetec_appmovil.Projections;
import com.example.cinetec_appmovil.branchItem.Branch;
import com.example.cinetec_appmovil.client.Client;
import com.example.cinetec_appmovil.movieItem.Movie;
import com.example.cinetec_appmovil.projectionsItem.Projection;
import com.example.cinetec_appmovil.room.Room;
import com.example.cinetec_appmovil.seats.Seat;

import java.lang.reflect.Parameter;
import java.util.ArrayList;

public class CineTecDatabase extends SQLiteOpenHelper {


    private static final int DATABASE_VERSION = 1;
    private static final String DATABASE_NAME = "cinetec.db";
    private static final String TABLE_MOVIES = "Movies";
    private static final String TABLE_CLIENTS = "Clients";
    private static final String TABLE_BRANCHES = "Branchs";
    private static final String TABLE_PROJECTIONS = "Projections";
    private static final String TABLE_SEATS = "Seats";
    private static final String TABLE_DIRECTOR = "Director";
    private static final String TABLE_CLASSIFICATION = "Classification";
    private static final String TABLE_ROOM = "Room";
    private static final String TABLE_BILL = "Bill";
    private static final String TABLE_ACTOR = "Actor";

    private static CineTecDatabase DB_instance = null;
    private int i = 1000;



    private CineTecDatabase(@Nullable Context context){
        super(context, DATABASE_NAME, null, DATABASE_VERSION);

        synchronizeDataBase();



    }

    public static CineTecDatabase getInstance(@Nullable Context context){

        if(DB_instance == null){
            DB_instance = new CineTecDatabase(context);
        }

        return DB_instance;

    }


    public CineTecDatabase(@Nullable Context context, @Nullable String name, @Nullable SQLiteDatabase.CursorFactory factory, int version) {
        super(context, name, factory, version);
    }

    @Override
    public void onCreate(SQLiteDatabase sqLiteDatabase) {

        sqLiteDatabase.execSQL("CREATE TABLE " + TABLE_MOVIES + "(" +
                "id INTEGER NOT NULL," +
                "classification_id INTEGER NOT NULL," +
                "director_id INTEGER NOT NULL," +
                "image VARCHAR NOT NULL," +
                "original_name VARCHAR NOT NULL," +
                "name VARCHAR NOT NULL," +
                "length VARCHAR NOT NULL," +
                "PRIMARY KEY(id), " +
                "FOREIGN KEY(director_id) REFERENCES " + TABLE_DIRECTOR + "(id)," +
                "FOREIGN KEY(classification_id) REFERENCES " + TABLE_CLASSIFICATION + "(code)"
                +")");

        sqLiteDatabase.execSQL("CREATE TABLE " + TABLE_CLIENTS + "(" +
                "id INTEGER NOT NULL," +
                "first_name VARCHAR NOT NULL," +
                "middle_name VARCHAR NOT NULL," +
                "first_surname VARCHAR NOT NULL," +
                "second_surname VARCHAR NOT NULL," +
                "birth_date VARCHAR NOT NULL," +
                "phone_number INTEGER NOT NULL," +
                "username VARCHAR NOT NULL," +
                "password VARCHAR NOT NULL," +
                "PRIMARY KEY(id)"
                +")");


        sqLiteDatabase.execSQL("CREATE TABLE " + TABLE_BRANCHES + "(" +
                "cinema_name VARCHAR NOT NULL," +
                "province VARCHAR NOT NULL," +
                "district VARCHAR NOT NULL, " +
                "room_quantity VARCHAR NOT NULL, "+
                "PRIMARY KEY(cinema_name)"
                + ")" );

        sqLiteDatabase.execSQL("CREATE TABLE " + TABLE_ROOM+ "(" +
                "branch_name VARCHAR NOT NULL," +
                "id INTEGER NOT NULL," +
                "row_quantity INTEGER NOT NULL, " +
                "column_quantity INTEGER NOT NULL, "+
                "PRIMARY KEY(id) ," +
                "FOREIGN KEY(branch_name) REFERENCES " + TABLE_DIRECTOR + "(id)" +
                 ")" );


        sqLiteDatabase.execSQL("CREATE TABLE " + TABLE_PROJECTIONS + "(" +
                "room_id INTEGER NOT NULL," +
                "movie_id INTEGER NOT NULL," +
                "id INTEGER NOT NULL," +
                "date VARCHAR NOT NULL," +
                "time VARCHAR NOT NULL," +
                "PRIMARY KEY(id)," +
                "FOREIGN KEY(movie_id) REFERENCES " + TABLE_MOVIES + "(id)," +
                "FOREIGN KEY(room_id) REFERENCES " + TABLE_ROOM + "(id)"
                + ")");


        sqLiteDatabase.execSQL("CREATE TABLE " + TABLE_SEATS + "(" +
                "room_id INTEGER NOT NULL,"+
                "number INTEGER NOT NULL," +
                "status VARCHAR NOT NULL," +
                "FOREIGN KEY(room_id) REFERENCES " + TABLE_ROOM + "(id)"
                + ")" );


        sqLiteDatabase.execSQL("CREATE TABLE " + TABLE_BILL + "(" +
                "client_id INTEGER NOT NULL,"  +
                "projection_id  INTEGET NOT NULL," +
                "id INTEGER NOT NULL,"  +
                "detail VARCHAR NOT NULL," +
                "PRIMARY KEY(id)" +
                ")");


        sqLiteDatabase.execSQL("CREATE TABLE " + TABLE_DIRECTOR + "(" +
                "id INTEGER NOT NULL,"  +
                "name VARCHAR NOT NULL," +
                "PRIMARY KEY(id)" +
                ")");

        sqLiteDatabase.execSQL("CREATE TABLE " + TABLE_CLASSIFICATION + "(" +
                "code INTEGER NOT NULL,"  +
                "detail VARCHAR NOT NULL," +
                "age_rating VARCHAR NOT NULL," +
                "PRIMARY KEY(code)" +
                ")");


        sqLiteDatabase.execSQL("CREATE TABLE " + TABLE_ACTOR + "(" +
                "id INTEGER NOT NULL,"  +
                "Name VARCHAR NOT NULL," +
                "PRIMARY KEY(id)" +
                ")");

    }

    @Override
    public void onUpgrade(SQLiteDatabase sqLiteDatabase, int i, int i1) {


        sqLiteDatabase.execSQL("DROP TABLE IF EXISTS " + TABLE_MOVIES);
        sqLiteDatabase.execSQL("DROP TABLE IF EXISTS " + TABLE_CLIENTS);
        sqLiteDatabase.execSQL("DROP TABLE IF EXISTS " + TABLE_BRANCHES);
        sqLiteDatabase.execSQL("DROP TABLE IF EXISTS " + TABLE_PROJECTIONS);
        sqLiteDatabase.execSQL("DROP TABLE IF EXISTS " + TABLE_ROOM);
        sqLiteDatabase.execSQL("DROP TABLE IF EXISTS " + TABLE_DIRECTOR);
        sqLiteDatabase.execSQL("DROP TABLE IF EXISTS " + TABLE_ACTOR);
        sqLiteDatabase.execSQL("DROP TABLE IF EXISTS " + TABLE_BILL);
        sqLiteDatabase.execSQL("DROP TABLE IF EXISTS " + TABLE_CLASSIFICATION);
        sqLiteDatabase.execSQL("DROP TABLE IF EXISTS " + TABLE_SEATS);
        onCreate(sqLiteDatabase);


    }

    public boolean fillDateBase(){

        ContentValues contentValues = new ContentValues();
        contentValues.put("first_name", "sebastian");
        contentValues.put("middle_name", "jesus");
        contentValues.put("first_surname", "mora");
        contentValues.put("second_surname", "godinez");
        contentValues.put("birth_date", "28/05/2000");
        contentValues.put("phone_number", "88844165");
        contentValues.put("username", "semora");
        contentValues.put("password", "moragodi28");
        DB_instance.getWritableDatabase().insert(TABLE_CLIENTS, null, contentValues);


        ContentValues contentValues2 = new ContentValues();
        contentValues2.put("cinema_name", "cinepolis");
        contentValues2.put("province", "San Jose");
        contentValues2.put("district", "Guadalupe");
        contentValues2.put("room_quantity", "5");
        DB_instance.getWritableDatabase().insert(TABLE_BRANCHES, null, contentValues2);

        ContentValues contentValues4 = new ContentValues();
        contentValues4.put("cinema_name", "multicines");
        contentValues4.put("province", "San Jose");
        contentValues4.put("district", "Perez Zeledon");
        contentValues4.put("room_quantity", "5");
        DB_instance.getWritableDatabase().insert(TABLE_BRANCHES, null, contentValues4);



        ContentValues contentValues3 = new ContentValues();
        contentValues3.put("classification_id", 1);
        contentValues3.put("director_id", 2);
        contentValues3.put("image", "avenger.png");
        contentValues3.put("original_name", "avengers");
        contentValues3.put("name", "vengadores");
        contentValues3.put("length", "2 horas: 30 minutos");
        DB_instance.getWritableDatabase().insert(TABLE_MOVIES, null, contentValues3);


        ContentValues contentValues5 = new ContentValues();
        contentValues5.put("classification_id", 1);
        contentValues5.put("director_id", 2);
        contentValues5.put("image", "avenger.png");
        contentValues5.put("original_name", "Fast and Furious");
        contentValues5.put("name", "A todo gas");
        contentValues5.put("length", "2 horas: 30 minutos");
        DB_instance.getWritableDatabase().insert(TABLE_MOVIES, null, contentValues5);

        ContentValues contentValues6 = new ContentValues();
        contentValues6.put("classification_id", 1);
        contentValues6.put("director_id", 2);
        contentValues6.put("image", "avenger.png");
        contentValues6.put("original_name", "Batman The Dark knight");
        contentValues6.put("name", "Batman el caballero oscuro");
        contentValues6.put("length", "2 horas: 30 minutos");
        DB_instance.getWritableDatabase().insert(TABLE_MOVIES, null, contentValues6);


        ContentValues contentValues7 = new ContentValues();
        contentValues7.put("branch_name", "cinepolis");
        contentValues7.put("row_quantity", 10);
        contentValues7.put("column_quantity", 15);
        DB_instance.getWritableDatabase().insert(TABLE_ROOM, null, contentValues7);


        ContentValues contentValues8 = new ContentValues();
        contentValues8.put("branch_name", "cinepolis");
        contentValues8.put("row_quantity", 15);
        contentValues8.put("column_quantity", 20);
        DB_instance.getWritableDatabase().insert(TABLE_ROOM, null, contentValues8);

        ContentValues contentValues9 = new ContentValues();
        contentValues9.put("branch_name", "multicines");
        contentValues9.put("row_quantity", 10);
        contentValues9.put("column_quantity", 10);
        DB_instance.getWritableDatabase().insert(TABLE_ROOM, null, contentValues9);


        ContentValues contentValues11 = new ContentValues();
        contentValues11.put("room_id", 1);
        contentValues11.put("movie_id", 1);
        contentValues11.put("date", "25/22/2000");
        contentValues11.put("time", "15:00");
        DB_instance.getWritableDatabase().insert(TABLE_PROJECTIONS, null, contentValues11);


        ContentValues contentValues12 = new ContentValues();
        contentValues12.put("room_id", 2);
        contentValues12.put("movie_id", 1);
        contentValues12.put("date", "22/22/2222");
        contentValues12.put("time", "13:00");
        DB_instance.getWritableDatabase().insert(TABLE_PROJECTIONS, null, contentValues12);






        return true;

    }


    public Client clientExist(String user, String password)
    {

        SQLiteDatabase DB = DB_instance.getWritableDatabase();

        Cursor cursor = DB.rawQuery("SELECT * FROM " + TABLE_CLIENTS + " WHERE username= ?", new String[]{user});

        if (cursor.getCount() == 0){
            return null;
        }

        if (cursor != null){
            cursor.moveToFirst();
        }

        do {

            String current_password = cursor.getString(8);
            System.out.println(current_password);

            if (current_password.equals(password)){
                return new Client(cursor.getInt(0), cursor.getString(1), cursor.getString(2), cursor.getString(3), cursor.getString(4),  cursor.getString(5), cursor.getString(6), cursor.getString(7), cursor.getString(8));
            }
        } while(cursor.moveToNext());

        return null;
    }


    public ArrayList<Branch> getBranches()
    {
        ArrayList<Branch> branches = new ArrayList<>();

        SQLiteDatabase DB = DB_instance.getWritableDatabase();
        Cursor cursor = DB.rawQuery("SELECT * FROM " + TABLE_BRANCHES, new String[]{});

        if (cursor != null){

            cursor.moveToFirst();

            if (cursor.getCount() != 0){


                do {

                    String cinemaName = cursor.getString(0);
                    String province = cursor.getString(1);
                    String district = cursor.getString(2);
                    String roomQuantity = Integer.toString(cursor.getInt(3));

                    Branch branch = new Branch(province, district, cinemaName, roomQuantity);
                    branches.add(branch);




                }while(cursor.moveToNext());


            }


        }

        return branches;
    }

    public ArrayList<Projection> getProjections(String cinema_name, int movie_id)
    {
        ArrayList<Projection> projections = new ArrayList<>();

        SQLiteDatabase DB = DB_instance.getWritableDatabase();



        Cursor room = DB.rawQuery("SELECT id FROM " + TABLE_ROOM + " WHERE branch_name = ?", new String[]{cinema_name});

        Cursor movies = DB.rawQuery("SELECT room_id,date, time, id FROM " + TABLE_PROJECTIONS + " WHERE movie_id = ?", new String[]{Integer.toString(movie_id)});

        if (movies != null){

            movies.moveToFirst();

            if (movies.getCount() != 0){


                do {

                    int room_id = movies.getInt(0);

                    if (room != null) {

                        room.moveToFirst();


                        if (room.getCount() != 0) {

                            do {

                                int current_room_id = room.getInt(0);

                                if (current_room_id == room_id) {

                                    Projection projection = new Projection(movies.getString(1), movies.getString(2), movies.getInt(3), current_room_id, movie_id);
                                    projections.add(projection);


                                }


                            } while (room.moveToNext());


                        }


                    }
                }while(movies.moveToNext());


            }


        }

        return projections;
    }

    public ArrayList<Movie> getMovies()
    {
        ArrayList<Movie> movies = new ArrayList<>();

        SQLiteDatabase DB = DB_instance.getWritableDatabase();
        Cursor cursor = DB.rawQuery("SELECT * FROM " + TABLE_MOVIES , new String[]{});

        if (cursor != null){

            cursor.moveToFirst();

            if (cursor.getCount() != 0){


                do {

                    int id = cursor.getInt(0);
                    int classification_id = cursor.getInt(1);
                    int director_id = cursor.getInt(2);
                    String image = cursor.getString(3);
                    String original_name = cursor.getString(4);
                    String name = cursor.getString(5);
                    String length = cursor.getString(6);

                    Movie movie = new Movie(id, classification_id, director_id, image, original_name, name, length);
                    movies.add(movie);




                }while(cursor.moveToNext());


            }


        }

        return movies;
    }


    public Room getRoom(int room_id) {


        SQLiteDatabase DB = DB_instance.getWritableDatabase();
        Cursor room = DB.rawQuery("SELECT row_quantity, column_quantity FROM " + TABLE_ROOM + " WHERE room_id = ?", new String[]{Integer.toString(room_id)});


        if (room != null) {
            room.moveToFirst();

            return new Room(room.getInt(0), room.getInt(1));


        }

        return null;
    }


    public ArrayList<Seat> getSeats(int room_id)
    {

        ArrayList<Seat> seats = new ArrayList<>();

        SQLiteDatabase DB = DB_instance.getWritableDatabase();
        Cursor seat = DB.rawQuery("SELECT number, status FROM " + TABLE_SEATS + " WHERE room_id = ?", new String[]{Integer.toString(room_id)});


        if (seat != null)
        {
            seat.moveToFirst();

            if (seat.getCount() != 0)
            {


                do {


                    int number = seat.getInt(0);
                    String status = seat.getString(1);

                    Seat current_seat = new Seat(number, status);
                    seats.add(current_seat);



                }while(seat.moveToNext());




            }


        }









        return seats;
    }


    public void synchronizeDataBase(){


        new Thread(new Runnable() {
            @Override
            public void run() {


                long startTime = System.currentTimeMillis();
                long endTime = startTime + 3*1000;

                while(true) {


                    sleepSynchronizeDataBase();




            }


            }
        }).start();


    }


    public void sleepSynchronizeDataBase(){
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }



    }
}


