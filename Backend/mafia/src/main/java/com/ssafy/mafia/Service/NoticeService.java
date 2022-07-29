package com.ssafy.mafia.Service;

import com.ssafy.mafia.Entity.NoticeBoard;
import com.ssafy.mafia.Model.NoticeDto;
import com.ssafy.mafia.Repository.NoticeBoardRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NoticeService {

    private final NoticeBoardRepo noticeBoardRepo;

    //공지사항 전체 목록 조회
    public List<NoticeBoard> getAllNotice(){
        return noticeBoardRepo.findAll();
    }

    //공지사항 1개 조회
    public NoticeBoard noticeDetail(int noticeSeq) {
        return noticeBoardRepo.findByNo(noticeSeq);
    }

    // 글 작성
    @Transactional
    public NoticeBoard writeNotice(NoticeDto noticeDto) {
        return noticeBoardRepo.createNotice(noticeDto);
    }
    // 글 수정
    @Transactional
    public NoticeBoard updateNotice(int noticeSeq, NoticeDto noticeDto) {
        return noticeBoardRepo.updateNotice(noticeSeq, noticeDto);
    }

    //글 삭제
    @Transactional
    public void deleteNotice(int noticeSeq) {
        noticeBoardRepo.deleteNotice(noticeSeq);
    }

    // 글 제목으로 검색
    public List<NoticeBoard> noticeByTitle(String title) {
        return noticeBoardRepo.findByTitle(title);
    }

}
