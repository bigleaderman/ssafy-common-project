package com.ssafy.mafia.Repository;

import com.ssafy.mafia.Entity.NoticeBoard;
import com.ssafy.mafia.Model.NoticeListResponseDto;
import com.ssafy.mafia.Model.NoticeResponseDto;
import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.NoticeDto;
import com.ssafy.mafia.Service.SessionService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class NoticeBoardRepo {

    private final EntityManager em;
    private static final Logger log = LoggerFactory.getLogger(NoticeBoardRepo.class);

    //전체 글 목록 반환
    public List<NoticeListResponseDto> findAll() throws Exception{

        List<NoticeBoard> noticeBoardList = em.createQuery("select N from NoticeBoard N", NoticeBoard.class).getResultList();
        log.info("전체 글 목록을 찾았습니다.");
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
        Collections.reverse(result);
        log.info("전체 글 목록을 반환합니다.");
        return result;
    }
    // 선택 글 정보 반환
    public NoticeResponseDto findByNo(int noticeSeq) throws Exception{
        NoticeBoard noticeBoard = em.find(NoticeBoard.class, noticeSeq);
        log.info("대상 글을 찾았습니다.");
        User writer = em.find(User.class,noticeBoard.getWriter());
        NoticeResponseDto noticeResponseDto = new NoticeResponseDto();
        noticeResponseDto.setNoticeSeq(noticeSeq);
        noticeResponseDto.setTitle(noticeBoard.getTitle());
        noticeResponseDto.setContent(noticeBoard.getContent());
        noticeResponseDto.setWriter(writer.getNickname());
        noticeResponseDto.setCreateAt(noticeBoard.getCreatedAt());
        log.info("대상 글을 반환합니다.");
        return noticeResponseDto;
    }

    // 글 작성
    public NoticeResponseDto createNotice(NoticeDto noticeDto) throws Exception{
        NoticeBoard noticeBoard = new NoticeBoard();
        noticeBoard.setTitle(noticeDto.getTitle());
        noticeBoard.setContent(noticeDto.getContent());
        noticeBoard.setCreatedAt(Timestamp.from(Instant.now()));
        int userSeq = noticeDto.getUserSeq();
        User writer = em.find(User.class,userSeq);
        noticeBoard.setWriter(writer.getUserSeq());
        em.persist(noticeBoard);
        log.info("글을 저장하였습니다.");

        NoticeResponseDto noticeResponseDto = new NoticeResponseDto();
        noticeResponseDto.setTitle(noticeBoard.getTitle());
        noticeResponseDto.setContent(noticeBoard.getContent());
        noticeResponseDto.setWriter(writer.getNickname());
        noticeResponseDto.setCreateAt(noticeBoard.getCreatedAt());
        noticeResponseDto.setNoticeSeq(noticeBoard.getNoticeSeq());
        log.info("글을 반환합니다.");
        return noticeResponseDto;

    }
    //글 수정
    public NoticeResponseDto updateNotice(int noticeSeq, NoticeDto noticeDto) throws Exception {
        NoticeBoard noticeBoard = em.find(NoticeBoard.class,noticeSeq);
        noticeBoard.setTitle(noticeDto.getTitle());
        noticeBoard.setContent(noticeDto.getContent());
        em.merge(noticeBoard);
        log.info("글을 수정하여 저장하였습니다.");

        int userSeq = noticeDto.getUserSeq();
        User writer = em.find(User.class,userSeq);

        NoticeResponseDto noticeResponseDto = new NoticeResponseDto();
        noticeResponseDto.setTitle(noticeBoard.getTitle());
        noticeResponseDto.setContent(noticeBoard.getContent());
        noticeResponseDto.setCreateAt(noticeBoard.getCreatedAt());
        noticeResponseDto.setWriter(writer.getNickname());
        noticeResponseDto.setNoticeSeq(noticeBoard.getNoticeSeq());
        log.info("글을 반환합니다.");

        return noticeResponseDto;

    }

    //글 삭제
    public void deleteNotice(int noticeSeq) throws Exception{
        NoticeBoard noticeBoard = em.find(NoticeBoard.class, noticeSeq);
        log.info("글을 찾았습니다.");
        em.remove(noticeBoard);
        log.info("글을 삭제하였습니다.");
    }

    //글 제목으로 검색
    public List<NoticeListResponseDto> findByTitle(String title) throws Exception{

        List<NoticeBoard> noticeBoardList = em.createQuery("select N from NoticeBoard N where N.title like :title", NoticeBoard.class)
                .setParameter("title", "%" + title + "%")
                .getResultList();
        log.info("해당 키워드로 글목록을 찾았습니다.");
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
        Collections.reverse(result);
        log.info("글목록을 반환합니다.");
        return result;
    }




}
