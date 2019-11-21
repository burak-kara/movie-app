package com.cs434project.model;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "movie")
public class Movie implements Observable{

    // Observer Pattern Movie watchers and notifier *Weather Station* OR Bottom panel that show how many movies in DB
    // Null Object Pattern -> Null Obj DB
    // Singleton for DB connection might be used with State Pat. (connection part)
    // Iterator Pattern for custom lists
    // Mediator chat panel
    // ***********************************
    // Strategy might be used for User types and their behaviors
    // Command can be used to push multiple OBJ into DB
    // State Pat. can be used for changing movies state aka. Upcoming, In Theatre and Past Movies

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "movie_sequence")
    @SequenceGenerator(name = "movie_sequence", sequenceName = "MOVIE_SEQ")
    private long id;

    @Column(name = "movieName")
    private String movieName;

    @Column(name = "releaseDate")
    private String releaseDate;

    @Column(name = "director")
    private String director;

    @OneToMany(targetEntity=MovieDisplay.class, mappedBy="movie", fetch=FetchType.EAGER)
    private List<Observer> observers;

/*    public Movie(String movieName, String releaseDate, String director){
        this.movieName = movieName;
        this.releaseDate = releaseDate;
        this.director = director;
    }*/

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getMovieName() {
        return movieName;
    }

    public void setMovieName(String movieName) {
        this.movieName = movieName;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    @Override
    public String toString(){
        return "Movie: " + movieName + "Id: " + id + ", " + releaseDate + ", " + director;
    }

    @Override
    public void registerObserver(Observer observer) {
        observers.add(observer);
    }

    @Override
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(this);
        }
    }
}
