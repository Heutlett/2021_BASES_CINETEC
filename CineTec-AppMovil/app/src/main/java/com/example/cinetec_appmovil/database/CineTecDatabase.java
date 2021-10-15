package com.example.cinetec_appmovil.database;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.widget.ArrayAdapter;

import androidx.annotation.Nullable;


import com.example.cinetec_appmovil.branchItem.Branch;
import com.example.cinetec_appmovil.client.Client;
import com.example.cinetec_appmovil.movieItem.Movie;
import com.example.cinetec_appmovil.projectionsItem.Projection;
import com.example.cinetec_appmovil.room.Room;
import com.example.cinetec_appmovil.seats.Seat;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.lang.reflect.Parameter;
import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;

import javax.net.ssl.TrustManager;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.Headers;
import okhttp3.HttpUrl;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;


/**
 * Clase que se encarga de manejar la base de datos para la
 * aplicacion movil. Se utiliza SQLite como el sistema de gestion de
 * base de datos
 */
public class CineTecDatabase extends SQLiteOpenHelper {


    private final String URL = "http://10.0.2.2:27078/api/";
    private static final int DATABASE_VERSION = 1;
    private static final String DATABASE_NAME = "cinetec.db";
    private static final String TABLE_MOVIES = "Movies";
    private static final String TABLE_CLIENTS = "Clients";
    private static final String TABLE_BRANCHES = "Branchs";
    private static final String TABLE_PROJECTIONS = "Projections";
    private static final String TABLE_SEATS = "Seats";
    private static final String TABLE_ROOM = "Room";


    private static CineTecDatabase DB_instance = null;
    private Context context;


    /**
     * Constructor
     * @param context
     */
    private CineTecDatabase(@Nullable Context context){
        super(context, DATABASE_NAME, null, DATABASE_VERSION);


        this.context = context;





    }


    /**
     * Devuelve la instancia de la base de datos como parte del patron de diseno
     * singleton
     * @param context
     * @return
     */
    public static CineTecDatabase getInstance(@Nullable Context context){

        if(DB_instance == null){
            DB_instance = new CineTecDatabase(context);
        }

        return DB_instance;

    }


    /**
     * Metodo que se llama al momento de inicializar la base de datos
     * @param sqLiteDatabase
     */
    @Override
    public void onCreate(SQLiteDatabase sqLiteDatabase) {


        this.createTable(sqLiteDatabase);




    }

    @Override
    public void onUpgrade(SQLiteDatabase sqLiteDatabase, int i, int i1) {

        this.dropTables(sqLiteDatabase);
        
        onCreate(sqLiteDatabase);


    }


    /**
     * Metodo que contiene los queries para generar las tabla en la base datos
     * @param sqLiteDatabase base de datos
     */
    private void createTable(SQLiteDatabase sqLiteDatabase)
    {

        sqLiteDatabase.execSQL("CREATE TABLE " + TABLE_MOVIES + "(" +
                "id INTEGER NOT NULL," +
                "director VARCHAR NOT NULL," +
                "original_name VARCHAR NOT NULL," +
                "name VARCHAR NOT NULL," +
                "code VARCHAR NOT NULL," +
                "age_rating VARCHAR NOT NULL," +
                "details VARCHAR NOT NULL," +
                "length VARCHAR NOT NULL," +
                "actors VARCHAR NOT NULL," +
                "PRIMARY KEY(id)"
                +")");

        sqLiteDatabase.execSQL("CREATE TABLE " + TABLE_CLIENTS + "(" +
                "cedula VARCHAR NOT NULL," +
                "first_name VARCHAR NOT NULL," +
                "middle_name VARCHAR NOT NULL," +
                "first_surname VARCHAR NOT NULL," +
                "second_surname VARCHAR NOT NULL," +
                "birth_date VARCHAR NOT NULL," +
                "username VARCHAR NOT NULL," +
                "password VARCHAR NOT NULL," +
                "phone_number VARCHAR NOT NULL," +
                "age INTEGER NOT NULL"
                +")");


        sqLiteDatabase.execSQL("CREATE TABLE " + TABLE_BRANCHES + "(" +
                "cinema_name VARCHAR NOT NULL," +
                "province VARCHAR NOT NULL," +
                "district VARCHAR NOT NULL, "+
                "rooms_quantity VARCHAR NOT NULL, "+
                "PRIMARY KEY(cinema_name)"
                + ")" );

        sqLiteDatabase.execSQL("CREATE TABLE " + TABLE_ROOM+ "(" +
                "branch_name VARCHAR NOT NULL," +
                "id INTEGER NOT NULL," +
                "row_quantity INTEGER NOT NULL, " +
                "column_quantity INTEGER NOT NULL, "+
                "capacity INTEGER NOT NULL, "+
                "PRIMARY KEY(id)" +
                ")" );


        sqLiteDatabase.execSQL("CREATE TABLE " + TABLE_PROJECTIONS + "(" +
                "room INTEGER NOT NULL," +
                "movie VARCHAR NOT NULL," +
                "projection_id INTEGER NOT NULL," +
                "date VARCHAR NOT NULL," +
                "schedule VARCHAR NOT NULL," +
                "free_spaces INTEGER NOT NULL," +
                "PRIMARY KEY(projection_id)"
                + ")");


        sqLiteDatabase.execSQL("CREATE TABLE " + TABLE_SEATS + "(" +
                "projection_id INTEGER NOT NULL,"+
                "number INTEGER NOT NULL," +
                "status VARCHAR NOT NULL"
                + ")" );


    }


