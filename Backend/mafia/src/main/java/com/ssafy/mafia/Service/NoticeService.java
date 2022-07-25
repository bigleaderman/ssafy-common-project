package com.ssafy.mafia.Service;

import com.ssafy.mafia.Entity.NoticeBoard;
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
    public NoticeBoard writeNotice(NoticeBoard noticeBoard) {
        return noticeBoardRepo.createNotice(noticeBoard);
    }
}
