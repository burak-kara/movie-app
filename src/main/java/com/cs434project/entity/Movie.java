package com.cs434project.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "movie") // implements Observable
public class Movie {

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
    @Getter @Setter private long id;

    @Column
    @Getter @Setter private String movieName;

    @Column
    @Getter @Setter private String releaseDate;

    @Column
    @Getter @Setter private String director;


//    **Code Commented Out for the Observable Pattern Implementation later on.**

//    @OneToMany(targetEntity=MovieDisplay.class, mappedBy="movie", fetch=FetchType.EAGER)
//    private List<Observer> observers;

/*    @Override
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
    }*/

    @Override
    public String toString(){
    return "Movie: " + movieName + "Id: " + id + ", " + releaseDate + ", " + director;
}
}
