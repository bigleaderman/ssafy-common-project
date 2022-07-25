package com.ssafy.mafia.Repository;

import com.ssafy.mafia.Entity.NoticeBoard;
import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.NoticeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class NoticeBoardRepo {

    private final EntityManager em;

    //전체 글 목록 반환
    public List<NoticeBoard> findAll() {
        return em.createQuery("select N from NoticeBoard N", NoticeBoard.class).getResultList();
    }
    // 선택 글 정보 반환
    public NoticeBoard findByNo(int noticeSeq) {
        return em.find(NoticeBoard.class, noticeSeq);
    }

    // 글 작성
    public NoticeBoard createNotice(NoticeDto noticeDto){
        NoticeBoard noticeBoard = new NoticeBoard();
        noticeBoard.setTitle(noticeDto.getTitle());
        noticeBoard.setContent(noticeDto.getContent());
        noticeBoard.setCreatedAt(Timestamp.from(Instant.now()));
        int userSeq = noticeDto.getUserSeq();
        User writer = em.find(User.class,userSeq);
        noticeBoard.setUserSeq(writer);
        em.persist(noticeBoard);
        return noticeBoard;
    }
    //글 수정
    public NoticeBoard updateNotice(int noticeSeq, NoticeDto noticeDto) {
        NoticeBoard noticeBoard = em.find(NoticeBoard.class,noticeSeq);
        noticeBoard.setTitle(noticeDto.getTitle());
        noticeBoard.setContent(noticeDto.getContent());
        em.merge(noticeBoard);
        return noticeBoard;
    }

    //글 삭제
    public void deleteNotice(int noticeSeq) {
        NoticeBoard noticeBoard = findByNo(noticeSeq);
        em.remove(noticeBoard);
    }

    //글 제목으로 검색
    public List<NoticeBoard> findByTitle(String title) {
        return em.createQuery("select N from NoticeBoard N where N.title like :title ", NoticeBoard.class)
                .setParameter("title", "%" + title +"%")
                .getResultList();
    }




}
