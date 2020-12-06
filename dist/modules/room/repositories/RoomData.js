"use strict";

var _data = _interopRequireDefault(require("data.json"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create
exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == '') {
      return res.send('Please, fill all functions');
    }
  }

  let {
    avatar_url,
    birth,
    name,
    graduation,
    type_class,
    services
  } = req.body;
  birth = Date.parse(birth);
  const created_at = Date.now();
  const id = Number(_data.default.teachers.length + 1);

  _data.default.teachers.push({
    id,
    avatar_url,
    name,
    birth,
    graduation,
    type_class,
    services,
    created_at
  });

  _fs.default.writeFile('data.json', JSON.stringify(_data.default, null, 2), function (err) {
    if (err) return res.send('Write file error!');
    return res.redirect('/teachers');
  }); // return res.send(req.body)

};

exports.show = function (req, res) {
  const {
    id
  } = req.params;

  const foundTeacher = _data.default.teachers.find(function (teacher) {
    return id == teacher.id;
  });

  if (!foundTeacher) return res.send('Teachers not found!');
  const teacher = { ...foundTeacher,
    age: age(foundTeacher.birth),
    services: foundTeacher.services.split(','),
    created_at: new Intl.DateTimeFormat('en-GB').format(foundTeacher.created_at)
  };
  return res.render('teachers/show', {
    teacher,
    graduation
  });
};

exports.edit = function (req, res) {
  const {
    id
  } = req.params;

  const foundTeacher = _data.default.teachers.find(function (teacher) {
    return id == teacher.id;
  });

  if (!foundTeacher) return res.send('Teacher not found!');
  const teacher = { ...foundTeacher,
    birth: date(foundTeacher.birth)
  };
  return res.render('teachers/edit', {
    teacher,
    selectGraduation
  });
};