var records = [];

$( document ).ready(function() {
    $.ajax({
        url: "getRecordsJson",
        type: "POST",
        data: { 'idBasket': '' + $("body").attr("id")},
        //contentType: 'application/json',
        success: function(recordsf){
            for(var el in recordsf) {
                var rec = creatRecord();
                var tmp = recordsf[el];
                rec.setId(tmp.id);
                rec.setName(tmp.nameStudent);
                rec.setSurname(tmp.surnameStudent);
                rec.setOriginValue(nameStudent, tmp.nameStudent);
                rec.setOriginValue(surnameStudent, tmp.surnameStudent);
                rec.setOriginValue(surnameStudent, tmp.surnameStudent);
                rec.setOriginValue(mailStudent, tmp.mailStudent);
                rec.setOriginValue(titlePL, tmp.titlePL);
                rec.setOriginValue(titleEN, tmp.titleEN);
                rec.setOriginValue(namePromoter, tmp.namePromoter);
                rec.setOriginValue(surnamePromoter, tmp.surnamePromoter);
                //rec.setter(abstractPL, tmp.abstractPL);
                //rec.setter(abstractEN, tmp.abstractEN);
                rec.setOriginValue(keyWordsPL, tmp.keyWordsPL);
                rec.setOriginValue(keyWordsEN, tmp.keyWordsEN);
                records.push(rec);
            }
            refreshAll();
        },
        error: function(request, status, error){
            $("body").html(request.responseText);
        }
    });
});

var idFields = new Array();
    var nameStudent = "nameStudent";
    var surnameStudent = "surnameStudent";
    var mailStudent = "mailStudent";
    var titlePL = "titlePL";
    var titleEN = "titleEN";
    var namePromoter = "namePromoter";
    var surnamePromoter = "surnamePromoter";
    var abstractPL = "abstractPL";
    var abstractEN = "abstractEN";
    var keyWordsPL = "keyWordsPL";
    var keyWordsEN = "keyWordsEN";
    idFields[nameStudent] = "nameStudent";
    idFields[surnameStudent] = "surnameStudent";
    idFields[mailStudent] = "mailStudent";
    idFields[titlePL] = "titleEssayPL";
    idFields[titleEN] = "titleEssayEN";
    idFields[namePromoter] = "namePromotor";
    idFields[surnamePromoter] = "surnamePromotor";
    //idFields[abstractPL] = "abstractPL";
    //idFields[abstractEN] = "abstractEN";
    idFields[keyWordsPL] = "keyWordsPL";
    idFields[keyWordsEN] = "keyWordsEN";

