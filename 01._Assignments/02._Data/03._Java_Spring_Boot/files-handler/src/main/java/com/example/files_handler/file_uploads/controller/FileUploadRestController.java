package com.example.files_handler.file_uploads.controller;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.http.codec.multipart.FilePart;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/file-uploads")
public class FileUploadRestController {

    private final Path basePath = Paths.get("./src/main/resources/uploads/");

    @GetMapping
    public Mono<String> get() {
        return Mono.just("Hello worlddd");
    }

    @PostMapping
    public Mono<Void> upload(@RequestPart("files") Mono<FilePart> filePartMono) {
        System.out.println("WE ARE HERE: " + filePartMono);
        return filePartMono
                .doOnNext(fp -> System.out.println("Received File: " + fp.filename()))
                .flatMap(fp -> fp.transferTo(basePath.resolve(fp.filename())))
                .then();
    }
}
