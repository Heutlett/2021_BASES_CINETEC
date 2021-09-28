package com.example.cinetec_appmovil.database;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import androidx.annotation.Nullable;

import com.example.cinetec_appmovil.Projections;
import com.example.cinetec_appmovil.branchItem.Branch;
import com.example.cinetec_appmovil.movieItem.Movie;
import com.example.cinetec_appmovil.projectionsItem.Projection;
import com.example.cinetec_appmovil.seats.Seat;

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
                "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                "Original_name VARCHAR NOT NULL," +
                "Name VARCHAR NOT NULL," +
                "Image VARCHAR NOT NULL," +
                "Length VARCHAR NOT NULL," +
                "PRIMARY KEY(Id), " +
                "FOREIGN KEY(Director_id) REFERENCES " + TABLE_DIRECTOR + "(Id)," +
                "FOREIGN KEY(Clasisfication_id) REFERENCES " + TABLE_CLASSIFICATION + "(Code)"
                +")");

        sqLiteDatabase.execSQL("CREATE TABLE " + TABLE_CLIENTS + "(" +
                "Id INTEGER NOT NULL," +
                "First_name VARCHAR NOT NULL," +
                "Middle_name VARCHAR NOT NULL," +
                "First_surname VARCHAR NOT NULL," +
                "Second_surname VARCHAR NOT NULL," +
                "Birth_date VARCHAR NOT NULL," +
                "Phone_number INTEGER NOT NULL," +
                "Username VARCHAR NOT NULL," +
                "Password VARCHAR NOT NULL," +
                "PRIMARY KEY(Id)"
                +")");


        sqLiteDatabase.execSQL("CREATE TABLE " + TABLE_BRANCHES + "(" +
                "CinemaName VARCHAR NOT NULL," +
                "Province VARCHAR NOT NULL," +
                "Disctrict VARCHAR NOT NULL, " +
                "Room_quantity VARCHAR NOT NULL "
                + ")" );

        sqLiteDatabase.execSQL("CREATE TABLE " + TABLE_PROJECTIONS + "(" +
                "Id INTEGER NOT NULL," +
                "Date VARCHAR NOT NULL," +
                "Time VARCHAR NOT NULL," +
                "PRIMARY KEY(Id)," +
                "FOREIGN KEY(Movie_id) REFERENCES " + TABLE_MOVIES + "(Id)," +
                "FOREIGN KEY(Room_id) REFERENCES " + TABLE_ROOM + "(Id)"
                + ")");


        sqLiteDatabase.execSQL("CREATE TABLE " + TABLE_SEATS + "(" +
                "Number INTEGER NOT NULL," +
                "Status VARCHAR NOT NULL," +
                "FOREIGN KEY(Room_id) REFERENCES " + TABLE_ROOM + "(Id)"
                + ")" );


        sqLiteDatabase.execSQL("CREATE TABLE " + TABLE_BILL + "(" +
                "Id INTEGER NOT NULL,"  +
                "Detail VARCHAR NOT NULL," +
                "PRIMARY KEY(Id)," +
                "FOREIGN KEY(Movie_id) REFERENCES " + TABLE_MOVIES + "(Id)," +
                "FOREIGN KEY(Room_id) REFERENCES " + TABLE_ROOM + "(Id)" +
                ")");


        sqLiteDatabase.execSQL("CREATE TABLE " + TABLE_DIRECTOR + "(" +
                "Id INTEGER NOT NULL,"  +
                "Name VARCHAR NOT NULL," +
                "PRIMARY KEY(Id)" +
                ")");

        sqLiteDatabase.execSQL("CREATE TABLE " + TABLE_CLASSIFICATION + "(" +
                "Code INTEGER NOT NULL,"  +
                "Detail VARCHAR NOT NULL," +
                "Age_rating VARCHAR NOT NULL," +
                "PRIMARY KEY(Code)" +
                ")");


        sqLiteDatabase.execSQL("CREATE TABLE " + TABLE_ACTOR + "(" +
                "Id INTEGER NOT NULL,"  +
                "Name VARCHAR NOT NULL," +
                "PRIMARY KEY(Id)" +
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

    public boolean insertClient(int i){

        ContentValues contentValues = new ContentValues();

        contentValues.put("id", i);
        contentValues.put("name", "sebas");
        contentValues.put("user", "xd");
        contentValues.put("password", "xd");

        long result = DB_instance.getWritableDatabase().insert(TABLE_CLIENTS, null, contentValues);

        if (result == -1){
            return false;

        }
        return true;


    }



    public boolean clientExist(String user, String password)
    {

        SQLiteDatabase DB = DB_instance.getWritableDatabase();

        Cursor cursor = DB.rawQuery("SELECT * FROM " + TABLE_CLIENTS + " WHERE user= ?", new String[]{user});

        if (cursor.getCount() == 0){
            return false;
        }

        if (cursor != null){
            cursor.moveToFirst();
        }

        do {

            String current_password = cursor.getString(3);

            if (current_password.equals(password)){
                return true;
            }
        } while(cursor.moveToNext());

        return false;
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
                    Integer roomQuantity = cursor.getInt(3);

                    Branch branch = new Branch(province, district, cinemaName, "0");
                    branches.add(branch);




                }while(cursor.moveToNext());


            }


        }

        return branches;
    }

    public ArrayList<Projection> getProjections()
    {
        ArrayList<Projection> projections = new ArrayList<>();

        SQLiteDatabase DB = DB_instance.getWritableDatabase();
        Cursor cursor = DB.rawQuery("SELECT * FROM " + TABLE_PROJECTIONS, new String[]{});

        if (cursor != null){

            cursor.moveToFirst();

            if (cursor.getCount() != 0){


                do {

                    int id = cursor.getInt(0);
                    String data = cursor.getString(1);
                    String time = cursor.getString(2);

                    Projection projection = new Projection(time, data, "");
                    projections.add(projection);




                }while(cursor.moveToNext());


            }


        }

        return projections;
    }

    public ArrayList<Movie> getMovies()
    {
        ArrayList<Movie> movies = new ArrayList<>();

        SQLiteDatabase DB = DB_instance.getWritableDatabase();
        Cursor cursor = DB.rawQuery("SELECT * FROM " + TABLE_MOVIES, new String[]{});

        if (cursor != null){

            cursor.moveToFirst();

            if (cursor.getCount() != 0){


                do {

                    int id = cursor.getInt(0);
                    String name = cursor.getString(1);
                    String length = cursor.getString(2);

                    Movie movie = new Movie(name, length, "", "", "");
                    movies.add(movie);




                }while(cursor.moveToNext());


            }


        }

        return movies;
    }


    public ArrayList<Seat> getSeats()
    {

        ArrayList<Seat> seats = new ArrayList<>();





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


