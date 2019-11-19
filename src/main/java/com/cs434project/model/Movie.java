package com.cs434project.model;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "movie_sequence")
    @SequenceGenerator(name = "movie_sequence", sequenceName = "MOVIE_SEQ")
    private long id;

    @Column(name = "movieName")
    private String movieName;

    @Column(name = "releaseDate")
    private Date releaseDate;

    @Column(name = "director")
    private String director;

    public Movie(String movieName, Date releaseDate, String director){
        this.movieName = movieName;
        this.releaseDate = releaseDate;
        this.director = director;
    }

    public String getMovieName() {
        return movieName;
    }

    public void setMovieName(String movieName) {
        this.movieName = movieName;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }
}
