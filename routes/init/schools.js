var School = require('../../models/school');
var list = require('../../helpers/schools');

module.exports = function(req, res, next) {
    universitiesCnt = list.universities.length;
    highSchoolsCnt = list.high_schools.length;

    var saveSchool = function(name, type, region, level) {
        var school = new School({
            name: name,
            school_type_id: type,
            school_region_id: region,
            level: level
        });

        school.save().then(function(model) {
            if (model.id === universitiesCnt + highSchoolsCnt) {
                res.status(200).json({ success: true });
            }
        }).catch(function(error) {
            console.log(error);
        });
    };

    for (var i = 0; i < list.universities.length; i++) {
        var type = list.universities[i].type;
        var region = list.universities[i].region;

        if ('faculties' in list.universities[i]) {
            universitiesCnt += list.universities[i].faculties.length;
            for (var k = 0; k < list.universities[i].faculties.length; k++) {
                var name = list.universities[i].name + ' - ' + list.universities[i].faculties[k];

                saveSchool(name, type, region, 'vysoká škola');
            }
        } else {
            var name = list.universities[i].name;

            saveSchool(name, type, region, 'vysoká škola');
        }
    }

    for (var j = 0; j < list.high_schools.length; j++) {
        var name = list.high_schools[j].name;
        var type = list.high_schools[j].type;
        var region = list.high_schools[j].region;

        saveSchool(name, type, region, 'vyšší odborná škola');
    }
};
