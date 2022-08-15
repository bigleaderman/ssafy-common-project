package com.ssafy.mafia.Service;

import com.ssafy.mafia.Model.NoticeListResponseDto;
import com.ssafy.mafia.Model.NoticeResponseDto;
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
    public List<NoticeListResponseDto> getAllNotice() throws Exception{
        return noticeBoardRepo.findAll();
    }

    //공지사항 1개 조회
    public NoticeResponseDto noticeDetail(int noticeSeq) throws Exception {
        return noticeBoardRepo.findByNo(noticeSeq);
    }

    // 글 작성
    @Transactional
    public NoticeResponseDto writeNotice(NoticeDto noticeDto) throws Exception {
        return noticeBoardRepo.createNotice(noticeDto);
    }
    // 글 수정
    @Transactional
    public NoticeResponseDto updateNotice(int noticeSeq, NoticeDto noticeDto) throws Exception {
        return noticeBoardRepo.updateNotice(noticeSeq, noticeDto);
    }

    //글 삭제
    @Transactional
    public void deleteNotice(int noticeSeq) throws Exception {
        noticeBoardRepo.deleteNotice(noticeSeq);
    }

    // 글 제목으로 검색
    public List<NoticeListResponseDto> noticeByTitle(String title)throws Exception {
        return noticeBoardRepo.findByTitle(title);
    }

}
