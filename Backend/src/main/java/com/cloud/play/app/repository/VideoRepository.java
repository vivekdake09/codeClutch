package com.cloud.play.app.repository;

import com.cloud.play.app.model.Video;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VideoRepository extends MongoRepository<Video, String> {
}