    /**
     *  Metodo que eliminar las tablas de las bases de datos
     * @param sqLiteDatabase
     */
    private void dropTables(SQLiteDatabase sqLiteDatabase)
    {
        sqLiteDatabase.execSQL("DROP TABLE IF EXISTS " + TABLE_MOVIES);
        sqLiteDatabase.execSQL("DROP TABLE IF EXISTS " + TABLE_CLIENTS);
        sqLiteDatabase.execSQL("DROP TABLE IF EXISTS " + TABLE_BRANCHES);
        sqLiteDatabase.execSQL("DROP TABLE IF EXISTS " + TABLE_PROJECTIONS);
        sqLiteDatabase.execSQL("DROP TABLE IF EXISTS " + TABLE_ROOM);


    }


    /**
     * Metodo que verifica si un cliente existe en la base de datos
     * @param user usuario
     * @param password contraseña
     * @return
     */
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

            String current_password = cursor.getString(7);
            System.out.println(current_password);

            if (current_password.equals(password)){
                return new Client(cursor.getInt(0), cursor.getString(1), cursor.getString(2), cursor.getString(3), cursor.getString(4),  cursor.getString(5), cursor.getString(6), cursor.getString(7), cursor.getString(8), cursor.getInt(9));
            }
        } while(cursor.moveToNext());

        return null;
    }


    /**
     * Meotodo que obtiene las sucursales que se encuentran en la base de datos
     * @return
     */
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


    /**
     * Metodo que obtiene las proyecciones de dado el nombre de la sucursal y
     * la pelicula
     * @param cinema_name nombre del cinema
     * @param movie nombre de la pelicula
     * @return
     */
    public ArrayList<Projection> getProjections(String cinema_name, String movie)
    {
        ArrayList<Projection> projections = new ArrayList<>();

        SQLiteDatabase DB = DB_instance.getWritableDatabase();

        Cursor current = DB.rawQuery("SELECT date, schedule, projection_id, room, movie, free_spaces FROM Projections AS b JOIN Room AS r ON b.room = r.id WHERE branch_name = ? AND movie = ?", new String[]{cinema_name, movie});



        if (current != null) {

            current.moveToFirst();

            if (current.getCount() != 0) {

                do {

                    System.out.println(current.getInt(0) + "  " + current.getString(1));
                    String date = current.getString(0);
                    String schedule = current.getString(1);
                    int projection_id = current.getInt(2);
                    int room = current.getInt(3);
                    String movieName = current.getString(4);
                    int free_spaces = current.getInt(5);

                    projections.add(new Projection(date, schedule, projection_id, room, movieName, free_spaces));

                } while (current.moveToNext());

            }
        }



        return projections;
    }


    /**
     * Metodo que devuelve las peliculas que se encuetran en la base de datos
     * @return
     */
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
                    String director = cursor.getString(1);
                    String original_name = cursor.getString(2);
                    String name = cursor.getString(3);
                    String code = cursor.getString(4);
                    String age_rating = cursor.getString(5);
                    String details = cursor.getString(6);
                    String length = cursor.getString(7);
                    String actors = cursor.getString(8);
                    System.out.println(name);

                    Movie movie = new Movie(id, director, original_name, name, code, age_rating, details, length, actors);
                    movies.add(movie);




                }while(cursor.moveToNext());


            }



        }



        return movies;
    }


    /**
     * Metodo que devuelve una sala dado un ID
     * @param room_id
     * @return
     */
    public Room getRoom(int room_id) {


        SQLiteDatabase DB = DB_instance.getWritableDatabase();
        Cursor room = DB.rawQuery("SELECT row_quantity, column_quantity FROM " + TABLE_ROOM + " WHERE id = ?", new String[]{Integer.toString(room_id)});


        if (room != null) {
            room.moveToFirst();

            return new Room(room.getInt(0), room.getInt(1));


        }

        return null;
    }


    /**
     * Metodo que devuelve los asientos de una proyeccion
     * @param projection_id id de la proyeccion
     * @return
     */
    public ArrayList<Seat> getSeats(int projection_id)
    {

        ArrayList<Seat> seats = new ArrayList<>();

        SQLiteDatabase DB = DB_instance.getWritableDatabase();
        Cursor seat = DB.rawQuery("SELECT number, status FROM " + TABLE_SEATS + " WHERE projection_id = ? ORDER BY number", new String[]{Integer.toString(projection_id)});


        if (seat != null)
        {
            seat.moveToFirst();

            if (seat.getCount() != 0)
            {


                do {


                    int number = seat.getInt(0);
                    String status = seat.getString(1);;
                    System.out.println("Numero " + number );

                    Seat current_seat = new Seat(number, status);
                    seats.add(current_seat);



                }while(seat.moveToNext());

            }

        }


        return seats;
    }


    /**
     * Metodo que sincroniza la base de datos en SQLite con la base de datos
     * en PostgreSQL
     * @param table
     */
    public void synchronizeDataBase(Table table){


        switch (table){

            case ALL:
                updateBranches();
                updateProjections();
                updateRooms();
                updateMovies();
                updateClients();
                break;

            case PROJECTIONS:
                updateProjections();
                updateRooms();
                break;

            case MOVIES:
                updateMovies();
                break;

            case CLIENTS:
                updateClients();
                break;

            case BRANCHES:
                updateBranches();

        }





    }


    /**
     * Metodo que obtiene los asientos dado el id de la proyeccion
     * @param projection_id
     * @return
     */
    public ArrayList<Seat> getSeatsByProjections(int projection_id)
    {

        ArrayList<Seat> seats = new ArrayList<>();

        Request request = new Request.Builder().url(URL + "Projections/seats/" + projection_id).build();
        OkHttpClient client = new OkHttpClient();
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                e.printStackTrace();
                System.out.println(e.getLocalizedMessage());
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {

                String data = response.body().source().readUtf8();
                try {
                    JSONArray jsonArray = new JSONArray(data);

                    for (int i=0; i< jsonArray.length(); i++)
                    {
                        JSONObject seat = jsonArray.getJSONObject(i);

                        seats.add(new Seat(seat.getInt("number"), seat.getString("status")));

                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

        });

        this.sleep(500);

        return seats;

    }


    /**
     * Metodo que sincroniza las sucursales, a traves del API, que se encuentran
     * en la base de datos
     */
    private void updateBranches()
    {

            Request request = new Request.Builder().url(URL + "Branches").build();
            OkHttpClient client = new OkHttpClient();
            client.newCall(request).enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {
                    e.printStackTrace();
                    System.out.println(e.getLocalizedMessage());
                }

                @Override
                public void onResponse(Call call, Response response) throws IOException {

                        String data = response.body().source().readUtf8();
                        DB_instance.getWritableDatabase().delete(TABLE_BRANCHES, "1", null);
                        try {
                            JSONArray jsonArray = new JSONArray(data);

                            for (int i=0; i< jsonArray.length(); i++)
                            {
                                JSONObject currentBranch = jsonArray.getJSONObject(i);
                                ContentValues contentValues2 = new ContentValues();
                                contentValues2.put("cinema_name", currentBranch.getString("cinema_name"));
                                contentValues2.put("province", currentBranch.getString("province"));
                                contentValues2.put("district", currentBranch.getString("district"));
                                contentValues2.put("rooms_quantity", currentBranch.getInt("rooms_quantity"));
                                DB_instance.getWritableDatabase().insert(TABLE_BRANCHES, null, contentValues2);
                            }
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }

            });

            this.sleep(500);

        }


    /**
     * Metodo que sincroniza los clientes, a traves del API, que se encuentran
     * en la base de datos
     */
    public void updateClients()
        {

            Request request = new Request.Builder().url(URL + "Clients").build();
            OkHttpClient client = new OkHttpClient();
            client.newCall(request).enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {
                    e.printStackTrace();
                    System.out.println(e.getLocalizedMessage());
                }

                @Override
                public void onResponse(Call call, Response response) throws IOException {

                    if(response.isSuccessful()) {
                        String data = response.body().source().readUtf8();
                        System.out.println(data);
                        DB_instance.getWritableDatabase().delete(TABLE_CLIENTS, "1", null);
                        try {
                            JSONArray jsonArray = new JSONArray(data);

                            for (int i=0; i< jsonArray.length(); i++)
                            {
                                JSONObject currentClient = jsonArray.getJSONObject(i);
                                ContentValues contentValues = new ContentValues();
                                contentValues.put("cedula", currentClient.getInt("cedula"));
                                contentValues.put("first_name", currentClient.getString("first_name"));
                                contentValues.put("middle_name", currentClient.getString("middle_name"));
                                contentValues.put("first_surname", currentClient.getString("first_surname"));
                                contentValues.put("second_surname", currentClient.getString("second_surname"));
                                contentValues.put("birth_date", currentClient.getString("birth_date"));
                                contentValues.put("username", currentClient.getString("username"));
                                contentValues.put("password", currentClient.getString("password"));
                                contentValues.put("age", currentClient.getString("age"));
                                contentValues.put("phone_number", currentClient.getString("phone_number"));
                                DB_instance.getWritableDatabase().insert(TABLE_CLIENTS, null, contentValues);

                            }

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                    else {
                        System.out.println("error");
                    }

                }
            });

            this.sleep(500);

        }


    /**
     * Metodo que sincroniza las salas, a traves del API, que se encuentran
     * en la base de datos
     */
    public void updateRooms()
        {

            Request request = new Request.Builder().url(URL + "Rooms").build();
            OkHttpClient client = new OkHttpClient();
            client.newCall(request).enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {
                    e.printStackTrace();
                    System.out.println(e.getLocalizedMessage());
                }

                @Override
                public void onResponse(Call call, Response response) throws IOException {

                    if(response.isSuccessful()) {
                        String data = response.body().source().readUtf8();
                        DB_instance.getWritableDatabase().delete(TABLE_ROOM, "1", null);
                        try {
                            JSONArray jsonArray = new JSONArray(data);

                            for (int i=0; i< jsonArray.length(); i++)
                            {
                                JSONObject currentClient = jsonArray.getJSONObject(i);
                                ContentValues contentValues = new ContentValues();
                                contentValues.put("branch_name", currentClient.getString("branch_name"));
                                contentValues.put("id", currentClient.getInt("id"));
                                contentValues.put("column_quantity", currentClient.getString("column_quantity"));
                                contentValues.put("row_quantity", currentClient.getString("row_quantity"));
                                contentValues.put("capacity", currentClient.getInt("capacity"));
                                DB_instance.getWritableDatabase().insert(TABLE_ROOM, null, contentValues);

                            }

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                    else {
                        System.out.println("error");
                    }

                }
            });

            this.sleep(500);

        }


    /**
     * Metodo que sincroniza las peliculas, a traves del API, que se
     * encuentran en la base de datos
     */
    public void updateMovies() {

        Request request = new Request.Builder().url(URL + "Movies/special_all").build();
        OkHttpClient client = new OkHttpClient();
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                e.printStackTrace();
                System.out.println(e.getLocalizedMessage());
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {

                if (response.isSuccessful()) {
                    String data = response.body().source().readUtf8();
                    System.out.println(data);
                    DB_instance.getWritableDatabase().delete(TABLE_MOVIES, "1", null);
                    try {
                        JSONArray jsonArray = new JSONArray(data);

                        for (int i = 0; i < jsonArray.length(); i++) {
                            JSONObject currentMovie = jsonArray.getJSONObject(i);
                            ContentValues contentValues6 = new ContentValues();
                            contentValues6.put("director", currentMovie.getString("director"));
                            contentValues6.put("code", currentMovie.getString("code"));
                            contentValues6.put("age_rating", currentMovie.getString("age_rating"));
                            contentValues6.put("details", currentMovie.getString("details"));
                            contentValues6.put("original_name", currentMovie.getString("original_name"));
                            contentValues6.put("name", currentMovie.getString("name"));
                            contentValues6.put("length", currentMovie.getString("length"));
                            contentValues6.put("id", currentMovie.getInt("id"));
                            contentValues6.put("actors", currentMovie.getJSONArray("actors").join(","));
                            DB_instance.getWritableDatabase().insert(TABLE_MOVIES, null, contentValues6);
                        }
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                } else {
                    System.out.println("error");
                }

            }
        });


        this.sleep(500);

    }


    /**
     * Metodo que sincroniza las proyecciones, a traves del API, que se
     * encuentran en la base de datos
     */
    public void updateProjections() {

        Request request = new Request.Builder().url(URL + "Projections").build();
        OkHttpClient client = new OkHttpClient();
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                e.printStackTrace();
                System.out.println(e.getLocalizedMessage());
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {

                if (response.isSuccessful()) {
                    String data = response.body().source().readUtf8();
                    DB_instance.getWritableDatabase().delete(TABLE_PROJECTIONS, "1", null);
                    try {
                        JSONArray jsonArray = new JSONArray(data);

                        for (int i = 0; i < jsonArray.length(); i++) {
                            JSONObject currentProjections = jsonArray.getJSONObject(i);
                            ContentValues contentValues = new ContentValues();
                            contentValues.put("room", currentProjections.getInt("room"));
                            contentValues.put("projection_id", currentProjections.getInt("id"));
                            contentValues.put("movie", currentProjections.getString("movie"));
                            contentValues.put("date", currentProjections.getString("date"));
                            contentValues.put("schedule", currentProjections.getString("schedule"));
                            contentValues.put("free_spaces", currentProjections.getInt("free_spaces"));
                            DB_instance.getWritableDatabase().insert(TABLE_PROJECTIONS, null, contentValues);

                        }

                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                } else {
                    System.out.println("error");
                }

            }
        });

        this.sleep(1000);

    }


    /**
     * Metodo que sincroniza los asientos, a traves del API, que
     * se encuentran en la base de datos
     */
    public void updateSeats() {

        Request request = new Request.Builder().url(URL + "Seats").build();
        OkHttpClient client = new OkHttpClient();
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                e.printStackTrace();
                System.out.println(e.getLocalizedMessage());
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {

                if (response.isSuccessful()) {
                    String data = response.body().source().readUtf8();
                    DB_instance.getWritableDatabase().delete(TABLE_SEATS, "1", null);
                    try {
                        JSONArray jsonArray = new JSONArray(data);

                        for (int i = 0; i < jsonArray.length(); i++) {
                            JSONObject currentProjections = jsonArray.getJSONObject(i);
                            ContentValues contentValues = new ContentValues();
                            contentValues.put("projection_id", currentProjections.getInt("projection_id"));
                            contentValues.put("number", currentProjections.getInt("number"));
                            contentValues.put("status", currentProjections.getString("status"));
                            DB_instance.getWritableDatabase().insert(TABLE_SEATS, null, contentValues );

                        }

                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                } else {
                    System.out.println("error");
                }

            }
        });


        this.sleep(500);




    }


    /**
     * Metodo que efectua la compra de un asiento
     * @param projection_id id de la proyeccion
     * @param selected_seats asientos seleccionados
     */
    public void purchase(int projection_id, ArrayList<Integer> selected_seats)
    {
        OkHttpClient client = new OkHttpClient();


        try {
            JSONObject obj = new JSONObject();
            obj.put("status", "TAKEN");
            MediaType JSON = MediaType.parse("application/json; charset=utf-8");
            RequestBody body = RequestBody.create(JSON, obj.toString());


            selected_seats.stream().forEach(seat -> {

                System.out.println("Entraaaa");

                Request request = new Request.Builder()
                        .url(URL + "Seats/byId?projection_id=" + projection_id + "&number=" + seat)
                        .put(body)
                        .build();

                client.newCall(request).enqueue(new Callback() {
                    @Override
                    public void onFailure(Call call, IOException e) {
                        System.out.println(e.getLocalizedMessage());

                    }

                    @Override
                    public void onResponse(Call call, Response response) throws IOException {

                        System.out.println(response);

                    }
                });
            });

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }


    /**
     * Metodo que duerme el thread dado un tiempo
     * @param millis
     */
    public void sleep(int millis)
    {

        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }








}


