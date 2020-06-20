function init() {

    var ModelControl = ModelController();
    var UIControl = UIController();
    var Control = Controller(ModelController,UIController);

    var noOfDaysInTheMonth = ModelControl.setMonth(ModelControl.date.getMonth() + 2);

    ModelControl.resetRoster();
    ModelControl.allocateArray();
    ModelControl.rosters = ModelControl.initRosters();
    UIControl.setTeams(ModelControl.teams);
    UIControl.updateTable(ModelControl.teams, ModelControl.rosters, noOfDaysInTheMonth);
    UIControl.renderRoster(ModelControl.teams, ModelControl.rosters, ModelControl.noOfDaysInTheMonth);

}

function ModelController() {

    var date = new Date();

    var allDates = "";
    var allDays = "";
    var weekends = 0;

    var shifts = ["PL", "WE", "NS", "FS", "GS", "SS"];

    var teams = {
        APAC: ["Sabareesh", "Boopal", "Deepan", "Gourab", "Ishan", "Trisha"],
        EMEA: ["Moomin", "Rama", "Saishushma"],
        NAP: ["Arfin", "Prashant"]
    };

    var rosters = {
        APAC: [],
        EMEA: [],
        NAP: []
    }

    var noOfDaysInTheMonth = (daysInMonth(new Date().getMonth() + 2, date.getFullYear()));;
    var UIControl = UIController();

    function daysInMonth (month, year) { 
        return new Date(year, month, 0).getDate(); 
    } 

    var setMonth = function(month) {
        allDates = "";
        allDays = "";
        noOfDaysInTheMonth = (daysInMonth(month, date.getFullYear()));
        // console.log(noOfDaysInTheMonth)
        for(var i = 1; i <= noOfDaysInTheMonth; i++) {
            allDates += "<th>"+ i +"</th>";
            allDays += "<th>" + new Date(date.getFullYear(), month - 1, i).toDateString().substring(0,3) + "</th>";
        }
    
        var temp = new Date(date.getFullYear(), month - 1).toDateString();
        document.querySelector(UIControl.DOMStrings.monthAndYear).setAttribute("colspan", noOfDaysInTheMonth);
        document.querySelector(UIControl.DOMStrings.monthAndYear).innerHTML = temp.substring(4,7) + " " + temp.substring(11,15);
        document.querySelector(UIControl.DOMStrings.allDates).innerHTML = allDates;
        document.querySelector(UIControl.DOMStrings.allDays).innerHTML = allDays;
        UIControl.updateTable(teams, rosters, noOfDaysInTheMonth);
        
        return noOfDaysInTheMonth;
    }

    var resetRoster = function() {
        rosters = {};
        for(var team in teams) {
            rosters[team] = [];
        }
    }

    var setRosters = function(rosts) {
        rosters = rosts;
    }

    var allocateArray = function() {
        for(var team in rosters) {
            for(var i = 0; i < teams[team].length; i++){
                rosters[team].push([]);
            }
            // console.log(rosters[team])
        }
        
        return rosters;
    }

    var setWeekends = function(weekends) {
        weekends = weekends;
    }

    var initRosters = function() {
        for(var roster in rosters) {
            for(var i in rosters[roster]) {
                for(var j = 0; j < noOfDaysInTheMonth; j++) {
                    rosters[roster][i][j] = "";
                }
            }
        }
        return rosters;
    }

    return {
        date: date,
        allDates: allDates,
        allDays: allDays,
        shifts: shifts,
        teams: teams,
        rosters: rosters,
        noOfDaysInTheMonth: noOfDaysInTheMonth,
        weekends: weekends,
        setMonth: setMonth,
        allocateArray: allocateArray,
        resetRoster: resetRoster,
        setWeekends: setWeekends,
        setRosters: setRosters,
        initRosters: initRosters
    }

}

