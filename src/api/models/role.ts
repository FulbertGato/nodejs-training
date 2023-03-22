import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/database";


interface RoleAttributes {
    id: number;
    name: string;

    createdAt?: Date;
    updatedAt?: Date;
}

interface RoleCreationAttributes extends Omit<RoleAttributes, "id"> {}

class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
    public id!: number;
    public name!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,

        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        tableName: "roles",
        sequelize,
    }
);

export default Role;
