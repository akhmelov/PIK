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
                rec.setter(nameStudent, tmp.nameStudent);
                rec.setter(surnameStudent, tmp.surnameStudent);
                rec.setter(mailStudent, tmp.mailStudent);
                rec.setter(titlePL, tmp.titlePL);
                rec.setter(titleEN, tmp.titleEN);
                rec.setter(namePromoter, tmp.namePromoter);
                rec.setter(surnamePromoter, tmp.surnamePromoter);
                rec.setter(abstractPL, tmp.abstractPL);
                rec.setter(abstractEN, tmp.abstractEN);
                rec.setter(keyWordsPL, tmp.keyWordsPL);
                rec.setter(keyWordsEN, tmp.keyWordsEN);
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
    idFields[abstractPL] = "abstractPL";
    idFields[abstractEN] = "abstractEN";
    idFields[keyWordsPL] = "keyWordsPL";
    idFields[keyWordsEN] = "keyWordsEN";

function creatRecord()
{
    var record = {
        changed: true //is saved on server?
    };

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