function UIController() {

    var DOMStrings = {
        team:"#team",
        member: "#member",
        month: "#month",
        chooseTeam: "#choose-team",
        chooseMonth: ".choose-month",
        tableContent:".table-content",
        currentDate: ".cur-date",
        monthAndYear: ".month-and-year",
        allDates: ".all-dates",
        allDays: ".all-days"
    }

    document.querySelector(DOMStrings.currentDate).innerHTML = new Date().toString().substring(0,24);

    setInterval(function() {
        document.querySelector(DOMStrings.currentDate).innerHTML = new Date().toString().substring(0,24);
    },1000);

    var printErr = function(element, errMsg) {
        element.innerHTML = errMsg;
    }

    var clearErr = function(element) {
        element.innerHTML = ""
    }

    var clearFields = function() {
        // Clear All Fields.
        document.querySelector(DOMStrings.team).value = "";
        document.querySelector(DOMStrings.member).value = "";
        document.querySelector(DOMStrings.month).value = "";
        document.querySelector(DOMStrings.chooseTeam).value = "---";

    }

    var setTeams = function(teams) {

        document.querySelector(DOMStrings.chooseTeam).innerHTML = "<option value=" + "---" + " disabled selected>Choose Team</option>";
        for(var team in teams) {
            document.querySelector(DOMStrings.chooseTeam).insertAdjacentHTML("beforeend","<option value="+ team +">" + team + "</option>");
        }

    }

    var renderRoster = function(teams, rosters, noOfDaysInTheMonth) {

        for(var team in teams) {
            for(var i = 0; i < noOfDaysInTheMonth; i++) {
                for(var j = 0; j < teams[team].length; j++) {
                    // rosters[team][j].push("")
                    // console.log(rosters);
                    document.querySelector("." + team + "-row-" + j).insertAdjacentHTML("beforeend", "<td class=" + rosters[team][j][i] + ">" + rosters[team][j][i] + "</td>");
                }
            }
        }
        
    }

    var updateTable = function(teams, rosters, noOfDaysInTheMonth) {
        // Clearing Table Contents
        document.querySelector(DOMStrings.tableContent).innerHTML = "";

        // Setting teams and members
        for(var team in teams) {
            var temp = teams[team];
            if(temp.length > 0) {
                document.querySelector(DOMStrings.tableContent).insertAdjacentHTML("beforeend","<tr class=" + team + "><td rowspan=" + (teams[team].length + 1) + "> " + team + " </td></tr>");
                for(var i = 0; i < teams[team].length; i++) {
                    document.querySelector("." + team).insertAdjacentHTML("afterend","<tr class="+ team + "-row-" + i + "><td>" + teams[team][i] + "</td></tr>");
                }
            }
        }
        
    }

    return {
        printErr: printErr,
        clearErr: clearErr,
        updateTable: updateTable,
        clearFields: clearFields,
        setTeams: setTeams,
        renderRoster: renderRoster,
        DOMStrings: DOMStrings
    };
}

