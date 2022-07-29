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
@RequiredArgsConstructor
public class NoticeController {



    private final NoticeService noticeService;

    //전체 글조회
    @GetMapping("/board")
    public ResponseEntity<?> getAllNotice() {
        try {
            return new ResponseEntity<List<NoticeBoard>>(noticeService.getAllNotice(), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<String>("잘못된 요청입니다.",HttpStatus.BAD_REQUEST);
        }
    }

    //글번호로 세부조회
    @GetMapping("/board/{noticeSeq}")
    public ResponseEntity<?> getNotice(@PathVariable("noticeSeq") int noticeSeq){
        try {
            NoticeBoard noticeBoard = noticeService.noticeDetail(noticeSeq);

            return new ResponseEntity<NoticeBoard>(noticeBoard ,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<String>("잘못된 요청입니다.",HttpStatus.BAD_REQUEST);
        }
    }

    //글삭제
    @DeleteMapping("admin/board/{noticeSeq}")
    public ResponseEntity<?> deleteNotice(@PathVariable("noticeSeq") int noticeSeq) {
        try {
            noticeService.deleteNotice(noticeSeq);
            return new ResponseEntity<Void>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<String>("잘못된 요청입니다.",HttpStatus.BAD_REQUEST);
        }
    }


    //글 작성
    @PostMapping("/admin/board")
    public ResponseEntity<?> saveNotice(@RequestBody NoticeDto request){
        try {
            NoticeBoard noticeBoard = noticeService.writeNotice(request);
            return new ResponseEntity<NoticeBoard>(noticeBoard, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<String>("잘못된 요청입니다.",HttpStatus.BAD_REQUEST);
        }
    }

    // 글 수정
    @PutMapping("/admin/board/{noticeSeq}")
    public ResponseEntity<?> update(@PathVariable("noticeSeq") int noticeSeq,
                                    @RequestBody NoticeDto request){
        try {
            NoticeBoard noticeBoard = noticeService.updateNotice(noticeSeq, request);
            return new ResponseEntity<NoticeBoard>(noticeBoard, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<String>("잘못된 요청입니다.",HttpStatus.BAD_REQUEST);
        }
    }

    // 글제목으로 검색
    @GetMapping("/board/search/{title}")
    public ResponseEntity<?> getNoticeByTitle(@PathVariable("title") String title) {

        return new ResponseEntity<List<NoticeBoard>>(noticeService.noticeByTitle(title), HttpStatus.OK);

    }


}
