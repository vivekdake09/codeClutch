package com.cloud.play.app.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "videos")
public class Video {
    @Id
    private String id;
    private String title;
    private String description;
    private String videoUrl;
    private String duration; // Video duration
    private int likesCount;  // Likes count
    private int viewsCount;  // Views count

    public Video(String title, String description, String videoUrl, String duration, int likesCount, int viewsCount) {
        this.title = title;
        this.description = description;
        this.videoUrl = videoUrl;
        this.duration = duration;
        this.likesCount = likesCount;
        this.viewsCount = viewsCount;
    }

    // Getters and Setters
    public String getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getVideoUrl() { return videoUrl; }
    public String getDuration() { return duration; }
    public int getLikesCount() { return likesCount; }
    public int getViewsCount() { return viewsCount; }

    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }
    public void setDuration(String duration) { this.duration = duration; }
    public void setLikesCount(int likesCount) { this.likesCount = likesCount; }
    public void setViewsCount(int viewsCount) { this.viewsCount = viewsCount; }
}