function Controller(ModelController, UIController) {

    var UIControl = UIController();
    var ModelControl = ModelController();

    var addTeam = function() {
        // Add Team
        var team = document.querySelector(UIControl.DOMStrings.team).value;
        var err = document.querySelector(".team-error");
        if(team === null || team === "") {
            UIControl.printErr(err,"**Please Enter a Proper Team Name!");
        }
        else {
            UIControl.clearErr(err);
            UIControl.clearFields();
            ModelControl.teams[team] = [];
            document.querySelector(UIControl.DOMStrings.chooseTeam).innerHTML = "<option value=" + "---" + " disabled selected>Choose Team</option>";
            for(var team in ModelControl.teams) {
                document.querySelector(UIControl.DOMStrings.chooseTeam).insertAdjacentHTML("beforeend","<option value="+ team +">" + team + "</option>");
            }
        }

    }

    var addTeamMember = function() {

        var team = document.querySelector(UIControl.DOMStrings.chooseTeam).value;
        var member = document.querySelector(UIControl.DOMStrings.member).value;
        var err = document.querySelector(".member-error");
        if(team === "---") {
            UIControl.printErr(err,"**Please Choose a Team!");
        }
        else if(member === null || member === "") {
            UIControl.printErr(err,"**Please Enter the Name of the Member!");
        }
        else {
            UIControl.clearErr(err);
            UIControl.clearFields();
            ModelControl.teams[team].push(member);
            ModelControl.resetRoster();
            ModelControl.allocateArray();
            UIControl.updateTable(ModelControl.teams, ModelControl.rosters, ModelControl.noOfDaysInTheMonth);
        }

    }

    var chooseMonth = function() {

        var month = document.querySelector(UIControl.DOMStrings.month).value;
        var err = document.querySelector(".month-error");
        if(month === "" || month === null) {
            UIControl.printErr(err,"**Please Enter a Month!");
        }
        else if(month < 1 || month > 12) {
            UIControl.printErr(err,"**Your Month should be in 1 <= month <=12!");
        }
        else {
            UIControl.clearErr(err);
            UIControl.clearFields();
            ModelControl.noOfDaysInTheMonth = ModelControl.setMonth(month);
            ModelControl.resetRoster();
            ModelControl.allocateArray();
            ModelControl.rosters = ModelControl.initRosters();
            UIControl.updateTable(ModelControl.teams, ModelControl.rosters, ModelControl.noOfDaysInTheMonth);
            UIControl.renderRoster(ModelControl.teams, ModelControl.rosters, ModelControl.noOfDaysInTheMonth);
        }

    }

    function setWeekends() {

        var weekends = document.querySelector("#weekends").value;
        var err = document.querySelector(".we-error");
        if(weekends === "" || weekends === null) {
            UIControl.printErr(err,"**Please Number of Weekends!");
        }
        else if(weekends < 9 || weekends > 14) {
            UIControl.printErr(err,"**No of Week Ends should not be < 9 or greater than 14!");
        }
        else {
            UIControl.clearErr(err);
            ModelControl.setWeekends(weekends);
            console.log(ModelControl.weekends);
            document.querySelector("table").insertAdjacentHTML("afterend","<span class="+ "weekends" +">" + weekends + " Week Ends Set!</span><button class='btn reset-weekends'>Reset</button>");
            document.querySelector("#weekends").remove();
            document.querySelector(".set-weekends").remove();
            document.querySelector(".reset-weekends").addEventListener("click", resetWeekends);
        }
    }

    function resetWeekends() {
        document.querySelector(".weekends").remove();
        document.querySelector(".reset-weekends").remove();
        document.querySelector("table").insertAdjacentHTML("afterend","<input type="+"number"+" name="+"weekends"+" id="+"weekends"+"><button class='btn set-weekends'>Set Weekends</button>");
        document.querySelector(".set-weekends").addEventListener("click",setWeekends);
    }

    var generate = function() {
        // Main Logic Goes Here
        ModelControl.resetRoster();
        var rosters = ModelControl.allocateArray();
        
        var noOfDaysInTheMonth = ModelControl.noOfDaysInTheMonth;
        console.log(ModelControl.noOfDaysInTheMonth);
        
        for(var roster in rosters) {
            for(var i in rosters[roster]) {
                for(var j = 0; j < noOfDaysInTheMonth; j++) {
                    // if(rosters[roster][i][j] === "") {
                        rosters[roster][i][j] = ModelControl.shifts[Math.ceil(Math.random() * 5)];
                    // }
                }
            }
        }

        ModelControl.rosters = rosters;
        UIControl.updateTable(ModelControl.teams, ModelControl.rosters, ModelControl.noOfDaysInTheMonth);
        UIControl.renderRoster(ModelControl.teams, ModelControl.rosters, ModelControl.noOfDaysInTheMonth);
    }

    document.querySelector(".add-team").addEventListener("click", addTeam);

    document.querySelector(".add-member").addEventListener("click", addTeamMember);

    document.querySelector(UIControl.DOMStrings.chooseMonth).addEventListener("click", chooseMonth);

    document.querySelector(".set-weekends").addEventListener("click", setWeekends);

    document.querySelector(".generate").addEventListener("click", generate);

}

init();