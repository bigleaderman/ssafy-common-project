package com.ssafy.mafia.Controller;


import com.ssafy.mafia.Entity.NoticeBoard;
import com.ssafy.mafia.Model.NoticeDto;
import com.ssafy.mafia.Service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class NoticeController {



    private final NoticeService noticeService;

    //전체 글조회
    @GetMapping
    public ResponseEntity<?> getAllNotice() throws Exception {
        return new ResponseEntity<List<NoticeBoard>>(noticeService.getAllNotice(), HttpStatus.OK);
    }

    //글번호로 세부조회
    @GetMapping("/{noticeSeq}")
    public ResponseEntity<?> getNotice(@PathVariable("noticeSeq") int noticeSeq){

        NoticeBoard noticeBoard = noticeService.noticeDetail(noticeSeq);

        return new ResponseEntity<NoticeBoard>(noticeBoard ,HttpStatus.OK);
    }

    //글삭제인데 유저가 admin인지 체크하는 부분 빠짐
    @DeleteMapping("/{noticeSeq}")
    public ResponseEntity<?> deleteNotice(@PathVariable("noticeSeq") int noticeSeq) {
        noticeService.deleteNotice(noticeSeq);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }


    //글 작성인데 유저가 admin인지 체크하는 부분 빠짐
    @PostMapping
    public ResponseEntity<?> saveNotice(@RequestBody NoticeDto request){
        NoticeBoard noticeBoard = noticeService.writeNotice(request);

       return new ResponseEntity<NoticeBoard>(noticeBoard, HttpStatus.OK);
    }

    // 글 수정인데 유저가 admin인지 체크하는 부분 빠짐
    @PutMapping("/{noticeSeq}")
    public ResponseEntity<?> update(@PathVariable("noticeSeq") int noticeSeq,
                                    @RequestBody NoticeDto request){
        NoticeBoard noticeBoard = noticeService.updateNotice(noticeSeq, request);
        return new ResponseEntity<NoticeBoard>(noticeBoard, HttpStatus.OK);
    }

    // 글제목으로 검색
    @GetMapping("/search/{title}")
    public ResponseEntity<?> getNoticeByTitle(@PathVariable("title") String title) {
        return new ResponseEntity<List<NoticeBoard>>(noticeService.noticeByTitle(title), HttpStatus.OK);

    }


}
