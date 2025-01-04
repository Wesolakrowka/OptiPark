import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Park = sequelize.define('Park', {
    p_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    p_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    p_phone: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    p_website: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    p_price: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    p_location_score: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p_parking_score: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p_room_score: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p_room_utilities_score: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p_transport_score: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p_canteen_score: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'Parks',
    timestamps: false
});

export default Park;
