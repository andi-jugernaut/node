Sequelize = require('sequelize'),
sequelize = new Sequelize('react_express_app', 'root', '',{
    'host' : 'localhost',
    dialect : 'mysql'
});

module.exports = sequelize;