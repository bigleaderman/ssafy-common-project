package com.ssafy.mafia.Controller;


import com.ssafy.mafia.Entity.NoticeBoard;
import com.ssafy.mafia.Model.NoticeListResponseDto;
import com.ssafy.mafia.Model.NoticeResponseDto;
import com.ssafy.mafia.Model.NoticeDto;
import com.ssafy.mafia.Service.NoticeService;
import com.ssafy.mafia.auth.util.SecurityUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;


@Api("NoticeController V1")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class NoticeController {



    private final NoticeService noticeService;

    //전체 글조회
    @ApiOperation(value = "전체 글조회",notes = "모든 공지사항 목록을 반환한다", response = Map.class)
    @GetMapping("/board")
    public ResponseEntity<List<NoticeListResponseDto>> getAllNotice() {
        try {
            return new ResponseEntity<List<NoticeListResponseDto>>(noticeService.getAllNotice(), HttpStatus.OK);
        }catch (Exception e){
//            return new ResponseEntity<String>("잘못된 요청입니다.",HttpStatus.BAD_REQUEST);
            return null;
        }

    }

    //글번호로 세부조회
    @ApiOperation(value = "세부 글 조회",notes = "해당 공지사항의 모든 데이터를 반환한다.", response = NoticeBoard.class)
    @GetMapping("/board/{noticeSeq}")
    public ResponseEntity<NoticeResponseDto> getNotice(@PathVariable("noticeSeq")@ApiParam(value = "해당 공지사항의 pk", required = true) int noticeSeq){
        try {
            NoticeResponseDto noticeBoard = noticeService.noticeDetail(noticeSeq);

            return new ResponseEntity<NoticeResponseDto>(noticeBoard ,HttpStatus.OK);
        }catch (Exception e){
//            return new ResponseEntity<String>("잘못된 요청입니다.",HttpStatus.BAD_REQUEST);
            return null;
        }
    }

    //글삭제
    @ApiOperation(value = "글삭제",notes = "해당 공지사항을 Notice 테이블에서 삭제한다.", response = Map.class)
    @DeleteMapping("admin/board/{noticeSeq}")
    public ResponseEntity<?> deleteNotice(@PathVariable("noticeSeq")@ApiParam(value = "해당 공지사항의 pk", required = true) int noticeSeq) {
        try {
            noticeService.deleteNotice(noticeSeq);
            return new ResponseEntity<Void>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<String>("잘못된 요청입니다.",HttpStatus.BAD_REQUEST);
        }
    }


    //글 작성
    @ApiResponse(code = 200, message = "성공", response = NoticeDto.class)
    @ApiOperation(value = "글작성",notes = "Notice 테이블에 새로운 공지사항 데이터를 생성하고 반환한다.", response = NoticeDto.class)
    @PostMapping("/admin/board")
    public ResponseEntity<NoticeResponseDto> saveNotice(@RequestBody NoticeDto request){
        int userSeq = SecurityUtil.getCurrentUserId();
        request.setUserSeq(userSeq);
        try {
            NoticeResponseDto noticeResponseDto = noticeService.writeNotice(request);
            return new ResponseEntity<NoticeResponseDto>(noticeResponseDto, HttpStatus.OK);
        }catch (Exception e){
            return null;
        }
    }

    // 글 수정
    @ApiOperation(value = "글 수정",notes = "Notice 테이블의 해당 공지사항 데이터를 수정하고 반환한다", response = Map.class)
    @PutMapping("/admin/board/{noticeSeq}")
    public ResponseEntity<NoticeResponseDto> update(@PathVariable("noticeSeq")@ApiParam(value = "해당 공지사항의 pk", required = true) int noticeSeq,
                                    @RequestBody NoticeDto request){
        int userSeq = SecurityUtil.getCurrentUserId();
        request.setUserSeq(userSeq);
        try {
            NoticeResponseDto noticeResponseDto = noticeService.updateNotice(noticeSeq, request);
            return new ResponseEntity<NoticeResponseDto>(noticeResponseDto, HttpStatus.OK);
        }catch (Exception e){
//            return new ResponseEntity<String>("잘못된 요청입니다.",HttpStatus.BAD_REQUEST);
            return null;
        }
    }

    // 글제목으로 검색
    @ApiOperation(value = "글 제목으로 검색",notes = "요청 검색어가 포함된 모든 공지사항 데이터 목록을 반환한다", response = Map.class)
    @GetMapping("/board/search/{title}")
    public ResponseEntity<List<NoticeListResponseDto>> getNoticeByTitle(@PathVariable("title")@ApiParam(value = "검색어", required = true) String title) {

        return new ResponseEntity<List<NoticeListResponseDto>>(noticeService.noticeByTitle(title), HttpStatus.OK);

    }


}
