import { Player, ScorecardPlayer } from "../model/game.model";

export class PlayerConstant {
    allPlayers(): Array<ScorecardPlayer> {
        // For future reference:
        // The data below is constructed from an Excel formula out of a cleansed data set.
        // Multiple filters were applied to cleanse the data from its original format.
        return [
            new ScorecardPlayer(253802,"Virat Kohli","India",31,"Right-hand bat","Right-arm medium",10843,6.22,true,false),
            new ScorecardPlayer(28081,"MS Dhoni","India",38,"Right-hand bat","Right-arm medium",10500,5.16,true,false),
            new ScorecardPlayer(36084,"Yuvraj Singh","India",38,"Left-hand bat","Slow left-arm orthodox",8701,5.1,true,false),
            new ScorecardPlayer(38699,"Ross Taylor","New Zealand",35,"Right-hand bat","Right-arm offbreak",8026,5,true,false),
            new ScorecardPlayer(4578,"Michael Clarke","Australia",38,"Right-hand bat","Slow left-arm orthodox",7981,4.98,true,false),
            new ScorecardPlayer(8180,"Shane Watson","Australia",38,"Right-hand bat","Right-arm fast-medium",5757,4.95,false,false),
            new ScorecardPlayer(9062,"Ian Bell","England",37,"Right-hand bat","Right-arm medium",5416,6,false,false),
            new ScorecardPlayer(49764,"Angelo Mathews","Sri Lanka",32,"Right-hand bat","Right-arm medium",5380,4.61,false,false),
            new ScorecardPlayer(28763,"Gautam Gambhir","India",38,"Left-hand bat","Legbreak",5238,13,false,false),
            new ScorecardPlayer(19296,"Kevin Pietersen","England",39,"Right-hand bat","Right-arm offbreak",4440,5.55,false,false),
            new ScorecardPlayer(54565,"Suzie Bates","New Zealand",32,"Right-hand bat","Right-arm medium",4392,4.93,false,false),
            new ScorecardPlayer(219889,"David Warner","Australia",33,"Left-hand bat","Legbreak",4343,8,false,false),
            new ScorecardPlayer(5334,"Aaron Finch","Australia",33,"Right-hand bat","Slow left-arm orthodox",3717,5.42,false,false),
            new ScorecardPlayer(267192,"Steven Smith","Australia",30,"Right-hand bat","Legbreak googly",3431,5.34,false,false),
            new ScorecardPlayer(329336,"Meg Lanning","Australia",27,"Right-hand bat","Right-arm medium",3273,5.18,false,false),
            new ScorecardPlayer(275487,"Ellyse Perry","Australia",29,"Right-hand bat","Right-arm fast-medium",2748,4.37,false,true),
            new ScorecardPlayer(10582,"Ravi Bopara","England",34,"Right-hand bat","Right-arm medium",2695,4.91,false,false),
            new ScorecardPlayer(325026,"Glenn Maxwell","Australia",31,"Right-hand bat","Right-arm offbreak",2442,5.62,false,false),
            new ScorecardPlayer(311158,"Ben Stokes","England",28,"Left-hand bat","Right-arm fast-medium",2088,6.13,false,false),
            new ScorecardPlayer(8291,"Cameron White","Australia",36,"Right-hand bat","Legbreak googly",2072,6.36,false,false),
            new ScorecardPlayer(8917,"Moeen Ali","England",32,"Left-hand bat","Right-arm offbreak",1645,5.22,false,false),
            new ScorecardPlayer(53800,"Jenny Gunn","England",33,"Right-hand bat","Right-arm medium-fast",1629,3.87,false,true),
            new ScorecardPlayer(32685,"Irfan Pathan","India",35,"Left-hand bat","Left-arm medium-fast",1544,5.26,false,false),
            new ScorecardPlayer(38373,"Jesse Ryder","New Zealand",35,"Left-hand bat","Right-arm medium",1362,6.07,false,false),
            new ScorecardPlayer(268887,"Jess Cameron","Australia",30,"Right-hand bat","Legbreak googly",1265,5.33,false,false),
            new ScorecardPlayer(53932,"Jhulan Goswami","India",37,"Right-hand bat","Right-arm medium",1061,3.25,false,true),
            new ScorecardPlayer(247235,"Chris Woakes","England",30,"Right-hand bat","Right-arm fast-medium",1039,5.61,false,false),
            new ScorecardPlayer(6033,"Mitchell Johnson","Australia",38,"Left-hand bat","Left-arm fast",951,4.83,false,false),
            new ScorecardPlayer(9310,"Tim Bresnan","England",34,"Right-hand bat","Right-arm medium-fast",871,5.42,false,false),
            new ScorecardPlayer(53906,"Katherine Brunt","England",34,"Right-hand bat","Right-arm medium-fast",771,3.48,false,true),
            new ScorecardPlayer(23460,"Luke Wright","England",34,"Right-hand bat","Right-arm medium-fast",707,5.1,false,false),
            new ScorecardPlayer(49633,"Jehan Mubarak","Sri Lanka",38,"Left-hand bat","Right-arm offbreak",704,4.41,false,true),
            new ScorecardPlayer(232364,"Tim Southee","New Zealand",31,"Right-hand bat","Right-arm medium-fast",669,5.42,false,false),
            new ScorecardPlayer(244497,"Adil Rashid","England",31,"Right-hand bat","Legbreak",529,5.58,false,false),
            new ScorecardPlayer(10617,"Stuart Broad","England",33,"Left-hand bat","Right-arm fast-medium",529,5.26,false,false),
            new ScorecardPlayer(326016,"Bhuvneshwar Kumar","India",29,"Right-hand bat","Right-arm medium",523,5.01,false,false),
            new ScorecardPlayer(18632,"Samit Patel","England",35,"Right-hand bat","Slow left-arm orthodox",482,5.51,false,false),
            new ScorecardPlayer(5593,"Nathan Hauritz","Australia",38,"Right-hand bat","Right-arm offbreak",336,4.74,false,false),
            new ScorecardPlayer(50438,"Suraj Randiv","Sri Lanka",34,"Right-hand bat","Right-arm offbreak",280,5.06,false,false),
            new ScorecardPlayer(8608,"James Anderson","England",37,"Left-hand bat","Right-arm fast-medium",273,4.92,false,false),
            new ScorecardPlayer(228622,"John Hastings","Australia",34,"Right-hand bat","Right-arm fast-medium",271,5.07,false,false)
        ];
    }
}