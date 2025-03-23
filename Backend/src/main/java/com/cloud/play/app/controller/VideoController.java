package com.cloud.play.app.controller;

import com.cloud.play.app.model.Video;
import com.cloud.play.app.repository.VideoRepository;
import com.cloud.play.app.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.*;

@RestController
@RequestMapping("/videos")
public class VideoController {

    @Autowired
    private VideoService videoService;

    @Autowired
    private VideoRepository videoRepository;

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadVideo(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("description") String description) {
        try {
            // Upload video to Cloudinary and get URL
            String videoUrl = videoService.uploadVideo(file);

            // Extract video duration using FFmpeg
            String duration = getVideoDuration(file);

            // Save video details in MongoDB with default viewsCount = 0
            Video video = new Video(title, description, videoUrl, duration, 0, 0);
            videoRepository.save(video);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Video uploaded successfully!");
            response.put("title", title);
            response.put("description", description);
            response.put("videoUrl", videoUrl);
            response.put("duration", duration);
            response.put("likesCount", "0");
            response.put("viewsCount", "0");

            return ResponseEntity.ok(response);
        } catch (IOException | InterruptedException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Video upload failed: " + e.getMessage()));
        }
    }

    @GetMapping("/{videoId}")
    public ResponseEntity<Video> getVideoById(@PathVariable String videoId) {
        Optional<Video> optionalVideo = videoRepository.findById(videoId);

        if (optionalVideo.isPresent()) {
            Video video = optionalVideo.get();
            video.setViewsCount(video.getViewsCount() + 1);  // Increment views count
            videoRepository.save(video); // Update in database

            return ResponseEntity.ok(video);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Map<String, String>>> getAllVideos() {
        List<Video> videos = videoRepository.findAll();

        if (videos.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        List<Map<String, String>> videoList = videos.stream().map(video -> {
            Map<String, String> videoData = new HashMap<>();
            videoData.put("id", video.getId()); // ✅ Include the video ID
            videoData.put("title", video.getTitle());
            videoData.put("description", video.getDescription());
            videoData.put("videoUrl", video.getVideoUrl());
            videoData.put("duration", video.getDuration());
            videoData.put("likesCount", String.valueOf(video.getLikesCount()));
            videoData.put("viewsCount", String.valueOf(video.getViewsCount()));
            return videoData;
        }).toList();

        return ResponseEntity.ok(videoList);
    }


    private String getVideoDuration(MultipartFile file) throws IOException, InterruptedException {
        File tempFile = File.createTempFile("uploaded", ".mp4");
        file.transferTo(tempFile);

        ProcessBuilder processBuilder = new ProcessBuilder(
                "ffmpeg", "-i", tempFile.getAbsolutePath()
        );
        processBuilder.redirectErrorStream(true);
        Process process = processBuilder.start();

        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        String line;
        String duration = "Unknown";

        while ((line = reader.readLine()) != null) {
            if (line.contains("Duration:")) {
                String time = line.split("Duration: ")[1].split(",")[0].trim();
                duration = time;
                break;
            }
        }

        process.waitFor();
        tempFile.delete();
        return duration;
    }
}
