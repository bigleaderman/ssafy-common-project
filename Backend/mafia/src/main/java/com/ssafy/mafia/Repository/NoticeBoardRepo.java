package com.ssafy.mafia.Repository;

import com.ssafy.mafia.Entity.NoticeBoard;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
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
    public NoticeBoard createNotice(NoticeBoard noticeBoard){
        em.persist(noticeBoard);
        return noticeBoard;
    }

    //글 삭제
    public void updateNotice(int noticeSeq) {
        NoticeBoard noticeBoard = findByNo(noticeSeq);

    }




}
