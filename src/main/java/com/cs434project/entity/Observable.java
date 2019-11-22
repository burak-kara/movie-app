package com.cs434project.entity;

public interface Observable {
    // Used to notify users that clicks "getUpdated()"/GetNews from the movie. For ex. incoming movies
    void registerObserver(Observer observer);

    void removeObserver(Observer observer);

    void notifyObservers();
}
