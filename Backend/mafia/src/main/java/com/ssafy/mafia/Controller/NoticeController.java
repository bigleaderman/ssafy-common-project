package com.ssafy.mafia.Controller;


import com.ssafy.mafia.Entity.NoticeBoard;
import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Service.NoticeService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    @GetMapping
    public ResponseEntity<List<NoticeBoard>> getAllNotice() throws Exception {
        return new ResponseEntity<List<NoticeBoard>>(noticeService.getAllNotice(), HttpStatus.OK);
    }

    @GetMapping("/{noticeSeq}")
    public ResponseEntity<NoticeBoard> getNotice(@PathVariable("noticeSeq") int noticeSeq){

        NoticeBoard noticeBoard = noticeService.noticeDetail(noticeSeq);

        return new ResponseEntity<NoticeBoard>(noticeBoard ,HttpStatus.OK);
    }


    // 글작성인데 지금 유저조회하는 기능이 없어서 못만들고 있음
//    @PostMapping
//    public ResponseEntity<NoticeBoard> saveNotice(@RequestBody SaveNoticeRequest request){
//        NoticeBoard noticeBoard = new NoticeBoard();
//        noticeBoard.setContent(request.getContent());
//        noticeBoard.setTitle(request.getTitle());
//        noticeBoard.setCreatedAt(Timestamp.from(Instant.now()));
//        return new ResponseEntity<NoticeBoard>(noticeService.writeNotice(noticeBoard), HttpStatus.OK);
//    }
//
//    @Data
//    static class SaveNoticeRequest{
//        private String content;
//        private String title;
//        private int userSeq;
//    }
}
