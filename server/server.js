var app = require('./server-config.js');

app.set('port', process.env.PORT || 4568);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
