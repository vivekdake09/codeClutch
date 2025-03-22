package com.cloud.play.app.controller;

import com.cloud.play.app.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/videos")
public class VideoController {

    @Autowired
    private VideoService videoService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadVideo(@RequestParam("File") MultipartFile file) {
        try {
            String videoUrl = videoService.uploadVideo(file);
            return ResponseEntity.ok(videoUrl);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Video upload failed: " + e.getMessage());
        }
    }
}
