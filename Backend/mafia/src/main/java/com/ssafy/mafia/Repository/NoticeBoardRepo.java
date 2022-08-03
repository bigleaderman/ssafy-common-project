package com.ssafy.mafia.Repository;

import com.ssafy.mafia.Repository.Entity.NoticeBoard;
import com.ssafy.mafia.Model.NoticeListResponseDto;
import com.ssafy.mafia.Model.NoticeResponseDto;
import com.ssafy.mafia.Repository.Entity.User;
import com.ssafy.mafia.Model.NoticeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class NoticeBoardRepo {

    private final EntityManager em;

    //전체 글 목록 반환
    public List<NoticeListResponseDto> findAll() {

        List<NoticeBoard> noticeBoardList = em.createQuery("select N from NoticeBoard N", NoticeBoard.class).getResultList();
        System.out.println(noticeBoardList);
        List<NoticeListResponseDto> result = new ArrayList<>();
        for (NoticeBoard noticeBoard : noticeBoardList) {
            NoticeListResponseDto noticeListResponseDto = new NoticeListResponseDto();
            User writer = em.find(User.class,noticeBoard.getWriter());
            noticeListResponseDto.setNoticeSeq(noticeBoard.getNoticeSeq());
            noticeListResponseDto.setTitle(noticeBoard.getTitle());
            noticeListResponseDto.setCreateAt(noticeBoard.getCreatedAt());
            noticeListResponseDto.setWriter(writer.getNickname());
            result.add(noticeListResponseDto);
        }


        return result;
    }
    // 선택 글 정보 반환
    public NoticeResponseDto findByNo(int noticeSeq) {
        NoticeBoard noticeBoard = em.find(NoticeBoard.class, noticeSeq);
        System.out.println(noticeBoard);
        User writer = em.find(User.class,noticeBoard.getWriter());
        NoticeResponseDto noticeResponseDto = new NoticeResponseDto();
        noticeResponseDto.setNoticeSeq(noticeSeq);
        noticeResponseDto.setTitle(noticeBoard.getTitle());
        noticeResponseDto.setContent(noticeBoard.getContent());
        noticeResponseDto.setWriter(writer.getNickname());
        noticeResponseDto.setCreateAt(noticeBoard.getCreatedAt());
        return noticeResponseDto;
    }

    // 글 작성
    public NoticeResponseDto createNotice(NoticeDto noticeDto){
        NoticeBoard noticeBoard = new NoticeBoard();
        noticeBoard.setTitle(noticeDto.getTitle());
        noticeBoard.setContent(noticeDto.getContent());
        noticeBoard.setCreatedAt(Timestamp.from(Instant.now()));
        int userSeq = noticeDto.getUserSeq();
        User writer = em.find(User.class,userSeq);
        noticeBoard.setWriter(writer.getUserSeq());
        em.persist(noticeBoard);

        NoticeResponseDto noticeResponseDto = new NoticeResponseDto();
        noticeResponseDto.setTitle(noticeBoard.getTitle());
        noticeResponseDto.setContent(noticeBoard.getContent());
        noticeResponseDto.setWriter(writer.getNickname());
        noticeResponseDto.setCreateAt(noticeBoard.getCreatedAt());
        noticeResponseDto.setNoticeSeq(noticeBoard.getNoticeSeq());
        return noticeResponseDto;

    }
    //글 수정
    public NoticeResponseDto updateNotice(int noticeSeq, NoticeDto noticeDto) {
        NoticeBoard noticeBoard = em.find(NoticeBoard.class,noticeSeq);
        noticeBoard.setTitle(noticeDto.getTitle());
        noticeBoard.setContent(noticeDto.getContent());
        em.merge(noticeBoard);

        int userSeq = noticeDto.getUserSeq();
        User writer = em.find(User.class,userSeq);

        NoticeResponseDto noticeResponseDto = new NoticeResponseDto();
        noticeResponseDto.setTitle(noticeBoard.getTitle());
        noticeResponseDto.setContent(noticeBoard.getContent());
        noticeResponseDto.setCreateAt(noticeBoard.getCreatedAt());
        noticeResponseDto.setWriter(writer.getNickname());
        noticeResponseDto.setNoticeSeq(noticeBoard.getNoticeSeq());

        return noticeResponseDto;

    }

    //글 삭제
    public void deleteNotice(int noticeSeq) {
        NoticeBoard noticeBoard = em.find(NoticeBoard.class, noticeSeq);
        em.remove(noticeBoard);
    }

    //글 제목으로 검색
    public List<NoticeListResponseDto> findByTitle(String title) {

        List<NoticeBoard> noticeBoardList = em.createQuery("select N from NoticeBoard N where N.title like :title", NoticeBoard.class)
                .setParameter("title", "%" + title + "%")
                .getResultList();
        List<NoticeListResponseDto> result = new ArrayList<>();
        for (NoticeBoard noticeBoard : noticeBoardList) {
            NoticeListResponseDto noticeListResponseDto = new NoticeListResponseDto();
            User writer = em.find(User.class,noticeBoard.getWriter());
            noticeListResponseDto.setNoticeSeq(noticeBoard.getNoticeSeq());
            noticeListResponseDto.setTitle(noticeBoard.getTitle());
            noticeListResponseDto.setCreateAt(noticeBoard.getCreatedAt());
            noticeListResponseDto.setWriter(writer.getNickname());
            result.add(noticeListResponseDto);
        }


        return result;
    }




}