function creatRecord()
{
    var record = {
        changed: true //is saved on server?
    };
    record.origin = [];

    record.record = $("div#contentPanel.panel.panel-default").clone(true);
    record.linkNavPanel = $("a#linkToStudent").clone(true);

    record.setId = function(id){
        record.id = id;
        record.record.attr("id", "record-" + id);
        record.linkNavPanel.attr("id", "arecord-" + id);
        record.linkNavPanel.attr("href", "#record-" + id);
    }
    record.getId = function(){
        return record.record.attr("id").split("-", 2)[1];
    }
    record.setName = function(name){
        record.record.find("input#nameStudent").val(name);
        record.linkNavPanel.find("span#nameStudent").html(name);
    }
    record.setSurname = function(surname){
        record.record.find("input#surnameStudent").val(surname);
        record.linkNavPanel.find("span#surnameStudent").html(surname);
    }
    record.getName = function(){
        return record.record.find("input#nameStudent").val();
    }
    record.getSurname = function() {
        return record.record.find("input#surnameStudent").val();
    }
    record.setOriginValue = function(idInput, val){
        record.origin["" + idFields[idInput]] = val;
        record.setter(idInput, val);
    }
    record.getOriginValue = function(idInput){
        return record.origin[idFields[idInput]];
    }
    record.setter = function(idInput, val){
        record.record.find("input#" + idFields[idInput]).val(val);
    }
    record.getter = function(idInput, val){
        return record.record.find("input#" + idFields[idInput]).val();
    }

    record.isOkTotalCheck = function(){
        var isCorrect = true;
        var isChanged = false;
        for(var el in idFields){
            var val = record.record.find("input#" + idFields[el]).val();
            record.record.find("input#" + idFields[el]).removeClass("hasntClicked");
            if(val.trim() == ''){ //filed is empty, error
                record.record.find("input#" + idFields[el]).removeClass("has-change");
                record.record.find("input#" + idFields[el]).addClass("has-error");
                isCorrect = false;

            } else if(val != record.origin[idFields[el]]) { //has changed
                record.record.find("input#" + idFields[el]).removeClass("has-error");
                record.record.find("input#" + idFields[el]).addClass("has-change");
                isChanged = true;
            } else {
                record.record.find("input#" + idFields[el]).removeClass("has-change");
                record.record.find("input#" + idFields[el]).removeClass("has-error");
            }
        }
        if(!isCorrect){
            record.linkNavPanel.removeClass("has-change");
            record.linkNavPanel.addClass("has-error");
        } else if(isChanged){
            record.linkNavPanel.removeClass("has-error");
            record.linkNavPanel.addClass("has-change");
        } else {
            record.linkNavPanel.removeClass("has-change");
            record.linkNavPanel.removeClass("has-error");
        }
        return isCorrect;
    }

    record.check = function(){
        var isCorrect = true;
        var isChanged = false;
        for(var el in idFields){
            if(record.record.find("input#" + idFields[el]).hasClass("hasntClicked"))
                continue;
            var val = record.record.find("input#" + idFields[el]).val();
            if(val.trim() == ''){ //filed is empty, error
                record.record.find("input#" + idFields[el]).removeClass("has-change");
                record.record.find("input#" + idFields[el]).addClass("has-error");
                isCorrect = false;
            } else if(val != record.origin[idFields[el]]) { //has changed
                record.record.find("input#" + idFields[el]).removeClass("has-error");
                record.record.find("input#" + idFields[el]).addClass("has-change");
                isChanged = true;
            } else {
                record.record.find("input#" + idFields[el]).removeClass("has-change");
                record.record.find("input#" + idFields[el]).removeClass("has-error");
            }
        }
        if(!isCorrect){
            record.linkNavPanel.removeClass("has-change");
            record.linkNavPanel.addClass("has-error");
        } else if(isChanged){
            record.linkNavPanel.removeClass("has-error");
            record.linkNavPanel.addClass("has-change");
        } else {
            record.linkNavPanel.removeClass("has-change");
            record.linkNavPanel.removeClass("has-error");
        }
    }
    record.saveOnServer = function(){
        var isOk = record.isOkTotalCheck();
        if(!isOk){
            alert("Masz bledy");
            return;
        }
        alert("saved");
        //TODO save
    }

    init = function(){
        record.record.focusout(function(){
            record.check();
        });
        for(var el in idFields){
            record.record.find("input#" + idFields[el]).addClass("hasntClicked");
            record.record.find("input#" + idFields[el]).focus(function(){
                $(this).removeClass("hasntClicked");
            });
        }
        record.record.find("input#" + idFields[nameStudent]).focusout(function(){
            record.setName($(this).val());
        });
        record.record.find("input#" + idFields[surnameStudent]).focusout(function(){
            record.setSurname($(this).val());
        });
        record.record.find("button#save").click(function(){
            record.saveOnServer();
        });
        record.linkNavPanel.find("span#save").click(function(){
            record.saveOnServer();
        });
    }
    init();
    return record;
}

function addNewRecord()
{
    var obj = creatRecord();
    obj.setId(records.length);
    records.push(obj);
    var navlink = $("div#navMenu div#navbar div.list-group");
    var divForms = $("div#studentsForm");
    navlink.append(obj.linkNavPanel);
    divForms.append(obj.record);
}

function refreshAll()
{
    var divForms = $("div#studentsForm");
    var navlink = $("div#navMenu div#navbar div.list-group");
    for(var el in records){
        var obj = records[el];
        navlink.append(obj.linkNavPanel);
        divForms.append(obj.record);
    }
}