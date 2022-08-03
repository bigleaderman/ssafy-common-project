import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

export function Helper() {
    const [Rules, setRules] = useState(0);
    const [Acts, setActs] = useState(0);
    const helpContext = [
        [
            "시민",
            //역할
            "시민 편입니다. 마피아를 찾아내 처형해야 합니다.",
            //게임 규칙
            "낮에 투표권을 하나 받습니다. 투표 시간 때 다른 참여자에게 투표할 수 있습니다. 최다 투표자는 처형당합니다.",
            //게임 방법
            "자신이 시민임을 증명하고 마피",
        ],
        [
            "의사",
            "시민 편입니다. 밤에 마피아로부터 시민을 지켜야 합니다.",
            "doc etc1",
            "doc etc2",
        ],

        [
            "경찰",
            "시민 편입니다. 밤에 마피아를 조사하고 대중에게 공개해야 합니다.",
            "cop etc1",
            "cop etc2",
        ],

        ["마피아", "7", "8", "9"],
    ];
    // function SwitchRules(value) {
    //     console.log(value);
    // }

    // function SwitchActs(value) {
    //     console.log(value);
    // }

    const SwitchRules = (value) => setRules(value);
    const SwitchActs = (value) => setActs(value);

    return (
        <div>
            <div
                style={{
                    backgroundColor: "black",
                    color: "white",
                    position: "relative",
                    left: -50,
                }}
            >
                도움말
            </div>
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={3} style={{ height: 200 }}>
                        <br />
                        <Button
                            style={{ width: 100 }}
                            onClick={() => {
                                SwitchRules(0);
                            }}
                        >
                            역할
                        </Button>
                        <Button
                            style={{ width: 100 }}
                            onClick={() => {
                                SwitchRules(1);
                            }}
                        >
                            게임 규칙
                        </Button>
                        <Button
                            style={{ width: 100 }}
                            onClick={() => {
                                SwitchRules(2);
                            }}
                        >
                            게임 방법
                        </Button>
                    </Grid>
                    <Grid item xs={9}>
                        <Grid>
                            {helpContext.map((data, idx) => {
                                return (
                                    <Button
                                        key={idx}
                                        style={{ width: 70 }}
                                        onClick={() => {
                                            SwitchActs(idx);
                                        }}
                                    >
                                        {data[0]}
                                    </Button>
                                );
                            })}
                        </Grid>
                        {/* 데이터 출력 장소 */}
                        <Grid>{helpContext[Acts][Rules + 1]}</Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
