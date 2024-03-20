import {Sequelize} from "sequelize";

const URL = process.env.MYSQL_IVECO_HOST || '54.145.224.78';
const USERNAME = process.env.MYSQL_IVECO_USERNAME || 'hubiveco';
const PASSWORD = process.env.MYSQL_IVECO_PASSWORD || 'hub1vec0#2023';
const DATABASE = process.env.MYSQL_IVECO_DATABASE || 'hubivecodb';
const PORT = process.env.MYSQL_IVECO_PORT || '3010';

const connection = new Sequelize({
    dialect: 'mysql',
    // host: '54.145.224.78',
    host: URL,   
    // port: 3010,
    port: parseInt(PORT),
    // username: 'hubiveco',
    username: USERNAME,
    // password: 'hub1vec0#2023',
    password: PASSWORD,
    // database: 'hubivecodb',
    database: DATABASE,
    define: {
        timestamps: true,
        underscored: true,
    },
})

export default connection;