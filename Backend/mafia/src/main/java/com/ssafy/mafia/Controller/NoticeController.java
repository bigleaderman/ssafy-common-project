package com.ssafy.mafia.Controller;


import com.ssafy.mafia.Entity.NoticeBoard;
import com.ssafy.mafia.Model.NoticeDto;
import com.ssafy.mafia.Service.NoticeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;


@Api("NoticeController V1")
@RestController
@RequiredArgsConstructor
public class NoticeController {



    private final NoticeService noticeService;

    //전체 글조회
    @ApiOperation(value = "전체 글조회",notes = "모든 공지사항 목록을 반환한다", response = Map.class)
    @GetMapping("/board")
    public ResponseEntity<?> getAllNotice() {
        try {
            return new ResponseEntity<List<NoticeBoard>>(noticeService.getAllNotice(), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<String>("잘못된 요청입니다.",HttpStatus.BAD_REQUEST);
        }
    }

    //글번호로 세부조회
    @ApiOperation(value = "세부 글 조회",notes = "해당 공지사항의 모든 데이터를 반환한다.", response = Map.class)
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
    @ApiOperation(value = "글삭제",notes = "해당 공지사항을 Notice 테이블에서 삭제한다.", response = Map.class)
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
    @ApiOperation(value = "글작성",notes = "Notice 테이블에 새로운 공지사항 데이터를 생성하고 반환한다.", response = Map.class)
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
    @ApiOperation(value = "글 수정",notes = "Notice 테이블의 해당 공지사항 데이터를 수정하고 반환한다", response = Map.class)
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
    @ApiOperation(value = "글 제목으로 검색",notes = "요청 검색어가 포함된 모든 공지사항 데이터 목록을 반환한다", response = Map.class)
    @GetMapping("/board/search/{title}")
    public ResponseEntity<?> getNoticeByTitle(@PathVariable("title") String title) {

        return new ResponseEntity<List<NoticeBoard>>(noticeService.noticeByTitle(title), HttpStatus.OK);

    }


}
