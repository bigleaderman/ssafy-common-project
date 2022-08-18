package com.ssafy.mafia.Game;


import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.ssafy.mafia.Entity.GameInfo;

import com.ssafy.mafia.Entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;


@Data
@Slf4j
@AllArgsConstructor
public class GameManager {

    private int roomSeq;
    private GameInfo gameInfo;
    private Map<Integer, Player> users;
    private Set<Integer> readyQueue;
    private Map<Integer, Integer> vote;
    private String status;
    private int dead;
    private int alive;
    private int mafia;

    public GameManager(){
        this.gameInfo = new GameInfo();
        this.users = Collections.synchronizedMap(new LinkedHashMap<>());
        this.readyQueue = new HashSet<>();
        this.vote = new ConcurrentHashMap<>();
        this.status = "ready";
        this.dead = 0;
        this.alive = 0;
        this.mafia = 0;
    }

    public void clearAll(){
        this.vote.clear();
        this.users.clear();
        this.readyQueue.clear();
        this.status = "ready";
        this.dead = 0;
        this.alive = 0;
        this.mafia = 0;
    }

    public void addUser(User user){
        if(users.get(user.getUserSeq())!=null){
            log.info("[Game] 이미 추가된 유저");
            return;
        }
        Player p = new Player();
        p.setUserSeq(user.getUserSeq());
        p.setDead(false);
        p.setRole("civil");
        p.setNickname(user.getNickname());
        users.put(p.getUserSeq(), p);
    }

    public int ready(String type, User user){
        if(!type.equals(this.status)){
            log.error("[Game] type error");
            return 0;
        }
        if(readyQueue.contains(user.getUserSeq())){
            log.error("[Game] {} Aleady ready", user.getNickname());
            return 0;
        }
        readyQueue.add(user.getUserSeq());
        return this.readyQueue.size();
    }

    public boolean isReady(){
        // ready 한 사람이 전체 인원인가?
        return this.readyQueue.size() == this.users.size();
    }

    public int readyClear(){
        this.readyQueue.clear();
        return readyQueue.size();
    }

    public void initGame(){
        this.mafia = this.gameInfo.getMafiaNum();
        this.alive = this.users.size();
        this.dead = 0;
    }

    public void assignUserRoles(){
        List<String> role = new ArrayList<>();

        int n = this.users.size();
        for(int i = 0; i < n && i < gameInfo.getMafiaNum(); i++, n--)
            role.add("mafia");
        for(int i = 0; i < n && i < gameInfo.getPoliceNum(); i++, n--)
            role.add("police");
        for(int i = 0; i < n && i < gameInfo.getDoctorNum(); i++, n--)
            role.add("doctor");
        for(int i = 0; i < n; i++)
            role.add("civil");

//        Collections.shuffle(role);

        int r = 0;
        for(Integer key : users.keySet())
            users.get(key).setRole(role.get(r++));

        log.info("[Game] User Role 할당 완료");
    }

    public List<String[]> getUserRoles(){
        List<String[]> list = new ArrayList<>();
        for(Integer key : users.keySet())
            list.add(new String[]{users.get(key).getNickname(), users.get(key).getRole()});

        return list;
    }

    public void vote(int userSeq, int targetSeq){
        if(vote.get(userSeq) != null) {
            log.error("[Game] 이미 투표함");
            return;
        }
        if(users.get(userSeq).isDead()){
            log.error("[Game] 죽은사람이 투표함");
            return;
        }
        if(users.get(targetSeq).isDead()){
            log.error("[Game] 죽은자에게 투표함");
            return;
        }
        if(targetSeq == 0){
            log.error("[Game] 기권");
            return;
        }
        users.get(targetSeq).voted();
        vote.put(userSeq, targetSeq);
    }

    public Map<Integer, Integer> getVoteCount(){
        Map<Integer, Integer> map = new HashMap<>();
        for(Integer key : users.keySet())
            map.put(key, users.get(key).getVoteCnt());
        return map;
    }

    public void voteClear(){
        vote.clear();
        users.forEach((Integer k, Player p)->{
            p.setVoteCnt(0);
        });
    }

    public void kill(int userSeq){
        if(users.get(userSeq).isDead()){
            log.info("[Game] 두번 죽임");
            return;
        }
        dead++;
        alive--;
        if(users.get(userSeq).getRole().equals("mafia"))
            mafia--;
        users.get(userSeq).setDead(true);
    }

    public void targetClear(){
        users.forEach((k, v)->{
            v.setTarget(0);
        });
    }

    public boolean isGameOver(){
        return mafia == 0 || mafia >= (alive - mafia);
    }

    public String getWinner(){
        if(!isGameOver()){
            log.info("[Game] 아직 안끝났다.");
            return null;
        }
        if(mafia == 0) return "civil";
        else return "mafia";
    }

}
